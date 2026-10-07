# Tutor-initiated conversations

Each conversation contains two generated messages: the tutor opens with an explanation, then the student responds. This uses two API calls per topic/language combination.

The tutor starts with the rendered `config/tutor-prompt.md` as a user-role API task instruction. This nonempty input works with providers that reject system-only requests, including Claude and Vertex Llama. The instruction is not a student utterance and is not added to the transcript. No student opening template is sent. `config/first-message.json` is unused.

The student's response uses `config/student-prompt.json` defaults, the optional topic `student_knowledge_state`, and the tutor's generated explanation. The runner adds an instruction that the tutor has already initiated the conversation and the student should respond in its only turn. Student per-turn instruction lists are unused.

The run set selects topics, languages, tutor/student models, reasoning settings, and timeout. Both actors' configured reasoning settings apply. `{topic_name}` and `{topic}` use the language's terminology in `config/topic.json`; `{language}` uses the configured language name, and `{num_of_turns}` is 1.

From the repository root:

```powershell
.venv\Scripts\python.exe simulated-conversation-v2/run.py --dry-run
.venv\Scripts\python.exe simulated-conversation-v2/run.py
```

Use `--run-set PATH` for another run set, `--config-dir PATH` for another prompt directory, and `--output PATH` for a new output directory. Otherwise outputs go to a timestamped folder under `outputs/`. Credentials come from the root `.env`.

The manifest and prompt preview record both actor prompts and tutor-first ordering. JSON and Markdown transcripts contain only generated messages, saved after each successful call. Request/response records are stored under `turns/01-tutor/` and `turns/01-student/`. A failed student call preserves the tutor opening. Existing outputs are never overwritten.

Offline tests:

```powershell
.venv\Scripts\python.exe -m unittest discover -s simulated-conversation-v2 -p "test_*.py"
```

Maverick does not accept reasoning-effort parameters; `none` or an omitted setting sends no reasoning control. Other reasoning values are rejected.
