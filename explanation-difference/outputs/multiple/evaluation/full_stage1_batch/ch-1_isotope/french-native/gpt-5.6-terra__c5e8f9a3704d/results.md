# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, nuclear structure, notation, properties, and applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly and thoroughly addresses isotopes, explaining their nuclear definition (same protons, different neutrons), illustrating them with carbon isotopes and notation, discussing chemical and physical properties, introducing radioactive isotopes with carbon-14 dating, and contrasting isotopes with ions.",
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
| u1 | CONCEPT | Definition of isotopes through nuclear composition | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Carbon isotopes comparison and mass number notation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Stable versus radioactive isotopes | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | STUDY_SUPPORT | Core takeaway summary of the isotope definition | {"subtype": "recap"} | accurate |
| u7 | CAVEAT | Distinction between isotopes and ions | {"subtype": "misconception"} | accurate |

## u1: Definition of isotopes through nuclear composition

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
    "reason": "The definition correctly states that an element is defined by its proton number and that isotopes have identical proton numbers but differing numbers of neutrons, resulting in different masses.",
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


## u2: Carbon isotopes comparison and mass number notation

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
    "reason": "The table values, mass number formula, worked calculation for carbon-14 (6 + 8 = 14), and standard isotope symbol notation are all factually and mathematically correct.",
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
    "reason": "Accurately explains that identical electron structures lead to nearly identical chemical behavior, while differences in nuclear mass cause slight variations in physical properties.",
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


## u4: Stable versus radioactive isotopes

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
    "reason": "The distinction between stable and radioactive isotopes is accurate, and the classification of carbon-12 and carbon-13 as stable and carbon-14 as radioactive is correct.",
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


## u5: Application of carbon-14 in radiocarbon dating

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
    "reason": "Carbon-14 is indeed used for radiocarbon dating of organic archaeological artifacts such as wood, bones, and textiles.",
    "errors": []
  }
}
```

```text
Le carbone-14 est utilisé pour dater des objets anciens, comme des os, du bois ou des tissus : c’est la **datation au carbone 14**.
```


## u6: Core takeaway summary of the isotope definition

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
    "reason": "The recap accurately synthesizes the essential defining property of isotopes.",
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
    "reason": "Correctly prevents the common confusion between ions (changes in electron count) and isotopes (changes in neutron count).",
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
    "issue": "Section 1 ('Même élément = même nombre de protons') could be treated as a separate prerequisite CONCEPT defining chemical elements before defining isotopes in Section 2.",
    "proposed_resolution": "Kept Section 1 and Section 2 together in u1 because Section 1 directly builds the conceptual premise needed to explain what an isotope is, matching the rule that definitions and their direct explanations form a single continuous CONCEPT."
  },
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "The radiocarbon dating sentence in u5 appears directly under heading 4 and could be considered supporting illustrative material inside u4 rather than an independent unit.",
    "proposed_resolution": "Separated u5 as an EXAMPLE unit because it introduces an independent real-world application (dating ancient artifacts) with distinct attributes (real_world, illustrative), whereas u4 defines the general phenomenon of nuclear stability and radioactivity."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "The mention of carbon-12 and carbon-14 forming CO2 could be split out as a brief illustrative EXAMPLE.",
    "proposed_resolution": "Kept within u3 as supporting evidence for the concept that isotopes share nearly identical chemical reactivity, following the preference to keep brief supporting illustrations within the concept they justify."
  }
]
```

## Unassigned text for coverage review
