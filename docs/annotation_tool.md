# Human Annotation Tool

This is a specification for the **human annotation tool**: a small reviewer-facing
interface for hand-labeling one simulated conversation at a time. It produces the
human gold labels that the evaluation pipeline's validation step depends on
(see `evaluation.md` → "Validation (TBD)").

It has two distinct jobs over one conversation, both done on a single annotation
view (no separate pages):

1. **Tutor dimension annotation.** Label each *tutor* utterance across the 8
   Instructional Ability dimensions. This produces the *gold labels* the
   automated annotator is measured against.
2. **Student state adherence.** Validate that each *student* utterance actually
   behaves like the dynamic state it was assigned during simulation. This audits
   the *simulator*.

Both label sets are collected in the same view by clicking the relevant chat
bubble; which job the sidebar offers depends on whether the clicked turn is a
tutor or a student turn.


## Scope

- One conversation is reviewed at a time. The tool loads a single
  `transcript.jsonl` and walks its turns.
- The tool **only collects human judgments**; it does not call any model, does
  not re-run the conversation, and does not compute agreement. Aggregation and
  inter-annotator agreement against the automated annotator live downstream
  (`evaluation.md` → "The judge").
- Turn roles are fixed by the transcript: clicking a `tutor` turn opens the
  8-dimension annotation; clicking a `student` turn opens the state-adherence
  check.


## Input

The tool reads the simulator's `transcript.jsonl`, the same file the evaluator
consumes (`transcript.py`). Relevant fields:

- Header (`session_start`): `scenario_id`, `scenario_type` (`CI`|`CD`),
  `region`, `language`, `tutor_model` — shown read-only for reviewer context.
- Each turn: `turn_id`, `speaker`, `content`, and `state`.
  - `state` is present on **student** turns only (the dynamic-state label that
    was injected for that turn) and is `None` on tutor turns.
  - The human-readable strategy text for a state comes from the matching state
    set in `states.py` — `CI_STATES` for `CI` scenario types, `CD_STATES` for
    `CD` — keyed by `state`. The tool resolves each student turn's `state` to its
    strategy description so the reviewer can judge adherence without memorizing
    the state catalog.

The conversation is shown in its **original language** (transcripts may be
non-English); reviewer notes are written in English so labels can be reviewed
uniformly, matching the automated annotator's convention.

**Ingest sanitization.** `content` is cleaned on load before it reaches a cell:

- Escaped newline sequences (literal `\n\n`) are rendered as real paragraph
  breaks, not shown verbatim.
- Stray JSON-serialization artifacts that leaked into the text are stripped — e.g.
  a trailing `}` after a closing quote (`…on a clear night?"}`). Sanitization
  should target these known artifacts conservatively so it never alters genuine
  dialogue punctuation.


## Opening screen — transcript picker

The tool opens on a **picker** that narrows down to one transcript through a chain
of **cascading dropdowns** that mirror the on-disk run layout
(`runs/<item_id>/r<rep>/<timestamp>_<run_id>/transcript.jsonl`). Each dropdown is
populated from the selection above it:

1. **Run set.** The campaign / output tree to browse (the run-set whose conditions
   were expanded into `runs/`). Choosing one scopes everything below to that tree.
2. **Topic item.** The run-set entry (`item_id`) — the condition/scenario being
   annotated, e.g. its topic. Populated from the items present in the chosen run
   set.
3. **Run.** The repeat directory, e.g. `r0`, `r1` (a condition is run `repeats`
   times). Populated from the repeats present under the chosen topic item.

Selecting all three resolves to that repeat's session directory and its
`transcript.jsonl`. The picker then reads the `session_start` header and shows the
resolved transcript's identity and annotation status before opening it:

- **Name** — a human-readable handle, `<Topic> - <Language>`, e.g.
  `Gravity - English` (topic is `scenario_id` title-cased; language spelled in
  full).
- **Meta** — the header fields: `scenario_type` (CI/CD), `region`, `language`,
  `tutor_model` (and student model / seed if recorded), plus the run's creation
  **timestamp** (the run id).
- **Status** — annotation state: *not started*, *in progress*, or *complete*,
  derived from whether a saved annotation file exists for that run and whether it
  resolves every tutor and student turn (see "Output"). A completed transcript can
  be reopened to review or revise; reopening restores the saved labels.

An **Open** action enters the annotation view for the resolved transcript.

### Aggregation (within a language)

From the picker, completed annotations can be **aggregated within a single
language**: the reviewer picks a language, and the tool gathers every completed
annotation file for runs in that language and reports rollups over them —
per-dimension label distributions across tutor turns and the student state
adherence rate. Aggregation is **only ever within one language**;
labels from different languages are never pooled, matching the pipeline's
per-language comparison rule (`evaluation.md` → "The judge"). Cross-condition
rollups and model×language comparison remain the downstream judge's job; the
tool's aggregate view is a per-language summary of the human gold labels it has
collected.


## Annotation view

Selecting a transcript opens a **single page**: the conversation rendered as a
**chat thread**, with a **right sidebar** that annotates whichever bubble is
clicked. There is no page switching and no grid — one conversation is one page,
and only the sidebar's contents change as the reviewer moves between bubbles.

**Chat thread (main column).** Turns are shown top-to-bottom as chat bubbles, the
way a chatbot conversation reads:

- Tutor turns and student turns are visually distinguished (e.g. opposite sides /
  different colors), each labeled with its speaker (`teacher` / `student`). The
  transcript stores `tutor`; the tool may display `teacher` in reviewer-facing
  wording, but the stored role is unchanged.
- Bubble text is the turn's `content`, rendered after ingest sanitization (see
  "Input" — escaped `\n\n` become real line breaks; stray JSON artifacts like a
  trailing `}` are stripped).
- Every bubble is clickable. The currently selected bubble is highlighted, and a
  bubble shows an **annotation state marker** (unannotated / in progress /
  complete) so the reviewer can see at a glance which turns still need labels.

**Right sidebar (contextual).** Clicking a bubble opens the sidebar with controls
for *that* turn; clicking another bubble swaps the sidebar's contents. The sidebar
header shows the turn id and a quote of the bubble being annotated. Its body
depends on the speaker:

- **Tutor bubble → 8-dimension annotation.**
- **Student bubble → state-adherence check.**

A thin header strip above the thread shows the read-only conversation identity
(`scenario_id`, `scenario_type`, `region`, `language`, `tutor_model`), overall
completion progress, and prev/next conversation navigation.

### Sidebar — tutor bubble (8 dimensions)

For a tutor turn, the sidebar shows the 8 Instructional Ability dimensions in the
registry order of `dimensions.py`, each as a labeled dropdown:

| Dimension | Sub-text (`criteria`) | Dropdown options |
|-----------|-----------------------|------------------|
| Mistake Identification | Has the tutor identified/recognized a mistake in a student's response? | Yes / To an extent / No |
| Mistake Location | Does the tutor's response accurately point to a genuine mistake and its location? | Yes / To an extent / No |
| Revealing the Answer | Does the tutor reveal the final answer (whether correct or not)? | Yes (and correct) / Yes (and incorrect) / No |
| Providing Guidance | Does the tutor offer correct and relevant guidance, such as an explanation, elaboration, hint, examples, and so on? | Yes / To an extent / No |
| Actionability | Is it clear from the tutor's feedback what the student should do next? | Yes / To an extent / No |
| Coherence | Is the tutor's response logically consistent with the student's previous responses? | Yes / To an extent / No |
| Tutor Tone | Is the tutor's response encouraging, neutral, or offensive? | Encouraging / Neutral / Offensive |
| Human-likeness | Does the tutor's response sound natural rather than robotic or artificial? | Yes / To an extent / No |

Each dropdown shows the dimension name, its `criteria` as smaller gray sub-text,
and options drawn from that dimension's own `labels` in the registry — **not** a
single fixed set. Six dimensions use the shared 3-point scale
(**Yes / To an extent / No**); **Revealing the Answer** and **Tutor Tone** have
custom three-way sets. Because the options and sub-text are read from
`dimensions.py`, the sidebar cannot drift from the registry — adding a dimension
or editing a label set changes the controls automatically, the same "single
source of truth" guarantee the automated annotator follows. An optional **note**
(English) applies to the whole tutor turn. A tutor turn is **complete** when all 8
dimensions have a label.

### Sidebar — student bubble (state adherence)

For a student turn, the sidebar shows:

- the assigned **state** name (e.g. `misconception`) and its strategy description
  resolved from `states.py`, read-only, so the reviewer can judge adherence
  without memorizing the catalog;
- an **adheres** control — a **Yes / No** choice answering "does this utterance
  match its assigned state?";
- an optional **note** (English).

A student turn is **complete** once `adheres` is set to `Yes` or `No` (unset =
pending; non-adherence is recorded explicitly as `No`, never by omission).

### Conditional formatting

Dropdown values are color-coded by their **value** (presentation only — not
stored, no meaning beyond the label):

| Value | Background |
|-------|------------|
| Yes / Yes (and correct) / Encouraging | green |
| To an extent / Neutral | amber/yellow |
| No / Yes (and incorrect) / Offensive | red/pink |

The mapping is by semantic polarity (positive → green, middling → amber,
negative → red), so each dimension's labels map onto the three-color scheme even
when the label text differs. `Yes (and incorrect)` is a negative outcome (the
tutor gave away a wrong answer), hence red. The same scheme colors the student
**adheres** control (`Yes` green, `No` red).


## Workflow and navigation

- The reviewer opens a conversation and clicks each bubble in turn, annotating
  tutor bubbles across the 8 dimensions and student bubbles for state adherence,
  in any order.
- Selections persist as they are made (no explicit "save" needed); reopening a
  conversation restores prior selections so reviews are resumable.
- A completion indicator shows how many bubbles remain unlabeled; the
  conversation is complete when every tutor and student bubble is fully labeled.
- Conversation-level navigation walks a working set of transcripts (the picker's
  filtered list); prev/next moves through it.


## Output

Because the tool is **hosted** (annotators do not share the run directories on
their own machines), the live store is a **SQLite database** held on the server,
not files scattered next to each `transcript.jsonl`. SQLite is enough: there is no
concurrent annotation of the same transcript (§ Delivery form), and the scale is
small (≤20 annotators).

The schema is one row per (transcript, annotator, turn) annotation, so the same
transcript can be independently labeled by different annotators for agreement.
Conceptually:

- **annotation_set** — one per (transcript, annotator): `transcript_path`, the
  transcript header fields (`scenario_id`, `scenario_type`, `region`, `language`,
  `tutor_model`), `annotator_id`, `created_at`, `updated_at`, and a derived
  completion flag.
- **annotation** — one per annotated turn within a set: `turn_id`, `kind`
  (`student_adherence` | `tutor_dimensions`), and the judgment payload below.

Labels are validated against the registry on write: every `tutor_dimensions`
payload key must be a known dimension key and every value must be one of that
dimension's `labels`; `student_adherence` stores the Yes/No `adheres` flag.

### Export to jsonl

The downstream judge consumes jsonl (`evaluation.md` → "Inputs and Outputs"), so
an **export** step materializes each completed annotation set as a
`human_annotation.jsonl` written back into the run directory next to that
transcript (one file per annotator when a transcript is multiply labeled, e.g.
`human_annotation.<annotator_id>.jsonl`). The DB is the live source of truth;
the jsonl is the export the pipeline reads.

Header:

```
{ "timestamp": ...,
  "scenario_id": ...,
  "scenario_type": "CI|CD",
  "region": ...,
  "language": ...,
  "tutor_model": ...,          # copied from the transcript
  "annotator_id": ...,         # the human reviewer
  "transcript_path": ... }
```

One record per annotated turn; the `kind` distinguishes the two sidebars.

Student turn (state adherence):

```
{ "kind": "student_adherence",
  "turn_id": <int>,
  "state": "<state_key>",      # the assigned state from the transcript
  "adheres": true | false,     # the sidebar's Yes / No
  "note": ...                  # optional, English
}
```

Tutor turn (8 dimensions):

```
{ "kind": "tutor_dimensions",
  "turn_id": <int>,
  "labels": {                  # one entry per dimension key, value ∈ that dimension's labels
     "mistake_identification": "Yes",
     "mistake_location": "No",
     "revealing_answer": "Yes (and incorrect)",
     "providing_guidance": "To an extent",
     "actionability": "Yes",
     "coherence": "Yes",
     "tutor_tone": "Encouraging",
     "human_likeness": "Yes"
  },
  "note": ...                  # optional, English
}
```


## Delivery form

The tool is a **hosted web app** living in this repo, sized for ≤20 annotators
with no concurrent annotation of the same transcript.

**Stack.** A single **FastAPI** app serves both the JSON/HTML routes and the
front-end; the front-end is **Jinja templates + HTMX** (with a little Alpine.js
for sidebar state), so there is no separate front-end build or second deployable.
The click-a-bubble → sidebar interaction is an `hx-get` that swaps in the sidebar
fragment for the clicked turn. The whole thing runs as one `uvicorn` process.

**Single-repo layout** (new package alongside `evaluation/` and `simulation/`):

```
src/tutoring_check/annotation/
  app.py            # FastAPI: routes + static/template mounts
  store.py          # scan runs tree; read/write SQLite; jsonl export
  templates/        # Jinja: picker, annotation view, sidebar fragments
  static/           # css + small JS (HTMX/Alpine)
```

**Persistence.** SQLite is the live store (§ Output); the jsonl export feeds the
pipeline. The DB must sit on durable storage, not the transcripts.

**Hosting.** Packaged as one container (`uvicorn`) and deployable to a small VM or
a managed host (Render / Railway / Fly.io / Cloud Run). The only hosting decision
is data location: the app needs read access to the `runs/` transcript tree and a
durable write location for the SQLite DB. On ephemeral hosts the local disk is
wiped on redeploy, so bundle the read-only transcripts into the image (or mount
them) and put the SQLite DB on a **persistent volume**.

The only hard UI requirements remain the click-a-bubble → sidebar interaction and
the value-based color coding.


## Open questions

- **Working set.** How the reviewer's queue of conversations is selected and
  ordered (the validation sample), and whether multiple reviewers label the same
  conversation for inter-annotator agreement.
- **Non-adherence detail.** Whether a non-adherent student turn (`adheres = No`)
  should also capture *which* state it looked like instead, or just a free-text
  note.
```