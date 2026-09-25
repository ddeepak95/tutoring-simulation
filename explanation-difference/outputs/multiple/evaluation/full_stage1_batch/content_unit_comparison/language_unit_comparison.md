# Content-unit differences across languages

Current expanded Stage 1 annotations only. Count each coherent content unit once, by its primary kind; excerpts within a unit are not counted separately. Include only strictly on-topic responses. These are descriptive comparisons, not significance tests or validated quality rankings.

## Same English prompt language, different response languages

All six conditions have the same 35 topic/model combinations (seven topics across five models), with no relevance exclusions. This is the clearest comparison of response language in this dataset.

| Response language | N | Total | Concept | Example | Analogy | Procedure | Study support | Caveat |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| English | 35 | 8.17 | 3.14 | 2.89 | 0.40 | 0.31 | 1.26 | 0.17 |
| Arabic | 35 | 6.91 | 3.14 | 2.31 | 0.29 | 0.23 | 0.83 | 0.11 |
| Bengali | 35 | 7.77 | 3.34 | 3.11 | 0.20 | 0.23 | 0.80 | 0.09 |
| French | 35 | 7.31 | 3.20 | 2.71 | 0.29 | 0.23 | 0.74 | 0.14 |
| Hindi | 35 | 7.80 | 3.09 | 2.91 | 0.29 | 0.26 | 1.14 | 0.11 |
| Tamil | 35 | 7.66 | 2.91 | 3.14 | 0.23 | 0.14 | 1.09 | 0.14 |

Values are mean units per response. OTHER is zero throughout.

## Paired differences from English responses

Target-language response minus English response, using English prompts for both. Lower/equal/higher compares total unit counts within each topic/model pair.

| Language | Pairs | Total difference | Concept | Example | Analogy | Procedure | Study support | Caveat | Lower / equal / higher |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Arabic | 35 | -1.26 | +0.00 | -0.57 | -0.11 | -0.09 | -0.43 | -0.06 | 20 / 6 / 9 |
| Bengali | 35 | -0.40 | +0.20 | +0.23 | -0.20 | -0.09 | -0.46 | -0.09 | 15 / 6 / 14 |
| French | 35 | -0.86 | +0.06 | -0.17 | -0.11 | -0.09 | -0.51 | -0.03 | 16 / 8 / 11 |
| Hindi | 35 | -0.37 | -0.06 | +0.03 | -0.11 | -0.06 | -0.11 | -0.06 | 15 / 10 / 10 |
| Tamil | 35 | -0.51 | -0.23 | +0.26 | -0.17 | -0.17 | -0.17 | -0.03 | 20 / 3 / 12 |

## Native versus English prompts within the same response language

Native-prompt minus English-prompt counts. Match topic and model; exclude only pairs where either response is not strictly on-topic. Each language can therefore have a different subset. This separates the prompt-condition contrast from the response-language contrast above.

| Language | Pairs | Total difference | Concept | Example | Analogy | Procedure | Study support | Caveat |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Arabic | 28 | -0.18 | +0.18 | -0.18 | -0.11 | -0.04 | -0.07 | +0.04 |
| Bengali | 33 | -0.18 | -0.21 | -0.33 | +0.12 | -0.03 | +0.27 | +0.00 |
| French | 34 | -0.15 | +0.03 | -0.76 | +0.15 | +0.12 | +0.24 | +0.09 |
| Hindi | 35 | +0.60 | +0.17 | +0.23 | +0.11 | +0.00 | +0.09 | +0.00 |
| Tamil | 25 | +0.16 | +0.64 | -0.28 | +0.04 | -0.04 | -0.16 | -0.04 |

## Variation by topic

Mean total-unit difference from English responses, with English prompts for both. Each cell averages five matched models.

| Topic | Arabic | Bengali | French | Hindi | Tamil |
|---|---:|---:|---:|---:|---:|
| alkaline earth metals | -1.00 | +0.20 | -2.00 | +0.40 | -0.40 |
| covalent radius | -0.60 | +0.20 | +0.40 | -0.20 | -0.20 |
| isotope | -0.60 | +1.20 | +0.80 | +1.40 | +3.20 |
| mole concept | +0.00 | +0.60 | -0.40 | +0.80 | -1.60 |
| redox reactions | -4.00 | -1.40 | -3.20 | -2.80 | -1.60 |
| stoichiometry | -1.60 | -3.40 | -0.80 | -1.80 | -2.20 |
| vapour phase refining | -1.00 | -0.20 | -0.80 | -0.40 | -0.80 |

## Interpretation limits

Counts describe the annotated composition, not factual quality, depth, or unique subtopic coverage. One worked example may contain several steps while counting once. A change in category counts can reflect grouping or primary-kind decisions. Counts are provisional Stage 1 judgments; no Stage 2 review has run. Topic/model matching controls composition, but does not make the observations independent or establish causality.

The native-prompt comparison describes successful topic recognition only. Report the off-topic rates alongside it rather than interpreting excluded responses as having zero units or no errors.

[Interactive dashboard](comparison.html) | [Paired differences CSV](language_unit_differences.csv)
