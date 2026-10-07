# Conversation evaluation

The default evaluator uses the updated [coding guidebook](human-annotation/coding-guidebook.md),
[evaluator v3 system prompt](prompts/evaluator-v3.md), and
[v3 JSON schema](schemas/evaluator-v3.schema.json).

## Evaluation workflow

- Non-English v3 conversations are evaluated twice by default: in the original
  language and from a faithful English translation. Each independent request
  evaluates the whole supplied transcript against all 18 coding items.
  Conversations explicitly marked English are evaluated once and skip translation.
- The system prompt contains the rubric and evaluation instructions. The API receives
  the output schema separately through `response_format` with `type: json_schema`
  and `strict: true`; shared definitions are expanded in the transmitted schema
  for provider compatibility. The schema is not appended to the v3 system prompt.
- The user message supplies the learning topic, language, available learner context,
  tutor-visible instructions, learning objective when available, and transcript.
- Instructional features and confirmed errors are lists. Ordinal items use 1?3 scores;
  Instructional Sequence is categorical. No overall score or average is calculated.
- The Questions item records every tutor question occurrence, including rhetorical questions,
  understanding checks, invitations, and suggested learner questions. Each entry has
  `question_type`: `Knowledge-checking` or `Instructional`. Rhetorical questions and
  self-report checks such as "Have you understood?" are Instructional. `concept_checked`
  identifies the knowledge checked for Knowledge-checking entries and is null for
  Instructional entries. Each entry cites one tutor turn; repetitions remain separate.
  Comparison reports show both the total question inventory and its classification.
- Question inventory validation checks that each prose question-mark occurrence in
  tutor turns is covered, including headings and rhetorical questions. It ignores
  question marks within code, URLs, LaTeX, and literal punctuation examples. This
  check detects omissions and duplicate occurrences; it does not determine a
  question's instructional purpose or guarantee coverage of questions without
  question marks.
- Results undergo JSON Schema validation, score/status consistency checks, and exact
  evidence and turn-location checks. Validation does not establish the factual or
  pedagogical reliability of a judgment.

## Setup

From the repository root (PowerShell):

```powershell
.venv/Scripts/python.exe -m pip install -r conversation-evaluation/requirements.txt
```

Set OPENROUTER_API_KEY in the repository-root .env or environment. All evaluator
models use OpenRouter, including Google and OpenAI; this pipeline does not inherit
the generation runner's direct-provider routing. Credentials are not saved.

Choose an explicit OpenRouter provider/model ID with --model or config.json.
The default model is google/gemini-3.8-flash; dry runs need no API key.

Use `--evaluation-mode both` (the default), `--evaluation-mode original`, or
`--evaluation-mode translated` to select transcript versions. Original-only runs
do not call the translator or write translation files. Results for each version
are stored separately, and a comparison report is created when both complete.

## Preview without API calls

```powershell
.venv/Scripts/python.exe conversation-evaluation/run.py simulated-conversation-openrouter/outputs/20260928T222428197569Z --dry-run --output conversation-evaluation/outputs/preview
```

Directories are searched recursively for conversation.json. Individual JSON files,
multiple paths, and conversation.md paths with a JSON sibling are also accepted.
Markdown is never reparsed, preserving source text for evidence matching.

## Evaluate

```powershell
.venv/Scripts/python.exe conversation-evaluation/run.py simulated-conversation-openrouter/outputs/20260928T222428197569Z --model "provider/model-id" --output conversation-evaluation/outputs/pilot
```

Replace provider/model-id with a model available to your account that supports
structured outputs. Provider routing requires support for the requested parameters;
unsupported model/provider combinations fail instead of silently falling back to JSON
object output. Dry runs and tests make no paid calls. Original transcripts are preserved;
translation artifacts are written beside non-English sources during live runs.
See [OpenRouter structured outputs](https://openrouter.ai/docs/guides/features/structured-outputs).

The nullable ordinal score uses an integer range of 1?3 instead of the mixed enum
`[1, 2, 3, null]`. A minimal live Gemini/OpenRouter probe returned an empty object
with that mixed enum and complete rating fields with the equivalent integer bounds.
Null remains available for unscored judgments; application validation checks the
status/score relationship. Provider names are retained in attempt metadata for
routing diagnostics.

## Resume and retries

Repeat the same command with --resume and the same --output directory. Validated
stages are rechecked and reused; invalid or missing stages run again.
Changed input data, evaluator settings, rubric, schema, or prompt reject a resume.
To convert a dry run into a live run, keep identical settings (including model)
or start a new output directory. Existing output directories otherwise are rejected.

HTTP 429 and transient server/connection errors retry up to http_retries.
Invalid JSON or evidence triggers up to repair_attempts corrective model calls.
Truncated output fails rather than being accepted; increase max_tokens in a new run.
Each retry may incur provider charges.

## Inputs and context

Repository configuration/messages transcripts and canonical input are supported:

```json
{
  "conversation_id": "example",
  "status": "completed",
  "learning_topic": "Covalent radius",
  "metadata": {
    "topic_native_name": "Covalent radius",
    "topic_english_name": "Covalent radius",
    "native_language": "English",
    "learner_level": "High school",
    "reference_concepts": [],
    "reference_source": null
  },
  "messages": [
    {
      "turn_id": "s1",
      "speaker": "student",
      "text": "What is covalent radius?"
    },
    {
      "turn_id": "t1",
      "speaker": "tutor",
      "text": "For two identical covalently bonded atoms, it is half the distance between their nuclei."
    }
  ]
}
```

Missing IDs become turn_0001, turn_0002, etc. Original text is retained exactly.
assistant/user roles can substitute for tutor/student. Incomplete source runs are
rejected rather than silently evaluated as complete.

The evaluator receives the configured `topic_name`, `topic_id`, and `language`, plus
explicit evaluation metadata and learner context. Canonical inputs may provide
`learning_topic`, `topic_id`, and `learner_context` at the top level. Metadata topic
names supply a fallback when the configured topic name is unavailable.

The v3 evaluation returns `learning_topic`, copied from the topic supplied with
that transcript version, rather than requiring a learning objective. It returns
null only when no topic is available. Reports display this as "Learning topic".

The simulator's tutor system instruction and `first_message` are supplied as
`tutor_context`, allowing the evaluator to recognize the assigned learner level and
opening task. The simulator's student system prompt and hidden knowledge-state or
turn instructions are excluded. Do not judge the tutor as if it knew that hidden
state. Model identities and token usage are excluded from judging context.
Translated v3 evaluations use an English translation; original evaluations use the
source language. No external fact retrieval is performed.

## Translation before evaluation

The translator preserves source claims and errors, repeated content, tone, numbers,
formulas, equations, Markdown, speaker roles, and turn order. It translates technical
terms as written and preserves mismatches with parenthetical English labels. It does
not correct or improve the explanation. The [translation system prompt](prompts/translator.md)
contains these instructions.

For `conversation.json`, a live non-English v3 run writes these files in the **same
source folder**:

- `conversation.english.json`: English transcript with original turn IDs, translated
  topic/context, and source/model provenance.
- `conversation.english.md`: readable English transcript.

The translated evaluation receives the saved English text; the original evaluation
receives the original text. Each evaluation checks quotations against its own version
and uses the original turn IDs. Neither evaluation receives the other version's
ratings, feature lists, or error judgments. Each run saves the original normalized transcript
as `source.json` and the transcript used for evaluation as `evaluation-source.json`.
Translation is recorded as a limitation for wording and tone judgments in the
translated evaluation.

Translation uses the evaluator model by default. Use `--translation-model provider/model-id`
to select a different OpenRouter translator. Both models use the existing OpenRouter
key. Translation adds a model call and may require corrective retries.

Translations are reused when source content, translation prompt, schema, and settings
match. Failed translations prevent the translated evaluation; the original evaluation
can still complete. The runner preserves a translated cache
whose text has been edited manually instead of silently overwriting it. Dry runs save
translation previews and mark evaluation previews `awaiting_translation` until an
English transcript is available; they do not create translated source files or call APIs.

Earlier rubric versions retain their original evaluation workflow.

## Outputs

Each run stores:

- manifest.json: paths, settings, rubric version, and reproducibility fingerprint.
- rubric.md, evaluator.md, translator.md, and schema.json: snapshots of definitions used.
- run_status.json: completion/failure, transcript language, version, and planned stage count.
- summary.csv: conversation-level ordinal scores and Instructional Sequence, with
  transcript version and language columns, without aggregation.
- One folder per source, disambiguated by source path hash, containing:
  - original/ and translated/: separate v3 evaluation folders for the selected versions.
    English sources have only original/. Earlier rubric versions retain their folder layout.
  - comparison.md: feature counts, ratings, and error lists for original versus
    translated evaluations when both complete.

Each evaluation folder contains:

- source.json: original normalized source with stable IDs.
- evaluation-source.json: the exact transcript version used for evaluation.
- translation/: translation previews, attempts, and validated segments when required.
- conversation/preview.json: prompt, input, and structured-output configuration for v3.
  Earlier versions also have local_XXXX stages.
- request.json, attempt_XX.json, validated.json within each stage: requests,
  model text, usage, and accepted results.
- evaluation.json: result conforming to the shared rubric schema.
- report.md: readable item ratings, instructional-feature lists, errors, verification
  cases, limitations, and source quotations.
- failure.json or validation_error.json when a stage fails.

Failed conversations do not stop remaining inputs. Any failed conversation causes
a nonzero exit code. Summary rows include successful results only; run_status.json
records failures.

## Tests

```powershell
.venv/Scripts/python.exe -m unittest discover -s conversation-evaluation -p "test_*.py" -v
```

## Evaluate with v2

The v2 prompt has a separate schema for presence-only instructional features,
eight response-quality judgments, language mechanics, resources, and instructional
structure. Select both the prompt and schema; v3 remains the default.
Use the v2 prompt as the rubric reference snapshot for this version.

```powershell
.venv/Scripts/python.exe conversation-evaluation/run.py simulated-conversation-openrouter/outputs/20260929T163932872222Z --prompt conversation-evaluation/prompts/evaluator-v2.md --schema conversation-evaluation/schemas/evaluator-v2.schema.json --rubric conversation-evaluation/prompts/evaluator-v2.md --output conversation-evaluation/outputs/20260929T163932872222Z-v2
```

Add `--dry-run` to preview requests. Use the same arguments with `--resume` to run
those previews or continue an interrupted evaluation. Each run saves the selected
prompt as `evaluator.md` and includes its content in the resume fingerprint.

## Human annotation

Use the [human coding guide](human-annotation/coder-guide-v2.md) and copy the
[annotation form](human-annotation/annotation-form-v2.md) for each conversation.
The guide follows v2 and covers response annotation, feature counting, quality
judgments, evidence, conversation ratings, and coder calibration.

### Topic centered human codebook v3

The [v3 human codebook](human-annotation/coder-guide-v3.md) starts with a report card
and evaluates the topic explanation and the interaction across the conversation.
The automated v3 evaluator follows [coding-guidebook.md](human-annotation/coding-guidebook.md).
Earlier human guides and annotation forms retain their own units and labels.
