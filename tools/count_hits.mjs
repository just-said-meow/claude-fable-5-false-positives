// count_hits.mjs — count how many times your Claude Code conversations were cut off by the safety classifier.
//
// Reads local transcripts only: no network, writes no files, prints no conversation content, outputs counts only.
// Usage:
//   node count_hits.mjs                    read the default folder ~/.claude/projects
//   node count_hits.mjs <folder> [...]     read the given folder(s) (several allowed, e.g. backups)
//   node count_hits.mjs --json             output JSON instead
// Requires: Node.js 18 or later, no packages to install.
//
// Limitations:
// - Only works with the local Claude Code transcript format from before November 2026; after an app update the cut records may look different and this tool will no longer recognize them.
// - Deleted conversations are not on disk and cannot be counted, so every number is a lower bound.
// - Provided as is; updates are not guaranteed.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const roots = args.filter(a => a !== '--json');
if (!roots.length) roots.push(path.join(os.homedir(), '.claude', 'projects'));

// ---------- collect files ----------
const files = [];
const walk = d => {
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.jsonl')) files.push(p);
  }
};
roots.forEach(walk);

// ---------- helpers ----------
const md5 = s => crypto.createHash('md5').update(s).digest('hex');
const textOf = c => typeof c === 'string' ? c : Array.isArray(c) ? c.filter(p => p?.type === 'text').map(p => p.text || '').join('\n') : '';
const month = t => t.slice(0, 7);
const prettyModel = m => (m || 'unknown').replace(/^claude-/, '');

// ---------- read files ----------
const signals = new Map();      // deduplicated cut signals
const humans = new Map();       // deduplicated messages typed by the user: key -> {model}
const requests = new Map();     // session -> Set(requestId|time)
const reqTimes = new Map();     // session -> [ms]
const humanBySid = new Map();   // session -> how many messages the user typed in this conversation
const titled = new Set();       // conversations that have a title

for (const file of files) {
  const isSubagentFile = /[\\/]subagents[\\/]/.test(file);
  let lastModel = null;
  let lastInput = 'unknown';    // the most recent thing that came in: you typing, or automatic (background notification, message from another conversation)
  const pendingHuman = [];      // waits for the next assistant reply, whose model it is attributed to
  const rl = readline.createInterface({ input: fs.createReadStream(file, 'utf8'), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    let j; try { j = JSON.parse(line); } catch { continue; }
    const sid = j.sessionId || path.basename(file, '.jsonl');
    if (j.customTitle || j.aiTitle) titled.add(sid);   // title records have no timestamp field, so pick them up before the next line
    const at = j.timestamp; if (!at) continue;
    const m = j.message || {};

    // Messages typed by the user (the denominator); also track "what came in most recently"
    if (j.type === 'user' && !j.isMeta && !j.isCompactSummary) {
      const parts = Array.isArray(m.content) ? m.content : [];
      const t = textOf(m.content);
      // The app inserts system reminders before your message; strip them before deciding
      const own = t.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
      if (!parts.some(p => p?.type === 'tool_result') && t.trim()) {
        if (/<task-notification|<cross-session-message/.test(t) || (j.origin?.kind && j.origin.kind !== 'human')) lastInput = 'automatic';
        else if (!own) { if (/finished a turn|sent a message|task-notification/.test(t)) lastInput = 'automatic'; }
        else if (!/^\s*(<|\[Request interrupted|This session is being continued)/.test(own)) {
          lastInput = isSubagentFile || j.isSidechain ? 'automatic' : 'you_typed';
          if (lastInput === 'you_typed' && !String(j.entrypoint || '').startsWith('sdk')) {
            const k = at + '|' + md5(t);
            if (!humans.has(k)) { const h = { model: null, sid }; humans.set(k, h); pendingHuman.push(h); humanBySid.set(sid, (humanBySid.get(sid) || 0) + 1); }
          }
        }
      }
    }

    // Assistant replies: record the model and the request
    if (j.type === 'assistant' && m.model && m.model !== '<synthetic>') {
      lastModel = m.model;
      while (pendingHuman.length) { const h = pendingHuman.shift(); if (!h.model) h.model = m.model; }
      const rid = j.requestId || m.id;
      if (rid) {
        if (!requests.has(sid)) { requests.set(sid, new Set()); reqTimes.set(sid, []); }
        const s = requests.get(sid); if (!s.has(rid)) { s.add(rid); reqTimes.get(sid).push(Date.parse(at)); }
      }
    }

    // Cut signals (same rules as the author's research ledger)
    const sysText = j.type === 'system' && typeof j.content === 'string' ? j.content : '';
    const apiText = j.type === 'assistant' && (j.isApiErrorMessage || m.model === '<synthetic>') ? textOf(m.content) : '';
    let kind = null;
    if (j.type === 'system' && j.subtype === 'model_refusal_fallback') kind = 'model_swap';
    else if (j.type === 'system' && /safeguards stopped the response above/.test(sysText)) kind = 'retry_prompt';
    else if (apiText && /safeguards flagged|stopped by a safety classifier/.test(apiText)) kind = 'turn_aborted';
    else if (apiText && /Output blocked by content filtering|content filtering policy/.test(apiText)) kind = 'content_filter';
    else if (j.type === 'assistant' && m.stop_reason === 'refusal') kind = 'refusal_flag';
    if (!kind) continue;
    const key = `${j.type}|${j.subtype || ''}|${at}|${md5(JSON.stringify(m.content ?? j.content ?? ''))}`;
    if (signals.has(key)) continue;
    const category = m.stop_details?.category || (apiText + sysText).match(/Details:\s*`?\[(\w+)\]/)?.[1] || null;
    signals.set(key, {
      sid, kind, t: Date.parse(at), requestId: j.requestId || null, category,
      model: kind === 'model_swap' ? (j.originalModel || lastModel) : (m.model && m.model !== '<synthetic>' ? m.model : lastModel),
      subagent: isSubagentFile || !!j.isSidechain, trigger: lastInput,
    });
  }
}

// ---------- merge into "cuts": same conversation within 3 seconds; widened to 6 minutes for aborted turns or model swaps; the same request is always merged ----------
const bySid = new Map();
for (const s of signals.values()) { if (!bySid.has(s.sid)) bySid.set(s.sid, []); bySid.get(s.sid).push(s); }
const hits = [];
for (const [sid, list] of bySid) {
  list.sort((a, b) => a.t - b.t);
  let cur = null;
  for (const s of list) {
    const dt = cur ? s.t - cur.last : Infinity;
    const same = cur && (dt < 3000 || (['turn_aborted', 'model_swap'].includes(s.kind) && dt < 360000) || (s.requestId && cur.ev.some(x => x.requestId === s.requestId)));
    if (same) { cur.ev.push(s); cur.last = s.t; } else { cur = { sid, t: s.t, last: s.t, ev: [s] }; hits.push(cur); }
  }
}
for (const h of hits) {
  const kinds = new Set(h.ev.map(e => e.kind));
  h.form = kinds.has('model_swap') ? 'model_swap' : kinds.has('turn_aborted') ? 'hard_stop' : kinds.has('retry_prompt') ? 'warn_and_retry' : 'undetermined';
  h.model = (h.ev.find(e => e.kind === 'model_swap') || h.ev[0]).model;
  h.category = h.ev.map(e => e.category).find(Boolean) || 'not_given';
  h.subagent = h.ev.every(e => e.subagent);
  h.trigger = h.subagent ? 'subagent_task' : h.ev[0].trigger;
  h.month = month(new Date(h.t).toISOString());
}

// ---------- statistics ----------
const tally = (arr, f) => arr.reduce((o, x) => (o[f(x)] = (o[f(x)] || 0) + 1, o), {});
// Work orders: conversations with no title and only one message are usually dispatched work orders (e.g. having Claude
// open another conversation to do something), not messages you sat there and typed. Counting them as "messages you typed"
// would push the per-thousand figure down, so they are listed separately.
const oneShot = new Set([...humanBySid].filter(([sid, n]) => n === 1 && !titled.has(sid)).map(([sid]) => sid));
for (const h of hits) if (h.trigger === 'you_typed' && oneShot.has(h.sid)) h.trigger = 'dispatched_work_order';
const humanByModel = tally([...humans.values()].filter(h => h.model && !oneShot.has(h.sid)), h => prettyModel(h.model));
const hitsTyped = hits.filter(h => h.trigger === 'you_typed');
const hitByModel = tally(hitsTyped, h => prettyModel(h.model));

// Within one hour after a cut, the cut rate per request in the same conversation vs. other times (only conversations that were cut)
const H = 3600e3;
let rqAfter = 0, rqOther = 0, hAfter = 0, hOther = 0, again = 0;
for (const [sid, list] of bySid) {
  const ht = hits.filter(h => h.sid === sid).map(h => h.t).sort((a, b) => a - b);
  const inAfter = t => ht.some(x => t > x && t - x <= H);
  for (const t of reqTimes.get(sid) || []) inAfter(t) ? rqAfter++ : rqOther++;
  for (const t of ht) inAfter(t) ? hAfter++ : hOther++;
  ht.forEach((t, i) => { if (ht.some((x, k) => k > i && x - t <= H)) again++; });
}

const out = {
  scan: { folders: roots, file_count: files.length },
  total_cuts: hits.length,
  by_trigger: tally(hits, h => h.trigger),
  by_month: tally(hits, h => h.month),
  by_form: tally(hits, h => h.form),
  by_label: tally(hits, h => h.category),
  by_model: Object.fromEntries(Object.keys({ ...humanByModel, ...hitByModel }).sort().map(k => [k, {
    messages_you_typed: humanByModel[k] || 0, cuts: hitByModel[k] || 0,
    per_thousand_messages: humanByModel[k] ? +(1000 * (hitByModel[k] || 0) / humanByModel[k]).toFixed(1) : null,
  }])),
  work_orders_not_counted_as_typed: oneShot.size,
  hour_after_cut: {
    note: 'Only conversations that were cut; each send to the model counts as one request',
    within_hour_after_cut: { requests: rqAfter, cuts: hAfter, per_thousand_requests: rqAfter ? +(1000 * hAfter / rqAfter).toFixed(2) : null },
    other_times: { requests: rqOther, cuts: hOther, per_thousand_requests: rqOther ? +(1000 * hOther / rqOther).toFixed(2) : null },
    cuts_followed_by_another_cut_within_hour_same_conversation: `${again}/${hits.length}`,
  },
};

if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }
const row = o => Object.entries(o).sort().map(([k, v]) => `  ${k}: ${v}`).join('\n');
console.log(`Scanned ${files.length} transcript files (${roots.join(', ')})`);
console.log(`\nCut off: ${hits.length} times`);
console.log(`\nWhat came in last before the cut ("automatic" = background notification or a message from another conversation; you did not type anything):\n${row(out.by_trigger)}`);
console.log(`\nBy month:\n${row(out.by_month)}`);
console.log(`\nBy form:\n${row(out.by_form)}`);
console.log(`\nBy label given by the classifier:\n${row(out.by_label)}`);
console.log('\nBy model (only cuts that followed your typing):');
for (const [k, v] of Object.entries(out.by_model)) console.log(`  ${k}: you typed ${v.messages_you_typed} messages, cut off ${v.cuts} times${v.per_thousand_messages !== null ? `, ${v.per_thousand_messages} per thousand messages` : ''}`);
if (oneShot.size) console.log(`  (Another ${oneShot.size} conversations with no title and only one message were treated as dispatched work orders and not counted as messages you typed)`);
const a = out.hour_after_cut;
console.log(`\nWithin one hour after a cut, the same conversation was cut ${a.within_hour_after_cut.per_thousand_requests} times per thousand requests; at other times, ${a.other_times.per_thousand_requests} times.`);
console.log(`Cuts followed by another cut in the same conversation within one hour: ${a.cuts_followed_by_another_cut_within_hour_same_conversation}`);
console.log('\nAll numbers are lower bounds: deleted conversations cannot be counted.');
