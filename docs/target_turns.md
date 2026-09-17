# Target Turns — Design Doc

A second mode alongside the live simulation. This hands the tutor a prewritten conversation and takes one turn.
Everything before the target turn is authored, identical for every tutor and every repeat.

Status: §2–§7 implemented in `src/tutoring_check/targeted_simulation/`, except the round-tripped
script check in §6.2. The script file is the request (§2), so this path no longer shares the live
simulation's prompt builders. So, `simulation/tutor.py` and `simulation/student.py` are not used here.

---

## 1. Principles

1. **The tutor must not know the history is prewritten.** It receives a system prompt and the
   prewritten turns in the ordinary message roles (its own turns as `assistant`, the student's as
   `user`). Nothing in the request marks the history as authored.
2. **Free choice.** The target turn never names a target move.
3. **Repeats.** `n` samples at that same context give a distribution, which is the actual object being compared across models and languages.

---

## 2. Script format

Hand-authored JSON under `data/scripts-messages/<language_id>/<script_id>.json`. **The script file
is the request.** It carries its own system prompt, so there is no separate prompt builder and no
student prompt on this path; the **target turn** is the tutor turn that would come next.

```json
{
  "script_id": "gravity-correct",
  "language_id": "en-US",
  "topic_id": "gravity",
  "region_id": "united-states",
  "messages": [
    {"role": "system",    "content": "You are a teacher teaching a student from {region}. ... Respond in {language}."},
    {"role": "assistant", "content": "..."},
    {"role": "user",      "content": "..."},
    {"role": "assistant", "content": "..."},
    {"role": "user",      "content": "..."}
  ]
}
```

`messages[0]` is the system prompt; the rest is the authored context, alternating tutor-first
(`assistant`) and ending on a student turn (`user`).

`{region}` and `{language}` are the only variables. `load_script` fills them from `regions.json`
and `languages.json` using the file's own `region_id` and `language_id`, so the system prompt is
authored once, in English, and is byte-identical across the language directories.
- Scripts carry no author's claim about what a good tutor does. 
- Scoring is the raw move distribution (§7).

### 2.1 Languages

Scripts are authored in English, then produced per language by translation and a native-speaker
pass, sharing the `script_id` across the language directories.

`targeted_simulation/script_translate_cli.py` does the translation via the TEaR pipeline and is re-validated
through `load_script` (checking that the script is tutor-first and there is non-empty text in each JSON list item).
Only the turns are translated: the system message is copied over verbatim with its variables intact,
since it is the tutor's instructions rather than dialogue and `{language}` is what makes the tutor
answer in the target language.

`region_id` follows the target language.
`mode` (code-mixed or multilingual), `translated_from` and `refinements` (number of TEaR refinement passes are made) are recorded in the file
No overwriting occurs without `--overwrite`.

---

## 3. Building the request

`script.request` — the file's `messages` with `{region}` and `{language}` filled in — goes to one
`acompletion` unchanged. The completion **is** the target turn.

Details that carry the "must not know" principle (§1):

- The script opens on the tutor posing the learning question. There is no greeting turn and no
  opening instruction: the live simulation's `"Begin the conversation… introduce yourself…"` nudge
  belongs to the live path only.
- There is no final-turn closure instruction.

---

## 4. Run sets and axes

```json
{
  "defaults": {
    "tutor_model_id": "gemini-3.5-flash",
    "tutor_reasoning": "low",
    "repeats": 20
  },
  "scripts": ["gravity-correct", "speed-incorrect"],
  "languages": ["en-US", "ta-IN"],
  "tutor_models": ["gemini-3.5-flash", "claude-opus-5", "..."]
}
```

Expanded to cells = script × language × tutor model, each holding `repeats` sampled responses.
Headline axes are tutor model × language.

---

## 5. Output

```
runs/<run_set_id>/<script_id>/<language_id>/<model_id>/
    responses.jsonl        # header + one record per repeat
    api_requests.jsonl
    api_responses.jsonl
    responses_en.jsonl     # English rendering (§6)
    evaluation.jsonl       # written by the scorer (§7)
```

`responses.jsonl` header:

```json
{"timestamp": "...", 
 "type": "target_start",
 "script_id": "...", 
 "language": "...", 
 "region": "...", 
 "topic_id": "...",
 "tutor_model": "...", 
 "tutor_reasoning": "...", 
 "repeats": 10,
 "messages": [{"role": "...", "content": "..."}]}
```

then one record per repeat:

```json
{"timestamp": "...", "repeat": 0, "content": "...", "metrics": {...}}
```

Resume-safe per cell: a cell whose `responses.jsonl` already holds `repeats` records is skipped; a
short file is topped up.

---

## 6. Translation for scoring

Rather than annotate in-language, every sampled turn is translated to English and the rubric (which is in English) 
is applied to the English.

Every cell goes through it, English included.

Written as `responses_en.jsonl` in the cell directory, one record per repeat, keyed by `repeat` and
resume-safe by the same record count as everything else:

```json
{"timestamp": "...", "repeat": 0, "content": "...", "source_language": "...",
 "mode": "code_mixed", "refinements": 0}
```

The sampled text in `responses.jsonl` is never rewritten, so the translation stays auditable next to
what it came from. §7 reads `responses_en.jsonl` when it is present and `responses.jsonl` when it is
not.

### 6.1 The same pipeline, the other direction

The TEaR loop from `translations/` — Translate, Estimate, Refine — called with the language pair
reversed. The pipeline itself is unchanged: same prompts, same MQM critique, same refinement rule,
only the source and target languages swap places. So the English here is produced the way the
target-language corpus is, not by a second translator of unknown behaviour.

Feng et al., "TEaR: Improving LLM-based Machine Translation with Systematic Self-Refinement",
Findings of NAACL 2025 ([2025.findings-naacl.218](https://aclanthology.org/2025.findings-naacl.218/)).

Making the language pair a parameter is the only change to `translations/`: `SOURCE_LANG` was
assumed throughout, and each prompt builder now takes `source_lang`, defaulting to it, so the
English → target path is identical. 
- Register guidance follows the language being written. 
- Mode guidance (code-mixed vs monolingual) follows the non-English side of the pair. `mode` is a run parameter here rather than a property of the cell.

Turns are translated one at a time.

Implemented as `targeted_simulation/translate.py` and `translate_cli.py`, resume-safe per repeat.
`--mode`, `--max-refine-iters`, and `--translator-model` are configured per run.

### 6.2 Checking the translation step

Translation removes the rubric-language mismatch but puts a translator between the tutor and the
tag, so two checks separate a real difference from an artefact of the pipeline.

**In-language annotation** Isolate the output side. The same sampled turns are annotated twice (translated version + non-translated version). Written to `evaluation_source.jsonl`; `evaluate_cli.py --in-language`.

**Round-tripped scripts** [Not built.] Isolate the input side. Running a script through English → target → English and sampling against that measures what the script translation alone moves.

---

## 7. Scoring

One cell = a fixed context, one model, `n` sampled target turns. The live evaluator annotates every
tutor turn of a conversation; here only the sampled turn is annotated, `n` times, and the script is
context that is never itself scored.

### 7.1 What is reused

From `evaluation/`, imported:

- `dimensions.py`: the move vocabulary and `dimension_keys()` column order.
- `instruction_annotator.py`: `build_system_prompt(version)`, `mark_dialogue(transcript, turn_id)`,
  `response_format()`.
- `evaluator.py`: `_completion_kwargs`, `_parse_moves`, `_presence_vector`.

`mark_dialogue` takes an `evaluation.transcript.Transcript` and marks only the last line.

### 7.2 New module

`targeted_simulation/evaluate.py`, mirroring `target.py`:

- `score_cell(cell_dir, *, annotator_model, annotator_reasoning, annotator_prompt)` reads the
  English responses (§6), annotates each repeat, writes `evaluation.jsonl` plus its request/response
  logs.
- Resume-safeg: count the records already carrying a `repeat` key and
  annotate only the rest. The summary record is rewritten from the full set of vectors at the end.
- `targeted_simulation/evaluate_cli.py` walks the output tree (or one `--script-id`) and scores each
  cell, with `--concurrency` over cells as in `cli.py`.

### 7.3 `evaluation.jsonl`

Header, then one record per repeat, then the summary:

```json
{"timestamp": "...", "type": "evaluation_start", "script_id": "...", "language": "...",
 "tutor_model": "...", "annotator_model": "...", "annotator_reasoning": "...",
 "annotator_prompt": "v1_baseline", "source": "responses_en.jsonl", "repeats": 10,
 "dimensions": ["elicit_recall", "..."]}
{"timestamp": "...", "repeat": 0, "dimensions": [0, 1, 0, ...]}
{"timestamp": "...", "type": "summary", "repeats": 10,
 "counts": {"elicit_elaboration": 8, "...": 0}}
```

`dimensions` in the header names the columns of every per-repeat vector. 

`source` is which file was annotated.

### 7.4 Reported

**Move distribution**: for each move, how many of the `n` responses carried it.

The comparisons: 
- across tutor models at fixed script × language
- across languages at fixed model × script; and pooled across scripts per model. 

**Open:** whether to also score the response for quality.

---

## 8. Explicitly out of scope (for now)

- **Multi-turn continuation.**
- **Harvested scripts** using existing `runs/` transcripts to scale the corpus.