# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, subatomic composition, carbon isotopes example, physical and chemical properties, and real-world applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The response directly teaches the concept of isotopes, defining them using subatomic particle counts, illustrating them with carbon isotopes, explaining their properties, and presenting applications.",
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
| u1 | CONCEPT | Atomic structure and definition of an isotope | {"depth": "statement"} | accurate |
| u2 | EXAMPLE | Carbon isotopes comparison and mass number notation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Medical applications of radioisotopes | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Archaeological application of carbon-14 dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Application of uranium-235 in nuclear energy | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | STUDY_SUPPORT | Summary recap of the definition of an isotope | {"subtype": "recap"} | accurate |

## u1: Atomic structure and definition of an isotope

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
    "reason": "The definition of an isotope and the description of basic subatomic particles (protons, neutrons, electrons) are factually accurate.",
    "errors": []
  }
}
```

```text
Imagine un atome comme une petite planète avec un noyau au centre. Dans ce noyau, il y a toujours deux types de particules : les **protons** (qui ont une charge positive) et les **neutrons** (qui n’ont pas de charge). Autour du noyau tournent les **électrons** (charge négative).

Un **isotope** est une version d’un élément chimique qui a le **même nombre de protons**, mais un **nombre différent de neutrons**.
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
    "reason": "The proton counts, neutron counts, mass numbers, and isotopic notation for carbon-12, carbon-13, and carbon-14 are correct.",
    "errors": []
  }
}
```

```text
### Exemple concret : le carbone
- Tous les atomes de carbone ont **6 protons** (c’est ce qui définit l’élément carbone).
- Il existe plusieurs isotopes du carbone :
  - Le carbone-12 : 6 protons + 6 neutrons → masse = 12
  - Le carbone-13 : 6 protons + 7 neutrons → masse = 13
  - Le carbone-14 : 6 protons + 8 neutrons → masse = 14

On les écrit comme ceci :  
**¹²C**, **¹³C**, **¹⁴C**  
(le petit nombre en haut à gauche est le **nombre de masse** = protons + neutrons).
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
    "reason": "The explanation correctly links chemical properties to electron configuration and physical differences to mass and nuclear stability, accurately noting that carbon-14 undergoes radioactive decay into nitrogen.",
    "errors": []
  }
}
```

```text
### Points importants à retenir
- Les isotopes d’un même élément ont **les mêmes propriétés chimiques** (ils réagissent de la même façon avec les autres atomes), car les réactions chimiques dépendent surtout des électrons et du nombre de protons.
- En revanche, ils peuvent avoir des **propriétés physiques différentes**, notamment leur masse et leur stabilité. Par exemple, le carbone-14 est **radioactif** (il se transforme lentement en azote), alors que le carbone-12 est stable.
- On trouve souvent des isotopes stables et d’autres radioactifs (isotopes radioactifs ou radioisotopes).
```


## u4: Medical applications of radioisotopes

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
    "reason": "Radioisotopes are widely used in nuclear medicine for cancer therapy (radiotherapy) and diagnostic imaging (PET, SPECT).",
    "errors": []
  }
}
```

```text
- En médecine : certains isotopes radioactifs servent à soigner le cancer ou à faire des examens (scanners).
```


## u5: Archaeological application of carbon-14 dating

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
    "reason": "Radiocarbon dating is an established method in archaeology to estimate the age of carbon-bearing organic materials.",
    "errors": []
  }
}
```

```text
- En archéologie : la datation au carbone-14 permet de savoir l’âge des objets anciens.
```


## u6: Application of uranium-235 in nuclear energy

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
    "reason": "Uranium-235 is the standard fissile isotope used as fuel in commercial nuclear power reactors.",
    "errors": []
  }
}
```

```text
- En énergie : l’uranium-235 est un isotope utilisé dans les centrales nucléaires.
```


## u7: Summary recap of the definition of an isotope

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
    "reason": "The recap accurately synthesizes the core definition of an isotope.",
    "errors": []
  }
}
```

```text
En résumé :  
**Un isotope = même élément, même nombre de protons, nombre de neutrons différent.**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The first paragraph in u1 introduces the subatomic composition of an atom (protons, neutrons, electrons) before paragraph 2 defines an isotope. This introductory text could be split into a separate CONCEPT unit on atomic structure or considered an ANALOGY due to the planet metaphor.",
    "proposed_resolution": "Kept together with the isotope definition in u1 because its primary teaching function in context is to supply the requisite particle definitions directly needed to define isotopes. The planetary reference is a brief passing metaphor rather than a developed mapping."
  },
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Treatment attribute for u2: the example displays the addition of protons and neutrons to compute mass numbers ('6 protons + 6 neutrons → masse = 12'), which can be classified as worked arithmetic reasoning or as an illustrative comparison of carbon isotopes.",
    "proposed_resolution": "Assigned 'worked' because the excerpt explicitly provides the operations that lead to the mass number for each isotope, rather than only presenting isolated isotopic data."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Je vais t’expliquer ce qu’est un isotope de façon simple et claire, comme si nous étions en cours de chimie au lycée.


```

```text


### Pourquoi c’est utile ?

```

```text


Tu as compris ? Si tu veux, je peux te donner d’autres exemples (hydrogène, uranium, etc.) ou t’expliquer la radioactivité plus en détail !
```
