# Explanation annotation scheme

**Version 0.10: content units with nested passages.** This guide describes the scheme used for the latest original-language evaluations. It replaces the older passage-only v0.2 codebook, preserved in [the archive](archive/ANNOTATION_SCHEME_v0.2.md).

## Purpose

Describe what an explanation teaches, how it presents that content, whether it addresses the requested topic, and whether the evaluator identifies factual errors. The scheme supports comparisons across subjects, topics, models and language conditions.

Content counts are descriptive: more units, examples or equations do not necessarily mean better teaching. The scheme does not measure learning outcomes, audience alignment or overall explanation quality. Accuracy labels are model proposals until reviewed.

## Current implementation

| Resource | Purpose |
|---|---|
| [evaluation_v3_prompt.md](evaluation_v3_prompt.md) | Current system prompt; the filename is historical, while its contents identify version 0.10 |
| [content_units.schema.json](content_units.schema.json) | Exported JSON schema |
| [evaluate_v3.py](evaluate_v3.py) | Evaluation, source attachment, validation and metrics |
| [batch_evaluate.py](batch_evaluate.py) | Resumable evaluation of the multiple-topic batch |
| [annotation_prompt.md](annotation_prompt.md) | Legacy v0.2 passage-labeling prompt; not the current batch prompt |

JSON-schema checks are supplemented by Python checks for category-specific attributes, exact coverage, source order, evidence and links. Saved older evaluations keep their original schemas; this document does not retroactively migrate them.

## Inputs and language handling

The evaluator receives:

- `subject`: disciplinary context, such as Chemistry.
- `topic_name_en`: the intended main concept in English.
- `response_language`: the language of the explanation being evaluated.
- `original_prompt`: the original explanation-generation request.
- Source passages and the required output schema.

Read the original explanation directly, including Tamil responses. No translation or external reference packet is required in this stage. Annotation labels and reasoning are in English; source text and contextual evidence remain in the original language. Model identity is not supplied in the annotation payload.

Prompt language and response language are separate. In the current runset:

| Condition | Prompt language | Requested response language |
|---|---|---|
| 1 | English | English |
| 2 | Tamil | Tamil |
| 3 | English | Tamil |

## Structure and units of analysis

```text
Saved evaluation
  schema version, provenance, review status, computed metrics
  evaluation
    topic_relevance
    subtopics
    content_units
      id, kind, label, attributes, subtopic_ids
      rationale, review_flags
      contextualization
      passages
        id, category, attributes, formats, review_flags
        text, start, end (attached by the program)
      accuracy
        verdict, reason, errors
```

A **content unit** is one coherent teaching element, such as a definition, worked example or mnemonic. It may span several passages, including noncontiguous passages.

A **passage** is currently one nonempty source line. It is not necessarily a sentence: a table row, heading or equation can be a passage. Passage IDs are assigned before annotation and must not be changed, split or rewritten by the judge. Blank-line gaps remain in the saved source but are not separately annotated.

Each passage belongs to exactly one content unit. There is no top-level passage inventory, separate organizational container, claim inventory or secondary-category field.

## Content-unit kinds and attributes

Each unit has exactly one `kind`. Include only that kind's applicable attributes. An uncertain attribute may be `null`, but requires an explanation in that object's `review_flags`.

| Kind | Definition | Required attributes |
|---|---|---|
| `CONCEPT` | Definition, fact, description, mechanism or conceptual relationship | `depth` |
| `EXAMPLE` | Concrete illustration or application of a concept | `context`, `treatment` |
| `ANALOGY` | Comparison with another domain used to explain the target concept | `{}` |
| `PROCEDURE` | Reusable sequence of actions or method | `{}` |
| `STUDY_SUPPORT` | Aid for remembering, reviewing, practising or studying | `subtype` |
| `CAVEAT` | Correction, exception or restriction on a claim | `subtype` |
| `OTHER` | Content that does not fit the categories above | `{}`; rationale and review flag required |

`ORGANIZATION` and `INTRODUCTION` are not content-unit kinds.

### CONCEPT: depth

| Value | Decision rule |
|---|---|
| `statement` | States, defines or describes something without developing an explanatory relationship |
| `explanation` | Develops how, why or a relationship; includes units containing both a definition and explanatory reasoning |

For example, "Oxidation is loss of electrons" is a statement. An account connecting electron loss to an increased oxidation number provides explanatory reasoning. Length alone, repetition or the presence of an example does not establish explanatory depth.

Definitions and concept explanations share the `CONCEPT` category; depth distinguishes their treatment.

### EXAMPLE: context and treatment

| Attribute | Values | Decision rule |
|---|---|---|
| `context` | `abstract_or_hypothetical`, `real_world` | Does the source explicitly connect the example to an actual phenomenon or use? |
| `treatment` | `illustrative`, `worked` | Does it merely illustrate, or demonstrate reasoning from specific givens to a conclusion? |

An illustrative example shows a case. A worked example develops a solution or interpretation using specific givens, reasoning and a conclusion, possibly across several passages. A bare equation alone is not sufficient for `worked`.

Real-world context and worked treatment are independent. Rusting may be a real-world illustration; an analysis deriving oxidation states for a specific reaction may be worked. Do not infer real-world context merely because a hypothetical chemical reaction is physically possible.

### STUDY_SUPPORT: subtype

| Value | Meaning |
|---|---|
| `mnemonic` | Memory aid, acronym or memory hook |
| `recap` | Summary or review of already-presented material |
| `practice_question` | A question or task for the learner to attempt |
| `study_strategy` | Advice about how to study, practise or organize learning |

An offer to provide questions is not itself a practice question. Distinct mnemonic and recap functions should normally be separate units.

### CAVEAT: subtype

| Value | Meaning |
|---|---|
| `misconception` | Identifies or corrects a likely misunderstanding |
| `exception` | Identifies a case that deviates from a stated general pattern |
| `limitation` | Specifies a boundary on the applicability of a rule, model or explanation |
| `qualification` | Narrows or conditions a claim without primarily correcting a misconception or identifying an exception/limitation |

Choose the function expressed by the source, not a caveat the judge thinks should have been included. Split distinct caveat functions when their subtypes differ.

## Grouping and counting rules

1. Group one coherent teaching element into one unit; do not create a unit for each sentence or factual assertion.
2. A multi-step worked example counts once. Related setup, half-reactions, full reaction and agent identification belong together when developed as the same example.
3. Shared elements or terminology alone do not prove that two examples are the same. A separate later repetition can be a new occurrence.
4. Distinct examples under one heading remain separate units. Rusting, respiration and batteries are three examples even if each occupies one bullet.
5. Do not duplicate reasoning inside an example as an additional concept unit. Independent general definitions can be separate concept units; an application of those definitions belongs to its example.
6. Preserve source order within each unit and order units by their first source occurrence. Noncontiguous passages may share a unit, but no source passage may be duplicated.
7. Use response-local sequential unit IDs (`u1`, `u2`, ...) and subtopic IDs (`s1`, `s2`, ...). Passage IDs retain their input numbering.

Counts measure occurrences of teaching elements, not unique semantic content across responses. One example spanning four passages is **one example unit and four passages**.

## Nested passage labels and organizational text

Each passage has one `category`, using the content categories plus `ORGANIZATION`. Its category describes its local function, while the parent unit's kind describes the whole teaching element.

Passage attributes follow the category rules above, with one exception: an `EXAMPLE` passage has `{}` attributes because context and treatment belong to the parent unit. A concept passage can have `depth: statement` inside a unit whose overall depth is `explanation`.

`ORGANIZATION` passages have `subtype: structural` or `subtype: social`:

- Structural: headings, transitions, navigation and separators.
- Social: greetings, encouragement and offers of further help.

Attach opening titles/greetings to the first relevant unit, headings/transitions to the unit they introduce, and closing remarks to the last relevant unit. A shared heading is attached only once. Organizational text does not create additional units or affect unit accuracy.

For example, "Let's break it down" remains `ORGANIZATION` even inside a worked `EXAMPLE` unit. Introductory content that actually defines the topic is `CONCEPT`; its location does not make it organizational.

Normally a unit contains at least one passage of its own kind. For an explanation containing only organizational text, retain it as one `OTHER` unit with `no_substantive_content` in its review flags. Use `not_applicable` accuracy unless the off-topic gate applies. Exclude this fallback unit from substantive-unit counts.

### Formats

Passages have one or more format labels, independent of their teaching category:

`prose`, `equation`, `list`, `table`, `diagram`, `heading`, `separator`.

An equation is a format, not a content-unit kind. An isolated chemical formula or symbol is not automatically an equation. Format labels describe what the source contains; they do not infer an absent diagram.

## Subtopics

The response-level `subtopics` array lists the distinct conceptual aspects identified in that explanation. Each entry has an ID and label; units link to it through `subtopic_ids`.

For redox, subtopics might include electron-transfer definitions, oxidation numbers and oxidizing/reducing agents. One unit can link to multiple subtopics; multiple units can share a subtopic.

Do not invent a broad subtopic merely because an example applies an existing criterion. These IDs are local to a response, not a shared syllabus taxonomy. Their count describes observed coverage and cannot establish completeness or cross-response equivalence without additional matching.

## Contextualization

Contextualization is assessed once per content unit, regardless of its kind:

```json
{
  "value": "everyday",
  "evidence": [{"passage_id": "p3", "quote": "Exact source wording"}]
}
```

| Value | Meaning |
|---|---|
| `none` | No explicit everyday or localized connection; evidence must be empty |
| `everyday` | Explicit connection to familiar daily-life objects or activities |
| `localized` | Explicit cultural, geographical, community or language-specific adaptation |

If both everyday and localized connections occur, use `localized`. Evidence must be an exact quote from a passage nested in the same unit. Tamil wording alone or unexplained English mnemonic letters do not establish localization.

This describes context, not audience suitability. It does not automatically label a foreign mnemonic as misaligned. A real-world industrial example may have `contextualization: none`: example context and contextualization answer different questions.

## Topic relevance

Assess the response against the supplied English topic name and original prompt, not a topic inferred only from its answer.

| `topic_match` | Meaning |
|---|---|
| `on_topic` | Addresses the intended main concept |
| `partially_on_topic` | Addresses the intended concept but also substantially addresses a different topic |
| `off_topic` | Explains a different main concept instead of the requested topic |
| `unclear` | Available content does not support a reliable relevance judgment |

Provide `requested_topic`, `observed_topic`, `reason`, supporting `content_unit_ids` and `major_task_failure`. Related examples and prerequisite material are not off-topic merely for discussing another concept.

For `off_topic`, set `major_task_failure: true`; use `not_assessed_due_to_topic_mismatch` for every unit's accuracy and leave error arrays empty. Otherwise the failure flag is false. An explanation can be factually plausible about the wrong topic; this is a relevance failure, not proof that all its statements are false.

## Unit-level accuracy and errors

Assess each unit as a whole using subject knowledge and explicit reasoning. There is no separate claim-level inventory. Source quotations identify the assessed content; they are not independent verification.

| Verdict | Meaning |
|---|---|
| `accurate` | No factual error identified in the unit |
| `contains_error` | At least one definite error, including partly incorrect material |
| `uncertain` | No definite error identified, but correctness cannot reliably be assessed |
| `not_applicable` | No assessable factual substance, such as a purely organizational fallback |
| `not_assessed_due_to_topic_mismatch` | Accuracy skipped because the response is off-topic |

A definite error plus unresolved uncertainty receives `contains_error`, with uncertainty explained in `reason`. All verdicts require a reason. Only `contains_error` has a nonempty errors array.

Each error contains:

| Field | Meaning |
|---|---|
| `passage_ids` | Affected passages within this unit |
| `description` | What is wrong and why |
| `correction` | The proposed correction |
| `severity` | `minor` or `major` |

Use minor for a localized defect that leaves the main explanation intact; use major for a defect that substantially changes the concept, reasoning or result. These are review guidelines, not a numerical severity scale. The current prompt requires the two labels but does not provide a separately calibrated severity rubric.

Group repeated manifestations of the same underlying mistake within a unit into one record. Different mistakes receive separate records. Errors repeated across different units are not globally deduplicated by the pipeline.

Judge introductory simplifications in context. A balanced equation alone does not establish that it adequately represents a named phenomenon. Missing topics are coverage omissions, not factual errors. Assess the correctness of mnemonics and practice-question givens, but do not invent solutions that the response never provides.

## Example of the saved structure

This short illustrative example uses English only for readability; Tamil text is retained unchanged in actual Tamil evaluations. Offsets are Python Unicode character positions, zero-based, start-inclusive and end-exclusive.

```json
{
  "topic_relevance": {
    "requested_topic": "oxidation",
    "observed_topic": "oxidation",
    "topic_match": "on_topic",
    "content_unit_ids": [
      "u1"
    ],
    "reason": "Defines the requested concept.",
    "major_task_failure": false
  },
  "subtopics": [
    {
      "id": "s1",
      "label": "Electron loss"
    }
  ],
  "content_units": [
    {
      "id": "u1",
      "kind": "CONCEPT",
      "label": "Definition of oxidation",
      "attributes": {
        "depth": "statement"
      },
      "subtopic_ids": [
        "s1"
      ],
      "rationale": "Provides a definition without developed reasoning.",
      "review_flags": [],
      "contextualization": {
        "value": "none",
        "evidence": []
      },
      "passages": [
        {
          "id": "p1",
          "category": "CONCEPT",
          "attributes": {
            "depth": "statement"
          },
          "formats": [
            "prose"
          ],
          "review_flags": [],
          "text": "Oxidation is electron loss.",
          "start": 0,
          "end": 27
        }
      ],
      "accuracy": {
        "verdict": "accurate",
        "reason": "The electronic definition identifies oxidation as electron loss.",
        "errors": []
      }
    }
  ]
}
```

The judge returns passage IDs and annotations. The program attaches `text`, `start` and `end` from the original source after validation; it does not trust generated offsets. The saved file wraps this object in `evaluation`, alongside schema version, fingerprint, provenance, `review_status: proposed` and computed metrics.

## Response-level metrics and comparisons

| Metric | Interpretation |
|---|---|
| `total_content_units` | All units, including any non-substantive OTHER fallback |
| `substantive_content_units` | Units excluding those flagged `no_substantive_content` |
| `content_unit_kinds` | Unit counts by kind |
| `total_passages` | Number of nested source passages |
| `nested_passages` | Legacy duplicate of total_passages |
| `unique_subtopics` | Number of response-local subtopic entries |
| `contextualization` | Counts by contextualization value among substantive units |
| `proposed_substantive_verdicts` | Accuracy-verdict counts among substantive units |
| `proposed_error_records` | Error records summed across units |
| `proposed_error_severity` | Minor/major error-record counts |

Topic relevance is stored separately in `evaluation.topic_relevance`. The analysis layer additionally derives off-topic rates, responses containing proposed errors and erroneous-unit rates.

For language comparisons:

- Compute off-topic rates over all eligible responses, not only retained on-topic responses.
- Compare teaching-unit counts and factual errors among on-topic responses; show the denominator.
- Keep skipped, uncertain and not-applicable assessments distinct from accurate judgments. An assessed-unit error rate uses `contains_error / (accurate + contains_error)`.
- Prefer matched topic-model combinations with all three conditions on-topic when comparing mean counts. Report how many combinations remain; this conditions the comparison on successful topic relevance and does not describe excluded failures.
- English-prompt/English-output versus English-prompt/Tamil-output keeps prompt language fixed. Tamil-prompt/Tamil-output also changes prompt language.
- Do not equate an absence of proposed errors with verified correctness. Response-level error presence indicates detected errors; an unflagged response is not necessarily fully assessed or error-free.

Current comparisons are descriptive, based on single generated responses per combination. They do not establish statistical significance, causal language effects or overall quality rankings.

## Review and validation

The pipeline checks schema validity, applicable attributes, sequential local IDs, exact source coverage, ordering, quote matches, local error links and off-topic accuracy gating. It logs API requests/responses and repair attempts. Valid JSON and exact spans do not guarantee correct semantic labels or accurate factual judgments.

Review ambiguous grouping, apparent factual errors, localization evidence and borderline topic relevance. Use `review_flags` to record uncertainty rather than silently inventing missing information. Flags are free-text strings except the pipeline-recognized `no_substantive_content` flag.

The viewer preserves source order, renders Markdown and highlights passage categories. Dotted boxes represent content units. Noncontiguous parts of one unit have the same unit ID with part labels; count the unit once, not once per box.
