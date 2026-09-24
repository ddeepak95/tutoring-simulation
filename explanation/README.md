# Explanation experiment

## Code layout

- `analyze.py`: entry point for measurement, plots, semantic analysis and judge commands.
- `analysis/`: analysis implementations and shared path definitions; see [analysis/README.md](analysis/README.md).
- `tests/`: Python tests, browser-extension tests and fixed API test fixtures.
- `tools/`: consolidation, a browser diagnostic, and the local analysis regression check.
- Root browser/API runners and Google collectors: existing collection commands retain their paths.
- `run_set/` and root JSON files: active configurations.
- `outputs/`: collected data and generated analyses.
- `consolidated-study/`: preserved research snapshot; this code cleanup does not update it.

From the repository root:

```powershell
.venv\Scripts\python.exe explanation/analyze.py --help
.venv\Scripts\python.exe explanation/analyze.py measure --help
.venv\Scripts\python.exe -m unittest discover -s explanation/tests -p "test_*.py"
node explanation/tests/test_google_counts_extension.cjs
.venv\Scripts\python.exe explanation/tools/check_analysis.py
```

The last command reproduces the saved local measurements and Google correlations in temporary storage and compares them with the existing results. It makes no API calls.

## Collection

For the actual ChatGPT website workflow, see [BROWSER.md](BROWSER.md).

The API runner generates one explanation for each topic × model × reasoning combination in each
`runs` entry. The current `run_set/test.json` is a browser configuration. The fixed API
example in `tests/fixtures/api-run-set.json` expands to 24 requests; use an API-compatible
run set with `run.py` rather than passing browser-only settings to it.

Run these commands from the repository root using its existing Python environment:

```powershell
# Validate and save all rendered prompts/requests without API calls or credentials.
.venv\Scripts\python.exe explanation/run.py --run-set explanation/tests/fixtures/api-run-set.json --dry-run --output explanation/outputs/api-preview-new

# Execute the previewed configuration; credentials come from the root .env or environment.
.venv\Scripts\python.exe explanation/run.py --run-set explanation/tests/fixtures/api-run-set.json --output explanation/outputs/api-preview-new --resume

# Alternatively, run one request in a new timestamped directory.
.venv\Scripts\python.exe explanation/run.py --run-set explanation/tests/fixtures/api-run-set.json --limit 1

# Offline tests.
.venv\Scripts\python.exe -m unittest discover -s explanation/tests -p test_run.py
```

The runner uses the repository's existing `litellm` and `python-dotenv` dependencies.
Default input paths are relative to the script, so running it from another working
directory also works. Explicit CLI paths are relative to the working directory.

## Configuration

`defaults` provides settings inherited by each entry in `runs`. A run's settings
replace the corresponding defaults, including whole lists:

| Setting | Meaning |
| --- | --- |
| `lang_id` | Matches `lang-id` in `prompt-structure.json`. |
| `prompt_type` | `native` (default) selects `prompt`; `code-mixed` selects `code-mixed-prompt`. |
| `topics` | Nonempty list substituted into `{topic}` verbatim. |
| `models` | Nonempty list of `data/models.json` IDs or explicit LiteLLM `provider/model` names. |
| `reasoning` | List of efforts; defaults to `["none"]`. Sent explicitly, including `none`. |
| `web_search` | Boolean, default `false`; enables the hosted `web_search` tool. |

Prompt wording and topic spelling are preserved. No system prompt or extra language
instruction is added. Each job is an independent request using LiteLLM's Responses
API interface with `reasoning={"effort": ...}`. The selected provider/model must
support the requested reasoning level and hosted web-search tool. These capabilities
have not been verified with live calls. Unsupported settings are not intentionally
dropped or retried with different settings. Enabling search lets the model choose
whether to search; inspect the saved response to see actual search activity.

CLI options include `--run-set`, `--prompts`, `--output`, `--concurrency` (default 2),
`--timeout` (seconds per request, default 180), `--limit`, `--dry-run`, and `--resume`.

## Saved results

Each execution uses a new timestamped folder under `outputs/` unless `--output` is
supplied. Use one runner process per output directory.

- `manifest.json`: source configuration, templates, expanded jobs, API request
  bodies, and a model-catalog fingerprint. Catalog credentials are not copied.
- `<job_id>.json`: request, timestamps, full response (including tool activity,
  citations, and usage), extracted explanation, and completion status.
- `results.csv`: one row per job, with experiment settings, explanation, status,
  and token counts; UTF-8 with BOM for spreadsheet compatibility.

Each job is saved as it finishes. `--resume --output <existing-directory>` skips
completed jobs and retries failed/incomplete jobs, requiring an identical manifest.
Use the same `--limit`, if any, when resuming. Changed inputs or model catalogs
require a new output directory. An interrupted request may have incurred API cost
without saving a result and will be requested again on resume.

Failures are isolated so other jobs can finish; the process exits with status 1
if any job fails or is incomplete. Error records contain exception type and HTTP
status, omitting provider exception text to avoid persisting credentials. Full
provider responses are retained for incomplete requests. Generated output is
ignored by Git.
