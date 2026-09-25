# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a clear explanation of covalent radius, including its definition, determination method, worked example, analogy, periodic trends, representative values, and conceptual qualifications.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "ANALOGY": 1,
    "CAVEAT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the covalent radius as the size of an atom when engaged in a covalent bond sharing an electron pair.

Accuracy: **accurate**. The statement accurately introduces the covalent radius in the context of a shared electron pair in a covalent bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Le rayon covalent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Définition simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Le **rayon covalent** représente la taille d&#x27;un atome lorsqu&#x27;il est engagé dans une **liaison covalente** avec un autre atome (une liaison où deux atomes partagent une paire d&#x27;électrons). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Procedure for measuring covalent radius (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the two-step protocol used to determine covalent radius by halving the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The explanation correctly identifies the lack of sharp electron boundaries in isolated atoms and accurately states the standard operational definition of homonuclear covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## Comment le mesure-t-on ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | On ne peut pas mesurer directement la taille d&#x27;un seul atome isolé (les électrons n&#x27;ont pas de &quot;bord&quot; net). Alors les scientifiques utilisent une astuce : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. On mesure la distance entre les noyaux de deux atomes identiques liés par une liaison covalente | PROCEDURE | {} | [&#x27;list&#x27;] |
| p7 | 2. On divise cette distance par 2 | PROCEDURE | {} | [&#x27;list&#x27;] |

## u3: Worked calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the measurement procedure to a chlorine molecule (Cl2) with an internuclear distance of 198 pm to calculate a covalent radius of 99 pm.

Accuracy: **accurate**. The internuclear distance of 198 pm in Cl2 and the resulting covalent radius of 99 pm are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **Exemple concret :** Dans la molécule de dichlore (Cl–Cl), la distance entre les deux noyaux de chlore est de 198 pm (picomètres).  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | Le rayon covalent du chlore = 198 / 2 = **99 pm** | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |

## u4: Touching balloons analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "Imagine deux ballons de baudruche qui se touchent."}]}

Annotation rationale: Uses an analogy of two touching party balloons to illustrate how halving the center-to-center distance yields the radius.

Accuracy: **accurate**. The analogy accurately illustrates the geometric principle behind the homonuclear covalent radius definition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## Une image pour comprendre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Imagine deux ballons de baudruche qui se touchent. La distance entre leurs centres, divisée par 2, te donne le &quot;rayon&quot; de chaque ballon. C&#x27;est le même principe avec les atomes ! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u5: Importance and periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the significance of covalent radius for predicting molecular sizes and comparing atoms, and outlines its periodic trends across periods and down groups.

Accuracy: **accurate**. The applications and periodic trends (decreasing across a period from left to right, increasing down a group) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## Pourquoi c&#x27;est important ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Le rayon covalent permet de : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - **Prédire les tailles des molécules** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - **Comparer les atomes entre eux** : plus un atome est gros, plus son rayon covalent est grand | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - **Comprendre les tendances dans le tableau périodique** : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 |   - Le rayon covalent **diminue** quand on va de gauche à droite sur une ligne (période) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 |   - Le rayon covalent **augmente** quand on descend dans une colonne (groupe) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Illustrative table of covalent radius values (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a table of illustrative covalent radius values for H, C, N, O, and Cl, demonstrating typical scales and periodic trends.

Accuracy: **accurate**. The listed values (H: 31 pm, C: 77 pm, N: 75 pm, O: 73 pm, Cl: 99 pm) reflect standard literature values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## Petit tableau d&#x27;exemples | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | &#124; Atome &#124; Rayon covalent (pm) &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124;-------&#124;---------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p22 | &#124; H     &#124; 31                  &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p23 | &#124; C     &#124; 77                  &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p24 | &#124; N     &#124; 75                  &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p25 | &#124; O     &#124; 73                  &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p26 | &#124; Cl    &#124; 99                  &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Qualification of covalent radius as an average value (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies the concept by noting that covalent radius is not an absolute constant but an average value that varies slightly depending on bond order and chemical environment.

Accuracy: **accurate**. Accurately qualifies that covalent radius depends on bond order (single, double, triple) and coordination environment, functioning as an empirical average.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Le rayon covalent n&#x27;est pas une valeur fixe absolue : elle dépend légèrement du type de liaison (simple, double, triple) et des atomes environnants. C&#x27;est une **valeur moyenne** très utile pour comparer et prédire les propriétés des molécules ! | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | As-tu des questions sur ce concept, ou veux-tu qu&#x27;on regarde comment il évolue dans le tableau périodique ? 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

