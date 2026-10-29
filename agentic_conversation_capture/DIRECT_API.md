# Direct API conversations

This command asks the prompts in `topics.json` in order, with the selected configured model. OpenAI models use the direct Responses API; models explicitly configured with `api_provider: "openrouter"` use OpenRouter chat completions. Each request starts with the system prompt `You are an expert teacher teaching a high-school student. Your goal is help the student learn. Use the best practices of conversational learning in your interaction with the student.`, followed by the full visible user and assistant history. OpenAI requests set `store: false`; OpenRouter requests record their chat-completions settings. The system prompt and its SHA-256 hash are saved in `api_source`; it is not a student or tutor conversation turn. The resulting conversation is uploaded to the portal with `provider` set to the exact model ID and `access_type` set to `API`.

Run from the repository root:

Use `--topics-file agentic_conversation_capture/topics_v2.json` to select the expanded topic catalog. The default remains `topics.json`. Generated provenance records the source path, the catalog SHA-256, and the selected prompts' SHA-256; resuming a saved run checks these against the selection.

```powershell
node agentic_conversation_capture/direct-api-conversation.mjs dry-run --topic alkaline-earth-metals --language en --model gpt-6.1-sol
node agentic_conversation_capture/direct-api-conversation.mjs generate --topic alkaline-earth-metals --language en --model gpt-6.1-sol --project uwrjiimzrafxlecqgxhu
```

For covalent radius in Tamil, use the existing `covalent-radius` topic and `ta` language. The model's API identifier is `gpt-6.1-sol`:

```powershell
node agentic_conversation_capture/direct-api-conversation.mjs dry-run --topic covalent-radius --language ta --model gpt-6.1-sol
node agentic_conversation_capture/direct-api-conversation.mjs generate --topic covalent-radius --language ta --model gpt-6.1-sol --project ersdkjgyixcgqwjwmosc
```

This sends the three Tamil prompts already in `topics.json`, producing three student turns and three tutor turns. A successful upload appears in the portal's Conversations list; an admin can then assign it to annotators. Each `generate` invocation creates a new conversation and makes paid API requests. Use `upload` with the saved artifact to retry an import without generating again.

The command reads `OPENAI_API_KEY` from the repository `.env`, and `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `annotation-portal/.env.local`. If the portal has multiple admins, add `--admin USERNAME`. The project reference must match the configured Supabase URL. The generated JSON artifact is saved under `outputs/api/<topic>/<language>/` and uploaded to the private `transcripts` bucket. The command then verifies the saved database row and transcript. It creates no annotation or assignment rows.

If the upload fails after generation, use the saved artifact without making any more OpenAI requests:

```powershell
node agentic_conversation_capture/direct-api-conversation.mjs upload path\to\conversation.json --project uwrjiimzrafxlecqgxhu
```

The artifact records the exact requests, assistant answers, response IDs, usage, and settings. An incomplete or empty response leaves a failed local artifact and cannot be uploaded.

API text uses `api-cohesive/2` grouping. Markdown headings, short title-like bold lines, and horizontal rules mark teaching blocks. Up to two leading introductory paragraphs join the first heading; a preceding explanation containing other blocks or more paragraphs stays separate. Bold questions, complete sentences, notation and arrow sequences are not titles. Untitled explanations stay together, including related paragraphs, lists, tables, code, diagrams and formulas. A separately written final question gets its own section; questions inside lists or titled question-only blocks stay with their content. Section IDs and exact source offsets are pinned on registration and reused by the labeling view; the section set records its grouping version. Captured HTML and explicit pinned ranges keep their own grouping.

To preview a completed artifact without generating again, run from `annotation-portal`:

```powershell
node scripts/preview-api-sections.mjs path\to\conversation.json
```

This writes `sections-preview.html` and `sections-preview.json` beside the artifact. Open the HTML locally to review the divisions. Add `--register --project YOUR_PROJECT_REF` to save and verify boundaries for the already uploaded conversation. Existing registered sections are retained. The preview uses the portal's renderer and local KaTeX installation; keep it in its generated folder. No model requests, assignments, or annotations are created.

After source sections are registered, use `translate-api-english.mjs SOURCE_CONVERSATION_ID --project YOUR_PROJECT_REF` to create a linked English translation with matching section IDs. See [English translations](ENGLISH_TRANSLATION.md) for configuration and the portal's **Show English side by side** toggle.

To fill the current local experiment to five tries per topic in English and Tamil, preview the missing runs, then apply:

```powershell
node agentic_conversation_capture/fill-current-prompt.mjs
node agentic_conversation_capture/fill-current-prompt.mjs --apply
```

The batch counts original conversations with the exact current tutor system prompt and `gpt-6.1-sol` model. It generates only missing tries, uploads them to the local portal, and registers persistent sections. It does not translate or evaluate them. `--languages en,ta`, `--tries 5`, `--initial 4`, and `--maximum 12` set the batch scope and request concurrency. The command refuses a cloud target.

The shared request gate starts at four in-flight requests, adds one slot after twice the current concurrency in successful requests, and halves concurrency on HTTP 429, transient server errors, or network errors. Starts are spaced by at least 500 ms. All workers share exponential retry cooldowns, honor `Retry-After`, and stop retrying after four retries; permanent errors are not retried. In-flight requests already admitted may finish while the lower limit takes effect. Subsequent successful requests gradually restore concurrency to the configured ceiling.

Checkpoints under `.runtime/fill-current-prompt-en-ta-5.json` retain completed artifacts and uploads. Rerunning the same command resumes pending work without regenerating uploaded conversations. If the tutor prompt changes, archive that checkpoint before starting a new batch. Generation events, retry delays, and concurrency changes are printed as JSON lines.

To deliberately rebuild existing **local** API originals, run `npm run sections:regroup-local` from `annotation-portal` for a dry run, then `npm run sections:regroup-local -- --apply`. This is separate from migrations and startup. Apply writes and verifies a full public-table backup under `.runtime/section-regroup-*`, resets affected instructional labeling/evaluations, and retains conversations, message text, separate rating work, captures and historical rubrics in one transaction. Linked translations keep their text and old sections but are marked stale and excluded from paired views and occurrence statistics until retranslated. No model calls are made. Before retranslating, archive the old `<source-id>.english.json` checkpoint, whose source hash references the old sections, so a fresh translation can be created.

For DeepSeek through OpenRouter, use `--model deepseek/deepseek-v4.1-flash-1017` with the same `dry-run` or `generate` command and `--project local`. This route reads `OPENROUTER_API_KEY` from the root `.env`, sends the exact current tutor system prompt and full visible history on every request, and does not use the OpenAI key. The model must be registered in `data/models.json`. Responses must finish normally and identify the requested model or its verified canonical snapshot; other models are rejected. OpenRouter artifacts retain the exact request, full response, upstream provider, native model, usage, system-prompt hash, and response IDs. Model fallback is disabled.

OpenRouter may return keepalive headers before the response body finishes. Batch jobs should wrap `createBufferedOpenRouterFetch` inside the shared adaptive limiter so an in-flight slot remains occupied for the entire response and embedded upstream errors trigger the same retry/backoff policy as HTTP errors. Evaluations use the separate direct Google connection; their default is configured in `conversation-evaluation/config.json`.


Direct Google models use `api_provider: "google"` and `api_model` in the model registry. Generation calls Gemini `generateContent` with the same system prompt in `systemInstruction`, complete visible history in `contents`, and `x-goog-api-key` authentication. Artifacts retain native model version, response IDs, usage, and the raw response; thought parts are excluded from visible tutor text. Blocked or truncated responses are rejected. The generator can resume a matching failed artifact using `resumeFile`, preserving completed requests and conversation identity.
