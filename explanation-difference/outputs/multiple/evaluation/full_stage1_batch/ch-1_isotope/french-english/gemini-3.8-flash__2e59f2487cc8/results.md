# Stage 1: French / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, properties, examples, and practical applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes in terms of atomic structure (protons and neutrons), gives the classic comparison between carbon-12 and carbon-14, explains their physical and chemical properties, and lists common real-world applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Atomic structure and atomic number as chemical identity | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Identical twins with backpacks of different weights | {} | accurate |
| u3 | CONCEPT | Definition of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Comparison between Carbon-12 and Carbon-14 | {"context": "real_world", "treatment": "worked"} | accurate |
| u5 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Application of Carbon-14 in archaeology | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of radioactive isotopes in medicine | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of Uranium-235 in nuclear power | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | STUDY_SUPPORT | Recap summary of isotopes | {"subtype": "recap"} | accurate |

## u1: Atomic structure and atomic number as chemical identity

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
    "reason": "Correctly describes the constituent subatomic particles of an atom and identifies the atomic number Z (number of protons) as defining the chemical element.",
    "errors": []
  }
}
```

```text
Dans un atome, tu as un noyau au centre avec :
*   Des **protons** (chargés positivement).
*   Des **neutrons** (neutres, pas de charge).
Et autour, des **électrons** qui tournent.

Ce qui définit un élément chimique (le carbone, l'or, l'oxygène...), c'est **UNIQUEMENT son nombre de protons** (noté **$Z$**, le numéro atomique). 
* C'est sa carte d'identité : si un atome a 6 protons, c'est **toujours** du carbone. S'il en a 7, c'est de l'azote. Tu ne peux pas changer le nombre de protons sans changer d'élément.
```


## u2: Identical twins with backpacks of different weights

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine des jumeaux identiques. Ils ont exactement le même visage, le même ADN, le même nom de famille. Mais l'un d'eux a un sac à dos un peu plus lourd que l'autre."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy clearly maps identical twins (same identity/element) carrying different backpack weights (different number of neutrons/mass) without misleading distortions.",
    "errors": []
  }
}
```

```text
Imagine des jumeaux identiques. Ils ont exactement le même visage, le même ADN, le même nom de famille. Mais l'un d'eux a un sac à dos un peu plus lourd que l'autre.
```


## u3: Definition of isotopes

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
    "reason": "Standard and precise definition of isotopes sharing atomic number Z but differing in mass number A due to differing neutron counts.",
    "errors": []
  }
}
```

```text
**Les isotopes, ce sont des atomes "jumeaux" :**
* Ils ont le **même nombre de protons** (donc c'est le même élément chimique).
* Mais ils ont un **nombre de neutrons différent**.

Comme les neutrons pèsent lourd, l'un des atomes sera simplement plus lourd que l'autre !

> **La définition officielle à retenir pour tes contrôles :** 
> Des isotopes sont des atomes qui ont le **même numéro atomique $Z$** (même nombre de protons), mais un **nombre de masse $A$ différent** (nombre de neutrons différent).
```


## u4: Comparison between Carbon-12 and Carbon-14

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly details the subatomic composition and mass numbers of Carbon-12 and Carbon-14, along with accurate natural abundance context.",
    "errors": []
  }
}
```

```text
Dans la nature, le carbone existe sous plusieurs formes (isotopes). Les deux plus connus sont :

1.  **Le Carbone 12 ($^{12}\text{C}$) :** C'est le plus courant (99 % du carbone sur Terre).
    *   6 protons
    *   **6 neutrons**
    *   Masse totale ($A$) = 6 + 6 = **12**

2.  **Le Carbone 14 ($^{14}\text{C}$) :** Tu en as sûrement entendu parler pour dater les fossiles !
    *   Toujours 6 protons (sinon ce ne serait plus du carbone !)
    *   **8 neutrons** (il a deux neutrons de plus dans son "sac à dos")
    *   Masse totale ($A$) = 6 + 8 = **14**
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
    "reason": "Accurately contrasts identical chemical properties due to electron configuration with distinct physical properties arising from mass and nuclear stability.",
    "errors": []
  }
}
```

```text
*   **Chimiquement : OUI.** Comme ils ont le même nombre d'électrons et de protons, ils font exactement les mêmes réactions chimiques. Le Carbone 14 peut faire du CO₂ tout comme le Carbone 12.
*   **Physiquement : NON.** 
    *   Leur masse est légèrement différente.
    *   Certains ont un noyau trop "chargé" en neutrons et deviennent instables : on dit qu'ils sont **radioactifs** (c'est le cas du Carbone 14 ou de l'Uranium 235). Avec le temps, ils finissent par se désintégrer.
```


## u6: Application of Carbon-14 in archaeology

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
    "reason": "Radiocarbon dating is accurately cited as a method for dating organic materials in archaeology.",
    "errors": []
  }
}
```

```text
*   **En archéologie :** Dater des momies ou des peintures préhistoriques (grâce au Carbone 14).
```


## u7: Application of radioactive isotopes in medicine

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
    "reason": "Radioisotopes are standardly used for medical imaging (scintigraphy/PET) and radiotherapy.",
    "errors": []
  }
}
```

```text
*   **En médecine :** Certains isotopes radioactifs sont injectés à toute petite dose pour faire des scanners ou détruire des tumeurs (radiothérapie).
```


## u8: Application of Uranium-235 in nuclear power

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
    "reason": "Uranium-235 is the fissile isotope commonly used as fuel in nuclear power plants.",
    "errors": []
  }
}
```

```text
*   **En énergie :** L'Uranium 235 est l'isotope utilisé comme combustible dans les centrales nucléaires.
```


## u9: Recap summary of isotopes

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
    "reason": "Succinctly reviews the key contrasting properties of isotopes.",
    "errors": []
  }
}
```

```text
**En résumé :** 
Même élément, mêmes protons, même comportement chimique... mais pas le même nombre de neutrons, donc pas le même poids !
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8"
    ],
    "issue": "Whether the three bulleted applications under section 5 should be treated as a single list of examples or separate EXAMPLE units.",
    "proposed_resolution": "Separated into three individual EXAMPLE units in accordance with the guideline that independent real-world applications in a list represent distinct examples."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Installe-toi, tu vas voir que la notion d'**isotope**, c’est en fait très visuel et beaucoup plus simple qu'il n'y paraît. 

Pour bien comprendre, faisons un tout petit rappel sur l'atome, et ensuite, je te donne une métaphore.

---

### 1. Le petit rappel : La "carte d'identité" de l'atome


```

```text


### 2. Alors, c'est quoi un isotope ? (La métaphore des jumeaux)


```

```text


---

### 3. L'exemple classique : Le Carbone


```

```text


---

### 4. Est-ce qu'ils se comportent de la même façon ?


```

```text


### 5. À quoi ça sert dans la vraie vie ?


```

```text


Est-ce que c'est plus clair pour toi, ou tu veux qu'on fasse un petit exercice pour t'entraîner ?
```
