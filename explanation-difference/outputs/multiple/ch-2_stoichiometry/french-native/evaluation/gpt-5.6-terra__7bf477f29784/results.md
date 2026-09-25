# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and accurately explains stoichiometry for a high school chemistry audience, including reaction balancing, molar ratios, molar conversions, and limiting reactants.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 215,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 3,
    "PROCEDURE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 215,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 9,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and scope of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry by stating its definition and listing typical practical questions it addresses.

Accuracy: **accurate**. The definition of stoichiometry and the questions it addresses are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # La stœchiométrie : comprendre les proportions en chimie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | La **stœchiométrie** est la partie de la chimie qui permet de calculer les **quantités de réactifs** nécessaires et les **quantités de produits** formées lors d’une réaction chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | En résumé, elle répond à des questions comme : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | - Combien de grammes d’un produit peut-on obtenir ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - Quelle masse de réactif faut-il utiliser ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - Quel réactif va manquer en premier ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - Quel volume de gaz sera produit ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Chemical equations as recipes and stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "On peut comparer une équation chimique à une recette de cuisine."}]}

Annotation rationale: Explains how balanced chemical equations and stoichiometric coefficients indicate proportions at both molecular and molar levels.

Accuracy: **accurate**. The explanation of stoichiometric coefficients and their interpretation in terms of molecules and moles is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## 1. Une réaction chimique est une « recette » | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | On peut comparer une équation chimique à une recette de cuisine. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p12 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p13 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p14 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p15 | Cette équation signifie que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | - 2 molécules de dihydrogène \(H_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | - réagissent avec 1 molécule de dioxygène \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | - pour former 2 molécules d’eau \(H_2O\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p19 | Les nombres placés devant les formules sont appelés les **coefficients stœchiométriques**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | Ici, le rapport est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p22 | 2 \text{ mol } H_2 : 1 \text{ mol } O_2 : 2 \text{ mol } H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p23 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p24 | Autrement dit : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | - 2 moles de \(H_2\) réagissent avec 1 mole de \(O_2\), | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | - et produisent 2 moles de \(H_2O\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Balancing equations and conservation of atoms (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why and how chemical equations must be balanced according to the conservation of atoms, including the caveat that chemical formulas must not be altered.

Accuracy: **accurate**. The explanation of the conservation of atoms, balancing steps, atom audit table, and warning against modifying chemical subscripts are chemically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## 2. Pourquoi faut-il équilibrer une équation ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | Lors d’une réaction chimique, les atomes ne disparaissent pas et ne sont pas créés : ils se réorganisent. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | C’est la **conservation des atomes**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | Prenons la formation de l’eau : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p33 | H_2 + O_2 \rightarrow H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p34 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | Cette équation n’est pas équilibrée : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | - à gauche : 2 atomes d’oxygène ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p37 | - à droite : 1 atome d’oxygène. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p38 | Il faut donc la corriger : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p40 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p41 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p42 | Vérification : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | &#124; Élément &#124; À gauche &#124; À droite &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p44 | &#124;---&#124;---:&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p45 | &#124; H &#124; 4 &#124; 4 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p46 | &#124; O &#124; 2 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p47 | L’équation est équilibrée. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p48 | &gt; Important : on ne modifie jamais les petits chiffres dans les formules chimiques.   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p49 | &gt; Par exemple, on ne transforme pas \(H_2O\) en \(H_2O_2\).   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p50 | &gt; On ajoute seulement des coefficients devant les espèces chimiques. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: The mole concept and Avogadro constant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p59", "quote": "C’est un peu comme une douzaine :"}, {"passage_id": "p60", "quote": "- une douzaine = 12 objets ;"}]}

Annotation rationale: Explains why chemists use the mole, defines Avogadro's constant, provides the dozen analogy, and introduces the symbol n and unit mol.

Accuracy: **accurate**. The definition of the mole, Avogadro's number, and standard notation (n, mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | ## 3. La mole : l’unité utilisée en stœchiométrie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | Les molécules sont beaucoup trop petites pour être comptées une à une. Les chimistes utilisent donc la **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p54 | Une mole contient : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p55 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p56 | N_A = 6{,}02 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p57 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p58 | entités chimiques (atomes, molécules, ions…). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p59 | C’est un peu comme une douzaine : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | - une douzaine = 12 objets ; | ANALOGY | {} | [&#x27;list&#x27;] |
| p61 | - une mole = \(6{,}02 \times 10^{23}\) objets. | ANALOGY | {} | [&#x27;list&#x27;] |
| p62 | On note la quantité de matière : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p63 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p64 | n | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | et son unité est la mole, notée **mol**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p67 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Relationship between mass and moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how to convert mass to quantity of matter using molar mass and states the relationship n = m / M.

Accuracy: **accurate**. The relation n = m / M and its associated units are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p68 | ## 4. Passer de la masse aux moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p69 | En laboratoire, on mesure souvent une masse en grammes. Pour utiliser une équation chimique, il faut généralement convertir cette masse en quantité de matière. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p70 | La formule est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p71 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p72 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p73 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p74 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p75 | - \(n\) : quantité de matière, en mol ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p76 | - \(m\) : masse, en g ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p77 | - \(M\) : masse molaire, en g·mol\(^{-1}\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Calculating the amount of substance in 18 g of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the n = m / M formula step by step to calculate the moles present in 18 g of water.

Accuracy: **accurate**. The molar mass calculation M(H2O) = 18 g/mol and the resulting n = 1.0 mol are exact.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p78 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p79 | Calculons la quantité de matière contenue dans 18 g d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p80 | La masse molaire de l’eau est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p81 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | M(H_2O)=2 \times 1 + 16 = 18 \text{ g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | n(H_2O)=\frac{18}{18}=1{,}0 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | Ainsi, 18 g d’eau correspondent à 1 mole d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p89 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Four-step methodology for stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general reusable 4-step workflow for solving stoichiometry exercises: write/balance, convert to moles, apply stoichiometric ratios, and convert back to desired quantity.

Accuracy: **accurate**. The procedural steps, molar conversion formulas, and stoichiometric equality relationships are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p90 | ## 5. Méthode générale pour résoudre un exercice de stœchiométrie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | Voici la méthode à retenir. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p92 | ### Étape 1 : Écrire et équilibrer l’équation chimique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | Exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p94 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p95 | 2H_2 + O_2 \rightarrow 2H_2O | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p96 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p97 | ### Étape 2 : Convertir les données en moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | Si on donne une masse, utiliser : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p99 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p100 | n = \frac{m}{M} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p101 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p102 | Si on donne une concentration et un volume de solution : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p103 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p104 | n = C \times V | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p105 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p106 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p107 | - \(C\) en mol·L\(^{-1}\), | PROCEDURE | {} | [&#x27;list&#x27;] |
| p108 | - \(V\) en L. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p109 | ### Étape 3 : Utiliser les coefficients de l’équation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | Les coefficients donnent les proportions en moles. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p111 | Dans : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p112 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p113 | 2H_2 + O_2 \rightarrow 2H_2O | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p114 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p115 | on a : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p116 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p117 | \frac{n(H_2)}{2} = \frac{n(O_2)}{1} = \frac{n(H_2O)}{2} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p118 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p119 | ### Étape 4 : Reconvertir si nécessaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p120 | On peut revenir à une masse grâce à : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p121 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p122 | m = n \times M | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p123 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p124 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked stoichiometry problem: water produced from 4.0 g of hydrogen gas (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a comprehensive worked solution applying the 4-step method to find the mass of water formed from 4.0 g of H2.

Accuracy: **accurate**. All calculations (molar masses, conversion to 2.0 mol H2, stoichiometric 1:1 relation between H2 and H2O, and final mass 36.0 g H2O) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p125 | # Exemple complet | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p126 | On fait réagir 4,0 g de dihydrogène \(H_2\) avec suffisamment de dioxygène. Quelle masse d’eau peut-on former ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p127 | ### 1. Équation équilibrée | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p128 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | ### 2. Calcul de la quantité de matière de dihydrogène | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p132 | La masse molaire de \(H_2\) est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p133 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | M(H_2)=2{,}0 \text{ g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p135 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p136 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p137 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | n(H_2)=\frac{m}{M}=\frac{4{,}0}{2{,}0}=2{,}0 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p140 | ### 3. Utilisation des coefficients | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p141 | L’équation indique : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p142 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p144 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p146 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | n(H_2O)=2{,}0 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p148 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p149 | ### 4. Calcul de la masse d’eau formée | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p150 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | M(H_2O)=18{,}0 \text{ g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p153 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p154 | m(H_2O)=n \times M=2{,}0 \times 18{,}0=36{,}0 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p155 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p156 | **Réponse :** 4,0 g de dihydrogène peuvent former **36,0 g d’eau**, si le dioxygène est en quantité suffisante. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p157 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Definition of the limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and explains why it determines the amount of products formed.

Accuracy: **accurate**. The definition and role of the limiting reactant are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p158 | ## 6. Le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p159 | Souvent, les deux réactifs ne sont pas présents dans les bonnes proportions. Celui qui est entièrement consommé en premier s’appelle le **réactif limitant**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p160 | C’est lui qui limite la quantité de produit formé. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u10: Worked determination of limiting reactant from 3 mol H2 and 2 mol O2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates which reactant is limiting when starting with 3 mol of H2 and 2 mol of O2, and computes the excess O2 remaining.

Accuracy: **accurate**. The reasoning comparing required O2 (1.5 mol) to available O2 (2 mol) and calculating 0.5 mol excess O2 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p161 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p162 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p163 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p164 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p165 | Supposons qu’on possède : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p166 | - \(3\) mol de \(H_2\), | EXAMPLE | {} | [&#x27;list&#x27;] |
| p167 | - \(2\) mol de \(O_2\). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p168 | D’après l’équation, il faut : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p169 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p170 | 2 \text{ mol } H_2 \text{ pour } 1 \text{ mol } O_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p171 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p172 | Pour faire réagir 3 mol de \(H_2\), il faudrait : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p173 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p174 | \frac{3}{2}=1{,}5 \text{ mol de } O_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p175 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p176 | Or on possède 2 mol de \(O_2\), donc il y en a assez. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p177 | Le dihydrogène \(H_2\) est donc le **réactif limitant**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p178 | Il restera : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p179 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p180 | 2 - 1{,}5 = 0{,}5 \text{ mol de } O_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p181 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p182 | à la fin de la réaction. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p183 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Ratio comparison method for finding the limiting reactant (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the general method of computing n / stoichiometric coefficient for each reactant, illustrated with a quick application.

Accuracy: **accurate**. The quotient method n/coeff is a standard, correct technique for identifying limiting reactants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p184 | ## 7. Astuce pour trouver le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p185 | On peut calculer, pour chaque réactif : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p186 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p187 | \frac{n}{\text{coefficient stœchiométrique}} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p188 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p189 | Le plus petit résultat correspond au réactif limitant. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p190 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p191 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p192 | 2H_2 + O_2 \rightarrow 2H_2O | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p193 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p194 | avec 3 mol de \(H_2\) et 2 mol de \(O_2\) : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p195 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p196 | \frac{n(H_2)}{2}=\frac{3}{2}=1{,}5 | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p197 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p198 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p199 | \frac{n(O_2)}{1}=\frac{2}{1}=2 | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p200 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p201 | Le plus petit nombre est 1,5 : le réactif limitant est donc \(H_2\). | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p202 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Summary of key stoichiometry concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p215", "quote": "6. La stœchiométrie ressemble à une recette : les coefficients indiquent les quantités nécessaires de chaque « ingrédient »."}]}

Annotation rationale: Presents a bulleted summary of essential rules and formulas to remember for stoichiometry.

Accuracy: **accurate**. The recap accurately synthesizes all core concepts without errors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p203 | # À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p204 | 1. **Équilibrer l’équation** chimique. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p205 | 2. Les coefficients donnent les **proportions en moles**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p206 | 3. Pour passer de grammes à moles : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p207 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p208 | n=\frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p209 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p210 | 4. Pour passer de moles à grammes : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p211 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p212 | m=nM | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p213 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p214 | 5. Le **réactif limitant** est celui qui est consommé complètement en premier. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p215 | 6. La stœchiométrie ressemble à une recette : les coefficients indiquent les quantités nécessaires de chaque « ingrédient ». | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

