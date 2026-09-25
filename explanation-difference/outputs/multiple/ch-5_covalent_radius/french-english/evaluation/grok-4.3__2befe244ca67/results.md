# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and thoroughly addresses the covalent radius, providing its definition, calculation formula, a worked example using dichlorine, its utility, and its periodic trends.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 16,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1
  },
  "nested_passages": 16,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 4,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the distance between the nuclei of two identical bonded atoms sharing electrons, and provides the calculation formula.

Accuracy: **accurate**. The definition and calculation formula for the covalent radius of a homonuclear diatomic molecule are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le rayon covalent est une façon de mesurer la taille d’un atome quand il forme une liaison avec un autre atome par partage d’électrons (une liaison covalente).   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | Voici une explication simple et précise : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | Imagine deux atomes identiques qui se « tiennent » l’un à l’autre en partageant une paire d’électrons. La distance qui sépare leurs noyaux s’appelle la longueur de liaison. Le rayon covalent de l’atome correspond à la moitié de cette distance. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | **Formule :**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Rayon covalent = (distance entre les deux noyaux) ÷ 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Calculation of chlorine's covalent radius in Cl₂ (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the calculation of covalent radius using actual experimental data for a Cl₂ molecule (198 pm bond length divided by 2 gives 99 pm).

Accuracy: **accurate**. The Cl-Cl internuclear distance of 198 pm and the resulting covalent radius of 99 pm are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | **Exemple concret**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Dans la molécule de dichlore (Cl₂), les deux atomes de chlore sont reliés par une liaison covalente simple. La distance mesurée entre les deux noyaux est de 198 pm (picomètres).   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | Donc : rayon covalent du chlore = 198 pm ÷ 2 = 99 pm. | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |

## u3: Utility and applications of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes how covalent radius values are used to predict molecular size, understand atomic assembly, and explain molecular geometry.

Accuracy: **accurate**. The stated uses of covalent radii in predicting molecular dimensions and structure are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | On utilise cette valeur pour prévoir la taille des molécules, comprendre comment les atomes s’assemblent et expliquer la géométrie des composés covalents (eau, méthane, dioxyde de carbone…). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius varies across periods and down groups in the periodic table, providing the underlying electrostatic and shell-based rationales.

Accuracy: **contains_error**. The unit contains an incorrect phrasing for the horizontal trend across a period, using 'D'une période à l'autre' (from one period to another) instead of 'au sein d'une période' or 'le long d'une période'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | **Comment varie-t-il dans le tableau périodique ?**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | - D’une période à l’autre (de gauche à droite) : le rayon covalent diminue.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |   Raison : le noyau contient plus de protons, il attire plus fortement les électrons de la couche externe, donc l’atome « rétrécit ».   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | - Dans un groupe (de haut en bas) : le rayon covalent augmente.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 |   Raison : on ajoute des couches d’électrons, ce qui éloigne les électrons externes du noyau. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p11): The phrasing « D’une période à l’autre (de gauche à droite) » is contradictory because moving left to right occurs within a single period (horizontally), not between different periods (which would be vertical).

Correction: Use « Le long d’une période (de gauche à droite) » or « Au sein d'une période (de gauche à droite) ».

## u5: Relationship between covalent radius, bond length, and bond strength (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general relationship between atomic size (covalent radius) and the length and strength of resulting covalent bonds, accompanied by a polite closing remark.

Accuracy: **accurate**. Smaller atoms bring shared electron pairs closer to their nuclei, leading to shorter and generally stronger covalent bonds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | Tu peux retenir que plus l’atome est « petit » (rayon covalent faible), plus il aura tendance à former des liaisons fortes et courtes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | Si tu veux, je peux te montrer des valeurs pour d’autres atomes (carbone, oxygène, azote…) ou t’expliquer la différence avec le rayon atomique et le rayon ionique. Dis-moi ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

