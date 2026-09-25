# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains the mole concept in French for high school level chemistry, including counting particles, the Avogadro constant, molar mass, molar concentration, stoichiometry of formulas, and worked calculation examples.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 157,
  "content_unit_kinds": {
    "CONCEPT": 7,
    "ANALOGY": 1,
    "EXAMPLE": 3,
    "PROCEDURE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 157,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 13,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Nécessité et définition de la mole comme unité de comptage (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemists use the mole as a macroscopic counting unit due to the microscopic size of atoms, molecules, and ions.

Accuracy: **accurate**. Accurately introduces the mole as a counting unit for chemical entities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## Le concept de mole | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | En chimie, les atomes, molécules et ions sont **beaucoup trop petits** pour être comptés un par un. On utilise donc une unité de comptage appelée la **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Analogie de la mole avec la douzaine (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "C’est comme une **douzaine** :"}, {"passage_id": "p4", "quote": "- 1 douzaine = 12 objets ;"}]}

Annotation rationale: Compares the counting unit of a mole to an everyday dozen to make Avogadro's number intuitive.

Accuracy: **accurate**. The analogy with a dozen is conceptually standard, illustrative, and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | C’est comme une **douzaine** : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | - 1 douzaine = 12 objets ; | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - 1 mole = \(6{,}022 \times 10^{23}\) objets. | ANALOGY | {} | [&#x27;list&#x27;] |

## u3: La constante d'Avogadro et spécification des entités dénombrées (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the Avogadro constant N_A, provides its standard numerical value and unit (mol^-1), and emphasizes the necessity of specifying which entity is being counted.

Accuracy: **accurate**. The definition of the Avogadro constant and its value (6.022 x 10^23 mol^-1) are accurate, as is the advice to specify the counted chemical entities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | Ce très grand nombre s’appelle la **constante d’Avogadro**, notée \(N_A\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | N_A = 6{,}022 \times 10^{23}\ \text{mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | Ainsi : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 1 mol d’atomes de fer contient \(6{,}022 \times 10^{23}\) atomes de fer ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - 1 mol de molécules d’eau contient \(6{,}022 \times 10^{23}\) molécules d’eau ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - 1 mol d’ions sodium contient \(6{,}022 \times 10^{23}\) ions sodium. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | Il faut toujours préciser **ce que l’on compte** : atomes, molécules, ions, électrons, etc. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Formule reliant le nombre de particules et la quantité de matière (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical relations N = n * N_A and n = N / N_A defining the link between quantity of matter and particle count.

Accuracy: **accurate**. The symbols, units, and algebraic relations between N, n, and N_A are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## 1. Relier le nombre de particules et la quantité de matière | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | La quantité de matière se note généralement \(n\) et s’exprime en **moles** (mol). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | Le nombre de particules se note \(N\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | La relation est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p21 | \boxed{N = n \times N_A} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p22 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | ou, pour trouver le nombre de moles : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | \boxed{n = \frac{N}{N_A}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u5: Exemple de calcul du nombre de molécules dans 2,0 mol d'eau (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a calculation to determine the number of molecules in 2.0 mol of water using N = n * N_A.

Accuracy: **accurate**. The calculation 2.0 * 6.022 x 10^23 = 1.20 x 10^24 molecules is correct and properly rounded.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Combien y a-t-il de molécules dans \(2{,}0\) mol d’eau ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | N = n \times N_A | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | N = 2{,}0 \times 6{,}022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | N = 1{,}20 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | Il y a donc environ : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | \boxed{1{,}20 \times 10^{24}\ \text{molécules d’eau}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Définition de la masse molaire (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass M with units g/mol and gives illustrative values for H, O, and H2O.

Accuracy: **accurate**. The definition, units, and values of molar mass are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ## 2. La masse molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | La **masse molaire** est la masse d’une mole de substance. Elle se note \(M\) et s’exprime en : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p45 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p46 | \text{g·mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p48 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p49 | - masse molaire de l’hydrogène : \(M(\text{H}) \approx 1{,}0\ \text{g·mol}^{-1}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p50 | - masse molaire de l’oxygène : \(M(\text{O}) \approx 16{,}0\ \text{g·mol}^{-1}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p51 | - masse molaire de l’eau : \(M(\text{H}_2\text{O}) = 18{,}0\ \text{g·mol}^{-1}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p52 | Cela signifie que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p54 | 1\ \text{mol d’eau} = 18{,}0\ \text{g d’eau} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p55 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u7: Méthode de calcul d'une masse molaire moléculaire (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the general additive method for calculating the molar mass of a molecule from its constituent atomic molar masses using water as the working example.

Accuracy: **accurate**. The method and calculation M(H2O) = 2*1.0 + 16.0 = 18.0 g/mol are entirely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ### Calculer une masse molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | Pour l’eau, \(\text{H}_2\text{O}\) : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p58 | - il y a 2 atomes d’hydrogène ; | PROCEDURE | {} | [&#x27;list&#x27;] |
| p59 | - il y a 1 atome d’oxygène. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p60 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p61 | M(\text{H}_2\text{O}) = 2 \times M(\text{H}) + M(\text{O}) | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p62 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p63 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p64 | M(\text{H}_2\text{O}) = 2 \times 1{,}0 + 16{,}0 = 18{,}0\ \text{g·mol}^{-1} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p65 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p66 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Relation entre la masse et la quantité de matière (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the fundamental relationship n = m / M and its rearranged form m = n * M, with unit specifications.

Accuracy: **accurate**. The formulas connecting mass, molar mass, and moles are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p67 | ## 3. Relier la masse et la quantité de matière | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p68 | La relation principale est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p69 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p70 | \boxed{n = \frac{m}{M}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p71 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p72 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p73 | - \(n\) : quantité de matière, en mol ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p74 | - \(m\) : masse, en g ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p75 | - \(M\) : masse molaire, en g·mol\(^{-1}\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p76 | On peut aussi écrire : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p77 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p78 | \boxed{m = n \times M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p79 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u9: Exemple de conversion de masse en moles puis en molécules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies n = m / M and N = n * N_A to calculate the quantity of matter and particle count in 36.0 g of water.

Accuracy: **accurate**. All calculations (n = 36.0 / 18.0 = 2.0 mol, and N = 2.0 * 6.022 x 10^23 ≈ 1.20 x 10^24 molecules) are mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p80 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p81 | Quelle quantité de matière représente \(36{,}0\) g d’eau ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p82 | On sait que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p83 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | M(\text{H}_2\text{O}) = 18{,}0\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p87 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | n = \frac{m}{M} = \frac{36{,}0}{18{,}0} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \boxed{n = 2{,}0\ \text{mol}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | Ainsi, 36 g d’eau correspondent à 2 mol d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p94 | Le nombre de molécules correspondant est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p95 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | N = n \times N_A | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | N = 2{,}0 \times 6{,}022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \boxed{N \approx 1{,}20 \times 10^{24}\ \text{molécules}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Définition de la concentration molaire (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar concentration C = n / V with its typical units mol/L and its rearrangement n = C * V.

Accuracy: **accurate**. The definition and formulas for molar concentration in solution are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ## 4. Dans une solution : la concentration molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | Pour une solution, on utilise souvent la **concentration molaire**, notée \(C\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p107 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p108 | \boxed{C = \frac{n}{V}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p109 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p110 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p111 | - \(C\) en mol·L\(^{-1}\) ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p112 | - \(n\) en mol ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p113 | - \(V\) en L. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p114 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p115 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p116 | \boxed{n = C \times V} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p117 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u11: Exemple de calcul de la quantité de matière dans une solution (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the moles of NaCl in 0.500 L of solution at 0.20 mol/L using n = C * V.

Accuracy: **accurate**. The calculation n = 0.20 mol/L * 0.500 L = 0.100 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | On possède \(0{,}500\) L d’une solution de chlorure de sodium de concentration : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p120 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | C = 0{,}20\ \text{mol·L}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | La quantité de matière de chlorure de sodium est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p124 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | n = C \times V | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p128 | n = 0{,}20 \times 0{,}500 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \boxed{n = 0{,}100\ \text{mol}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Distinction entre moles de molécules et moles d'atomes (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the common student pitfall that 1 mole of a molecule contains multiple moles of its constituent atoms (illustrated with H2O and CO2).

Accuracy: **accurate**. Correctly distinguishes stoichiometric counts of constituent atoms per mole of compound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p134 | ## 5. Attention aux formules chimiques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p135 | Une mole de molécules peut contenir plusieurs moles d’atomes. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p136 | Par exemple, une molécule d’eau est \(\text{H}_2\text{O}\) : | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p137 | - 1 mol de molécules d’eau contient 2 mol d’atomes d’hydrogène ; | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p138 | - 1 mol de molécules d’eau contient 1 mol d’atomes d’oxygène. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p139 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p140 | \[ | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p141 | 1\ \text{mol de H}_2\text{O} \Rightarrow 2\ \text{mol de H} + 1\ \text{mol de O} | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p142 | \] | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p143 | De même, pour le dioxyde de carbone \(\text{CO}_2\) : | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p144 | \[ | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p145 | 1\ \text{mol de CO}_2 \Rightarrow 1\ \text{mol de C} + 2\ \text{mol de O} | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p146 | \] | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p147 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Tableau récapitulatif des grandeurs et formules (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a recap summary table compiling quantities, symbols, units, and formulas.

Accuracy: **accurate**. All quantities, symbols, units, and formulas in the summary table are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p148 | ## À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p149 | &#124; Grandeur &#124; Symbole &#124; Unité &#124; Formule &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p150 | &#124;---&#124;---:&#124;---:&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p151 | &#124; Quantité de matière &#124; \(n\) &#124; mol &#124; \(n = \frac{m}{M}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p152 | &#124; Masse &#124; \(m\) &#124; g &#124; \(m = nM\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p153 | &#124; Masse molaire &#124; \(M\) &#124; g·mol\(^{-1}\) &#124; calculée avec le tableau périodique &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p154 | &#124; Nombre de particules &#124; \(N\) &#124; sans unité &#124; \(N = nN_A\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p155 | &#124; Concentration molaire &#124; \(C\) &#124; mol·L\(^{-1}\) &#124; \(C = \frac{n}{V}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |

## u14: Rôle de la mole comme passerelle entre microscopique et macroscopique (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes with the core conceptual takeaway: the mole serves as a bridge linking the microscopic world of particles to macroscopic, measurable quantities.

Accuracy: **accurate**. The summary takeaway accurately synthesizes the fundamental purpose of the mole in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p156 | L’idée essentielle est donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p157 | &gt; La mole permet de passer du monde visible et mesurable (grammes, litres) au monde microscopique (atomes, molécules, ions). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

