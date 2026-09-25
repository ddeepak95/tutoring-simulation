# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains the concept of the mole, Avogadro's number, chemical entities, and molar mass relationships.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 127,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "ANALOGY": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 127,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 8,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and purpose of the mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemists use the mole as a special unit to count particles that are too small to be counted individually.

Accuracy: **accurate**. Accurately introduces the mole as a unit for counting microscopic particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## Le concept de mole | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | En chimie, les atomes, molécules et ions sont beaucoup trop petits pour être comptés un par un. On utilise donc une unité spéciale pour les compter : **la mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Analogy between a mole and a dozen (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "douzaine"}, {"passage_id": "p4", "quote": "1 douzaine = 12 objets"}]}

Annotation rationale: Uses the familiar concept of a dozen (package of 12 items) to help the student understand counting by packages with the mole.

Accuracy: **accurate**. The analogy correctly relates the dozen as a unit of 12 to the mole as a counting unit of 6.022 x 10^23.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | C’est un peu comme une **douzaine** : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | - 1 douzaine = 12 objets   | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - 1 mole = \(6{,}022 \times 10^{23}\) objets | ANALOGY | {} | [&#x27;list&#x27;] |

## u3: Avogadro's constant and illustrative quantities (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines Avogadro's constant (N_A) with its value and unit, and states the number of entities contained in one mole of different substances.

Accuracy: **accurate**. Correctly states Avogadro's constant as 6.022 x 10^23 mol^-1 and correctly applies it to atoms, molecules, and ions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | Ce nombre énorme s’appelle le **nombre d’Avogadro** : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | N_A = 6{,}022 \times 10^{23}\ \text{mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | Ainsi : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 1 mole d’atomes de fer contient \(6{,}022 \times 10^{23}\) atomes de fer ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - 1 mole de molécules d’eau contient \(6{,}022 \times 10^{23}\) molécules d’eau ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - 1 mole d’ions sodium contient \(6{,}022 \times 10^{23}\) ions sodium. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Types of elementary chemical entities (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the various chemical entities that can be counted using moles and qualifies that the entity being counted must always be specified.

Accuracy: **accurate**. Accurately lists elementary entities (atoms, molecules, ions, electrons) and correctly notes the necessity of specifying what is being counted.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## Que compte une mole ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | La mole peut compter différentes sortes d’entités chimiques : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | - des **atomes** : \(1\ \text{mol}\) de carbone ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | - des **molécules** : \(1\ \text{mol}\) de dioxygène \(O_2\) ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | - des **ions** : \(1\ \text{mol}\) d’ions chlorure \(Cl^-\) ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | - des électrons, des formules chimiques, etc. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 | Il faut toujours préciser ce que l’on compte. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u5: Moles of molecules versus moles of constituent atoms in water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates through worked deduction that 1 mol of H2O contains 2 mol of H atoms and 1 mol of O atoms based on molecular composition.

Accuracy: **accurate**. The stoichiometric reasoning is entirely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | 1\ \text{mol de } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | correspond à \(6{,}022 \times 10^{23}\) molécules d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | Or chaque molécule d’eau contient : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | - 2 atomes d’hydrogène ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - 1 atome d’oxygène. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | Donc, dans 1 mole d’eau, il y a : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | 2\ \text{mol d’atomes d’hydrogène} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | et | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | 1\ \text{mol d’atomes d’oxygène} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Formula relating amount of substance to number of entities (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the symbol n for amount of substance in moles and explains the equation N = n * N_A relating it to the count of entities N.

Accuracy: **accurate**. The equation N = n * N_A and the definitions of all variables and units are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ## La quantité de matière | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | La quantité de matière se note généralement \(n\) et s’exprime en **moles** : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p41 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 | n \text{ en mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p43 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p44 | Le nombre d’entités chimiques se note \(N\). La relation est : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p45 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | N = n \times N_A | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p47 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p48 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p49 | - \(N\) : nombre d’atomes, molécules ou ions ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p50 | - \(n\) : quantité de matière en mol ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p51 | - \(N_A\) : nombre d’Avogadro. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Calculating the number of molecules in 2.0 moles of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the relation N = n * N_A to compute the number of molecules present in 2.0 mol of water.

Accuracy: **accurate**. The calculation 2.0 * 6.022 x 10^23 ≈ 1.20 x 10^24 is mathematically and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | Combien y a-t-il de molécules dans \(2{,}0\) mol d’eau ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | N = n \times N_A | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | N = 2{,}0 \times 6{,}022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | N \approx 1{,}20 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | Il y a donc environ \(1{,}20 \times 10^{24}\) molécules d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Molar mass and the relationship between mass and moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass M in g/mol and presents the formulas connecting mass, amount of substance, and molar mass: m = n * M and n = m / M.

Accuracy: **accurate**. Molar mass and its fundamental equations (m = n * M and n = m / M) are correctly stated with their SI/practical units.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ## Le lien entre la mole et la masse | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | Chaque substance possède une **masse molaire**, notée \(M\), exprimée en grammes par mole : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p67 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p68 | M \text{ en g·mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p69 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p70 | La masse molaire indique la masse d’une mole de substance. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p71 | La relation importante est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p72 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p73 | m = n \times M | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p74 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p75 | ou, pour calculer le nombre de moles : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p76 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p77 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p78 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p79 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p80 | - \(m\) : masse en grammes ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p81 | - \(n\) : quantité de matière en mol ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p82 | - \(M\) : masse molaire en g·mol\(^{-1}\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p83 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Calculating the molar mass and mass of a mole of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p96", "quote": "dans un verre contenant 18 g d’eau"}]}

Annotation rationale: Walks through calculating the molar mass of H2O from atomic masses and relates it to an everyday glass containing 18 g of water.

Accuracy: **accurate**. The molar mass calculation M(H2O) = 18.0 g/mol and the physical interpretation are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p84 | ## Exemple avec l’eau | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p85 | La formule de l’eau est \(H_2O\). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p86 | - Masse molaire de H : environ \(1{,}0\ \text{g·mol}^{-1}\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p87 | - Masse molaire de O : environ \(16{,}0\ \text{g·mol}^{-1}\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p88 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p89 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | M(H_2O) = 2 \times 1{,}0 + 16{,}0 = 18{,}0\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | Cela signifie que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p93 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | 1\ \text{mol d’eau} = 18{,}0\ \text{g d’eau} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | Ainsi, dans un verre contenant 18 g d’eau, il y a environ une mole d’eau, c’est-à-dire plus de \(6 \times 10^{23}\) molécules ! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p97 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Calculating the molar mass and mass for carbon dioxide (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Computes the molar mass of CO2 (44.0 g/mol) and calculates the mass corresponding to 0.5 mol of CO2.

Accuracy: **accurate**. Calculations of M(CO2) = 44.0 g/mol and m = 0.5 * 44 = 22 g are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | ## Exemple avec le dioxyde de carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | Le dioxyde de carbone a pour formule \(CO_2\). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p100 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | M(CO_2) = 12{,}0 + 2 \times 16{,}0 = 44{,}0\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p104 | - 1 mol de \(CO_2\) a une masse de 44 g ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p105 | - 0,5 mol de \(CO_2\) a une masse de : | EXAMPLE | {} | [&#x27;list&#x27;] |
| p106 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | m = n \times M = 0{,}5 \times 44 = 22\ \text{g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Summary of key takeaways and final analogy (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p127", "quote": "œufs ou des objets du quotidien"}]}

Annotation rationale: Summarizes the essential definitions, values, and formulas of the chapter, concluding with the dozen-eggs analogy.

Accuracy: **accurate**. The recap accurately synthesizes all core concepts, constants, and formulas.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ## À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | - La **mole** est une unité qui permet de compter des particules microscopiques. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p112 | - Une mole contient toujours : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p113 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p114 | 6{,}022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p115 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p116 | entités chimiques. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p117 | - Relations essentielles : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p118 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p119 | N = n \times N_A | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p120 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p121 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p122 | m = n \times M | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p123 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p124 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p125 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p126 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p127 | En résumé : la mole est au monde des atomes et des molécules ce que la douzaine est au monde des œufs ou des objets du quotidien. | ANALOGY | {} | [&#x27;prose&#x27;] |

