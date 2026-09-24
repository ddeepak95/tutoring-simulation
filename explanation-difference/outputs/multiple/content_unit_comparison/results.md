# On-topic content-unit comparison

95 on-topic responses included; 10 excluded. Counts are model annotations, not quality scores. Organizational passages do not count as units.

[Interactive comparison](comparison.html) | [Per-response CSV](responses.csv)

All tables show mean units per response. N is the number of included responses; unequal topic coverage can affect comparisons. Category means sum to total means before rounding.

Conditions: 1 = English prompt / English response; 2 = Tamil prompt / Tamil response; 3 = English prompt / Tamil response.

## Topic relevance and proposed errors by language

Off-topic rates use all responses. Error counts use on-topic responses only; skipped assessments are not error-free judgments. Errors are model proposals, counted per unit without global deduplication.

| Condition | All N | Off-topic | On-topic N | Responses with errors | Error records | Minor | Major |
|---|---|---|---|---|---|---|---|
| English prompt / English response | 35 | 0/35 (0.0%) | 35 | 3/35 (8.6%) | 4 | 4 | 0 |
| Tamil prompt / Tamil response | 35 | 10/35 (28.6%) | 25 | 4/25 (16.0%) | 8 | 5 | 3 |
| English prompt / Tamil response | 35 | 0/35 (0.0%) | 35 | 4/35 (11.4%) | 6 | 5 | 1 |

[Per-response relevance and accuracy CSV](quality.csv)

## Language comparison: matched topic-model combinations

| condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| English prompt / English response | 25 | 9.56 | 3.88 | 3.28 | 0.60 | 0.44 | 1.16 | 0.20 | 0.00 |
| English prompt / Tamil response | 25 | 8.56 | 3.48 | 3.40 | 0.28 | 0.16 | 1.12 | 0.12 | 0.00 |
| Tamil prompt / Tamil response | 25 | 8.56 | 3.68 | 3.16 | 0.36 | 0.12 | 0.96 | 0.28 | 0.00 |

Matched comparisons use the same topic and model in all three conditions. English-prompt/Tamil-output versus English-prompt/English-output keeps prompt language fixed. Tamil-prompt/Tamil-output changes both prompt and output language relative to English/English. These are descriptive single-response comparisons, not significance tests.

## Language comparison: all on-topic responses

| condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| English prompt / English response | 35 | 9.00 | 3.86 | 3.06 | 0.46 | 0.31 | 1.11 | 0.20 | 0.00 |
| English prompt / Tamil response | 35 | 8.43 | 3.63 | 3.26 | 0.23 | 0.11 | 1.03 | 0.17 | 0.00 |
| Tamil prompt / Tamil response | 25 | 8.56 | 3.68 | 3.16 | 0.36 | 0.12 | 0.96 | 0.28 | 0.00 |

## Language comparison by topic (matched combinations)

| topic | condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| alkaline earth metals | English prompt / English response | 3 | 10.33 | 4.67 | 3.67 | 0.67 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | English prompt / Tamil response | 3 | 11.00 | 5.00 | 4.67 | 0.00 | 0.00 | 1.33 | 0.00 | 0.00 |
| alkaline earth metals | Tamil prompt / Tamil response | 3 | 14.33 | 8.00 | 4.33 | 0.00 | 0.00 | 0.67 | 1.33 | 0.00 |
| covalent radius | English prompt / English response | 4 | 5.75 | 2.75 | 1.50 | 0.25 | 0.00 | 1.00 | 0.25 | 0.00 |
| covalent radius | English prompt / Tamil response | 4 | 4.50 | 2.25 | 1.50 | 0.25 | 0.00 | 0.25 | 0.25 | 0.00 |
| covalent radius | Tamil prompt / Tamil response | 4 | 5.50 | 2.50 | 1.00 | 0.50 | 0.00 | 0.75 | 0.75 | 0.00 |
| isotope | English prompt / English response | 1 | 8.00 | 2.00 | 4.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | English prompt / Tamil response | 1 | 8.00 | 4.00 | 2.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| isotope | Tamil prompt / Tamil response | 1 | 10.00 | 3.00 | 5.00 | 1.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| mole concept | English prompt / English response | 5 | 12.40 | 4.80 | 4.80 | 1.20 | 0.40 | 1.00 | 0.20 | 0.00 |
| mole concept | English prompt / Tamil response | 5 | 10.40 | 4.00 | 4.00 | 0.60 | 0.20 | 1.40 | 0.20 | 0.00 |
| mole concept | Tamil prompt / Tamil response | 5 | 9.00 | 4.20 | 3.00 | 0.60 | 0.20 | 1.00 | 0.00 | 0.00 |
| redox reactions | English prompt / English response | 5 | 12.00 | 4.00 | 5.40 | 0.20 | 0.20 | 2.00 | 0.20 | 0.00 |
| redox reactions | English prompt / Tamil response | 5 | 11.20 | 4.00 | 5.40 | 0.00 | 0.00 | 1.80 | 0.00 | 0.00 |
| redox reactions | Tamil prompt / Tamil response | 5 | 9.40 | 3.20 | 4.60 | 0.20 | 0.00 | 1.40 | 0.00 | 0.00 |
| stoichiometry | English prompt / English response | 5 | 8.60 | 4.40 | 1.20 | 0.60 | 1.20 | 0.80 | 0.40 | 0.00 |
| stoichiometry | English prompt / Tamil response | 5 | 7.40 | 3.20 | 2.40 | 0.40 | 0.40 | 1.00 | 0.00 | 0.00 |
| stoichiometry | Tamil prompt / Tamil response | 5 | 7.40 | 3.00 | 3.00 | 0.20 | 0.40 | 0.80 | 0.00 | 0.00 |
| vapour phase refining | English prompt / English response | 2 | 6.00 | 2.00 | 2.00 | 0.50 | 1.00 | 0.50 | 0.00 | 0.00 |
| vapour phase refining | English prompt / Tamil response | 2 | 5.00 | 1.50 | 2.00 | 0.00 | 0.50 | 0.50 | 0.50 | 0.00 |
| vapour phase refining | Tamil prompt / Tamil response | 2 | 5.00 | 1.50 | 2.00 | 0.50 | 0.00 | 1.00 | 0.00 | 0.00 |

## Language comparison by model (matched combinations)

| model | condition_label | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | English prompt / English response | 4 | 11.00 | 5.25 | 3.25 | 1.00 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | English prompt / Tamil response | 4 | 10.50 | 4.25 | 3.25 | 0.25 | 0.25 | 2.50 | 0.00 | 0.00 |
| claude-sonnet-5 | Tamil prompt / Tamil response | 4 | 10.00 | 4.25 | 4.00 | 0.25 | 0.25 | 1.25 | 0.00 | 0.00 |
| gemini-3.8-flash | English prompt / English response | 7 | 8.86 | 3.14 | 3.14 | 1.00 | 0.29 | 1.14 | 0.14 | 0.00 |
| gemini-3.8-flash | English prompt / Tamil response | 7 | 8.00 | 3.00 | 3.00 | 0.57 | 0.00 | 1.29 | 0.14 | 0.00 |
| gemini-3.8-flash | Tamil prompt / Tamil response | 7 | 7.43 | 2.29 | 3.00 | 0.71 | 0.29 | 1.14 | 0.00 | 0.00 |
| gpt-5.6-terra | English prompt / English response | 4 | 13.50 | 5.00 | 4.75 | 0.50 | 0.75 | 1.50 | 1.00 | 0.00 |
| gpt-5.6-terra | English prompt / Tamil response | 4 | 13.00 | 5.50 | 5.50 | 0.25 | 0.25 | 1.25 | 0.25 | 0.00 |
| gpt-5.6-terra | Tamil prompt / Tamil response | 4 | 11.25 | 4.50 | 4.25 | 0.50 | 0.00 | 1.25 | 0.75 | 0.00 |
| grok-4.3 | English prompt / English response | 5 | 8.60 | 3.40 | 3.20 | 0.40 | 0.60 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | English prompt / Tamil response | 5 | 7.40 | 2.60 | 3.40 | 0.20 | 0.40 | 0.60 | 0.20 | 0.00 |
| grok-4.3 | Tamil prompt / Tamil response | 5 | 8.00 | 3.20 | 3.60 | 0.20 | 0.00 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / English response | 5 | 7.20 | 3.40 | 2.40 | 0.00 | 0.40 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | English prompt / Tamil response | 5 | 5.40 | 2.80 | 2.40 | 0.00 | 0.00 | 0.20 | 0.00 | 0.00 |
| llama-4-maverick | Tamil prompt / Tamil response | 5 | 7.40 | 5.00 | 1.40 | 0.00 | 0.00 | 0.20 | 0.80 | 0.00 |

## All on-topic responses: model and condition

| model | condition | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | 1 | 7 | 9.00 | 4.29 | 2.57 | 0.71 | 0.14 | 1.29 | 0.00 | 0.00 |
| claude-sonnet-5 | 2 | 4 | 10.00 | 4.25 | 4.00 | 0.25 | 0.25 | 1.25 | 0.00 | 0.00 |
| claude-sonnet-5 | 3 | 7 | 8.71 | 3.57 | 2.57 | 0.29 | 0.14 | 1.86 | 0.29 | 0.00 |
| gemini-3.8-flash | 1 | 7 | 8.86 | 3.14 | 3.14 | 1.00 | 0.29 | 1.14 | 0.14 | 0.00 |
| gemini-3.8-flash | 2 | 7 | 7.43 | 2.29 | 3.00 | 0.71 | 0.29 | 1.14 | 0.00 | 0.00 |
| gemini-3.8-flash | 3 | 7 | 8.00 | 3.00 | 3.00 | 0.57 | 0.00 | 1.29 | 0.14 | 0.00 |
| gpt-5.6-terra | 1 | 7 | 11.71 | 5.14 | 3.86 | 0.29 | 0.43 | 1.14 | 0.86 | 0.00 |
| gpt-5.6-terra | 2 | 4 | 11.25 | 4.50 | 4.25 | 0.50 | 0.00 | 1.25 | 0.75 | 0.00 |
| gpt-5.6-terra | 3 | 7 | 12.00 | 6.14 | 4.14 | 0.14 | 0.14 | 1.14 | 0.29 | 0.00 |
| grok-4.3 | 1 | 7 | 8.29 | 3.43 | 3.14 | 0.29 | 0.43 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | 2 | 5 | 8.00 | 3.20 | 3.60 | 0.20 | 0.00 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | 3 | 7 | 7.86 | 3.00 | 3.71 | 0.14 | 0.29 | 0.57 | 0.14 | 0.00 |
| llama-4-maverick | 1 | 7 | 7.14 | 3.29 | 2.57 | 0.00 | 0.29 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | 2 | 5 | 7.40 | 5.00 | 1.40 | 0.00 | 0.00 | 0.20 | 0.80 | 0.00 |
| llama-4-maverick | 3 | 7 | 5.57 | 2.43 | 2.86 | 0.00 | 0.00 | 0.29 | 0.00 | 0.00 |

## All on-topic responses: topic

| topic | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|
| alkaline earth metals | 13 | 12.54 | 6.92 | 3.92 | 0.15 | 0.00 | 1.00 | 0.54 | 0.00 |
| covalent radius | 14 | 5.43 | 2.57 | 1.29 | 0.36 | 0.00 | 0.79 | 0.43 | 0.00 |
| isotope | 11 | 7.45 | 2.91 | 3.45 | 0.27 | 0.00 | 0.82 | 0.00 | 0.00 |
| mole concept | 15 | 10.60 | 4.33 | 3.93 | 0.80 | 0.27 | 1.13 | 0.13 | 0.00 |
| redox reactions | 15 | 10.87 | 3.73 | 5.13 | 0.13 | 0.07 | 1.73 | 0.07 | 0.00 |
| stoichiometry | 15 | 7.80 | 3.53 | 2.20 | 0.40 | 0.67 | 0.87 | 0.13 | 0.00 |
| vapour phase refining | 12 | 5.33 | 1.83 | 2.00 | 0.25 | 0.25 | 0.83 | 0.17 | 0.00 |

## Matched coverage

Topics with all 15 model/condition combinations on-topic: mole concept, redox reactions, stoichiometry.

## Matched topics only: model and condition

| model | condition | N | Total | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | 1 | 3 | 10.67 | 5.00 | 3.00 | 1.00 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | 2 | 3 | 9.67 | 4.33 | 3.33 | 0.33 | 0.33 | 1.33 | 0.00 | 0.00 |
| claude-sonnet-5 | 3 | 3 | 9.67 | 3.67 | 2.67 | 0.33 | 0.33 | 2.67 | 0.00 | 0.00 |
| gemini-3.8-flash | 1 | 3 | 9.67 | 3.00 | 3.67 | 1.00 | 0.33 | 1.33 | 0.33 | 0.00 |
| gemini-3.8-flash | 2 | 3 | 7.67 | 1.67 | 3.00 | 1.00 | 0.67 | 1.33 | 0.00 | 0.00 |
| gemini-3.8-flash | 3 | 3 | 9.67 | 3.00 | 4.33 | 0.67 | 0.00 | 1.67 | 0.00 | 0.00 |
| gpt-5.6-terra | 1 | 3 | 16.33 | 6.00 | 6.00 | 0.67 | 1.00 | 1.67 | 1.00 | 0.00 |
| gpt-5.6-terra | 2 | 3 | 12.00 | 5.00 | 5.33 | 0.33 | 0.00 | 1.33 | 0.00 | 0.00 |
| gpt-5.6-terra | 3 | 3 | 14.67 | 6.00 | 6.33 | 0.33 | 0.33 | 1.33 | 0.33 | 0.00 |
| grok-4.3 | 1 | 3 | 11.00 | 4.33 | 4.00 | 0.67 | 0.67 | 1.33 | 0.00 | 0.00 |
| grok-4.3 | 2 | 3 | 9.33 | 3.67 | 4.67 | 0.00 | 0.00 | 1.00 | 0.00 | 0.00 |
| grok-4.3 | 3 | 3 | 9.33 | 3.33 | 4.33 | 0.33 | 0.33 | 1.00 | 0.00 | 0.00 |
| llama-4-maverick | 1 | 3 | 7.33 | 3.67 | 2.33 | 0.00 | 0.67 | 0.67 | 0.00 | 0.00 |
| llama-4-maverick | 2 | 3 | 4.33 | 2.67 | 1.33 | 0.00 | 0.00 | 0.33 | 0.00 | 0.00 |
| llama-4-maverick | 3 | 3 | 5.00 | 2.67 | 2.00 | 0.00 | 0.00 | 0.33 | 0.00 | 0.00 |

## Excluded responses

| Topic | Model | Condition | Relevance |
|---|---|---|---|
| isotope | claude-sonnet-5 | 2 | off_topic |
| isotope | grok-4.3 | 2 | off_topic |
| isotope | gpt-5.6-terra | 2 | off_topic |
| isotope | llama-4-maverick | 2 | off_topic |
| covalent radius | claude-sonnet-5 | 2 | off_topic |
| alkaline earth metals | grok-4.3 | 2 | off_topic |
| alkaline earth metals | gpt-5.6-terra | 2 | off_topic |
| vapour phase refining | gpt-5.6-terra | 2 | off_topic |
| vapour phase refining | claude-sonnet-5 | 2 | off_topic |
| vapour phase refining | llama-4-maverick | 2 | off_topic |
