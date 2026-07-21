# Tutor/student conversation simulator & evaluator

Simulates tutoring conversations between a tutor model under test and a fixed student model. 
See `/docs`.


## Setup with uv

```bash
uv venv
uv sync
```

Copy `.env.example` to `.env` and fill it in — see **Credentials** below.

## Credentials

OpenAI and Anthropic models use plain API keys in `.env`. Gemini models do **not**: they go
through Vertex AI on the `deepak-experiments` GCP project, authenticated with Google
Application Default Credentials (ADC). Nobody shares a key or a credentials file — each
person authenticates as themselves and impersonates a shared service account,
`model-access@deepak-experiments.iam.gserviceaccount.com`, which holds `roles/aiplatform.user`.

One-time setup per person:

1. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install).
2. Ask Deepak (dv292@cornell.edu) to grant your Google account `roles/iam.serviceAccountTokenCreator`
   on the service account. Without it, step 3 fails with `PERMISSION_DENIED`.
3. Log in, impersonating the service account:

   ```bash
   gcloud auth application-default login \
     --impersonate-service-account=model-access@deepak-experiments.iam.gserviceaccount.com
   ```

4. Make sure `.env` carries the Vertex settings (they are in `.env.example`, and neither is secret):

   ```
   VERTEXAI_PROJECT=deepak-experiments
   VERTEXAI_LOCATION=global
   ```

That's it — LiteLLM picks the credentials up automatically for every `vertex_ai/…` model in
`data/models.json`. Nothing in the code reads them explicitly.

Anthropic's Claude models run on the same project and the same credentials — `roles/aiplatform.user`
covers them, so no extra grant is needed. They do have to be switched on individually in the
Vertex [Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) first; a model that
has not been enabled returns a 404 identical to a misspelled name. Currently enabled:
`claude-opus-4-8` and `claude-sonnet-5`.

Meta's Llama models are served through Vertex's Model-as-a-Service endpoint, which is **pinned to
`us-east5`** and is not on the global endpoint. A model entry in `data/models.json` may therefore
carry an optional `litellm_params` object, merged into every request for that model:

```json
{
  "id": "llama-4-maverick",
  "label": "Meta Llama 4 Maverick 17B 128E Instruct",
  "litellm_model": "vertex_ai/meta/llama-4-maverick-17b-128e-instruct-maas",
  "litellm_params": { "vertex_location": "us-east5" }
}
```

This is how a single run set mixes models with different location requirements — the per-model
value overrides `VERTEXAI_LOCATION` for that model only. Anywhere a model is named (`--tutor-model`,
`--student-model`, `--annotator-model`) you can pass either the `id` or the full litellm string, and
the params are attached either way.

xAI's Grok models are a further step out: LiteLLM has no native Vertex route for them, so they go
through Vertex's OpenAI-compatible endpoint as `openai/xai/…`, which wants the ADC access token as
`api_key`. That token expires roughly hourly, so the catalog stores the sentinel `"@adc-token"`
rather than a literal value, and `vertex_auth.with_adc_token()` swaps in a fresh token at call time
(refreshing it mid-sweep as needed). `${VERTEXAI_PROJECT}` in `api_base` is expanded from the
environment, keeping the project out of the catalog:

```json
{
  "id": "grok-4.3",
  "label": "xAI Grok 4.3",
  "litellm_model": "openai/xai/grok-4.3",
  "litellm_params": {
    "api_base": "https://aiplatform.googleapis.com/v1/projects/${VERTEXAI_PROJECT}/locations/global/endpoints/openapi",
    "api_key": "@adc-token"
  }
}
```

The substitution happens *after* the request is logged, so `api_requests.jsonl` records the
sentinel and never a live credential. Nothing extra is needed to run these — the same
`gcloud auth application-default login` covers them.

**`VERTEXAI_LOCATION` must be `global`.** The Gemini 3.x models are served only from the global
endpoint; a regional value like `us-central1` makes them fail with a 404 while the 2.5 models
keep working, which is a confusing way to find out.

Verify your setup end-to-end:

```bash
uv run python -c "from dotenv import load_dotenv; load_dotenv(); import litellm; print(litellm.completion(model='vertex_ai/gemini-2.5-flash', messages=[{'role':'user','content':'say ok'}]).choices[0].message.content)"
```

Troubleshooting:

- `PERMISSION_DENIED … iam.serviceAccounts.getAccessToken` — you are missing the
  `serviceAccountTokenCreator` grant from step 2. If it was *just* granted, wait ~30s; IAM changes
  take a moment to propagate.
- `Could not resolve project_id` — `VERTEXAI_PROJECT` is not set, or `.env` was not loaded.
- `ImportError` mentioning google auth — run `uv sync`; the ADC path needs the `google-auth` package.
- 404 `Publisher model … was not found` — usually `VERTEXAI_LOCATION` is not `global`; otherwise the
  model name in `data/models.json` is not offered on Vertex.

## Run simulation

The run-set in `data/run_set.json` declares `defaults` (models, reasoning, language, `repeats`), a list of `topics`, and a `pedagogy_sweep`. `load_run_set` expands the
cross-product into cells where one approach is fixed at each extreme (Very High / Very Low) with the
rest at Neutral, with ids like `gravity-en-ce-vh`. Expand it into cells x repeats and run them
(resume-safe):

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

## Run evaluation

Annotate every conversation under a runs/ tree with the mTeach Instructional Ability moves (resume-safe):

```bash
# from project root — traverse runs/ and evaluate each transcript.jsonl
PYTHONPATH=src python -m tutoring_check.evaluation.cli --runs runs --annotator-model <litellm_model>
```

Flags:
- `--runs <path>` — root dir to traverse for `transcript.jsonl` (default: `runs`).
- `--annotator-model <litellm_model>` — required; must differ from the tutor and student models to avoid self-serving bias.

Each conversation gets an `evaluation_transcript.jsonl` written alongside its `transcript.jsonl`,
plus raw `evaluation_requests.jsonl` / `evaluation_responses.jsonl`. A conversation that already
has `evaluation_transcript.jsonl` is skipped, so re-running only fills gaps.

## Run the human annotation tool

A reviewer-facing web app (FastAPI + Jinja/HTMX) for hand-labeling one conversation
at a time — click a chat bubble, annotate it in the sidebar. Tutor turns get the 8
Instructional Ability dimensions; student turns are shown for context but are not
annotated. See `docs/annotation_tool.md` for the full spec.

Install the annotation extra (one time), then launch:

```bash
# from project root
uv pip install -e ".[annotation]"
uv run tutoring-annotate
```

By default the picker scans `runs/annotating/` for transcripts laid out exactly as
`<run_set>/<item_id>/r<rep>/transcript.jsonl`. Point it at a different tree (and
change host/port or the DB location) via environment variables:

- `ANNOTATION_RUNS_ROOT` — read-only transcript tree to scan (default `runs/annotating`).
- `ANNOTATION_DB` — SQLite annotation store (default `annotations.sqlite3`); put it on durable storage when hosted.
- `ANNOTATION_HOST` / `ANNOTATION_PORT` — bind address (default `127.0.0.1:8000`).

```bash
# example: annotate transcripts that live directly under runs/
ANNOTATION_RUNS_ROOT=runs uv run tutoring-annotate
```

Annotations save live to SQLite as you click; the **Export** button writes
`human_annotation.<annotator_id>.jsonl` next to each transcript for the downstream judge.
