# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and thoroughly explains stoichiometry in chemistry, including definition, balanced equations, molar ratios, mass-to-mole calculations, limiting reactants, real-world applications, and problem-solving steps.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 49,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 3,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 49,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 8,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and core principles of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry and explains its underlying physical principles (conservation of mass and mole ratios from balanced equations). Includes the introductory greeting and section heading.

Accuracy: **accurate**. Accurately defines stoichiometry and references Lavoisier's conservation of mass and balanced chemical equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Je suis ravi de t&#x27;expliquer la **stœchiométrie** de manière simple et claire, comme si nous étions en cours de chimie au lycée. On va y aller étape par étape, avec des exemples concrets. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Qu’est-ce que la stœchiométrie ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | La stœchiométrie est la partie de la chimie qui permet de calculer les **quantités** (en masse, en moles ou en volume) des substances qui réagissent et qui sont produites dans une réaction chimique.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | Elle repose sur deux principes fondamentaux : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | - La **conservation de la masse** (loi de Lavoisier) : rien ne se perd, rien ne se crée, tout se transforme. La masse totale des réactifs est égale à celle des produits. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | - Les **rapports en moles** donnés par l’équation chimique équilibrée. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u2: Cooking recipe analogy for stoichiometric proportions (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "En gros, c’est comme une recette de cuisine : si tu veux doubler la quantité de gâteau, tu doubles tous les ingrédients selon les proportions exactes."}]}

Annotation rationale: Compares stoichiometric proportions to doubling ingredients in a recipe for baking a cake.

Accuracy: **accurate**. The kitchen recipe analogy is a standard, correct high school pedagogical tool to explain stoichiometric ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | En gros, c’est comme une recette de cuisine : si tu veux doubler la quantité de gâteau, tu doubles tous les ingrédients selon les proportions exactes. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Balanced equation and molar interpretation of water synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how balanced reaction coefficients translate to molecular and molar ratios using the water synthesis equation.

Accuracy: **accurate**. The equation 2 H2 + O2 -> 2 H2O is correctly balanced, and the 2:1:2 molar and molecular ratios are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### 1. L’équation chimique équilibrée (point de départ) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Avant tout calcul, l’équation doit être **équilibrée** (le nombre d’atomes de chaque élément doit être le même à gauche et à droite). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | Exemple classique : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | 2\,\ce{H2} + \ce{O2} \rightarrow 2\,\ce{H2O} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p13 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p14 | Interprétation : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | - 2 molécules d’hydrogène (H₂) réagissent avec 1 molécule d’oxygène (O₂) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | - Pour former 2 molécules d’eau (H₂O) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | En termes de **moles** (l’unité de quantité de matière) : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | - Rapport molaire = **2 : 1 : 2** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | Cela signifie que pour 2 moles d’H₂, il faut 1 mole d’O₂ et on obtient 2 moles d’H₂O. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Worked mass-to-mass stoichiometric calculation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked multi-step stoichiometric calculation starting from 8 g of H2 to calculate the resulting mass of H2O.

Accuracy: **accurate**. All calculations (molar masses, mole conversions, mole ratios, final mass of 72 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### 2. Les calculs stœchiométriques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | On utilise les rapports molaires pour passer d’une substance à une autre. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | **Exemple** : Combien de grammes d’eau peut-on obtenir avec 8 g d’hydrogène (H₂) ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | 1. Calculer le nombre de moles d’H₂ : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 |    - Masse molaire de H₂ = 2 g/mol | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 |    - \( n = \frac{m}{M} = \frac{8}{2} = 4 \) moles d’H₂ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 | 2. Utiliser le rapport : 2 moles d’H₂ → 2 moles d’H₂O (rapport 1:1) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |    - Donc 4 moles d’H₂ donnent **4 moles** d’H₂O | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | 3. Calculer la masse d’eau : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |    - Masse molaire de H₂O = 18 g/mol | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 |    - \( m = n \times M = 4 \times 18 = 72 \) g d’eau | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Definition and concept of limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and explains how it limits the extent of the reaction.

Accuracy: **accurate**. Accurately introduces the concept of the limiting reactant.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### 3. Le réactif limitant (un peu plus avancé) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | Parfois, un des réactifs est en quantité insuffisante. C’est lui qui « limite » la réaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Worked example identifying limiting and excess reactants (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through an example with 4 moles of H2 and 3 moles of O2 to determine the limiting reagent and leftover excess reactant.

Accuracy: **accurate**. Calculations and logical deductions are completely correct: 4 mol H2 consumes 2 mol O2, leaving 1 mol O2 in excess, and producing 4 mol H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | Exemple : Tu as 4 moles d’H₂ et 3 moles d’O₂. Quel est le réactif limitant ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | - Selon l’équation : 2 moles H₂ nécessitent 1 mole O₂ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 | - Avec 4 moles H₂, il faudrait 2 moles O₂ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 | - Mais tu as 3 moles d’O₂ (en excès) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p37 | - Donc H₂ est limitant : on ne peut produire que 4 moles d’eau (et il restera 1 mole d’O₂ inutilisée). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Real-world applications and importance of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists diverse domains where stoichiometry is applied, including industry, pharmacy, environmental science, and laboratory work.

Accuracy: **accurate**. Accurately represents the practical and scientific importance of stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### Pourquoi c’est important ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | La stœchiométrie sert dans : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | - L’industrie (fabrication d’engrais, de médicaments, d’essence) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 | - La pharmacie (dosage des médicaments) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p42 | - L’environnement (calcul des émissions de CO₂) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p43 | - Les expériences en labo (savoir exactement combien peser de chaque produit) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Step-by-step problem-solving strategy for stoichiometry (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a general reusable 4-step sequence for solving stoichiometry problems.

Accuracy: **accurate**. The procedural steps correspond to standard, correct high school methodology for stoichiometric problem solving.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ### Astuce pour réussir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | 1. Toujours équilibrer l’équation d’abord. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p46 | 2. Convertir les masses en moles. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p47 | 3. Utiliser les coefficients stœchiométriques comme des « multiplicateurs ». | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p48 | 4. Reconvertir en masse ou volume si nécessaire. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Offer for practice exercises and follow-up questions (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Offers interactive follow-up practice with combustion or acid-base reactions and invites questions.

Accuracy: **accurate**. Valid pedagogical conversational prompt offering relevant chemistry practice topics.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | Tu as compris le principe ? Veux-tu qu’on fasse un exercice ensemble (par exemple avec une combustion ou une réaction acide-base) ? Ou as-tu une question sur un point précis ? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

