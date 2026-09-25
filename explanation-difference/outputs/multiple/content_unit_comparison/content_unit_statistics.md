# Exploratory content-unit-count significance tests

Pairwise on-topic matching: include a topic/model pair whenever both compared responses are on-topic, regardless of other conditions. Sample size varies by comparison. Seven topics and five fixed models are available. Ten contrasts: five target languages versus English with English prompts held fixed, and five native versus English prompts within the same response language. Positive differences mean condition A has more content units. These are not all 55 possible comparisons.

Two-sided exact paired sign tests test direction of differences (zero differences excluded); Holm adjustment controls multiplicity across the ten contrasts at alpha = 0.05, separately for each analysis. The pair-level analysis assumes independent topic/model pairs, which is questionable because topics and models recur. The topic-level sensitivity analysis first averages paired differences within each topic, then tests the seven topic-level differences, treating the five models as fixed. It avoids counting models within a topic as independent replications; topics still need to be regarded as independent for inference.

With seven topics, the smallest possible two-sided exact sign-test p is 0.015625; no contrast can survive Holm across ten tests at 0.05. Thus this sensitivity analysis has very limited power. Lack of significance does not demonstrate equality. The sign test ignores magnitude. These are exploratory, selected on-topic comparisons with one generation per cell, not evidence about all topics/models or explanation quality. Counts depend on LLM-proposed unit boundaries and labels; annotation reliability has not been established. More units do not necessarily imply better explanations.

| Comparison (A minus B) | Pairs | Non-tied pairs | Topics | Mean difference (units) | Median difference | Pair p | Pair Holm p | Topic p | Topic Holm p |
|---|---|---|---|---|---|---|---|---|---|
| Arabic vs English (English prompts) | 35 | 28 | 7 | -1.2 | -1.0 | 0.0871586 | 0.871586 | 0.125 | 1 |
| Arabic: native vs English prompt | 30 | 25 | 7 | 0.5 | 0.0 | 1 | 1 | 0.6875 | 1 |
| Bengali vs English (English prompts) | 35 | 29 | 7 | -0.8 | -1.0 | 0.264931 | 1 | 0.21875 | 1 |
| Bengali: native vs English prompt | 33 | 30 | 7 | -0.2 | 1.0 | 0.584665 | 1 | 1 | 1 |
| French vs English (English prompts) | 35 | 27 | 7 | -1.3 | -1.0 | 0.122078 | 0.976625 | 0.6875 | 1 |
| French: native vs English prompt | 35 | 27 | 7 | 0.4 | 0.0 | 0.442068 | 1 | 1 | 1 |
| Hindi vs English (English prompts) | 35 | 30 | 7 | -0.4 | -1.0 | 0.361595 | 1 | 0.125 | 1 |
| Hindi: native vs English prompt | 35 | 25 | 7 | 0.3 | 0.0 | 0.107752 | 0.969769 | 0.453125 | 1 |
| Tamil vs English (English prompts) | 35 | 29 | 7 | -0.6 | -1.0 | 0.136046 | 0.976625 | 0.125 | 1 |
| Tamil: native vs English prompt | 25 | 19 | 7 | 0.0 | 0.0 | 0.647606 | 1 | 1 | 1 |

Method reference: [NIST paired sign test](https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/signtest.htm).
