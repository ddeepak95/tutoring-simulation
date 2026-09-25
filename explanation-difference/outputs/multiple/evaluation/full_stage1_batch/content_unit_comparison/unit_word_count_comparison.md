# Word counts within content units

Only strictly on-topic current Stage 1 responses are included. 20 off-topic/partial responses excluded. Words come from original-language source excerpts, not translated text, unit labels, or judge explanations. For multiple excerpts, count each excerpt separately and sum. Unassigned source text is excluded.

Method: Whitespace-separated chunks containing at least one Unicode letter or number, after removing Markdown formatting and link destinations. Headings, tables, code and equations are included; equation notation is counted as written. Counts are descriptive length measures, not equivalent information units across languages.

Primary summary: calculate mean unit length within each response, then average those response means. Each response receives equal weight. For a category, include only responses containing that category; absence is not a zero-word unit. Category values can have different denominators.

## English prompts: response language comparison

| Language | Responses | Units | Mean words/unit (response-weighted) | Pooled median unit words | Concept | Example | Study support |
|---|---:|---:|---:|---:|---:|---:|---:|
| English | 35 | 286 | 56.5 | 44.0 | 75.6 | 54.9 | 40.2 |
| Arabic | 35 | 242 | 48.6 | 36.0 | 57.0 | 43.3 | 30.0 |
| Bengali | 35 | 272 | 40.6 | 31.0 | 47.3 | 38.9 | 27.3 |
| French | 35 | 256 | 53.6 | 42.0 | 70.3 | 44.4 | 34.3 |
| Hindi | 35 | 273 | 50.3 | 38.0 | 68.5 | 43.6 | 32.4 |
| Tamil | 35 | 268 | 35.5 | 27.0 | 45.7 | 33.8 | 25.2 |

## All prompt conditions and categories

Cells show response-weighted mean words/unit (number of contributing responses).

| Condition | Overall | Concept | Example | Analogy | Procedure | Study support | Caveat |
|---|---|---|---|---|---|---|---|
| arabic-english | 48.6 (n=35) | 57.0 (n=35) | 43.3 (n=33) | 42.9 (n=10) | 47.1 (n=7) | 30.0 (n=22) | 23.5 (n=4) |
| arabic-native | 44.7 (n=28) | 55.6 (n=28) | 42.1 (n=26) | 43.0 (n=7) | 49.9 (n=7) | 31.3 (n=20) | 29.0 (n=5) |
| bengali-english | 40.6 (n=35) | 47.3 (n=35) | 38.9 (n=35) | 56.3 (n=7) | 51.9 (n=8) | 27.3 (n=23) | 34.7 (n=3) |
| bengali-native | 42.1 (n=33) | 55.9 (n=33) | 41.7 (n=32) | 56.2 (n=11) | 47.6 (n=6) | 28.8 (n=26) | 31.3 (n=3) |
| english | 56.5 (n=35) | 75.6 (n=35) | 54.9 (n=35) | 53.6 (n=14) | 62.4 (n=10) | 40.2 (n=33) | 56.4 (n=5) |
| french-english | 53.6 (n=35) | 70.3 (n=35) | 44.4 (n=34) | 49.0 (n=10) | 70.2 (n=8) | 34.3 (n=23) | 34.6 (n=5) |
| french-native | 57.4 (n=34) | 71.7 (n=34) | 52.2 (n=31) | 58.9 (n=15) | 57.8 (n=11) | 42.7 (n=28) | 62.8 (n=8) |
| hindi-english | 50.3 (n=35) | 68.5 (n=35) | 43.6 (n=35) | 58.2 (n=10) | 68.9 (n=8) | 32.4 (n=30) | 35.5 (n=4) |
| hindi-native | 45.6 (n=35) | 56.7 (n=35) | 43.9 (n=34) | 58.6 (n=13) | 61.6 (n=7) | 32.8 (n=32) | 39.2 (n=4) |
| tamil-english | 35.5 (n=35) | 45.7 (n=35) | 33.8 (n=35) | 39.4 (n=8) | 37.0 (n=5) | 25.2 (n=28) | 31.8 (n=5) |
| tamil-native | 33.1 (n=25) | 41.4 (n=25) | 31.2 (n=24) | 40.4 (n=8) | 30.2 (n=4) | 22.9 (n=21) | 52.5 (n=2) |

## Matched native minus English prompt differences

Same output language, topic and model; retain pairs only when both responses are on-topic. Differences are in the response-level mean words per unit, not matched individual units.

| Language | Pairs | Difference in mean words/unit |
|---|---:|---:|
| Arabic | 28 | +0.9 |
| Bengali | 33 | +1.4 |
| French | 34 | +6.6 |
| Hindi | 35 | -4.8 |
| Tamil | 25 | -3.5 |

## Interpretation

Shorter units can account for shorter responses even when unit counts are similar. However, whitespace word counts are language-dependent, especially for morphologically rich languages; shorter counts do not establish less information, weaker explanation, or poorer quality. Unit boundaries and category mixtures also affect length. The pooled median describes all units and is not response-weighted. No significance tests have been performed; individual units should not be treated as independent samples.

[Per-unit CSV](unit_word_counts.csv) | [Per-response/category CSV](response_unit_lengths.csv)
