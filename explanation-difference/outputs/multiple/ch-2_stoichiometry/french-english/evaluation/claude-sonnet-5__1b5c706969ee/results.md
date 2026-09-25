# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains stoichiometry, including mole ratios, chemical equations, problem-solving procedures, a worked calculation, and limiting reactants in French as requested.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 42,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "PROCEDURE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 42,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 1,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry using cooking analogy (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "C'est un peu comme une **recette de cuisine** : pour faire un gâteau, tu as besoin de proportions précises d'ingrédients."}]}

Annotation rationale: Introduces the overarching concept of stoichiometry as the study of amounts of substance in chemical reactions, using a cooking recipe comparison.

Accuracy: **accurate**. The introductory definition and the recipe analogy are scientifically sound and clear.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # La Stœchiométrie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Qu&#x27;est-ce que la stœchiométrie ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | La stœchiométrie, c&#x27;est l&#x27;étude des **quantités de matière** qui interviennent dans une réaction chimique. C&#x27;est un peu comme une **recette de cuisine** : pour faire un gâteau, tu as besoin de proportions précises d&#x27;ingrédients. En chimie, c&#x27;est pareil ! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Basic principle of stoichiometric proportions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that substances react in fixed proportions given by the coefficients of a balanced chemical equation.

Accuracy: **accurate**. Correctly states the relationship between stoichiometric coefficients and reaction proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## Le principe de base | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Quand des substances réagissent ensemble, elles le font selon des **proportions bien définies**, données par les **coefficients** de l&#x27;équation chimique équilibrée. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Water formation reaction proportions (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates stoichiometric coefficients on the molecular level using the balanced equation for the formation of water.

Accuracy: **accurate**. The equation is properly balanced and the molecular ratio is correctly interpreted.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### Exemple simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Prenons la formation de l&#x27;eau : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | Cette équation nous dit que : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | - **2 molécules** de dihydrogène réagissent avec **1 molécule** de dioxygène | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - pour former **2 molécules** d&#x27;eau | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Steps to solve stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lays out a standard four-step procedure for solving stoichiometric problems, including balancing, mole conversion, stoichiometric ratios, and final conversion.

Accuracy: **accurate**. The outlined steps and the molar mass formula n = m/M are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## Les étapes pour résoudre un problème de stœchiométrie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ### 1️⃣ Équilibrer l&#x27;équation chimique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Vérifier que le nombre d&#x27;atomes est le même de chaque côté. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p15 | ### 2️⃣ Convertir en moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | Utiliser la formule : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p17 | $$n = \frac{m}{M}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p18 | où : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p19 | - *n* = quantité de matière (en mol) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p20 | - *m* = masse (en g) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p21 | - *M* = masse molaire (en g/mol) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p22 | ### 3️⃣ Utiliser les rapports stœchiométriques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | Les coefficients de l&#x27;équation donnent le rapport entre les moles de chaque substance. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p24 | ### 4️⃣ Convertir le résultat dans l&#x27;unité demandée | PROCEDURE | {} | [&#x27;heading&#x27;] |

## u5: Worked calculation of water produced from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the four-step method to solve for the mass of water formed from 4 g of hydrogen gas.

Accuracy: **accurate**. Calculations and conversions are fully correct: 4 g / 2 g/mol = 2 mol H2; 2 mol H2 produces 2 mol H2O; 2 mol * 18 g/mol = 36 g H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## Exemple concret | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | **Question :** Combien de grammes d&#x27;eau obtient-on à partir de 4g de dihydrogène (H₂) ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | **Étape 1 :** L&#x27;équation est déjà équilibrée : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | **Étape 2 :** Calculer les moles de H₂ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | $$n(H_2) = \frac{4g}{2g/mol} = 2 \text{ mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | **Étape 3 :** Utiliser le rapport stœchiométrique | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | D&#x27;après l&#x27;équation : 2 mol H₂ → 2 mol H₂O (rapport 1:1) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | Donc : n(H₂O) = 2 mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | **Étape 4 :** Convertir en grammes | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | $$m(H_2O) = n \times M = 2 \times 18 = 36g$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Warning against treating stoichiometric coefficients as mass ratios (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explicitly addresses a common student misconception by clarifying that coefficients denote molar ratios rather than mass ratios directly.

Accuracy: **accurate**. Accurately highlights that coefficients reflect mole ratios, not direct mass ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## Point clé à retenir 🔑 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | &gt; **Les coefficients stœchiométriques représentent des rapports de moles, jamais des rapports de masses directement !** | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

## u7: Limiting and excess reactants concept and identification tip (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines limiting and excess reactants and provides a practical heuristic to determine which reactant is limiting.

Accuracy: **accurate**. The definition of limiting reactant and the method for identifying it by calculating potential product yields are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## Le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | Parfois, un réactif est en **quantité insuffisante** et limite la réaction : c&#x27;est le **réactif limitant**. L&#x27;autre réactif, présent en excès, ne sera pas totalement consommé. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p40 | **Astuce :** Pour identifier le réactif limitant, calcule combien de produit chaque réactif pourrait former séparément — celui qui en donne le moins est le réactif limitant ! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p42 | Veux-tu qu&#x27;on pratique avec quelques exercices ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

