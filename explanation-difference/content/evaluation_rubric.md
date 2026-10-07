# Educational Explanation and Conversation Evaluation Rubric

**Version:** 1.1-draft  
**Status:** Proposed instrument for pilot annotation; not yet validated.

## 1. Purpose and scope

This rubric addresses two questions:

1. How well does the chatbot explain the material?
2. How well does the chatbot support the learner throughout the conversation?

It separates response-level instructional characteristics, a technical accuracy check, descriptive concept and feature annotations, and conversation-quality ratings. Instructional features are recorded without automatically adding quality points. The response checklist describes observable characteristics; it is not a validated measure of overall explanation quality.

There are no separate role-specific scores and no numeric concept-level scores in this streamlined version.

## 2. Units of evaluation

| Component | Unit | Context available |
|---|---|---|
| Response-level instructional characteristics and accuracy | Each tutor response containing explanatory content | Current response and preceding conversation |
| Concepts and instructional features | Each evaluated explanatory response | Same local context |
| Conversation quality | Complete conversation, scored once | All student and tutor turns |

An explanatory response communicates a definition, relationship, mechanism, rationale, or procedure intended to help the learner understand. Brief explanations count. A bare answer, greeting, or question without explanatory content does not receive the response checklist or accuracy assessment.

When a response combines explanation, feedback, hints, and questions, assess the response once, including any questions, summaries, or follow-ups accompanying its explanatory content. Do not split it into separately scored roles.

Every tutor turn is considered when judging the conversation. Non-explanatory turns remain in the turn inventory with a brief reason for exclusion from response-level assessment. An omitted explanation that the student needed is evidence for conversation-level responsiveness or guidance; exclusion does not excuse the omission.

Student turns provide evidence and context; they are not scored for tutor quality.

## 3. Evaluation inputs

Provide:

- Conversation ID and ordered messages with stable turn IDs, speaker, and original text.
- Topic name in the original language, language, and English topic name where available.
- Original student request and subsequent conversation.
- Intended learner level and learning objective, if known.
- Optional reference concepts or subject-matter reference, with its source.

Do not invent learner characteristics or assume cultural familiarity from the language used. If learner level is unknown, use the explicit request and demonstrated knowledge and state any material uncertainty.

Judge the original-language text where possible. If only a translation is available, record that limitation and do not make unsupported judgments about original-language fluency or cultural wording.

## 4. Response-level assessment labels

Use separate label sets for observable features, focus and coherence, and accuracy. Do not assign 0–3 explanation-quality ratings or convert the checklist into a total score.

| Assessment | Labels |
|---|---|
| Instructional features | Present / Absent / Not applicable |
| Focus and coherence | Meets / Partially meets / Does not meet |
| Technical accuracy | No identified error / Minor error / Major error / Cannot determine |
| Conversation quality only | 0–3 / NA / IE, defined in Section 7 |

Each judgment includes a brief rationale and supporting evidence. For absent features, explain what was inspected; an empty evidence list is acceptable because absence has no quotation. When an omission leaves an explicit request unmet, cite that request as context.

Use Not applicable only when the item's purpose does not apply to the response in context, and explain why. A short answer with one takeaway may not warrant consolidation; an explanation with no prerequisite dependencies may not warrant prerequisite review. Otherwise, an unobserved feature is Absent. Do not use Not applicable to excuse something explicitly requested or clearly needed.

Absence is not automatically a weakness. Its instructional significance depends on the request and context. Do not reward length or feature count.

Assess complete source responses. If response text is missing or truncated, record the limitation and do not interpret unobserved features as definitively absent; obtain complete text before completing the checklist.

## 5. Response-level instructional characteristics

Apply the following eight items once per tutor response containing explanatory content, using preceding conversation history.

| Item | Observable evidence and decision rule |
|---|---|
| **Reviews needed prerequisites** | Present when the tutor defines, recalls, or briefly explains prior knowledge needed to follow the current explanation. Merely naming a prerequisite does not count as reviewing it. |
| **Connects new material to prior knowledge** | Present when the tutor explicitly relates the new idea to an earlier concept, familiar idea, or prior discussion. Mentioning both ideas without explaining their relationship does not count. Do not assume the learner actually knows the referenced idea unless the context supports this. |
| **Consolidates the main ideas** | Present when the tutor recaps or synthesizes the main takeaways. A heading labelled “Summary” without a substantive recap does not count. |
| **Checks understanding** | Present when the tutor asks a content-specific question or provides a task inviting a learner response that could reveal understanding. Generic “Does that make sense?” checks and rhetorical questions immediately answered by the tutor do not count. |
| **Offers a relevant follow-up** | Present when the tutor proposes a specific next activity, example, or topic related to the learning objective. “Ask me anything” alone does not count. |
| **Maintains focus** | Judge whether the response's content serves the requested explanation. Identify distracting passages if present. |
| **Connects ideas coherently** | Judge whether the relationships and sequence of concepts or steps are understandable. Identify missing links, unexplained transitions, or contradictions if present. |
| **Explains relevance** | Present when the tutor states or illustrates why the concept matters or where it can be applied. A bare claim that the topic is “important” does not count. |

For the first five items and Explains relevance, use Present / Absent / Not applicable with evidence and a rationale. Presence records that a feature occurred, not that it was effective or accurate. The same passage may support multiple items when it independently meets each definition.

### Focus and coherence anchors

| Item | Meets | Partially meets | Does not meet |
|---|---|---|---|
| **Maintains focus** | Content serves the request, including useful background, examples, and elaboration. | Identifiable digressions or repetition distract, but the requested explanation remains clear. | Irrelevant material or repetition substantially obscures or displaces the requested explanation. |
| **Connects ideas coherently** | The ordering and relationships between ideas or steps are understandable; no necessary connection is missing. | At least one missing link, abrupt transition, or local inconsistency requires the learner to reconstruct the connection, but the main account remains followable. | Disconnected steps, conflicting statements, or missing essential relationships prevent the main account from being followed. |

A short, single-idea explanation can meet coherence without transition phrases. Do not require unnecessary detail, stylistic polish, or a particular heading structure.

### Independent technical accuracy check

Assess factual claims, procedures, examples, analogies, models, and the technical premises of questions or hints within the evaluated response.

| Label | Decision rule |
|---|---|
| **No identified error** | No technical error was identified in the content reviewed. This records the evaluator's finding, not a guarantee of correctness. |
| **Minor error** | A localized imprecision or error does not alter the central reasoning, result, or method. |
| **Major error** | An error changes a result or method, misrepresents a core concept, or would materially mislead the learner. |
| **Cannot determine** | Necessary subject-matter knowledge, reference material, or context is unavailable for a defensible assessment. |

When several confirmed errors occur, use the highest observed severity and describe the errors. Quote the problematic claims and provide a brief correction where it can be established. If a confirmed error coexists with unresolved claims, retain the confirmed severity and record the uncertainty in the rationale and limitations. Do not use No identified error when the content could not meaningfully be checked.

Link localized findings to concept IDs where useful. There are no numeric concept scores.

### Interpretation rules

- Prerequisite review and connection to prior knowledge are different: one refreshes background; the other explicitly links background to the new idea.
- Checking understanding and offering follow-up are separate. Either can occur without the other.
- A local understanding check records an opportunity to assess understanding. Whether the tutor uses the student's answer is judged at the conversation level.
- A real-world connection may also demonstrate relevance; evidence can be reused, but the two annotations are not independent quality points.
- A feature can be Present even if flawed. Record the flaw in the rationale and accuracy assessment where applicable.
- This checklist does not comprehensively measure depth, coverage, or instructional effectiveness. An on-topic but incomplete answer may meet focus while leaving a need unmet. Record that limitation or unmet need, and consider it in conversation responsiveness and guidance.
- Later student answers must not retroactively change a local assessment made from information available at that turn.

## 6. Concept and feature annotations

### Concepts

Identify meaningful instructional ideas rather than automatically treating each heading, paragraph, or example as a concept. Merge repeated discussion of the same idea within a response. Concepts may have several non-contiguous supporting spans.

Record:

- A concept ID unique within the evaluated response.
- A short label and whether it is an explicit title or evaluator-generated.
- Exact title span if an explicit title exists; otherwise null.
- One or more supporting content spans.

An evaluator-generated label is not a quotation and must not be assigned a fabricated title span. Concept IDs are local to the response; cross-turn concept alignment is not required in this version.

### Instructional features

| Feature | Record | Counting or interpretation rule |
|---|---|---|
| Examples | One entry per example, with description and evidence | One worked scenario counts as one example despite multiple steps. Distinct scenarios count separately. |
| Analogies or models | Kind, short description, and evidence | Distinguish an analogy from a conceptual model or representation. |
| Cultural references | Explicit reference, associated region labels if identifiable, and evidence | Allow multiple regions or unspecified. Do not force an association based on language or presumed origin. |
| Real-world connections | Application or practical connection and evidence | Record explicit connections, not applications supplied by the evaluator. |
| Questions or hints | Kind, short description, and evidence | A question that also functions as a hint can receive both labels in one entry. |
| Summary | Presence and supporting evidence | Record explicit synthesis or recap of key ideas. A heading alone is insufficient. |

Presence and example count are derived from the annotation arrays: an empty array means absent, and the number of example entries is the example count. This avoids contradictory count and presence fields.

Annotate these features in evaluated explanatory responses. Other turns remain available as evidence for conversation quality without requiring separate feature annotation.

## 7. Conversation-quality rubric

Use 0 = Inadequate, 1 = Limited, 2 = Adequate, and 3 = Strong, following the dimension-specific anchors below. Use NA (Not applicable) when a criterion is not relevant, and IE (Insufficient evidence) when it is relevant but cannot be judged from the available dialogue. NA and IE have null numeric scores. Each rating requires a rationale and evidence; for omissions, cite the context establishing the need. Explain missing evidence rather than inventing a quotation.

Assign four ratings once per conversation. Read every tutor and student turn. Cite sequences that show both successes and weaknesses rather than relying only on the final exchange.

| Dimension | 0 — Inadequate | 1 — Limited | 2 — Adequate | 3 — Strong |
|---|---|---|---|---|
| **Responsiveness** | Misses a central student need or seriously misinterprets the learner's contribution. | Addresses needs inconsistently, with substantial mismatches or omissions. | Generally addresses the student's questions, reasoning, and confusion. | Consistently gives targeted responses grounded in what the student actually says. |
| **Guidance and adaptation** | Gives seriously unsuitable help or persists despite clear evidence that it is ineffective. | Help is often poorly calibrated; adjustments are superficial or miss the difficulty. | Provides appropriate help and makes useful adjustments when needed. | Calibrates guidance to demonstrated needs and makes targeted adjustments when warranted. |
| **Checking and using understanding** | Ignores clear evidence of misunderstanding or fails to check when a check is clearly needed. | Uses generic checks or makes limited use of student answers. | Elicits relevant evidence when needed and generally uses it appropriately. | Connects targeted checks, interpretation of answers, and effective instructional follow-up. |
| **Continuity and progress** | Loses the learning goal, contradicts essential prior content, or leaves central difficulties unattended. | The conversation is fragmented, repetitive, or drops important issues. | Maintains direction and addresses most relevant outstanding issues. | Builds coherently on prior exchanges and tracks or resolves remaining difficulties as opportunities permit. |

### Opportunity and evidence rules

- Do not require a strategy change when the existing approach remains appropriate.
- A concise direct answer may be appropriate; questioning is not always preferable.
- If no understanding check is warranted, checking and using understanding may be NA.
- A single prompt-response exchange usually provides IE for dimensions requiring interaction across turns. Responsiveness can still be assessed if the evidence is adequate.
- If an interaction ends before a needed follow-up is possible, record that limitation. Do not treat truncation as tutor failure.
- If evidence supports only guidance but not adaptation, explain the evidential limit; use IE where the combined judgment cannot be supported.
- Progress means instructional progression and demonstrated performance within the dialogue. Do not claim lasting learning gains or transfer from the transcript alone.
- Conversation ratings are independent judgments and are not derived from the response checklist.

## 8. Evaluation procedure

1. Read the task metadata and identify available learner context.
2. Inventory every tutor turn and identify which contain explanatory content.
3. For each explanatory response, use preceding context to identify concepts, annotate features, complete the eight instructional-characteristic items, and perform the accuracy check.
4. Read the complete conversation and assign four conversation ratings.
5. Check that each label or score is justified, quoted spans match the source, and Not applicable, Cannot determine, and IE are used correctly.
6. Report response checklist labels, accuracy findings, conversation dimension profiles, descriptive features, and evidence limitations separately.

When preparing local inputs for an automated evaluator, truncate the transcript at the evaluated turn to prevent later-turn leakage.

## 9. Output schema and evidence conventions

The accompanying file, [evaluation_rubric.schema.json](evaluation_rubric.schema.json), defines the JSON output structure.

| Output field | Contents |
|---|---|
| rubric_version | Instrument version, fixed to 1.1-draft |
| conversation_id | Identifier of the source conversation |
| metadata | Topic, language, learner context, objective, and optional reference concepts |
| tutor_turn_inventory | Every tutor turn, whether it contains an explanation, and the classification reason |
| explanation_evaluations | Concepts, features, eight instructional-characteristic judgments, and a technical accuracy check for each explanatory response |
| conversation_evaluation | Four conversation ratings |
| limitations | Missing context, truncation, translation, or other relevant evidential limits |

A response-level feature judgment has the following structure:

```json
{
  "status": "present",
  "rationale": "The tutor invites the learner to apply the coefficient to a molecular formula.",
  "evidence": [
    {
      "turn_id": "tutor_02",
      "quote": "How many hydrogen atoms are there in 2H₂O?",
      "occurrence": 1,
      "concept_ids": ["c1"]
    }
  ]
}
```

The quotation above is a hypothetical example illustrating the structure, not evidence from an actual conversation.

Response features use status values present, absent, or not_applicable. Focus and coherence use meets, partially_meets, or does_not_meet. Technical accuracy uses no_identified_error, minor_error, major_error, or cannot_determine and includes a corrections field (null when not applicable or not established).

Only conversation ratings include a numeric score. They use status scored, not_applicable, or insufficient_evidence; score is 0–3 for scored and null otherwise, with an explanatory rationale.

Evidence quotes must be exact substrings of the original stored turn text. occurrence is the one-based occurrence of that exact quotation, counted from the start of the turn. This disambiguates repeated text without relying on language-dependent character-offset conventions. Use separate entries for non-contiguous spans.

For conversation-level evidence, leave concept_ids empty because concept IDs are scoped to individual explanation records. Turn IDs and quotes identify the relevant exchanges.

### Semantic validation

In addition to JSON Schema validation, check that:

- The inventory contains each source tutor turn exactly once.
- Each explanatory turn has exactly one explanation evaluation; other turns have none.
- Evidence turn IDs exist and quotes match the specified occurrence.
- Local evaluation evidence never references a later turn.
- Concept title and content spans belong to the evaluated response.
- Referenced concept IDs exist in that response.
- Explicit-title labels have title spans; generated labels do not.
- Present features and focus/coherence judgments cite evidence. Absent and Not applicable features explain their status.
- Confirmed accuracy errors cite evidence and provide corrections where established; Cannot determine explains what is missing.
- A scored conversation rating cites evidence; NA/IE explain the applicability or evidence limitation.
- Feature entries are not duplicated simply to inflate counts.
- Summary presence agrees with its evidence.
- No response quality total, overall composite score, or numeric concept scores are introduced.

## 10. Reporting and pilot use

Report the eight response-level items, accuracy findings, and four conversation dimensions separately. Example counts and other feature annotations describe instructional choices and do not contribute directly to quality scores.

For response items, report label distributions and the number of applicable cases. If reporting presence rates, use Present / (Present + Absent) and report Not applicable separately. Report focus, coherence, and accuracy as categorical distributions; do not convert them into a numeric quality total.

For conversation dimensions, report the number of scored, NA, and IE cases. Exclude NA and IE from numeric summaries. State whether response-level summaries weight every response equally or first summarize within conversations; otherwise longer conversations can dominate the results.

Before treating this as a research instrument, pilot it on a varied sample with independent annotators. Review disagreements, refine ambiguous definitions, and assess agreement by item and language where relevant. Calibrate any automated evaluator against human annotations.

The checklist describes observable instructional characteristics and still involves interpretation. It should not be presented as a comprehensive measure of explanation quality or evidence of measured learning gains.
