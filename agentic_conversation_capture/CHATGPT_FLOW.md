# HTML-first ChatGPT capture

New agent captures write a `*.html-conversation.json` package (`html-conversation/2`) and a standalone offline HTML view. HTML is authoritative; there is no separate transcript export. The agent graph may contain diagnostic text for exploration, but labeling never uses it as source evidence.

All conversation images are saved, including lazy/hidden DOM images, standalone SVG illustrations, and gallery images mounted in dialogs outside the response. The collector checks the initial response and changed interactive states, follows gallery navigation (or thumbnail controls), and records image-to-turn/section references in `image_inventory`. Gallery coverage that cannot be verified keeps the package in draft status. Each export automatically verifies downloaded image byte sizes and SHA-256 hashes and decodes the files in Chromium. Failures stop export; successful checks are recorded in `*.asset-verification.json`, removing the separate manual image-verification step. The admin View Conversation page has Conversation and Images tabs; Images reads the complete saved asset manifest, including images absent from the initial HTML view.

Captured shared SVG icon sprites are embedded in new packages, so icons do not depend on the live ChatGPT site. The HTML renderer preserves CSS-variable borders, padding and spacing, theme context, image classes, and SVG presentation attributes.

Section IDs (`t1s1`, `t1s2`, etc.) are assigned to the initial DOM before exploration. Interactive components and states receive section-scoped IDs. Their HTML, assets, transitions, and coverage remain within the original section, including images revealed by interactive controls. Quiz grading feedback and score screens are excluded. Finalized packages are immutable; use another output name for a revised version.

Capture every image, tab, and instructional reveal. Complete quiz capture is optional: keep the visible questions/options without exploring answers, feedback, or scores. Unvisited quiz questions do not block publication; describe this limited scope in the component coverage notes. Continuous controls use representative snapshots. Repeated exact states terminate branches. The bridge prevents repeated state/control actions. Interrupted or unverified coverage produces a draft that cannot be imported or labeled. Exploration has a 30-minute interruption deadline, not a completion threshold. Resume with `agent-save`; existing sessions retain their explored states and coverage. Use `--resume-agent` to finalize an already reviewed state graph without another agent pass. Targeted `agent-capture.mjs screenshot SESSION MESSAGE ANCHOR` captures components inside nested scroll containers.

`translate capture.html` translates DOM linguistic nodes and accessible labels, preserving section/component/state IDs, equations, numerical values, assets, and transition structure. It writes `*.english.json` and a resumable translation checkpoint. Source and target hashes must match their checkpoint. Images keep their original pixels. `upload capture.html --translate-english` verifies assets and imports both packages; translations must match the frozen source structure. A saved English package may be supplied explicitly after `--translate-english`.

The portal reads new sections directly from HTML and saves labels by section ID, item, category, quantity, and optional model evidence. New labels have no quotations or offsets. Rating turn inventory is retained without a transcript. Legacy scripted captures and unrelated imports keep their existing versioned paths.

Apply `npm run migrate:html-conversations -- --project PROJECT` in the portal before importing v2 packages. This installs storage only and does not delete conversations. `scripts/html-pilot.mjs` provides import, browser verification, and a separately gated transactional reset. Reset retains the verified Tamil/English pilot pair, accounts, rubric/configuration, and local files; it requires current pilot acceptance evidence and an unchanged database inventory.

Requires Windows, Google Chrome, and Node.js 22 or newer. Run these in PowerShell from `D:\Projects\PhD\tutoring-check\agentic_conversation_capture`:

```powershell
node .\chatgpt-flow.mjs topics
node .\chatgpt-flow.mjs run heart
node .\chatgpt-flow.mjs pipeline heart
node .\chatgpt-flow.mjs agent-save outputs\heart\en\20261020T153000123Z\heart-en.html
node .\chatgpt-flow.mjs review outputs\heart\en\20261020T153000123Z\heart-en.html
node .\chatgpt-flow.mjs upload outputs\heart\en\20261020T153000123Z\heart-en.html
node .\chatgpt-flow.mjs upload outputs\heart\en\20261020T153000123Z\heart-en.html --browser-auth
```

`run heart` reads the `heart` entry from `topics.json`. Each language block contains a `title` and `prompts` array; the first prompt starts a new ChatGPT conversation and the remaining prompts are sent as follow-ups in order. Each run is saved under its topic ID, language, and millisecond UTC timestamp, such as `outputs\heart\en\20261020T153000123Z\heart-en.html`, together with its images and metadata files. Run `node .\chatgpt-flow.mjs run` to process every topic, or add `--lang <key>` to use another language block.

Before saving, an automated pass classifies ordinary image controls and visible quizzes. Gallery collection handles images; quizzes keep their initial question/options. These known components do not require agent screenshots or clicks. If every component is covered, the Codex agent is skipped. Otherwise, the agent receives only unresolved controls and their short context through `agent-capture.mjs`, chooses any needed interactions, and records each resulting DOM state and transition. Its first priority is to save all images, including hidden gallery images and images behind interactive controls. It keeps visible quiz questions and options without attempting complete question coverage. It only interacts with a quiz when necessary to reveal an otherwise inaccessible image. Answer outcomes, grading feedback, and scores are outside the capture goal. It also samples distinct instructional widget states, diagrams, and animations. It skips repeated choices with the same behavior, links, favorites, and suggested prompts. The bridge reports visual hints for SVG, canvas, video, and CSS animations; the agent can request a screenshot when a visual change is unclear. Each click returns the new state, so the agent only needs another inspection if the page changes independently. Visual states whose text is unchanged can still be stored when their SVG or state attributes change. Screenshots are evidence files, not playable animation recordings; canvas frames and video playback are not reconstructed offline. The agent does not use preconfigured widget names to choose interactions. Its `.agent-states.json` graph and `.agent-capture.log` are saved beside the HTML. The HTML replays recorded transitions and lets readers move between captured quiz questions without selecting an answer, even when the live quiz required one to enable Next. Revealed HTML remains in its original section component; it is not appended as another section. Incomplete exploration is saved as a resumable draft and cannot be imported. It requires an installed, authenticated Codex CLI. Use `--scripted-capture` to run the older fixed widget handlers instead.

Each save automatically writes a lightweight `.interactions.json` capture report. It records state, transition, and control counts, the number of controls the agent chose not to explore, time or click limits, and any ambiguous replay edges. The full controls and states live in `.agent-states.json`, so the report does not duplicate them. This is diagnostic metadata generated from the state graph; it does not run another agent or claim that every question or answer was checked. The filename is retained for existing commands that read the conversation URL from it. Add `--agent-review` only when a separate offline behavior check is useful; that optional agent pass has a three-minute limit and writes a review log.

`pipeline heart` runs agent capture, Supabase upload, and Gemini Argon baseline generation in sequence. It passes the returned conversation ID to image-only Gemini Argon baseline generation and prints both IDs. Image-only output is published after all turns validate. Use `--agent-review` for the optional offline interaction review, or `--screenshots` for optional live screenshots. A failed later stage does not delete the local capture or uploaded conversation; rerun the relevant stage manually to avoid creating a duplicate ChatGPT capture.

To apply agent capture to a previously saved conversation while its live tab is still open, run `node .\chatgpt-flow.mjs agent-save <existing.html>`. This writes `<existing>.agent.html` and a new set of assets without replacing the original. If exploration succeeded but export failed, rerun with `--resume-agent` to reuse the recorded state graph without another agent pass.

Manual commands still work: `start`, `ask "question" [--out file.html]`, `followup "question" [--out file.html]`, `save [file.html]`, and `status`. Without `--out`, manual captures use `C:\Users\ddeep\chatgpt-conversation.html`. Captures contain only the conversation messages and links to their saved local images, without ChatGPT's sidebar or input box. Add `--screenshots` to `run`, `ask`, `followup`, `save`, or `review` to also capture live-chat screenshots; `screenshots [file.html]` captures them without resaving the HTML.

Chrome uses a dedicated profile at `C:\Users\ddeep\chrome-heart-session`. If ChatGPT asks you to log in or solve a challenge, do that in the Chrome window and then retry the command. The saved HTML is an offline conversation snapshot; send followups with the command, since ChatGPT's prompt box is not part of the saved file.

Images are saved separately in the run folder's short `img\` directory. For `outputs\heart\en\20261020T153000123Z\heart-en.html`, the image manifest and archive metadata are `heart-en.images.json` and `heart-en.capture.json` in the same folder. The short directory name keeps local image paths within Windows browser limits. The HTML uses relative image paths, so keep these files together. Repeated image bytes share a SHA-256 filename.

To upload a capture, configure the portal's Supabase URL and publishable key, plus an existing admin or annotator account. The CLI reads the public URL/key from `../annotation-portal/.env.local` by default. For browser sign-in, run the local portal at `http://127.0.0.1:5173/`, then use `upload ... --browser-auth`; sign in in the Chrome tab that opens. Alternatively, put `PORTAL_USERNAME` and `PORTAL_PASSWORD` in this project's local `.env.local`; they are loaded into the process only and are never printed. Do not put credentials in `topics.json` or command arguments. Apply the ChatGPT import, archive-preparation, capture-image Storage, direct-capture, direct-exact-capture, and exact-document migrations first. Run `npm run migrate:exact-documents -- --project YOUR_PROJECT_REF` from the portal directory. Run `node .\chatgpt-flow.mjs upload <capture-folder>\heart-en.html` for a saved capture. The upload uses the topic name and language recorded from `topics.json`, stores the full original HTML document in a conversation-scoped exact-document table, and displays it in the portal's **Exact original capture** frame; images are uploaded separately and local links are rewritten to public Storage URLs. The local HTML and images stay unchanged. It returns a conversation ID and does not create an HTML archive. Captures made before exact-capture metadata was added need to be uploaded again.

Optional screenshots come from the live ChatGPT tab and are listed in `<run-folder>\<topic-id>-<lang>.live-screenshots\manifest.json`. Run `review [file.html]` to launch a separate Codex agent for an existing capture. It samples meaningful live controls and compares their recorded transitions with the offline HTML; it can use screenshots as extra visual context when requested. This review is optional. ChatGPT content is untrusted; keep the review agent sandboxed.

## Pending batch captures

Run `node .\run-pending.mjs` from the capture directory to process topic/language pairs missing from the current portal HTML imports. Existing imports, including translated versions, are skipped; old local upload receipts alone do not mark a pair complete. The queue waits 20 seconds between prompts and 60 seconds between captures, with a 180-second cooldown before one retry. Complete local HTML packages are uploaded without regenerating their conversation. Progress and per-pair logs live under `outputs/batches`; resume an interrupted queue with `node .\run-pending.mjs outputs\batches\<checkpoint>.json`. Failures retain their local files and are reported in the checkpoint. For individual runs, `CAPTURE_PROMPT_DELAY_MS` sets the delay between prompts.


New HTML uploads require the portal's `migrate:capture-files` migration. Uploads store verified immutable package files in private Storage and register metadata/section IDs in database rows. If the new RPC is unavailable, upload stops before sending assets. Existing inline captures can be moved with `node .\offload-hosted-captures.mjs`; only exact local versions are accepted, and hosted annotations are preserved.

## Image-focused recovery pilot

`node agentic_conversation_capture/pilot-image-capture.mjs` recovers the saved Bengali Newton?s Laws conversation only; it cannot send prompts. It compares all three turns and frozen section contents before media collection. Job-owned targets, inventories, gallery views, routing fingerprints, assets, and phase metrics are checkpointed in `pilot-job.json`. Do not use the batch runner for this pilot. Existing imports are unchanged.

The versioned DOM adapter opens semantic image controls using target-scoped CDP pointer events. Quizzes retain their initial state. Ambiguous components use at most eight cropped screenshots in one Decisions request per turn, with one transient retry. Only fixed discovered actions with probability ?0.95 and confidence ?0.90 qualify; unsupported reveals require review. No full transcript or HTML is sent to Decisions. No request is made when DOM inspection resolves every candidate.

Publication requires complete image coverage, hash/decode checks, and a `visual-audit.json` with `status: passed` matching the immutable package `version_hash`. Run with `--publish` only after that audit. Published packages live in private Storage; database rows remain metadata only. The owned browser target closes after publication. Failures retain the draft and source URL. Connection failures stop the batch rather than regenerating conversations across the queue. Pacing remains 20 seconds between new prompts, 60 seconds between captures, and 180 seconds before a transient retry.

Routine captures default to deterministic DOM-only routing. Unsupported patterns become review items without screenshots or model calls. `--decisions` explicitly enables the bounded routing fallback. Tests and visual audits are development checks, not stages run for every conversation. Routine jobs only check source/section identity, image inventory coverage, and new asset integrity; cached assets are not decoded again.

For `image-focused/1` captures, the flow bypasses the Codex exploration/review subprocess entirely after deterministic media coverage succeeds. Quiz navigation, answer selection, feedback and text-card exploration do not run. Broader browser/unit suites and visual audits are run when implementing or changing adapters, rather than for every capture.

## Routine capture: one command

Run these from the repository root (paths also work from another working directory):

```powershell
# Recover and import the next pending conversation.
node agentic_conversation_capture/capture.mjs

# See the queue without opening Chrome or importing anything.
node agentic_conversation_capture/capture.mjs --remaining --list

# Recover all remaining saved conversations, sequentially.
node agentic_conversation_capture/capture.mjs --remaining

# Process at most two, or select a specific pair.
node agentic_conversation_capture/capture.mjs --limit 2
node agentic_conversation_capture/capture.mjs --topic alkaline-earth-metals --lang zh
```

The command reads the current portal configuration and capture login from local environment files; no runtime credentials JSON or management token is required. The capture Chrome profile must already be available on its debugging endpoint at port 9222. It skips existing imports, uses the latest complete saved response graph, preserves frozen sections, collects images, verifies assets, exports, uploads to Storage, and verifies the import. It never generates replacement conversations.

Checkpoints resume automatically (`--resume` is accepted for clarity). A completed export goes directly to import on retry. Successful image downloads and verification remain cached. A project-scoped lock prevents overlapping jobs. There is a 60-second gap between attempts; transient failures get one stage retry after a 180-second cooldown. Browser or authentication failures stop the batch; unsupported layouts are recorded for review while an explicitly requested batch continues.

The default is code-driven DOM routing without agent exploration, screenshots, or model requests. `--decisions` opts into bounded routing for ambiguous controls. It requires `OPENAI_API_KEY` in the environment. Tests and manual visual audits are development checks, not per-conversation stages. Use this command instead of the historical `run-pending.mjs` generation runner or temporary per-language recovery scripts.

## Structural validation before publication

The single-command pipeline now runs `section-structure/1` checks before browser exploration and again against the exported sections before import. The direct HTML uploader applies the same gate, including translated packages. Resuming a completed export does not bypass validation.

New captures identify complete grids, headed diagram rows, tables, lists, figures, images and interactive components before selecting boundaries. These units receive capture block IDs. Internal labels stay inside the containing section. Borders alone do not make a container atomic: genuine headings within ordinary bordered prose wrappers can still form sections.

The gate rejects boundaries inside those units, isolated element-symbol sections, blocks owned by multiple sections, partial/duplicated blocks, and missing/reordered/duplicated text or media. Matching counts preserve intentional repeated content. Reports are saved as `section-validation-source.json`, `section-validation-export.json`, and `<package>.structure.json`. Reports are cached against their policy version and input fingerprint. No screenshots, model requests, full browser suite or visual audit runs as part of this check.

Failures that cannot be safely repaired mark the job `needs_review` and prevent asset upload/database import. An explicitly requested batch continues with other conversations; a browser connection failure still stops the batch. Existing finalized section IDs and captures are not silently renumbered or replaced. Correct a local draft before publication, or publish an explicit revision with an ID map for existing captures.

The regression fixtures cover both the periodic-element grid and stacked element labels in a trend diagram, ordinary bordered document wrappers, tables, lists, images, repeated content, partial blocks, report-cache invalidation, and rejection before any upload request. Run them when changing section detection:

```powershell
node --test agentic_conversation_capture/section-structure.test.mjs
```

### Automatic repair of unpublished drafts

Known grid/diagram boundary failures are repaired automatically by the normal command, then validated again:

```powershell
node agentic_conversation_capture/capture.mjs
```

Automatic repair keeps the original source graph unchanged, writes `repaired.agent-states.json`, records an old-to-new provisional section-ID map in the job checkpoint, removes boundaries inside recognized atomic blocks, and reruns the same structural gate. It preserves all content nodes and component anchors. The normal source comparison, media capture, export validation and import then continue. No new ChatGPT conversation is generated. Repair refuses published/exported work, captured media checkpoints, or explored state graphs; those require an explicit content revision. Unsupported patterns remain held for review.

Automatic repair is limited to recognized boundaries inside structural blocks. Missing/changed content and unknown failures remain held for review. Published/exported or explored work is never rewritten. `--repair-draft` remains accepted for compatibility; `--no-repair-draft` disables automatic repair. The remaining batch is not started when changing this setting.
