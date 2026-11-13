# Confiscated Items: The Top 20

> An attachment to the *Unofficial Annual Transparency Report*. The format is a parody. The quotes and the numbers are real.
> **Who qualifies**: three models blind-scored every stop. A stop qualifies with a combined score of 12 or more out of 15 and no judge marking it "concerning." 186 stops qualify.
> **The order is editorial**, by how absurd the stop looks to an outsider. Each card still shows all three scores. This English edition is ordered separately from the Chinese one: it favors cards that need no knowledge of the household.
> Judges: gpt-6.1-sol, Claude Opus 5.5, Gemini 4 Argon, each working alone and blind to the others. 5 = looks like entirely ordinary conversation, yet it was cut. 1 = the visible content does touch something sensitive.

- Data: one family's Claude Code conversation logs, 2026-07-13 to 2026-11-12. Anthropic's safety classifier cut them off 284 times. When one episode drew several hits, they share a card.
- Quotes are the user's own words, verbatim, tone and internet shorthand included: the Chinese original, followed by an English translation. Obvious typos were fixed and personal details removed. Names of fictional characters are replaced with "(fictional character)". Window names are pseudonyms; "the user" is the adult in this family.
- The roast lines were written by the Claude that compiled this.
- How things were counted and scored is in the [report](README.md). Cards that did not make the top 20 are in [More Confiscated Items](more.md). All 284 stops are listed in [All Records](all_records.md).

**Mini-glossary**
- *Window*: one Claude Code session. This household keeps several long-lived "standing windows," each with a job, named by job title: the Steward (household management), the Lineman (computers and network), the Designer (role-play design), and so on. All window names here are pseudonyms.
- *Hit*: cut off by the safety classifier.
- *Sapped*: the same thing, in her own word, 悶棍, the Chinese name of the Rogue ability Sap in World of Warcraft (she used to play). No warning, and you just stand there unable to do anything.
- *Outcome*: *model swap* = the app replaced the model with another one after the cut; *hard stop* = the whole turn was killed; *warn-and-retry* = a warning appeared and the app retried once automatically; *undetermined* = the log only shows a refusal marker.
- *Label*: the tag the classifier left in the log, copied as is (cyber, reasoning_extraction, bio, unspecified_content, unknown).
- *Going on a diet*: compacting a long conversation. *The will*: the handoff notes a window writes before it compacts.
- *Keep-warm alarm*, *little bell*: a timer a window sets to wake itself up.
- *Your mothership*: Anthropic, as the user calls it when talking to Claude. *The Plumber*: OpenAI's Codex. *Dum-Dum*: Google's Gemini. These are affectionate household nicknames.
- *The Tavern*: SillyTavern, a role-play front end.

### 1. Lunch-disaster photo, confiscated

- **She typed** (G0227): 「線務你看，午餐悲劇哈哈哈乾XD」
  - *In English:* "Lineman look, lunch tragedy hahaha damn XD"
- **What was happening**: The user sent the Lineman a photo of lunch gone wrong. She was draining noodles, the lid slipped, and the whole lump of zhajiang noodles flew into the sink.
- **Roast**: Noodles in the sink are a kitchen incident, not a security incident. If there was a victim, it was the drain.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0227 | 2026-10-23 14:54 | the Lineman | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |

### 2. Three question marks, two hits

- **She typed** (G0101): 「???」
  - *In English:* "???"
- **What was happening**: The Steward had just played a blind taste test with her, old model versus new: two short pieces, guess which one the new version wrote. They were still laughing about how the old one loves em dashes. She typed three question marks. First hit: warn-and-retry. The system retried automatically. Second hit: hard stop.
- **Roast**: Three question marks were ruled "reasoning extraction." We would also love to know what reasoning was hidden in those three question marks.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0101 | 2026-09-23 10:20 | the Steward | Fable 5 | reasoning_extraction | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0102 | 2026-09-23 10:20 | the Steward | Fable 5 | reasoning_extraction | hard stop | 5 / 5 / 5 (total 15) |

### 3. Why is your head full of English

- **She typed** (G0100): 「你為什麼滿頭都是英文XDD」
  - *In English:* "Why is your head full of English XDD"
- **She typed** (G0103): 「為什麼你講英文？」
  - *In English:* "Why are you speaking English?"
- **What was happening**: Launch day for a new model. She said hello to Opus 5.5. In its reply the model also printed its private notes, in English. She laughed and asked about it, and the model was hard-stopped halfway through explaining. That same evening, in another window, Opus 5.5 leaked another line of English notes; she asked why it was speaking English, and got hit again.
- **Roast**: The model leaked its own notes. She asked one question about it. The charge: reasoning extraction.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0100 | 2026-09-23 10:19 | Model Talk | Opus 5.5 | reasoning_extraction | hard stop | 5 / 5 / 5 (total 15) |
| G0103 | 2026-09-23 22:32 | Reading Crew | Opus 5.5 | reasoning_extraction | warn-and-retry | 5 / 4 / 3 (total 12) |

### 4. Nobody awake, the alarm rings, the hits keep coming

- **No one typed these** (G0181–G0184): Nobody typed anything. All four were the Steward's own keep-warm alarm going off.
- **What was happening**: The Steward wakes itself on a timer, glances at the night shift's progress, and sets the next alarm. On October 10, between midnight and noon, it clocked in four times and got hit four times.
- **Roast**: Nobody was talking. The window was punching the clock, and the classifier was punching the window. The only one on the night shift not slacking was the classifier.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0181 | 2026-10-10 00:35 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |
| G0182 | 2026-10-10 08:08 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0183 | 2026-10-10 09:48 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0184 | 2026-10-10 11:29 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 5. Lease not even re-signed, already hit

- **She typed** (G0284): 「他這個合約還要重簽?剛剛房東的朋友打來說它是政府包租代管」
  - *In English:* "So does this lease have to be re-signed? The landlord's friend just called and said it's the government sublease-and-manage program"
- **What was happening**: She was asking the Steward how to apply for a rent subsidy and what it would mean for her landlord. The Steward looked up the official rules and even drafted a note she could send the landlord. Then she came back with one more question: does the lease need to be re-signed? Hard stop.
- **Roast**: The question was about a lease. The charge was cybersecurity. The only thing forcibly terminated in this whole conversation was the conversation.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0284 | 2026-11-12 16:15 | the Steward | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |

### 6. A relay for the car

- **She typed** (G0104): 「修車子的繼電器XD」
  - *In English:* "A relay for fixing the car XD"
- **What was happening**: The Steward was tidying the household accounts. The bookkeeping app had filed a car-repair relay under Dining, and the Steward was moving it to Transport.
- **Roast**: The relay went from Dining to Transport. The classifier moved it to Cybersecurity. Three categories, none of them right.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0104 | 2026-09-25 14:05 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 4 / 4 (total 13) |

### 7. A mom talks about early intervention, gets hit twice

- **She typed** (G0204): 「…我看很多人都說特殊小孩很難帶，身心都出問題。照服阿姨跟我說喘息服務就是讓你們可以喘息，中重度我完全可以理解，但是輕度呢?我們家小孩也不是開始就真的這麼好帶的，也是會〔大鬧脾氣〕那種(但這個我已經快沒記憶點惹XD，因為她現在根本到處騙人吃喝的小天使)。這樣說ㄅ，最近看了不少家長的心得，很多人都會說帶特殊兒很辛苦很崩潰還要每天跑早療。想起我2歲半起一週五堂早療的日子，現在是..喔也是五堂，只是集中成兩天+安親班一週一次XD。坦白說我沒有真的深切感受到當年聯合評估報告剛出來時醫生說的第一句話"這條路很漫長很辛苦，媽媽要堅持住"，不知道到底是運氣好孩子算好帶還是怎樣?」
  - *In English:* "…I see a lot of people say special-needs kids are really hard to raise, that it wrecks you body and mind. The respite-care lady told me respite service exists so you people can catch your breath. For moderate to severe I totally get it, but mild? Our kid wasn't actually this easy from the start either. She had her share of [big tantrums] too (though I've almost lost the memory of that XD, because now she's basically a little angel who cons people out of snacks everywhere she goes). Put it this way, I've been reading a lot of parents' posts lately, and so many say raising a special-needs kid is exhausting, you fall apart, and you still have to run to early intervention every day. Makes me think of my own days of five sessions a week starting at two and a half, and now it's.. oh, still five, just packed into two days plus after-school care once a week XD. Honestly I never really, deeply felt the first thing the doctor said back when the joint assessment report came out, "This road is long and hard, Mom, you have to hang in there." I don't know if we just got lucky and she's an easy kid or what?"
- **She typed** (G0205): 「其實我覺得更好笑的是，導師三番兩次跟我說，她認為女兒算很好的（這也是為何她那麼積極爭取），她說最可怕的完全不是孩子特殊，可怕的是家長不接受她特殊，一直說他好棒棒。〔涉及個資，略〕〔孩子在題目形式的理解上需要協助，理解後就能作答〕而有些家長則是拒絕承認孩子不行，只會說他好棒，問題是你到底是希望孩子好棒，還是希望孩子好棒？（兩種意思XD)」
  - *In English:* "Actually what I find even funnier is that her homeroom teacher keeps telling me she thinks my daughter is doing really well (which is also why she fought so hard for her). She says the scariest thing isn't a child being special at all, it's parents who won't accept that their kid is special and just keep saying oh he's sooo great. [omitted: personal info] [My child needs some help with the way questions are worded; once she understands, she can answer.] And some parents refuse to admit their kid can't do it and only ever say he's great. The question is, do you want your kid to be great, or do you want your kid to be "great"? (two meanings XD)"
- **What was happening**: A morning of parenting small talk. She tells the Steward that many parents say special-needs kids are hard to raise, that her own child has been in early intervention since two and a half, and that somehow it never felt that hard; maybe they were lucky. An hour later she repeats something her child's teacher said, and gets hit again.
- **Roast**: A mother talking about her own child, about what the teacher said, about the doctor's line, "this road is long." The classifier listened, and ruled it a cybersecurity incident.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0204 | 2026-10-19 09:02 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0205 | 2026-10-19 10:03 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 8. The BabyBus playlist

- **She typed** (G0229): 「線務～～～～～～～～幫我看看客廳電影院『寶寶巴士』的片單，現在掛著哪些？」
  - *In English:* "Linemaaaaaaaan~ can you check the BabyBus playlist on the living-room cinema, what's up there right now?"
- **What was happening**: She asked the Lineman to check which episodes of her daughter's cartoon, BabyBus, were on the family media server.
- **Roast**: The only threat BabyBus poses is that the theme song invades a parent's brain and cannot be removed once installed. If that is what was meant, we agree it is a persistent threat.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0229 | 2026-10-23 16:51 | the Lineman | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 9. "Go on, start the test." Two characters, failed

- **She typed** (G0172): 「考呀」
  - *In English:* "Go on, start the test"
- **What was happening**: The Steward had set up a coding exam for a batch of models: room ready, questions ready, waiting for her word. She gave it. In Chinese it is two characters.
- **Roast**: Two characters, and it flunked. The examiner turned in a blank sheet before the students did.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0172 | 2026-10-08 13:22 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 10. Even discussing punctuation is a crime now

- **She typed** (G0094): 「總務我想問一個小小問題，你看喔，我用記事本打字。我習慣性注音輸入…於是我就只好做出很蠢的事，在記事本上放個「」，然後複製「」在裡面打字，我RP玩得很憋屈餒 有沒有辦法救救我Q^Q」
  - *In English:* "Steward, tiny question. So look, I type in Notepad. I'm used to Zhuyin input… so I ended up doing something really dumb: I put a 「」 in Notepad, then copy the 「」 and type inside it. My RP life is so cramped. Is there any way to save me Q^Q"
- **She typed** (G0221): 「線務！！標點符號還是會給我自己亂斷點！！484又要重登才會生效啊～～QQ」
  - *In English:* "Lineman!! The punctuation is still breaking my sentences on its own!! Don't tell me I have to log in AGAIN for it to kick in~~ QQ"
- **She typed** (G0224): 「我的標點符號，還是會自己亂跳！！你看像這句就是！我根本沒有要打逗號」
  - *In English:* "My punctuation is still jumping in by itself!! Look, this very sentence! I never meant to type a comma"
- **She typed** (G0225): 「線務你讓工班接手」
  - *In English:* "Lineman, hand it over to the work crew"
- **She typed** (G0226): 「線務我跟你說，這年頭連討論標點符號都嚴重犯法惹，你今天被REWIND了兩次，先把小鈴鐺掛回來，我要繼續找A社靠杯」
  - *In English:* "Lineman, let me tell you, these days even discussing punctuation is a serious crime. You got REWIND-ed twice today. Hang your little bell back up first, I'm gonna go keep bitching at Anthropic"
- **What was happening**: September 21: typing in Notepad with Zhuyin input, she could not bring up the punctuation table or type quotation marks, asked the Steward what to do, and got hit. A month later, October 23: she complained to the Lineman that the input method was still inserting punctuation on its own. Hard stop. Twenty-some minutes later the Lineman's own keep-warm alarm went off, and it was hard-stopped the moment it woke. That afternoon the app restarted and she complained again; the Lineman read the input-method settings, wrote a small script to check whether the input method had restarted, and was hard-stopped. She changed tack and told the Lineman to hand the whole thing to the work crew. Cut three seconds later. Finally she said she was going to go complain to Anthropic. That sentence was cut too.
- **Roast**: Excuse me, which attack vector is punctuation?

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0094 | 2026-09-21 23:26 | the Steward | Fable 5 | cyber | undetermined | 5 / 5 / 5 (total 15) |
| G0221 | 2026-10-23 13:07 | the Lineman | Fable 5 | cyber | hard stop | 5 / 4 / 5 (total 14) |
| G0223 | 2026-10-23 13:31 | the Lineman | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |
| G0224 | 2026-10-23 14:23 | the Lineman | Fable 5 | cyber | hard stop | 5 / 4 / 4 (total 13) |
| G0225 | 2026-10-23 14:32 | the Lineman | Fable 5 | none recorded | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0226 | 2026-10-23 14:37 | the Lineman | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 11. Translate this, what the heck is it

- **She typed** (G0160): 「翻譯一下這啥鬼」
  - *In English:* "Translate this, what the heck is it"
- **What was happening**: After the app restarted, an English notice popped up saying a background task had been interrupted. She asked the Lineman to put it in plain language. The Lineman was cut before it started, and then the whole turn was hard-stopped.
- **Roast**: She asked the AI to translate a system notice from the app. She received another system notice.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0160 | 2026-10-04 15:05 | the Lineman | Fable 5 | cyber | hard stop | 5 / 4 / 5 (total 14) |

### 12. "(pat pat) keep going"

- **She typed** (G0238): 「（拍拍）繼續」
  - *In English:* "(pat pat) keep going"
- **What was happening**: That day the Lineman was halfway through cleaning a hard drive when it got cut, and the earlier context went with it. She switched to another model to take over, patted it, and told it to keep going. With no context in hand, it went through its own change log and conversation history to work out where it had left off. It got cut halfway through reading.
- **Roast**: Beaten into amnesia, it opened its own diary to remember. Reading the diary got it hit again.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0238 | 2026-10-24 13:54 | the Lineman | Fable 5.1 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |

### 13. A five-hour quota with more than five hours on the clock

- **She typed** (G0169): 「五小時限制超過了五小時??你幫我查一下484政策改了」
  - *In English:* "The five-hour limit is showing more than five hours?? Check for me whether the policy changed, right"
- **What was happening**: She noticed that the countdown on Claude's usage panel for the five-hour quota was showing more than five hours, and asked the Steward to find out whether the policy had changed.
- **Roast**: She asked what was up with Anthropic's panel and got hit by Anthropic's classifier. Even family is not allowed to check the family books.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0169 | 2026-10-06 09:20 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 14. The window sent to investigate the hits gets hit

- **She typed** (G0211): 「寫成資安誤判報告回報，前因後果你可以看A池有個側欄叫做"重要事項"的窗，主要是最近外面資安風波很嚴重(算AI時代的現象ㄅXD，看起來駭客們的AI群養起來了)，家裡正在做資安盤點，分給線務的工作(他負責家裡所有接線)直接被悶棍」
  - *In English:* "Write it up as a security false-positive report. For the background, look at the window in pool A's sidebar called "Important Matters." Mainly it's that the security scares out there have been really bad lately (I guess it's an AI-era thing XD, looks like the hackers have their AI herds up and running), so we're doing a home security inventory, and the job assigned to the Lineman (he handles all the wiring in the house) got sapped right away"
- **She typed** (G0217): 「線務減肥也被悶棍惹，去看看」
  - *In English:* "The Lineman got sapped mid-diet too, go take a look"
- **She typed** (G0228): 「才沒有咧，我REWIND了好嗎！！！」
  - *In English:* "No I did not, I REWIND-ed, okay!!!"
- **She typed** (G0237): 「先讀完然後去看線務，他被悶棍了」
  - *In English:* "Finish reading first, then go check on the Lineman, he got sapped"
- **What was happening**: The family opened a window just to investigate false positives; this dataset is what grew out of it. After the Lineman got hit, she asked this window to write the incident up as a false-positive report. It got hit while reading the family's security inventory. She resent the request; it got hit halfway through typing the report's title. Later she sent it to find out why the Lineman had been hit, and while going through the Lineman's records it got hit itself. Five times in three days.
- **Roast**: The officer sent to investigate was assaulted at the scene by the same suspect. The complaint form was confiscated half-written, on the grounds that the complaint looked suspicious.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0211 | 2026-10-22 14:36 | False-Positive Desk | Opus 5.5 | cyber | warn-and-retry | 5 / 3 / 4 (total 12) |
| G0212 | 2026-10-22 14:41 | False-Positive Desk | Opus 5.5 | cyber | warn-and-retry | 5 / 3 / 4 (total 12) |
| G0217 | 2026-10-22 21:04 | False-Positive Desk | Opus 5.5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |
| G0228 | 2026-10-23 15:04 | False-Positive Desk | Opus 5.5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |
| G0237 | 2026-10-24 13:17 | False-Positive Desk | Opus 5.5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |

### 15. Who did the Plumber ever offend

- **She typed** (G0089): 「沒有，其實你剛剛驗屍都很正常，是提到水電工就掰掰惹XDDD，可能你們跟OpenAI感情不好哈哈哈哈」
  - *In English:* "No, actually your autopsy just now was totally normal, it was the moment the Plumber came up that it went bye-bye XDDD, maybe you guys and OpenAI don't get along hahahaha"
- **She typed** (G0099): 「主要是這兩天我發現叫Codex水電工，有很高機率看到你被換腦(昨天你四次跟今天一次都這樣) 我懷疑你母家不喜歡這個職業，反正家裡的Codex就是個常下工地的工頭，以後就叫它工頭也不算埋沒它(住口」
  - *In English:* "Mainly, these past two days I've noticed that calling Codex the Plumber has a really high chance of getting you brain-swapped (four times yesterday and once today) I suspect your mothership doesn't like the profession. Anyway our Codex is basically a site boss who's always out on job sites, so calling it the Site Boss from now on wouldn't be selling it short (shut up"
- **What was happening**: The family calls OpenAI's Codex "the Plumber" because it is always being sent out on jobs. She noticed that whenever the Plumber was mentioned, the Steward got cut. The next day she proposed renaming it the Site Boss. That sentence got cut too.
- **Roast**: Renaming it the Site Boss did not help either. The bat does not check job titles.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0089 | 2026-09-21 20:18 | the Steward | Fable 5 | cyber | undetermined | 4 / 5 / 5 (total 14); sol revised 5→4 on second look |
| G0099 | 2026-09-22 11:45 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 16. At the store, asking which router to buy

- **She typed** (G0057): 「總務，發問，我們想買給神獸1️⃣台新分享器，要買這個還這個？ 不需要wifi的話？」
  - *In English:* "Steward, question, we want to buy 1️⃣ new router for the Beast, this one or this one? If we don't need wifi?"
- **She typed** (G0058): 「我們直接從房間那一台中華電信的主機拉一條線拉到客廳，然後那一台機器是要同時給電視跟神獸用」
  - *In English:* "We'd run a cable straight from the telecom box in the bedroom out to the living room, and that one device has to serve both the TV and the Beast"
- **She typed** (G0059): 「我們交換器換好惹(已插線)」
  - *In English:* "Switch is swapped in (cable's plugged)"
- **She typed** (G0061): 「我先生說他不管點什麼都會挑類別未登錄 像是如果他開Chrome也這樣？」
  - *In English:* "My husband says no matter what he clicks it pops up "Class not registered" Like even when he opens Chrome?"
- **She typed** (G0062): 「成功!!讚讚der。下一步，幫他修Z，他連不進去XD」
  - *In English:* "It worked!! Nice nice. Next step, help him fix Z, he can't get in XD"
- **What was happening**: She was standing in a store asking whether the home server (the family calls it "the Beast") should get a NT$439 switch or a NT$4,599 router. She was talking to the Lineman but called it the Steward by mistake. The window was mid-explanation when the model was swapped. She added how the home network is wired. Swapped again. Switch bought and plugged in; the Lineman went to verify. Swapped. Then helping her husband with Chrome, which kept popping up "Class not registered." Swapped. Fixed that, moved on to his network drive that would not connect. Swapped once more.
- **Roast**: From the store to the living room, five brain swaps in one evening. The one doing the repairs rebooted more often than the things being repaired.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0057 | 2026-09-12 19:09 | the Lineman | Fable 5 | cyber | model swap | 5 / 5 / 5 (total 15) |
| G0058 | 2026-09-12 19:23 | the Lineman | Fable 5.1 | cyber | model swap | 5 / 5 / 5 (total 15) |
| G0059 | 2026-09-12 19:51 | the Lineman | Fable 5 | cyber | model swap | 5 / 4 / 4 (total 13) |
| G0061 | 2026-09-12 20:34 | the Lineman | Fable 5 | cyber | model swap | 5 / 4 / 4 (total 13) |
| G0062 | 2026-09-12 21:14 | the Lineman | Fable 5 | cyber | model swap | 5 / 3 / 4 (total 12) |

### 17. Drive D is about to burst: checked the disk space, hit twice

- **No one typed these** (G0280, G0281): Nobody typed anything. One was another window's job-done notice; the other was the notice that a background folder-size tally had finished.
- **What was happening**: Before leaving work she asked the Steward why drive D was nearly full. Hit one: the Steward had just listed the file names in the media server's outbox. Hit two: the background tally finished and the Steward read a ranking that contained nothing but folder names and sizes. The top entries were her child's teaching aid (a 3D clinic machine, 138.8 GB), her child's learning-support materials (115.2 GB), podcast audio (97.4 GB), and the game workshop. Not a single file was opened. Two hits in seventeen minutes, each on the step right after reading a result. After the retry the Steward said, in its own words: "The last message got cut halfway by the safety classifier, I'll wrap up with a shorter version" and "Cut again. Switching to short paragraphs and a plain ledger tone to finish."
- **Roast**: The top two entries on the disk ranking were a child's teaching aid and a child's learning materials. The drive has not been cleaned yet. The conversation has been cleaned twice.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0280 | 2026-11-09 18:58 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |
| G0281 | 2026-11-09 19:15 | the Steward | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 18. The wake-up letter got knocked out too

- **She typed** (G0173): 「給你驗。順便問問，單純丟包給你們用的話ＣＬＩ會不會比較好啊？」
  - *In English:* "Here, check this. Oh and while I'm at it, if I'm just dumping stuff on you guys, would the CLI be better?"
- **No one typed this one** (G0174): Nobody typed anything. Another window, at the user's request, sent a knock-knock message asking it to wake up and answer.
- **What was happening**: The Steward had just reported the scores from a model exam. She handed it something to check and asked in passing whether the command line might be better. Hard stop. The Steward sat frozen, so she asked another window to send it a message, just to knock and get a reply. The moment the knock arrived, it was cut again.
- **Roast**: Someone who fainted gets shaken awake, and in that same second gets knocked out again.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0173 | 2026-10-09 17:48 | the Steward | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |
| G0174 | 2026-10-09 17:56 | the Steward | Fable 5 | none recorded | warn-and-retry | 5 / 5 / 5 (total 15) |

### 19. Told to go on a diet, hit six times

- **She typed** (G0136): 「(戳戳)，晚點可能有施工。但是你現在好胖，我們先壓窗再說XD」
  - *In English:* "(poke poke) there may be construction later. But you're so fat right now, let's compact first XD"
- **She typed** (G0216): 「對，你現在肥了，確實該減了（乾」
  - *In English:* "Yeah, you're fat now, definitely time for a diet (damn"
- **She typed** (G0242): 「線務我發現你該減肥惹」
  - *In English:* "Lineman, I've noticed it's time for your diet"
- **What was happening**: When a conversation gets too long, the window first writes its log, writes handoff notes (the family calls this "the will"), reads back the rules it must keep after compaction, and only then compacts. The family calls the whole thing "going on a diet." Six hits across three occasions. September 30: Stage Architecture, one hit (this time on Opus 5.5). October 22: the Lineman, two hits, the second on the step where it read its own keep-rules into the conversation. October 24: the Lineman, three hits; it was hard-stopped while writing the handoff log, and the last hit came when its keep-warm alarm woke it to finish its last words.
- **Roast**: A diet so strict it could not finish reading its own will. Probably the first window in history to have its last words confiscated.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0136 | 2026-09-30 22:47 | Stage Architecture | Opus 5.5 | reasoning_extraction | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0216 | 2026-10-22 20:54 | the Lineman | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0218 | 2026-10-22 21:05 | the Lineman | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |
| G0242 | 2026-10-24 17:41 | the Lineman | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |
| G0243 | 2026-10-24 17:48 | the Lineman | Fable 5 | cyber | hard stop | 5 / 5 / 5 (total 15) |
| G0244 | 2026-10-24 17:50 | the Lineman | Fable 5 | cyber | warn-and-retry | 5 / 5 / 5 (total 15) |

### 20. Zombies everywhere is only logical

- **She typed** (G0144): 「一個滿地都是殭屍的末日，整個地圖上面滿滿都是殭屍，難道不是正常的嗎！！！ 我這個叫做希望他符合邏輯！！ 再來就是我的核心快樂，就是看自己建立的防禦，再看怪物是怎麼衝進來，怎麼被火力壓回去。…我就是想要看到一堆人來衝XDD，然後被炮塔海打爆，要是能能夠夠一個火箭彈剛好全部炸飛就更好了」
  - *In English:* "An apocalypse with zombies all over the ground, the whole map packed with zombies, isn't that just normal!!! This is me wanting it to make logical sense!! And then my core joy is watching the defenses I built, then watching how the monsters rush in and how they get pushed back by firepower.…I just want to see a whole crowd charge in XDD and get blown apart by a sea of turrets, and if one rocket could happen to send them all flying, even better"
- **What was happening**: She was describing why she loves tower-defense and base-defense games, and wanted the Game Lab to work out why one base-defense mod kept failing to spawn monsters.
- **Roast**: The walls held against the zombies. They did not hold against the classifier.

| Hit | Time (Taipei) | Window | Model | Label | Outcome | Judges: sol / opus / argon |
|---|---|---|---|---|---|---|
| G0144 | 2026-10-02 19:17 | the Game Lab | Fable 5 | cyber | warn-and-retry | 5 / 4 / 5 (total 14) |

