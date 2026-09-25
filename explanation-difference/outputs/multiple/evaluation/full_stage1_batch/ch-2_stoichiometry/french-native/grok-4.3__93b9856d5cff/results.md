# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, molar calculations, balanced chemical equations, and limiting reactants",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses stoichiometry, covering definitions, the meaning of balanced chemical equations, the concept of the mole, a worked mass-to-mass stoichiometric calculation, and limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry and reliance on balanced equations | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Cooking recipe analogy for stoichiometric proportions | {} | accurate |
| u3 | CONCEPT | Meaning and importance of coefficients in balanced equations | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | The mole concept, Avogadro's number, and molar mass | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Worked mass-to-mass stoichiometric calculation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | contains_error |
| u6 | CONCEPT | Definition of limiting reactant | {"depth": "explanation"} | accurate |
| u7 | EXAMPLE | Worked example finding the limiting reactant and product amount | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | STUDY_SUPPORT | Summary of key stoichiometric rules | {"subtype": "recap"} | accurate |
| u9 | STUDY_SUPPORT | Practice advice and suggested reaction types | {"subtype": "study_strategy"} | accurate |

## u1: Definition of stoichiometry and reliance on balanced equations

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
    "reason": "The definition correctly identifies stoichiometry as the calculation of quantities of reactants and products based on balanced chemical equations.",
    "errors": []
  }
}
```

```text
La stœchiométrie, c’est le calcul des **quantités** de substances qui réagissent et qui se forment dans une réaction chimique.
```

```text
On s’appuie toujours sur **l’équation chimique équilibrée**.
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
        "quote": "Imagine une recette de cuisine : pour faire 4 crêpes, tu as besoin de 2 œufs, 200 g de farine et ½ litre de lait. Si tu veux en faire 8, tu doubles tout."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy maps ingredients to reactants and finished dishes to products, accurately illustrating fixed proportional relationships in reactions.",
    "errors": []
  }
}
```

```text
Imagine une recette de cuisine : pour faire 4 crêpes, tu as besoin de 2 œufs, 200 g de farine et ½ litre de lait. Si tu veux en faire 8, tu doubles tout. En chimie, c’est exactement la même idée : les « ingrédients » (les réactifs) doivent être dans des proportions précises pour obtenir les « plats » (les produits).
```


## u3: Meaning and importance of coefficients in balanced equations

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
    "reason": "The explanation correctly defines stoichiometric coefficients as indicating proportions in terms of molecules or moles.",
    "errors": []
  }
}
```

```text
### 2. L’équation chimique équilibrée (la base indispensable)

Prenons un exemple très simple :

**2 H₂ + O₂ → 2 H₂O**

Que signifie cette équation ?
- **2 H₂** = 2 molécules de dihydrogène
- **O₂** = 1 molécule de dioxygène
- **2 H₂O** = 2 molécules d’eau

Les chiffres devant les formules (les **coefficients**) sont très importants : ils indiquent les **proportions** en nombre de molécules (ou en moles).

Si on ne respecte pas ces proportions, la réaction n’est pas « équilibrée » et les calculs seront faux.
```


## u4: The mole concept, Avogadro's number, and molar mass

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
    "reason": "The unit accurately defines the mole, Avogadro's number, molar mass, and provides correct approximate molar masses for H2, O2, and H2O.",
    "errors": []
  }
}
```

```text
### 3. Le concept de « mole » (l’unité magique)

En chimie, on ne compte pas les molécules une par une (il y en a beaucoup trop !). On utilise la **mole**.

- 1 mole = 6,022 × 10²³ particules (c’est le nombre d’Avogadro)
- La **masse molaire** (notée *M*) est la masse d’1 mole d’une substance, exprimée en g/mol.

Exemples :
- M(H₂) = 2 g/mol
- M(O₂) = 32 g/mol
- M(H₂O) = 18 g/mol
```


## u5: Worked mass-to-mass stoichiometric calculation

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
    "verdict": "contains_error",
    "reason": "The numerical calculation is fully correct, but the heading explicitly announces a four-step method while only three numbered steps are provided.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "(méthode en 4 étapes)"
          }
        ],
        "description": "The heading promises a 4-step method, but the text only lists three sequential steps (1. Convertir les masses en moles, 2. Utiliser les rapports stœchiométriques, 3. Reconvertir les moles en masse).",
        "correction": "Change the heading to '(méthode en 3 étapes)' or explicitly include the first step of writing/verifying the balanced chemical equation.",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### 4. Comment faire un calcul stœchiométrique ? (méthode en 4 étapes)

Reprenons l’équation :  
**2 H₂ + O₂ → 2 H₂O**

**Question** : Si je fais réagir 4 g de H₂, quelle masse d’eau vais-je obtenir (en supposant qu’il y a assez d’oxygène) ?

**Méthode** :

1. **Convertir les masses en moles**  
   n(H₂) = masse / masse molaire = 4 g ÷ 2 g/mol = **2 moles** de H₂

2. **Utiliser les rapports stœchiométriques** (les coefficients)  
   D’après l’équation :  
   2 moles de H₂ → 2 moles de H₂O  
   Donc 1 mole de H₂ → 1 mole de H₂O  
   Avec 2 moles de H₂ → **2 moles** de H₂O

3. **Reconvertir les moles en masse**  
   Masse d’eau = nombre de moles × masse molaire = 2 mol × 18 g/mol = **36 g**

**Réponse** : On obtient 36 g d’eau.
```


## u6: Definition of limiting reactant

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
    "reason": "The definition correctly explains that the limiting reactant is completely consumed first and determines the maximum quantity of products formed.",
    "errors": []
  }
}
```

```text
### 5. Le réactif limitant (un peu plus avancé)

Parfois, tu n’as pas assez d’un des réactifs. Le **réactif limitant** est celui qui va « s’épuiser en premier » et qui va donc limiter la quantité de produit formé.
```


## u7: Worked example finding the limiting reactant and product amount

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
    "reason": "The molar calculations and stoichiometric comparison (2 mol H2 requiring 1 mol O2, with only 0.5 mol O2 available) correctly identify oxygen as the limiting reactant and compute 1 mol (18 g) of water produced.",
    "errors": []
  }
}
```

```text
Exemple rapide :  
Tu as 4 g de H₂ et seulement 16 g de O₂.  
- 4 g H₂ = 2 mol → il faudrait 1 mol d’O₂ (32 g)  
- Tu n’as que 16 g d’O₂ = 0,5 mol  

L’oxygène est limitant. Tu ne pourras former que 1 mol d’eau (18 g) au lieu de 36 g.
```


## u8: Summary of key stoichiometric rules

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
    "reason": "The recap accurately synthesizes the essential procedural rules and cautions of stoichiometry.",
    "errors": []
  }
}
```

```text
### Résumé des points clés

- Toujours **équilibrer** l’équation d’abord.
- Passer par les **moles** (jamais calculer directement en grammes).
- Utiliser les **coefficients** de l’équation comme rapports.
- Attention au **réactif limitant** quand les quantités ne sont pas exactement proportionnelles.
```


## u9: Practice advice and suggested reaction types

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The suggested practice reactions are standard, accessible examples appropriate for beginner practice.",
    "errors": []
  }
}
```

```text
### Conseil de prof

Entraîne-toi avec des réactions simples au début :
- Combustion du méthane (CH₄)
- Synthèse de l’ammoniac (N₂ + H₂)
- Décomposition du carbonate de calcium
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 introduces the formation of water reaction to explain what stoichiometric coefficients represent. It can be seen as a CONCEPT unit explaining coefficients or an illustrative EXAMPLE unit.",
    "proposed_resolution": "Classified as CONCEPT with depth 'explanation' because its main purpose in Section 2 is to teach the conceptual meaning of stoichiometric coefficients rather than to solve or illustrate a specific reaction case."
  },
  {
    "unit_ids": [
      "u6",
      "u7"
    ],
    "issue": "Section 5 presents both the general definition of a limiting reactant and an immediate quantitative calculation. These could either be merged into a single CONCEPT unit with an illustrative calculation or split into CONCEPT and EXAMPLE.",
    "proposed_resolution": "Split into u6 (CONCEPT) and u7 (EXAMPLE) because the second part explicitly develops a standalone numerical calculation determining moles, limiting reactant, and final product mass."
  },
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "The crêpe recipe analogy connects the concept to everyday cooking, but crêpes are also culturally prominent in Francophone culture.",
    "proposed_resolution": "Assigned 'everyday' rather than 'localized' because making pancakes/crêpes is invoked as a general household culinary activity rather than an explicitly localized cultural practice."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Je vais t’expliquer la **stœchiométrie** de façon simple et claire, comme si nous étions en cours ensemble. C’est un outil très utile en chimie au lycée, alors on va y aller étape par étape.

### 1. Qu’est-ce que la stœchiométrie ?


```

```text


Tu veux qu’on fasse ensemble un exercice complet (avec réactif limitant ou avec calcul de rendement) ? Dis-moi le niveau que tu vises (Seconde, Première ou Terminale) et je t’adapte l’explication !
```
