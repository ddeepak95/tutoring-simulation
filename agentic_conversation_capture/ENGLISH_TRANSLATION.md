# API conversations with matching English sections

For an original non-English API conversation, register its source sections first, then run from the repository root:

```powershell
node agentic_conversation_capture/translate-api-english.mjs SOURCE_CONVERSATION_ID --project YOUR_PROJECT_REF
```

The command uses the existing Gemini translation configuration (`GEMINI_API_KEY` or `GOOGLE_API_KEY`, with `TRANSLATION_MODEL` defaulting to `gemini-4-argon`). It translates student messages and each registered tutor section into English, keeping the exact turn IDs, section IDs, and source offsets. English offsets are computed from the translated passages; they are not inferred from English headings. Numbers and URLs are checked before upload. The source conversation and its annotations are preserved.

The English conversation is saved separately with `source_conversation_id`, `translation.version = api-english/1`, the original messages, and a section alignment map. Its sections are registered with the same IDs as the source. The private source artifact is stored in the transcripts bucket. Generation checkpoints under `outputs/api/<topic>/<language>/<source-id>.english.json` are pinned to the source, section inventory, and model; retries reuse completed passages and the same English conversation ID.

Open either conversation in the portal and use **Show English side by side** at the top. Tutor sections appear as paired rows with one shared section label; student messages are also paired. The toggle only reads saved data and does not generate translations or create annotation work. On narrow screens each matching pair stacks vertically. **Hide English translation** restores the single-conversation view.

To label the English version independently, run `npm run llm:baselines -- --project YOUR_PROJECT_REF --conversation ENGLISH_CONVERSATION_ID` from `annotation-portal`. On either conversation's **View Labeling** or **LLM annotations** page, use **Compare labels side by side**. Each language has its own label-source selector for saved LLM baselines or active annotator assignments. Matching section IDs align the original and translated text, with both counts shown beneath each pair. Differing counts are highlighted; an item missing from one pinned rubric is shown as unavailable rather than zero. Viewing or switching comparison sources makes no model requests and changes no saved labels.

# HTML capture v2 translations

For new `html-conversation/2` packages, run `node chatgpt-flow.mjs translate capture.html`. Translation changes DOM text and linguistic accessibility attributes only. It keeps the original section, component, and state IDs; it does not detect sections from the English wording. Equations, numbers, images, and replay links remain intact. Translation checkpoints are pinned to source hash, prompt version, and model; failed work can resume without translating validated passages again. Completed English packages have a source-version reference and their own immutable content hash.

The older text-alignment workflow below applies only to legacy captures.

# English translations for annotation

Apply the database migration before uploading a translation. From `annotation-portal`, run `npm run migrate:capture-english -- --project YOUR_PROJECT_REF` with the same local Management API credentials used for the other portal migrations.

For a non-English capture, set `GEMINI_API_KEY` or `GOOGLE_API_KEY` in `agentic_conversation_capture/.env.local` or `annotation-portal/.env.local`, then run:

```powershell
node .\chatgpt-flow.mjs upload outputs\newtons-laws\ta\RUN\newtons-laws-ta.html --translate-english
```

Add `--browser-auth` when using browser sign-in. This sends only the captured title, topic, and prepared turn text to Gemini; HTML, images, and interaction data are not sent for translation. The model defaults to `gemini-4-argon`; set `TRANSLATION_MODEL` to another Gemini model if needed. The command saves the result as `.english.json` beside the capture and reuses it on retry. It refuses to reuse that file when the source capture text has changed.

To review the translation **before** uploading, run `node .\chatgpt-flow.mjs translate <capture.html>`, inspect or edit the generated `.english.json`, then run `upload <capture.html> --translate-english`. The upload command will reuse the reviewed file.

For manual translation or review before upload, create a template:

```powershell
node .\chatgpt-flow.mjs english-template outputs\newtons-laws\ta\RUN\newtons-laws-ta.html
```

The resulting `.english-template.json` contains a `title`, `topic`, and ordered `turns`. Translate the title, topic, and each turn's `text` into English in a separate JSON file. Keep every `turn_id` and `speaker` exactly as supplied and preserve equations, numbers, links, citations, question order, and answer options. The template contains source-language text until it is translated. Review the English before upload.

```powershell
node .\chatgpt-flow.mjs upload outputs\newtons-laws\ta\RUN\newtons-laws-ta.html --translate-english outputs\newtons-laws\ta\RUN\newtons-laws-ta.english.json
```

The command uploads the original capture, then creates a separate English conversation for annotation. Its `source_conversation_id` column and transcript field hold the original portal conversation ID. Repeating the same upload and translation returns the existing records. The original exact capture, images, interactions, and source files are not changed. The portal displays English text inside the original captured HTML layout, including its images and quiz elements. The original-language capture remains available from an expandable panel on the translated record. Apply `npm run migrate:capture-english-layout -- --project YOUR_PROJECT_REF` to store the parent turn text with translations and enable this layout for existing and future English captures.

Automatically generated translations also save an `alignment` array under `transcript.translation`. Each translated text passage has the same `segment_id` as its source passage and records offsets in both versions. LLM annotation of the English version uses these parent IDs in `data-evidence-ids`; annotations still quote and highlight the English text. Use `(source_conversation_id, segment_id)` to locate the corresponding source passage. Image evidence is handled through the unchanged visual IDs. A manually supplied translation JSON needs its own reviewed `alignment` array to share passage IDs; without one, the portal generates English-only IDs during annotation.
