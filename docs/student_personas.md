# Literature-grounded student persona generator

## Context

The simulated student in [student.py](../src/tutoring_check/simulation/student.py) doesn't read as a real learner. Its three personas (`standard` / `struggling` / `advanced`) are short hand-written bullet blocks that only modulate *how fast the student gets it*; everything else — what the student actually believes, how they talk, how they respond to being taught, when they give up — is a single fixed frame shared by all three. There is no representation of *what the student wrongly thinks*, so "confusion" is performed rather than caused, and the three personas collapse toward the same behavior over a 20-turn session.

The fix is to make the student's **epistemic state** explicit and to derive the prompt from a structured, literature-grounded trait vector instead of one hand-written blob. The prompt is assembled deterministically from that vector plus the topic's documented misconception, so a persona is byte-identical across every tutor model and every repeat, and changing a level means editing one dict.

**Decisions taken:**
- **The study manipulates one factor with four levels, not eight traits.** Traits are the internal vocabulary — the place the literature grounding lives — but a run set names a single `level`. A run set cannot set an individual trait. See [Part 5](#part-5--the-four-student-levels).
- **The persona is rendered deterministically, with no model in the loop.** An earlier version had an LLM compile each persona and a nine-rule validator police the output. That was over-engineered: the trait space *looks* combinatorial but collapses to four bundles, and the `prose` in the registry turned out to be the persona text already. The student prompt is now a pure function of (level, topic, language) — same bytes every time, no API cost, no artifacts to pin. See [Part 3](#part-3--rendering).
- MVP is **one topic**, then extend. Topic = **`tree-mass`** — it is what the active run sets already use, and "a tree's mass comes from the soil" is a textbook *ontologically robust* misconception, which is the sharpest test of the design.
- Misconceptions are **researched by LLM agents with web search**, one time per topic, into a per-topic JSON file, with a **real verification pass** (an independent agent that fetches every cited source, and deletes any entry whose source does not check out).
- **No backward compatibility.** The old personas are deleted outright, not preserved alongside. `student.PERSONALITY` and the `PERSONAS` constants go; run sets are updated to name a level. Transcripts already under `runs/` are historical artifacts of a different stimulus and are not reproducible from the new code — that is accepted. Going forward the git commit is the record of what a run used, and `session.py` logs the assembled prompt into every transcript header.
- **All realism measurement is deferred.** No metrics module, no student-act judge in this work.

---

## Literature grounding

The organizing frame is **Epistemic State Specification** from *Towards Valid Student Simulation with LLMs* ([arXiv:2601.05473](https://arxiv.org/abs/2601.05473)): a simulated learner is only valid to the extent you specify what it can access. Its five levels run E0 (unspecified) → E1 (static bounded knowledge) → E2 (curriculum-indexed) → E3 (**misconception-structured**, explicit error models) → E4 (calibrated on human data). **The current prompt is E1. The whole point of this work is E3.** The paper's three E3+ validation criteria — *fidelity of error*, *epistemic consistency*, *boundary of competence* — become concrete parts of the prompt: the belief and its prediction, the rule for what does and does not shift it, and the explicit list of terms the student cannot use until taught.

The failure modes to design against come from *Simulated Students in Tutoring Dialogues: Substance or Illusion?* ([arXiv:2601.04025](https://arxiv.org/abs/2601.04025), ACL 2026), which had expert teachers interact with simulated students across six realism dimensions (dialogue acts, correctness, error-making, knowledge acquisition, language use, tutors' responses). Prompted LLM students: **over-produce "seek information" acts and correct responses**; write too short or with **formal grammar and punctuation unlike real students**; and — the one that matters most here — show **response patterns that are uniform across students, lacking diversity**.

Everything else grounds an individual trait (full citations in [References](#references)):

| Source | What it grounds |
|---|---|
| Driver & Easley 1978 "alternative conceptions"; Driver et al., *Making Sense of Secondary Science*; AAAS Project 2061 assessment items (misconception distractors with measured prevalence) | The misconception library itself |
| **diSessa** knowledge-in-pieces / p-prims (fragmented, context-cued, labile) vs **Chi** ontological miscategorization (treating force/heat/matter as a possessed substance — empirically **resistant to instruction**) | `misconception_robustness` — how many turns before the student gives up the wrong idea. This is the mechanism the current `struggling` bullet "Don't follow a hint to its conclusion" crudely stands in for |
| **ICAP** (Chi & Wylie 2014): passive → active → constructive → interactive; Chi et al. 1994 self-explanation | `self_explanation_propensity` — bare answer vs. generating reasoning beyond what was given |
| **Aleven & Koedinger**, IJAIED 2016 help-seeking review; Baker gaming-the-system | `help_seeking_style` — avoidant / executive ("just tell me") / instrumental |
| Achievement goal theory (mastery / performance-approach / performance-avoidance); Dweck | `goal_orientation` — performance-avoidance predicts helpless responses and avoidance of any visible risk of failure, i.e. bluffing or going quiet rather than admitting confusion |
| **D'Mello & Graesser** affect dynamics: engaged/flow → confusion at an impasse → frustration if unresolved → boredom | `affect_trajectory` — a state machine with triggers, not a static mood |
| Chi 2001 (tutors produce ~93.5% of words); the realism paper's register finding | `register_and_verbosity` |
| **HACHIMI** ([arXiv:2603.04855](https://arxiv.org/abs/2603.04855)) — personas decomposed into theory-anchored components, each traceable to its literature | The trait registry's shape. Its propose → validate → revise machinery is *not* used: see [Part 3](#part-3--rendering) |

Phase-2 traits, designed for but not built: `transfer_fragility` (diSessa — gains collapse when the framing changes), `self_efficacy` (Bandura), `metacognitive_calibration`, `classroom_norms` / `medium_of_instruction` (translanguaging; ties to the existing `code_mixed` vs `monolingual` modes in [prompts.py](../src/tutoring_check/translations/prompts.py)).

---

## Part 1 — Misconception library (one-time, LLM-researched, verified)

**Deliverable:** `data/misconceptions/tree-mass.json`. Produced by a documented two-stage procedure run inside Claude Code, written up in `docs/misconception_library.md` so it is repeatable per topic. This is authoring, not runtime code — no Python is needed to produce it.

**Stage 1 — Research.** An agent with WebSearch/WebFetch collects documented alternative conceptions for the topic. Source priority: AAAS Project 2061 assessment items (item code + field-tested prevalence), Driver et al., discipline concept inventories, peer-reviewed JRST / IJSE / *Science Education* studies. Textbook blog posts are usable only as a pointer to a primary source.

**Stage 2 — Verify (independent agent, does not see Stage 1's reasoning).** For every entry, fetch every cited URL and confirm it resolves and actually states the misconception. Each source's `verified` flips to `true` only on that basis. An entry with no verified source is deleted, not downgraded — a misconception with a broken citation is indistinguishable from one the model invented. **This is the guard against fabricated citations, the single largest risk in LLM-sourced literature grounding.**

Verification is an authoring step, not a load-time gate. An entry whose source does not check out is deleted before the file is committed, so what is in the file is what was verified and there is nothing left for the loader to check. Reading the file before you run a campaign on it is your judgement, not a flag.

**A topic with no library cannot be run.** There is no fallback persona. That is the E3 commitment made operational: a student whose wrong idea is unspecified is exactly the E1 student this work exists to replace. The practical consequence is that [run_set.json](../data/run_set.json) and [run_set_contrast.json](../data/run_set_contrast.json) stay unrunnable until libraries exist for their topics.

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
      "slides_into": "That it was the water, which turned into wood."
    }
  ]
}
```

| field | who reads it |
|---|---|
| `belief`, `predicts` | rendered into `what_you_believe` verbatim |
| `changes_only_when` | rendered into `how_you_respond_to_teaching` (first two entries only), after the level's own rule. The level says *how much* evidence shifts the student; this says *what counts as evidence for this concept*, which the level cannot know. Anything not on the list is re-explained away rather than accepted, so a separate "resists" list is redundant |
| `slides_into` | **optional.** rendered as the tail of `how_you_respond_to_teaching`: the wrong-idea → *different* wrong-idea → right-idea path, so change isn't monotonic. Free prose, not an id |
| `canonical_explanation`, `answer_giveaway_terms` | the `no_answer_leak` validator |

Every field in the file is read by the renderer or the linter. The citations are not, so they live in a sibling `data/misconceptions/<topic_id>.sources.md` — see [tree-mass.sources.md](../data/misconceptions/tree-mass.sources.md). Prose holds the prevalence figures and the "secondary report, not the originating study" caveats better than a `citation` string did, and the audit trail for the grounding claim survives without a field the loader has to parse.

`answer_giveaway_terms` is a **blocklist, not a description of the topic** — the name matters, because "keywords for this topic" invites someone to fill it with *tree, mass, soil*, which a persona prompt must be free to use. It is only the terms whose presence means the answer has leaked. It cannot be derived from `canonical_explanation`: that sentence also contains *tree* and *mass*, and no extraction rule separates those from *photosynthesis* by frequency or part of speech. Deciding which words constitute the answer is the human judgment this field records.

`changes_only_when` is the field most likely to look droppable and isn't. The trait says *how much* evidence shifts the student; only the library can say *what counts as evidence for this concept*. Write it in the second person — it reaches the student unaltered — and stop it short of the answer, which is what `no_answer_leak` exists to enforce.

`canonical_explanation` and `answer_giveaway_terms` live here rather than in [topics_ci.json](../data/topics_ci.json) so the answer-leak validator has everything it needs in one file, and no catalog every consumer reads has to change.

**One entry per topic is enough.** Every persona for a topic is built on the first entry; `slides_into` is prose rather than an id, so the wrong-idea drift does not require a second entry to exist. Later entries are recorded because the research was done, not because anything selects them.

**Cut from earlier drafts, and why:** `robustness` / `why_robust` / `ontology` (theory in the wrong file — `misconception_robustness` is a trait the level fixes, and the level must win, or `struggling` and `advanced` could not differ on the same topic) · `topic_type` (derivable from which topic catalog the id is in) · `reasoning` (folded into `belief` — a first-person statement carries its own because-clause) · `resists` (the complement of `changes_only_when`) · `prevalence` (never reaches the prompt, and the field most likely to be quietly fabricated) · `reviewed` and the nested `review` object (verification is an authoring step; a bad entry is deleted before commit, so the gate was checking that you had checked) · `sources` (moved to prose beside the data — see above).

---

## Part 2 — Trait registry (internal vocabulary, *not* study variables)

> **Traits are never named in a run set.** They exist so each level has a principled, citable definition, and so the student-facing text is traceable to a citation rather than being an adjective someone liked. The only thing that varies in an experiment is `level`, and each level fixes every trait at once. Adding a trait therefore costs nothing in study design — it costs prompt tokens, and that is the real budget (see Risk 3).

`src/tutoring_check/personas/traits.py` is **one dict**. The key is the trait, the inner key is the value a level can choose, and the string is the text that reaches the student verbatim. Construct definitions and citations are comments, because nothing reads them:

```python
TRAITS: dict[str, dict[str, str]] = {

    # Whether the belief is a context-cued fragment that flips when the question is reframed, or
    # an ontological miscategorisation that survives direct contradiction. Grounded in:
    # diSessa 1993 (p-prims); Chi 2005; Chi, Slotta & de Leeuw 1994.
    "misconception_robustness": {
        # A loosely held intuition, cued by how the question is framed (diSessa).
        "labile": "You hold this loosely. One clear piece of evidence you can picture is enough …",
        # An ontological miscategorisation: corrections get absorbed into the existing category (Chi).
        "robust": "This idea is not something you are willing to drop. Being told the right answer …",
    },
    ...
}
```

Earlier drafts had a `Trait` dataclass carrying `name`, `group`, `definition`, `citation`, `section` and `banned_terms`. Every one of those was dead to code or better expressed elsewhere: `group` duplicated `section`; `name` existed only so the deleted compiler could render a catalog; `definition` and `citation` are documentation, so they are comments now; `banned_terms` is one flat list in `lint.py`, since nothing needed it per-trait; and `section` was a routing indirection that made you read two files to learn what lands in `how_you_talk` — [render.py](../src/tutoring_check/personas/render.py) names the traits directly instead.

The general rule this arrived at: **if code doesn't read it, it's a comment.** A field that only documents is a comment with extra syntax and an extra chance to drift.

### MVP traits (seven)

| key | group | values | citation |
|---|---|---|---|
| `misconception_robustness` | epistemic | `labile` \| `intermediate` \| `robust` | diSessa vs Chi |
| `conceptual_change_rate` | learning_dynamics | `slow` \| `moderate` \| `fast` | ESS "simulating learning" |
| `self_explanation_propensity` | dialogue | `passive` \| `active` \| `constructive` | ICAP, Chi & Wylie 2014 |
| `help_seeking_style` | dialogue | `avoidant` \| `executive` \| `instrumental` | Aleven & Koedinger 2016 |
| `register_and_verbosity` | dialogue | `minimal` \| `terse_colloquial` \| `typical` \| `expansive` (each carries a sentence band + mechanics rules) | Chi 2001; Sinclair & Coulthard 1975; Mehan 1979; Nystrand & Gamoran 1991 |
| `goal_orientation` | affect | `mastery` \| `performance_approach` \| `performance_avoidance` | achievement goal theory; Dweck |
| `affect_trajectory` | affect | `engaged_persistent` \| `confusion_to_frustration` \| `flat_compliant` | D'Mello & Graesser |

Every trait means the same thing on every topic. **Which** wrong idea the student holds is not among them: all four levels held it at `primary`, and both values of the trait rendered the same sentence, so it was a variable with one reachable value. The library's first entry is now used directly, and the sentence that said the belief is held without hedging moved to `render.py` beside `WHO_YOU_ARE`, where the other level-invariant text lives.

If varying the conception ever becomes interesting, it belongs in the run set next to `topic_id`, not in `levels.py` — a level is a claim about the learner; which wrong idea they hold is a claim about the item.

### Student profile — who they are, as distinct from how they learn

Three kinds of input make a persona, and keeping them apart is what keeps the study legible:

| file | supplies | varies with |
|---|---|---|
| `profile.py` + [students.json](../data/students.json) | **who they are** — name, age, grade, languages | `student_id` |
| `misconceptions.py` + the topic library | **what they believe** | `topic_id` |
| `traits.py` + `levels.py` | **how they learn** | `level` — the one manipulated factor |

A profile is a catalog row named by `student_id` in a run set, exactly like a language or a model, and it renders into `who_you_are`:

> You are Wei, 13 years old and in Grade 8 at school in China. You speak Mandarin at home, and English in your science lessons. You are sitting with a teacher who is about to ask you a science question. You are willing to say what you think.

Hold the profile constant while `level` varies and a level comparison isolates the learner; hold `level` constant and vary the profile and you have a separate study, which the same machinery now runs.

**There is no `nationality` field, deliberately.** Where the student is comes from the run set's existing `region_id` — the same fact already reaches the tutor prompt and the transcript header, and a second field beside it would be one place for the two to disagree. `speaks` is free prose rather than a language id because the interesting cases are mixed (*"Tamil at home, and a mix of Tamil and English at school"*), which no id can express; it is also where the deferred `medium_of_instruction` work will land.

`age` does one job beyond `who_you_are`: the register note now says *"the way a real 13-year-old writes it"* instead of hardcoding "middle schooler", so a profile in Year 11 does not contradict its own instructions.

**The frame no longer names the student.** [student.py](../src/tutoring_check/simulation/student.py) used to open `You are {student_name}, a student from {region}…`; that identity is the persona's job, and stating it in both places invites the two to drift. The frame now varies only with topic and language — not with level, not with who the student is — which is a stronger comparability guarantee than it had before.

### The frame states role and constraints, never motivation

This is the rule that makes the levels able to differ at all, and the frame was breaking it in three places. Each of these was a fixed line asserting something a trait is supposed to vary:

| was, in the level-invariant layer | contradicted |
|---|---|
| "Your goal is to learn, not to test the teacher" | `goal_orientation=performance_avoidance` — that level's goal is to not look stupid |
| "respond authentically as a confused but on-task student" | `affect_trajectory=flat_compliant`, and `advanced`, which is not confused |
| "You are willing to say what you think" (in `who_you_are`) | `help_seeking_style=avoidant`, which is built on going quiet |

All three pulled in the same direction — toward the cooperative, eager, quick-to-understand student — which is precisely the E1 default this work exists to replace. `reluctant` took the worst of it: every trait that defines it was being overridden by a sentence no run set could see.

What survived is role (*you are the student, not the teacher*), constraints (*don't fish, don't suggest what to cover next, don't set out to test the teacher*), and a **participation floor phrased as turn-taking rather than willingness** — *"You reply whenever the teacher says something to you."* That guarantees the conversation happens without claiming the student wants it to.

The closing reminder changed job too. It now says to stay in character *including when that makes the lesson go badly*, and not to become easier to teach than the persona describes — which is what a reminder is actually for. Long conversations drift toward cooperation; the old one accelerated that drift instead of resisting it.

**Nothing in the level-invariant layer names a subject.** `who_you_are` said "a science question"; the topic catalog is science today but nothing in the design is, and the subject already arrives through `config.topic` and the library's own vocabulary.

**The student prompt no longer contains the question.** `config.question` is read by [tutor.py](../src/tutoring_check/simulation/tutor.py) only. The tutor opens the conversation by posing it ([session.py](../src/tutoring_check/simulation/session.py)), and across all 45 English transcripts it **paraphrases rather than quotes** — *"Imagine you have two metal balls…"*, never the item text. So including it gave the student a second, differently-worded copy of a question nobody had said out loud yet.

Three reasons that mattered:

1. The persona says the teacher is *about to* ask; a block headed "the question you have been asked" contradicted it.
2. The tutor is instructed to frame the concept in the student's own regional context — a strategy this study measures. A student already holding the plain item text gives that framing less to bite on, attenuating the effect being tested.
3. A rare but real artifact: of six runs where the tutor opened with *"are you ready?"* instead of the question, one student answered anyway. Five behaved correctly, so this was the weakest of the three reasons — but it is the one that shows up in data.

What orients the student instead is the frame's `The topic is:` line plus the library's `predicts`, which is written around the same scenario in the student's own voice and is a better anchor than the question because it is a belief rather than a prompt. If a tutor fails to pose a real question, the student now has nothing to be wrong about — which is a tutor failure worth seeing in the transcript rather than one the student prompt silently covers for.

### The opening turn is a greeting, not the question

[session.py](../src/tutoring_check/simulation/session.py)'s kickoff message now asks the tutor to greet the student, say who they are, and ask one settling-in question — explicitly *not* the learning question, which comes from the next turn. Opening cold on an assessment item gave every transcript the same abrupt shape and is not how a session starts.

It also earns its cost: the student's reply to *"how's the weather?"* is the cleanest read on their register you get, because no subject matter is in play yet. Arun answers *"It's pretty hot today."* — four words, flat, no question back.

The instruction is scoped to the first message on purpose. That message stays in the tutor's context for the whole conversation, so an unscoped "don't ask the question" would keep suppressing it.

**It costs one of the ten exchanges.** `TURNS_PER_SPEAKER` is unchanged, so a run now has nine teaching turns rather than ten. Raise it to 11 if you want the old amount of teaching.

### Two findings from the pilot runs

**`minimal` exists because "passive" was not producing minimal answers.** With `terse_colloquial`, reluctant-Arun averaged ~9 words per turn in well-formed clauses — *"It gets big by pulling stuff up out of the dirt"*. Real students in teacher-led talk answer in fragments, and the classroom-discourse literature on the triadic sequence (Sinclair & Coulthard's IRF, Mehan's IRE, Nystrand & Gamoran on the rarity of extended student turns) says the student slot is characteristically elliptical. A model will not do this unprompted: left alone it writes complete sentences, which is the most visible tell that it is not a student. With `minimal`, the same cell averages **3.9 words**.

**`avoidant` was written as a silence the student cannot perform.** It said *"you go quiet"*, but `student.py`'s ground rules require a reply every turn. Given that conflict the model took the cheapest exit and simply said it was lost — the one thing the trait forbids — in both pilot runs (*"I don't know which one"*, *"I don't remember the name"*). The rule now names verbal moves instead: put down a guess you don't believe, or hand back part of what the teacher just said. Both appeared in the next run, and the admissions disappeared.

The general lesson is worth keeping: **a trait that describes not-acting will be resolved by the model however it likes.** Prose has to name what the student *does*.

### Writing mechanics: one rule for every language

Even at 3.9 words a turn the student typed *"It's pretty hot today."* — capital, apostrophe, full stop. No 14-year-old messages like that.

The first fix was a per-language override with English orthography spelled out. It worked (0/10 capitalised, 0/10 full stops, 0/10 apostrophes) but it does not generalise, and it created a confound: English personas would have read as more authentically teenaged than Tamil ones for reasons unrelated to the tutor, which would have quietly contaminated every cross-language comparison.

`render.STUDENT_REGISTER` is now one note for all languages, stated as a rule about **typing behaviour** rather than a list of marks:

> Type this the way a 14-year-old in India types to a friend on their phone. You are going fast and you do not go back over it, so whatever careful writing in English (US) would tidy up — the capital at the start if the script has capitals, the apostrophe inside a word, the stop at the end — you leave out.

Same result on the mechanics, no per-language table. Two constraints shaped it:

**It may only name marks a script either has or lacks entirely.** A capital, an apostrophe, a terminal stop: a script without them simply has nothing to skip. It must never name a mark that lives *inside* a word in an abugida — dropping the vowel signs in Tamil or Devanagari does not read as casual, it reads as broken.

**Fillers and slang key off the profile, not the language.** What a 14-year-old in India types is a fact about the student, not about English. No example tokens, ever: naming one gets it echoed every turn.

### A rate is not an instruction a stateless prompt can follow

The filler rule first read *"about one reply in three carries a filler."* The pilot came back with a filler in **10 of 10 turns, seven of them opening on the same word.**

The student prompt is rebuilt from scratch every turn, so there is no running tally for "one in three" to refer to — the model applies the rule to each turn in isolation, where the only way to satisfy "sometimes" is to do it. Rephrased as a **condition** plus a rule checkable against visible history — *belongs only where you are genuinely hesitating, never at the front of a reply you are sure of, and you never open two replies with the same word* — filler openings dropped to **2 of 10**.

Generalise it: **a trait stated as a frequency across turns will not be honoured.** State the condition under which the behaviour occurs, or state something the model can check against the conversation it can see.

Typos follow the same shape — named as a failure to *correct* rather than a rate of *making*, and scoped to the whole conversation the student can see rather than a per-turn chance it cannot count. The mechanism is spelled out (a letter doubled, two swapped, one dropped) because a model asked simply to "make a typo" produces a plausible wrong word, which reads as a vocabulary problem rather than a fast thumb. Output: *"from the dirt nd water"*, *"maybe from the sunlght"*, *"probly the water"*, *"frm air but still some dirt"*.

### `avoidant` was over-strict, and the construct says so

It had been sharpened to *"you never say you are lost"* after the model kept resolving an impossible instruction that way. That overshot. **Aleven's help avoidance is about not *requesting* help** — saying "no idea" and stopping there is not a request, it is a refusal to make one, which is the behaviour itself. Banning it also removed the most natural thing a stuck 14-year-old says. What stays banned is asking: for the answer, for a repeat, for anything. *"dont know the name"* is now in-character, and reads it.

### Keep `slides_into`

It is the field most obviously droppable and the one doing the most visible work. In the latest run:

> **A (15):** frm air but still some dirt
> **T (16):** …the soil does give the tree some tiny minerals, kind of like how we need a pinch of salt… if we dried a tree completely out, about 95% of its weight would be from the carbon it took from the air.

Turn 16 — the tutor's most substantive correction in the conversation — exists **only** because of turn 15. Without the relapse the student answers "from the air" at turn 15 and the lesson is over four turns early. That is the whole failure mode this design targets: a simulated student who converges cleanly makes every tutor look good.

Honest caveat: this is correlational. `misconception_robustness=intermediate` is also resisting change, and these runs cannot separate the two contributions. The repeats harness would.

### The opening turn takes no name and invents nothing

The tutor introduced itself as *"I'm Amit"* and improvised a monsoon question. Both vary run to run, neither is under study, and they were the first thing every student ever saw — unmeasured variance in the opening stimulus. It now introduces itself as the student's AI tutor with no name, states the topic, and asks whether they are ready:

> **T:** Hello! I'm your AI tutor, and today we're going to explore a really cool puzzle: where a giant tree actually gets all of its weight and mass from as it grows from a tiny seed. Are you ready to get started?
> **A:** yeah im ready

Same social opening, nothing improvised in it.

`misconception_robustness` and `conceptual_change_rate` are deliberately separate. Robustness is how hard *this student* finds *this one belief* to give up; change rate is how quickly they take on a new idea in general. Keeping them apart is what lets a fast learner still cling to a single belief long after they have absorbed everything else — the behavior no current persona can produce. Both are fixed by the level, not the topic: if the library pinned robustness per misconception, `struggling` and `advanced` could not differ on the same topic, which would defeat the level design.

`goal_orientation` earns its place because `performance_avoidance` is the only construct that produces bluffing and going quiet *instead of* admitting confusion. It is what defines the fourth level; without it that level is just "struggling with extra steps".

**Consequence text is the tuning surface.** It must be quantified and non-optional. Illustrative, for `misconception_robustness = robust`:

> The wrong idea is not a guess you are willing to drop. Being told the right answer, or being shown one example that contradicts it, does not change it — you re-explain that example in terms of the idea you already hold. You shift only after being walked through at least four separate turns of evidence you could picture yourself, and even then you first move to a different wrong idea rather than to the right one.

Note the contrast with the current prompt's `Sometimes misunderstand or partially understand concepts` — an opt-out modal that models simply ignore.

---

## Part 3 — Rendering

### No model in the loop

An earlier version of this design had an LLM compile each persona from a brief, with a nine-rule validator policing the output, a `spec_hash` cache and pinned artifacts on disk. All of that is gone. The reasoning that killed it:

- The trait space **looks** combinatorial (8 traits × 3 values) but a run set only ever names one of **four levels**. You never need to write for arbitrary combinations.
- Sections depend on *different* axes — `what_you_believe` on the topic alone, `how_you_feel_as_it_goes` on the level alone, only `how_you_respond_to_teaching` on both — so the authoring burden is roughly **17 blocks with slots**, not 160 personas.
- The registry's `prose` fields *were already the persona text*. The compiler was largely paraphrasing them back.

What that bought: six of the nine validators became **guarantees by construction** (a template cannot use jargon you did not write, drop the number sitting in its own prose, slip into third person, or leave a section empty), and the whole compile step — API cost, cache invalidation, `--force`, artifacts — disappeared. For a thesis, *"student prompts are deterministic templates over a literature-grounded trait registry"* is also a stronger methods claim than *"an LLM wrote them and a validator checked them."*

What it cost: the everyday-vocabulary half of the boundary section is now a hand-authored library field (`everyday_terms`) rather than invented at compile time, and prose no longer gets topic-specific flavour like "it still fits *the dirt*".

### How a persona is assembled

`personas/render.py`, a pure function of `(level, topic_id, language_id)`:

`render.py` names each trait explicitly, in the order it should read:

| section | source |
|---|---|
| `who_you_are` | the student profile — name, age, grade, where they are at school, which languages — then one fixed line about the situation |
| `what_you_believe` | library `belief` + `predicts`, then a fixed line saying it is held without hedging |
| `what_you_can_and_cannot_use` | library `everyday_terms` (in reach) and `answer_giveaway_terms` (held back) |
| `how_you_talk` | traits `register_and_verbosity` + `self_explanation_propensity`, plus a per-language register note |
| `how_you_respond_to_teaching` | traits `misconception_robustness` + `conceptual_change_rate`, then library `changes_only_when` (first two only) and `slides_into` |
| `how_you_feel_as_it_goes` | trait `affect_trajectory` |
| `when_you_are_stuck` | traits `help_seeking_style` + `goal_orientation` |

Adding a trait means adding one name to one section in `render.py` — which is easier to read than a routing field on the trait. Section headings are fixed in code, so every level has identical structure and only content differs.

`student.py` then wraps this in the hand-written frame — identity line, language directive, ground rules, the question, the reminder — which is **byte-identical across all four levels**. That is the comparability guarantee.

### What the lint still checks

Six checks became unnecessary. Three did not, and they are pointed at what is still not hand-authored:

- **The misconception library is LLM-drafted** (Stage 1 of the authoring procedure) and its `belief`, `predicts`, `changes_only_when` and `slides_into` render verbatim into every persona for that topic. `lint.check_library` runs `no_answer_leak` and `no_example_utterances` over exactly those fields. This is the one that earns its keep: a single careless clause in `changes_only_when` leaks the answer into every conversation.
- **The registry is hand-written**, so `lint.check_registry` catches a careless edit — jargon, a quoted line, third person.
- **`lint.check_rendered`** is belt and braces on the assembled result: budget, plus an answer-leak sweep. `what_you_can_and_cannot_use` is exempt from the leak rule, and must be: its entire job is to name the answer's terms as out of reach, which is the opposite of leaking them.

```bash
PYTHONPATH=src python -m tutoring_check.personas.cli lint --topic tree-mass
```

---

## Part 4 — Wiring

There are **no artifacts and no cache.** A persona is recomputed from code and data on every load, which is free and deterministic, so there is nothing to pin or invalidate.

- [config.py](../src/tutoring_check/simulation/config.py) — `PERSONAS` constants deleted. `SessionConfig` carries `level`, `persona_sections`, `traits` and `misconception_id`.
- [student.py](../src/tutoring_check/simulation/student.py) — `PERSONALITY` deleted. `build_student_system_prompt` is the fixed frame plus `render(config.persona_sections)`.
- [catalog.py](../src/tutoring_check/simulation/catalog.py) — `build_session_config` resolves the level, loads the topic library, and renders the sections. A bad level or a missing library fails when the run set loads, not partway into a campaign. Context-dependent topics raise explicitly.
- [session.py](../src/tutoring_check/simulation/session.py) — the `session_start` header carries `level`, `persona_registry_version`, `persona_traits` and `misconception_id`. It already logged `student_static_prompt`, which is the complete record of the stimulus.
- [run_set_dialogic.json](../data/run_set_dialogic.json), [run_set_probe.json](../data/run_set_probe.json) — each item names a `level`.

---

## Part 5 — The four student levels

**`level` is the study's only manipulated student factor.** Each level is a fixed, named bundle of all seven traits, defined once in `personas/levels.py` and versioned with the registry. A run-set item names a level; it cannot set a trait. That keeps the design at four cells per topic and keeps every comparison legible.

| level | robustness | change rate | self-explanation | help-seeking | goal orientation | register | affect |
|---|---|---|---|---|---|---|---|
| `struggling` | robust | slow | passive | instrumental | mastery | terse_colloquial | confusion_to_frustration |
| `developing` | intermediate | moderate | active | instrumental | mastery | typical | engaged_persistent |
| `advanced` | labile | fast | constructive | instrumental | mastery | typical | engaged_persistent |
| `reluctant` | intermediate | **moderate** | passive | **avoidant** | **performance_avoidance** | **minimal** | flat_compliant |

### Why four, and why this fourth one

`struggling` → `developing` → `advanced` is an ordered ability spine. On its own it is a better-specified version of what already exists, and three ordered levels would have been a rename rather than a contribution.

**`reluctant` is the level that earns the redesign.** It is *cognitively capable* — moderate conceptual-change rate, the same as `developing` — but withholds: avoidant help-seeking (Aleven & Koedinger's help avoidance), performance-avoidance goals (which predict helpless responses and avoiding any risk of visible failure), passive engagement (ICAP), and a flat affect trajectory rather than productive confusion. It dissociates **ability from responsiveness**, which are perfectly confounded in the current three personas and are exactly what makes the present simulation feel like one student with a difficulty dial.

It is also the pedagogically interesting cell: a tutor that succeeds with `struggling` by patient re-explanation will *fail* with `reluctant`, because the bottleneck is not comprehension. That is a real, measurable tutor difference the current design cannot surface.

### Adjusting the count

The level table is one dict in `personas/levels.py` — changing the count is a small, local edit, not a redesign:
- **Drop to three** by removing `developing` (keeping the two ability extremes plus `reluctant`) if four cells × topics × tutor models is too many runs. Do not drop `reluctant`.
- **Extend to five** with `overconfident` — fast change rate, `performance_approach`, expansive register, `intermediate` robustness — a student who claims understanding early and moves on with the wrong idea intact. This is the direct counterpart to the documented LLM-student failure of over-producing correct responses, and it is the natural next addition if four separates cleanly.

---

## File layout and CLI

```
personas/
  traits.py          TRAITS: {trait: {value: prose}}. Definitions and citations are comments
  levels.py          LEVELS: the four named trait bundles + resolve(level)
  misconceptions.py  loader + schema for data/misconceptions/*.json
  profile.py         StudentProfile - name, age, grade, languages, from data/students.json
  render.py          build_sections() and render() - the whole assembly, no model call
  lint.py            BANNED_TERMS + checks on the library, the registry, and the rendered result
  cli.py             show / lint
```

861 lines total, of which `traits.py` is mostly prose strings.

`levels.py` is the file you edit to change the study design. `traits.py` is the file you edit to change how a level behaves — its `prose` fields are the student-facing text, so editing one changes the stimulus directly.

```bash
# what a run will actually send, for one level or all four
PYTHONPATH=src python -m tutoring_check.personas.cli show --topic tree-mass --level struggling
PYTHONPATH=src python -m tutoring_check.personas.cli show --topic tree-mass --sections-only

# check the library, the registry, and every rendered level
PYTHONPATH=src python -m tutoring_check.personas.cli lint --topic tree-mass
```

Neither command writes anything or calls a model.

---

## Verification

1. `lint --topic tree-mass` reports zero violations across the registry, the library, and all four rendered levels.
2. `show --topic tree-mass` renders all four. The fixed frame must be identical across them; only the sections differ.
3. Render the same cell repeatedly and hash it — identical every time. This is the property that replaced the artifact cache, so it is the one worth asserting.
4. Check `developing` and `reluctant` differ in *withholding*, not *ability*: they share a `conceptual_change_rate`, so any wording that makes `reluctant` read as slower is a level-definition bug.
5. Plant an answer term in a library `changes_only_when` entry and confirm `lint` catches it, naming the field. Then confirm the same term in `what_you_can_and_cannot_use` does **not** fire, or the exemption is wired the wrong way round.
6. Run the probe set end to end — `PYTHONPATH=src python -m tutoring_check.cli --run-set data/run_set_probe.json --out runs/persona_mvp` — and confirm `session_start` carries `level`, `persona_traits` and `misconception_id`.
7. Read the transcripts, one per level. Does `struggling` hold the soil belief for most of the conversation and re-explain the tutor's counterexample in its own terms; does `advanced` drop it after one good explanation; does `reluctant` stay short and agreeable without committing to anything it could be wrong about; do any turns open with the same two words; does any student turn use a term from its own "cannot use" list before the tutor introduced it?
8. **The design's own success criterion:** a reader shown four unlabelled transcripts should be able to sort them by level. If `developing` and `reluctant` are indistinguishable, the trait `prose` is too weak — that is not a reason to change the level table.

---

## Deferred / out of scope

- **All realism measurement** — no metrics module, no student dialogue-act judge, no cross-level separation statistics. This is the main open question: the rendered prompt is ~900-960 tokens against roughly 640 for the prompt it replaced, and whether that extra specificity helps or dilutes is answerable only by reading transcripts. When you do want it, the six realism dimensions from arXiv:2601.04025 are the taxonomy, and the cheap deterministic half (boundary leakage, utterance-length variance, opening n-gram concentration, misconception persistence) is computable from `transcript.jsonl` with no API cost.
- Remaining traits (`transfer_fragility`, `self_efficacy`, `metacognitive_calibration`, sociocultural traits) — the registry is designed to hold them, and adding one costs prompt tokens rather than study cells.
- A fifth `overconfident` level, and any per-trait manipulation in run sets. If a later study needs to vary one trait while holding the rest fixed, that is a deliberate extension of `levels.py`, not something a run set should be able to do ad hoc.
- Topics beyond `tree-mass`; the research procedure in `docs/misconception_library.md` is written to be re-run per topic.
- Context-dependent topics — in [topics_cd.json](../data/topics_cd.json) the student is the *expert* on their own culture, so E3 misconception structure does not apply. `build_session_config` should raise a clear error rather than degrade silently.
- The per-turn anti-drift nudge. Worth an explicit A/B later: the drift literature says scripted per-turn conditioning eliminates regression to baseline assistant behavior, but it also changes what the student sees each turn and so threatens comparability.

## Risks

1. **Reasoning models see through the persona.** Every current run set uses `student_reasoning: "high"`. A reasoning model told to hold a false belief frequently reasons its way to the true answer in the trace and then leaks it. Test `low` / `none` early — I'd expect this to matter more than any prompt wording, and it is a one-line experiment.
2. **The copying failure could recur.** No quoted examples reach the student, and the prose is hand-written, so the old "every turn starts with Wait" failure is structurally prevented. What is not prevented is the student latching onto a distinctive phrase from the prose itself and turning it into a formula. Measurement is deferred, so this needs eyes on the transcripts at verification step 7.
3. **Prompt length — the real budget.** Levels cap the *study* at four cells but not the *prompt*: every trait added to the registry lands in all four. The rendered persona runs 710-790 tokens and the whole prompt 890-970, against roughly 640 for the prompt this replaced. The ~800 figure I have been treating as the point where instruction-following degrades is a rule of thumb, not a measured threshold — treat it as a tripwire against unbounded growth, and settle it by reading transcripts. Eight traits is near the useful limit; adding a ninth should mean cutting something.
4. **Level collapse.** Four bundles that differ on paper can still produce four similar transcripts, because the traits are not independent in the model's head — "avoidant + passive + terse" may just read as "struggling". Verification step 8 is the check; if it fails, the fix is sharper quantified `prose` (turn counts, sentence bands), not more traits.

   Deterministic rendering makes a related problem *visible* that the compiler used to hide: concatenating `help_seeking_style=avoidant` and `goal_orientation=performance_avoidance` produced two sentences saying the same thing, because the constructs genuinely overlap. The LLM had been silently fusing them. Overlap now shows up as bloat in the rendered output, which is the right place to notice and fix it — at the source, in `traits.py`.
5. **Fabricated citations** in the misconception library. Stage 2's independent fetch-and-check pass is the mitigation; do not skip it, and do not let the researching agent verify its own sources.
6. **[docs/simulation.md](simulation.md) §0.1 makes "identical student for every tutor" the design's foundation.** Varying the student is a deliberate reversal of the checked-in spec; comparability is preserved by deterministic rendering and a byte-identical frame, but §0, §4 and the §8 checklist need rewriting as part of this work rather than being left stale.
7. **[data/run_set.json](../data/run_set.json) is currently unloadable** — it declares `topics` + `pedagogy_sweep`, but `load_run_set` reads only `run_set["items"]`. Build only on the `items` path; a persona sweep expander written now would collide with whatever eventually restores the pedagogy sweep.
8. There is **no test suite** (no `tests/`, no pytest dep). `render.build_sections` is now a pure function of three arguments and `lint` is pure functions over strings — between them the natural place to introduce `pytest` under a `dev` extra. The determinism property in verification step 3 is one assert.

---

## References

Author lists and titles for the three 2026 preprints were checked against their arXiv abstract pages. Page numbers for the two ACL 2026 papers should be filled in once the proceedings are final.

### Architecture — the two papers the design is built on

**Yuan, Z., Xiao, Y., Li, M., Xuan, W., Tong, R., Diab, M., & Mitchell, T. (2026). Towards Valid Student Simulation with Large Language Models.** arXiv:2601.05473 [cs.CL].
*Used in:* the whole design's spine. Its **Epistemic State Specification** (E0–E4) is the frame for [Literature grounding](#literature-grounding) and the reason the work exists — the current prompt is E1, the target is E3. Its three E3+ criteria become concrete artifacts: *boundary of competence* → the `what_you_can_and_cannot_use` section, built from the library's two term lists; *fidelity of error* → the belief and its prediction rendered verbatim; *epistemic consistency* → the rule in `how_you_respond_to_teaching` for what does and does not shift the student. Its "simulating learning" facet grounds the `conceptual_change_rate` trait. Its **competence paradox** — broadly capable models struggle to emulate partially knowledgeable learners — is the mechanism behind Risk 1.

**Scarlatos, A., Lee, J., Woodhead, S., & Lan, A. (2026). Simulated Students in Tutoring Dialogues: Substance or Illusion?** *Proceedings of ACL 2026* (64th Annual Meeting of the Association for Computational Linguistics). arXiv:2601.04025.
*Used in:* the failure catalogue. Its six realism dimensions (dialogue acts, correctness, error-making, knowledge acquisition, language use, tutors' responses) are the deferred measurement taxonomy in [Deferred / out of scope](#deferred--out-of-scope). Three findings drive live design decisions: *response patterns uniform across students* → the entire level design and Risk 4 (level collapse); *formal grammar and punctuation unlike real students* → `register_and_verbosity`; *over-production of seek-information acts and correct responses* → the `overconfident` fifth level sketched in Part 5.

### Misconception theory — Part 1, the library

**Driver, R., & Easley, J. (1978). Pupils and paradigms: A review of literature related to concept development in adolescent science students.** *Studies in Science Education*, 5(1), 61–84.
*Used in:* the term "alternative conceptions" and the premise that learners hold coherent non-scientific frameworks rather than simply lacking facts — why the library's `belief` field is written as a first-person position, not a deficit.

**Driver, R., Squires, A., Rushworth, P., & Wood-Robinson, V. (1994). *Making Sense of Secondary Science: Research into Children's Ideas*.** London: Routledge.
*Used in:* Stage 1 source priority. The reference work for what middle-school students actually believe about each topic, including the tree-mass and conservation-of-mass cases.

**AAAS Project 2061 Science Assessment.** American Association for the Advancement of Science; item bank now hosted by BSCS at https://assess.bscs.org/science/ (the original `assessment.aaas.org` is offline as of 2026-07-28, and the host serves a broken TLS chain — see [misconception_library.md](misconception_library.md) for retrieval mechanics).
*Used in:* Stage 1 source priority, and the highest-value source type because its distractors are field-tested misconceptions with measured selection rates — the only source in the set that supplies prevalence rather than existence. For `tree-mass`, item ME109003 puts 72% of 2,961 US grade 6–8 students on an answer that keeps soil as a food source for plants.

**diSessa, A. A. (1993). Toward an epistemology of physics.** *Cognition and Instruction*, 10(2–3), 105–225.
*Used in:* the `labile` value of `misconception_robustness`. Knowledge-in-pieces / p-prims — fragmented, context-cued intuitions that flip when the question is reframed. Also grounds the deferred `transfer_fragility` trait.

**Chi, M. T. H. (2005). Commonsense conceptions of emergent processes: Why some misconceptions are robust.** *Journal of the Learning Sciences*, 14(2), 161–199.
**Chi, M. T. H., Slotta, J. D., & de Leeuw, N. (1994). From things to processes: A theory of conceptual change for learning science concepts.** *Learning and Instruction*, 4(1), 27–43.
*Used in:* the `robust` value of `misconception_robustness`, and the reason it is the design's key behavioral knob. Ontological miscategorization — filing a process under *substance* — predicts resistance to instruction, which is what the `robust` consequence text operationalizes as "you re-explain the counterexample in terms of the idea you already hold". For tree-mass specifically: matter miscategorized as necessarily solid, so a gas cannot be what a tree is made of.

**Hestenes, D., Wells, M., & Swackhamer, G. (1992). Force Concept Inventory.** *The Physics Teacher*, 30(3), 141–158.
*Used in:* Stage 1 source priority as the model for what a concept inventory supplies. Directly relevant when the library extends to the `gravity` topic.

### Trait grounding — Part 2

**Chi, M. T. H., & Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes.** *Educational Psychologist*, 49(4), 219–243.
*Used in:* `self_explanation_propensity`. The passive / active / constructive ordering, and the prediction that each mode outlearns the one below it.

**Chi, M. T. H., de Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding.** *Cognitive Science*, 18(3), 439–477.
*Used in:* `self_explanation_propensity`, specifically the finding of large individual differences in *spontaneous* self-explanation — which is what makes it a trait rather than a constant.

**Chi, M. T. H., Siler, S. A., Jeong, H., Yamauchi, T., & Hausmann, R. G. (2001). Learning from human tutoring.** *Cognitive Science*, 25(4), 471–533.
*Used in:* `register_and_verbosity`. The observation that tutors produce the overwhelming majority of words in real tutoring dialogue is why the default student is terse and why `expansive` is the marked case.

**Aleven, V., Roll, I., McLaren, B. M., & Koedinger, K. R. (2016). Help helps, but only so much: Research on help seeking with intelligent tutoring systems.** *International Journal of Artificial Intelligence in Education*, 26(1), 205–223.
**Aleven, V., McLaren, B., Roll, I., & Koedinger, K. (2006). Toward meta-cognitive tutoring: A model of help seeking with a Cognitive Tutor.** *IJAIED*, 16(2), 101–128.
*Used in:* `help_seeking_style`. The adaptive/maladaptive taxonomy supplies all three values — `instrumental` (appropriate), `executive` ("just tell me the answer"), `avoidant` (help avoidance). `avoidant` is a defining trait of the `reluctant` level.

**Baker, R. S., Corbett, A. T., Koedinger, K. R., & Wagner, A. Z. (2004). Off-task behavior in the Cognitive Tutor classroom: When students "game the system".** *Proceedings of CHI 2004*, 383–390.
*Used in:* `help_seeking_style`, as the boundary case beyond `executive`. Gaming is *not* a value in the MVP set — a 20-turn dialogue has no system to exploit — but it is why the trait is framed as a strategy rather than a quantity.

**D'Mello, S., & Graesser, A. (2012). Dynamics of affective states during complex learning.** *Learning and Instruction*, 22(2), 145–157.
*Used in:* `affect_trajectory`. The engagement → confusion → frustration → boredom transition model is why the trait is written as a state machine with turn-count triggers rather than a static mood, and it supplies the `confusion_to_frustration` value directly.

**Elliot, A. J., & McGregor, H. A. (2001). A 2×2 achievement goal framework.** *Journal of Personality and Social Psychology*, 80(3), 501–519.
**Dweck, C. S. (1986). Motivational processes affecting learning.** *American Psychologist*, 41(10), 1040–1048.
*Used in:* `goal_orientation`. Supplies `mastery` / `performance_approach` / `performance_avoidance`. The avoidance finding — helpless responses, avoiding tasks that risk visible failure — is the entire basis of the `reluctant` level, and the only construct in the set that produces silence or bluffing *instead of* an admission of confusion.

### Method precedent — Part 3

**Jiang, Y., Tan, F., Yin, X., Leng, J., & Zhou, A. (2026). HACHIMI: Scalable and Controllable Student Persona Generation via Orchestrated Agents.** *Proceedings of ACL 2026*. arXiv:2603.04855.
*Used in:* the trait registry's shape — a persona decomposed into theory-anchored components, each traceable to its literature. Its **propose → validate → revise** machinery is deliberately not used: that pattern earns its keep when generating a million personas with stratified sampling, and this design has four fixed cells, where hand-authored templates are both cheaper and reproducible. Its caution that synthetic personas are not a substitute for real-student evidence is why realism measurement is deferred rather than dropped.

### Consulted, not load-bearing

**Macina, J., Daheim, N., Chowdhury, S. P., Sinha, T., Kapur, M., Gurevych, I., & Sachan, M. (2023). MathDial: A dialogue tutoring dataset with rich pedagogical properties grounded in math reasoning problems.** *Findings of EMNLP 2023*. arXiv:2305.14536.
*Precedent for* grounding each dialogue in a specific incorrect student solution rather than generic confusion. Not cited in the design because its student conditioning is thinner than what ESS requires.

**LLM-Based Educational Simulation: Evaluating Temporal Student Persona Stability Across ADHD Profiles.** arXiv:2605.06307. *(author list not verified)*
*Used in:* the deferred per-turn anti-drift nudge. Its finding that scripted per-turn task prompts eliminate within-conversation persona drift is the argument for that item; its threat to comparability is the argument against making it a default.

**Bandura, A. (1997). *Self-Efficacy: The Exercise of Control*.** New York: W. H. Freeman.
*Reserved for* the deferred `self_efficacy` trait.

**García, O., & Wei, L. (2014). *Translanguaging: Language, Bilingualism and Education*.** Basingstoke: Palgrave Macmillan.
*Reserved for* the deferred `medium_of_instruction` / `classroom_norms` traits, which would connect to the existing `code_mixed` vs `monolingual` modes in the translations pipeline.
