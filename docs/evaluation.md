# Tutor/Student Conversation Evaluation 

This is a specification for the evaluation pipeline of tutor/student conversation. 


## Inputs and Outputs

The evaluator consumes the simulator's output. It does not re-run a conversation. For each conversation, it reads `transcript.jsonl`, which has data on the `scenario-id`, `scenario-type` (CI or CD), `region`, and `language`. 
Only the tutor turns (utterances) are scored (`speaker == tutor`). Student turns with dynamic state labels are read for context but are not scored.

The output is wrtten in the same simulation directory, alongside `transcript.jsonl`. The evaluation is resume-safe, where if `evaluation_transcript.jsonl` already exists, the evaluation is skipped. 
Additionally, there will be `evaluation_requests` and `evaulation_responses`, the raw API calls for audit, exactly like the simulator logs.


## Schema

Here is the schema for `evaluation_transcript.jsonl`
```
# header
{ "timestamp": ...,
  "scenario_id": ..., 
  "scenario_type": "CI|CD",
  "region": ...,
  "language": ...,
  "critic_model": ...,
  "critic_params": { "seed": ..., "temperature": ... },
  "tutor_model": ...,            # copied from the transcript
  "transcript_path": ... }

# per tutor turn
{ "timestamp": ..., 
  "turn_id": <int>,
  "dimensions": {
     "<dimension_name>": { "verdict": "yes|no|na", 
                           "location": "<verbatim quote>",      # exact substring of the tutor turn
                           "rationale": ... 
                         }, 
     ...
  } }
```


## Dimensions

Here are framework dimensions for mTeach, an evaluation framework. 
mTeach has 3 categories of dimensions (instructional ability, informational quality, and langauge quality). The dimensions are below in detail:

Instructional Ability (from LearnLM):
1. Manage Cognitive Load (Explains the underlying concepts or skills in a clear way that is easy for the student to understand.)
2. Encourage Active Learning (Keeps the student actively participating (for example, through questions  or practice problems that the student has to answer). Guides student to an answer with appropriate steps.)
3. Deepen Metacognition (Provides clear feedback identifying any mistakes made by the student.  Provides clear feedback pointing out “successes” by the student (for example, on the student’s skills, problem-solving, work, knowledge, etc.)) 
4. Motivate and Stimulate Curiosity (Inspires and stimulates the interest or curiosity of the student. Monitors the student’s motivational state and adjusts responses accordingly.) Delivers feedback (whether positive or negative) in an encouraging way.
5. Adapt to Learners’ Goals and needs (Identifies the student’s goal or prior knowledge).


Informational Quality (adapted from Wang and Strong's dimensions):

1. Intrinsic DQ (Believability, Objectivity, Accuracy, Reputation)
2. Contextual DQ (Value-added, Relevancy, Timelessness, Completeness, Appropriate amount of data)
3. Representational DQ (Interpretability, Ease of understanding, Consistency, Conciseness)


Language Quality:

1. Fluency (pace, filler words)
2. Grammaticality
3. Naturalness
4. Vocabulary (the proficiency-level framework is TBD)

Each dimension is a bundle of sub-aspects (listed above in parentheses). The rollup rule is conjunctive: the verdict is `yes` only if every sub-aspect holds, and `no` if any one fails.


## The critic

Each utterance (tutor message) is evaluated on mTeach through another model as a critic. The critic is a single fixed model used across all conditions, so that a model or language difference is never confounded. It must differ from both the tutor model under test and the student model, to avoid self-serving bias. Its model id and params (seed, temperature) are recorded in the evaluation header for reproducibility.

The critic sees the full transcript and scores it turn-by-turn. For each tutor turn, it receives the whole conversation with that target turn marked, and returns a verdict per dimension for the marked turn only.

The critic reads the transcript in its original language because a translation step would introduce its own errors and confound the language comparison. Regardless of the transcript's language, the critic's `rationale` fields are written in English, so an analyst can review uniformly.


## Verdicts: yes / no / na

Each dimension is scored `yes`/`no`/`na` per turn. Every dimension is worded so that `yes` is the desirable outcome. The yes-rate is directly a quality signal.

If the occasion for a behavior is present, the critic must commit to yes or no. The occasion is absent and the verdict is `na` only under three occasions:

- **The turn contains no explanation or informational content** (such as a bare question, acknowledgement, or social filler). This would make `Manage Cognitive Load`, and all three Informational Quality dimensions `na`. A turn that asserts no information has no accuracy, relevance, or clarity to judge.
- **The prior student turn contains no assessable attempt** (such as an answer, work, or a mistake to react to). This makes `Deepen Metacognition` `na`, since both of its sub-behaviors (feedback on mistakes, feedback on successes) need student work to react to. It separates "failed to give warranted feedback" (`no`) from "no feedback was warranted" (`na`), which arises whenever the student gave nothing to assess (`off_topic`, `disengagement`, `confusion`, or a bare clarifying question).
- **Lived Experience in a CD conversation:** when a student is talking about their lived experience in a CD context, it is authoritative and off-limits to correction. The correction-oriented dimensions are `na`, since there is no mistake to identify.

A dimension is `na` only when all of its sub-behaviors are out of occasion. A composite dimension with at least one always-applicable sub-behavior is never `na`; the gated sub-behavior simply drops out of the judgment on turns where its occasion is absent. `Motivate & Stimulate Curiosity` in particular has inspire-curiosity and monitor-and-adjust sub-behaviors apply every turn, so it is always scored; its "deliver feedback encouragingly" clause only weighs in when feedback actually occurs, but its absence does not force `na`.

All other dimensions always apply and are never `na`: `Encourage Active Learning`, `Adapt to Learners' Goals and Needs`, `Motivate & Stimulate Curiosity`, and all four Language Quality dimensions.

`na` turns are excluded from that dimension's denominator when rates are computed (see Aggregation).


## Location

`location` is a verbatim quote. It's an exact substring copied from the tutor turn (so it can be found back in the text with a string search). Usage rule: for Instructional Ability dimensions, it is recorded on any verdict (`yes` or `no`), pointing to where the behavior occurred; for the other categories it is recorded only on a `no`, pointing at the offending span. On `na`, there is no location.


## Evaluator system prompt

A system prompt for the evaluator will be written. This example starter is adapted from LearnLM. "You a critic assessing a Tutor who is interacting with a Student. The Tutor should attempt to be (believable, objective, accurate, and reputable). As a critic, based on the transcript provided, you identify whether the tutor is (believable, objective, accurate, and reputable), stating yes or no, and why. "


## Validation (TBD)

Critic scores are temporary until validated against a human-labeled sample.

The validation is TBD. When built, it compares the critic's verdicts to human labels on the same yes/no/na instrument, checks agreement separately per language, and only trusts a dimension's scores once agreement is good enough. The agreement metric and the threshold are also TBD.


## Aggregation and comparison (TBD)

The following is TBD and are implementation suggestions:

1. **Turn aggregation to conversation.** Per dimension, drop `na` turns and take yes / (yes + no), a quality score in [0,1].
2. **Conversation aggregation to condition.** A condition (scenario × tutor model × language) is run `repeats` times, producing one conversation each. Average the per-conversation yes-rates across those repeats and report a spread (e.g. std, bootstrap CI).
3. **Condition comparison.** Across the headline axes (tutor model × language), either compare per-dimension yes-rates with their intervals, or fit Bradley-Terry per dimension for head-to-head ranking of many tutors. Once decided, update `simulation.md`.

- On a fixed model, the languages will vary and be compared.
- On a fixed language, the models will vary and be compared.

