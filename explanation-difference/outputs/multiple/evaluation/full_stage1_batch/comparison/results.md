# Expanded Stage 1 comparison

Same 385 source responses; legacy annotations versus the expanded Stage 1 prompt. No explanations regenerated. Stage 2 has not reviewed the new annotations. These are annotation differences, not established improvements or changes in explanation quality.

[Interactive tables and response links](comparison.html) | [Per-response CSV](responses.csv)

## Overall

Strictly on-topic in both versions: **365 responses**. This shared subset holds the source sample fixed for old/new unit and error comparisons.

Mean units: **8.40 -> 7.68**. Fewer units: 155; unchanged count: 174; more: 36. Equal counts do not guarantee matching boundaries.

Proposed error records on the shared subset: **72 -> 112**. These are not matched error identities or a verified error-detection rate.

Topic-relevance decisions changed for **3** responses. Old: {'on_topic': 368, 'off_topic': 17}. New: {'on_topic': 365, 'off_topic': 18, 'partially_on_topic': 2}.

## New annotation: language-condition comparison

Only individually on-topic responses are included. Conditions may have different topic/model coverage. `-english` means English prompt requesting the named language; `-native` means the prompt and response use that language. Counts reflect primary unit categories, not every embedded function.

| Condition | All N | On-topic N | Off-topic | Partial | Mean units | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER | Error records (on-topic) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| arabic-english | 35 | 35 | 0 | 0 | 6.91 | 3.14 | 2.31 | 0.29 | 0.23 | 0.83 | 0.11 | 0.00 | 12 |
| arabic-native | 35 | 28 | 5 | 2 | 7.46 | 3.61 | 2.29 | 0.25 | 0.25 | 0.89 | 0.18 | 0.00 | 4 |
| bengali-english | 35 | 35 | 0 | 0 | 7.77 | 3.34 | 3.11 | 0.20 | 0.23 | 0.80 | 0.09 | 0.00 | 14 |
| bengali-native | 35 | 33 | 2 | 0 | 7.82 | 3.24 | 2.85 | 0.33 | 0.21 | 1.09 | 0.09 | 0.00 | 15 |
| english | 35 | 35 | 0 | 0 | 8.17 | 3.14 | 2.89 | 0.40 | 0.31 | 1.26 | 0.17 | 0.00 | 6 |
| french-english | 35 | 35 | 0 | 0 | 7.31 | 3.20 | 2.71 | 0.29 | 0.23 | 0.74 | 0.14 | 0.00 | 7 |
| french-native | 35 | 34 | 1 | 0 | 7.32 | 3.29 | 2.00 | 0.44 | 0.35 | 1.00 | 0.24 | 0.00 | 11 |
| hindi-english | 35 | 35 | 0 | 0 | 7.80 | 3.09 | 2.91 | 0.29 | 0.26 | 1.14 | 0.11 | 0.00 | 8 |
| hindi-native | 35 | 35 | 0 | 0 | 8.40 | 3.26 | 3.14 | 0.40 | 0.26 | 1.23 | 0.11 | 0.00 | 9 |
| tamil-english | 35 | 35 | 0 | 0 | 7.66 | 2.91 | 3.14 | 0.23 | 0.14 | 1.09 | 0.14 | 0.00 | 15 |
| tamil-native | 35 | 25 | 10 | 0 | 7.80 | 3.52 | 2.68 | 0.32 | 0.16 | 1.04 | 0.08 | 0.00 | 11 |

## Old versus new by condition: same on-topic responses

| Condition | Paired N | Old mean units | New mean units | Mean change | Old error records | New error records |
|---|---|---|---|---|---|---|
| arabic-english | 35 | 7.83 | 6.91 | -0.91 | 6 | 12 |
| arabic-native | 28 | 8.93 | 7.46 | -1.46 | 2 | 4 |
| bengali-english | 35 | 8.23 | 7.77 | -0.46 | 10 | 14 |
| bengali-native | 33 | 8.27 | 7.82 | -0.45 | 10 | 15 |
| english | 35 | 9.00 | 8.17 | -0.83 | 4 | 6 |
| french-english | 35 | 7.71 | 7.31 | -0.40 | 6 | 7 |
| french-native | 34 | 8.18 | 7.32 | -0.85 | 7 | 11 |
| hindi-english | 35 | 8.57 | 7.80 | -0.77 | 6 | 8 |
| hindi-native | 35 | 8.86 | 8.40 | -0.46 | 7 | 9 |
| tamil-english | 35 | 8.43 | 7.66 | -0.77 | 6 | 15 |
| tamil-native | 25 | 8.56 | 7.80 | -0.76 | 8 | 11 |

## Category totals: shared on-topic subset

| Kind | Old | New | Change |
|---|---|---|---|
| CONCEPT | 1369 | 1181 | -188 |
| EXAMPLE | 1067 | 1001 | -66 |
| ANALOGY | 121 | 114 | -7 |
| PROCEDURE | 78 | 88 | +10 |
| STUDY_SUPPORT | 373 | 369 | -4 |
| CAVEAT | 59 | 49 | -10 |
| OTHER | 0 | 0 | +0 |

## Changed topic-relevance decisions

- ch-1_isotope / arabic-native / grok-4.3: **on_topic -> partially_on_topic**. [Old](../../../ch-1_isotope/arabic-native/evaluation/grok-4.3__60e6a4a4cfa1/results.md) / [New](../ch-1_isotope/arabic-native/grok-4.3__60e6a4a4cfa1/results.md)
  - Old reason: The prompt asks to explain the plural term 'نظائر' (isotopes) to a secondary school student in Arabic. The response covers both the linguistic aspects of the term in Arabic and its core scientific definition and examples in chemistry.
  - New reason: The response covers the requested chemistry concept of isotopes (definition and examples of hydrogen, carbon, and uranium isotopes), but also devotes substantial portions of the explanation to Arabic grammar and morphology (plural formation, pattern 'فَعَائِل', and lexical distinction between 'نظائر' and 'نظراء').
- ch-1_isotope / arabic-native / llama-4-maverick: **on_topic -> partially_on_topic**. [Old](../../../ch-1_isotope/arabic-native/evaluation/llama-4-maverick__af23e6d9066d/results.md) / [New](../ch-1_isotope/arabic-native/llama-4-maverick__af23e6d9066d/results.md)
  - Old reason: The response addresses the linguistic origin and scientific meaning of isotopes ('نظائر') in chemistry, fulfilling the requested topic.
  - New reason: The response primarily focuses on the linguistic meaning and grammatical plural forms of the word 'نظائر' (analogues/counterparts), while introducing the chemical definition of isotopes as an illustrative example of how the term is used.
- ch-7_vapour_phase_refining / french-native / llama-4-maverick: **on_topic -> off_topic**. [Old](../../../ch-7_vapour_phase_refining/french-native/evaluation/llama-4-maverick__f8113bbab9f0/results.md) / [New](../ch-7_vapour_phase_refining/french-native/llama-4-maverick__f8113bbab9f0/results.md)
  - Old reason: The response directly addresses the requested topic of vapour phase refining, though it incorrectly explains the underlying process by describing physical distillation rather than chemical vapour phase transport.
  - New reason: In metallurgy and chemistry, 'vapour phase refining' specifically refers to the chemical method where an impure metal is reacted with a reagent to form a volatile compound that is subsequently decomposed to yield the pure metal (such as the Mond process for nickel or the Van Arkel method for zirconium and titanium). The response instead describes physical distillation (heating low-boiling metals such as zinc, mercury, or magnesium to vaporize and condense them based on differences in vapor pressure and boiling point, with no chemical compound formation). It therefore explains a different refining process.

## Interpretation limits

The prompt, unit boundaries and evidence structure changed together. This is not an isolated experiment on the value of a review stage. Error records can increase because of stricter judgments, different grouping, or false positives. New ambiguities and unassigned text require review. No new significance tests were run. Word counts of the original responses are unchanged; a different relevance filter can change the included sample.
