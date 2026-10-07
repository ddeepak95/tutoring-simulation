# Comparative evaluation

This separate pipeline compares an English tutoring conversation with a non-English
conversation on the same topic. The existing `conversation-evaluation` runner is
unchanged. Tamil is supported, and the same workflow accepts other explicitly named
non-English languages.

## Workflow

One pair normally requires **nine model calls**, excluding retries:

1. Translate the non-English transcript and available topic/learner/tutor context
   faithfully into English.
2. Review the draft against the original, returning the complete revised translation
   and reasons for changed segments. There is one review pass.
3. Independently extract instructional features, Instructional Sequence, confirmed
   errors, verification cases, and limitations from the English original, non-English
   original, and reviewed translation: three calls.
4. Compare seven pedagogical quality items in both A/B and B/A orders, then compare
   three conversation-quality items in both orders: four calls.

Each judge sees only the original transcripts, reviewed English translation, and
available learner/topic/tutor context. Extraction results, previous judgments,
model identities, source filenames, and hidden simulator student instructions are
excluded. Original wording is authoritative for naturalness and tone. Language
remains visible in the transcript, so A/B labels do not conceal language identity.

Judges return `A`, `B`, `tie`, `not_applicable`, or `insufficient_evidence` for each
item, with reasons and exact quotations. Numeric rubric anchors remain in the exact
coding guidance but no numeric scores are requested. Instructional Sequence is
descriptive and has no winner. Outcomes are mapped to `english_original` or
`non_english_original`; the source conversation identities remain in `pair.json`.
If both orders agree, their mapped outcome is accepted. Otherwise it is an
`order_disagreement` with no final winner. If an order fails, the outcome is missing.
There is no adjudication call or overall winner.

The current [coding guidebook](../conversation-evaluation/human-annotation/coding-guidebook.md)
supplies item descriptions and guidance verbatim. Stage prompts are assembled at
runtime, avoiding a second copy of the rubric. Structured JSON schemas are supplied
separately through strict OpenRouter `response_format`, not appended to system
instructions. Extraction entry shapes come from the current v3 coding schema.

## Setup and preview

Run from the repository root using the existing Python environment:

```powershell
.venv/Scripts/python.exe -m pip install -r comparative-evaluation/requirements.txt
.venv/Scripts/python.exe comparative-evaluation/run.py simulated-conversation-openrouter/outputs/20260930T200335588721Z --dry-run --output comparative-evaluation/outputs/covalent-radius-preview
```

Dry runs call no models and write no source-adjacent translation files. They save
requests for translation and both original extractions. Downstream stages are
marked as awaiting translation/review, because their exact inputs do not yet exist.
A dry run can be resumed as a live run in the same output directory.

## Live evaluation and models

Set `OPENROUTER_API_KEY` in the repository-root `.env` or environment. All stages
use OpenRouter. The default configuration is `google/gemini-3.8-flash`, 16,000 output
tokens, a 180-second timeout, two transient HTTP retries, and one validation repair.
Requests and responses retain model/provider information and usage, but no credentials.

```powershell
.venv/Scripts/python.exe comparative-evaluation/run.py simulated-conversation-openrouter/outputs/20260930T200335588721Z --output comparative-evaluation/outputs/covalent-radius-live
```

Use `--model` to change every stage, or `--translation-model`, `--review-model`,
`--extraction-model`, and `--judge-model` to override individual stages. `--config`
accepts another settings JSON; `--rubric` accepts a compatible coding guidebook.
Models must support the requested strict structured-output parameters. Unsupported
routes fail rather than silently dropping the schema.

For an English-text-only comparison, use `--comparison-mode english-only`.
Judges then receive the original English transcript and reviewed English translation;
they never receive the non-English original. Wording/tone results apply to the English
texts, with translation dependence recorded as a limitation. The default remains
`--comparison-mode originals`. Use separate output directories for the two modes.

Reuse an earlier run's compatible validated translation/review/extraction stages with
`--reuse-from`. Inputs, schemas, prompts, settings, and cached output must match and
pass validation. Comparative judgments are never borrowed from the earlier run.
If all five upstream stages match, only the four judging calls are needed:

```powershell
.venv/Scripts/python.exe comparative-evaluation/run.py simulated-conversation-openrouter/outputs/20260930T200335588721Z --comparison-mode english-only --reuse-from comparative-evaluation/outputs/covalent-radius-live --output comparative-evaluation/outputs/covalent-radius-english-only
```

## Pairing

Directories are searched for original `conversation.json` files. Explicit JSON paths
and `conversation.md` files with JSON siblings are also accepted. Sources must be
completed conversations with valid learner/tutor messages and unique stable turn IDs.

Automatic pairing groups by `topic_id` and the available configured tutor/student
model IDs. Each group must contain exactly one English conversation and at most one
conversation per non-English language. Missing topic IDs, duplicate candidates, or
unmatched groups require explicit pairing. Hidden model metadata is used only for
matching, not judging. Unknown source languages are rejected.

For explicit pairing, create a manifest with paths relative to that manifest:

```json
{
  "pairs": [
    {
      "english": "../simulated-conversation-openrouter/outputs/20260930T200335588721Z/covalent-radius__en/conversation.json",
      "non_english": "../simulated-conversation-openrouter/outputs/20260930T200335588721Z/covalent-radius__ta/conversation.json"
    }
  ]
}
```

```powershell
.venv/Scripts/python.exe comparative-evaluation/run.py --pairs comparative-evaluation/pairs.json --output comparative-evaluation/outputs/explicit-pairs
```

Explicit pairing permits different model settings or missing topic IDs; the caller
is responsible for choosing a meaningful pair. Duplicate pairs are rejected.

## Translations, validation, and resume

Translation improves fidelity while preserving the source's scientific mistakes,
contradictions, omissions, repetition, tone, formatting, numbers, and formulas.
Review must not improve the teaching. Both stages preserve segment order/IDs, number
inventories, bracketed LaTeX, and dollar-delimited mathematics. These checks cannot
prove semantic fidelity for every technical term or formula written as plain prose.

Each source receives four distinct files in its own folder:

- `conversation.comparative.english.draft.json` and `.md`.
- `conversation.comparative.english.json` and `.md`: reviewed translation.

Originals and existing `conversation.english.*` files are not overwritten. Generated
translation payloads and Markdown have integrity hashes. If a generated translation
was manually changed, the runner preserves it and reports an artifact failure;
move the edited artifact to a separate filename before regenerating it.

Extraction retains distinct-entry rules, detail levels, the two question types, and
exact source questions/error evidence. Question inventory checks retain the existing
punctuation coverage validation, including rhetorical headings. This check does not
classify questions or guarantee coverage of questions without punctuation. Judge
evidence identifies candidate, transcript version, turn ID, exact quote, and its
one-based occurrence, including overlapping matches.

Resume using the same input pair paths and `--output` with `--resume`. Validated
stages are reused only when their inputs, prompts, schemas, and model settings
match. Changed dependencies invalidate affected stages. Resume revalidates cached
output; older rejected caches and attempts remain available. Changing the input
pair membership requires a new output directory. Each resume preserves the previous
manifest in `manifest-history/`.

Translation/review failure prevents comparative judging. Original extraction can
still complete. Extraction failure does not prevent transcript-only judging, but
the report is incomplete. Missing results appear as missing, not zero counts or
ties. Failed pairs do not prevent later pairs from running, and failures produce a
nonzero exit status. Rerun with `--resume` to retry failed stages.

## Results

The output directory contains:

- `manifest.json`, `run_status.json`, rubric, assembled prompts, and schema snapshots.
- `report.md`: links to each pair's comparison.
- `features.csv`: counts, question types, detail levels, representation types, and
  error/verification counts for each transcript version.
- `differences.csv`: non-English minus English, and reviewed minus non-English,
  and reviewed minus English for the corresponding counts. Missing differences are blank.
- `comparisons.csv`: each quality item's accepted outcome, order agreement, and
  the outcomes from both orders. Missing final outcomes are blank.
- Per pair: original normalized sources, reviewed source, pair metadata, stage
  previews/requests/attempts/validated output, `result.json`, and `comparison.md`.

The Markdown report includes original/translation count differences, all ten
comparative outcomes, both orders' reasons and evidence, separate error lists,
verification cases, and limitations. Structured results retain all extraction
entries and order mappings; no errors are automatically merged between versions.

These are comparisons of distinct dialogues, not a controlled estimate of a
language effect. Schema and exact-evidence checks do not prove the factual or
pedagogical reliability of model judgments. No external factual retrieval is performed.

## Offline tests

```powershell
.venv/Scripts/python.exe -m unittest discover -s comparative-evaluation -p "test_*.py" -v
```

Tests mock every model call and cover the nine-stage workflow, pairing ambiguity,
translation review, integrity protection, evidence versions, question inventories,
reversed-order consolidation, failure handling, and dependency-aware resume.
