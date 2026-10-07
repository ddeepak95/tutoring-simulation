# Tutor-led conversations

The tutor generates the opening message, followed by a student response and tutor reply. Each `student_turns` entry in `config/topic.json` guides one student message followed by a tutor reply. These entries are instructions for the student model, not verbatim transcript messages. A topic with three entries produces seven transcript messages (up to eight API calls, including the relevance check); omitted or empty lists use one natural student response and tutor reply, producing three messages (four API calls, including the relevance check).

`config/student-prompt.json` supplies shared `defaults` sections, including `persona` and `turn_behavior_setup`. Topic terminology, optional `student_knowledge_state`, and optional `student_turns` come from `config/topic.json`. No separate topic section is required in the student prompt. `config/first-message.json` supplies the tutor's opening instruction as an API user message, outside the transcript. It must supply a nonempty `prompt` for every selected language; missing or duplicate language entries are rejected.

Only the current turn instruction is added to the student's prompt. The first student turn uses the first configured topic instruction. When no topic instructions exist, the student gives a natural response to the tutor's opening. Both actors receive the transcript history with their own messages marked as assistant messages. The tutor receives the opening instruction as a user message for its first call.

The run set selects topics, languages, tutor/student models, reasoning settings, and timeout. `{topic_name}` and `{topic}` use the selected language's terminology; `{language}` uses the configured language name; `{num_of_turns}` counts the opening plus follow-ups. Placeholders work in defaults, knowledge state, turn instructions, and the tutor prompt.

From the repository root:

```powershell
.venv\Scripts\python.exe simulated-conversation-openrouter/run.py --dry-run
.venv\Scripts\python.exe simulated-conversation-openrouter/run.py
```

Use `--run-set PATH` for another run set, `--config-dir PATH` for another prompt directory, and `--output PATH` for a new output directory. Otherwise outputs go to a timestamped folder under `outputs/`. Credentials come from the root `.env`.

The manifest and prompt preview record both actor prompts, per-turn student instructions, and tutor-first ordering. JSON and Markdown transcripts contain the generated opening and replies, saved after each successful call. Request/response records are stored under `turns/01-tutor/`, `turns/02-student/`, `turns/02-tutor/`, and so on. A failed call preserves all earlier messages. Existing outputs are never overwritten.

Offline tests:

```powershell
.venv\Scripts\python.exe -m unittest discover -s simulated-conversation-openrouter -p "test_*.py"
```

Maverick does not accept reasoning-effort parameters; `none` or an omitted setting sends no reasoning control. Other reasoning values are rejected.

API routing is automatic after resolving the model name:

| Model prefix | API path | Root `.env` key |
| --- | --- | --- |
| `google/` (including Gemini catalog aliases) | LiteLLM `aresponses`, using `gemini/` | `GEMINI_API_KEY` |
| `openai/` | LiteLLM `aresponses`, using `openai/` | `OPENAI_API_KEY` |
| Other models, such as `anthropic/` | OpenRouter chat completions | `OPENROUTER_API_KEY` |

Only keys needed by models that make API calls are required. Student-model credentials are required even without follow-up turns because that model checks relevance. A missing direct-provider
key causes an error before output is created; there is no automatic fallback to
OpenRouter. Google uses the Gemini API, without Vertex credentials. The manifest,
prompt preview, and console output identify the selected provider.

Install dependencies with `python -m pip install litellm requests python-dotenv`.
Model values accept full IDs such as `google/gemini-3.8-flash`, `openai/gpt-4o`,
and `anthropic/claude-sonnet-5.5`, as well as existing `data/models.json` aliases.
Provider-specific catalog credentials are not inherited. Google and OpenAI IDs
must be available through their direct APIs; OpenRouter-only model variants may
not work there.

Direct calls use the previous LiteLLM Responses request format (`input`,
`instructions`, `store: false`, and optional `reasoning.effort`). OpenRouter calls
use `messages`, with `reasoning.enabled: false` for `none` and `reasoning.effort`
for other levels. Omission uses the provider default. Reasoning support depends
on the chosen model; some models require reasoning.

OpenRouter's native chat responses are retained as `response.openrouter_response`;
LiteLLM Responses output is saved directly as `response`. Failed calls preserve all earlier messages.

After the first tutor response, the configured student model makes a separate relevance-check call using an evaluator prompt rather than the student persona. It checks for completely unrelated content across languages, allowing relevant prerequisites, partial explanations, and uncertain cases to continue. This is a model judgment and can make mistakes.

A clearly unrelated response ends the conversation with `status: stopped_off_topic` and a `stop_reason`. The tutor opening is preserved. Intentional off-topic stops count as successful processing, so the batch continues and does not exit with an error solely for those stops. The decision is saved as `relevance_check` in `conversation.json` and displayed in `conversation.md`; the checker request/response is stored in `checks/01-relevance.json`. Checker messages never enter the actors' conversation history.

A failed, incomplete, or malformed checker response instead marks the conversation `failed` with `failed_turn: 01-relevance`, preserving the tutor opening and checker artifacts. No further turns run in that case. Dry runs include the checker prompt and maximum API-call count; early stops use fewer calls.

The default run set uses `"tutor_provider_sort": "throughput"` to prioritize faster OpenRouter providers for DeepSeek. Optional `tutor_provider_sort` and `student_provider_sort` settings accept `throughput`, `latency`, or `price` and apply only to OpenRouter models. Omit them to use default routing. The preference is saved in the manifest and preview and sent as `provider.sort`; it does not guarantee a fixed response time. Throughput routing may select a more expensive provider. See [OpenRouter provider sorting](https://openrouter.ai/docs/guides/routing/provider-selection#provider-sorting).
