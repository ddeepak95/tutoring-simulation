# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry in chemistry: chemical equation balancing, stoichiometric coefficients, the mole, a four-step calculation method, a worked numerical example, and the limiting reactant concept",
  "topic_match": "on_topic",
  "reason": "The text directly explains stoichiometry at the high-school level, including stoichiometric ratios, mole conversions, problem-solving steps, and limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Sandwich making as an analogy for stoichiometry and limiting reactants | {} | accurate |
| u2 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Interpretation of stoichiometric coefficients in a balanced equation | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | The mole concept and its interpretation in balanced chemical equations | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | Four-step method for solving stoichiometric problems | {} | accurate |
| u6 | EXAMPLE | Calculating the mass of water formed from a given mass of dihydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Definition and role of the limiting reactant | {"depth": "explanation"} | accurate |
| u8 | STUDY_SUPPORT | Summary table of key stoichiometry concepts | {"subtype": "recap"} | accurate |

## u1: Sandwich making as an analogy for stoichiometry and limiting reactants

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine que tu fais des sandwichs. Pour **1 sandwich**, il te faut :\n- 2 tranches de pain\n- 1 tranche de jambon"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps fixed ingredient ratios and a limiting ingredient to chemical stoichiometry.",
    "errors": []
  }
}
```

```text
## Une image pour commencer

Imagine que tu fais des sandwichs. Pour **1 sandwich**, il te faut :
- 2 tranches de pain
- 1 tranche de jambon

Si tu as 10 tranches de jambon mais seulement 6 tranches de pain, combien de sandwichs peux-tu faire ? Seulement **3**, car le pain te limite !

**La stœchiométrie, c'est exactement ça, mais avec des molécules.**
```


## u2: Definition of stoichiometry

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition correctly describes stoichiometry as the study of reactant and product proportions in a chemical reaction.",
    "errors": []
  }
}
```

```text
## Définition

La stœchiométrie étudie les **proportions** dans lesquelles les réactifs se combinent et les produits se forment lors d'une réaction chimique.
```


## u3: Interpretation of stoichiometric coefficients in a balanced equation

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The chemical equation for the formation of water is correctly balanced, and the interpretation of the coefficients at the molecular level is accurate.",
    "errors": []
  }
}
```

```text
## Le point de départ : l'équation équilibrée

Prenons un exemple simple, la formation de l'eau :

$$2H_2 + O_2 \rightarrow 2H_2O$$

Les nombres devant chaque formule (les **coefficients stœchiométriques**) nous disent :
- 2 molécules de dihydrogène réagissent avec
- 1 molécule de dioxygène pour donner
- 2 molécules d'eau

**Ces nombres sont sacrés** : ils indiquent le rapport exact des quantités.
```


## u4: The mole concept and its interpretation in balanced chemical equations

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "(comme une \"douzaine\" pour les œufs)"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The explanation correctly links the macroscopic unit of the mole to counting large numbers of microscopic entities and applies molar ratios directly to the reaction equation.",
    "errors": []
  }
}
```

```text
## Pourquoi utiliser la mole ?

On ne compte pas les molécules une par une (il y en a des milliards !), on utilise la **mole** comme "paquet" de particules (comme une "douzaine" pour les œufs).

Donc l'équation se lit aussi :
> 2 moles de H₂ réagissent avec 1 mole de O₂ pour donner 2 moles de H₂O
```


## u5: Four-step method for solving stoichiometric problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four-step algorithm (balance, convert to moles, apply stoichiometric ratios, convert back to target units) is standard, correct, and uses the correct formula n = m / M.",
    "errors": []
  }
}
```

```text
## La méthode pour résoudre un exercice

**Étape 1** : Équilibrer l'équation chimique (si ce n'est pas fait)

**Étape 2** : Convertir les données en moles (grâce à la masse molaire M)
$$n = \frac{m}{M}$$

**Étape 3** : Utiliser les rapports stœchiométriques pour trouver l'inconnue

**Étape 4** : Reconvertir en grammes si besoin
```


## u6: Calculating the mass of water formed from a given mass of dihydrogen

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All calculations (molar masses, molar amounts, stoichiometric mole ratios, and final mass) are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
## Exemple concret

*Combien de grammes d'eau obtient-on avec 4 g de H₂ (excès de O₂) ?*

**1)** Masse molaire de H₂ = 2 g/mol
$$n(H_2) = \frac{4}{2} = 2 \text{ mol}$$

**2)** Rapport stœchiométrique : 2 mol H₂ → 2 mol H₂O (rapport 1:1 ici)
$$n(H_2O) = 2 \text{ mol}$$

**3)** Masse molaire de H₂O = 18 g/mol
$$m(H_2O) = 2 \times 18 = 36 \text{ g}$$
```


## u7: Definition and role of the limiting reactant

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The explanation correctly defines the limiting reactant as the one completely consumed first and notes that it dictates the theoretical maximum yield of product.",
    "errors": []
  }
}
```

```text
## Le concept clé : le réactif limitant

Comme dans l'exemple des sandwichs, souvent **un réactif s'épuise avant l'autre**. On l'appelle le **réactif limitant**, et c'est lui qui détermine la quantité maximale de produit qu'on peut obtenir.
```


## u8: Summary table of key stoichiometry concepts

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The summary table accurately condenses the three main concepts taught in the text.",
    "errors": []
  }
}
```

```text
## À retenir 🎯

| Concept | Explication |
|---------|-------------|
| Coefficients stœchiométriques | Les rapports entre les substances |
| Mole | L'unité pour compter les particules |
| Réactif limitant | Celui qui s'épuise en premier |
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 introduces stoichiometric coefficients using the formation of water as an example. It could be viewed either as a CONCEPT unit explaining stoichiometric coefficients or as an illustrative EXAMPLE unit.",
    "proposed_resolution": "Classified as CONCEPT because the main teaching job is introducing and defining what stoichiometric coefficients represent in chemical equations, with the water reaction serving as direct illustrative support."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Contextualization of u4: the phrase '(comme une \"douzaine\" pour les œufs)' could be considered an embedded informal comparison resulting in 'none' contextualization, or an explicit connection to everyday life ('everyday').",
    "proposed_resolution": "Assigned 'everyday' because the text explicitly uses a familiar daily shopping/counting reference (a dozen eggs) to help learners grasp counting by moles."
  }
]
```

## Unassigned text for coverage review

```text
# La Stœchiométrie : les proportions dans les réactions chimiques


```

```text


**As-tu des questions sur un point en particulier, ou veux-tu qu'on s'entraîne avec un exercice ?**
```
