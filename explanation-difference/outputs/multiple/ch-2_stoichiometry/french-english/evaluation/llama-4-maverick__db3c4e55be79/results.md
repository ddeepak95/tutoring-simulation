# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation defines stoichiometry, explains foundational principles (conservation of mass and balanced chemical equations), outlines a four-step problem-solving procedure, provides a worked calculation example with moles, and summarizes the topic.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 23,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 23,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and etymological origin of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic, defines stoichiometry as the study of quantitative relationships in chemical reactions, and explains the Greek roots of the term.

Accuracy: **accurate**. The definition and etymology (stoikheion meaning element and metron meaning measure) are scientifically and linguistically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Aujourd&#x27;hui, nous allons explorer un concept fondamental en chimie : la stœchiométrie. La stœchiométrie est la partie de la chimie qui étudie les quantités relatives des réactifs et des produits dans les réactions chimiques. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | **Qu&#x27;est-ce que la stœchiométrie ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | La stœchiométrie vient du grec &quot;stoikheion&quot; qui signifie &quot;élément&quot; et &quot;metron&quot; qui signifie &quot;mesure&quot;. Il s&#x27;agit donc de mesurer les quantités des éléments qui réagissent et qui sont produits lors d&#x27;une réaction chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Underlying principles of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two core principles underpinning stoichiometry: the law of conservation of mass and the requirement for balanced chemical equations.

Accuracy: **accurate**. The law of conservation of mass and the concept of balanced chemical equations are correctly described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **Les principes de base** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Pour comprendre la stœchiométrie, il faut connaître quelques principes de base : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. **La loi de conservation de la masse** : lors d&#x27;une réaction chimique, la masse totale des réactifs est égale à la masse totale des produits. Cela signifie que la matière n&#x27;est ni créée ni détruite, mais simplement transformée. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | 2. **Les équations chimiques équilibrées** : une équation chimique représente une réaction chimique. Pour que l&#x27;équation soit équilibrée, il faut que le nombre d&#x27;atomes de chaque élément soit le même du côté des réactifs et du côté des produits. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: General method for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a reusable four-step sequence to approach and solve standard stoichiometric problems.

Accuracy: **accurate**. The procedural steps correctly detail balancing the equation, identifying givens, utilizing stoichiometric ratios, and calculating unknown amounts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **Comment appliquer la stœchiométrie ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Pour résoudre un problème de stœchiométrie, il faut suivre ces étapes : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **Écrire l&#x27;équation chimique équilibrée** : il faut d&#x27;abord écrire l&#x27;équation chimique qui représente la réaction étudiée, puis l&#x27;équilibrer pour que le nombre d&#x27;atomes de chaque élément soit le même des deux côtés. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p11 | 2. **Identifier les quantités données** : il faut identifier les quantités de réactifs ou de produits qui sont données dans le problème. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p12 | 3. **Utiliser les coefficients stœchiométriques** : les coefficients stœchiométriques sont les nombres qui précèdent les formules des réactifs et des produits dans l&#x27;équation équilibrée. Ils indiquent les proportions relatives des différentes espèces chimiques. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p13 | 4. **Calculer les quantités inconnues** : en utilisant les coefficients stœchiométriques et les quantités données, on peut calculer les quantités inconnues. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u4: Worked mole calculation for the synthesis of NaCl (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step problem-solving method applied to find the moles of Cl2 required to react with 4 moles of Na.

Accuracy: **accurate**. The reaction 2 Na + Cl2 -> 2 NaCl and the stoichiometric calculation yielding 2 moles of Cl2 for 4 moles of Na are chemically and mathematically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **Exemple** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | Supposons que nous voulions produire 2 moles de chlorure de sodium (NaCl) à partir de la réaction entre le sodium (Na) et le chlore (Cl2). L&#x27;équation équilibrée est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | 2 Na + Cl2 → 2 NaCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | Si nous avons 4 moles de sodium, combien de moles de chlore sont nécessaires ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | 1. L&#x27;équation est déjà équilibrée. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | 2. La quantité donnée est 4 moles de sodium. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | 3. Le coefficient stœchiométrique de Na est 2 et celui de Cl2 est 1. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | 4. On peut calculer la quantité de Cl2 nécessaire : 4 moles de Na × (1 mole de Cl2 / 2 moles de Na) = 2 moles de Cl2. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u5: Summary of stoichiometry and concluding remarks (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the practical importance of stoichiometry and provides concluding encouragement.

Accuracy: **accurate**. The concluding summary accurately reiterates the role and utility of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | **Conclusion** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | La stœchiométrie est un outil essentiel en chimie qui permet de prédire les quantités de produits qui seront formés ou de réactifs qui seront nécessaires lors d&#x27;une réaction chimique. En comprenant les principes de base et en appliquant les étapes pour résoudre les problèmes, tu pourras résoudre des problèmes de stœchiométrie avec confiance. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

