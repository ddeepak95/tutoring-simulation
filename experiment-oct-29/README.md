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

## Marker-free transcript version

The local database now contains `public.conversation_versions` with one `marker-free-v1` row for each of the 1,638 run conversations. Each version preserves the exact conversation turns and translation provenance, omits translation section-map metadata, and has no section inventory. The conversation page loads this version and displays API turns without section boxes; its English comparison pairs whole turns. Existing portal conversations and their 25,743 registered sections remain intact for historical labeling. No labels have been generated for the new version. The checksumed sectioned backup, including the existing assignment and revisions, is under `run-01/backups/sectioned-v1/`.

```powershell
node experiment-oct-29/version-marker-free.mjs verify
```

For a fresh local run, use `backup` before `apply`. Both commands require the local Supabase target; the backup command will not overwrite an existing backup.

## Marker-free labeling pilot

The English brain conversation `17d387af-a04b-4a4b-a44d-36ea2dd35670` has one direct Gemini 3.8 Flash label response under `run-01/marker-free-labels/`. Its 13 validated occurrences and derived counts are saved in `public.conversation_version_label_runs` and appear with feature-colored highlights at `/conversations/17d387af-a04b-4a4b-a44d-36ea2dd35670/labeling`. No other conversation has a marker-free label run. The original request used `marker-free-occurrences/1`; after removing the arbitrary quote-length cap, the saved response was revalidated locally with `exact-source-no-length/1`, without another provider call. The active prompt for future runs is `conversation-evaluation/prompts/marker-free-features.md` version 2; version 1 remains archived beside it.

The same marker-free English brain conversation has two direct Gemini 3.8 Flash rating runs under `run-01/marker-free-ratings/`. Each rates all three tutor turns on eight questions in one request. The saved `marker-free-turn-ratings/1` run uses the archived three-point rubric; the `marker-free-turn-ratings/2` run uses the five-point rubric, including the revised explanatory-devices question. Both runs retain their own rubric snapshots and appear in the rating view dropdown. The five-point response placed some rating objects outside `values`; a strict structural normalization moved those exact scores and reasons into the expected shape without another provider call. The raw response and normalization policy remain saved. These model ratings are separate from human rating assignments.

```powershell
node experiment-oct-29/verify-marker-free-pilot.mjs
```

## Marker-free rating batch

The current batch uses `marker-free-turn-ratings/5` and the latest generated criterion guidance and score anchors from `rating-questions.md`. It rates 882 original API conversations and, when the `translations` cohort is requested, their 756 linked English translations. Each conversation is rated in one direct Google `gemini-3.8-flash` request. Human assignments and earlier model runs remain unchanged. The previous version 4 prompt is archived at `conversation-evaluation/prompts/marker-free-ratings-v4.md`. Existing comparison reports and their analysis scripts remain pinned to version 4; running this batch does not regenerate those reports.

```powershell
node experiment-oct-29/bulk-marker-free-rate.mjs status
node experiment-oct-29/bulk-marker-free-rate.mjs pilot
node experiment-oct-29/bulk-marker-free-rate.mjs all
node experiment-oct-29/bulk-marker-free-rate.mjs verify
node experiment-oct-29/bulk-marker-free-rate.mjs status translations
node experiment-oct-29/bulk-marker-free-rate.mjs pilot translations
node experiment-oct-29/bulk-marker-free-rate.mjs all translations
node experiment-oct-29/bulk-marker-free-rate.mjs verify translations
```

Without a cohort argument, commands target the 882 originals. With `translations`, they target the 756 linked English translations, grouped by their source language. `pilot` selects one unfinished conversation per language; `all` resumes every remaining conversation. Each request, raw response, rubric snapshot, provider, model, prompt version, prompt hash, and validation result is checkpointed in `run-01/marker-free-ratings/` and saved to local Supabase. `batch-v5-progress.json` tracks originals; `batch-v5-translations-progress.json` tracks translations. Provider output is constrained to a JSON schema and independently validated for turn order and applicable questions. Transient network and rate-limit failures are retried with adaptive concurrency. An invalid model response is saved as failed; a subsequent batch invocation preserves that failed database run and archives its checkpoint before making a fresh request. `verify` checks every saved completed turn rating in the selected cohort.

The version 5 batch completed locally with all 882 originals and 756 translations: 4,914 tutor turns and 39,312 individual scores, with no unresolved failures. Both cohorts passed `verify`. One malformed pilot response was retained as a failed attempt and rerun successfully with structured output. All 23 human assignments, their revision history, and all 1,644 earlier model runs were unchanged. The preservation audit is in `annotation-portal/.runtime/api-rating-v5/verification.json`.

The historical version 4 batch completed with 882 original conversations, 126 per language, and zero failed or pending ratings. One Gemini response encoded its 24 numeric scores as strings; these were converted locally to numeric values, with reasons unchanged and no additional provider call. The final inventory and rubric hash are in `batch-v4-progress.json`.

The translated-conversation batch also completed: 756 linked English translations, 126 from each non-English source language, with zero failed or pending ratings. It saved 2,268 tutor-turn ratings (18,144 individual scores). Four raw responses used an extra matching conversation-ID wrapper or an escaped JSON envelope; these were validated and normalized locally without another provider call. Its inventory is in `batch-v4-translations-progress.json`.

## Compare rating scores across languages

For the latest version 5 rubric, run `node experiment-oct-29/analyze-rating-v5.mjs`. It reads completed local runs without evaluator calls or database writes and saves the interactive `run-01/reports/rating-v5/comparison.html`, full results JSON, conversation scores, and summary/test CSVs. Older report files are preserved. The primary composite averages the seven criteria shared by all tutor turns; all nine criteria also receive separate pooled language/model tests. Original-language conversations (882) and the English-text set (756 translations plus 126 unchanged original English references) are analyzed separately. The views share those 126 English ratings and are not independent cohorts. Whole-conversation permutation tests block by topic and the other factor where applicable. Primary omnibus, exploratory criterion omnibus, and primary pairwise comparisons each have explicit cohort-wide Holm adjustment families. The report documents the fixed-topic scope, single-judge limitation, missingness, and test counts. `--translations-only` recomputes the English-text set while reusing the saved original analysis after validating its source and rubric fingerprints.

To refresh just the standalone HTML and its model-by-language significance CSV from the saved analysis snapshot, run `node experiment-oct-29/render-rating-v5.mjs`. This renderer does not connect to Supabase. The HTML embeds the analysis data and opens directly from disk, with no database or evaluator requests. Its model-by-language summary shows all seven model means and raw/Holm-adjusted overall p-values separately for each language and cohort.

For the separate ChatGPT HTML cohort, run `node annotation-portal/scripts/render-html-rating-report.mjs`. This uses the saved 50-capture analysis without database or evaluator requests, refreshes its native HTML, and publishes an offline copy at `run-01/reports/rating-v5/chatgpt-html/index.html`, linked from the API report. It includes the same score/significance table layouts and criterion CSV exports. Cross-model p-values are unavailable because only one source-model label is recorded; the existing topic-matched HTML language tests and their original correction families are preserved. No API and HTML scores are pooled.

The commands below generate the historical version 4 reports.

```powershell
node experiment-oct-29/analyze-ratings.mjs
```

This generates `run-01/reports/rating-language-comparison.html` (interactive report), `rating-language-comparison.json` (aggregate results), and `rating-language-conversation-scores.csv` (one row per original conversation). For each tutor model and rating question, the report lists all seven language means, SDs, medians, sample sizes, and N/A counts. It uses one conversation-level score per question, averaging the applicable tutor turns and omitting N/A. An omnibus within-topic permutation test (9,999 resamples) checks for any language difference; where its unadjusted p is below .05, posthoc within-topic tests compare all 21 language pairs with Holm-adjusted p-values. The six topics are equally weighted in the test. These are exploratory, model-evaluator scores rather than independent human ratings.

To compare tutor models instead, run `node experiment-oct-29/analyze-rating-models.mjs`. It creates `run-01/reports/rating-model-comparison.html`, its JSON analysis, and `rating-model-summary.csv` from the same 882 original version 4 rating runs. The report includes a pooled view (126 conversations per model) and seven individual-language views (18 per model). Pooled tests exchange model labels within topic × language cells; individual-language tests exchange labels within topic. Significant omnibus tests are followed by all 21 model pairs with Holm adjustment within each question and language scope. Overall p-values remain exploratory and unadjusted across questions and scopes.

Run `node experiment-oct-29/build-rating-tables.mjs` to consolidate these saved reports into `run-01/reports/all-rating-tables.html`. Its two table views show 49 model–language summaries (plus seven pooled model rows when selected) and all 882 original conversations, with all nine rating scores as columns. Model, language, topic, and try filters, score sorting, pagination, portal links, and filtered CSV downloads support review. The builder reconciles summary means, sample sizes, and N/A counts with the conversation CSV. It also saves `all-rating-tables.json` and `all-rating-summary.csv`; it makes no evaluator calls.

The model–language table also includes a Combined score (mean ± sample SD). Each conversation first averages its available question means with equal question weights; the table then summarizes those conversation scores. N/A questions are omitted. The combined score is descriptive and is included in summary sorting and CSV exports.

Run `node experiment-oct-29/analyze-combined-ratings.mjs` after rebuilding the consolidated tables to answer the two questions using the combined conversation scores. `run-01/reports/combined-rating-comparison.html` shows language differences within each model and model differences within each language, with all group means and adjusted pairwise results. Tests permute whole-conversation scores within topic using 9,999 resamples. Overall Holm adjustment covers the seven tests for each research question separately; only significant adjusted overall tests lead to reported posthoc families, each with 21 Holm-adjusted pairs. The JSON results retain the source snapshot hash, prompt version, and rubric hash; two CSVs export the overall and pairwise tests.

Run `node experiment-oct-29/analyze-combined-ratings-seven-questions.mjs` to generate `run-01/reports/combined-rating-comparison-seven-questions.html` and matching JSON/CSVs. This variant recomputes each combined conversation score using seven questions, excluding Clarifying Misconceptions and Guidance for Next Steps, then reruns the same overall and pairwise tests for originals and English-text counterparts. It uses saved rating snapshots and makes no evaluator calls; the nine-question report remains available separately.

The same report now includes two additional tables for the English-text set: all 756 rated English translations plus the 126 original English conversations reused unchanged as the English reference. Non-English labels identify source-language groups (for example, Tamil → English). The loader reads completed local version 4 ratings, validates the manifest links and rubric hash, and saves `combined-translated-rating-scores.json` with conversation and rating-run provenance. It performs no evaluator calls. The original and English-text sets have separate overall and posthoc adjustment families; exports include a `cohort` column. The shared English reference and linked original/translation pairs mean the two sets are not independent replications.

## Original–translation score comparability

```powershell
python -m venv .runtime/rating-comparability-venv
.runtime/rating-comparability-venv/Scripts/python.exe -m pip install -r experiment-oct-29/requirements-rating-comparability.txt
.runtime/rating-comparability-venv/Scripts/python.exe experiment-oct-29/analyze-rating-comparability.py
```

This reads the frozen original and translated score snapshots and creates `run-01/reports/rating-comparability.html`, its JSON results, paired test and individual-score CSVs, and an equivalence CSV. The 756 genuine pairs are matched by source conversation ID. Original English scores remain unchanged. The combined score is primary, with the nine individual questions available as diagnostics. English originals versus translations are independent groups; source versus its translation is paired.

Both analyses average topic-specific mean differences equally. Uncertainty combines within-topic variances using the Welch–Satterthwaite approximation and t intervals/tests, conditional on these six topics. A topic needs at least two valid observations on each side (or two complete pairs). The primary combined analysis includes all six topics and 18 conversations per group; diagnostic N/A patterns may reduce coverage. Paired changes use two-sided tests and 95% pointwise intervals. Independent equivalence uses TOST with pointwise 90% intervals and exploratory sensitivity bounds ±0.10, ±0.20 and ±0.30. Holm correction covers 42 model–source-language comparisons separately per criterion, analysis, and margin. The report distinguishes raw from corrected equivalence findings and marks zero estimated sampling variance unavailable. No evaluator calls are made.

Run the reference tests with `.runtime/rating-comparability-venv/Scripts/python.exe -m unittest discover -s experiment-oct-29 -p test_rating_comparability.py`. Single-topic cases are checked against SciPy paired and Welch tests; topic-offset invariance, equivalence interval boundaries, missing tests, and zero-variance handling are covered.

## Pooled language comparison

Run `.runtime/rating-comparability-venv/Scripts/python.exe experiment-oct-29/analyze-rating-languages.py` to build `run-01/reports/rating-language-comparison.html`, its JSON record, and the pairwise CSV. This reads the frozen score snapshots only; it makes no evaluator or database calls. The original-language cohort is the primary language comparison. The English-text cohort is a separate diagnostic containing 756 translations and the 126 unchanged English originals.

The comparison has 42 model-topic blocks, each with three independent conversation tries in each of seven languages. It permutes all 21 conversation scores within each block for the overall language test (9,999 resamples). Pairwise tests repartition the six tries of two languages within each block and adjust the 21 p-values with Holm separately in each cohort. Model-specific omnibus p-values are also adjusted across seven models. Pointwise 95% bootstrap intervals resample tries within the selected model-topic-language cells, so they reflect repeat-generation uncertainty conditional on these models and topics. A significant pooled language difference does not imply every language pair differs or that the same ordering holds in every model. The two cohorts are not independent replications and English-text differences include translation effects. Run `.runtime/rating-comparability-venv/Scripts/python.exe -m unittest discover -s experiment-oct-29 -p test_rating_languages.py` for focused checks.
