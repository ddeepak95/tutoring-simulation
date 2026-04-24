# Socratic two-LLM simulator

## Setup with uv

1. Create the virtual environment:
   - `uv venv`
2. Activate it in PowerShell:
   - `.venv\Scripts\Activate.ps1`
3. Install dependencies:
   - `uv sync`

## Run

```powershell
uv run python -m tutoring_check `
  --run-set data/run_set.json `
  --topics data/topics.json `
  --languages data/languages.json `
  --models data/models.json `
  --out runs
```
