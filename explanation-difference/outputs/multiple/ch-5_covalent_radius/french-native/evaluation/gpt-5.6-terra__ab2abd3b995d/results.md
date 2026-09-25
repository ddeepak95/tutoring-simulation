# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text explains covalent radius in French, detailing its definition, formula, a calculation example using dihydrogen, trends in the periodic table, dependence on bond multiplicity, and a final recap.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 40,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition et mesure du rayon covalent (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why atomic boundaries cannot be measured directly and how covalent radius is defined as half the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition of the covalent radius as half the distance between the nuclei of two identical bonded atoms is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le **rayon covalent** est une mesure qui donne une idée de la taille d’un atome lorsqu’il est lié à un autre atome par une **liaison covalente**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Définition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Une liaison covalente se forme lorsque deux atomes **partagent des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | On ne peut pas vraiment mesurer le « bord » d’un atome, car le nuage électronique n’a pas de limite nette. Pour définir sa taille, on utilise donc la distance entre les noyaux de deux atomes liés. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | Pour deux atomes identiques liés entre eux : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |
| p7 | \text{rayon covalent} = \frac{\text{distance entre les deux noyaux}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |

## u2: Calcul du rayon covalent de l'hydrogène dans H2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a step-by-step numerical calculation of the covalent radius of hydrogen using the bond length in dihydrogen.

Accuracy: **accurate**. The bond length of 74 pm for H2 and the resulting covalent radius of 37 pm are physically accurate and correctly computed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### Exemple : la molécule de dihydrogène \(H_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Dans la molécule \(H_2\), deux atomes d’hydrogène sont liés par une liaison covalente. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | La distance entre leurs noyaux est d’environ **74 pm** (picomètres). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |
| p13 | 1\ \text{pm} = 10^{-12}\ \text{m} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | \] | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |
| p15 | Donc le rayon covalent de l’hydrogène vaut environ : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |
| p17 | \frac{74}{2} = 37\ \text{pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | \] | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;separator&#x27;] |
| p19 | Chaque atome d’hydrogène « occupe » donc environ 37 pm dans la liaison. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Tendances du rayon covalent dans le tableau périodique (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how and why the covalent radius changes across periods (nuclear charge increase) and down groups (additional electron shells).

Accuracy: **accurate**. The stated periodic trends (decrease across a period due to increased effective nuclear charge, increase down a group due to additional shells) are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p21 | ### Variation dans le tableau périodique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | Le rayon covalent varie selon la position de l’élément dans le tableau périodique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | - **De gauche à droite dans une période** : le rayon covalent diminue généralement.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |   Les protons sont plus nombreux dans le noyau, qui attire plus fortement les électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | - **De haut en bas dans une colonne** : le rayon covalent augmente généralement.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 |   Les atomes possèdent davantage de couches électroniques, donc ils deviennent plus grands. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Comparaison entre le fluor et le chlore (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the group trend using the comparison between halogen elements fluorine and chlorine.

Accuracy: **accurate**. Chlorine is indeed larger than fluorine due to having an additional electron shell.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | - le fluor est assez petit ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - le chlore est plus grand que le fluor, car il possède une couche électronique supplémentaire. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Dépendance du rayon selon la multiplicité de la liaison (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that covalent radius is not an immutable value for a given element, as bond length and covalent radius decrease with increasing bond order.

Accuracy: **accurate**. Single bonds are longer than double bonds, which are in turn longer than triple bonds; the qualification is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | ### Attention : le rayon dépend du type de liaison | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | Le rayon covalent n’est pas toujours exactement le même pour un même atome : | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p33 | - une **liaison simple** est plus longue ; | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p34 | - une **liaison double** est plus courte ; | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p35 | - une **liaison triple** est encore plus courte. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p36 | Ainsi, quand deux atomes sont liés plus fortement, ils sont généralement plus proches l’un de l’autre. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u6: Récapitulatif de la notion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential definition of covalent radius and its practical utility in comparing atomic sizes.

Accuracy: **accurate**. The summary correctly restates the fundamental concept and its purpose.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | &gt; Le **rayon covalent** est la moitié de la distance entre les noyaux de deux atomes identiques unis par une liaison covalente. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p40 | Il permet de comparer la taille des atomes lorsqu’ils forment des molécules. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

