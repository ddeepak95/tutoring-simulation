# State-driven tutor/student simulator

Simulates tutoring conversations between a **tutor model** under test and a fixed, **state-driven student* (LearnLM gen-AI role-play). 
The student walks a predefined per-turn state sequence so every tutor faces the identical student. 
See `SPEC.md`.

## Setup with uv

```bash
uv venv
uv sync
```

Put API keys in `.env` (see `.env.example`).

## Run

Expand the run-set in `data/run_set.json` into cells x repeats and run them (resume-safe):

```bash
uv run python -m tutoring_check --run-set data/run_set.json --out runs
```

Useful flags:
- `--item-id <id>` — run only one run_set entry.
- `--tutor-model` / `--student-model` — override the model for every run.

Each conversation is written to `runs/<item_id>/r<n>/<timestamp>_<uuid>/` as
`transcript.jsonl` plus raw `api_requests.jsonl` / `api_responses.jsonl`.
