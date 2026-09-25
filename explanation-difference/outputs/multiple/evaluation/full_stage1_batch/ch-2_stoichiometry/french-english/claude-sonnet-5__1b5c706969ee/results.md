# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry in chemical reactions, including equation interpretation, calculation steps, a worked problem, and limiting reactants",
  "topic_match": "on_topic",
  "reason": "The text explains the fundamental definition and principles of stoichiometry, provides equation interpretations, details a step-by-step problem-solving procedure with a worked example, and explains limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and basic principle of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Microscopic interpretation of stoichiometric coefficients in water synthesis | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | PROCEDURE | General procedure for solving a stoichiometry problem | {} | accurate |
| u4 | EXAMPLE | Worked example calculating water produced from a given mass of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | CAVEAT | Warning against treating stoichiometric coefficients as direct mass ratios | {"subtype": "misconception"} | accurate |
| u6 | CONCEPT | Concept and method for identifying the limiting reactant | {"depth": "explanation"} | accurate |

## u1: Definition and basic principle of stoichiometry

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
        "quote": "C'est un peu comme une **recette de cuisine** : pour faire un gâteau, tu as besoin de proportions précises d'ingrédients."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition and the explanation connecting reaction proportions to balanced equation coefficients are chemically accurate.",
    "errors": []
  }
}
```

```text
La stœchiométrie, c'est l'étude des **quantités de matière** qui interviennent dans une réaction chimique. C'est un peu comme une **recette de cuisine** : pour faire un gâteau, tu as besoin de proportions précises d'ingrédients. En chimie, c'est pareil !

## Le principe de base

Quand des substances réagissent ensemble, elles le font selon des **proportions bien définies**, données par les **coefficients** de l'équation chimique équilibrée.
```


## u2: Microscopic interpretation of stoichiometric coefficients in water synthesis

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The balanced chemical equation and its molecular interpretation are correct.",
    "errors": []
  }
}
```

```text
Prenons la formation de l'eau :

$$2H_2 + O_2 \rightarrow 2H_2O$$

Cette équation nous dit que :
- **2 molécules** de dihydrogène réagissent avec **1 molécule** de dioxygène
- pour former **2 molécules** d'eau
```


## u3: General procedure for solving a stoichiometry problem

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The stated four-step sequence and the mole conversion formula are standard and accurate.",
    "errors": []
  }
}
```

```text
### 1️⃣ Équilibrer l'équation chimique
Vérifier que le nombre d'atomes est le même de chaque côté.

### 2️⃣ Convertir en moles
Utiliser la formule :
$$n = \frac{m}{M}$$

où :
- *n* = quantité de matière (en mol)
- *m* = masse (en g)
- *M* = masse molaire (en g/mol)

### 3️⃣ Utiliser les rapports stœchiométriques
Les coefficients de l'équation donnent le rapport entre les moles de chaque substance.

### 4️⃣ Convertir le résultat dans l'unité demandée
```


## u4: Worked example calculating water produced from a given mass of hydrogen

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
    "reason": "All calculations, molar masses, stoichiometric ratios, and final units are correct.",
    "errors": []
  }
}
```

```text
**Question :** Combien de grammes d'eau obtient-on à partir de 4g de dihydrogène (H₂) ?

**Étape 1 :** L'équation est déjà équilibrée :
$$2H_2 + O_2 \rightarrow 2H_2O$$

**Étape 2 :** Calculer les moles de H₂
$$n(H_2) = \frac{4g}{2g/mol} = 2 \text{ mol}$$

**Étape 3 :** Utiliser le rapport stœchiométrique
D'après l'équation : 2 mol H₂ → 2 mol H₂O (rapport 1:1)

Donc : n(H₂O) = 2 mol

**Étape 4 :** Convertir en grammes
$$m(H_2O) = n \times M = 2 \times 18 = 36g$$
```


## u5: Warning against treating stoichiometric coefficients as direct mass ratios

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately corrects the common student misconception that coefficients directly reflect mass ratios.",
    "errors": []
  }
}
```

```text
> **Les coefficients stœchiométriques représentent des rapports de moles, jamais des rapports de masses directement !**
```


## u6: Concept and method for identifying the limiting reactant

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
    "reason": "Correctly defines limiting and excess reagents and outlines a valid operational method for identifying the limiting reagent.",
    "errors": []
  }
}
```

```text
Parfois, un réactif est en **quantité insuffisante** et limite la réaction : c'est le **réactif limitant**. L'autre réactif, présent en excès, ne sera pas totalement consommé.

**Astuce :** Pour identifier le réactif limitant, calcule combien de produit chaque réactif pourrait former séparément — celui qui en donne le moins est le réactif limitant !
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The baking recipe comparison in u1 could be treated as an ANALOGY unit rather than being integrated into the introductory CONCEPT unit.",
    "proposed_resolution": "Kept together within u1 because the analogy is brief (two sentences) and directly supports the definition of stoichiometry without being developed into an independent teaching episode."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "u5 is introduced under the heading 'Point clé à retenir 🔑', which could suggest a STUDY_SUPPORT unit (subtype: recap).",
    "proposed_resolution": "Classified as CAVEAT (subtype: misconception) because its explicit substantive content warns against the specific misconception that stoichiometric coefficients represent mass ratios directly."
  }
]
```

## Unassigned text for coverage review

```text
# La Stœchiométrie

## Qu'est-ce que la stœchiométrie ?


```

```text


### Exemple simple


```

```text


## Les étapes pour résoudre un problème de stœchiométrie


```

```text


## Exemple concret


```

```text


## Point clé à retenir 🔑


```

```text


## Le réactif limitant


```

```text


---

Veux-tu qu'on pratique avec quelques exercices ?
```
