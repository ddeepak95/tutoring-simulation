# Simulated tutoring conversations

Run from the repository root with Python 3.11 or newer. The dry run and offline tests use only the standard library.

For live runs, install the API dependencies into your chosen Python environment:

```powershell
python -m pip install litellm python-dotenv
```

The full project environment can instead be installed with `uv sync`. Vertex models may also need the Google dependencies listed in the root `pyproject.toml`. If using a virtual environment, activate it first. The repository `.venv` uses Python 3.14.7 with the project dependencies installed. Activate it with `.\.venv\Scripts\Activate.ps1` before using the commands below, or invoke `.venv\Scripts\python.exe` directly.

Preview rendered prompts and validate configuration without API calls:

```powershell
python simulated-conversation/run.py --dry-run
```

Run the conversations:

```powershell
python simulated-conversation/run.py
```

The default configuration runs the alkaline earth metals topic in English and Tamil, using `gpt-4o` from the existing model catalog for both participants. This makes 20 API calls: five student messages and five tutor responses per language. Live runs use provider credentials from the root `.env`; the default model needs `OPENAI_API_KEY`.

Edit `run_set/run.json` to select topic IDs, language codes and names, student/tutor models, and request timeout. Optional `student_turn_instructions` belong in `config/student-prompt.json`; when provided, the list must contain five instructions. Omit that field to use the base student prompt and conversation history without per-turn instructions. Models can be IDs from `data/models.json` or explicit `provider/model` identifiers. Provider settings and Vertex authentication follow the existing API runner.

The student starts each conversation. Each actor receives the full conversation history, with its own messages assigned the assistant role. Student knowledge state and turn instructions are private to the student; the tutor sees the student's generated messages. The student knowledge state describes its initial knowledge. The tutor uses `config/tutor-prompt.md`. The existing prompt files retain their structure and are rendered with `{language}`, `{topic_name}`, and `{num_of_turns}` as applicable. Five rounds are enforced to match the tutor prompt's fixed limit of ten messages.

Outputs go to a new timestamped directory under `simulated-conversation/outputs/`. Use `--output PATH` for a different new directory or `--config-dir PATH` to load different student, tutor, and topic prompt files. Use `--run-set PATH` to select a different run JSON file (the default is `run_set/run.json`). Existing output directories are never overwritten. Dry runs create a manifest and prompt preview only.

Each live conversation contains `conversation.json`, a readable `conversation.md`, and individual request/response records with usage under `turns/`. Transcripts are saved after every completed message. A failed or incomplete response stops that conversation and preserves completed turns; other conversations continue. The runner exits with status 1 if any conversation fails. There is no automatic resume; rerunning creates a fresh simulation.

Offline checks:

```powershell
python -m unittest discover -s simulated-conversation -p "test_*.py"
```

## Reasoning settings

`run_set/run.json` sets `student_reasoning` to `medium` for Gemini 3.8 Flash and `tutor_reasoning` to `none` for Claude Sonnet 5. Gemini 3.8 Flash supports low, medium, and high thinking levels. Claude receives explicit native `thinking: {"type": "disabled"}` and Sonnet 5's lowest output effort (`low`); omitting Claude's thinking setting would leave its default enabled. These choices are recorded in the manifest, prompt preview, and saved requests. They apply to new runs only. When changing models, select reasoning values supported by the new model. Omitting an actor's reasoning setting uses provider defaults.
