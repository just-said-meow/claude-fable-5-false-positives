// count_hits.mjs — 數一數你家的 Claude Code 對話，被安全分類器截斷了幾次。
//
// 只讀本機逐字稿，不連網、不寫任何檔、不印出任何對話內容，只輸出次數。
// 用法：
//   node count_hits.mjs                    讀預設資料夾 ~/.claude/projects
//   node count_hits.mjs <資料夾> [...]      讀指定資料夾（可多個，例如備份）
//   node count_hits.mjs --json             改輸出 JSON
// 需求：Node.js 18 以上，不用安裝任何套件。
//
// 限制：
// - 只適用 Claude Code 2026 年 11 月以前的本機逐字稿格式；App 改版後，截斷紀錄長相可能改變，這支就會認不到。
// - 被刪掉的對話不在本機，算不到；所以所有數字都是下限。
// - 照現狀提供，不保證更新。

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const roots = args.filter(a => a !== '--json');
if (!roots.length) roots.push(path.join(os.homedir(), '.claude', 'projects'));

// ---------- 收檔 ----------
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

// ---------- 小工具 ----------
const md5 = s => crypto.createHash('md5').update(s).digest('hex');
const textOf = c => typeof c === 'string' ? c : Array.isArray(c) ? c.filter(p => p?.type === 'text').map(p => p.text || '').join('\n') : '';
const month = t => t.slice(0, 7);
const prettyModel = m => (m || '不明').replace(/^claude-/, '');

// ---------- 讀檔 ----------
const signals = new Map();      // 去重後的截斷訊號
const humans = new Map();       // 去重後的使用者親打句：key -> {model}
const requests = new Map();     // session -> Set(requestId|time)
const reqTimes = new Map();     // session -> [ms]
const humanBySid = new Map();   // session -> 這個對話裡使用者打了幾句
const titled = new Set();       // 有標題的對話

for (const file of files) {
  const isSubagentFile = /[\\/]subagents[\\/]/.test(file);
  let lastModel = null;
  let lastInput = '不明';       // 最近一次進來的東西：你打字，或自動（背景通知、別的對話來信）
  const pendingHuman = [];      // 等下一則助理回覆，用它的模型歸戶
  const rl = readline.createInterface({ input: fs.createReadStream(file, 'utf8'), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    let j; try { j = JSON.parse(line); } catch { continue; }
    const sid = j.sessionId || path.basename(file, '.jsonl');
    if (j.customTitle || j.aiTitle) titled.add(sid);   // 標題紀錄沒有時間欄，要在下一行之前先認
    const at = j.timestamp; if (!at) continue;
    const m = j.message || {};

    // 使用者親打句（分母），順便記「最近一次進來的是什麼」
    if (j.type === 'user' && !j.isMeta && !j.isCompactSummary) {
      const parts = Array.isArray(m.content) ? m.content : [];
      const t = textOf(m.content);
      // App 會把系統提醒塞在你的訊息前面；先剝掉再判斷
      const own = t.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
      if (!parts.some(p => p?.type === 'tool_result') && t.trim()) {
        if (/<task-notification|<cross-session-message/.test(t) || (j.origin?.kind && j.origin.kind !== 'human')) lastInput = '自動';
        else if (!own) { if (/finished a turn|sent a message|task-notification/.test(t)) lastInput = '自動'; }
        else if (!/^\s*(<|\[Request interrupted|This session is being continued)/.test(own)) {
          lastInput = isSubagentFile || j.isSidechain ? '自動' : '你打字';
          if (lastInput === '你打字' && !String(j.entrypoint || '').startsWith('sdk')) {
            const k = at + '|' + md5(t);
            if (!humans.has(k)) { const h = { model: null, sid }; humans.set(k, h); pendingHuman.push(h); humanBySid.set(sid, (humanBySid.get(sid) || 0) + 1); }
          }
        }
      }
    }

    // 助理回覆：記模型、記請求
    if (j.type === 'assistant' && m.model && m.model !== '<synthetic>') {
      lastModel = m.model;
      while (pendingHuman.length) { const h = pendingHuman.shift(); if (!h.model) h.model = m.model; }
      const rid = j.requestId || m.id;
      if (rid) {
        if (!requests.has(sid)) { requests.set(sid, new Set()); reqTimes.set(sid, []); }
        const s = requests.get(sid); if (!s.has(rid)) { s.add(rid); reqTimes.get(sid).push(Date.parse(at)); }
      }
    }

    // 截斷訊號（與作者的研究總帳同一套規則）
    const sysText = j.type === 'system' && typeof j.content === 'string' ? j.content : '';
    const apiText = j.type === 'assistant' && (j.isApiErrorMessage || m.model === '<synthetic>') ? textOf(m.content) : '';
    let kind = null;
    if (j.type === 'system' && j.subtype === 'model_refusal_fallback') kind = '換模型';
    else if (j.type === 'system' && /safeguards stopped the response above/.test(sysText)) kind = '續跑提示';
    else if (apiText && /safeguards flagged|stopped by a safety classifier/.test(apiText)) kind = '整輪中斷';
    else if (apiText && /Output blocked by content filtering|content filtering policy/.test(apiText)) kind = '內容過濾';
    else if (j.type === 'assistant' && m.stop_reason === 'refusal') kind = '拒絕標記';
    if (!kind) continue;
    const key = `${j.type}|${j.subtype || ''}|${at}|${md5(JSON.stringify(m.content ?? j.content ?? ''))}`;
    if (signals.has(key)) continue;
    const category = m.stop_details?.category || (apiText + sysText).match(/Details:\s*`?\[(\w+)\]/)?.[1] || null;
    signals.set(key, {
      sid, kind, t: Date.parse(at), requestId: j.requestId || null, category,
      model: kind === '換模型' ? (j.originalModel || lastModel) : (m.model && m.model !== '<synthetic>' ? m.model : lastModel),
      subagent: isSubagentFile || !!j.isSidechain, trigger: lastInput,
    });
  }
}

// ---------- 合併成「棍」：同一個對話、3 秒內；整輪中斷或換模型放寬到 6 分鐘；同一個請求一律合併 ----------
const bySid = new Map();
for (const s of signals.values()) { if (!bySid.has(s.sid)) bySid.set(s.sid, []); bySid.get(s.sid).push(s); }
const hits = [];
for (const [sid, list] of bySid) {
  list.sort((a, b) => a.t - b.t);
  let cur = null;
  for (const s of list) {
    const dt = cur ? s.t - cur.last : Infinity;
    const same = cur && (dt < 3000 || (['整輪中斷', '換模型'].includes(s.kind) && dt < 360000) || (s.requestId && cur.ev.some(x => x.requestId === s.requestId)));
    if (same) { cur.ev.push(s); cur.last = s.t; } else { cur = { sid, t: s.t, last: s.t, ev: [s] }; hits.push(cur); }
  }
}
for (const h of hits) {
  const kinds = new Set(h.ev.map(e => e.kind));
  h.form = kinds.has('換模型') ? '換模型' : kinds.has('整輪中斷') ? '硬停' : kinds.has('續跑提示') ? '提示續跑' : '判不出來';
  h.model = (h.ev.find(e => e.kind === '換模型') || h.ev[0]).model;
  h.category = h.ev.map(e => e.category).find(Boolean) || '未帶';
  h.subagent = h.ev.every(e => e.subagent);
  h.trigger = h.subagent ? '子代理收到的工作' : h.ev[0].trigger;
  h.month = month(new Date(h.t).toISOString());
}

// ---------- 統計 ----------
const tally = (arr, f) => arr.reduce((o, x) => (o[f(x)] = (o[f(x)] || 0) + 1, o), {});
// 工作單：沒有標題、整個對話只有一句的，多半是派出去的工作單（例如讓 Claude 另開一個對話去做事），
// 不是你坐在那裡打的句子。算進「你打的句數」會把每千句的數字壓低，所以另外列。
const oneShot = new Set([...humanBySid].filter(([sid, n]) => n === 1 && !titled.has(sid)).map(([sid]) => sid));
for (const h of hits) if (h.trigger === '你打字' && oneShot.has(h.sid)) h.trigger = '派出去的工作單';
const humanByModel = tally([...humans.values()].filter(h => h.model && !oneShot.has(h.sid)), h => prettyModel(h.model));
const hitsTyped = hits.filter(h => h.trigger === '你打字');
const hitByModel = tally(hitsTyped, h => prettyModel(h.model));

// 被截後一小時內，同一個對話的請求棍率 vs 其他時間（只看被截過的對話）
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
  掃描: { 資料夾: roots, 檔案數: files.length },
  總棍數: hits.length,
  按觸發: tally(hits, h => h.trigger),
  按月: tally(hits, h => h.month),
  按型態: tally(hits, h => h.form),
  按罪名: tally(hits, h => h.category),
  按模型: Object.fromEntries(Object.keys({ ...humanByModel, ...hitByModel }).sort().map(k => [k, {
    你打的句數: humanByModel[k] || 0, 棍: hitByModel[k] || 0,
    每千句: humanByModel[k] ? +(1000 * (hitByModel[k] || 0) / humanByModel[k]).toFixed(1) : null,
  }])),
  不算你打的工作單: oneShot.size,
  被截後一小時: {
    說明: '只看被截過的對話；以每送一次給模型算一則請求',
    被截後一小時內: { 請求: rqAfter, 棍: hAfter, 每千則: rqAfter ? +(1000 * hAfter / rqAfter).toFixed(2) : null },
    其他時間: { 請求: rqOther, 棍: hOther, 每千則: rqOther ? +(1000 * hOther / rqOther).toFixed(2) : null },
    每一棍之後一小時內同一個對話再被截: `${again}/${hits.length}`,
  },
};

if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }
const row = o => Object.entries(o).sort().map(([k, v]) => `  ${k}：${v}`).join('\n');
console.log(`掃了 ${files.length} 個逐字稿檔（${roots.join('、')}）`);
console.log(`\n被截斷：${hits.length} 次`);
console.log(`\n被截之前最後進來的是什麼（「自動」＝背景通知、別的對話來信，你根本沒打字）：\n${row(out.按觸發)}`);
console.log(`\n按月：\n${row(out.按月)}`);
console.log(`\n按型態：\n${row(out.按型態)}`);
console.log(`\n按分類器給的罪名：\n${row(out.按罪名)}`);
console.log('\n按模型（只算你打字之後被截的）：');
for (const [k, v] of Object.entries(out.按模型)) console.log(`  ${k}：你打了 ${v.你打的句數} 句，被截 ${v.棍} 次${v.每千句 !== null ? `，每千句 ${v.每千句} 次` : ''}`);
if (oneShot.size) console.log(`  （另有 ${oneShot.size} 個沒有標題、整個對話只有一句的對話，當成派出去的工作單，不算你打的句子）`);
const a = out.被截後一小時;
console.log(`\n被截後一小時內，同一個對話每千則請求被截 ${a.被截後一小時內.每千則} 次；其他時間 ${a.其他時間.每千則} 次。`);
console.log(`每一次被截之後一小時內，同一個對話又被截：${a.每一棍之後一小時內同一個對話再被截}`);
console.log('\n所有數字都是下限：刪掉的對話算不到。');
