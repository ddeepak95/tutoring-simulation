# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and thoroughly explains the mole concept for high school chemistry, addressing why a counting unit is necessary, defining the mole and Avogadro's constant, introducing molar mass with examples, presenting analogies, and showing its use in reaction stoichiometry.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 51,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 7,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 51,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 9,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 12,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Nécessité d'une unité de comptage adaptée en chimie (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemists need a dedicated counting unit (the mole) due to the immense number and minute size of microscopic particles.

Accuracy: **accurate**. Correctly states that atoms are too tiny and numerous to count individually, necessitating an appropriate counting unit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le concept de mole est l’un des plus importants (et parfois les plus abstraits) en chimie au lycée. Je vais te l’expliquer de manière simple, progressive et concrète, comme si on était en cours. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### 1. Pourquoi avons-nous besoin de la mole ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Les atomes et les molécules sont **extrêmement petits**. On ne peut pas les compter un par un comme des billes.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | Si on voulait faire des calculs avec des nombres aussi énormes, ce serait impraticable. Les chimistes ont donc inventé une **unité de comptage** adaptée : la **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Exemple du nombre de molécules dans un verre d'eau (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Dans un verre d’eau, il y a environ 10²⁴ molécules d’eau."}]}

Annotation rationale: Illustrates the vast number of molecules present in an everyday amount of matter (a glass of water).

Accuracy: **accurate**. A glass of water contains around 200-250 g of water, corresponding to ~11-14 moles, or ~7-8 x 10²⁴ molecules, which is appropriately approximated as ~10²⁴.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | - Dans un verre d’eau, il y a environ 10²⁴ molécules d’eau. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Exemple du nombre d'atomes dans un morceau de cuivre (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "- Dans un morceau de cuivre de la taille d’un ongle, il y a des milliards de milliards d’atomes."}]}

Annotation rationale: Illustrates the astronomical number of atoms contained within a small fingernail-sized piece of copper.

Accuracy: **accurate**. A fingernail-sized piece of copper weighing around 0.5-1 g contains roughly 10²² atoms, corresponding accurately to 'des milliards de milliards' (10¹⁸ to 10²²).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | - Dans un morceau de cuivre de la taille d’un ongle, il y a des milliards de milliards d’atomes. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Définition de la mole et nombre d'Avogadro (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "La mole est à la chimie ce que la **douzaine** est au quotidien."}, {"passage_id": "p10", "quote": "- 1 douzaine = 12 objets (œufs, croissants, etc.)"}]}

Annotation rationale: Defines what a mole is, introduces Avogadro's number, and explains how it serves as a bridge connecting the microscopic world to the macroscopic scale.

Accuracy: **accurate**. The definition of the mole, the numerical approximation 6.02 × 10²³ for the Avogadro number, and its role in bridging microscopic entities to macroscopic mass are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### 2. Qu’est-ce qu’une mole ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | La mole est à la chimie ce que la **douzaine** est au quotidien. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | - 1 douzaine = 12 objets (œufs, croissants, etc.) | ANALOGY | {} | [&#x27;list&#x27;] |
| p11 | - **1 mole = 6,02 × 10²³ particules** (atomes, molécules, ions…) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | Ce nombre s’appelle le **nombre d’Avogadro** (noté N_A).   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | 6,02 × 10²³ = 602 000 000 000 000 000 000 000 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | C’est un nombre immense, mais il a été choisi volontairement : il permet de relier le monde microscopique (les atomes) au monde macroscopique (les grammes que l’on peut peser). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Définition et rôle de la masse molaire (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of molar mass, its units (g/mol), and how it links the mass of one mole of a substance to the atomic/molecular mass on the periodic table.

Accuracy: **accurate**. Accurately introduces molar mass based on the traditional reference standard of carbon-12 and its numerical equivalence with atomic and molecular mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. Le lien avec la masse : la masse molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | C’est la partie la plus utile. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | On a décidé que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | - **1 mole d’atomes de carbone-12** pèse exactement **12 grammes**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | - Et dans ces 12 g, il y a exactement **6,02 × 10²³ atomes**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | À partir de là, on peut définir la **masse molaire** (M) : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | - C’est la masse d’**une mole** d’une substance, exprimée en g/mol. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | - Elle correspond numériquement à la masse atomique ou moléculaire (que tu trouves dans le tableau périodique). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Exemple de masse molaire : le carbone (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates molar mass using elemental carbon, showing that 1 mole (6.02 × 10²³ atoms) corresponds to 12 g.

Accuracy: **accurate**. The molar mass of carbon (12 g/mol) and its representation as 6.02 × 10²³ atoms weighing 12 g are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | **Exemples simples :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | &#124; Substance       &#124; Formule &#124; Masse molaire &#124; Ce que ça représente                     &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124;-----------------&#124;---------&#124;---------------&#124;------------------------------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p26 | &#124; Carbone         &#124; C       &#124; 12 g/mol      &#124; 6,02 × 10²³ atomes de carbone → 12 g     &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Exemple de masse molaire : l'eau (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of a molecular compound (H₂O), showing that 1 mole corresponds to 18 g.

Accuracy: **accurate**. The molar mass of water (18 g/mol) and its particle count representation are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | &#124; Eau             &#124; H₂O     &#124; 18 g/mol      &#124; 6,02 × 10²³ molécules d’eau → 18 g       &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Exemple de masse molaire : le dioxygène (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of a diatomic gaseous element (O₂), showing that 1 mole corresponds to 32 g.

Accuracy: **accurate**. The molar mass of dioxygen gas (32 g/mol) and its particle count representation are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | &#124; Dioxygène       &#124; O₂      &#124; 32 g/mol      &#124; 6,02 × 10²³ molécules d’O₂ → 32 g        &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Exemple de masse molaire : le chlorure de sodium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of an ionic compound (NaCl), noting that 1 mole corresponds to 58.5 g.

Accuracy: **accurate**. The molar mass of sodium chloride (58.5 g/mol) and its representation in formula units are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | &#124; Chlorure de sodium &#124; NaCl  &#124; 58,5 g/mol    &#124; 6,02 × 10²³ &quot;unités&quot; NaCl → 58,5 g       &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u10: Analogie de la douzaine appliquée à des substances de masses différentes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p36", "quote": "- 12 roses = 1 douzaine de roses"}, {"passage_id": "p37", "quote": "- 12 cailloux = 1 douzaine de cailloux"}]}

Annotation rationale: Uses the analogy of dozens of roses versus dozens of pebbles to explain why equal numbers of particles have different total masses for different substances.

Accuracy: **accurate**. The analogy accurately conveys that counting units fix the particle count rather than the total mass, which varies depending on individual entity weight.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### 4. Analogie pour bien comprendre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | Imagine que tu veuilles comparer des quantités de substances différentes. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p32 | - Tu as 12 g de carbone (1 mole) → 6,02 × 10²³ atomes | ANALOGY | {} | [&#x27;list&#x27;] |
| p33 | - Tu as 18 g d’eau (1 mole) → 6,02 × 10²³ molécules | ANALOGY | {} | [&#x27;list&#x27;] |
| p34 | - Tu as 32 g d’oxygène (1 mole) → 6,02 × 10²³ molécules | ANALOGY | {} | [&#x27;list&#x27;] |
| p35 | Même si les masses sont différentes, tu as **le même nombre de particules**. C’est exactement comme dire : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p36 | - 12 roses = 1 douzaine de roses | ANALOGY | {} | [&#x27;list&#x27;] |
| p37 | - 12 cailloux = 1 douzaine de cailloux | ANALOGY | {} | [&#x27;list&#x27;] |
| p38 | Tu as le même nombre, même si le poids total change. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u11: Rôle de la mole dans les calculs chimiques et les réactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the mole concept enables chemists to bridge measurable masses to stoichiometric particle proportions in chemical calculations.

Accuracy: **accurate**. Accurately describes how the mole allows calculating quantities of matter, masses, and gas volumes based on stoichiometric reaction proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### 5. Pourquoi c’est utile en chimie ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | Dans une réaction chimique, les atomes se combinent en **proportions précises**. La mole permet de passer facilement des grammes (ce qu’on pèse) aux nombres d’atomes/molécules (ce qui se passe vraiment). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p45 | C’est ce qui permet de faire tous les calculs de **quantités de matière** (en mol), de masses, de volumes de gaz, etc. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u12: Exemple de réaction chimique et conservation des moles : synthèse de l'eau (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates stoichiometry using the reaction 2 H₂ + O₂ → 2 H₂O, relating coefficients to moles and masses.

Accuracy: **contains_error**. Passage p44 states: 'On a le même nombre de molécules de chaque côté'. This is factually incorrect for the reaction 2 H₂ + O₂ → 2 H₂O, where 3 reactant molecules (2 of H₂ and 1 of O₂) form 2 product molecules (2 of H₂O). The number of molecules is not conserved; only the number of atoms of each element is conserved.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | **Exemple :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | 2 H₂ + O₂ → 2 H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | - 2 moles de H₂ (4 g) + 1 mole de O₂ (32 g) → 2 moles d’eau (36 g) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | - On a le même nombre de molécules de chaque côté. | EXAMPLE | {} | [&#x27;list&#x27;] |

Error (major; p44): The passage incorrectly claims that there is the same number of molecules on each side of the reaction 2 H₂ + O₂ → 2 H₂O.

Correction: The number of molecules is not conserved (3 molecules react to form 2 molecules). Rather, it is the number of atoms of each element (4 hydrogen atoms and 2 oxygen atoms) and the total mass (36 g) that are conserved on each side.

## u13: Récapitulatif des points clés sur le concept de mole (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential definitions and key takeaways of the mole concept for the student, followed by a conversational closing offer for practice.

Accuracy: **accurate**. The summary correctly synthesizes the fundamental properties and role of the mole in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ### En résumé (à retenir) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | - 1 mole = 6,02 × 10²³ particules (nombre d’Avogadro) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | - La masse d’une mole = masse molaire (en g/mol) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | - La mole permet de compter les atomes et molécules en les pesant. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p50 | - C’est l’unité de base pour tous les calculs en chimie. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p51 | Tu veux que je t’explique maintenant comment **calculer** avec les moles (passer de la masse aux moles, faire des proportions dans une réaction, etc.) ? Je peux te donner des exemples concrets et des exercices simples. Dis-moi où tu en es ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

