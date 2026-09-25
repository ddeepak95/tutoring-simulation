# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, analogy, carbon isotopes example, standard isotopic notation, stability/radioactivity, and a practice question on isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly and clearly teaches the concept of isotopes, including their definition, an illustrative analogy, an example of carbon isotopes, isotopic notation, stability/radioactivity, and a comprehension question.",
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
| u1 | CONCEPT | Definition of an isotope | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Analogy of siblings to explain isotopes | {} | accurate |
| u3 | EXAMPLE | Carbon isotopes comparison | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | CONCEPT | Standard isotopic notation | {"depth": "statement"} | accurate |
| u5 | CONCEPT | Isotope stability and radioactivity | {"depth": "explanation"} | accurate |
| u6 | STUDY_SUPPORT | Comprehension practice question on mass number calculation | {"subtype": "practice_question"} | accurate |

## u1: Definition of an isotope

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
    "reason": "The definition correctly links isotopes of an element to identical atomic numbers/protons and varying neutron counts, leading to different atomic masses.",
    "errors": []
  }
}
```

```text
Un **isotope**, c'est une variante d'un même élément chimique. Deux isotopes ont :
- Le **même nombre de protons** (donc le même numéro atomique Z)
- Un **nombre différent de neutrons**
- Donc une **masse atomique différente**
```


## u2: Analogy of siblings to explain isotopes

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine des **frères et sœurs** : ils ont les mêmes parents (même \"identité familiale\" = même élément chimique), mais ils n'ont pas exactement le même poids."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The mapping between siblings (same family/parents, different weights) and isotopes (same chemical element/protons, different masses/neutrons) is valid and clear.",
    "errors": []
  }
}
```

```text
Imagine des **frères et sœurs** : ils ont les mêmes parents (même "identité familiale" = même élément chimique), mais ils n'ont pas exactement le même poids. Les isotopes, c'est pareil : même "famille" chimique (même nombre de protons), mais poids différent (nombre de neutrons différent).
```


## u3: Carbon isotopes comparison

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
    "reason": "The proton, neutron, and mass numbers given for carbon-12, carbon-13, and carbon-14 are correct.",
    "errors": []
  }
}
```

```text
| Isotope | Protons | Neutrons | Nombre de masse (A) |
|---------|---------|----------|---------------------|
| Carbone-12 (¹²C) | 6 | 6 | 12 |
| Carbone-13 (¹³C) | 6 | 7 | 13 |
| Carbone-14 (¹⁴C) | 6 | 8 | 14 |

👉 Les trois sont du **carbone** (car ils ont tous 6 protons), mais ce sont des isotopes différents.
```


## u4: Standard isotopic notation

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
    "reason": "The standard notation format AZX and definitions of X, Z, and A are factually correct.",
    "errors": []
  }
}
```

```text
On écrit un isotope comme ceci :

$$^{A}_{Z}X$$

- **X** = symbole de l'élément
- **Z** = numéro atomique (nombre de protons)
- **A** = nombre de masse (protons + neutrons)
```


## u5: Isotope stability and radioactivity

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
    "reason": "The distinction between stable and radioactive isotopes is accurate, correctly identifying carbon-12 as stable, carbon-14 as radioactive, and mentioning radiocarbon dating.",
    "errors": []
  }
}
```

```text
Certains isotopes sont **stables** (comme le Carbone-12), d'autres sont **radioactifs** (comme le Carbone-14), c'est-à-dire qu'ils se désintègrent avec le temps. C'est d'ailleurs le principe utilisé pour la **datation au carbone 14** en archéologie !
```


## u6: Comprehension practice question on mass number calculation

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The question is well-formed with physically sound givens (corresponding to oxygen-18).",
    "errors": []
  }
}
```

```text
**Question pour vérifier ta compréhension** : Si un atome a 8 protons et 10 neutrons, quel est son nombre de masse A ? 😊
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
# Explication : Les Isotopes (pour un lycéen)

## En français simple

**Définition de base**


```

```text


## Analogie pour mieux comprendre


```

```text


## Exemple concret : le Carbone


```

```text


## Notation


```

```text


## Point important : stabilité


```

```text


---


```
