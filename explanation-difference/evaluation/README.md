# Content evaluation pipeline

Two independent stages, using `gemini-3.8-flash` by default:

1. `translate`: Tamil or mixed Tamil/English explanations become English. Existing
   English explanations are copied exactly without an API call. Detection uses actual
   Tamil characters, not `lang_id` (which describes prompt language in this experiment).
   This module currently targets the English/Tamil dataset, not arbitrary languages.
2. `extract`: an LLM inventories subtopics and examples from the English version.
   Every item requires a verbatim evidence quote. Examples link to subtopics and are
   classified as worked examples, illustrations, applications, analogies or questions.
   Repetitions should be merged. Subtopics distinguish mentions from explanations.

From the repository root:

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/evaluation/pipeline.py all --dry-run
explanation-difference/.venv/Scripts/python.exe explanation-difference/evaluation/pipeline.py translate
explanation-difference/.venv/Scripts/python.exe explanation-difference/evaluation/pipeline.py extract
explanation-difference/.venv/Scripts/python.exe -m unittest discover -s explanation-difference/evaluation -p test_pipeline.py
```

Use `--batch` for another collected batch or one topic folder, `--output` for a new
evaluation location, `--translator` / `--judge` for model catalog IDs, and `--limit`
for a pilot. Defaults cover all 60 responses in `outputs/multiple`. `all` executes
translation before extraction and stops if any translation fails.

Outputs default to `<batch>/evaluation/{translate,extract}/<topic>/`: one JSON per
source job and a readable `results.md`. Each stage also has `summary.csv` and an
append-only `api_calls.jsonl` with application-level requests, raw responses and
sanitized errors, excluding API credentials. Original responses remain unchanged.

Completed matching records are reused automatically. Fingerprints cover the source,
model configuration, instruction prompt, schema version and (for extraction) English
text. Configuration changes require another output location; failed attempts can be
retried by repeating the command. Failed validation attempts receive corrective
feedback on retry; both attempts remain in the API log. Do not run two processes against the same output.
Extraction requires completed translations matching the current originals.

Translation instructions explicitly preserve errors, numbers, examples and omissions.
This is an instruction, not a guarantee of translation fidelity: manually review
translations before interpreting differences. Mixed or ambiguous technical terms may
be changed by the translator. English passthrough and translated records identify the
processing mode. Native-language quality cannot be judged from translations alone.

Extraction is a content inventory, not a correctness assessment or quality score.
The validator checks JSON structure, IDs, links and evidence substrings; it does not
prove semantic completeness, correct categorization, or equivalent granularity across
answers. Review a sample before comparing counts. Labels are response-local; cross-model
concept alignment is a separate future module. Source model identities are retained in
metadata but are not sent to the judge. Using Gemini as a judge may still introduce bias.
