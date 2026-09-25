# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains the concept of covalent radius to a high school student, including its definition, an illustrative calculation, its utility, distinctions from other radii, units of measurement, and periodic trends.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 18,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 18,
  "unique_subtopics": 6,
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

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the covalent radius as half the distance between the nuclei of two identical atoms joined by a single covalent bond, explaining why the distance is divided by two.

Accuracy: **accurate**. The definition accurately states that the covalent radius corresponds to half the internuclear distance in a homonuclear singly bonded molecule.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le rayon covalent est une façon de mesurer la taille d’un atome quand il forme une liaison covalente avec un autre atome. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Définition simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Quand deux atomes identiques se lient par une liaison covalente simple (ils partagent une paire d’électrons), on mesure la distance entre leurs deux noyaux. Le **rayon covalent** est la moitié de cette distance. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | On divise par deux parce que chaque atome apporte « sa part » à la liaison. Si les deux atomes sont exactement les mêmes, chacun occupe la moitié de l’espace entre les noyaux. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation of chlorine covalent radius in Cl₂ (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation of the covalent radius of chlorine using the known internuclear distance of dichlorine (198 pm).

Accuracy: **accurate**. The internuclear distance of 198 pm in Cl₂ and the resulting covalent radius of 99 pm are standard, accurate chemistry values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### Exemple concret : le dichlore (Cl₂) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | - Dans la molécule Cl₂, les deux atomes de chlore sont reliés par une liaison covalente. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | - La distance entre les deux noyaux de chlore est de 198 pm (picomètres). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | - Le rayon covalent du chlore = 198 ÷ 2 = **99 pm**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | C’est comme si chaque atome de chlore « occupait » 99 pm de rayon dans cette liaison. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Utility of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radii are useful, including comparing atom sizes and estimating bond lengths in heteronuclear molecules (e.g., C-H).

Accuracy: **accurate**. Estimating bond length as the sum of covalent radii is a standard method and the illustrative values (77 pm for C, 37 pm for H, yielding ~114 pm for C-H) accurately match introductory chemistry conventions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### Pourquoi on utilise le rayon covalent ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | - Il permet de comparer la taille des atomes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - Il aide à prévoir la longueur d’une liaison dans d’autres molécules. Par exemple, si tu connais le rayon covalent du carbone (77 pm) et celui de l’hydrogène (37 pm), tu peux estimer que la liaison C–H fera environ 77 + 37 = 114 pm (valeur réelle très proche). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u4: Distinction from van der Waals and ionic radii (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the scope of the covalent radius, qualifying that it applies only to covalently bonded atoms and cautioning against conflating it with van der Waals or ionic radii.

Accuracy: **accurate**. The distinction between covalent radius, van der Waals radius (non-bonded atoms), and ionic radius (ions) is scientifically sound and appropriately scoped.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### Remarques importantes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - On parle de **rayon covalent** uniquement quand les atomes sont liés par une liaison covalente (partage d’électrons). Ce n’est pas la même chose que le rayon de van der Waals (quand les atomes ne sont pas liés) ni que le rayon ionique (quand l’atome a gagné ou perdu des électrons). | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

## u5: Unit of measurement (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Specifies that covalent radii are typically expressed in picometers and states the conversion to meters.

Accuracy: **accurate**. 1 picometer is correctly identified as 10⁻¹² meters.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | - Les valeurs sont données en picomètres (pm) : 1 pm = 10⁻¹² m. Ce sont des distances extrêmement petites ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius varies across periods and down groups in the periodic table, and includes the closing interactive prompt.

Accuracy: **accurate**. The periodic trends described (increasing down a group due to additional electron shells, decreasing across a period due to increasing nuclear charge) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### Petite astuce pour retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | Plus un atome a beaucoup de couches électroniques (en descendant dans le tableau périodique), plus son rayon covalent est grand. À l’inverse, dans une même période, plus le numéro atomique augmente, plus les électrons sont attirés vers le noyau et plus le rayon covalent diminue. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | Tu veux que je t’explique maintenant comment le rayon covalent varie dans le tableau périodique avec des exemples précis ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

