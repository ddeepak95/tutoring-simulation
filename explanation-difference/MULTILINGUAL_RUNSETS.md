# Multilingual runsets (version 2)

The runner expands topics and models across reusable language conditions. Prompts live in `content/prompt-structures.json`; translated topic terms live in `content/keywords.csv`. The runset contains experiment choices, not repeated prompt text.

## Files

- `run_set/multiple.json`: full matrix, including the English baseline and Tamil, Hindi, Bengali, Arabic and French (385 jobs).
- `run_set/multiple_new_languages.json`: Hindi, Bengali, Arabic and French only, without the English baseline (280 jobs).
- `run_set/multiple_legacy.json`: preserved English/Tamil runset configuration.

Counts assume seven topics and five models. The English baseline expands once per topic/model, not once per target language. Each target language has native-prompt/native-output and English-prompt/native-output conditions. `$target` is replaced by the current target language code.

## Rendering

Native Hindi prompts use the Hindi template and the topic's Hindi CSV value. English-prompt/Hindi-output prompts use the English template, the English topic term, and `response_language_name_en = Hindi`. No English gloss is added to native prompts.

The only template placeholders are `{topic}` and `{response_language_name_en}`. Localized templates may explicitly name their output language, as the supplied native templates do. Cross-language templates must include the output-language placeholder.

Template and CSV paths resolve relative to the runset file. `--keywords` overrides the CSV. Existing literal-prompt and topic-template runsets remain supported.

Jobs record `condition_id`, `prompt_language`, `topic_language`, `response_language`, `response_language_name`, topic ID, English topic name, subject, exact rendered prompt, exact template and its SHA-256. For v2, `language` is the response language; `lang_id` remains the prompt language for compatibility. `run_index` is only an expansion index, not a language identifier. Job identity includes the rendered experiment settings but excludes that positional index.

All requested translations/templates are checked before API calls. Missing translations, duplicate conditions, unknown settings and invalid placeholders are rejected. The template wording and topic translations remain researcher-controlled; structural validation does not establish translation equivalence.

## Preview and execute

From the repository root, preview the new languages:

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/multiple_new_languages.json --dry-run
```

The prepared preview is at `outputs/multiple/_runsets/multiple_new_languages/prompt_preview.md`, alongside manifests containing all jobs and requests. No API calls occur during a dry run.

Execute that unchanged preview:

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/multiple_new_languages.json --resume
```

Each topic gets its own folder, API log and consolidated Markdown report. Re-running with `--resume` skips completed jobs only when the manifest matches exactly. If templates, topic terms, models or conditions change, choose a new output folder.

The full matrix preview was prepared with:

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/multiple.json --output explanation-difference/outputs/multiple_multilingual_preview --dry-run
```

Version-2 runsets now share `outputs/multiple` safely using separate `_runsets/<runset-name>/manifest.json` files. Existing root manifests are historical snapshots. Old results are not automatically copied or treated as equivalent: the updated native Tamil template now explicitly requests Tamil, unlike the original executed wording.

## Downstream analysis

The batch evaluator now prefers explicit response-language metadata, and its viewer supports condition labels. Its input root is still the original `outputs/multiple` folder. The current comparison script remains specific to the original three-condition study; it needs a separate multilingual comparison update before pooling new languages. Historical outputs and comparisons are unchanged by this runner update.

## Output organization

Both multilingual runsets set `output_dir: ../outputs/multiple` (relative to the runset). `--output` can override it.

Within each topic, conditions are folders: english, tamil-native, tamil-english, hindi-native, hindi-english, bengali-native, bengali-english, arabic-native, arabic-english, french-native, french-english. The language named first is the output language; `-english` means the prompt is English. Files are named `<model>__<stable-id>.json`.

Evaluations sit in `<condition>/evaluation/<response-stem>/`. Per-runset generation logs and reports sit in `<condition>/_runs/<runset-name>/`; this prevents later runs from replacing earlier logs. The runset-level manifest, prompt preview and report index sit in `_runsets/<runset-name>/`.

The existing 105 responses were moved without changing their bytes. `layout_migration.json` records old/new paths and source hashes; `_layout_backup` retains pre-migration evaluation metadata. Historical root/topic manifests and API logs retain original job IDs and paths as provenance. Use topic `index.md`, the evaluation index and the shared viewer for current links. Earlier standalone pilot snapshots remain historical.

The new-language dry run is prepared in the shared root. Use the same execution command above with `--resume`; no new generation calls have been made during reorganization. Older preview folders outside `multiple` are retained and are no longer the active output target.
