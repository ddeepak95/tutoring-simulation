# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry definition, principles, equation balancing, molar calculations, limiting reagents, applications, and procedural steps",
  "topic_match": "on_topic",
  "reason": "The response clearly and comprehensively explains stoichiometry, covering the conservation of mass, mole ratios, worked numerical calculations, and limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10",
    "u11",
    "u12"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and fundamental principles of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Cooking recipe analogy for stoichiometric proportions | {} | accurate |
| u3 | CONCEPT | Requirement of a balanced chemical equation | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Water formation reaction illustrating molecular and molar ratios | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Worked calculation of mass of water formed from 8 g of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Concept and definition of a limiting reactant | {"depth": "explanation"} | accurate |
| u7 | EXAMPLE | Worked example identifying limiting reactant for hydrogen and oxygen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | EXAMPLE | Industrial application of stoichiometry | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | EXAMPLE | Pharmaceutical application of stoichiometry | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | EXAMPLE | Environmental application of stoichiometry | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u11 | EXAMPLE | Laboratory application of stoichiometry | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u12 | PROCEDURE | Four-step general method for stoichiometric calculations | {} | accurate |

## u1: Definition and fundamental principles of stoichiometry

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
    "reason": "Correctly defines stoichiometry and articulates Lavoisier's conservation of mass and stoichiometric molar ratios.",
    "errors": []
  }
}
```

```text
La stœchiométrie est la partie de la chimie qui permet de calculer les **quantités** (en masse, en moles ou en volume) des substances qui réagissent et qui sont produites dans une réaction chimique. 

Elle repose sur deux principes fondamentaux :
- La **conservation de la masse** (loi de Lavoisier) : rien ne se perd, rien ne se crée, tout se transforme. La masse totale des réactifs est égale à celle des produits.
- Les **rapports en moles** donnés par l’équation chimique équilibrée.
```


## u2: Cooking recipe analogy for stoichiometric proportions

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "recette de cuisine : si tu veux doubler la quantité de gâteau, tu doubles tous les ingrédients"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps fixed proportions of ingredients in a recipe to stoichiometric ratios in a reaction.",
    "errors": []
  }
}
```

```text
En gros, c’est comme une recette de cuisine : si tu veux doubler la quantité de gâteau, tu doubles tous les ingrédients selon les proportions exactes.
```


## u3: Requirement of a balanced chemical equation

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
    "reason": "Correctly states the condition for a balanced equation based on atom conservation.",
    "errors": []
  }
}
```

```text
Avant tout calcul, l’équation doit être **équilibrée** (le nombre d’atomes de chaque élément doit être le même à gauche et à droite).
```


## u4: Water formation reaction illustrating molecular and molar ratios

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
    "reason": "The chemical equation, molecular interpretation, and molar ratios are factually correct.",
    "errors": []
  }
}
```

```text
Exemple classique :
\[
2\,\ce{H2} + \ce{O2} \rightarrow 2\,\ce{H2O}
\]

Interprétation :
- 2 molécules d’hydrogène (H₂) réagissent avec 1 molécule d’oxygène (O₂)
- Pour former 2 molécules d’eau (H₂O)

En termes de **moles** (l’unité de quantité de matière) :
- Rapport molaire = **2 : 1 : 2**

Cela signifie que pour 2 moles d’H₂, il faut 1 mole d’O₂ et on obtient 2 moles d’H₂O.
```


## u5: Worked calculation of mass of water formed from 8 g of hydrogen

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
    "reason": "All calculations, molar masses, molar relationships, and intermediate steps are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
On utilise les rapports molaires pour passer d’une substance à une autre.

**Exemple** : Combien de grammes d’eau peut-on obtenir avec 8 g d’hydrogène (H₂) ?

1. Calculer le nombre de moles d’H₂ :
   - Masse molaire de H₂ = 2 g/mol
   - \( n = \frac{m}{M} = \frac{8}{2} = 4 \) moles d’H₂

2. Utiliser le rapport : 2 moles d’H₂ → 2 moles d’H₂O (rapport 1:1)
   - Donc 4 moles d’H₂ donnent **4 moles** d’H₂O

3. Calculer la masse d’eau :
   - Masse molaire de H₂O = 18 g/mol
   - \( m = n \times M = 4 \times 18 = 72 \) g d’eau
```


## u6: Concept and definition of a limiting reactant

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
    "reason": "Accurately defines the limiting reactant as the one in insufficient quantity that limits product formation.",
    "errors": []
  }
}
```

```text
Parfois, un des réactifs est en quantité insuffisante. C’est lui qui « limite » la réaction.
```


## u7: Worked example identifying limiting reactant for hydrogen and oxygen

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
    "reason": "The reasoning correctly deduces that H2 is the limiting reactant and computes remaining O2 and produced H2O accurately.",
    "errors": []
  }
}
```

```text
Exemple : Tu as 4 moles d’H₂ et 3 moles d’O₂. Quel est le réactif limitant ?

- Selon l’équation : 2 moles H₂ nécessitent 1 mole O₂
- Avec 4 moles H₂, il faudrait 2 moles O₂
- Mais tu as 3 moles d’O₂ (en excès)
- Donc H₂ est limitant : on ne peut produire que 4 moles d’eau (et il restera 1 mole d’O₂ inutilisée).
```


## u8: Industrial application of stoichiometry

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Stoichiometry is fundamental to industrial chemical synthesis (fertilizers, fuels, drugs).",
    "errors": []
  }
}
```

```text
L’industrie (fabrication d’engrais, de médicaments, d’essence)
```


## u9: Pharmaceutical application of stoichiometry

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Stoichiometry is accurately cited as essential for pharmaceutical drug formulation and dosing.",
    "errors": []
  }
}
```

```text
La pharmacie (dosage des médicaments)
```


## u10: Environmental application of stoichiometry

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Calculating emissions of CO2 from combustion is a standard environmental application of stoichiometry.",
    "errors": []
  }
}
```

```text
L’environnement (calcul des émissions de CO₂)
```


## u11: Laboratory application of stoichiometry

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Weighing reactants for laboratory experiments is a standard application of stoichiometry.",
    "errors": []
  }
}
```

```text
Les expériences en labo (savoir exactement combien peser de chaque produit)
```


## u12: Four-step general method for stoichiometric calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Presents the standard general algorithm for carrying out mass-to-mass or mass-to-volume stoichiometry calculations.",
    "errors": []
  }
}
```

```text
1. Toujours équilibrer l’équation d’abord.
2. Convertir les masses en moles.
3. Utiliser les coefficients stœchiométriques comme des « multiplicateurs ».
4. Reconvertir en masse ou volume si nécessaire.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u8",
      "u9",
      "u10",
      "u11"
    ],
    "issue": "The list of applications under 'Pourquoi c’est important ?' could either be considered four distinct illustrative real-world EXAMPLE units, or grouped together into a single EXAMPLE unit.",
    "proposed_resolution": "Split into four separate EXAMPLE units in accordance with the guideline specifying that a list naming independent applications represents independent EXAMPLE units even if they share one heading."
  },
  {
    "unit_ids": [
      "u12"
    ],
    "issue": "The section 'Astuce pour réussir' provides a sequential 4-step method for solving stoichiometry problems, which could be categorized as PROCEDURE (a reusable algorithmic method) or STUDY_SUPPORT (study_strategy, given the heading 'Astuce pour réussir').",
    "proposed_resolution": "Classified as PROCEDURE because its substantive content is a concrete reusable workflow for performing stoichiometric calculations."
  },
  {
    "unit_ids": [
      "u6",
      "u7"
    ],
    "issue": "The definition of limiting reactant and the immediate numerical example under '### 3. Le réactif limitant' could be merged into a single worked EXAMPLE unit.",
    "proposed_resolution": "Separated into a CONCEPT unit defining the limiting reactant and a worked EXAMPLE unit demonstrating how to determine it, as both perform distinct teaching functions."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Je suis ravi de t'expliquer la **stœchiométrie** de manière simple et claire, comme si nous étions en cours de chimie au lycée. On va y aller étape par étape, avec des exemples concrets.

### Qu’est-ce que la stœchiométrie ?

```

```text


### 1. L’équation chimique équilibrée (point de départ)

```

```text


### 2. Les calculs stœchiométriques

```

```text


### 3. Le réactif limitant (un peu plus avancé)

```

```text


### Pourquoi c’est important ?
La stœchiométrie sert dans :
- 
```

```text

- 
```

```text

- 
```

```text

- 
```

```text


### Astuce pour réussir

```

```text


Tu as compris le principe ? Veux-tu qu’on fasse un exercice ensemble (par exemple avec une combustion ou une réaction acide-base) ? Ou as-tu une question sur un point précis ?
```
