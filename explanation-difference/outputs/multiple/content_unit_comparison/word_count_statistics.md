# Exploratory word-count significance tests

Pairwise on-topic matching: include a topic/model pair whenever both compared responses are on-topic, regardless of other conditions. Sample size varies by comparison. Seven topics and five fixed models are available. Ten contrasts: five target languages versus English with English prompts held fixed, and five native versus English prompts within the same response language. Positive differences mean condition A is longer. These are not all 55 possible comparisons.

Two-sided exact paired sign tests test direction of differences (zero differences excluded); Holm adjustment controls multiplicity across the ten contrasts at alpha = 0.05, separately for each analysis. The pair-level analysis assumes independent topic/model pairs, which is questionable because topics and models recur. The topic-level sensitivity analysis first averages paired differences within each topic, then tests the seven topic-level differences, treating the five models as fixed. It avoids counting models within a topic as independent replications; topics still need to be regarded as independent for inference.

With seven topics, the smallest possible two-sided exact sign-test p is 0.015625; no contrast can survive Holm across ten tests at 0.05. Thus this sensitivity analysis has very limited power. Lack of significance does not demonstrate equality. The sign test ignores magnitude. These are exploratory, selected on-topic comparisons with one generation per cell, not evidence about all topics/models or explanation quality. Cross-language word counts are not equivalent information units.

| Comparison (A minus B) | Pairs | Non-tied pairs | Topics | Mean difference (words) | Median difference | Pair p | Pair Holm p | Topic p | Topic Holm p |
|---|---|---|---|---|---|---|---|---|---|
| Arabic vs English (English prompts) | 35 | 35 | 7 | -132.5 | -142.0 | 3.6729e-08 | 3.30561e-07 | 0.015625 | 0.15625 |
| Arabic: native vs English prompt | 30 | 29 | 7 | -16.9 | 2.5 | 1 | 1 | 1 | 1 |
| Bengali vs English (English prompts) | 35 | 35 | 7 | -147.3 | -163.0 | 4.17698e-07 | 3.34159e-06 | 0.015625 | 0.15625 |
| Bengali: native vs English prompt | 33 | 33 | 7 | 25.9 | 36.0 | 0.0801433 | 0.320573 | 0.453125 | 1 |
| French vs English (English prompts) | 35 | 35 | 7 | -61.1 | -68.0 | 0.000116842 | 0.000817893 | 0.015625 | 0.15625 |
| French: native vs English prompt | 35 | 35 | 7 | 46.8 | 54.0 | 0.0166738 | 0.0833692 | 0.015625 | 0.15625 |
| Hindi vs English (English prompts) | 35 | 35 | 7 | -64.4 | -79.0 | 0.00598812 | 0.0359287 | 0.015625 | 0.15625 |
| Hindi: native vs English prompt | 35 | 35 | 7 | 14.6 | 24.0 | 0.310505 | 0.931514 | 0.453125 | 1 |
| Tamil vs English (English prompts) | 35 | 35 | 7 | -190.9 | -214.0 | 2.09548e-09 | 2.09548e-08 | 0.015625 | 0.15625 |
| Tamil: native vs English prompt | 25 | 25 | 7 | -13.0 | -7.0 | 1 | 1 | 1 | 1 |

Method reference: [NIST paired sign test](https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/signtest.htm).
