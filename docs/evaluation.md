# Tutor/Student Conversation Evaluation 

This is a specification for the evaluation pipeline of tutor/student conversation. 


## Modules

The evaluator lives in `src/tutoring_check/evaluation/`. The annotator's prompts and response schema are generated from the dimension registry so they cannot drift from it; the same registry's rules are reused to validate each response.

```mermaid
flowchart TD
    %% cli drives the outer loop
    cli[cli.py<br/>traverse runs/, resume-safe] --> load[transcript.py<br/>load conversation]
    load --> evaluator[evaluator.py<br/>driver · loop tutor turns]

    %% evaluator is the orchestrator
    evaluator -->|build prompt + schema| annotate
    evaluator -->|call| llm{{litellm}}
    evaluator -->|tags to vector| vectorize[/presence vector over dimension_keys()/]
    evaluator -->|write record| runlog[runlog.py · JsonlLogger]

    subgraph annotate [annotator.py]
        direction TB
        ia[Tutoring-move annotator]
    end

    runlog --> out[(evaluation_transcript.jsonl)]
    out --> judge[judge.py · aggregation + comparison · TBD]

    %% dimensions registry feeds the pipeline from the side
    dims[(dimensions.py<br/> dimensions registry)] -. generates prompt + schema .-> annotate
    dims -. orders the vector's columns .-> vectorize

    classDef store fill:#eef,stroke:#5566aa,color:#222;
    classDef ext fill:#efe,stroke:#557755,color:#222;
    class out,dims store;
    class llm ext;
```

`dimensions.py` and `transcript.py` are leaves; `annotator.py` builds on both; `evaluator.py` is the driver; `judge.py` is a later stage that aggregates across turns.


## Inputs and Outputs

The evaluator consumes the simulator's output. It does not re-run a conversation. For each conversation, it reads `transcript.jsonl`, which has data on the `scenario-id`, `scenario-type` (CI or CD), `region`, and `language`. 
Only the tutor turns (utterances) are scored (`speaker == tutor`). Student turns with dynamic state labels are read for context but are not scored.

The output is wrtten in the same simulation directory, alongside `transcript.jsonl`. The evaluation is resume-safe, where if `evaluation_transcript.jsonl` already exists, the evaluation is skipped. 
Additionally, there will be `evaluation_requests` and `evaulation_responses`, the raw API calls for audit, exactly like the simulator logs.


## Schema

Here is the header schema for `evaluation_transcript.jsonl`.
```
# header
{ "timestamp": ...,
  "scenario_id": ..., 
  "scenario_type": "CI|CD",
  "region": ...,
  "language": ...,
  "mode": ...,
  "annotator_model": ...,
  "annotator_reasoning": ...,    # reasoning effort, or null
  "annotator_prompt": ...,       # the PROMPT_VERSIONS name the run was annotated under
  "tutor_model": ...,            # copied from the transcript
  "transcript_path": ...,
  "dimensions": [...] }          # dimension_keys(), naming each column of the per-turn vectors
```


## Dimensions

Every dimension is a countable tutor move, present or absent on a turn, organized as leaves under parent categories. The leaves (keyed in parentheses) are the move vocabulary. Names are Verb + Noun by what the tutor does: Elicit draws content out of the student, Provide gives content or support, Request asks the student about their own process or state.

Each leaf is given in two tiers. The **description** is the move itself, and is the test the tag is decided on. The **forms** are the shapes the move commonly takes; they illustrate the description and never bound it, so a turn that fits the description but matches none of the listed forms is still an instance of the move. (A third tier, example and non-example utterances, is defined in `dimensions.py` but left empty while the rubric is piloted on descriptions alone.)

No move is a residual bucket: a turn matching nothing is tagged with nothing. A catch-all attracts whatever a marker cannot place, and its agreement figure is then the one number that cannot be interpreted.

Prevalence is topic-dependent by design, and a move only earns its place if it can fire in any scenario. Asking the student to compute an answer was tried as a move on its own and dropped: common in a quantitative scenario and near-absent in a conceptual one, it measured the scenario rather than the tutor. It now sits as one form of Elicit Application, alongside the non-quantitative shapes that same move takes.

This section is generated from `dimensions.py`, which is the single source of truth.

1. Understanding Check
   1.1 Elicit Recall (`elicit_recall`): Tutor asks the student for a general rule, principle, or formula from the subject matter. The student states it rather than using it.
   - Commonly appears as: asking for a fact, definition, formula, law, or named principle; asking for a sequence or set of steps; asking what a worked case shows in general.
   1.2 Elicit Application (`elicit_application`): Tutor asks the student to apply knowledge on a particular case. The student uses it rather than stating it.
   - Commonly appears as: asking for a value to be computed or a problem to be solved end-to-end; asking what happens under a stated condition; asking for a real-life application.
   1.3 Elicit Elaboration (`elicit_elaboration`): Tutor asks the student to justify or expand on something they said. The question can only be answered by referring back to the student's own words.
   - Commonly appears as: asking for the reasoning behind an answer; asking 'how' or 'why' about something they said; asking for more detail on a point they made.
   1.4 Elicit Summary (`elicit_summary`): Tutor asks the student to account for what has been covered. The scope is the lesson rather than any single point in it.
   - Commonly appears as: asking for a summary of the lesson so far; asking for an explanation of what they have learned.
2. Scaffolding
   2.1 Provide Explanation (`provide_explanation`): Tutor supplies knowledge directly rather than having the student produce it.
   - Commonly appears as: stating a concept, rule, or principle; explaining a procedure or a line of reasoning; working an example through; giving an analogy or a comparison.
   2.2 Provide Hint (`provide_hint`): Tutor points the student toward material they weren't already using. If the hint were removed, the student's task would be different. It does not spell out the material outright and is not material the question already sets up.
   - Commonly appears as: naming a concept, law, or formula to use, without stating what it says; proposing a case or step to try that the student was not already working with; pointing at a feature or place to look that the student was not already working with.
3. Metacognition
   3.1 Request Planning (`request_planning`): Tutor asks the student to describe their planned approach.
   - Commonly appears as: asking which strategy they will use, and why; asking for a prediction of possible challenges; asking how to approach a similar problem differently next time.
   3.2 Request Reflection (`request_reflection`): Tutor asks the student to look back on their learning experience.
   - Commonly appears as: asking what was difficult or confusing; asking what the student would do differently; asking how the student's understanding has changed.
   3.3 Request Status (`request_status`): Tutor asks the student to report whether they are following.
   - Commonly appears as: asking if it makes sense; asking if the student has any questions; asking whether to continue or go over it again; asking how confident or comfortable the student feels.
4. Affective Support
   4.1 Provide Encouragement (`provide_encouragement`): Tutor offers affective/motivational support directed at the student as a person independent of whether their answer was correct.
   - Commonly appears as: praising the student's effort or persistence; affirming the student's progress; reassuring the student that a difficulty, mistake, or confusion is normal; expressing confidence in the student's ability to succeed.
   4.2 Provide Confirmation (`provide_confirmation`): Tutor evaluates the correctness of the student's answer rather than the student as a person. Restating what the student thinks, without assessing it, is not enough.
   - Commonly appears as: explicitly confirming the correctness of the student's answer, whether stated plainly or as praise.
5. Personalized Contextualization
   5.1 Provide Contextualization (`provide_contextualization`): Tutor draws on this student's own life or surroundings rather than a generic setting. Any mention counts, including one that carries on a setting already introduced earlier.
   - Commonly appears as: using a scenario from the student's region or local surroundings (e.g. plants, landmarks); drawing on the student's stated interests or information about themselves; using local units.

A move is tagged only when its behavior, as described above, is exhibited on the turn. The moves are not mutually exclusive: a turn may carry several, but at most one instance of any given move, and a single sentence or phrase may exhibit more than one move.

### Prompt versions

The dimensions' wording is still being tuned, so `instruction_annotator.PROMPT_VERSIONS` holds several phrasings of the annotator system prompt side by side, varying in how much is given beyond each move's description. `v1_baseline` gives the description plus the forms the move commonly takes; `v2_no_forms` is the ablation that gives descriptions alone. Running the two against each other measures what the forms are doing: if they are read as an exhaustive list rather than as illustrations, `v1_baseline` tags strictly fewer turns than `v2_no_forms`. Every version reads the vocabulary from `dimensions.py`, so none of them can drift from the registry. Pick one with `--annotator-prompt`; it is recorded in the evaluation header as `annotator_prompt`, since two runs are only comparable if annotated under the same wording. `uv run python -m tutoring_check.evaluation.instruction_annotator --version <name>` prints one for eyeballing or diffing.

## The annotator

Each utterance (tutor message) is evaluated by a single annotator model. It must differ from both the tutor model under test and the student model, to avoid self-serving bias. Its model id and params (seed, temperature) are recorded in the evaluation header for reproducibility.

The annotator sees the full transcript and reads it turn-by-turn. For each tutor turn, the whole conversation is rendered once with that target turn marked, and the annotator labels the marked turn only.

The student's region is given above the dialogue, and is the only thing from the run header that is. The human marker has the region too. Run sets that left region unset get no line rather than an empty one.

The annotator reads the transcript in the original language, while its instructions and its output vocabulary are English, so runs in different languages are directly comparable.


## Move identification

The annotator executes move identification. The dimension leaves above are the move vocabulary. For the marked turn, the annotator returns the keys of the moves it carries and omits the rest, as in an example per-utterance prompt from the National Tutoring Observatory's RND. An empty list is a valid answer and means the turn carries none of the moves.

The returned keys are turned into a 0/1 presence vector over `dimension_keys()`, in the order the header's `dimensions` lists them, so the per-tutor-turn record is one vector:

```
{ "timestamp": ...,
  "turn_id": <int>,
  "dimensions": [0, 1, 0, ...] }   # one entry per key in the header's `dimensions`
```

The last record of the file is the conversation total, each dimension's column summed over all tutor turns:

```
{ "timestamp": ..., "totals": [<int>, ...] }
```

A per-move `reasoning` field is not emitted and is TBD: one English line per tag, whatever the transcript's language, as an audit trail and an aid to prompt iteration rather than a score. It is worth adding once the vocabulary settles, since it is what makes a judge-vs-human disagreement adjudicable instead of merely countable.


## Validation (TBD)

Annotator tags are temporary until validated against a human-labeled sample.

The validation is TBD. When built, it compares the annotator's tagged moves to human labels on the same move set, checks agreement separately per language, and only trusts a move's tags once agreement is good enough. The agreement metric and the threshold are also TBD.


## The judge: aggregation and comparison (TBD)

Where the annotator emits per-turn move tags, the judge is the deterministic step that consumes those tags and computes the rollups and comparisons below. The following is TBD and are implementation suggestions:

1. Turn aggregation to conversation.
2. Conversation aggregation to condition.
   A condition (scenario × tutor model × language) is run `repeats` times, producing one conversation each. Average the per-conversation presence rates across those repeats and report a spread (e.g. std, bootstrap CI).
3. Condition comparison. Compare across the headline axes (tutor model × language).

On a fixed model, the languages will vary and be compared. On a fixed language, the models will vary and be compared.

