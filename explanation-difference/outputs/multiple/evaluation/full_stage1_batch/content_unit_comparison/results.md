# Current Stage 1 language comparison

Uses only the expanded Stage 1 annotations; no legacy annotations. All results are model proposals. Stage 2 has not run.

385 responses: 365 on-topic, 18 off-topic, 2 partially on-topic. Only individual strictly on-topic responses enter count and error comparisons. Unequal topic/model coverage can affect language means.

[Interactive dashboard](comparison.html) | [Response CSV](responses.csv) | [Quality CSV](quality.csv)

## By language and prompt condition

| Condition | On-topic N | Mean units | Mean words | Off-topic / all | Partial / all | Responses with errors | Error records |
|---|---|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 28 | 7.46 | 344.6 | 5/35 | 2/35 | 3/28 | 4 |
| Bengali prompt / Bengali response | 33 | 7.82 | 352.3 | 2/35 | 0/35 | 10/33 | 15 |
| English prompt / Arabic response | 35 | 6.91 | 332.9 | 0/35 | 0/35 | 10/35 | 12 |
| English prompt / Bengali response | 35 | 7.77 | 318.1 | 0/35 | 0/35 | 10/35 | 14 |
| English prompt / English response | 35 | 8.17 | 465.4 | 0/35 | 0/35 | 4/35 | 6 |
| English prompt / French response | 35 | 7.31 | 404.3 | 0/35 | 0/35 | 7/35 | 7 |
| English prompt / Hindi response | 35 | 7.80 | 401.0 | 0/35 | 0/35 | 7/35 | 8 |
| English prompt / Tamil response | 35 | 7.66 | 274.5 | 0/35 | 0/35 | 11/35 | 15 |
| French prompt / French response | 34 | 7.32 | 454.2 | 1/35 | 0/35 | 10/34 | 11 |
| Hindi prompt / Hindi response | 35 | 8.40 | 415.5 | 0/35 | 0/35 | 6/35 | 9 |
| Tamil prompt / Tamil response | 25 | 7.80 | 274.8 | 10/35 | 0/35 | 7/25 | 11 |

## Mean units by category

| Condition | CONCEPT | EXAMPLE | ANALOGY | PROCEDURE | STUDY_SUPPORT | CAVEAT | OTHER |
|---|---|---|---|---|---|---|---|
| Arabic prompt / Arabic response | 3.61 | 2.29 | 0.25 | 0.25 | 0.89 | 0.18 | 0.00 |
| Bengali prompt / Bengali response | 3.24 | 2.85 | 0.33 | 0.21 | 1.09 | 0.09 | 0.00 |
| English prompt / Arabic response | 3.14 | 2.31 | 0.29 | 0.23 | 0.83 | 0.11 | 0.00 |
| English prompt / Bengali response | 3.34 | 3.11 | 0.20 | 0.23 | 0.80 | 0.09 | 0.00 |
| English prompt / English response | 3.14 | 2.89 | 0.40 | 0.31 | 1.26 | 0.17 | 0.00 |
| English prompt / French response | 3.20 | 2.71 | 0.29 | 0.23 | 0.74 | 0.14 | 0.00 |
| English prompt / Hindi response | 3.09 | 2.91 | 0.29 | 0.26 | 1.14 | 0.11 | 0.00 |
| English prompt / Tamil response | 2.91 | 3.14 | 0.23 | 0.14 | 1.09 | 0.14 | 0.00 |
| French prompt / French response | 3.29 | 2.00 | 0.44 | 0.35 | 1.00 | 0.24 | 0.00 |
| Hindi prompt / Hindi response | 3.26 | 3.14 | 0.40 | 0.26 | 1.23 | 0.11 | 0.00 |
| Tamil prompt / Tamil response | 3.52 | 2.68 | 0.32 | 0.16 | 1.04 | 0.08 | 0.00 |

Word-count method: Whitespace-separated chunks containing at least one Unicode letter or number, after removing Markdown formatting and link destinations. Headings, tables, code and equations are included; equation notation is counted as written. Counts are descriptive length measures, not equivalent information units across languages.

The optional balanced subset contains 24 topic/model combinations that are on-topic in all 11 conditions. The dashboard defaults to all on-topic responses. No significance tests have been rerun on this dataset.
