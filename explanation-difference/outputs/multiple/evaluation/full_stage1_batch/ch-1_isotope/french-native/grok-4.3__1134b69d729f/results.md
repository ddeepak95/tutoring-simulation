# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, examples (carbon and hydrogen), isotopic notation, and key properties of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses the concept of isotopes, explaining their nuclear composition (same number of protons, different number of neutrons), providing standard examples (carbon and hydrogen), explaining isotopic notation, and summarizing their main properties.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and etymology of isotopes | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Isotopes of carbon and their applications | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u3 | EXAMPLE | Isotopes of hydrogen and their uses | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u4 | CONCEPT | Isotope notation convention | {"depth": "explanation"} | accurate |
| u5 | STUDY_SUPPORT | Summary recap of isotope properties | {"subtype": "recap"} | accurate |

## u1: Definition and etymology of isotopes

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
    "reason": "The nuclear definition of isotopes (identical proton number defining the element, differing neutron counts) and the etymology related to the periodic table are scientifically accurate.",
    "errors": []
  }
}
```

```text
Un isotope, c’est une version un peu différente d’un même élément chimique.

### Explication simple

Tous les atomes d’un même élément ont **le même nombre de protons**. C’est ce nombre de protons qui définit l’élément. Par exemple :
- Tous les atomes de carbone ont 6 protons.
- Tous les atomes d’oxygène ont 8 protons.

Mais les atomes peuvent avoir un nombre **différent de neutrons**. C’est ça qui fait qu’on parle d’**isotopes**.

On les appelle « isotopes » parce qu’ils occupent **la même place** dans le tableau périodique (le mot « isotope » vient du grec et signifie « même place »).
```


## u2: Isotopes of carbon and their applications

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "C’est grâce à lui qu’on peut dater les objets anciens (datation au carbone 14)."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The proton and neutron numbers, relative abundance of carbon-12, and the radioactive nature and archaeological dating use of carbon-14 are correct. Describing the mass number column as 'Masse totale' is an acceptable introductory simplification.",
    "errors": []
  }
}
```

```text
### Exemple concret : le carbone

Le carbone a toujours 6 protons, mais il existe plusieurs isotopes :

| Isotope       | Protons | Neutrons | Masse totale | Stable ou radioactif ? |
|---------------|---------|----------|--------------|------------------------|
| Carbone-12    | 6       | 6        | 12           | Stable                 |
| Carbone-13    | 6       | 7        | 13           | Stable                 |
| Carbone-14    | 6       | 8        | 14           | Radioactif             |

- Le **carbone-12** est de loin le plus abondant (environ 99 % du carbone naturel).
- Le **carbone-14** est radioactif : il se désintègre lentement avec le temps. C’est grâce à lui qu’on peut dater les objets anciens (datation au carbone 14).
```


## u3: Isotopes of hydrogen and their uses

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
    "reason": "The proton and neutron counts for protium, deuterium, and tritium, as well as their stated applications (nuclear reactors, lighting, research), are correct.",
    "errors": []
  }
}
```

```text
### Autre exemple très simple : l’hydrogène

L’hydrogène a 3 isotopes :
- **Hydrogène** (ou protium) : 1 proton + 0 neutron
- **Deutérium** : 1 proton + 1 neutron (utilisé dans certaines centrales nucléaires)
- **Tritium** : 1 proton + 2 neutrons (radioactif, utilisé dans certains éclairages ou en recherche)
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
    "reason": "The standard notation convention placing the mass number (A = Z + N) as a superscript to the left of the chemical symbol is accurately explained and illustrated.",
    "errors": []
  }
}
```

```text
### Comment on les écrit ?

On écrit le nombre de masse (protons + neutrons) en haut à gauche du symbole :
- ¹²C = carbone-12
- ¹⁴C = carbone-14
- ²H = deutérium
```


## u5: Summary recap of isotope properties

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
    "reason": "All bullet points summarize correct fundamental properties of isotopes, including identical chemical properties due to having the same electron configuration and differing masses.",
    "errors": []
  }
}
```

```text
### En résumé (à retenir)

- **Même nombre de protons** → même élément
- **Nombre de neutrons différent** → isotopes différents
- Les isotopes ont **les mêmes propriétés chimiques**, mais des **masses différentes**
- Certains sont stables, d’autres sont radioactifs
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Classification of isotope notation rules: whether 'Comment on les écrit ?' should be classified as CONCEPT (depth: explanation) or PROCEDURE.",
    "proposed_resolution": "Classified as CONCEPT because it explains the symbolic representation rule/convention for atomic nuclei rather than an algorithmic, step-by-step task sequence."
  }
]
```

## Unassigned text for coverage review

```text


Tu veux que je te donne des exemples avec un autre élément (uranium, oxygène…) ou que je t’explique pourquoi certains isotopes sont radioactifs ?
```
