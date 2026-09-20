# Explanation quality research

Collect multilingual explanations through the ChatGPT browser interface or an API, preserve the conversations, and compare length, structure, images, timing, semantic diversity and relevance.

## Start here

- [Collection and code guide](explanation/README.md)
- [Browser collection](explanation/BROWSER.md) and [browser queues](explanation/BROWSER_QUEUES.md)
- [Analysis commands](explanation/analysis/README.md)
- [Consolidated study overview](explanation/consolidated-study/reports/overview.md)

## Repository layout

| Path | Purpose |
| --- | --- |
| `explanation/` | Collection tools, analysis code, tests, configurations, original outputs and consolidated study |
| `data/models.json` | Model catalog used by the API runner and its tests |
| `src/tutoring_check/vertex_auth.py` | Shared Google ADC support for configured Vertex models |
| `pyproject.toml` | Explanation collection and analysis dependencies |
| `.env` | Local credentials; not committed |

## Setup and checks

The existing `.venv` is retained. For a fresh setup, run `uv sync`. A new lockfile must be resolved: regeneration during cleanup was blocked by a package-registry TLS handshake failure, so the obsolete simulator lockfile was backed up and removed. The existing environment passes the project tests. Configure only the services you use in `.env`; `.env.example` contains placeholders. Vertex models use Google Application Default Credentials where configured. Browser collection requires Chrome and the setup described in the browser guide.

Run from the repository root:

```powershell
.venv\Scripts\python.exe explanation/analyze.py --help
.venv\Scripts\python.exe -m unittest discover -s explanation/tests -p "test_*.py"
node explanation/tests/test_google_counts_extension.cjs
.venv\Scripts\python.exe explanation/tools/check_analysis.py
```

The regression check uses saved data and temporary outputs; it does not make API calls. Embedding, judgment and collection commands can make paid requests when their execution flags are enabled.

## Retained evidence

The study contains 93 completed answers, including 90 on six shared topics. The consolidated study preserves evidence, API caches, analysis results, source snapshots and hashes. Current development code is under `explanation/`; the consolidated source snapshot remains unchanged.

## Repository cleanup

Unrelated tutoring simulations and earlier experiment projects were removed after creating and verifying an external ZIP backup. The [cleanup record](explanation/repository-cleanup.json) lists the removed groups and the exact backup location and hash. The ZIP also contains the previous root README, dependency files and configuration template. Git history, local credentials, browser profiles, the environment and development settings were retained.
