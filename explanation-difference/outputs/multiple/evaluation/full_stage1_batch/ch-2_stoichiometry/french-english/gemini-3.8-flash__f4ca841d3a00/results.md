# Stage 1: French / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry in chemistry",
  "topic_match": "on_topic",
  "reason": "The explanation introduces stoichiometry, covering stoichiometric coefficients, balanced chemical equations, the mole concept, limiting and excess reactants, and a general method to solve stoichiometry problems.",
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
| u1 | ANALOGY | Sandwich-making analogy for stoichiometry and proportions | {} | accurate |
| u2 | CONCEPT | Stoichiometric coefficients and mass conservation in balanced equations | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole as a macroscopic bridge for stoichiometric equations | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Limiting and excess reactants | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | Four-step method for solving stoichiometry problems | {} | accurate |
| u6 | STUDY_SUPPORT | Summary recap of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Sandwich-making analogy for stoichiometry and proportions

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 1,
        "quote": "Imagine que tu prépares des sandwichs au fromage."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps fixed ingredient proportions in a recipe to stoichiometric ratios.",
    "errors": []
  }
}
```

```text
Si tu sais suivre une recette de cuisine, tu as déjà compris 80 % du travail. **La stœchiométrie, c'est simplement la recette de cuisine de la chimie.**
```

```text
### 1. L'analogie du grilled-cheese (ou du sandwich)

Imagine que tu prépares des sandwichs au fromage. La "recette", c'est :
> **2 tranches de pain + 1 tranche de fromage $\rightarrow$ 1 sandwich**

Si je te donne **10 tranches de pain**, combien de tranches de fromage te faut-il pour ne rien gaspiller ? 
Il t'en faut **5**, et tu obtiendras **5 sandwichs**. 

Félicitations, tu viens de faire de la stœchiométrie ! Tu as calculé les proportions nécessaires pour que la réaction se fasse parfaitement.
```


## u2: Stoichiometric coefficients and mass conservation in balanced equations

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
    "reason": "The concepts of reactants, products, stoichiometric coefficients, and the conservation of atoms in balanced chemical equations are described correctly.",
    "errors": []
  }
}
```

```text
### 2. Le passage à la chimie : Les coefficients

En chimie, les ingrédients sont les **réactifs**, et le plat final est le **produit**.

Prenons la fabrication de l'eau :
$$\text{2 H}_2 + \text{O}_2 \rightarrow \text{2 H}_2\text{O}$$

Regarde les grands chiffres devant les molécules (on les appelle les **coefficients stœchiométriques**) :
* Le **2** devant $\text{H}_2$
* Le **1** sous-entendu devant $\text{O}_2$
* Le **2** devant $\text{H}_2\text{O}$

Cela se lit exactement comme la recette du sandwich : 
*"Il me faut 2 molécules de dihydrogène et 1 molécule de dioxygène pour fabriquer 2 molécules d'eau."*

> **Règle d'or de Lavoisier :** *"Rien ne se perd, rien ne se crée, tout se transforme."* Tu dois toujours avoir le même nombre d'atomes à gauche (réactifs) et à droite (produits). Ici, on a 4 hydrogènes et 2 oxygènes des deux côtés. L'équation est dite **équilibrée**.
```


## u3: The mole as a macroscopic bridge for stoichiometric equations

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
        "quote": "C'est comme quand tu achètes des œufs : tu ne les achètes pas à l'unité, tu achètes une *douzaine* (paquet de 12)."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The explanation of the mole, Avogadro's number, and reading stoichiometric ratios in moles rather than single molecules is factually correct.",
    "errors": []
  }
}
```

```text
### 3. Le problème de la balance : La Mole

Dans la vraie vie, au laboratoire, on ne peut pas attraper "deux molécules" avec une pince à épiler, c'est beaucoup trop petit. On pèse des grammes avec une balance.

Pour faire le pont entre le monde microscopique (les atomes) et notre monde (les grammes), les chimistes utilisent un "paquet" géant : **la mole**. 
* C'est comme quand tu achètes des œufs : tu ne les achètes pas à l'unité, tu achètes une *douzaine* (paquet de 12).
* Une mole, c'est un paquet d'environ $6{,}022 \times 10^{23}$ molécules (le nombre d'Avogadro).

Donc, dans notre équation :
$$\text{2 H}_2 + \text{O}_2 \rightarrow \text{2 H}_2\text{O}$$
On lit maintenant : 
*"**2 moles** de $\text{H}_2$ réagissent avec **1 mole** de $\text{O}_2$ pour donner **2 moles** de $\text{H}_2\text{O}$."*
```


## u4: Limiting and excess reactants

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
        "quote": "Tu as **10 tranches de pain**, mais seulement **2 tranches de fromage** dans ton frigo."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definitions and qualitative determination of limiting and excess reactants are accurate.",
    "errors": []
  }
}
```

```text
### 4. Le piège classique : Le réactif limitant

Reprenons les sandwichs :
Tu as **10 tranches de pain**, mais seulement **2 tranches de fromage** dans ton frigo. Combien de sandwichs peux-tu faire ?
Seulement **2**. 

Il te restera 6 tranches de pain sur les bras. 
* Le fromage est ce qu'on appelle le **réactif limitant** : c'est lui qui s'épuise en premier et qui dicte l'arrêt de la réaction.
* Le pain est le **réactif en excès**.

En chimie, c'est pareil ! Le calcul stœchiométrique te permet de savoir quel ingrédient va manquer en premier.
```


## u5: Four-step method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The 4-step sequence (balance equation -> convert mass to moles -> apply mole ratio -> convert moles to target mass) and formulas are standard and correct.",
    "errors": []
  }
}
```

```text
### 5. La méthode infaillible pour résoudre un exercice

Quand ton professeur te donne un problème de stœchiométrie (par exemple : *"Combien de grammes d'eau puis-je produire avec 8 grammes d'oxygène ?"*), suis toujours ces 4 étapes :

1. **Équilibre l'équation chimique** (écris la bonne recette).
2. **Convertis les grammes en moles** (car la recette parle en moles, pas en grammes ! Formule : $n = \frac{m}{M}$).
3. **Utilise les proportions de la recette** (fais un produit en croix / règle de trois grâce aux coefficients).
4. **Reconvertis les moles en grammes** si la question te demande une masse ($m = n \times M$).
```


## u6: Summary recap of stoichiometry

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
    "reason": "The recap accurately synthesizes the core points of the explanation.",
    "errors": []
  }
}
```

```text
**En résumé :** 
La stœchiométrie n'est rien d'autre que l'art de compter les molécules par paquets (les moles) pour respecter les proportions d'une réaction chimique équilibrée.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether the introductory sentence comparing stoichiometry to a kitchen recipe should be an independent concept or grouped with the sandwich analogy in u1.",
    "proposed_resolution": "Grouped with u1 as excerpt 0 because it introduces the primary domain mapping that Section 1 directly elaborates."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Classification of Section 4: it could be classified as CAVEAT (introduced as 'Le piège classique'), ANALOGY (developed via sandwiches), or CONCEPT (defining limiting/excess reactants).",
    "proposed_resolution": "Classified as CONCEPT because its primary teaching function is to define and explain the fundamental concepts of limiting and excess reactants rather than warning against a specific erroneous step or solely mapping an external domain."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Installe-toi. Ne te laisse pas impressionner par ce mot un peu barbare : **la stœchiométrie** (prononce *sté-kio-mé-tri*). 

En réalité, c'est un concept très logique. 
```

```text


Voici comment ça marche, étape par étape.

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


Est-ce que cette explication te semble claire ? Veux-tu qu'on essaie de faire un petit exemple de calcul ensemble ?
```
