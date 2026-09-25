# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, including balancing equations, molar conversions, calculation procedure, and limiting reactants",
  "topic_match": "on_topic",
  "reason": "The explanation systematically covers the core aspects of stoichiometry: balancing chemical equations based on conservation of mass/atoms, mole concept and molar mass conversions, a general stoichiometric calculation procedure with a worked example, and determination of the limiting reactant.",
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
    "u11"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and scope of stoichiometry | {"depth": "statement"} | accurate |
| u2 | CONCEPT | Meaning of stoichiometric coefficients and mole ratios | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Conservation of atoms and balancing chemical equations | {"depth": "explanation"} | accurate |
| u4 | CAVEAT | Do not modify chemical formula subscripts when balancing | {"subtype": "misconception"} | accurate |
| u5 | CONCEPT | The mole as a unit of measurement in chemistry | {"depth": "explanation"} | accurate |
| u6 | CONCEPT | Mass-to-mole conversion formula and worked calculation | {"depth": "explanation"} | accurate |
| u7 | PROCEDURE | General method for solving stoichiometry problems | {} | accurate |
| u8 | EXAMPLE | Complete worked stoichiometry problem calculating mass of water formed | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | CONCEPT | Concept of limiting reactant and worked example | {"depth": "explanation"} | accurate |
| u10 | PROCEDURE | Method for identifying the limiting reactant using stoichiometric ratios | {} | accurate |
| u11 | STUDY_SUPPORT | Summary recap of key stoichiometric concepts and steps | {"subtype": "recap"} | accurate |

## u1: Definition and scope of stoichiometry

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
    "reason": "The definition accurately captures stoichiometry as the calculation of relative quantities of reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
La **stœchiométrie** est la partie de la chimie qui permet de calculer les **quantités de réactifs** nécessaires et les **quantités de produits** formées lors d’une réaction chimique.

En résumé, elle répond à des questions comme :

- Combien de grammes d’un produit peut-on obtenir ?
- Quelle masse de réactif faut-il utiliser ?
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
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "On peut comparer une équation chimique à une recette de cuisine."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly explains the physical meaning of stoichiometric coefficients at both microscopic (molecular) and macroscopic (molar) scales.",
    "errors": []
  }
}
```

```text
## 1. Une réaction chimique est une « recette »

On peut comparer une équation chimique à une recette de cuisine.

Par exemple :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

Cette équation signifie que :

- 2 molécules de dihydrogène \(H_2\)
- réagissent avec 1 molécule de dioxygène \(O_2\)
- pour former 2 molécules d’eau \(H_2O\).

Les nombres placés devant les formules sont appelés les **coefficients stœchiométriques**.

Ici, le rapport est :

\[
2 \text{ mol } H_2 : 1 \text{ mol } O_2 : 2 \text{ mol } H_2O
\]

Autrement dit :

- 2 moles de \(H_2\) réagissent avec 1 mole de \(O_2\),
- et produisent 2 moles de \(H_2O\).
```


## u3: Conservation of atoms and balancing chemical equations

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
    "reason": "Accurately explains the principle of conservation of atoms during a reaction and demonstrates how to balance the equation for water synthesis.",
    "errors": []
  }
}
```

```text
## 2. Pourquoi faut-il équilibrer une équation ?

Lors d’une réaction chimique, les atomes ne disparaissent pas et ne sont pas créés : ils se réorganisent.

C’est la **conservation des atomes**.

Prenons la formation de l’eau :

\[
H_2 + O_2 \rightarrow H_2O
\]

Cette équation n’est pas équilibrée :

- à gauche : 2 atomes d’oxygène ;
- à droite : 1 atome d’oxygène.

Il faut donc la corriger :

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


## u4: Do not modify chemical formula subscripts when balancing

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
    "reason": "Directly addresses a common student misconception by highlighting that subscripts define chemical identity and must not be altered when balancing.",
    "errors": []
  }
}
```

```text
> Important : on ne modifie jamais les petits chiffres dans les formules chimiques.  
> Par exemple, on ne transforme pas \(H_2O\) en \(H_2O_2\).  
> On ajoute seulement des coefficients devant les espèces chimiques.
```


## u5: The mole as a unit of measurement in chemistry

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
        "quote": "C’est un peu comme une douzaine :\n\n- une douzaine = 12 objets ;\n- une mole = \\(6{,}02 \\times 10^{23}\\) objets."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately introduces the mole, Avogadro's constant, and the physical reason chemists use this counting unit.",
    "errors": []
  }
}
```

```text
## 3. La mole : l’unité utilisée en stœchiométrie

Les molécules sont beaucoup trop petites pour être comptées une à une. Les chimistes utilisent donc la **mole**.

Une mole contient :

\[
N_A = 6{,}02 \times 10^{23}
\]

entités chimiques (atomes, molécules, ions…).

C’est un peu comme une douzaine :

- une douzaine = 12 objets ;
- une mole = \(6{,}02 \times 10^{23}\) objets.

On note la quantité de matière :

\[
n
\]

et son unité est la mole, notée **mol**.
```


## u6: Mass-to-mole conversion formula and worked calculation

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
    "reason": "The relationship n = m / M and the calculation of molar mass and amount of substance for 18 g of water are mathematically and physically correct.",
    "errors": []
  }
}
```

```text
## 4. Passer de la masse aux moles

En laboratoire, on mesure souvent une masse en grammes. Pour utiliser une équation chimique, il faut généralement convertir cette masse en quantité de matière.

La formule est :

\[
n = \frac{m}{M}
\]

avec :

- \(n\) : quantité de matière, en mol ;
- \(m\) : masse, en g ;
- \(M\) : masse molaire, en g·mol\(^{-1}\).

### Exemple

Calculons la quantité de matière contenue dans 18 g d’eau.

La masse molaire de l’eau est :

\[
M(H_2O)=2 \times 1 + 16 = 18 \text{ g·mol}^{-1}
\]

Donc :

\[
n(H_2O)=\frac{18}{18}=1{,}0 \text{ mol}
\]

Ainsi, 18 g d’eau correspondent à 1 mole d’eau.
```


## u7: General method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four-step algorithm provides a standard, chemically correct procedure for solving stoichiometry problems.",
    "errors": []
  }
}
```

```text
## 5. Méthode générale pour résoudre un exercice de stœchiométrie

Voici la méthode à retenir.

### Étape 1 : Écrire et équilibrer l’équation chimique

Exemple :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### Étape 2 : Convertir les données en moles

Si on donne une masse, utiliser :

\[
n = \frac{m}{M}
\]

Si on donne une concentration et un volume de solution :

\[
n = C \times V
\]

avec :

- \(C\) en mol·L\(^{-1}\),
- \(V\) en L.

### Étape 3 : Utiliser les coefficients de l’équation

Les coefficients donnent les proportions en moles.

Dans :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

on a :

\[
\frac{n(H_2)}{2} = \frac{n(O_2)}{1} = \frac{n(H_2O)}{2}
\]

### Étape 4 : Reconvertir si nécessaire

On peut revenir à une masse grâce à :

\[
m = n \times M
\]
```


## u8: Complete worked stoichiometry problem calculating mass of water formed

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
    "reason": "All calculations, stoichiometric proportions, units, and final numerical values are completely correct.",
    "errors": []
  }
}
```

```text
# Exemple complet

On fait réagir 4,0 g de dihydrogène \(H_2\) avec suffisamment de dioxygène. Quelle masse d’eau peut-on former ?

### 1. Équation équilibrée

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### 2. Calcul de la quantité de matière de dihydrogène

La masse molaire de \(H_2\) est :

\[
M(H_2)=2{,}0 \text{ g·mol}^{-1}
\]

Donc :

\[
n(H_2)=\frac{m}{M}=\frac{4{,}0}{2{,}0}=2{,}0 \text{ mol}
\]

### 3. Utilisation des coefficients

L’équation indique :

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

Donc :

\[
n(H_2O)=2{,}0 \text{ mol}
\]

### 4. Calcul de la masse d’eau formée

\[
M(H_2O)=18{,}0 \text{ g·mol}^{-1}
\]

\[
m(H_2O)=n \times M=2{,}0 \times 18{,}0=36{,}0 \text{ g}
\]

**Réponse :** 4,0 g de dihydrogène peuvent former **36,0 g d’eau**, si le dioxygène est en quantité suffisante.
```


## u9: Concept of limiting reactant and worked example

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
    "reason": "The definition and the worked identification of the limiting reactant and excess reactant are accurate.",
    "errors": []
  }
}
```

```text
## 6. Le réactif limitant

Souvent, les deux réactifs ne sont pas présents dans les bonnes proportions. Celui qui est entièrement consommé en premier s’appelle le **réactif limitant**.

C’est lui qui limite la quantité de produit formé.

### Exemple

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

Supposons qu’on possède :

- \(3\) mol de \(H_2\),
- \(2\) mol de \(O_2\).

D’après l’équation, il faut :

\[
2 \text{ mol } H_2 \text{ pour } 1 \text{ mol } O_2
\]

Pour faire réagir 3 mol de \(H_2\), il faudrait :

\[
\frac{3}{2}=1{,}5 \text{ mol de } O_2
\]

Or on possède 2 mol de \(O_2\), donc il y en a assez.

Le dihydrogène \(H_2\) est donc le **réactif limitant**.

Il restera :

\[
2 - 1{,}5 = 0{,}5 \text{ mol de } O_2
\]

à la fin de la réaction.
```


## u10: Method for identifying the limiting reactant using stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The shortcut method (comparing n/coefficient) is standard and valid for finding the limiting reagent.",
    "errors": []
  }
}
```

```text
## 7. Astuce pour trouver le réactif limitant

On peut calculer, pour chaque réactif :

\[
\frac{n}{\text{coefficient stœchiométrique}}
\]

Le plus petit résultat correspond au réactif limitant.

Par exemple :

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

avec 3 mol de \(H_2\) et 2 mol de \(O_2\) :

\[
\frac{n(H_2)}{2}=\frac{3}{2}=1{,}5
\]

\[
\frac{n(O_2)}{1}=\frac{2}{1}=2
\]

Le plus petit nombre est 1,5 : le réactif limitant est donc \(H_2\).
```


## u11: Summary recap of key stoichiometric concepts and steps

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
    "reason": "The summary points accurately recap the essential rules and definitions introduced in the text.",
    "errors": []
  }
}
```

```text
# À retenir

1. **Équilibrer l’équation** chimique.
2. Les coefficients donnent les **proportions en moles**.
3. Pour passer de grammes à moles :

\[
n=\frac{m}{M}
\]

4. Pour passer de moles à grammes :

\[
m=nM
\]

5. Le **réactif limitant** est celui qui est consommé complètement en premier.
6. La stœchiométrie ressemble à une recette : les coefficients indiquent les quantités nécessaires de chaque « ingrédient ».
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "Section 4 introduces the formula n = m / M and follows immediately with a short worked numerical example with 18 g of water. This could be split into a CONCEPT unit for the formula and an EXAMPLE unit for the calculation.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the 18 g water calculation directly supports and instantiates the formula n = m / M within the same subsection rather than functioning as an independent problem."
  },
  {
    "unit_ids": [
      "u9"
    ],
    "issue": "Section 6 defines the limiting reactant and provides an illustrative numerical example comparing 3 mol H2 and 2 mol O2. This could be split into a CONCEPT unit and an EXAMPLE unit.",
    "proposed_resolution": "Retained as a single CONCEPT unit with explanatory depth because the example directly justifies and demonstrates the definition of limiting and excess reactants."
  },
  {
    "unit_ids": [
      "u10"
    ],
    "issue": "Section 7 is introduced as an 'Astuce' (tip/trick), which could be categorized as STUDY_SUPPORT (study_strategy) rather than PROCEDURE.",
    "proposed_resolution": "Categorized as PROCEDURE because it provides an algorithmic, reusable calculation method (evaluating n/coefficient for each reactant to determine the minimum) to perform a specific chemical task."
  }
]
```

## Unassigned text for coverage review

```text
# La stœchiométrie : comprendre les proportions en chimie


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
