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
