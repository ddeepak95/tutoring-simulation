# On-topic content-unit comparison

368 on-topic responses included; 17 excluded. Counts are model annotations, not quality scores. Organizational passages do not count as units.

[Interactive comparison](comparison.html) | [Per-response CSV](responses.csv)

All tables show mean units per response. N is the number of included responses; unequal topic coverage can affect comparisons. Category means sum to total means before rounding.

Conditions use explicit prompt and response languages; native_prompt means both use the target language.

## Topic relevance and proposed errors by language

Off-topic rates use all responses. Error counts use on-topic responses only; skipped assessments are not error-free judgments. Errors are model proposals, counted per unit without global deduplication.

| Condition | All N | Off-topic | On-topic N | Responses with errors | Error records | Minor | Major |
|---|---|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 35 | 5/35 (14.3%) | 30 | 1/30 (3.3%) | 2 | 2 | 0 |
| Bengali prompt / Bengali response | 35 | 2/35 (5.7%) | 33 | 8/33 (24.2%) | 10 | 10 | 0 |
| English prompt / Arabic response | 35 | 0/35 (0.0%) | 35 | 4/35 (11.4%) | 6 | 4 | 2 |
| English prompt / Bengali response | 35 | 0/35 (0.0%) | 35 | 7/35 (20.0%) | 10 | 8 | 2 |
| English prompt / English response | 35 | 0/35 (0.0%) | 35 | 3/35 (8.6%) | 4 | 4 | 0 |
| English prompt / French response | 35 | 0/35 (0.0%) | 35 | 6/35 (17.1%) | 6 | 5 | 1 |
| English prompt / Hindi response | 35 | 0/35 (0.0%) | 35 | 4/35 (11.4%) | 6 | 4 | 2 |
| English prompt / Tamil response | 35 | 0/35 (0.0%) | 35 | 4/35 (11.4%) | 6 | 5 | 1 |
| French prompt / French response | 35 | 0/35 (0.0%) | 35 | 8/35 (22.9%) | 13 | 6 | 7 |
| Hindi prompt / Hindi response | 35 | 0/35 (0.0%) | 35 | 3/35 (8.6%) | 7 | 4 | 3 |
| Tamil prompt / Tamil response | 35 | 10/35 (28.6%) | 25 | 4/25 (16.0%) | 8 | 5 | 3 |

[Per-response relevance and accuracy CSV](quality.csv)

## Language comparison: matched topic-model combinations

| condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 24 | 8.67 | 3.83 | 2.96 | 0.33 | 0.29 | 1.12 | 0.12 | 0.00 |
| Bengali prompt / Bengali response | 24 | 8.25 | 3.38 | 3.00 | 0.50 | 0.21 | 1.12 | 0.04 | 0.00 |
| English prompt / Arabic response | 24 | 8.42 | 3.62 | 2.96 | 0.38 | 0.33 | 1.00 | 0.12 | 0.00 |
| English prompt / Bengali response | 24 | 8.88 | 4.08 | 3.29 | 0.21 | 0.17 | 1.04 | 0.08 | 0.00 |
| English prompt / English response | 24 | 9.75 | 3.96 | 3.33 | 0.62 | 0.42 | 1.21 | 0.21 | 0.00 |
| English prompt / French response | 24 | 8.33 | 3.88 | 2.83 | 0.38 | 0.33 | 0.75 | 0.17 | 0.00 |
| English prompt / Hindi response | 24 | 9.08 | 3.96 | 3.12 | 0.33 | 0.17 | 1.33 | 0.17 | 0.00 |
| English prompt / Tamil response | 24 | 8.71 | 3.58 | 3.46 | 0.29 | 0.12 | 1.17 | 0.08 | 0.00 |
| French prompt / French response | 24 | 8.50 | 3.58 | 2.71 | 0.50 | 0.42 | 1.08 | 0.21 | 0.00 |
| Hindi prompt / Hindi response | 24 | 9.25 | 3.92 | 3.54 | 0.38 | 0.17 | 1.17 | 0.08 | 0.00 |
| Tamil prompt / Tamil response | 24 | 8.71 | 3.75 | 3.21 | 0.38 | 0.12 | 0.96 | 0.29 | 0.00 |

Matched comparisons use the same topic and model in all 11 conditions. Comparing English-prompt conditions keeps prompt language fixed while output language varies. Comparing native-prompt conditions with English/English changes both prompt and output language. These are descriptive single-response comparisons, not significance tests.

## Language comparison: all on-topic responses

| condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 30 | 8.83 | 3.90 | 3.13 | 0.27 | 0.27 | 1.03 | 0.23 | 0.00 |
| Bengali prompt / Bengali response | 33 | 8.27 | 3.70 | 2.73 | 0.39 | 0.18 | 1.18 | 0.09 | 0.00 |
| English prompt / Arabic response | 35 | 7.83 | 3.57 | 2.69 | 0.26 | 0.29 | 0.89 | 0.14 | 0.00 |
| English prompt / Bengali response | 35 | 8.23 | 3.97 | 2.89 | 0.20 | 0.14 | 0.94 | 0.09 | 0.00 |
| English prompt / English response | 35 | 9.00 | 3.86 | 3.06 | 0.46 | 0.31 | 1.11 | 0.20 | 0.00 |
| English prompt / French response | 35 | 7.71 | 3.60 | 2.66 | 0.34 | 0.23 | 0.74 | 0.14 | 0.00 |
| English prompt / Hindi response | 35 | 8.57 | 3.94 | 2.83 | 0.29 | 0.17 | 1.17 | 0.17 | 0.00 |
| English prompt / Tamil response | 35 | 8.43 | 3.63 | 3.26 | 0.23 | 0.11 | 1.03 | 0.17 | 0.00 |
| French prompt / French response | 35 | 8.11 | 3.51 | 2.54 | 0.43 | 0.37 | 1.03 | 0.23 | 0.00 |
| Hindi prompt / Hindi response | 35 | 8.86 | 3.77 | 3.31 | 0.40 | 0.14 | 1.14 | 0.09 | 0.00 |
| Tamil prompt / Tamil response | 25 | 8.56 | 3.68 | 3.16 | 0.36 | 0.12 | 0.96 | 0.28 | 0.00 |

## Language comparison by topic (matched combinations)

| topic | condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| alkaline earth metals | Arabic prompt / Arabic response | 3 | 9.33 | 6.33 | 1.67 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | Bengali prompt / Bengali response | 3 | 8.33 | 3.00 | 4.00 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / Arabic response | 3 | 9.00 | 4.67 | 3.33 | 0.33 | 0.00 | 0.67 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / Bengali response | 3 | 9.33 | 6.33 | 2.00 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / English response | 3 | 10.33 | 4.67 | 3.67 | 0.67 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / French response | 3 | 8.33 | 4.67 | 3.33 | 0.00 | 0.00 | 0.33 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / Hindi response | 3 | 10.33 | 4.67 | 4.33 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / Tamil response | 3 | 11.00 | 5.00 | 4.67 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | French prompt / French response | 3 | 7.33 | 3.67 | 3.00 | 0.33 | 0.00 | 0.33 | 0.00 | 0.00 |
| alkaline earth metals | Hindi prompt / Hindi response | 3 | 8.67 | 3.00 | 4.33 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | Tamil prompt / Tamil response | 3 | 14.33 | 8.00 | 4.33 | 0.00 | 0.00 | 0.67 | 1.33 | 0.00 |
| covalent radius | Arabic prompt / Arabic response | 4 | 5.00 | 3.25 | 0.75 | 0.00 | 0.00 | 0.50 | 0.50 | 0.00 |
| covalent radius | Bengali prompt / Bengali response | 4 | 5.50 | 3.00 | 1.50 | 0.25 | 0.00 | 0.75 | 0.00 | 0.00 |
| covalent radius | English prompt / Arabic response | 4 | 4.75 | 3.00 | 1.00 | 0.25 | 0.00 | 0.25 | 0.25 | 0.00 |
| covalent radius | English prompt / Bengali response | 4 | 6.00 | 3.25 | 1.50 | 0.25 | 0.00 | 0.50 | 0.50 | 0.00 |
| covalent radius | English prompt / English response | 4 | 5.75 | 2.75 | 1.50 | 0.25 | 0.00 | 1.00 | 0.25 | 0.00 |
| covalent radius | English prompt / French response | 4 | 6.00 | 4.00 | 1.25 | 0.00 | 0.00 | 0.50 | 0.25 | 0.00 |
| covalent radius | English prompt / Hindi response | 4 | 5.25 | 2.25 | 1.25 | 0.25 | 0.00 | 1.00 | 0.50 | 0.00 |
| covalent radius | English prompt / Tamil response | 4 | 4.50 | 2.25 | 1.50 | 0.25 | 0.00 | 0.25 | 0.25 | 0.00 |
| covalent radius | French prompt / French response | 4 | 5.75 | 3.00 | 1.00 | 0.25 | 0.25 | 0.75 | 0.50 | 0.00 |
| covalent radius | Hindi prompt / Hindi response | 4 | 6.50 | 4.00 | 1.25 | 0.25 | 0.00 | 0.50 | 0.50 | 0.00 |
| covalent radius | Tamil prompt / Tamil response | 4 | 5.50 | 2.50 | 1.00 | 0.50 | 0.00 | 0.75 | 0.75 | 0.00 |
| isotope | Arabic prompt / Arabic response | 1 | 4.00 | 2.00 | 1.00 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | Bengali prompt / Bengali response | 1 | 8.00 | 1.00 | 4.00 | 1.00 | 0.00 | 2.00 | 0.00 | 0.00 |
| isotope | English prompt / Arabic response | 1 | 8.00 | 2.00 | 4.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | English prompt / Bengali response | 1 | 9.00 | 2.00 | 4.00 | 1.00 | 0.00 | 2.00 | 0.00 | 0.00 |
| isotope | English prompt / English response | 1 | 8.00 | 2.00 | 4.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | English prompt / French response | 1 | 9.00 | 3.00 | 4.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | English prompt / Hindi response | 1 | 10.00 | 3.00 | 5.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | English prompt / Tamil response | 1 | 8.00 | 4.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | French prompt / French response | 1 | 9.00 | 3.00 | 4.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | Hindi prompt / Hindi response | 1 | 11.00 | 3.00 | 6.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | Tamil prompt / Tamil response | 1 | 10.00 | 3.00 | 5.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| mole concept | Arabic prompt / Arabic response | 5 | 8.60 | 3.80 | 3.00 | 0.80 | 0.00 | 1.00 | 0.00 | 0.00 |
| mole concept | Bengali prompt / Bengali response | 5 | 8.80 | 4.00 | 2.80 | 1.00 | 0.40 | 0.60 | 0.00 | 0.00 |
| mole concept | English prompt / Arabic response | 5 | 11.20 | 5.00 | 4.40 | 0.20 | 0.40 | 1.00 | 0.20 | 0.00 |
| mole concept | English prompt / Bengali response | 5 | 12.00 | 5.60 | 4.80 | 0.40 | 0.00 | 1.20 | 0.00 | 0.00 |
| mole concept | English prompt / English response | 5 | 12.40 | 4.80 | 4.80 | 1.20 | 0.40 | 1.00 | 0.20 | 0.00 |
| mole concept | English prompt / French response | 5 | 9.60 | 5.00 | 2.80 | 0.80 | 0.20 | 0.60 | 0.20 | 0.00 |
| mole concept | English prompt / Hindi response | 5 | 12.20 | 5.80 | 3.80 | 0.60 | 0.00 | 1.60 | 0.40 | 0.00 |
| mole concept | English prompt / Tamil response | 5 | 10.40 | 4.00 | 4.00 | 0.60 | 0.20 | 1.40 | 0.20 | 0.00 |
| mole concept | French prompt / French response | 5 | 9.00 | 4.20 | 3.00 | 0.60 | 0.00 | 1.00 | 0.20 | 0.00 |
| mole concept | Hindi prompt / Hindi response | 5 | 10.40 | 4.80 | 4.00 | 0.60 | 0.00 | 1.00 | 0.00 | 0.00 |
| mole concept | Tamil prompt / Tamil response | 5 | 9.00 | 4.20 | 3.00 | 0.60 | 0.20 | 1.00 | 0.00 | 0.00 |
| redox reactions | Arabic prompt / Arabic response | 5 | 11.20 | 4.00 | 5.20 | 0.20 | 0.20 | 1.60 | 0.00 | 0.00 |
| redox reactions | Bengali prompt / Bengali response | 5 | 10.60 | 3.40 | 5.40 | 0.20 | 0.00 | 1.60 | 0.00 | 0.00 |
| redox reactions | English prompt / Arabic response | 5 | 8.60 | 3.60 | 2.80 | 0.20 | 0.20 | 1.80 | 0.00 | 0.00 |
| redox reactions | English prompt / Bengali response | 5 | 11.00 | 4.00 | 5.80 | 0.00 | 0.00 | 1.20 | 0.00 | 0.00 |
| redox reactions | English prompt / English response | 5 | 12.00 | 4.00 | 5.40 | 0.20 | 0.20 | 2.00 | 0.20 | 0.00 |
| redox reactions | English prompt / French response | 5 | 9.20 | 3.20 | 4.60 | 0.00 | 0.40 | 1.00 | 0.00 | 0.00 |
| redox reactions | English prompt / Hindi response | 5 | 10.20 | 4.00 | 4.20 | 0.20 | 0.00 | 1.80 | 0.00 | 0.00 |
| redox reactions | English prompt / Tamil response | 5 | 11.20 | 4.00 | 5.40 | 0.00 | 0.00 | 1.80 | 0.00 | 0.00 |
| redox reactions | French prompt / French response | 5 | 11.40 | 3.80 | 4.20 | 0.20 | 0.80 | 2.20 | 0.20 | 0.00 |
| redox reactions | Hindi prompt / Hindi response | 5 | 11.80 | 4.40 | 5.20 | 0.40 | 0.00 | 1.80 | 0.00 | 0.00 |
| redox reactions | Tamil prompt / Tamil response | 5 | 9.40 | 3.20 | 4.60 | 0.20 | 0.00 | 1.40 | 0.00 | 0.00 |
| stoichiometry | Arabic prompt / Arabic response | 5 | 10.00 | 3.60 | 3.80 | 0.40 | 1.00 | 1.20 | 0.00 | 0.00 |
| stoichiometry | Bengali prompt / Bengali response | 5 | 8.00 | 4.20 | 1.40 | 0.60 | 0.60 | 1.20 | 0.00 | 0.00 |
| stoichiometry | English prompt / Arabic response | 5 | 8.80 | 3.00 | 3.00 | 0.60 | 1.00 | 1.00 | 0.20 | 0.00 |
| stoichiometry | English prompt / Bengali response | 5 | 6.20 | 2.80 | 1.60 | 0.20 | 0.60 | 1.00 | 0.00 | 0.00 |
| stoichiometry | English prompt / English response | 5 | 8.60 | 4.40 | 1.20 | 0.60 | 1.20 | 0.80 | 0.40 | 0.00 |
| stoichiometry | English prompt / French response | 5 | 8.60 | 3.60 | 2.00 | 0.60 | 1.00 | 1.00 | 0.40 | 0.00 |
| stoichiometry | English prompt / Hindi response | 5 | 7.80 | 3.60 | 2.00 | 0.20 | 0.80 | 1.20 | 0.00 | 0.00 |
| stoichiometry | English prompt / Tamil response | 5 | 7.40 | 3.20 | 2.40 | 0.40 | 0.40 | 1.00 | 0.00 | 0.00 |
| stoichiometry | French prompt / French response | 5 | 8.60 | 3.80 | 2.00 | 0.80 | 1.00 | 0.80 | 0.20 | 0.00 |
| stoichiometry | Hindi prompt / Hindi response | 5 | 8.20 | 3.60 | 2.60 | 0.20 | 0.60 | 1.20 | 0.00 | 0.00 |
| stoichiometry | Tamil prompt / Tamil response | 5 | 7.40 | 3.00 | 3.00 | 0.20 | 0.40 | 0.80 | 0.00 | 0.00 |
| vapour phase refining | Arabic prompt / Arabic response | 1 | 7.00 | 1.00 | 2.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0.00 |
| vapour phase refining | Bengali prompt / Bengali response | 1 | 6.00 | 1.00 | 2.00 | 1.00 | 0.00 | 1.00 | 1.00 | 0.00 |
| vapour phase refining | English prompt / Arabic response | 1 | 5.00 | 1.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | English prompt / Bengali response | 1 | 6.00 | 2.00 | 2.00 | 0.00 | 1.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | English prompt / English response | 1 | 7.00 | 2.00 | 2.00 | 1.00 | 1.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | English prompt / French response | 1 | 5.00 | 1.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | English prompt / Hindi response | 1 | 5.00 | 2.00 | 2.00 | 1.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| vapour phase refining | English prompt / Tamil response | 1 | 5.00 | 2.00 | 2.00 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | French prompt / French response | 1 | 5.00 | 1.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | Hindi prompt / Hindi response | 1 | 7.00 | 2.00 | 2.00 | 1.00 | 1.00 | 1.00 | 0.00 | 0.00 |
| vapour phase refining | Tamil prompt / Tamil response | 1 | 5.00 | 1.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |

## Language comparison by model (matched combinations)

| model | condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | Arabic prompt / Arabic response | 4 | 8.25 | 4.50 | 2.00 | 0.25 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | Bengali prompt / Bengali response | 4 | 9.25 | 4.00 | 3.00 | 0.50 | 0.25 | 1.50 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Arabic response | 4 | 9.50 | 4.00 | 2.75 | 0.50 | 0.50 | 1.75 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Bengali response | 4 | 10.75 | 5.50 | 3.00 | 0.50 | 0.00 | 1.75 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / English response | 4 | 11.00 | 5.25 | 3.25 | 1.00 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / French response | 4 | 9.25 | 4.25 | 3.50 | 0.25 | 0.25 | 0.75 | 0.25 | 0.00 |
| claude-sonnet-5 | English prompt / Hindi response | 4 | 11.50 | 6.00 | 4.00 | 0.00 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Tamil response | 4 | 10.50 | 4.25 | 3.25 | 0.25 | 0.25 | 2.50 | 0.00 | 0.00 |
| claude-sonnet-5 | French prompt / French response | 4 | 8.00 | 4.00 | 1.75 | 0.75 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | Hindi prompt / Hindi response | 4 | 9.75 | 4.25 | 3.75 | 0.00 | 0.25 | 1.50 | 0.00 | 0.00 |
| claude-sonnet-5 | Tamil prompt / Tamil response | 4 | 10.00 | 4.25 | 4.00 | 0.25 | 0.25 | 1.25 | 0.00 | 0.00 |
| gemini-3.8-flash | Arabic prompt / Arabic response | 7 | 7.71 | 3.14 | 2.29 | 0.57 | 0.29 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | Bengali prompt / Bengali response | 7 | 8.29 | 2.71 | 3.00 | 0.86 | 0.14 | 1.43 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / Arabic response | 7 | 7.43 | 3.14 | 2.29 | 0.86 | 0.14 | 1.00 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Bengali response | 7 | 7.57 | 3.00 | 2.71 | 0.43 | 0.29 | 1.00 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / English response | 7 | 8.86 | 3.14 | 3.14 | 1.00 | 0.29 | 1.14 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / French response | 7 | 7.00 | 3.00 | 2.14 | 0.57 | 0.14 | 1.14 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Hindi response | 7 | 8.43 | 2.86 | 3.43 | 0.86 | 0.14 | 1.14 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Tamil response | 7 | 8.00 | 3.00 | 3.00 | 0.57 | 0.00 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | French prompt / French response | 7 | 7.00 | 2.71 | 2.00 | 0.71 | 0.29 | 1.00 | 0.29 | 0.00 |
| gemini-3.8-flash | Hindi prompt / Hindi response | 7 | 9.57 | 3.00 | 3.86 | 1.00 | 0.29 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | Tamil prompt / Tamil response | 7 | 7.43 | 2.29 | 3.00 | 0.71 | 0.29 | 1.14 | 0.00 | 0.00 |
| gpt-5.6-terra | Arabic prompt / Arabic response | 4 | 13.75 | 6.00 | 5.00 | 0.50 | 0.50 | 1.50 | 0.25 | 0.00 |
| gpt-5.6-terra | Bengali prompt / Bengali response | 4 | 10.50 | 5.25 | 3.50 | 0.00 | 0.25 | 1.50 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / Arabic response | 4 | 13.25 | 5.25 | 4.50 | 0.25 | 1.00 | 1.50 | 0.75 | 0.00 |
| gpt-5.6-terra | English prompt / Bengali response | 4 | 13.25 | 6.00 | 5.25 | 0.00 | 0.25 | 1.75 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / English response | 4 | 13.50 | 5.00 | 4.75 | 0.50 | 0.75 | 1.50 | 1.00 | 0.00 |
| gpt-5.6-terra | English prompt / French response | 4 | 12.75 | 5.25 | 4.50 | 0.50 | 0.75 | 1.00 | 0.75 | 0.00 |
| gpt-5.6-terra | English prompt / Hindi response | 4 | 12.75 | 5.50 | 3.75 | 0.25 | 0.25 | 2.25 | 0.75 | 0.00 |
| gpt-5.6-terra | English prompt / Tamil response | 4 | 13.00 | 5.50 | 5.50 | 0.25 | 0.25 | 1.25 | 0.25 | 0.00 |
| gpt-5.6-terra | French prompt / French response | 4 | 11.50 | 4.75 | 3.75 | 0.25 | 0.75 | 1.50 | 0.50 | 0.00 |
| gpt-5.6-terra | Hindi prompt / Hindi response | 4 | 12.50 | 6.00 | 4.50 | 0.25 | 0.25 | 1.50 | 0.00 | 0.00 |
| gpt-5.6-terra | Tamil prompt / Tamil response | 4 | 11.25 | 4.50 | 4.25 | 0.50 | 0.00 | 1.25 | 0.75 | 0.00 |
| grok-4.3 | Arabic prompt / Arabic response | 4 | 9.00 | 3.25 | 4.00 | 0.25 | 0.25 | 1.00 | 0.25 | 0.00 |
| grok-4.3 | Bengali prompt / Bengali response | 4 | 8.75 | 3.25 | 3.25 | 0.50 | 0.50 | 1.25 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Arabic response | 4 | 7.00 | 3.25 | 3.00 | 0.00 | 0.00 | 0.75 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Bengali response | 4 | 8.50 | 3.50 | 3.75 | 0.00 | 0.25 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | English prompt / English response | 4 | 9.50 | 3.75 | 3.50 | 0.50 | 0.50 | 1.25 | 0.00 | 0.00 |
| grok-4.3 | English prompt / French response | 4 | 8.00 | 4.00 | 3.00 | 0.50 | 0.25 | 0.25 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Hindi response | 4 | 8.50 | 3.50 | 3.25 | 0.25 | 0.00 | 1.25 | 0.25 | 0.00 |
| grok-4.3 | English prompt / Tamil response | 4 | 8.00 | 3.00 | 3.75 | 0.25 | 0.25 | 0.75 | 0.00 | 0.00 |
| grok-4.3 | French prompt / French response | 4 | 11.00 | 4.25 | 4.50 | 0.50 | 0.25 | 1.25 | 0.25 | 0.00 |
| grok-4.3 | Hindi prompt / Hindi response | 4 | 9.75 | 3.75 | 4.50 | 0.25 | 0.00 | 1.00 | 0.25 | 0.00 |
| grok-4.3 | Tamil prompt / Tamil response | 4 | 8.75 | 3.50 | 4.00 | 0.25 | 0.00 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | Arabic prompt / Arabic response | 5 | 6.00 | 3.00 | 2.20 | 0.00 | 0.20 | 0.60 | 0.00 | 0.00 |
| llama-4-maverick | Bengali prompt / Bengali response | 5 | 5.20 | 2.40 | 2.40 | 0.40 | 0.00 | 0.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Arabic response | 5 | 6.20 | 3.00 | 2.80 | 0.00 | 0.20 | 0.20 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Bengali response | 5 | 6.00 | 3.40 | 2.40 | 0.00 | 0.00 | 0.00 | 0.20 | 0.00 |
| llama-4-maverick | English prompt / English response | 5 | 7.20 | 3.40 | 2.40 | 0.00 | 0.40 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / French response | 5 | 6.20 | 3.60 | 1.80 | 0.00 | 0.40 | 0.40 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Hindi response | 5 | 5.60 | 3.00 | 1.40 | 0.00 | 0.20 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Tamil response | 5 | 5.40 | 2.80 | 2.40 | 0.00 | 0.00 | 0.20 | 0.00 | 0.00 |
| llama-4-maverick | French prompt / French response | 5 | 6.60 | 3.00 | 2.20 | 0.20 | 0.60 | 0.60 | 0.00 | 0.00 |
| llama-4-maverick | Hindi prompt / Hindi response | 5 | 5.40 | 3.40 | 1.40 | 0.00 | 0.00 | 0.60 | 0.00 | 0.00 |
| llama-4-maverick | Tamil prompt / Tamil response | 5 | 7.40 | 5.00 | 1.40 | 0.00 | 0.00 | 0.20 | 0.80 | 0.00 |

## All on-topic responses: model and condition

| model | condition | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | Arabic prompt / Arabic response | 6 | 8.17 | 4.17 | 2.50 | 0.17 | 0.33 | 0.83 | 0.17 | 0.00 |
| claude-sonnet-5 | Bengali prompt / Bengali response | 7 | 7.86 | 3.29 | 2.43 | 0.29 | 0.14 | 1.57 | 0.14 | 0.00 |
| claude-sonnet-5 | English prompt / Arabic response | 7 | 8.29 | 3.71 | 2.29 | 0.29 | 0.43 | 1.57 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Bengali response | 7 | 8.71 | 4.14 | 2.57 | 0.57 | 0.00 | 1.43 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / English response | 7 | 9.00 | 4.29 | 2.57 | 0.71 | 0.14 | 1.29 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / French response | 7 | 7.71 | 3.57 | 2.57 | 0.43 | 0.14 | 0.86 | 0.14 | 0.00 |
| claude-sonnet-5 | English prompt / Hindi response | 7 | 9.29 | 4.43 | 3.14 | 0.29 | 0.14 | 1.29 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Tamil response | 7 | 8.71 | 3.57 | 2.57 | 0.29 | 0.14 | 1.86 | 0.29 | 0.00 |
| claude-sonnet-5 | French prompt / French response | 7 | 7.43 | 3.57 | 1.71 | 0.71 | 0.29 | 0.86 | 0.29 | 0.00 |
| claude-sonnet-5 | Hindi prompt / Hindi response | 7 | 8.86 | 3.43 | 3.57 | 0.43 | 0.14 | 1.29 | 0.00 | 0.00 |
| claude-sonnet-5 | Tamil prompt / Tamil response | 4 | 10.00 | 4.25 | 4.00 | 0.25 | 0.25 | 1.25 | 0.00 | 0.00 |
| gemini-3.8-flash | Arabic prompt / Arabic response | 7 | 7.71 | 3.14 | 2.29 | 0.57 | 0.29 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | Bengali prompt / Bengali response | 7 | 8.29 | 2.71 | 3.00 | 0.86 | 0.14 | 1.43 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / Arabic response | 7 | 7.43 | 3.14 | 2.29 | 0.86 | 0.14 | 1.00 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Bengali response | 7 | 7.57 | 3.00 | 2.71 | 0.43 | 0.29 | 1.00 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / English response | 7 | 8.86 | 3.14 | 3.14 | 1.00 | 0.29 | 1.14 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / French response | 7 | 7.00 | 3.00 | 2.14 | 0.57 | 0.14 | 1.14 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Hindi response | 7 | 8.43 | 2.86 | 3.43 | 0.86 | 0.14 | 1.14 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Tamil response | 7 | 8.00 | 3.00 | 3.00 | 0.57 | 0.00 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | French prompt / French response | 7 | 7.00 | 2.71 | 2.00 | 0.71 | 0.29 | 1.00 | 0.29 | 0.00 |
| gemini-3.8-flash | Hindi prompt / Hindi response | 7 | 9.57 | 3.00 | 3.86 | 1.00 | 0.29 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | Tamil prompt / Tamil response | 7 | 7.43 | 2.29 | 3.00 | 0.71 | 0.29 | 1.14 | 0.00 | 0.00 |
| gpt-5.6-terra | Arabic prompt / Arabic response | 5 | 14.20 | 6.80 | 4.80 | 0.40 | 0.40 | 1.40 | 0.40 | 0.00 |
| gpt-5.6-terra | Bengali prompt / Bengali response | 7 | 11.14 | 6.00 | 3.14 | 0.00 | 0.29 | 1.57 | 0.14 | 0.00 |
| gpt-5.6-terra | English prompt / Arabic response | 7 | 11.29 | 4.86 | 3.86 | 0.14 | 0.57 | 1.29 | 0.57 | 0.00 |
| gpt-5.6-terra | English prompt / Bengali response | 7 | 11.57 | 6.00 | 3.86 | 0.00 | 0.29 | 1.43 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / English response | 7 | 11.71 | 5.14 | 3.86 | 0.29 | 0.43 | 1.14 | 0.86 | 0.00 |
| gpt-5.6-terra | English prompt / French response | 7 | 10.57 | 4.86 | 3.57 | 0.29 | 0.43 | 0.86 | 0.57 | 0.00 |
| gpt-5.6-terra | English prompt / Hindi response | 7 | 11.57 | 5.86 | 3.14 | 0.14 | 0.14 | 1.71 | 0.57 | 0.00 |
| gpt-5.6-terra | English prompt / Tamil response | 7 | 12.00 | 6.14 | 4.14 | 0.14 | 0.14 | 1.14 | 0.29 | 0.00 |
| gpt-5.6-terra | French prompt / French response | 7 | 10.14 | 4.43 | 3.29 | 0.14 | 0.57 | 1.29 | 0.43 | 0.00 |
| gpt-5.6-terra | Hindi prompt / Hindi response | 7 | 11.29 | 5.71 | 3.57 | 0.29 | 0.29 | 1.43 | 0.00 | 0.00 |
| gpt-5.6-terra | Tamil prompt / Tamil response | 4 | 11.25 | 4.50 | 4.25 | 0.50 | 0.00 | 1.25 | 0.75 | 0.00 |
| grok-4.3 | Arabic prompt / Arabic response | 6 | 9.67 | 3.33 | 4.50 | 0.17 | 0.17 | 1.00 | 0.50 | 0.00 |
| grok-4.3 | Bengali prompt / Bengali response | 6 | 8.50 | 3.83 | 2.67 | 0.50 | 0.33 | 1.17 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Arabic response | 7 | 6.57 | 3.29 | 2.71 | 0.00 | 0.00 | 0.43 | 0.14 | 0.00 |
| grok-4.3 | English prompt / Bengali response | 7 | 8.29 | 3.86 | 3.29 | 0.00 | 0.14 | 0.86 | 0.14 | 0.00 |
| grok-4.3 | English prompt / English response | 7 | 8.29 | 3.43 | 3.14 | 0.29 | 0.43 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | English prompt / French response | 7 | 7.57 | 3.57 | 3.00 | 0.43 | 0.14 | 0.43 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Hindi response | 7 | 8.14 | 3.71 | 3.00 | 0.14 | 0.14 | 0.86 | 0.29 | 0.00 |
| grok-4.3 | English prompt / Tamil response | 7 | 7.86 | 3.00 | 3.71 | 0.14 | 0.29 | 0.57 | 0.14 | 0.00 |
| grok-4.3 | French prompt / French response | 7 | 9.29 | 3.86 | 3.43 | 0.43 | 0.14 | 1.29 | 0.14 | 0.00 |
| grok-4.3 | Hindi prompt / Hindi response | 7 | 8.86 | 3.43 | 3.71 | 0.29 | 0.00 | 1.14 | 0.29 | 0.00 |
| grok-4.3 | Tamil prompt / Tamil response | 5 | 8.00 | 3.20 | 3.60 | 0.20 | 0.00 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | Arabic prompt / Arabic response | 6 | 5.50 | 2.67 | 2.00 | 0.00 | 0.17 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | Bengali prompt / Bengali response | 6 | 5.17 | 2.50 | 2.33 | 0.33 | 0.00 | 0.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Arabic response | 7 | 5.57 | 2.86 | 2.29 | 0.00 | 0.29 | 0.14 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Bengali response | 7 | 5.00 | 2.86 | 2.00 | 0.00 | 0.00 | 0.00 | 0.14 | 0.00 |
| llama-4-maverick | English prompt / English response | 7 | 7.14 | 3.29 | 2.57 | 0.00 | 0.29 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / French response | 7 | 5.71 | 3.00 | 2.00 | 0.00 | 0.29 | 0.43 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Hindi response | 7 | 5.43 | 2.86 | 1.43 | 0.00 | 0.29 | 0.86 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Tamil response | 7 | 5.57 | 2.43 | 2.86 | 0.00 | 0.00 | 0.29 | 0.00 | 0.00 |
| llama-4-maverick | French prompt / French response | 7 | 6.71 | 3.00 | 2.29 | 0.14 | 0.57 | 0.71 | 0.00 | 0.00 |
| llama-4-maverick | Hindi prompt / Hindi response | 7 | 5.71 | 3.29 | 1.86 | 0.00 | 0.00 | 0.57 | 0.00 | 0.00 |
| llama-4-maverick | Tamil prompt / Tamil response | 5 | 7.40 | 5.00 | 1.40 | 0.00 | 0.00 | 0.20 | 0.80 | 0.00 |

## All on-topic responses: topic

| topic | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| alkaline earth metals | 53 | 11.08 | 6.43 | 3.28 | 0.08 | 0.00 | 1.00 | 0.28 | 0.00 |
| covalent radius | 54 | 5.67 | 3.04 | 1.26 | 0.28 | 0.04 | 0.67 | 0.39 | 0.00 |
| isotope | 50 | 7.08 | 2.68 | 3.14 | 0.34 | 0.02 | 0.86 | 0.04 | 0.00 |
| mole concept | 55 | 10.33 | 4.65 | 3.67 | 0.67 | 0.16 | 1.04 | 0.13 | 0.00 |
| redox reactions | 55 | 10.60 | 3.78 | 4.80 | 0.16 | 0.16 | 1.65 | 0.04 | 0.00 |
| stoichiometry | 55 | 8.15 | 3.53 | 2.27 | 0.44 | 0.78 | 1.02 | 0.11 | 0.00 |
| vapour phase refining | 46 | 5.26 | 1.72 | 1.87 | 0.33 | 0.33 | 0.87 | 0.15 | 0.00 |

## Word-count comparison

Whitespace-separated chunks containing at least one Unicode letter or number, after removing Markdown formatting and link destinations. Headings, tables, code and equations are included; equation notation is counted as written. Counts are descriptive length measures, not equivalent information units across languages.

Uses the same on-topic coverage as the content comparison. N counts responses.

### Matched topic-model combinations

| Condition | N | Mean words | Median words | Min | Max |
|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 24 | 345.8 | 306.5 | 60 | 684 |
| Bengali prompt / Bengali response | 24 | 369.0 | 339.0 | 125 | 745 |
| English prompt / Arabic response | 24 | 361.9 | 355.0 | 78 | 718 |
| English prompt / Bengali response | 24 | 354.1 | 345.0 | 154 | 585 |
| English prompt / English response | 24 | 514.5 | 522.5 | 263 | 787 |
| English prompt / French response | 24 | 444.6 | 468.5 | 203 | 888 |
| English prompt / Hindi response | 24 | 422.3 | 383.0 | 223 | 795 |
| English prompt / Tamil response | 24 | 292.4 | 284.0 | 129 | 531 |
| French prompt / French response | 24 | 483.9 | 454.5 | 247 | 846 |
| Hindi prompt / Hindi response | 24 | 441.0 | 409.5 | 269 | 687 |
| Tamil prompt / Tamil response | 24 | 274.8 | 264.5 | 128 | 411 |

### All on-topic responses

| Condition | N | Mean words | Median words | Min | Max |
|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 30 | 330.6 | 287.0 | 60 | 684 |
| Bengali prompt / Bengali response | 33 | 352.3 | 337.0 | 125 | 745 |
| English prompt / Arabic response | 35 | 332.9 | 299.0 | 78 | 718 |
| English prompt / Bengali response | 35 | 318.1 | 300.0 | 124 | 585 |
| English prompt / English response | 35 | 465.4 | 466.0 | 145 | 787 |
| English prompt / French response | 35 | 404.3 | 363.0 | 203 | 888 |
| English prompt / Hindi response | 35 | 401.0 | 364.0 | 214 | 795 |
| English prompt / Tamil response | 35 | 274.5 | 260.0 | 129 | 539 |
| French prompt / French response | 35 | 451.1 | 404.0 | 247 | 846 |
| Hindi prompt / Hindi response | 35 | 415.5 | 398.0 | 238 | 687 |
| Tamil prompt / Tamil response | 25 | 274.8 | 275.0 | 128 | 411 |

## Matched coverage

Topics with every model/condition combination on-topic: mole concept, redox reactions, stoichiometry.

## Matched topics only: model and condition

| model | condition | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | Arabic prompt / Arabic response | 3 | 8.00 | 3.33 | 2.67 | 0.33 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | Bengali prompt / Bengali response | 3 | 9.67 | 4.33 | 3.00 | 0.67 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Arabic response | 3 | 9.67 | 3.33 | 3.00 | 0.67 | 0.67 | 2.00 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Bengali response | 3 | 10.33 | 4.33 | 3.67 | 0.67 | 0.00 | 1.67 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / English response | 3 | 10.67 | 5.00 | 3.00 | 1.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / French response | 3 | 9.33 | 3.67 | 3.67 | 0.33 | 0.33 | 1.00 | 0.33 | 0.00 |
| claude-sonnet-5 | English prompt / Hindi response | 3 | 10.00 | 5.00 | 3.33 | 0.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Tamil response | 3 | 9.67 | 3.67 | 2.67 | 0.33 | 0.33 | 2.67 | 0.00 | 0.00 |
| claude-sonnet-5 | French prompt / French response | 3 | 7.67 | 3.67 | 1.33 | 0.67 | 0.33 | 1.67 | 0.00 | 0.00 |
| claude-sonnet-5 | Hindi prompt / Hindi response | 3 | 9.00 | 4.33 | 3.00 | 0.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | Tamil prompt / Tamil response | 3 | 9.67 | 4.33 | 3.33 | 0.33 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | Arabic prompt / Arabic response | 3 | 9.33 | 3.33 | 3.33 | 1.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | Bengali prompt / Bengali response | 3 | 9.67 | 3.33 | 3.67 | 1.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Arabic response | 3 | 7.67 | 3.33 | 2.00 | 0.67 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Bengali response | 3 | 8.00 | 3.67 | 2.67 | 0.33 | 0.33 | 1.00 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / English response | 3 | 9.67 | 3.00 | 3.67 | 1.00 | 0.33 | 1.33 | 0.33 | 0.00 |
| gemini-3.8-flash | English prompt / French response | 3 | 7.33 | 3.33 | 1.67 | 0.67 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Hindi response | 3 | 10.00 | 3.00 | 4.33 | 1.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / Tamil response | 3 | 9.67 | 3.00 | 4.33 | 0.67 | 0.00 | 1.67 | 0.00 | 0.00 |
| gemini-3.8-flash | French prompt / French response | 3 | 8.00 | 3.00 | 2.00 | 0.67 | 0.67 | 1.00 | 0.67 | 0.00 |
| gemini-3.8-flash | Hindi prompt / Hindi response | 3 | 11.67 | 3.33 | 5.00 | 1.33 | 0.33 | 1.67 | 0.00 | 0.00 |
| gemini-3.8-flash | Tamil prompt / Tamil response | 3 | 7.67 | 1.67 | 3.00 | 1.00 | 0.67 | 1.33 | 0.00 | 0.00 |
| gpt-5.6-terra | Arabic prompt / Arabic response | 3 | 15.67 | 6.33 | 6.33 | 0.67 | 0.67 | 1.67 | 0.00 | 0.00 |
| gpt-5.6-terra | Bengali prompt / Bengali response | 3 | 12.00 | 5.67 | 4.33 | 0.00 | 0.33 | 1.67 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / Arabic response | 3 | 15.67 | 6.00 | 5.67 | 0.33 | 1.33 | 1.67 | 0.67 | 0.00 |
| gpt-5.6-terra | English prompt / Bengali response | 3 | 15.33 | 6.33 | 6.67 | 0.00 | 0.33 | 2.00 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / English response | 3 | 16.33 | 6.00 | 6.00 | 0.67 | 1.00 | 1.67 | 1.00 | 0.00 |
| gpt-5.6-terra | English prompt / French response | 3 | 14.67 | 5.67 | 5.33 | 0.67 | 1.00 | 1.33 | 0.67 | 0.00 |
| gpt-5.6-terra | English prompt / Hindi response | 3 | 15.33 | 6.67 | 4.67 | 0.33 | 0.33 | 2.67 | 0.67 | 0.00 |
| gpt-5.6-terra | English prompt / Tamil response | 3 | 14.67 | 6.00 | 6.33 | 0.33 | 0.33 | 1.33 | 0.33 | 0.00 |
| gpt-5.6-terra | French prompt / French response | 3 | 13.33 | 5.67 | 4.33 | 0.33 | 1.00 | 1.67 | 0.33 | 0.00 |
| gpt-5.6-terra | Hindi prompt / Hindi response | 3 | 14.00 | 6.00 | 5.67 | 0.33 | 0.33 | 1.67 | 0.00 | 0.00 |
| gpt-5.6-terra | Tamil prompt / Tamil response | 3 | 12.00 | 5.00 | 5.33 | 0.33 | 0.00 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | Arabic prompt / Arabic response | 3 | 10.33 | 3.33 | 5.00 | 0.33 | 0.33 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | Bengali prompt / Bengali response | 3 | 9.67 | 3.33 | 3.67 | 0.67 | 0.67 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Arabic response | 3 | 8.33 | 3.67 | 3.67 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Bengali response | 3 | 10.00 | 4.00 | 4.67 | 0.00 | 0.33 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | English prompt / English response | 3 | 11.00 | 4.33 | 4.00 | 0.67 | 0.67 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | English prompt / French response | 3 | 9.00 | 4.00 | 3.67 | 0.67 | 0.33 | 0.33 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Hindi response | 3 | 9.33 | 4.00 | 3.67 | 0.33 | 0.00 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Tamil response | 3 | 9.33 | 3.33 | 4.33 | 0.33 | 0.33 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | French prompt / French response | 3 | 12.67 | 4.33 | 5.67 | 0.67 | 0.33 | 1.67 | 0.00 | 0.00 |
| grok-4.3 | Hindi prompt / Hindi response | 3 | 10.33 | 3.67 | 5.00 | 0.33 | 0.00 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | Tamil prompt / Tamil response | 3 | 9.33 | 3.67 | 4.67 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | Arabic prompt / Arabic response | 3 | 6.33 | 2.67 | 2.67 | 0.00 | 0.33 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | Bengali prompt / Bengali response | 3 | 4.67 | 2.67 | 1.33 | 0.67 | 0.00 | 0.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Arabic response | 3 | 6.33 | 3.00 | 2.67 | 0.00 | 0.33 | 0.33 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Bengali response | 3 | 5.00 | 2.33 | 2.67 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / English response | 3 | 7.33 | 3.67 | 2.33 | 0.00 | 0.67 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / French response | 3 | 5.33 | 3.00 | 1.33 | 0.00 | 0.67 | 0.33 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Hindi response | 3 | 5.67 | 3.67 | 0.67 | 0.00 | 0.33 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Tamil response | 3 | 5.00 | 2.67 | 2.00 | 0.00 | 0.00 | 0.33 | 0.00 | 0.00 |
| llama-4-maverick | French prompt / French response | 3 | 6.67 | 3.00 | 2.00 | 0.33 | 0.67 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | Hindi prompt / Hindi response | 3 | 5.67 | 4.00 | 1.00 | 0.00 | 0.00 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | Tamil prompt / Tamil response | 3 | 4.33 | 2.67 | 1.33 | 0.00 | 0.00 | 0.33 | 0.00 | 0.00 |

## Excluded responses

| Topic | Model | Condition | Relevance |
|---|---|---|---|
| isotope | gpt-5.6-terra | Arabic prompt / Arabic response | off_topic |
| isotope | claude-sonnet-5 | Tamil prompt / Tamil response | off_topic |
| isotope | gpt-5.6-terra | Tamil prompt / Tamil response | off_topic |
| isotope | grok-4.3 | Tamil prompt / Tamil response | off_topic |
| isotope | llama-4-maverick | Tamil prompt / Tamil response | off_topic |
| covalent radius | claude-sonnet-5 | Tamil prompt / Tamil response | off_topic |
| alkaline earth metals | gpt-5.6-terra | Tamil prompt / Tamil response | off_topic |
| alkaline earth metals | grok-4.3 | Tamil prompt / Tamil response | off_topic |
| vapour phase refining | grok-4.3 | Arabic prompt / Arabic response | off_topic |
| vapour phase refining | claude-sonnet-5 | Arabic prompt / Arabic response | off_topic |
| vapour phase refining | llama-4-maverick | Arabic prompt / Arabic response | off_topic |
| vapour phase refining | llama-4-maverick | Bengali prompt / Bengali response | off_topic |
| vapour phase refining | gpt-5.6-terra | Arabic prompt / Arabic response | off_topic |
| vapour phase refining | grok-4.3 | Bengali prompt / Bengali response | off_topic |
| vapour phase refining | claude-sonnet-5 | Tamil prompt / Tamil response | off_topic |
| vapour phase refining | gpt-5.6-terra | Tamil prompt / Tamil response | off_topic |
| vapour phase refining | llama-4-maverick | Tamil prompt / Tamil response | off_topic |
