# Six-topic multilingual run

`run-01/` is the resumable record for the six-topic, seven-model, seven-language experiment. It contains the frozen topic catalog, prompt-translation responses, byte-for-byte copies of the 252 reused October 29 generation artifacts, new generation artifacts, English translation checkpoints, a manifest, and the local database backup made before cleanup. The run folder is ignored by Git because it contains research data and provider responses.

The run uses three tries per topic/model/language. English and Tamil tries 1–3 are reused from `research-archive/oct-29`; Thai, Simplified Chinese, Hindi, Bengali, and Kannada are generated. All non-English originals are translated to English with direct Gemini 3.8 Flash. Completed translations retain their section mapping. Remaining translations use one Gemini request per complete conversation, preserve turn IDs, and have no cross-language section mapping or alignment check. The portal displays these pairs by turn. Evaluation is a separate later operation.

Run from the repository root with the local Supabase target selected in `.env`:

```powershell
node experiment-oct-29/run.mjs status
node experiment-oct-29/run.mjs pilot
node experiment-oct-29/run.mjs pilot-whole
node experiment-oct-29/run.mjs all
node experiment-oct-29/run.mjs verify
node experiment-oct-29/audit-language.mjs
```

`generate` and `translate` run those phases separately. All commands read the manifest and resume existing artifacts and checkpoints. `prepare.mjs` constructs the run catalog and archive copies; `prune-local.mjs` is the separate local-only cleanup command. The cleanup was already applied for `run-01`; its report and the pre-cleanup PostgreSQL dump are in `run-01/`.

Expected completion: 882 originals, 756 linked English translations, 1,638 portal conversations, six topics, and zero evaluator baselines.
The language audit writes `run-01/language-switches.json` with any individual tutor turns that substantially switch away from the requested language.

`run-01` finished with 357 earlier section-aligned translations and 399 later whole-conversation translations. The latter keep each original turn ID but have no cross-language section map. The final database inventory is recorded in `run-01/verified.json`.
