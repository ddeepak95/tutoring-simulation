# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, notation, properties, and applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes in terms of atomic structure, provides examples (carbon isotopes), explains isotopic notation, contrasts chemical and physical properties, and illustrates a real-world application (radiocarbon dating).",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Atomic structure prerequisite: subatomic particles and atomic number | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Definition of isotopes | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Comparative example of carbon isotopes | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | CONCEPT | Isotope notation convention | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Real-world application: radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | STUDY_SUPPORT | One-sentence recap of isotope definition | {"subtype": "recap"} | accurate |

## u1: Atomic structure prerequisite: subatomic particles and atomic number

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
    "reason": "Correctly states the constituent subatomic particles, their charges, and that the proton number (atomic number Z) defines the chemical element.",
    "errors": []
  }
}
```

```text
## Pour commencer : structure de l'atome

Rappelle-toi qu'un atome est constitué :
- d'un **noyau** contenant des **protons** (charge +) et des **neutrons** (pas de charge)
- d'**électrons** (charge -) qui gravitent autour

Le nombre de protons définit **l'élément chimique** (c'est le numéro atomique Z). Par exemple, tout atome avec 6 protons est du carbone, tout atome avec 8 protons est de l'oxygène.
```


## u2: Definition of isotopes

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
    "reason": "Accurately defines isotopes as atoms of the same element having the same number of protons but different numbers of neutrons.",
    "errors": []
  }
}
```

```text
## Qu'est-ce qu'un isotope ?

Les **isotopes** sont des atomes d'un **même élément chimique** (donc avec le **même nombre de protons**) mais qui ont un **nombre de neutrons différent**.
```


## u3: Comparative example of carbon isotopes

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
    "reason": "The table correctly lists the proton counts, neutron counts, and mass numbers (A) for carbon-12, carbon-13, and carbon-14.",
    "errors": []
  }
}
```

```text
### Exemple concret : le carbone

| Isotope | Protons | Neutrons | Nombre de masse (A) |
|---------|---------|----------|---------------------|
| Carbone 12 | 6 | 6 | 12 |
| Carbone 13 | 6 | 7 | 13 |
| Carbone 14 | 6 | 8 | 14 |

Ces trois atomes sont tous du **carbone** (6 protons), mais ils diffèrent par leur masse.
```


## u4: Isotope notation convention

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
    "reason": "The standard nuclide notation standard with mass number A as superscript, atomic number Z as subscript, and chemical symbol X is accurately explained.",
    "errors": []
  }
}
```

```text
## Notation

On note un isotope ainsi :

$$^{A}_{Z}X$$

- **X** : symbole de l'élément
- **Z** : numéro atomique (nombre de protons)
- **A** : nombre de masse (protons + neutrons)

Exemple : $^{14}_{6}C$ se lit "carbone 14"
```


## u5: Chemical and physical properties of isotopes

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
    "reason": "Accurately contrasts the nearly identical chemical behavior of isotopes (governed by electron configuration) with differing physical properties such as nuclear stability/radioactivity.",
    "errors": []
  }
}
```

```text
## Propriétés importantes

1. **Chimiquement**, les isotopes se comportent presque de la même façon (car les propriétés chimiques dépendent des électrons, donc du nombre de protons).

2. **Physiquement**, ils peuvent être différents : certains isotopes sont **stables** (comme le carbone 12), d'autres sont **radioactifs** (comme le carbone 14, qui se désintègre avec le temps).
```


## u6: Real-world application: radiocarbon dating

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
    "reason": "Correctly describes the principle of radiocarbon dating based on the known radioactive decay rate of carbon-14 in ancient organic remains or archaeological objects.",
    "errors": []
  }
}
```

```text
## Application concrète : la datation au carbone 14

Le carbone 14 est utilisé pour dater des fossiles ou des objets anciens ! Comme il se désintègre à vitesse connue, on peut calculer l'âge d'un objet en mesurant la quantité de carbone 14 restante.
```


## u7: One-sentence recap of isotope definition

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
    "reason": "The summary accurately restates the core definition of isotopes.",
    "errors": []
  }
}
```

```text
**À retenir en une phrase** : Des isotopes = même élément (même nombre de protons), mais nombre de neutrons différent, donc masse différente.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "The section on standard nuclide notation could be categorized as PROCEDURE (a method for writing isotope symbols) or CONCEPT (definition and breakdown of symbolic notation).",
    "proposed_resolution": "Classified as CONCEPT because the unit primarily defines the components of the standard notation ($A$, $Z$, $X$) rather than outlining step-by-step instructions for performing a task."
  }
]
```

## Unassigned text for coverage review

```text
# Les isotopes


```

```text


---


```

```text


Tu veux qu'on fasse un exercice ensemble pour vérifier que c'est bien compris ?
```
