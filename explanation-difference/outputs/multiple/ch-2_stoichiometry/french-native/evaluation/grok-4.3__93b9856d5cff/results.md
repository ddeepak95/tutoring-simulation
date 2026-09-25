# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text provides a comprehensive pedagogical explanation of stoichiometry for high school chemistry, covering definition, chemical equations, coefficients, the mole concept, stoichiometric calculations, and limiting reactants.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 55,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "ANALOGY": 1,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 55,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 10,
    "everyday": 1,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the lesson and provides the core definition of stoichiometry as the calculation of quantities reacting and forming in a chemical reaction.

Accuracy: **accurate**. The definition accurately captures the essence of stoichiometry in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Je vais t’expliquer la **stœchiométrie** de façon simple et claire, comme si nous étions en cours ensemble. C’est un outil très utile en chimie au lycée, alors on va y aller étape par étape. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### 1. Qu’est-ce que la stœchiométrie ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | La stœchiométrie, c’est le calcul des **quantités** de substances qui réagissent et qui se forment dans une réaction chimique.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Cooking recipe analogy for stoichiometry (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "Imagine une recette de cuisine : pour faire 4 crêpes, tu as besoin de 2 œufs, 200 g de farine et ½ litre de lait. Si tu veux en faire 8, tu doubles tout. En chimie, c’est exactement la même idée : les « ingrédients » (les réactifs) doivent être dans des proportions précises pour obtenir les « plats » (les produits)."}]}

Annotation rationale: Uses a pancake recipe analogy to explain how stoichiometric proportions work between reactants and products.

Accuracy: **accurate**. The pancake recipe provides an intuitive, accurate conceptual comparison for fixed stoichiometric ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | Imagine une recette de cuisine : pour faire 4 crêpes, tu as besoin de 2 œufs, 200 g de farine et ½ litre de lait. Si tu veux en faire 8, tu doubles tout. En chimie, c’est exactement la même idée : les « ingrédients » (les réactifs) doivent être dans des proportions précises pour obtenir les « plats » (les produits). | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Balanced chemical equations and stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the necessity of balanced equations and how stoichiometric coefficients indicate proportions of molecules or moles.

Accuracy: **accurate**. The explanation of balanced chemical equations and stoichiometric coefficients using the formation of water is scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | On s’appuie toujours sur **l’équation chimique équilibrée**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | ### 2. L’équation chimique équilibrée (la base indispensable) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Prenons un exemple très simple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | **2 H₂ + O₂ → 2 H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | Que signifie cette équation ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **2 H₂** = 2 molécules de dihydrogène | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - **O₂** = 1 molécule de dioxygène | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | - **2 H₂O** = 2 molécules d’eau | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | Les chiffres devant les formules (les **coefficients**) sont très importants : ils indiquent les **proportions** en nombre de molécules (ou en moles). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | Si on ne respecte pas ces proportions, la réaction n’est pas « équilibrée » et les calculs seront faux. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: The mole concept and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the mole using Avogadro's number and introduces molar mass as grams per mole.

Accuracy: **accurate**. The mole and molar mass are defined correctly with standard Avogadro constant values and units.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. Le concept de « mole » (l’unité magique) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | En chimie, on ne compte pas les molécules une par une (il y en a beaucoup trop !). On utilise la **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | - 1 mole = 6,022 × 10²³ particules (c’est le nombre d’Avogadro) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | - La **masse molaire** (notée *M*) est la masse d’1 mole d’une substance, exprimée en g/mol. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Molar mass of dihydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of H2.

Accuracy: **accurate**. The molar mass of H2 is correctly given as 2 g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | Exemples : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | - M(H₂) = 2 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Molar mass of dioxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of O2.

Accuracy: **accurate**. The molar mass of O2 is correctly given as 32 g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | - M(O₂) = 32 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Molar mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass of H2O.

Accuracy: **accurate**. The molar mass of H2O is correctly given as 18 g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | - M(H₂O) = 18 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Worked stoichiometric calculation for water synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a full worked calculation determining the mass of water formed from 4 g of dihydrogen.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, stoichiometric ratio 1:1, moles of H2O = 2 mol, mass of H2O = 36 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### 4. Comment faire un calcul stœchiométrique ? (méthode en 4 étapes) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Reprenons l’équation :   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | **2 H₂ + O₂ → 2 H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | **Question** : Si je fais réagir 4 g de H₂, quelle masse d’eau vais-je obtenir (en supposant qu’il y a assez d’oxygène) ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | **Méthode** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | 1. **Convertir les masses en moles**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 |    n(H₂) = masse / masse molaire = 4 g ÷ 2 g/mol = **2 moles** de H₂ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p30 | 2. **Utiliser les rapports stœchiométriques** (les coefficients)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 |    D’après l’équation :   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 |    2 moles de H₂ → 2 moles de H₂O   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 |    Donc 1 mole de H₂ → 1 mole de H₂O   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 |    Avec 2 moles de H₂ → **2 moles** de H₂O | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | 3. **Reconvertir les moles en masse**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 |    Masse d’eau = nombre de moles × masse molaire = 2 mol × 18 g/mol = **36 g** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p37 | **Réponse** : On obtient 36 g d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u9: Concept of limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition and role of the limiting reactant in constraining the maximum amount of product formed.

Accuracy: **accurate**. The limiting reactant concept is accurately explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### 5. Le réactif limitant (un peu plus avancé) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | Parfois, tu n’as pas assez d’un des réactifs. Le **réactif limitant** est celui qui va « s’épuiser en premier » et qui va donc limiter la quantité de produit formé. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u10: Worked example identifying limiting reactant (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked scenario comparing available amounts of H2 and O2 to identify the limiting reactant and resultant product yield.

Accuracy: **accurate**. With 2 mol H2 and 0.5 mol O2, O2 is correctly identified as limiting, producing 1 mol (18 g) of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | Exemple rapide :   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | Tu as 4 g de H₂ et seulement 16 g de O₂.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | - 4 g H₂ = 2 mol → il faudrait 1 mol d’O₂ (32 g)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p43 | - Tu n’as que 16 g d’O₂ = 0,5 mol   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | L’oxygène est limitant. Tu ne pourras former que 1 mol d’eau (18 g) au lieu de 36 g. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Recap of key points (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential procedural rules for solving stoichiometry problems.

Accuracy: **accurate**. The recap items correctly summarize the core rules of stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ### Résumé des points clés | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | - Toujours **équilibrer** l’équation d’abord. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | - Passer par les **moles** (jamais calculer directement en grammes). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | - Utiliser les **coefficients** de l’équation comme rapports. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | - Attention au **réactif limitant** quand les quantités ne sont pas exactement proportionnelles. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u12: Teacher advice and suggested reactions for practice (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p55", "quote": "Dis-moi le niveau que tu vises (Seconde, Première ou Terminale) et je t’adapte l’explication !"}]}

Annotation rationale: Suggests specific chemical reactions to practice with and offers personalized follow-up tailored to the student's high school level.

Accuracy: **accurate**. The suggested reactions are classic high school chemistry examples, and the advice is sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ### Conseil de prof | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | Entraîne-toi avec des réactions simples au début : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p52 | - Combustion du méthane (CH₄) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p53 | - Synthèse de l’ammoniac (N₂ + H₂) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p54 | - Décomposition du carbonate de calcium | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p55 | Tu veux qu’on fasse ensemble un exercice complet (avec réactif limitant ou avec calcul de rendement) ? Dis-moi le niveau que tu vises (Seconde, Première ou Terminale) et je t’adapte l’explication ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

