# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a clear, high-school-level explanation of the covalent radius, including its definition, formula, illustrative calculations, periodic trends, and physical limitations.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 2,
    "CAVEAT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a covalent bond and covalent radius are, and provides the formula based on half of the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition of covalent radius as half the internuclear distance between two identical covalently bonded atoms is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le **rayon covalent** est une mesure de la taille d’un atome lorsqu’il est lié à un autre atome par une **liaison covalente**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | Une liaison covalente se forme lorsque deux atomes **partagent des électrons**. Par exemple, dans une molécule de dichlore \(Cl_2\), les deux atomes de chlore partagent une paire d’électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | On définit le rayon covalent ainsi : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p5 | \text{rayon covalent} = \frac{\text{distance entre les noyaux de deux atomes identiques liés}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Calculating the covalent radius of chlorine from Cl2 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the definition to the dichlorine molecule (Cl2) with given internuclear distance to deduce the covalent radius of chlorine.

Accuracy: **accurate**. The experimental bond length of Cl2 is approximately 198 pm, yielding a covalent radius of 99 pm for chlorine.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | Par exemple, si la distance entre les deux noyaux dans \(Cl_2\) vaut \(198\ \text{pm}\) (picomètres), alors : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | r_{\text{covalent}}(Cl)=\frac{198}{2}=99\ \text{pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u3: Picometer definition (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the SI unit picometer in terms of meters.

Accuracy: **accurate**. One picometer is correctly defined as 10^-12 meters.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | Un picomètre vaut : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | 1\ \text{pm}=10^{-12}\ \text{m} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u4: Estimating bond length via covalent radii addition (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radii can be added together to estimate the bond length between two different atoms.

Accuracy: **accurate**. The additivity of covalent radii as an approximation of single bond length is standard chemical practice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### Pourquoi cette notion est-elle utile ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | Le rayon covalent permet de comparer la taille des atomes et d’estimer la longueur des liaisons chimiques. En général, pour une liaison simple entre deux atomes A et B : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | \text{longueur de liaison A-B} \approx r_{\text{cov}}(A)+r_{\text{cov}}(B) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u5: Estimating the C-H bond length (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the addition of carbon and hydrogen covalent radii to estimate the C-H bond length.

Accuracy: **accurate**. Using typical covalent radii of ~76 pm for C and ~31 pm for H gives ~107 pm, matching the observed typical single C-H bond length of around 107-109 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | Par exemple, si le rayon covalent du carbone est environ \(76\ \text{pm}\) et celui de l’hydrogène environ \(31\ \text{pm}\), une liaison C–H mesure approximativement : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | 76+31=107\ \text{pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how and why the covalent radius changes across periods and down groups in the periodic table.

Accuracy: **accurate**. Accurately describes both trends (decrease across periods due to increasing nuclear charge, increase down groups due to additional electron shells).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### Évolution dans le tableau périodique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | - **De gauche à droite dans une période**, le rayon covalent diminue généralement.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 |   Les noyaux ont de plus en plus de protons et attirent donc plus fortement les électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p27 | - **De haut en bas dans une colonne**, le rayon covalent augmente généralement.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 |   Les atomes possèdent davantage de couches électroniques, donc ils sont plus grands. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Nature of atomic boundaries and covalent radius (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that atoms do not have hard physical boundaries and that covalent radii are operational parameters derived from molecular measurements.

Accuracy: **accurate**. Correctly states the quantum-mechanical limitation that electron density has no sharp cutoff, making atomic radii empirical/operational constructs.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### Attention | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | Le rayon covalent n’est pas une frontière parfaitement nette de l’atome : le nuage électronique n’a pas de bord précis. C’est donc une grandeur définie à partir de mesures de distances dans les molécules. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |

