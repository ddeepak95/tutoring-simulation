# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly explains stoichiometry, its importance, underlying principles (conservation of mass, chemical equations), the procedure to apply it, and provides an illustrative chemical reaction example.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 20,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 20,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 4,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition de la stœchiométrie (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the branch of chemistry concerned with measuring reactant and product amounts in a chemical reaction.

Accuracy: **accurate**. The definition of stoichiometry is clear and scientifically standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Bienvenue dans le monde de la chimie !** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;heading&#x27;] |
| p2 | Aujourd&#x27;hui, nous allons explorer un concept fondamental en chimie : la stoechiométrie. Ne t&#x27;inquiète pas si cela te semble compliqué au début, je suis là pour t&#x27;expliquer cela de manière claire et simple. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | **Qu&#x27;est-ce que la stoechiométrie ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | La stoechiométrie est la partie de la chimie qui s&#x27;occupe de mesurer les quantités de réactifs et de produits dans une réaction chimique. En d&#x27;autres termes, il s&#x27;agit de comprendre comment les substances chimiques réagissent entre elles et quelles sont les quantités impliquées. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Analogie de la cuisine pour illustrer l'importance des proportions (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "Imagine que tu es un cuisinier et que tu veux préparer un gâteau. Tu as besoin de connaître les quantités exactes d'ingrédients pour obtenir un résultat parfait."}]}

Annotation rationale: Uses the real-world domain of following a cooking recipe to illustrate why precise proportions of reactants are essential.

Accuracy: **accurate**. The cooking analogy accurately maps the necessity of specific ingredient proportions to chemical reactant amounts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **Pourquoi est-ce important ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Imagine que tu es un cuisinier et que tu veux préparer un gâteau. Tu as besoin de connaître les quantités exactes d&#x27;ingrédients pour obtenir un résultat parfait. De même, en chimie, il est crucial de connaître les quantités de réactifs et de produits pour prédire les résultats d&#x27;une réaction. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Principes de base : conservation de la masse et équations chimiques (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the law of conservation of mass and the definition and role of chemical equations in stoichiometry.

Accuracy: **accurate**. The law of conservation of mass and the description of chemical equations are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Les principes de base de la stoechiométrie** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | 1. **La loi de conservation de la masse** : lors d&#x27;une réaction chimique, la masse totale des réactifs est égale à la masse totale des produits. Cela signifie que la matière ne peut pas être créée ou détruite, seulement transformée. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 2. **Les équations chimiques** : une équation chimique est une représentation symbolique d&#x27;une réaction chimique. Elle indique les réactifs, les produits et les quantités impliquées. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Étapes pour appliquer la stœchiométrie (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the sequential steps to apply stoichiometry: write the equation, balance it, and determine quantities via coefficients.

Accuracy: **accurate**. The procedural steps correctly represent the general method used in stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | **Comment appliquer la stoechiométrie ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | 1. **Écrire l&#x27;équation chimique** : commence par écrire l&#x27;équation chimique de la réaction que tu veux étudier. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 2. **Équilibrer l&#x27;équation** : assure-toi que l&#x27;équation est équilibrée, c&#x27;est-à-dire que le nombre d&#x27;atomes de chaque élément est le même des deux côtés de l&#x27;équation. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | 3. **Déterminer les quantités** : utilise les coefficients de l&#x27;équation équilibrée pour déterminer les quantités de réactifs et de produits impliquées. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Exemple de synthèse de l'eau (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how stoichiometric coefficients indicate relative molecular ratios using the formation of water, concluding with a general wrap-up.

Accuracy: **accurate**. The chemical equation 2H2 + O2 -> 2H2O is properly balanced and the molecular ratios derived from the stoichiometric coefficients are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **Un exemple simple** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | Supposons que nous voulions préparer de l&#x27;eau (H2O) en faisant réagir de l&#x27;hydrogène (H2) avec de l&#x27;oxygène (O2). L&#x27;équation chimique est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | 2H2 + O2 → 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | *   2 molécules d&#x27;hydrogène réagissent avec 1 molécule d&#x27;oxygène pour former 2 molécules d&#x27;eau. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | *   Les coefficients (2, 1 et 2) indiquent les quantités relatives de chaque substance impliquée. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | **Conclusion** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | La stoechiométrie est un outil puissant pour comprendre les réactions chimiques et prédire les résultats. En appliquant les principes de base et en utilisant les équations chimiques, tu pourras déterminer les quantités de réactifs et de produits impliquées dans une réaction. N&#x27;hésite pas à me poser des questions si tu as besoin de clarifications ou si tu veux explorer d&#x27;autres exemples ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

