# Literature-grounded student persona generator

## Context

The simulated student in [student.py](../src/tutoring_check/simulation/student.py) doesn't read as a real learner. Its three personas (`standard` / `struggling` / `advanced`) are short hand-written bullet blocks that only modulate *how fast the student gets it*; everything else — what the student actually believes, how they talk, how they respond to being taught, when they give up — is a single fixed frame shared by all three. There is no representation of *what the student wrongly thinks*, so "confusion" is performed rather than caused, and the three personas collapse toward the same behavior over a 20-turn session.

The fix is to make the student's **epistemic state** explicit and to derive the prompt from a structured, literature-grounded trait vector instead of hand-written prose. A persona is compiled once, offline, into a pinned artifact on disk; the session loop stays a deterministic string assembly with no extra LLM calls, so a persona is byte-identical across every tutor model and every repeat.

**Decisions taken:**
- **The study manipulates one factor with four levels, not seven traits.** Traits are the compiler's internal vocabulary — the place the literature grounding lives — but a run set names a single `student_level`. A run set cannot set an individual trait. See [Part 5](#part-5--the-four-student-levels).
- MVP is **one topic**, then extend. Topic = **`tree-mass`** — it is what `run_set_dialogic.json` and `run_set_probe.json` already run, so replacing the legacy personas doesn't strand the active run sets, and "a tree's mass comes from the soil" is a textbook *ontologically robust* misconception, which is the sharpest test of the design.
- Misconceptions are **researched by LLM agents with web search**, one time per topic, into a per-topic JSON file, with a **real verification pass** (an independent agent that fetches every cited source) followed by human sign-off.
- Legacy `standard` / `struggling` / `advanced` are **replaced** by compiled equivalents under the same ids. `student.PERSONALITY` is deleted.
- **All realism measurement is deferred.** No metrics module, no student-act judge in this work.

---

## Literature grounding

The organizing frame is **Epistemic State Specification** from *Towards Valid Student Simulation with LLMs* ([arXiv:2601.05473](https://arxiv.org/abs/2601.05473)): a simulated learner is only valid to the extent you specify what it can access. Its five levels run E0 (unspecified) → E1 (static bounded knowledge) → E2 (curriculum-indexed) → E3 (**misconception-structured**, explicit error models) → E4 (calibrated on human data). **The current prompt is E1. The whole point of this work is E3.** The paper's three E3+ validation criteria — *fidelity of error*, *epistemic consistency*, *boundary of competence* — become concrete constraints in the compiler and validator.

The failure modes to design against come from *Simulated Students in Tutoring Dialogues: Substance or Illusion?* ([arXiv:2601.04025](https://arxiv.org/abs/2601.04025), ACL 2026), which had expert teachers interact with simulated students across six realism dimensions (dialogue acts, correctness, error-making, knowledge acquisition, language use, tutors' responses). Prompted LLM students: **over-produce "seek information" acts and correct responses**; write too short or with **formal grammar and punctuation unlike real students**; and — the one that matters most here — show **response patterns that are uniform across students, lacking diversity**.

Everything else grounds an individual trait:

| Source | What it grounds |
|---|---|
| Driver & Easley 1978 "alternative conceptions"; Driver et al., *Making Sense of Secondary Science*; AAAS Project 2061 assessment items (misconception distractors with measured prevalence) | The misconception library itself |
| **diSessa** knowledge-in-pieces / p-prims (fragmented, context-cued, labile) vs **Chi** ontological miscategorization (treating force/heat/matter as a possessed substance — empirically **resistant to instruction**) | `misconception_robustness` — how many turns before the student gives up the wrong idea. This is the mechanism the current `struggling` bullet "Don't follow a hint to its conclusion" crudely stands in for |
| **ICAP** (Chi & Wylie 2014): passive → active → constructive → interactive; Chi et al. 1994 self-explanation | `self_explanation_propensity` — bare answer vs. generating reasoning beyond what was given |
| **Aleven & Koedinger**, IJAIED 2016 help-seeking review; Baker gaming-the-system | `help_seeking_style` — avoidant / executive ("just tell me") / instrumental |
| **D'Mello & Graesser** affect dynamics: engaged/flow → confusion at an impasse → frustration if unresolved → boredom | `affect_trajectory` — a state machine with triggers, not a static mood |
| Chi 2001 (tutors produce ~93.5% of words); the realism paper's register finding | `register_and_verbosity` |
| **HACHIMI** ([arXiv:2603.04855](https://arxiv.org/abs/2603.04855)) — theory-anchored components generated by a propose → validate → revise loop against executable constraints | The compiler pipeline architecture |

Phase-2 traits, designed for but not built: `transfer_fragility` (diSessa — gains collapse when the framing changes), `goal_orientation` (mastery / performance-approach / performance-avoidance — avoidance predicts bluffing rather than admitting confusion), `self_efficacy` (Bandura), `metacognitive_calibration`, `classroom_norms` / `medium_of_instruction` (translanguaging; ties to the existing `code_mixed` vs `monolingual` modes in [prompts.py](../src/tutoring_check/translations/prompts.py)).

---

## Part 1 — Misconception library (one-time, LLM-researched, verified)

**Deliverable:** `data/misconceptions/tree-mass.json`. Produced by a documented three-stage procedure run inside Claude Code, written up in `docs/misconception_library.md` so it is repeatable per topic. This is authoring, not runtime code — no Python is needed to produce it.

**Stage 1 — Research.** An agent with WebSearch/WebFetch collects documented alternative conceptions for the topic. Source priority: AAAS Project 2061 assessment items (item code + field-tested prevalence), Driver et al., discipline concept inventories, peer-reviewed JRST / IJSE / *Science Education* studies. Textbook blog posts are usable only as a pointer to a primary source.

**Stage 2 — Verify (independent agent, does not see Stage 1's reasoning).** For every entry, fetch every cited URL and confirm it resolves and actually states the misconception. Each source's `verified` flips to `true` only on that basis. An entry with no verified source is deleted, not downgraded — a misconception with a broken citation is indistinguishable from one the model invented. **This is the guard against fabricated citations, the single largest risk in LLM-sourced literature grounding.**

**Stage 3 — Human sign-off.** You read the file and set `reviewed` to your handle and the date. The loader raises on any entry where `reviewed` is null, unless `--allow-unreviewed` is passed.

### Schema

**The library carries topic facts; [`traits.py`](#part-2--trait-registry-internal-vocabulary-not-study-variables) carries theory.** That line decides what belongs here. Anything true of *learners in general* — how stubbornly a wrong idea is held, how fast someone changes their mind — is a trait, fixed by the level. Anything true of *this concept* is a library field.

```json
{
  "topic_id": "tree-mass",
  "canonical_explanation": "Most of a tree's dry mass is carbon fixed from atmospheric CO2 during photosynthesis.",
  "answer_giveaway_terms": ["carbon dioxide", "photosynthesis", "carbon", "from the air"],
  "misconceptions": [
    {
      "id": "tree-mass.from-the-soil",
      "name": "A tree's mass comes from the soil",
      "belief": "Most of it comes out of the soil — solid stuff has to come from solid stuff, and air is nothing.",
      "predicts": "The pot of soil would weigh a lot less after the tree grew.",
      "changes_only_when": ["shown a demonstration they can picture", "shown that a gas can be weighed"],
      "slides_into": "That it was the water, which turned into wood.",
      "sources": [
        { "citation": "", "url": "", "verified": false }
      ],
      "reviewed": null
    }
  ]
}
```

| field | who reads it |
|---|---|
| `belief`, `predicts` | compiler → `what_you_believe`; `predicts` also drives the `belief_present` validator |
| `changes_only_when` | compiler → the conceptual-change rule. The level says *how much* evidence shifts the student; this says *what counts as evidence for this concept*, which the level cannot know. Anything not on the list is re-explained away rather than accepted, so a separate "resists" list is redundant |
| `slides_into` | **optional.** compiler → the wrong-idea → *different* wrong-idea → right-idea path, so change isn't monotonic. Free prose, not an id, so a topic needs only one entry |
| `canonical_explanation`, `answer_giveaway_terms` | the `no_answer_leak` validator |
| `sources`, `reviewed` | the human auditing the literature claim |

`answer_giveaway_terms` is a **blocklist, not a description of the topic** — the name matters, because "keywords for this topic" invites someone to fill it with *tree, mass, soil*, which a persona prompt must be free to use. It is only the terms whose presence means the answer has leaked. It cannot be derived from `canonical_explanation`: that sentence also contains *tree* and *mass*, and no extraction rule separates those from *photosynthesis* by frequency or part of speech. Deciding which words constitute the answer is the human judgment this field records.

`changes_only_when` is the field most likely to look droppable and isn't. Without it the compiler invents a yield condition, and the most natural thing for it to invent is the correct explanation — which is precisely the answer-leak failure `no_answer_leak` exists to catch. A human-authored yield condition that deliberately stops short of the answer is a control, not decoration.

**Cut, and why:** `robustness` / `why_robust` / `ontology` (theory in the wrong file — `misconception_robustness` is a trait the level fixes, and the level must win, or `struggling` and `advanced` could not differ on the same topic) · `topic_type` (derivable from which topic catalog the id is in) · `reasoning` (folded into `belief` — a first-person statement carries its own because-clause) · `resists` (the complement of `changes_only_when`) · `prevalence` (never reaches the prompt, and the field most likely to be quietly fabricated) · per-source `type`/`item_code` and the nested `review` object (a citation, a URL, a checkbox, and a signature are enough).

`canonical_explanation` and `answer_giveaway_terms` live here rather than in [topics_ci.json](../data/topics_ci.json) so the answer-leak validator has everything it needs in one file, and no catalog every consumer reads has to change.

**Two entries per topic is the working default, one is viable.** The primary misconception is what the levels bind to; a second is only worth authoring if it is genuinely distinct rather than a rephrasing. `slides_into` being prose means the wrong-idea drift no longer requires a second full entry to exist.

---

## Part 2 — Trait registry (internal vocabulary, *not* study variables)

> **Traits are never named in a run set.** They exist so each student level has a principled, citable definition and so the compiler receives a specific behavioral brief rather than an adjective. The only thing that varies in an experiment is `student_level`, and each level fixes every trait at once. Adding a trait therefore costs nothing in study design — it costs prompt tokens, and that is the real budget (see Risk 3).

`src/tutoring_check/personas/traits.py`, structured exactly like [dimensions.py](../src/tutoring_check/evaluation/dimensions.py) — frozen dataclasses, a module tuple, a `_MAP`, accessor functions. It is the single source of truth: compiler prompt text, JSON schema, spec validation, and the jargon blocklist all render from it.

```python
@dataclass(frozen=True)
class TraitLevel:
    value: str          # "robust"
    definition: str     # one line, in the literature's own terms
    consequence: str    # the behavioural instruction handed to the compiler

@dataclass(frozen=True)
class Trait:
    key: str
    name: str
    group: str          # epistemic | learning_dynamics | dialogue | affect
    definition: str
    citation: str
    levels: tuple[TraitLevel, ...]
    default: str
    topic_bound: bool = False
    banned_terms: tuple[str, ...] = ()   # jargon that must not reach the student prompt
```

### MVP traits (eight)

| key | group | values | topic-bound | citation |
|---|---|---|---|---|
| `misconception` | epistemic | an id from the topic's library, or `none` | **yes** | Driver et al.; AAAS 2061 |
| `misconception_robustness` | epistemic | `labile` \| `intermediate` \| `robust` | no | diSessa vs Chi |
| `conceptual_change_rate` | learning_dynamics | `slow` \| `moderate` \| `fast` | no | ESS "simulating learning" |
| `self_explanation_propensity` | dialogue | `passive` \| `active` \| `constructive` | no | ICAP, Chi & Wylie 2014 |
| `help_seeking_style` | dialogue | `avoidant` \| `executive` \| `instrumental` | no | Aleven & Koedinger 2016 |
| `register_and_verbosity` | dialogue | `terse_colloquial` \| `typical` \| `expansive` (each carries a sentence band + mechanics rules) | no | Chi 2001; realism paper |
| `affect_trajectory` | affect | `engaged_persistent` \| `confusion_to_frustration` \| `flat_compliant` | no | D'Mello & Graesser |
| `goal_orientation` | affect | `mastery` \| `performance_approach` \| `performance_avoidance` | no | achievement goal theory; Dweck |

`misconception_robustness` and `conceptual_change_rate` are deliberately separate. Robustness is how hard *this student* finds *this one belief* to give up; change rate is how quickly they take on a new idea in general. Keeping them apart is what lets a fast learner still cling to a single belief long after they have absorbed everything else — which is the behavior no current persona can produce. Both are fixed by the level, not by the topic: if the library pinned robustness per misconception, `struggling` and `advanced` could not differ on the same topic, which would defeat the level design.

`goal_orientation` earns its place because `performance_avoidance` is the only construct that produces bluffing and going quiet *instead of* admitting confusion. It is what defines the fourth student level below; without it that level is just "struggling with extra steps".

**Consequence text is the tuning surface.** It must be quantified and non-optional. Illustrative, for `misconception_robustness = robust`:

> The wrong idea is not a guess you are willing to drop. Being told the right answer, or being shown one example that contradicts it, does not change it — you re-explain that example in terms of the idea you already hold. You shift only after being walked through at least four separate turns of evidence you could picture yourself, and even then you first move to a different wrong idea rather than to the right one.

Note the contrast with the current prompt's `Sometimes misunderstand or partially understand concepts` — an opt-out modal that models simply ignore.

---

## Part 3 — Persona spec, compiler, validator

### What the compiler replaces

Reading [student.py](../src/tutoring_check/simulation/student.py) line by line:

**Stays fixed and hand-written** (these are the comparability guarantees — letting the compiler regenerate them would let personas differ on things that are not traits): the identity + "goal is to learn, not to test the teacher" line (L39–40), the language directive (L42), `Your current struggle: {question}` (L69–70), the Reminder block (L72–73), and the two global negatives at L64/L66.

**Replaced by generated sections:** Core Identity (L44–47), Communication Style (L49–54), Learning Behavior (L56–61), the two boundary lines L65/L67, and the whole `PERSONALITY` block.

### Output: JSON with fixed named sections

Free text would be undiffable and would let structure vary across personas. Fixed keys, fixed render order:

`who_you_are` · `what_you_believe` · `what_you_can_and_cannot_use` · `how_you_talk` · `how_you_respond_to_teaching` · `how_you_feel_as_it_goes` · `when_you_are_stuck` · `do_not`

`what_you_can_and_cannot_use` is the highest-value section — it is ESS's *boundary of competence* made explicit as a list of terms the student has and terms it does not have until taught.

### Compiler system prompt

Five blocks: **role** ("you are a learning scientist writing a role instruction another model will follow while playing a middle-school student") · **the assigned trait catalog**, rendered from the registry by a `_trait_catalog()` function shaped like [`instruction_annotator._move_catalog()`](../src/tutoring_check/evaluation/instruction_annotator.py) · **the topic, question and full misconception entry verbatim** · **writing rules** · **the output schema restated in prose**.

The writing rules, in priority order:

1. **Never write an example of something the student says.** State behavior as a rule. The rule carries its reason — *any quoted line you write will be reproduced word-for-word by the model playing this student and will appear in most of its turns*. This is not hypothetical: the comment at [student.py:51](../src/tutoring_check/simulation/student.py#L51) records that the previous few-shot examples were removed because the student opened half its turns with "Wait".
2. **No framework jargon** — never *misconception, persona, trait, ICAP, p-prim, self-efficacy, scaffold, level*. Blocklist assembled from `Trait.banned_terms`. A student told it "holds a misconception" performs having one instead of having one.
3. **No opt-out modals.** "You do X", never "you might sometimes X".
4. **Quantify** — turn counts in `how_you_respond_to_teaching`, a sentence band in `how_you_talk`.
5. **Never state the correct answer or restate the learning question.**
6. **≤ 550 tokens total.** It is prepended on all 10 student turns, and instruction-following degrades with length.

Calling convention: `litellm.completion` (sync — offline batch, none of `session.py`'s streaming/metrics machinery needed), `response_format` as a **raw JSON-schema dict** built the way [`instruction_annotator.response_format()`](../src/tutoring_check/evaluation/instruction_annotator.py) does — no Pydantic, matching repo convention. Model resolved through `catalog.resolve_model_ref` so Vertex `litellm_params` are picked up; reuse the Vertex-Claude `thinking`/`output_config` branch from [evaluator.py](../src/tutoring_check/evaluation/evaluator.py) if a Claude model is chosen. Retry via `attempt()` from [translations/model.py](../src/tutoring_check/translations/model.py).

### Propose → validate → revise

Mirrors [translations/pipeline.py](../src/tutoring_check/translations/pipeline.py) (translate → estimate → refine), the in-repo precedent. `propose → V1 → revise → V1 → …`, `max_revise_iters=2`. Each check returns `Violation(rule_id, section, message)`; messages go verbatim into the revise prompt.

**V1 — deterministic, zero API cost** (`personas/validate.py`):

| rule | check |
|---|---|
| `schema` | all sections present, non-empty, within length band |
| `no_example_utterances` | no quoted span > 3 words (straight and curly quotes), no `e.g. "`, no quote-leading bullet |
| `no_jargon` | no term from the registry blocklist |
| `no_answer_leak` | no `answer_giveaway_terms`, and bounded n-gram overlap with `canonical_explanation` — **checked on every section except `what_you_can_and_cannot_use`** |
| `boundary_nonempty` | `what_you_can_and_cannot_use` names ≥ 2 terms the student does *not* have |
| `belief_present` | the misconception's `predicts` keywords appear in `what_you_believe` |
| `quantified` | ≥ 1 numeral in `how_you_respond_to_teaching`; a sentence band in `how_you_talk` |
| `second_person` | addresses "you", never "the student" |
| `budget` | total tokens under the cap |

On exhaustion, write the artifact with `validation.status = "failed_validation"` and have `build_student_system_prompt` **refuse to load it** — a persona that failed its own constraints is not a valid stimulus. Every attempt is kept in `history` for auditing.

`no_answer_leak` is load-bearing and non-obvious: a literature-accurate misconception description has to describe the concept precisely, and one careless clause ("you think it comes from the soil, though actually it's carbon from the air") hands the student the answer and looks fine to a human skim. The realistic leak site is `how_you_respond_to_teaching`, written from `changes_only_when` — "shown that a gas can be weighed" is fine, "shown that plants take carbon from the air" is not, and the two are one clause apart.

**`what_you_can_and_cannot_use` is exempt, and must be.** Its entire job is to name the terms the student does *not* have yet — which, for tree-mass, is precisely *photosynthesis* and *carbon dioxide*. Running the blocklist over it would fail every valid persona. Naming a term as out of reach is the opposite of leaking it: the student is told the word exists and that they cannot use it until taught, which is the boundary of competence being set, not crossed.

---

## Part 4 — Artifacts, persistence, wiring

```
data/misconceptions/tree-mass.json
data/personas/compiled/<level>__<topic_id>__<language_id>.json    # output, one file per cell
data/personas/persona_set.json                                    # the generation job list
```

There is **no spec file** — a level *is* its trait bundle in `personas/levels.py`, so the input to compilation is code plus the topic's misconception entry. One level compiles to N artifacts because `misconception` is topic-bound and register is language-bound; one file per cell keeps the CLI resume-safe by file existence, matching [cli.py](../src/tutoring_check/cli.py) and [evaluation/cli.py](../src/tutoring_check/evaluation/cli.py).

Artifact carries: `level`, `topic_id`, `language_id`, `region_id`, `spec_hash`, `registry_version`, `misconception_id`, `traits` (the resolved flat dict, so the artifact is self-describing even if `levels.py` later changes), `sections`, `compiler` (model, reasoning, prompt sha256), `validation`, `history`, `created_at`.

**Caching:** `spec_hash = sha256(resolved trait dict + topic entry + misconception entry + registry_version)`. Skip if the artifact exists *and* the hash matches. A **mismatch is a loud error, not a silent recompile** (`--force` to override) — silently recompiling mid-campaign would change the stimulus between cells and quietly invalidate the comparison. This is one notch stricter than the existence-only check in `evaluator.py`, and the asymmetry is deliberate: an evaluation is a measurement, a persona is a stimulus. It also means editing one level's bundle invalidates only that level's artifacts, not all four.

**Changes to existing files:**

- [config.py](../src/tutoring_check/simulation/config.py) — delete `STANDARD`/`STRUGGLING`/`ADVANCED`/`PERSONAS`. `SessionConfig` keeps `persona: str` as the field name (it is what run sets and existing transcript headers already say) but it now holds a level id, and the dataclass gains `persona_artifact: PersonaArtifact`. Validation of the id moves to `personas.levels`.
- [student.py](../src/tutoring_check/simulation/student.py) — delete `PERSONALITY`. `build_student_system_prompt` becomes fixed frame + `SECTION_ORDER` render of the artifact's sections. Keep the existing inline `#` comments on the surviving lines; they are the record of what has already failed.
- [catalog.py](../src/tutoring_check/simulation/catalog.py) — `build_session_config` loads the compiled artifact for `(level, topic_id, language_id)` and raises with a message naming both the expected path and the known levels if it is missing. `Catalogs` gains a misconceptions entry via the existing `_read`/`_index` idiom.
- [session.py](../src/tutoring_check/simulation/session.py) — `session_start` header gains `persona_registry_version`, `persona_spec_hash`, `persona_traits`, `misconception_id`, all additive so [transcript.py](../src/tutoring_check/evaluation/transcript.py) keeps working (older transcripts under `runs/` have no `persona` key at all — read via `.get()`). `persona_traits` is what downstream analysis conditions on when a level definition later changes.

---

## Part 5 — The four student levels

**`student_level` is the study's only manipulated student factor.** Each level is a fixed, named bundle of all eight traits, defined once in `personas/levels.py` and versioned with the registry. A run-set item names a level; it cannot set a trait. That keeps the design at four cells per topic and keeps every comparison legible.

| level | misconception | robustness | change rate | self-explanation | help-seeking | goal orientation | register | affect |
|---|---|---|---|---|---|---|---|---|
| `struggling` | primary | robust | slow | passive | instrumental | mastery | terse_colloquial | confusion_to_frustration |
| `developing` | primary | intermediate | moderate | active | instrumental | mastery | typical | engaged_persistent |
| `advanced` | primary | labile | fast | constructive | instrumental | mastery | typical | engaged_persistent |
| `reluctant` | primary | intermediate | **moderate** | passive | **avoidant** | **performance_avoidance** | terse_colloquial | flat_compliant |

### Why four, and why this fourth one

`struggling` → `developing` → `advanced` is an ordered ability spine. On its own it is a better-specified version of what already exists, and three ordered levels would have been a rename rather than a contribution.

**`reluctant` is the level that earns the redesign.** It is *cognitively capable* — moderate conceptual-change rate, the same as `developing` — but withholds: avoidant help-seeking (Aleven & Koedinger's help avoidance), performance-avoidance goals (which predict helpless responses and avoiding any risk of visible failure), passive engagement (ICAP), and a flat affect trajectory rather than productive confusion. It dissociates **ability from responsiveness**, which are perfectly confounded in the current three personas and are exactly what makes the present simulation feel like one student with a difficulty dial.

It is also the pedagogically interesting cell: a tutor that succeeds with `struggling` by patient re-explanation will *fail* with `reluctant`, because the bottleneck is not comprehension. That is a real, measurable tutor difference the current design cannot surface.

### Adjusting the count

The level table is one dict in `personas/levels.py` — changing the count is a small, local edit, not a redesign:
- **Drop to three** by removing `developing` (keeping the two ability extremes plus `reluctant`) if four cells × topics × tutor models is too many runs. Do not drop `reluctant`.
- **Extend to five** with `overconfident` — fast change rate, `performance_approach`, expansive register, `intermediate` robustness — a student who claims understanding early and moves on with the wrong idea intact. This is the direct counterpart to the documented LLM-student failure of over-producing correct responses, and it is the natural next addition if four separates cleanly.

### Backward compatibility

Legacy `standard` maps to `developing`; `struggling` and `advanced` keep their ids. A `generic` level (no misconception, otherwise `developing`) is compiled once per language as the topic-independent fallback, so run sets that never name a persona — [run_set.json](../data/run_set.json), [run_set_contrast.json](../data/run_set_contrast.json) — keep loading on topics whose misconception library doesn't exist yet.

**Consequence to be explicit about:** re-running an old run set after this change produces a *different student* than the transcripts already in `runs/`. That is inherent to replacing the personas, and it is why the artifact + `spec_hash` machinery exists — from here on, the stimulus is pinned and auditable, which it currently is not.

---

## File layout and CLI

New package `src/tutoring_check/personas/` — not files inside `simulation/`. The compiler is an offline generation tool with its own model calls, CLI and artifacts, which is the same relationship `translations/` and `evaluation/` already have to `simulation/`. `simulation/student.py` imports only `personas.artifact`, a pure JSON reader, so the session loop never depends on the compiler.

```
personas/
  traits.py            registry: Trait, TraitLevel, TRAITS, trait_keys()
  levels.py            LEVELS: the four named trait bundles + resolve(level, misconception)
  misconceptions.py    loader for data/misconceptions/*.json + `reviewed` gate
  artifact.py          PersonaArtifact, SECTION_ORDER, read/write, artifact_path(), spec_hash()
  compiler_prompt.py   build_system_prompt(), build_revise_prompt(), response_format()
  validate.py          Violation + the V1 rules
  pipeline.py          propose -> validate -> revise
  cli.py               generate CLI
```

`levels.py` is the file you edit to change the study design; `traits.py` is the file you edit to change how a level behaves. Keeping them separate is the whole point — a level table that inlined its own prose would drift out of sync with the citations.

```
PYTHONPATH=src python -m tutoring_check.personas.cli \
  --persona-set data/personas/persona_set.json \
  --out data/personas/compiled \
  --compiler-model gemini-3.1-pro-preview --compiler-reasoning high \
  [--level struggling] [--force] [--dry-run] [--allow-unreviewed]
```

`persona_set.json` mirrors `run_set.json` exactly — a `defaults` block merged under each `items` entry, per [`load_run_set`](../src/tutoring_check/simulation/catalog.py). `--dry-run` prints the compiler prompt and the expanded cell list with **no model call**; that is what you want most of the time while iterating on `consequence` wording, and it costs nothing.

---

## Verification

1. `--dry-run` the compiler for `struggling__tree-mass__en-US` and read the assembled compiler prompt: the trait catalog renders from the registry, the misconception entry is embedded verbatim, and the writing rules are present.
2. Compile all four personas for `tree-mass` / `en-US`. Confirm each artifact has `validation.status == "passed"`, and read `history` to see whether the revise loop fired and on which rule.
3. Deliberately break it: hand-edit an artifact so `how_you_respond_to_teaching` contains a quoted example and an `answer_giveaway_terms` term, re-run, and confirm `no_example_utterances` and `no_answer_leak` both fire and the loader refuses a `failed_validation` artifact. Then confirm the mirror case — the *same* term in `what_you_can_and_cannot_use` must **not** fire, or the exemption is wired wrong.
4. Print the four assembled student system prompts and diff them against each other and against the current prompt. The fixed frame must be identical across all four; only the section content differs. Check specifically that `developing` and `reluctant` differ in *withholding*, not in *ability* — they share a conceptual-change rate, so any wording that makes `reluctant` read as slower is a level-definition bug.
5. Run the existing probe set end to end — `PYTHONPATH=src python -m tutoring_check.cli --run-set data/run_set_probe.json --out runs/persona_mvp` — and confirm `session_start` carries `level`, `persona_traits`, `misconception_id` and `spec_hash`.
6. Read the transcripts, one per level. What to look for: does `struggling` hold the soil belief for most of the conversation and re-explain the tutor's counterexample in its own terms; does `advanced` drop it after one good explanation; does `reluctant` stay short and agreeable without ever committing to a claim it could be wrong about; do any turns open with the same two words; does any student turn use a term from its own "cannot use" list before the tutor introduced it.
8. The design's own success criterion: a reader shown four unlabelled transcripts should be able to sort them by level. If `developing` and `reluctant` are indistinguishable, the trait `consequence` text is too weak, not the level table.
7. Re-run the compile CLI unchanged and confirm every cell reports `skip (exists)`; then bump `registry_version` and confirm the hash mismatch raises rather than silently recompiling.

---

## Deferred / out of scope

- **All realism measurement** — no metrics module, no student dialogue-act judge, no cross-persona separation statistics. When you do want it, the six realism dimensions from arXiv:2601.04025 are the taxonomy, and the cheap deterministic half (boundary leakage, utterance-length variance, opening n-gram concentration, misconception persistence) is computable from `transcript.jsonl` with no API cost.
- Remaining traits (`transfer_fragility`, `self_efficacy`, `metacognitive_calibration`, sociocultural traits) — the registry is designed to hold them, and adding one costs prompt tokens rather than study cells.
- A fifth `overconfident` level, and any per-trait manipulation in run sets. If a later study needs to vary one trait while holding the rest fixed, that is a deliberate extension of `levels.py`, not something a run set should be able to do ad hoc.
- Topics beyond `tree-mass`; the research procedure in `docs/misconception_library.md` is written to be re-run per topic.
- The LLM critic (V2) validation pass.
- Context-dependent topics — in [topics_cd.json](../data/topics_cd.json) the student is the *expert* on their own culture, so E3 misconception structure does not apply. `build_session_config` should raise a clear error rather than degrade silently.
- The per-turn anti-drift nudge. Worth an explicit A/B later: the drift literature says scripted per-turn conditioning eliminates regression to baseline assistant behavior, but it also changes what the student sees each turn and so threatens comparability.

## Risks

1. **Reasoning models see through the persona.** Every current run set uses `student_reasoning: "high"`. A reasoning model told to hold a false belief frequently reasons its way to the true answer in the trace and then leaks it. Test `low` / `none` early — I'd expect this to matter more than any prompt wording, and it is a one-line experiment.
2. **The copying failure will recur in a new form.** Banning quoted examples stops literal copying; the model can still emit a template ("you start by saying you're not sure, then…") that the student turns into a formula. Nothing in this scope catches that automatically, since measurement is deferred — it needs eyes on the transcripts at step 6.
3. **Instruction-following ceiling — the real budget.** Levels cap the *study* at four cells, but they do not cap the *prompt*: every trait added to the registry lands in all four compiled prompts. Past roughly 800 tokens of persona instruction, models average everything toward a bland default, and the levels stop separating. Eight traits is already near the useful limit; adding a ninth should mean cutting something.
8. **Level collapse.** Four bundles that differ on paper can still produce four similar transcripts, because the traits are not independent in the model's head — "avoidant + passive + terse" may just read as "struggling". Verification step 8 is the check; if it fails, the fix is sharper quantified `consequence` text (turn counts, sentence bands), not more traits.
4. **Fabricated citations** in the misconception library. Stage 2's independent fetch-and-check pass is the mitigation; do not skip it, and do not let the researching agent verify its own sources.
5. **[docs/simulation.md](simulation.md) §0.1 makes "identical student for every tutor" the design's foundation.** Varying the student is a deliberate reversal of the checked-in spec; comparability is preserved by pinning artifacts and holding the frame constant, but §0, §4 and the §8 checklist need rewriting as part of this work rather than being left stale.
6. **[data/run_set.json](../data/run_set.json) is currently unloadable** — it declares `topics` + `pedagogy_sweep`, but `load_run_set` reads only `run_set["items"]`. Build only on the `items` path; a persona sweep expander written now would collide with whatever eventually restores the pedagogy sweep.
7. There is **no test suite** (no `tests/`, no pytest dep). The V1 validators are pure functions over strings and are the natural place to introduce `pytest` under a `dev` extra — without it, a registry edit silently invalidates every compiled artifact and nothing notices.
