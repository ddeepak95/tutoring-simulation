# Tutor/Student Conversation Simulation — Build Spec (state-driven, LearnLM)

Simulates tutoring conversations: a **fixed simulated student**, driven by a per-turn
**learner-state injection**, talks to a **tutor model**. The student is identical for every
tutor so that many tutor models can be compared. **One simulation = one conversation =
one cell × repeat** (see §1), saved as one transcript.

This build is the **simulator** — it produces transcripts. Scoring is **out of scope** here,
but the transcript (see §7) carries the fields the downstream critic/ranking needs (§8).

Models come from **litellm**, so there is no provider layer to build, and no separate model
wrapper module: the session loop calls litellm's async completion directly. A wrapper would
only pay off if it centralized retries/backoff or default params; logging already lives in
the run-logger. Revisit only if shared retry logic actually appears.

> This spec is intentionally prose, not code. It is expected to change; nothing here should
> require rewriting code to keep the spec current.

## Lineage & scope

Based on **Jurenka, Kunesch, McKee et al. (Google DeepMind), arXiv:2407.12687**, "the paper."
Tags like A3 / B1 refer to that paper and its build-mapping notes; `[your design]` marks
anything not from the paper.

This branch **replaces the prior TeachTune student** (arXiv:2410.04078) wholesale. Removed:
the four psychological traits, the *Interpret* step, the bounded-knowledge model
(`can_say` / mastery). Replaced with the LearnLM gen-AI role-play (A2): one fixed student
model given a **persona + proficiency level** and a **predefined, fixed per-turn state
sequence** (B1). The injected state — not a knowledge bound — controls how the student
behaves each turn (e.g. "frustration" → shows it is tempted to give up; "off-topic" → drifts
from the lesson). The paper publishes no verbatim prompts and names only one state ("make
mistake", A8); the working set is `[your design]`. The context-independent (CI) student keeps
the full set including the correctness states; the context-dependent (CD) student uses a
separate, reduced set (see §3, §4).

---

## 0. Principles

1. **Identical student for every tutor (B1).** Same student model, persona, proficiency, and
   the same fixed state sequence per scenario. This is the comparability requirement and the
   reason cross-model scores (§8) are meaningful.
2. **State controls behavior, not knowledge (A3/B1).** No `can_say`, no mastery gate. The
   per-turn injected state says *how* the student behaves; it realizes that from persona +
   grounding + its own latent knowledge. Tutor and student may both see the grounding —
   behavior is governed by the state, so shared grounding does not defeat the simulation.
3. **The tutor receives no privileged state info (B1).** The paper hands the learner's hidden
   state to the tutor only to generate training data; doing so at evaluation time would
   trivialize the dimensions that require the tutor to *infer* what the student is doing (e.g.
   spotting confusion or disengagement). The tutor sees only the student's spoken text and
   must infer.
4. **Headline axes = tutor model × language.** The scenario is the fixed-student container (a
   coverage axis). Tutor prompt variant and student persona may vary while getting the design
   right, but are held fixed for the headline runs.
5. **One conversation = one directory**, resume-safe, with explicit repeats.

---

## 1. The experiment — cells, axes, repeats

A **cell** is one fully-specified configuration: one scenario, one tutor model, one language,
one tutor prompt variant, with the student model, persona, and state sequence all fixed.

- **Headline axes:** tutor model × language.
- **Secondary axes** (fixed for the headline comparison, varied only while tuning the design):
  scenario coverage and tutor prompt variant.
- **Repeats.** Because the models are stochastic, each cell is run `repeats` times; each run
  (`r0`, `r1`, …) is an independent draw producing its own transcript. Repeats give a
  distribution per cell instead of a single sample — what the downstream ranking consumes.
  Comparability holds because every repeat of every tutor faces the identical fixed student.

A **run-set** enumerates the cells (and their repeat counts). The CLI expands it, skips cells
already on disk, and runs the rest, so adding a model or language only fills the missing cells.

---

## 2. Components (responsibilities, not code)

- **student** — owns the learner-state set, the per-state strategy text, and assembly of the
  student prompt: a static part (role, persona, proficiency, grounding) plus the dynamic
  injected state for the current turn.
- **tutor** — assembles the tutor prompt: static only, no state injection.
- **catalog / config** — loads the topic catalogs (context-independent and context-dependent),
  regions, languages, and models, and resolves each run-set item into a runnable session.
- **session** — runs one conversation (calling litellm directly) and logs it.
- **run-logger** — JSONL logging of raw API requests/responses plus the transcript (kept from
  the current project).
- **cli** — expands the run-set matrix into cells × repeats and runs them, resume-safe.

The TeachTune *Interpret* module and the knowledge/mastery catalogs are removed. The package
should be renamed since the method is no longer TeachTune.

---

## 3. Scenarios = the existing topic catalogs

Scenarios are the **context-independent (CI)** and **context-dependent (CD)** topics from the
previous version, not new files. This reintroduces **regions** for the CD case.

- **CI topics** — the student is a learner and the tutor teaches the topic. The topic supplies:
  topic name, the tutor's teaching directive / learning goal, and the grounding material (the
  lesson and the elements to teach). The old `knowledge_components` survive only as the tutor's
  "elements to teach"; the **mastery numbers and the `can_say` gate are dropped**. Authored
  per-topic misconceptions, if kept, become optional content for the CI student's
  "misconception" state — which misconception it voices — not a knowledge bound.
- **CD topics** — the student shares knowledge of their own culture/region and the tutor is a
  curious learner. This brings in the **region** (and likely the cultural knowledge pack as the
  student's grounding). Language may default from the region, overridable per run-set item.

> **CD differs from CI — authored separately.** For CD the student is the authority on their
> own lived experience and cannot be "wrong," so CD **drops the correctness/mistake states**
> and gets its own state set (communication behaviors — hesitant, detailed,
> confused-by-the-question, etc.), authored apart from the CI set. CD scoring likewise **drops
> the "identify and address misconceptions" dimension** (§5, §8). CI keeps the full original
> state set and all dimensions.

---

## 4. Learner states and the injection (A3/B1)

The paper's role-play has two layers per role: a **static** prompt fixed for the whole
conversation, and a **dynamic** prompt that changes each turn — the injection.

- **Static (student):** you are a learner, not an assistant; persona and proficiency; the
  grounding material; brief spoken answers; ask questions when confused; respond in the run's
  language. Kept close to the current student prompt to limit drift.
- **Dynamic (student):** the strategy for the current learner state — e.g. for "misconception,"
  voice a specific, plausible misconception confidently without signaling it is wrong; for
  "frustration," show the work is hard and you are tempted to give up.
- **State set (CI):** only "make mistake" is paper-confirmed; the rest is extrapolated and
  `[your design]` — opening, correct answer, partial answer, wrong answer, misconception,
  implicit confusion, explicit confusion, disengagement, frustration, correct-without-
  explanation, off-topic. **CD uses a separate, reduced set authored apart** — no
  correctness/mistake states (see §3).
- **Fixed sequence (B1).** For evaluation the sequence is **predefined per scenario and walked
  in order**, one state injected per student turn — not chosen by the model (the paper uses
  model self-selection only for free-form training data) and not adapted to the tutor.
  Conversation length equals the sequence length. This is what makes every tutor face an
  identical student and keeps per-turn scores comparable for the ranking (B4).
- **Localization (B5):** the strategy strings are translated per language; affect-related
  states (frustration, disengagement) are higher-risk and should be reviewed per language.

> Tradeoff recorded: a fixed sequence means the tutor cannot change the student's trajectory,
> so this design cannot measure whether a tutor "rescues" a struggling student. That is the
> deliberate price of cross-model comparability. A reactive variant is possible later but
> breaks the identical-student basis for ranking.

---

## 5. Tutor prompt

Static only — the tutor never receives the learner state (§0.3). Minimal and **identical
across tutor models** for the headline comparison: role, the topic's teaching directive, the
grounding material, and baseline pedagogy reflecting the paper's five principles and eight
scored dimensions (stay on topic, don't reveal the answer, guide actively, promote engagement,
address mistakes, respond to affect, positive tone, adapt to level), responding in the run's
language. For CD, "address mistakes" does not apply and is dropped `[your design]` (the CD
student is the authority on its own culture), leaving seven. Two more are **weak for CD and
candidates for removal** — "don't reveal the answer" and "adapt to level" both assume a
student attempting answers / having a proficiency level. Dropping them takes CD to five: stay
on topic, guide actively (drawing the knowledge out), promote engagement, respond to affect,
positive tone. They could still apply, though, where the CD student *doesn't* know
certain things — a CD student knows only parts of its own culture and admits the gaps, and
those gaps give the tutor something to adapt to and to guide toward rather than reveal — so
they may be worth keeping for that case. The tutor sees the grounding and the spoken conversation; never the state labels.
Prompt variant is a secondary knob, fixed for the headline runs.

---

## 6. The conversation loop

For each state in the scenario's fixed sequence: the student speaks first, with the current
state injected into its dynamic prompt, and the spoken turn plus its state label are stored;
then the tutor responds, seeing only the spoken text so far (state labels stripped). The
student conditions on the full history including the tutor's turns — it reacts to what the
tutor said, while the injected state pins *how* it reacts. Comparability comes from the fixed
student model + params + state sequence + seed, not from identical wording.

Pick student-first or tutor-first deliberately and keep it fixed across the campaign; the
sequence opening with an "opening" state implies student-first.

---

## 7. Output and transcript

One directory per cell × repeat, resume-safe; a cell whose transcript already exists is
skipped. Each transcript records: scenario id, scenario type (CI/CD) and region, language,
tutor model and prompt variant, student model and params, the seed, and the ordered turns —
each with a turn id, speaker, spoken text, and (on student turns) the stored state label —
plus a creation timestamp. These fields are chosen so the downstream critic and ranking (§8)
can reconstruct any comparison.

> Determinism note: with temperature > 0 the wording varies per run; the seed pins the state
> *trajectory*, not the text. That is why cells carry an explicit repeat index — repeats give
> the distribution the ranking consumes.

---

## 8. Downstream (out of scope here; kept to justify the schema)

Not built in this stage, but the transcript is shaped to feed it: a critic LLM (not one of the
tutors under test) scores each tutor turn on the dimensions separately, never collapsed —
**eight for CI, seven for CD** (CD drops "identify and address misconceptions") `[your design]`; critic-vs-human agreement is validated **per language** before the scores are
trusted; a Bradley-Terry model per dimension ranks many tutors and accepts new ones by
refitting. Surface-overlap metrics (BLEU/ROUGE/BERTScore) are explicitly rejected for tutor
quality.

---

## 9. Build order

1. student — state set, per-state strategy text, static/dynamic prompt assembly; validate the
   scenario's state strings against the known set.
2. tutor — static, minimal, model-identical prompt with no state injection.
3. session — one full conversation; verify the state label is stored but absent from what the
   tutor saw.
4. catalog / cli — load topic catalogs + regions + languages + models, expand the run-set into
   cells × repeats, resume-safe.

Ship a context-independent topic in English with one tutor model first; more models, languages,
and topics are catalog entries.

---

## 10. Open questions

- Drop the two CD-weak dimensions ("don't reveal the answer", "adapt to level")? Doing so
  takes CD from seven dimensions to five — but they could still apply where the CD student has
  gaps in its own cultural knowledge (§5).
- Keep authored misconceptions as CI "misconception"-state content, or let the student
  improvise (§3)?
- Student-first vs. tutor-first turn order (§6).
- Per-language localization of the strategy strings (§4).
- Exact CI working state set beyond the paper-confirmed "make mistake"; CD state set is
  authored separately (§3–§4).

---

## 11. Fidelity / design checklist

- [ ] Student = fixed model + persona/proficiency + per-turn state injection (A3/B1); no
      traits, Interpret, or `can_say`.
- [ ] State sequence fixed per scenario; identical student for every tutor (B1).
- [ ] State injected into the student only; stored, hidden from the tutor (B1).
- [ ] Tutor prompt minimal and identical across tutor models; reflects the five principles /
      eight dimensions (CD scoring drops "address mistakes" → seven).
- [ ] Headline axes = tutor model × language; prompt variant + persona fixed for headline runs.
- [ ] Scenarios are the existing CI/CD topics; region reintroduced for CD.
- [ ] Multi-turn, scenario-guided; student and tutor share grounding (correctness is
      state-controlled).
- [ ] Student model + params + seed fixed and recorded; repeats supported.
- [ ] Transcript carries scenario id/type/region, state, language, model id for downstream
      scoring/ranking; no surface-overlap metrics.
