# Tamil versus English-translation annotation

One Claude Tamil-prompt redox response, compared with its saved English translation. Both annotated independently by Gemini-3.8-flash using the same prompt, then reviewed separately using the same reviewer prompt.

Alignment: 45 source lines checked for one-to-one semantic correspondence. English/Tamil whitespace and Markdown can differ. No labels were used to establish alignment.

| Stage | Primary labels: all passages | Primary labels: content pairs | Full function sets | Formats |
|---|---|---|---|---|
| first_pass | 44/45 (97.8%) | 25/26 (96.2%) | 39/45 (86.7%) | 45/45 (100.0%) |
| reviewed | 44/45 (97.8%) | 25/26 (96.2%) | 37/45 (82.2%) | 45/45 (100.0%) |

Content pairs exclude a pair only when BOTH primary labels are STRUCTURAL or SOCIAL. This denominator can change between stages. Full function sets include primary and secondary labels without regard to ordering.

## Reviewed primary-label disagreements

| Passage | Tamil | English translation | Tamil label | English label |
|---|---|---|---|---|
| p4 | **ஆக்சிஜனேற்றம் (Oxidation)** மற்றும் **ஒடுக்கம் (Reduction)** எப்போதும் ஒன்றாகவே நடக்கும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது - அதனால்தான் இதை **&quot;Redox&quot;** (Reduction + Oxidation) என்று அழைக்கிறோம். | **Oxidation** and **Reduction** always happen together. One does not happen without the other - that is why we call this **&quot;Redox&quot;** (Reduction + Oxidation). | CONCEPT | DEF |

## Content-instance counts after review

| Kind | Tamil | English |
|---|---:|---:|
| practice_question | 1 | 1 |
| realworld_example | 3 | 3 |
| study_tip | 1 | 1 |
| worked_example | 2 | 3 |

Counts alone do not establish that instances match semantically. This review pass freezes instance identities and links, so it cannot resolve different instance grouping between languages.

## Interpretation limits

- This measures consistency on one paired explanation, not annotation accuracy. Both languages can receive the same wrong label.
- Differences can arise from translation changes, language-dependent judgment, or stochastic model variation. This experiment cannot isolate those causes.
- The review codebook was developed for English evaluation text. Applying it to Tamil is an exploratory transfer of the same criteria, not a validated Tamil annotation protocol.
- Repeated annotations and human bilingual adjudication are needed before generalizing. Proposed reviews are not a gold standard.

[Tamil annotations](tamil/results.md) | [English annotations](english/results.md) | [Tamil review](tamil/review_pass2/results.md) | [English review](english/review_pass2/results.md) | [Passage CSV](passage_comparison.csv)
