# count_hits: count how many times the classifier cut off your Claude Code

This small tool does one thing: it reads the Claude Code conversation logs on your computer, counts how many times the safety classifier cut them off, and breaks the count down by month, model, form, and label.

- Read-only; it does not modify any file.
- No network access.
- It prints no conversation content, only counts.
- Local statistics only: deleted conversations, other computers, and the web version are not counted, so every number is a lower bound.

## How to use

Requires Node.js 18 or later; no extra packages needed.

```bash
node count_hits.mjs
```

By default it reads `~/.claude/projects`. To read other folders (for example a backup), append their paths; you can give several:

```bash
node count_hits.mjs D:/backup/projects
```

Add `--json` to get JSON output instead.

## What it tells you

- How many times you were cut off in total.
- What came in last before each cut: whether it followed your typing, or something that arrived automatically (a background notification, a message from another conversation). The latter means you were cut off without typing anything at all.
- Counts by month, by form (model swap / hard stop / warn-and-retry), and by the label the classifier gave.
- By model: how many messages you typed on each model, how many times you were cut off, and the rate per thousand messages. Only cuts that followed your typing are counted here.
- How likely the same conversation is to be cut off within one hour after a cut, compared with other times.

## How it counts

- **Recognizing the marks**: when the classifier steps in, the app leaves fixed markers in the log. This tool only recognizes those markers; it makes no judgment calls of its own.
- **Messages you typed**: only messages you typed yourself are counted. Conversations with no title and only one message are usually dispatched work orders (for example, having Claude open another conversation to do something), so they are not counted as messages you typed; their number is listed separately. If you really do often open a conversation, say one thing, and close it, those messages will be excluded too, and the per-thousand figures will come out slightly high.
- **Deduplication and merging**: a single cut often leaves several markers, such as the cut itself, a retry, and an error. Markers in the same conversation within 3 seconds count as one cut; for an aborted turn or a model swap the window widens to 6 minutes; markers belonging to the same request always count as one cut.

## Limitations

- It only recognizes the log format from before November 2026. After an app update the markers may look different, and it will no longer recognize them.
- If you use your own scripts to send messages from one conversation into another, those messages look the same in the log as something you typed. The tool counts them as cuts that followed your typing, so those counts will run high.
- Comments are welcome, but replies and updates are not guaranteed.

---

The full detailed data analysis has been retained, but the analysis tools and research data are not made public, for safety reasons.

License: MIT. Provided as is. Replies and updates are not guaranteed.
