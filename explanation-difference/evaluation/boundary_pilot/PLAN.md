# Boundary-first annotation pilot

Status: revised coherent-unit specification (pilot v2). The Tamil redox v1 experiment completed stages 1 and 2 under the earlier rules. Its results and the existing v0.10 annotations remain unchanged; the coherent-unit v2 experiment has also completed stages 1 and 2. The latest system-prompt packaging change has not been run.

## Objective and count definition

Count independently identifiable teaching units consistently across language and formatting. A unit is a coherent teaching contribution, not a paragraph, bullet, sentence, equation, or atomic factual claim. Count occurrences, not globally unique ideas. Later explicit recaps are separate STUDY_SUPPORT units; a continuation of the same example remains the same unit.

Agreed decision: a coherent comparison of carbon-12, carbon-13 and carbon-14 is ONE comparative EXAMPLE. Independent applications such as radiocarbon dating and cancer treatment are separate EXAMPLE units. Mere proximity in a list does not make examples coherent: they must jointly serve a stated comparison or shared solution.

Other boundary rules below are proposed for the pilot and can be revised through adjudication.

## Prompt delivery

Stage 1 and stage 2 each have a self-contained system prompt in stage1_prompt.md and stage2_prompt.md, including all category definitions, boundary rules and output requirements. The runner reads these files directly; it no longer extracts instructions from this plan. User messages contain task metadata and source text, plus candidate_annotation for stage 2. No boundary_codebook field is sent in the user payload. Use a new output directory for changed prompts; saved historical manifests retain the exact old inputs.

## Three stages

| Stage | Inputs | Outputs | Constraint |
|---|---|---|---|
| 1. Identify | Original source, English topic name, subject, response language, boundary codebook | Candidate units with kind, English label, verbatim excerpts; ambiguities | No accuracy judgments or detailed attributes |
| 2. Review boundaries | Same source and codebook plus candidate units | Complete revised unit list, explicit change log and unresolved decisions | Review substantive text independently, not only the candidate labels |
| 3. Enrich | Frozen reviewed units, full source and task metadata | Topic relevance, subtopics, unit attributes, contextualization and accuracy | Never silently split, merge, relabel, or rewrite the frozen units |

Start with the existing Gemini-3.8-flash judge for all stages to isolate the workflow change. Each stage uses a separate request. Same-model review is an error check, not independent validation. Model disagreement is resolved through source inspection and codebook decisions, not majority vote.

## Proposed boundary rules

Principle: assign one primary kind according to the unit's main teaching function. Supporting definitions, equations, reasoning and short reminders may remain inside it. Split only when the text clearly develops an independent teaching contribution, not merely because a local function differs. Category counts describe primary functions, not every teaching function present.

1. CONCEPT: keep one teaching point's definition, direct explanation and causal justification together. Split a new teaching point that is developed independently. Closely linked contrasting definitions may form one comparison. Record genuinely ambiguous boundaries for review rather than inventing certainty.
2. EXAMPLE: one specific case, application, coherent comparison, or worked problem. Keep setup, supporting definitions, calculation, interpretation, agent identification and conclusion together. One coherent example remains one unit regardless of lines, equations, steps or excerpts. Reasoning needed for that example is not a second CONCEPT. A general rule taught independently may be a CONCEPT even if used later in an example.
3. STUDY_SUPPORT: create a separate unit for a mnemonic explicitly developed as an independent memory aid, even inside a concept paragraph. A brief supporting reminder does not automatically create a new unit. OIL and RIG together are one mnemonic when presented as a paired aid; LEO/GER is a different aid. A later recap or practice question is separate. Do not fabricate a solution to a practice question.
4. ANALOGY: count a developed cross-domain mapping as one unit. An incidental metaphor is not automatically another teaching unit.
5. PROCEDURE: count a reusable sequence as one unit; steps applied only to a specific problem belong to its EXAMPLE.
6. CAVEAT: a separately expressed exception, limitation, qualification or misconception correction is one unit. A necessary condition within a definition is not automatically a second caveat.
7. OTHER: only for substantive content that does not fit; require an ambiguity note. Purely organizational text does not create a counted unit.
8. Headings, greetings, transitions and punctuation remain in the source and can be displayed unhighlighted. The pilot does not require each character to belong to a content unit. Every uncovered substantive segment must be explained or assigned during review. Do not reintroduce a separate organizational-content container.
9. Units can have multiple noncontiguous excerpts. Excerpts can cover part of a supplied paragraph or bullet. Each substantive character belongs to at most one unit. Shared context is available from the full source without duplicating spans. Do not split a coherent table into cells just to give each local function its own category. Keep it together under its primary teaching function. If it clearly belongs to an existing example, attach it to that example; if it independently teaches general definitions, it may be a CONCEPT despite containing application cells. If neither reading is clear, retain a coherent grouping and record the ambiguity. Do not force a split or duplicate coverage.

### Worked boundary decisions

- A sodium-chlorine solution with two half-equations, reasoning and agent identification: one EXAMPLE, not a unit per line.
- An agent-definition table that also names Cl2 and Na: keep the table intact; choose the primary function from its teaching context. If ambiguous, flag the choice rather than splitting cells.
- Carbon-12/13/14 compared to show the isotope relationship: one comparative EXAMPLE. Dating and cancer treatment presented as independent applications: two EXAMPLE units.
- A definition followed by its direct explanation: one CONCEPT. A separately developed new teaching point can start another unit.
- OIL/RIG explicitly taught as a memory aid: one STUDY_SUPPORT unit; an incidental reminder inside an example may remain supporting content.

## Source anchoring: model quotes, code resolves offsets

Models return exact original-language excerpts, not character offsets. Each excerpt has text and a zero-based occurrence index among exact matches in the unmodified source. This supports repeated text without guessing offsets. Reject unmatched or ambiguous references. No Unicode normalization, whitespace repair, translation or Markdown stripping before alignment.

The implemented pilot resolver assigns start/end in Python Unicode code points, end-exclusive, and verifies source[start:end] == text. Browser rendering must convert code-point offsets correctly rather than treating them as UTF-16 indices. Each span may occur only once across counted units; spans within a unit are ordered by source position. Disjoint spans allow clearly independent teaching units to be separated where needed. Multiple excerpts do not imply multiple units; partial spans are a capability, not a requirement to fragment coherent material.

Stage 1/2 model-facing shape:

```json
{
  "content_units": [
    {
      "id": "u1",
      "kind": "EXAMPLE",
      "label": "Comparison of carbon isotopes",
      "excerpts": [{"text": "VERBATIM SOURCE SUBSTRING", "occurrence": 0}]
    }
  ],
  "ambiguities": []
}
```

Kinds: CONCEPT, EXAMPLE, ANALOGY, PROCEDURE, STUDY_SUPPORT, CAVEAT, OTHER. An ambiguity has unit_ids, issue and proposed_resolution. Empty content_units is valid for an organizational-only response; count zero, not one OTHER unit.

Stage 2 also returns changes: each has action (add/split/merge/relabel/reanchor/remove), before_ids, after_ids and reason. Retain IDs for unchanged units; changed units get fresh IDs and explicit mappings. No change is a valid outcome. The program records stage hashes; the final artifact is not silently substituted for stage 1.

## Enrichment remains separate

Reuse the current scheme's topic relevance and per-unit attributes: concept depth; example context/treatment; study-support subtype; caveat subtype; contextualization and its evidence; simple unit accuracy with error description/correction/severity. Preserve subtopic IDs, but no per-subtopic evidence requirement. Do not add audience alignment. Accuracy remains a model proposal.

Assess relevance before applying the existing off-topic accuracy gate. Off-topic responses remain visible for relevance analysis, while their unit accuracy is not_assessed_due_to_topic_mismatch and their content counts are excluded from on-topic comparisons.

Passage-category annotations are deferred in this pilot. They may later be an optional display layer and must not redefine unit counts. Enrichment can flag a boundary issue for stage 2/human review, but cannot change it itself.

## Pilot sample and validation

pilot_manifest.json selects two topic/model blocks across all six response languages with English prompts (12 responses), plus French-native isotope (known boundary contrast) and Tamil-native isotope (off-topic diagnostic). These are existing outputs; no new explanation generation is needed. Six of the English-prompt responses plus the French-native contrast were already inspected in the audit: treat these as development cases, not held-out evidence. The remaining six language cases are reserved for initial evaluation after rules are frozen. The off-topic diagnostic is separate.

Build adjudicated examples before claiming accuracy. User or bilingual review is needed for language-specific judgments; model-to-model agreement alone is insufficient.

Add two controls from development content: (a) identical wording formatted as prose versus bullets, and (b) a faithful translation with the same teaching content. Formatting must not add/remove meaning. Translations require review and are diagnostic controls, not automatic ground truth. Do not infer invariance by comparing independently generated explanations with different content.

Validation checklist:

- Mechanical: exact source alignment, legal kinds, unique IDs, no overlapping counted spans, valid review mappings, stable source hashes.
- Boundary: missed units, false units, inappropriate splits/merges, clearly independent teaching contributions hidden by merges, and unnecessary fragmentation of supporting material. Mixed roles alone are not errors.
- Coverage: inspect uncovered substantive text, not just whether every existing passage ID was assigned.
- Semantic: compare adjudicated unit identities and kinds; equal total counts alone can conceal different mistakes. Report counts and individual disagreements before aggregate scores.
- Controls: report matched/missing/extra units and category changes under formatting and translation; explain expected changes rather than requiring count equality blindly.
- Stage 3: ensure every frozen unit receives exactly one enrichment record and no boundary changes.

## Artifacts and execution order

Store output for this revised specification under outputs/multiple/evaluation/boundary_pilot_v2/<response-key>/ with source.json, source.md, manifest.json, stage1.json, stage2.json, reviewed_units.json, stage3.json, validation.json and api_calls.jsonl. Save exact prompts, model settings, source hash, attempts and changes. Human edits get separate versioned records.

The quote resolver and two-stage demo runner are implemented and have been exercised on the Tamil redox development response. Next experiment: rerun a development response in a new v2 output directory and inspect whether coherent grouping is preserved without missing independently taught content. Inspect stage 1/2 changes with the user before enriching or scaling. Do not overwrite the 385 current evaluations or rerun the full batch on an unvalidated specification.

## Prompt clarification revision

The system prompts now spell out the unit definitions, contrasting examples, split/keep questions, mixed-table decisions, source anchoring and coverage checks. Stage 2 uses the same definitions. Stage 1 assigns sequential IDs; Stage 2 preserves unchanged IDs and uses fresh IDs for changes. These revised prompts have not yet been run. The self-contained prompt files are authoritative for model instructions; earlier run manifests preserve historical versions.
