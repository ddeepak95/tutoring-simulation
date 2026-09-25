# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, structure, notation, properties, and applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes in terms of subatomic particles (protons and neutrons), illustrates them using carbon isotopes, explains their chemical and physical properties, addresses stability and radiocarbon dating, and clarifies the distinction with ions.",
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
| u1 | CONCEPT | Definition of isotopes and subatomic composition | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison and notation of carbon isotopes | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Isotope stability and radioactivity | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Application of carbon-14 dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | STUDY_SUPPORT | Recap of the isotope definition | {"subtype": "recap"} | accurate |
| u7 | CAVEAT | Distinction between isotopes and ions | {"subtype": "misconception"} | accurate |

## u1: Definition of isotopes and subatomic composition

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
    "reason": "Correctly defines an element by proton number and isotopes as variants with identical proton numbers but differing neutron numbers and masses.",
    "errors": []
  }
}
```

```text
Un **isotope** est une version d’un même élément chimique.

### 1. Même élément = même nombre de protons

Chaque élément est défini par son nombre de **protons** dans le noyau :

- Hydrogène : 1 proton  
- Carbone : 6 protons  
- Oxygène : 8 protons  

Deux atomes sont donc du **même élément** s’ils ont le même nombre de protons.

### 2. Les isotopes diffèrent par leurs neutrons

Dans le noyau, il y a aussi des **neutrons**.  
Des isotopes ont :

- le **même nombre de protons** ;
- mais un **nombre différent de neutrons**.

Ils ont donc une masse différente.
```


## u2: Comparison and notation of carbon isotopes

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
    "reason": "The table and worked calculation accurately relate atomic number, neutron count, mass number, and isotopic notation for carbon isotopes.",
    "errors": []
  }
}
```

```text
### Exemple : les isotopes du carbone

Tous les atomes de carbone possèdent **6 protons**.

| Isotope | Protons | Neutrons | Nombre de masse |
|---|---:|---:|---:|
| Carbone-12 | 6 | 6 | 12 |
| Carbone-13 | 6 | 7 | 13 |
| Carbone-14 | 6 | 8 | 14 |

Le nombre indiqué après le nom, par exemple dans **carbone-14**, est le **nombre de masse** :

\[
\text{nombre de masse} = \text{protons} + \text{neutrons}
\]

Ainsi, pour le carbone-14 :

\[
6 \text{ protons} + 8 \text{ neutrons} = 14
\]

On peut aussi l’écrire :

\[
{}^{14}_{6}\mathrm{C}
\]

- Le **6** en bas est le numéro atomique : nombre de protons.
- Le **14** en haut est le nombre total de nucléons (protons + neutrons).
```


## u3: Chemical and physical properties of isotopes

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
    "reason": "Accurately explains why chemical behavior is essentially the same (same electron configuration) while physical properties can differ (mass effects).",
    "errors": []
  }
}
```

```text
### 3. Ont-ils les mêmes propriétés chimiques ?

Presque oui. Comme les isotopes d’un élément ont le même nombre de protons, ils ont aussi généralement le même nombre d’électrons. Ils réagissent donc de façon très semblable chimiquement.

Par exemple, le carbone-12 et le carbone-14 peuvent tous deux former du dioxyde de carbone, \(CO_2\).

En revanche, ils peuvent avoir des propriétés physiques légèrement différentes, notamment leur masse.
```


## u4: Isotope stability and radioactivity

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
    "reason": "The definitions of stable and radioactive isotopes and the classification of carbon isotopes (C-12 and C-13 stable, C-14 radioactive) are correct.",
    "errors": []
  }
}
```

```text
### 4. Isotopes stables et radioactifs

Certains isotopes sont **stables** : leur noyau ne change pas spontanément.  
D’autres sont **radioactifs** : leur noyau est instable et se transforme en émettant des rayonnements.

Par exemple :

- carbone-12 : stable ;
- carbone-13 : stable ;
- carbone-14 : radioactif.
```


## u5: Application of carbon-14 dating

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
    "reason": "Accurately identifies radiocarbon dating of organic archaeological artifacts as a real-world application of carbon-14.",
    "errors": []
  }
}
```

```text
Le carbone-14 est utilisé pour dater des objets anciens, comme des os, du bois ou des tissus : c’est la **datation au carbone 14**.
```


## u6: Recap of the isotope definition

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
    "reason": "Accurately summarizes the fundamental definition of isotopes.",
    "errors": []
  }
}
```

```text
### À retenir

> Des isotopes sont des atomes d’un même élément : ils ont le même nombre de protons, mais pas le même nombre de neutrons.
```


## u7: Distinction between isotopes and ions

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
    "reason": "Accurately contrasts ions (variation in electrons) with isotopes (variation in neutrons).",
    "errors": []
  }
}
```

```text
Ne pas confondre avec un **ion** : un ion a gagné ou perdu des **électrons**, tandis qu’un isotope diffère par son nombre de **neutrons**.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Sections 1 and 2 could be viewed as two distinct concepts: defining an element by its proton count versus defining isotopes by neutron count.",
    "proposed_resolution": "Grouped together as u1 because Section 1 establishes the direct premise ('same element = same protons') that is immediately required to define what makes isotopes variants of the same element in Section 2."
  },
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "The mention of carbon-14 dating in u5 could be viewed as a supporting illustrative sentence of u4 rather than an independent real-world EXAMPLE unit.",
    "proposed_resolution": "Separated u5 as an EXAMPLE because it shifts the teaching job from defining nuclear stability/radioactivity to presenting a specific practical application (radiocarbon dating)."
  }
]
```

## Unassigned text for coverage review
