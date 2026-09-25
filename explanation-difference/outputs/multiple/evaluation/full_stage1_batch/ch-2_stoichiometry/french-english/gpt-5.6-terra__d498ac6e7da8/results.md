# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, including chemical equations, mole calculations, limiting reactants, and molar volume",
  "topic_match": "on_topic",
  "reason": "The response comprehensively explains the principles and methods of chemical stoichiometry in French, covering balancing equations, mole-mass conversions, stoichiometric ratios, limiting reactants, and molar volume.",
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
    "u12",
    "u13",
    "u14"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | CONCEPT | Meaning of stoichiometric coefficients and mole ratios | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Balancing chemical equations and atom conservation | {"depth": "explanation"} | accurate |
| u4 | CAVEAT | Not altering chemical formulas when balancing | {"subtype": "misconception"} | accurate |
| u5 | CONCEPT | Amount of substance, molar mass, and relationship n = m/M | {"depth": "explanation"} | accurate |
| u6 | PROCEDURE | General method for solving stoichiometry problems | {} | accurate |
| u7 | EXAMPLE | Calculating the mass of water produced from a given mass of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | EXAMPLE | Calculating moles of product with non-1:1 stoichiometric ratios | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | CONCEPT | Definition of limiting reactant | {"depth": "statement"} | accurate |
| u10 | ANALOGY | Sandwich recipe analogy for limiting reactant | {} | accurate |
| u11 | EXAMPLE | Worked example identifying the limiting reactant and product amount | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u12 | CONCEPT | Molar volume of gases and formula V = n * Vm | {"depth": "explanation"} | accurate |
| u13 | STUDY_SUPPORT | Summary of essential formulas for stoichiometry | {"subtype": "recap"} | accurate |
| u14 | STUDY_SUPPORT | Closing summary of key stoichiometric principles | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "Accurately defines stoichiometry as the calculation of quantities of reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
La **stœchiométrie** est la partie de la chimie qui permet de calculer les **quantités de réactifs et de produits** impliquées dans une réaction chimique.

En bref : elle répond à des questions comme :

- Quelle masse de produit peut-on fabriquer ?
- Quelle quantité de réactif faut-il utiliser ?
- Quel réactif va manquer en premier ?
- Quel volume de gaz sera produit ?
```


## u2: Meaning of stoichiometric coefficients and mole ratios

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
    "reason": "Correctly explains how stoichiometric coefficients represent proportions at both the molecular scale and the molar scale.",
    "errors": []
  }
}
```

```text
## 1. L’idée principale : une recette chimique

Une équation chimique équilibrée fonctionne comme une recette.

Par exemple :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

Cela signifie que :

- 2 molécules de dihydrogène \(H_2\)
- réagissent avec 1 molécule de dioxygène \(O_2\)
- pour former 2 molécules d’eau \(H_2O\).

Mais en laboratoire, on ne compte pas les molécules une par une. On utilise une unité appelée la **mole**.

On peut donc aussi lire l’équation ainsi :

\[
2\ \text{mol de } H_2 + 1\ \text{mol de } O_2 \rightarrow 2\ \text{mol de } H_2O
\]

Les nombres devant les formules, appelés **coefficients stœchiométriques**, indiquent les proportions.
```


## u3: Balancing chemical equations and atom conservation

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
    "reason": "Correctly states the law of conservation of atoms and demonstrates how coefficients are placed to balance an equation.",
    "errors": []
  }
}
```

```text
## 2. Toujours commencer par équilibrer l’équation

Une équation chimique doit respecter la conservation des atomes : on ne crée pas et on ne détruit pas d’atomes.

Exemple non équilibré :

\[
H_2 + O_2 \rightarrow H_2O
\]

À gauche, il y a 2 atomes d’oxygène ; à droite, seulement 1. Ce n’est pas équilibré.

On ajoute donc des coefficients :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

Vérification :

| Élément | À gauche | À droite |
|---|---:|---:|
| H | 4 | 4 |
| O | 2 | 2 |

L’équation est équilibrée.
```


## u4: Not altering chemical formulas when balancing

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
    "reason": "Accurately highlights the common student error of altering subscripts instead of adjusting stoichiometric coefficients.",
    "errors": []
  }
}
```

```text
> Attention : on ne change jamais les indices dans les formules chimiques.  
> Par exemple, on ne transforme pas \(H_2O\) en \(H_2O_2\). On ajoute seulement des coefficients devant les formules.
```


## u5: Amount of substance, molar mass, and relationship n = m/M

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
    "reason": "Correctly defines the mole, introduces n = m/M with standard units, and illustrates the molar mass calculation for water.",
    "errors": []
  }
}
```

```text
## 3. La mole et la masse molaire

La **mole** est une unité de quantité de matière, notée \(n\).

La relation essentielle est :

\[
n = \frac{m}{M}
\]

avec :

- \(n\) : quantité de matière, en moles (mol) ;
- \(m\) : masse, en grammes (g) ;
- \(M\) : masse molaire, en g·mol\(^{-1}\).

### Exemple : masse molaire de l’eau

Pour \(H_2O\) :

- H : environ \(1\ \text{g·mol}^{-1}\)
- O : environ \(16\ \text{g·mol}^{-1}\)

Donc :

\[
M(H_2O) = 2 \times 1 + 16 = 18\ \text{g·mol}^{-1}
\]

Une mole d’eau a donc une masse de 18 g.
```


## u6: General method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately lays out the standard multi-step procedure for stoichiometry problem solving.",
    "errors": []
  }
}
```

```text
## 4. Méthode générale pour un exercice de stœchiométrie

Voici la méthode à suivre presque tout le temps :

1. **Écrire et équilibrer l’équation chimique.**
2. **Transformer les données en moles**, si elles sont données en grammes, litres, etc.
3. **Utiliser le rapport des coefficients** de l’équation équilibrée.
4. **Convertir le résultat** dans l’unité demandée : grammes, litres, moles…
5. Vérifier si un **réactif limitant** est présent.
```


## u7: Calculating the mass of water produced from a given mass of hydrogen

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
    "reason": "All calculations, stoichiometric ratios, and conversions are carried out correctly.",
    "errors": []
  }
}
```

```text
# Exemple 1 : Calculer une masse de produit

On fait réagir 4,0 g de dihydrogène \(H_2\) avec suffisamment de dioxygène. Quelle masse d’eau peut-on produire ?

### Étape 1 : équation équilibrée

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### Étape 2 : calculer la quantité de matière de \(H_2\)

La masse molaire du dihydrogène est :

\[
M(H_2) = 2 \times 1 = 2\ \text{g·mol}^{-1}
\]

Donc :

\[
n(H_2) = \frac{m}{M} = \frac{4,0}{2,0} = 2,0\ \text{mol}
\]

### Étape 3 : utiliser les coefficients stœchiométriques

Dans l’équation :

\[
2H_2 \rightarrow 2H_2O
\]

Le rapport est donc :

\[
2\ \text{mol de } H_2 \rightarrow 2\ \text{mol de } H_2O
\]

Ainsi :

\[
n(H_2O) = 2,0\ \text{mol}
\]

### Étape 4 : convertir en masse

\[
M(H_2O) = 18\ \text{g·mol}^{-1}
\]

\[
m(H_2O) = n \times M
\]

\[
m(H_2O) = 2,0 \times 18 = 36\ \text{g}
\]

**Réponse : on peut produire 36 g d’eau.**
```


## u8: Calculating moles of product with non-1:1 stoichiometric ratios

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
    "reason": "The calculation using the 2/3 stoichiometric ratio is completely correct.",
    "errors": []
  }
}
```

```text
# Exemple 2 : Utiliser un rapport différent

Considérons la réaction :

\[
N_2 + 3H_2 \rightarrow 2NH_3
\]

Le diazote \(N_2\) réagit avec le dihydrogène \(H_2\) pour former de l’ammoniac \(NH_3\).

Supposons que l’on possède 6,0 mol de \(H_2\), avec du \(N_2\) en excès. Combien de moles de \(NH_3\) peut-on former ?

D’après l’équation :

\[
3\ \text{mol de } H_2 \rightarrow 2\ \text{mol de } NH_3
\]

Donc :

\[
n(NH_3) = 6,0 \times \frac{2}{3}
\]

\[
n(NH_3) = 4,0\ \text{mol}
\]

**Réponse : 6,0 mol de \(H_2\) permettent de former 4,0 mol de \(NH_3\).**
```


## u9: Definition of limiting reactant

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
    "reason": "Correctly defines the limiting reactant and its role in determining the maximum yield of products.",
    "errors": []
  }
}
```

```text
## 5. Le réactif limitant

Le **réactif limitant** est celui qui est entièrement consommé en premier. Il limite donc la quantité maximale de produits formés.
```


## u10: Sandwich recipe analogy for limiting reactant

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine une recette de sandwich :\n\n- 2 tranches de pain + 1 tranche de fromage → 1 sandwich."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The sandwich analogy accurately maps the concept of a limiting ingredient to chemical reactants.",
    "errors": []
  }
}
```

```text
Imagine une recette de sandwich :

- 2 tranches de pain + 1 tranche de fromage → 1 sandwich.

Si tu as :

- 10 tranches de pain,
- 3 tranches de fromage,

tu peux faire seulement 3 sandwichs. Le fromage est le **facteur limitant**.

En chimie, c’est pareil.
```


## u11: Worked example identifying the limiting reactant and product amount

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
    "reason": "The determination of the limiting reactant and the resulting amount of water is fully correct.",
    "errors": []
  }
}
```

```text
### Exemple

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

On possède :

- \(3,0\) mol de \(H_2\),
- \(2,0\) mol de \(O_2\).

L’équation exige :

\[
2\ \text{mol de } H_2 \text{ pour } 1\ \text{mol de } O_2
\]

Pour faire réagir 3,0 mol de \(H_2\), il faut :

\[
n(O_2) = 3,0 \times \frac{1}{2} = 1,5\ \text{mol}
\]

Or on a 2,0 mol de \(O_2\), donc il y en a assez. C’est le \(H_2\) qui manque en premier.

**Le dihydrogène \(H_2\) est le réactif limitant.**

Puisque \(2H_2 \rightarrow 2H_2O\), les 3,0 mol de \(H_2\) produisent :

\[
3,0\ \text{mol de } H_2O
\]
```


## u12: Molar volume of gases and formula V = n * Vm

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
    "reason": "Accurately introduces molar volume, defines the terms, and provides a realistic example value at standard room conditions.",
    "errors": []
  }
}
```

```text
## 6. Cas des gaz : volume molaire

Pour les gaz, on peut parfois utiliser le **volume molaire**.

À température et pression données :

\[
V = n \times V_m
\]

avec :

- \(V\) : volume du gaz ;
- \(n\) : quantité de matière ;
- \(V_m\) : volume molaire.

Souvent, dans les exercices au lycée, on donne \(V_m\), par exemple :

\[
V_m = 24,0\ \text{L·mol}^{-1}
\]

Cela signifie qu’une mole de gaz occupe 24,0 L dans ces conditions.
```


## u13: Summary of essential formulas for stoichiometry

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
    "reason": "The listed conversion formulas are all mathematically and conceptually correct.",
    "errors": []
  }
}
```

```text
## 7. Formules importantes à connaître

### Pour passer de la masse aux moles

\[
n = \frac{m}{M}
\]

### Pour passer des moles à la masse

\[
m = n \times M
\]

### Pour un gaz

\[
n = \frac{V}{V_m}
\]

ou

\[
V = n \times V_m
\]
```


## u14: Closing summary of key stoichiometric principles

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
    "reason": "Accurately summarizes the central ideas and workflow of stoichiometry.",
    "errors": []
  }
}
```

```text
## 8. Résumé

La stœchiométrie repose sur trois idées :

1. **Équilibrer l’équation chimique.**
2. **Utiliser les coefficients comme rapports entre les moles.**
3. **Convertir entre masse, quantité de matière et volume selon la situation.**

Le chemin typique est :

\[
\text{masse du réactif} \rightarrow \text{moles du réactif} \rightarrow \text{moles du produit} \rightarrow \text{masse ou volume du produit}
\]

La chose la plus importante à retenir est que les coefficients de l’équation équilibrée donnent les proportions de la réaction.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```
