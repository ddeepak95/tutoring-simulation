# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, stoichiometric coefficients, mole versus mass relationships, limiting reactants, and problem-solving steps",
  "topic_match": "on_topic",
  "reason": "The text explains the fundamental concepts and principles of chemical stoichiometry, including stoichiometric coefficients, mole-mass relationships, limiting reactants, and a step-by-step procedure for stoichiometry problems.",
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
| u1 | CONCEPT | Definition and etymology of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Sandwich recipe analogy for stoichiometric proportions | {} | accurate |
| u3 | CONCEPT | Stoichiometric coefficients and atom conservation in chemical equations | {"depth": "explanation"} | accurate |
| u4 | CAVEAT | Warning against confusing masses in grams with molar quantities | {"subtype": "misconception"} | accurate |
| u5 | CONCEPT | Limiting reactant, excess reactant, and stoichiometric proportions | {"depth": "explanation"} | accurate |
| u6 | PROCEDURE | Four-step method for solving stoichiometry problems | {} | accurate |

## u1: Definition and etymology of stoichiometry

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
    "reason": "The etymological origin and qualitative definition of stoichiometry are factually accurate.",
    "errors": []
  }
}
```

```text
**stœchiométrie** (prononce *sté-kio-mé-tri*). Ça ressemble à une formule magique dans Harry Potter, mais en réalité, c’est juste **la recette de cuisine de la chimie**.

D'ailleurs, le mot vient du grec ancien : *stoikheion* (élément) et *metron* (mesure). Faire de la stœchiométrie, c’est simplement **mesurer les bonnes proportions d'éléments chimiques**.
```


## u2: Sandwich recipe analogy for stoichiometric proportions

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine que tu prépares des sandwichs jambon-fromage selon cette recette stricte :\n> **2 tranches de pain + 1 tranche de jambon + 2 tranches de fromage = 1 sandwich**"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy maps recipe ingredient ratios to stoichiometric ratios correctly and the calculation is logically sound.",
    "errors": []
  }
}
```

```text
### 1. La métaphore du sandwich (Pour comprendre le principe)

Imagine que tu prépares des sandwichs jambon-fromage selon cette recette stricte :
> **2 tranches de pain + 1 tranche de jambon + 2 tranches de fromage = 1 sandwich**

Si je te demande : *"J'ai 10 tranches de pain, combien me faut-il de jambon et de fromage pour faire des sandwichs parfaits ?"*
Tu vas calculer instinctivement :
* Il te faut 5 tranches de jambon (la moitié du pain).
* Il te faut 10 tranches de fromage (autant que de pain).
* Tu obtiendras 5 sandwichs.

Félicitations, **tu viens de faire de la stœchiométrie sans le savoir !** Tu as utilisé les proportions de la recette pour calculer les quantités nécessaires.
```


## u3: Stoichiometric coefficients and atom conservation in chemical equations

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
    "reason": "The explanation of stoichiometric coefficients and mass conservation via balanced atom counts in water formation is chemically accurate.",
    "errors": []
  }
}
```

```text
### 2. Du sandwich aux molécules

En chimie, c'est exactement la même chose. Sauf qu'au lieu de tranches de pain, on a des atomes ou des molécules.

Prenons la fabrication de l'eau : l'hydrogène ($H_2$) réagit avec l'oxygène ($O_2$) pour donner de l'eau ($H_2O$).

L'équation chimique (la recette), c'est :
$$2 H_2 + 1 O_2 \rightarrow 2 H_2O$$

Les grands chiffres devant les molécules s'appellent les **coefficients stœchiométriques**. Ils te donnent la proportion :
* Il te faut **2** paquets de dihydrogène pour **1** paquet de dioxygène.
* Cela te donnera **2** paquets d'eau.

Rien ne se perd, rien ne se crée (merci Lavoisier) : tu as 4 atomes de H et 2 atomes de O au début, tu as 4 atomes de H et 2 atomes de O à la fin. Tout est équilibré.
```


## u4: Warning against confusing masses in grams with molar quantities

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Dans ma recette : 2 tranches de pain + 1 tranche de jambon.\nEst-ce que ça veut dire que 2 **grammes** de pain vont avec 1 **gramme** de jambon ? **Non !** Une tranche de pain ne pèse pas la même chose qu'une tranche de jambon."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The distinction between macroscopic mass ratios and molar/particle ratios dictated by stoichiometric coefficients is accurately explained.",
    "errors": []
  }
}
```

```text
### 3. Le piège à éviter : Les grammes vs Les Moles

C'est ici que beaucoup d'élèves se trompent.

Dans ma recette : 2 tranches de pain + 1 tranche de jambon.
Est-ce que ça veut dire que 2 **grammes** de pain vont avec 1 **gramme** de jambon ? **Non !** Une tranche de pain ne pèse pas la même chose qu'une tranche de jambon.

En chimie, c'est pareil :
Une molécule d'oxygène est beaucoup plus lourde qu'une molécule d'hydrogène. Tu ne peux donc **JAMAIS faire de calculs directs avec les masses (en grammes)**.

Pour compter les molécules, les chimistes utilisent une unité spéciale : **la mole** (le "paquet" de molécules).
* Les coefficients de l'équation te parlent en **moles**, jamais en grammes.
* $2 H_2 + 1 O_2 \rightarrow 2 H_2O$ veut dire : **2 moles** de $H_2$ réagissent avec **1 mole** de $O_2$ pour donner **2 moles** d'$H_2O$.
```


## u5: Limiting reactant, excess reactant, and stoichiometric proportions

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
        "quote": "Que se passe-t-il si tu as 10 tranches de pain, mais seulement 2 tranches de jambon ?\nTu ne pourras faire que 2 sandwichs. Il te restera du pain sur les bras."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definitions and qualitative mechanisms of limiting reactants, excess reactants, and stoichiometric mixtures are correct.",
    "errors": []
  }
}
```

```text
### 4. Le concept du "Réactif limitant"

Que se passe-t-il si tu as 10 tranches de pain, mais seulement 2 tranches de jambon ?
Tu ne pourras faire que 2 sandwichs. Il te restera du pain sur les bras.

En chimie :
* Le jambon est le **réactif limitant** : c'est lui qui s'épuise en premier et qui arrête la réaction.
* Le pain est le **réactif en excès** : il en reste à la fin.
* Un mélange est dit **"dans les proportions stœchiométriques"** quand on a mis pile-poil les bonnes quantités : tout disparaît en même temps, il n'y a aucun reste !
```


## u6: Four-step method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four-step algorithm and the formulas relating mass, molar mass, and moles ($n = m/M$ and $m = n \\times M$) are correct standard procedure in introductory chemistry.",
    "errors": []
  }
}
```

```text
### 5. La méthode infaillible pour tes exercices (La boîte à outils)

Quand ton prof te donne un problème de stœchiométrie, suis toujours ces 4 étapes :

1. **Équilibre l'équation** : Trouve les bons coefficients (la bonne recette).
2. **Passe par les moles** : Si on te donne des grammes, convertis-les en moles avec la formule magique : $n = \frac{m}{M}$ *(quantité de matière = masse / masse molaire)*.
3. **Fais les proportions (Le tableau d'avancement)** : Utilise les coefficients stœchiométriques pour voir combien de moles de produits tu vas fabriquer.
4. **Réponds à la question** : Si on te demande une masse finale, reconvertis tes moles en grammes ($m = n \times M$).
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 uses the formation of water to explain what stoichiometric coefficients are and demonstrate atom balance. It could be viewed either as a CONCEPT (explaining stoichiometric coefficients with an illustrative reaction) or as an EXAMPLE (an illustrative chemical example of a balanced reaction).",
    "proposed_resolution": "Classified as CONCEPT because its primary teaching role is introducing the general concept and meaning of stoichiometric coefficients and conservation of mass, rather than analyzing a specific problem."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Unit u5 continues the sandwich analogy from u2 to motivate the definitions of limiting and excess reactants before giving their chemical definitions.",
    "proposed_resolution": "Kept as a single CONCEPT unit because the sandwich scenario serves directly to explain and define limiting reactants, excess reactants, and stoichiometric proportions."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Installe-toi. Ne te laisse pas impressionner par ce mot barbare : 
```

```text


Laisse-moi t'expliquer cela simplement.

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


Tu vois ? La stœchiométrie n'a rien de magique. C'est juste de la comptabilité appliquée aux molécules. Est-ce que cette explication te semble claire ?
```
