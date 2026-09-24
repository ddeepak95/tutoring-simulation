# Literal prompt comparison

`run.py` defaults to `run_set/run1.json`: three prompts multiplied by five models,
for fifteen independent requests. Prompt text is preserved exactly, including Tamil.
The API execution, authentication, JSON results and CSV export reuse `../explanation/run.py`.
Model routes come from `../data/models.json`; credentials load from the root `.env`
and, for Grok's configured Vertex route, Google application default credentials.

From the repository root in PowerShell, use the dedicated environment:

```powershell
# Preview without API calls.
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/isotope.json --dry-run

# Execute, skipping any already completed requests.
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/isotope.json --resume

# Offline tests.
explanation-difference/.venv/Scripts/python.exe -m unittest discover -s explanation-difference -p test_run.py
```

For a fresh environment: `py -3.14 -m venv explanation-difference/.venv`, then
`explanation-difference/.venv/Scripts/python.exe -m pip install litellm python-dotenv google-auth requests "google-cloud-aiplatform>=1.38"`.

Outputs contain a request manifest, one JSON per job, and `results.csv` with text
and token counts. The pipeline also generates `results.md`, grouping all responses
by prompt and model with a linked table of contents; failed requests are included
with their status. Markdown is regenerated after every execution, including resume.
Dry runs only generate the manifest. Failed/incomplete jobs are retried on resume; completed jobs are
skipped. Resume requires unchanged input and model catalog. Choose a new output
directory with `--output` for changed configurations. By default, output folders
use the run-set filename without its extension: `isotope.json` writes to
`explanation-difference/outputs/isotope/`. Use `--resume` to continue the same
configuration in that folder without repeating completed requests.
Only one process should write to a given output directory at a time.

Optional settings in `defaults` or a run are `reasoning` (a list; omitted by default,
allowing each provider's default) and `web_search` (default `false`). Explicitly
configured reasoning efforts are sent unchanged; unsupported settings fail.
CLI options also include `--run-set`, `--limit`, `--timeout`, and `--concurrency`.


## Multiple topics

Set `defaults.topics` (or a run's `topics`) to IDs from `content/keywords.csv`.
Every topic prompt must contain `{topic}`. `lang_id` selects the CSV translation
used in the prompt, so an English prompt asking for Tamil output uses `lang_id: en`.
The existing literal-prompt mode remains supported without `topics`.

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/multiple.json --concurrency 3
# Continue the same batch without repeating completed requests:
explanation-difference/.venv/Scripts/python.exe explanation-difference/run.py --run-set explanation-difference/run_set/multiple.json --resume --concurrency 3
```

Each topic gets `outputs/multiple/<id>_<english_topic>/`, containing its manifest,
JSON results, `results.csv`, `results.md`, and `api_calls.jsonl`. The parent
`results.md` links to each topic. `--keywords` overrides the CSV path.

`api_calls.jsonl` is an append-only log of application-level LiteLLM request bodies
and returned response objects (not raw HTTP wire traffic). Each attempt has a UUID,
job ID, timestamps, and a request event followed by a response or sanitized error
event. Credentials and authentication headers are not logged. Resume logs only
new attempts; successful skipped jobs do not generate new events. Provider-internal
retries are not separately logged. A request event without a terminal event indicates
an interrupted attempt. Literal-prompt runs also produce this log on future executions.
