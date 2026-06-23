# State-driven tutor/student conversation simulator & evaluator

Simulates tutoring conversations between a tutor model under test and a fixed, state-driven student. 
Evaluates tutoring conversations with the mTeach framework.
See `/docs`.


## Setup with uv

```bash
uv venv
uv sync
```

Put API keys in `.env` (see `.env.example`).

## Run simulation

Expand the run-set in `data/run_set.json` into cells x repeats and run them (resume-safe):

```bash
# from project root
PYTHONPATH=src python -m tutoring_check.cli --run-set data/run_set.json --out runs
```

Useful flags:
- `--item-id <id>` — run only one run_set entry.
- `--tutor-model` / `--student-model` — override the model for every run.
 - `--out <path>` — directory to write runs (default: `runs`).

Examples:

```bash
# run default set
PYTHONPATH=src python -m tutoring_check.cli --run-set data/run_set.json --out runs/<folder_name>

# run a single item and override models
PYTHONPATH=src python -m tutoring_check.cli --run-set data/run_set.json --item-id <item_id> --out runs/<folder_name>
```

Each conversation is written to `runs/<folder_name>/<item_id>/r<n>/<timestamp>_<uuid>/` as
`transcript.jsonl` plus raw `api_requests.jsonl` / `api_responses.jsonl`.
