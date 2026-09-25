# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a direct, comprehensive introduction to stoichiometry for high school chemistry, covering definitions, balanced equations, mole relationships, calculation steps with a worked example, and limiting reactants.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 44,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 44,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 2,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Sandwich analogy illustrating proportions and limiting ingredients (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "Imagine que tu fais des sandwichs. Pour **1 sandwich**, il te faut :"}, {"passage_id": "p6", "quote": "Si tu as 10 tranches de jambon mais seulement 6 tranches de pain, combien de sandwichs peux-tu faire ? Seulement **3**, car le pain te limite !"}]}

Annotation rationale: Uses the common everyday analogy of making ham sandwiches to illustrate fixed proportions and how one ingredient limits the total output before mapping it to molecules.

Accuracy: **accurate**. The sandwich analogy accurately portrays fixed stoichiometric ratios and limiting reactant concepts in an intuitive everyday scenario.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # La Stœchiométrie : les proportions dans les réactions chimiques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Une image pour commencer | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Imagine que tu fais des sandwichs. Pour **1 sandwich**, il te faut : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | - 2 tranches de pain | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - 1 tranche de jambon | ANALOGY | {} | [&#x27;list&#x27;] |
| p6 | Si tu as 10 tranches de jambon mais seulement 6 tranches de pain, combien de sandwichs peux-tu faire ? Seulement **3**, car le pain te limite ! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | **La stœchiométrie, c&#x27;est exactement ça, mais avec des molécules.** | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the study of proportions in which reactants combine and products form in a chemical reaction.

Accuracy: **accurate**. The formal definition accurately describes the scope of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## Définition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | La stœchiométrie étudie les **proportions** dans lesquelles les réactifs se combinent et les produits se forment lors d&#x27;une réaction chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Balanced equations and stoichiometric coefficients at the molecular scale (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the coefficients in a balanced chemical equation dictate the exact ratio of interacting and produced molecules, using water synthesis as an illustrative example.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O and its interpretation in terms of molecule counts are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## Le point de départ : l&#x27;équation équilibrée | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Prenons un exemple simple, la formation de l&#x27;eau : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p13 | Les nombres devant chaque formule (les **coefficients stœchiométriques**) nous disent : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | - 2 molécules de dihydrogène réagissent avec | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | - 1 molécule de dioxygène pour donner | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - 2 molécules d&#x27;eau | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | **Ces nombres sont sacrés** : ils indiquent le rapport exact des quantités. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Using moles to scale reaction coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p19", "quote": "(comme une \"douzaine\" pour les œufs)"}]}

Annotation rationale: Explains why moles are used instead of counting individual molecules and how stoichiometric coefficients apply directly to molar amounts.

Accuracy: **accurate**. The mole concept explanation and its direct equivalence to stoichiometric ratios are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## Pourquoi utiliser la mole ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | On ne compte pas les molécules une par une (il y en a des milliards !), on utilise la **mole** comme &quot;paquet&quot; de particules (comme une &quot;douzaine&quot; pour les œufs). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | Donc l&#x27;équation se lit aussi : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | &gt; 2 moles de H₂ réagissent avec 1 mole de O₂ pour donner 2 moles de H₂O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Step-by-step procedure for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a general reusable 4-step procedure to solve stoichiometry calculation problems.

Accuracy: **accurate**. The 4-step method (balance equation -> convert to moles -> apply stoichiometric ratios -> convert back to mass) is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## La méthode pour résoudre un exercice | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | **Étape 1** : Équilibrer l&#x27;équation chimique (si ce n&#x27;est pas fait) | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p24 | **Étape 2** : Convertir les données en moles (grâce à la masse molaire M) | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p25 | $$n = \frac{m}{M}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p26 | **Étape 3** : Utiliser les rapports stœchiométriques pour trouver l&#x27;inconnue | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p27 | **Étape 4** : Reconvertir en grammes si besoin | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u6: Worked mass calculation of water produced from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete worked example applying the 4-step method to find grams of water formed from 4 g of hydrogen gas.

Accuracy: **accurate**. All calculations, molar masses (M(H2) = 2 g/mol, M(H2O) = 18 g/mol), mole conversions, stoichiometric ratios (2:2 or 1:1), and the final result (36 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## Exemple concret | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | *Combien de grammes d&#x27;eau obtient-on avec 4 g de H₂ (excès de O₂) ?* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | **1)** Masse molaire de H₂ = 2 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | $$n(H_2) = \frac{4}{2} = 2 \text{ mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | **2)** Rapport stœchiométrique : 2 mol H₂ → 2 mol H₂O (rapport 1:1 ici) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | $$n(H_2O) = 2 \text{ mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | **3)** Masse molaire de H₂O = 18 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | $$m(H_2O) = 2 \times 18 = 36 \text{ g}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Limiting reactant concept (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of the limiting reactant, linking back to the sandwich analogy and explaining how it limits the maximum product yield.

Accuracy: **accurate**. The definition and role of the limiting reactant are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## Le concept clé : le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | Comme dans l&#x27;exemple des sandwichs, souvent **un réactif s&#x27;épuise avant l&#x27;autre**. On l&#x27;appelle le **réactif limitant**, et c&#x27;est lui qui détermine la quantité maximale de produit qu&#x27;on peut obtenir. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Summary table of key terms and concluding offer (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a summary table reviewing stoichiometric coefficients, moles, and limiting reactants, followed by a closing interactive offer.

Accuracy: **accurate**. The summary points in the recap table are accurate descriptions of the key concepts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## À retenir 🎯 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | &#124; Concept &#124; Explication &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p40 | &#124;---------&#124;-------------&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p41 | &#124; Coefficients stœchiométriques &#124; Les rapports entre les substances &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p42 | &#124; Mole &#124; L&#x27;unité pour compter les particules &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p43 | &#124; Réactif limitant &#124; Celui qui s&#x27;épuise en premier &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p44 | **As-tu des questions sur un point en particulier, ou veux-tu qu&#x27;on s&#x27;entraîne avec un exercice ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

