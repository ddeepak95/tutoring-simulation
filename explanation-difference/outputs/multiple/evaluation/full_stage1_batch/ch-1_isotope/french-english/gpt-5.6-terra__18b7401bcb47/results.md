# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, notation, properties, and an application of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes based on proton and neutron counts, illustrates them using carbon isotopes and standard nuclear notation, discusses their chemical and nuclear properties, and mentions radiocarbon dating.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes based on proton and neutron numbers | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Worked comparison of carbon isotopes, mass number calculation, and nuclear notation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical properties and radioactivity of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Radiocarbon dating application of carbon-14 | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition of isotopes based on proton and neutron numbers

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
    "reason": "The definition correctly explains that isotopes share the same number of protons (defining the element) but differ in neutron number and mass.",
    "errors": []
  }
}
```

```text
Un **isotope** est une version différente d’un même élément chimique.

Tous les atomes d’un même élément ont le même nombre de **protons** dans leur noyau. C’est ce nombre qui définit l’élément.

En revanche, les isotopes d’un même élément n’ont pas forcément le même nombre de **neutrons**.

- Même nombre de protons → même élément chimique.
- Nombre de neutrons différent → isotope différent.
- Donc leur masse peut être différente.
```


## u2: Worked comparison of carbon isotopes, mass number calculation, and nuclear notation

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
    "reason": "The subatomic particle numbers for carbon isotopes, the definition and calculation of the mass number for carbon-14, and the isotopic notation are all factually correct.",
    "errors": []
  }
}
```

```text
Le carbone possède toujours **6 protons**. Il existe notamment :

- **Carbone-12** : 6 protons et 6 neutrons  
- **Carbone-13** : 6 protons et 7 neutrons  
- **Carbone-14** : 6 protons et 8 neutrons  

Les trois sont des atomes de carbone, car ils ont tous 6 protons. Mais ils sont des isotopes car leur nombre de neutrons varie.

Le nombre après le nom, par exemple dans « carbone-14 », correspond au **nombre total de nucléons** :

\[
\text{nombre de masse} = \text{protons} + \text{neutrons}
\]

Ainsi, pour le carbone-14 :

\[
6\ \text{protons} + 8\ \text{neutrons} = 14
\]

On peut aussi l’écrire ainsi :

\[
{}^{14}_{6}\text{C}
\]

- 14 est le nombre total de nucléons ;
- 6 est le nombre de protons.
```


## u3: Chemical properties and radioactivity of isotopes

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
    "reason": "The explanation correctly links chemical behavior to proton and electron counts and introduces isotopic radioactivity as nuclear instability.",
    "errors": []
  }
}
```

```text
Les isotopes ont presque les mêmes propriétés chimiques, car ils possèdent le même nombre d’électrons et de protons. Cependant, certains isotopes sont **radioactifs**, c’est-à-dire que leur noyau est instable et se transforme avec le temps.
```


## u4: Radiocarbon dating application of carbon-14

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
    "reason": "Carbon-14 is accurately identified as a radioisotope used in dating ancient organic materials such as bones and wood.",
    "errors": []
  }
}
```

```text
Par exemple, le carbone-14 est radioactif et sert à dater des objets anciens, comme des ossements ou du bois.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text


### Exemple : le carbone


```

```text


### Propriétés


```
