# Annotation reference

This document explains the annotations recorded for each explanation, organized into response, content-unit and passage levels. It describes the current nested annotation structure. Accuracy assessments are model judgments, not independently verified findings.

## 1. Response-level annotations

These describe the explanation as a whole.

### Topic relevance

Topic relevance asks whether the explanation addresses the requested main concept.

| Field | Meaning |
|---|---|
| `requested_topic` | The intended topic, supplied in English |
| `observed_topic` | The topic actually discussed in the response |
| `topic_match` | The relationship between the intended and observed topics |
| `reason` | Explanation of the relevance judgment |
| `content_unit_ids` | Content units supporting that judgment |
| `major_task_failure` | Whether the response is off-topic |

`topic_match` has four values:

| Value | Meaning |
|---|---|
| `on_topic` | Addresses the intended main concept |
| `partially_on_topic` | Addresses the intended concept but also substantially discusses a different topic |
| `off_topic` | Explains a different main concept instead of the requested topic |
| `unclear` | There is not enough clear information to judge relevance reliably |

Related examples and prerequisite explanations are not automatically topic drift. When the response is `off_topic`, `major_task_failure` is true and factual accuracy is marked as not assessed for all content units. A response can explain the wrong topic without its statements necessarily being false.

### Subtopics

`subtopics` lists the conceptual aspects covered in the response. Each has:

- `id`: a response-local identifier, such as `s1`.
- `label`: a description of that subtopic.

For example, a redox explanation might cover electron transfer, oxidation numbers and oxidizing/reducing agents. Content units link to these entries through `subtopic_ids`.

Subtopics describe observed coverage. They do not establish completeness against a syllabus, and the same ID in two responses does not imply the same subtopic.



## 2. Content-unit annotations

A content unit is one coherent teaching element: for example, a definition, a worked example or a mnemonic. It can contain several passages, including passages separated by other content in the original explanation.

 
### Content-unit kinds

| Kind | Meaning |
|---|---|
| `CONCEPT` | A definition, fact, description, mechanism or conceptual relationship |
| `EXAMPLE` | A concrete illustration or application of a concept |
| `ANALOGY` | A comparison with another domain used to explain the target concept |
| `PROCEDURE` | A reusable sequence of actions or method |
| `STUDY_SUPPORT` | An aid for remembering, reviewing, practising or studying |
| `CAVEAT` | A correction, exception or restriction on a claim |
| `OTHER` | Content that does not fit the listed functions; its rationale and review flags explain the choice |

A multi-step worked example is one unit. Distinct examples, such as rusting, respiration and batteries, are separate units even when presented under one heading. A reusable procedure differs from a worked example: the procedure describes a general method, while the example applies reasoning to a specific case.

`ORGANIZATION` is not a content-unit kind. Introductions are classified by what they do: a definition is a concept, an opening example is an example, and a greeting is an organizational passage attached to a unit.

### Kind-specific attributes

#### CONCEPT: `depth`

| Value | Meaning |
|---|---|
| `statement` | States, defines or describes something without developing explanatory reasoning |
| `explanation` | Explains how, why or a relationship |

A unit containing both a definition and explanatory reasoning uses `explanation`. Greater length or the mere presence of an example does not establish explanatory depth.

#### EXAMPLE: `context` and `treatment`

| Attribute | Value | Meaning |
|---|---|---|
| `context` | `abstract_or_hypothetical` | An abstract or hypothetical case without an explicit real-world connection |
| `context` | `real_world` | Explicitly connected to an actual phenomenon or use |
| `treatment` | `illustrative` | Shows a case without developing a worked solution or interpretation |
| `treatment` | `worked` | Develops reasoning from specific givens to a conclusion |

Context and treatment are independent: a real-world example may be illustrative or worked. A bare equation alone does not establish worked treatment.

#### STUDY_SUPPORT: `subtype`

| Value | Meaning |
|---|---|
| `mnemonic` | A memory aid, acronym or memory hook |
| `recap` | A summary of material already presented |
| `practice_question` | A question or task for the learner to attempt |
| `study_strategy` | Advice about studying, practising or organizing learning |

An offer to provide a practice question is not itself a practice question.

#### CAVEAT: `subtype`

| Value | Meaning |
|---|---|
| `misconception` | Identifies or corrects a likely misunderstanding |
| `exception` | Identifies a case that deviates from a general pattern |
| `limitation` | Identifies a boundary of applicability |
| `qualification` | Narrows or conditions a claim |

For example, an exception identifies a deviating case; a limitation explains where a rule or model stops applying.

ANALOGY, PROCEDURE and OTHER have no additional category attributes. Only applicable attributes are recorded. An uncertain attribute may be `null`, accompanied by a review flag.

### Contextualization

This describes explicit connections to daily life or a particular context. It applies to every content-unit kind.

| `value` | Meaning |
|---|---|
| `none` | No explicit everyday or localized connection |
| `everyday` | A connection to familiar daily-life objects or activities |
| `localized` | An explicit cultural, geographical, community or language-specific adaptation |

`evidence` contains exact source quotes and their `passage_id`. Evidence is empty for `none`. When both everyday and localized connections appear, `localized` takes precedence.

Tamil wording alone does not imply localization. Unexplained English mnemonic letters do not establish adaptation to Tamil. This annotation describes contextualization, not audience suitability or cultural misalignment.

EXAMPLE `context` and contextualization are distinct: an actual industrial process can be a real-world example without an explicit everyday or localized connection.

### Accuracy

Accuracy is assessed once for the whole content unit.

| `verdict` | Meaning |
|---|---|
| `accurate` | No factual error was identified |
| `contains_error` | At least one definite error was identified, including partly incorrect material |
| `uncertain` | No definite error was identified, but correctness could not be assessed reliably |
| `not_applicable` | There is no assessable factual substance |
| `not_assessed_due_to_topic_mismatch` | Assessment was skipped because the response is off-topic |

`reason` explains the judgment. If an identified error coexists with uncertainty, the verdict is `contains_error` and the reason describes the remaining uncertainty.

`accurate` means no error identified by the evaluator, not proven correctness. Missing topics are coverage omissions rather than factual errors. Mnemonics and practice-question givens can be assessed, but the evaluator should not invent a solution absent from the source.

### Error records

Only units marked `contains_error` have nonempty `errors` lists.

| Field | Meaning |
|---|---|
| `passage_ids` | The affected passages within the unit |
| `description` | What is wrong and why |
| `correction` | The proposed correction |
| `severity` | `minor` or `major` |

Minor indicates a localized defect; major indicates a substantial problem with the concept, reasoning or result. These labels are judgments rather than a calibrated numerical scale.

Repeated manifestations of the same underlying mistake within a unit are grouped into one record. Different mistakes receive separate records. The current scheme does not separately label partial errors: partly wrong content is captured by `contains_error` and its description.

## 3. Passage-level annotations

A passage is currently one nonempty source line. It can be a sentence, heading, list item, table row or equation. Each passage occurs exactly once, nested inside a content unit. Blank-line spacing remains in the original source but is not separately annotated.

| Field | Meaning |
|---|---|
| `id` | Source passage identifier, such as `p19` |
| `text` | Exact original-language source text |
| `start`, `end` | Source character offsets: zero-based, start-inclusive and end-exclusive |
| `category` | The passage's local teaching function |
| `attributes` | Additional labels specific to its category |
| `formats` | One or more presentation-format labels |
| `review_flags` | Ambiguities or issues needing review |

Text and offsets are attached from the original source by the program. They are not rewritten by the evaluator.

### Passage category and attributes

Passage categories use the seven content-unit kinds plus `ORGANIZATION`. A passage's local role may differ from its parent unit's overall kind.

| Passage category | Attributes |
|---|---|
| `CONCEPT` | `depth`: statement / explanation |
| `EXAMPLE` | None; context and treatment belong to the parent content unit |
| `ANALOGY` | None |
| `PROCEDURE` | None |
| `STUDY_SUPPORT` | `subtype`: mnemonic / recap / practice_question / study_strategy |
| `CAVEAT` | `subtype`: misconception / exception / limitation / qualification |
| `ORGANIZATION` | `subtype`: structural / social |
| `OTHER` | None; explanation in review flags is required |

For example, a concept unit with explanatory reasoning can contain an initial passage with depth `statement`. A worked example can contain a heading categorized as ORGANIZATION and reasoning categorized as EXAMPLE.

### Organizational passages

| Subtype | Meaning |
|---|---|
| `structural` | Headings, transitions, navigation and separators |
| `social` | Greetings, encouragement and offers of further help |

Opening titles and greetings attach to the first relevant unit. Headings and transitions attach to the unit they introduce. Closing remarks attach to the last relevant unit. A shared heading is attached only once.

For example, "Let's break it down" is ORGANIZATION even inside a worked-example unit. It does not become worked reasoning simply because of its location. Organizational passages do not add content units or affect the parent's factual accuracy.

For the exceptional case of an entirely organizational response, one OTHER unit preserves the text and receives the `no_substantive_content` review flag. It is excluded from substantive-unit counts.

### Presentation formats

Formats are independent of teaching categories and may be combined.

| Format | Meaning |
|---|---|
| `prose` | Ordinary explanatory text |
| `equation` | An equation or mathematical/chemical relation |
| `list` | An ordered or unordered list item |
| `table` | Tabular content |
| `diagram` | A diagram represented in the source |
| `heading` | A section or subsection heading |
| `separator` | A structural divider |

An isolated chemical formula is not automatically an equation. Equation is a format, not a content-unit kind.

## How the three levels relate

Consider one worked example containing a heading, reaction equation, reasoning and conclusion:

- At response level, it contributes to the listed subtopics and to one EXAMPLE in the category count.
- At content-unit level, it has context and treatment attributes, contextualization and one accuracy assessment.
- At passage level, the heading remains ORGANIZATION, while the other passages preserve their local categories and formats.

The result is one example unit containing several annotated passages, not several separately counted examples. In the viewer, highlights show passage categories and dotted boxes show content units. A noncontiguous unit may have several boxes with the same ID; it still counts once.
