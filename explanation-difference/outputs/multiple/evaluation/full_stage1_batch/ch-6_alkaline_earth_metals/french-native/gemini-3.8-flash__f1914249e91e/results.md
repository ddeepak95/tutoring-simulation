# Stage 1: French / alkaline earth metals

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "alkaline earth metals",
  "observed_topic": "Alkaline earth metals (Group 2 elements): periodic table position, electron configuration, physical and chemical properties, everyday applications, and exam review",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses alkaline earth metals (Group 2 of the periodic table), explaining their location, valence electron configuration, cation formation, physical and chemical properties, real-world examples, and a summary review.",
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
| u1 | CONCEPT | Periodic table position, elements, and etymology of alkaline earth metals | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Valence electrons, octet rule, and cation formation in alkaline earth metals | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Physical and chemical properties of alkaline earth metals | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Everyday occurrences and applications of calcium | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Everyday biological and structural applications of magnesium | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | STUDY_SUPPORT | Exam review summary of key alkaline earth metal concepts | {"subtype": "recap"} | accurate |

## u1: Periodic table position, elements, and etymology of alkaline earth metals

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
    "reason": "The text correctly identifies Group 2 elements, their position adjacent to alkali metals, the six constituent elements, and the historical etymology of alkaline earths.",
    "errors": []
  }
}
```

```text
Prends ton tableau périodique (la classification périodique). Regarde tout à gauche :
* La toute première colonne (colonne 1), ce sont les *métaux alcalins* (comme le sodium).
* Juste à côté, **la colonne 2**, voilà notre famille ! Ce sont les **métaux alcalino-terreux**.

Cette famille est composée de six éléments :
1. Le **Béryllium** ($Be$)
2. Le **Magnésium** ($Mg$)
3. Le **Calcium** ($Ca$)
4. Le **Strontium** ($Sr$)
5. Le **Baryum** ($Ba$)
6. Le **Radium** ($Ra$) *(qui est radioactif, découvert par Marie Curie !)*

*(D'où vient ce nom bizarre ? « Alcalin » signifie qu'ils forment des solutions basiques (le contraire d'acide), et « terreux » était le vieux mot utilisé par les alchimistes pour désigner des substances qui résistaient à la chaleur et ne brûlaient plus, comme la chaux).*
```


## u2: Valence electrons, octet rule, and cation formation in alkaline earth metals

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
    "reason": "The relationship between two valence electrons, loss of electrons to achieve octet stability, and formation of divalent cations (Ca2+, Mg2+) is chemically accurate.",
    "errors": []
  }
}
```

```text
En chimie de lycée, la règle d'or, c'est **la règle de l'octet (ou du duet)** : tous les atomes rêvent d'avoir leur dernière couche électronique pleine (généralement 8 électrons) pour être stables, comme les gaz nobles.

Puisqu'ils sont dans la **colonne 2**, tous les métaux alcalino-terreux possèdent **exactement 2 électrons sur leur couche externe** (électrons de valence).

Pour être stables, que vont-ils faire ? 
* Essayer de trouver 6 électrons (très difficile) ? 
* Ou se débarrasser de leurs 2 électrons en trop (très facile) ?

Tu as deviné : **ils perdent ces 2 électrons**. 
En perdant deux charges négatives, ils deviennent des **ions positifs (des cations) avec deux charges « + »**.
Tu les as d'ailleurs déjà croisés en cours de chimie :
* Le calcium devient l'ion calcium : $\text{Ca}^{2+}$
* Le magnésium devient l'ion magnésium : $\text{Mg}^{2+}$
```


## u3: Physical and chemical properties of alkaline earth metals

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
        "quote": "feux d'artifice"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The physical properties (silvery luster, conductivity, intermediate hardness), high reactivity, absence of uncombined native forms, and flame emission colors (Sr red, Ba green, Mg brilliant white) are factually correct.",
    "errors": []
  }
}
```

```text
À quoi ressemblent-ils et comment réagissent-ils ?

* **Ce sont de vrais métaux :** Ils sont gris argenté, brillants, et conduisent très bien l'électricité et la chaleur. Ils sont plus durs que leurs voisins de la colonne 1, mais restent relativement mous comparés au fer.
* **Ils sont très réactifs :** Comme ils veulent absolument donner leurs 2 électrons, ils réagissent facilement avec d'autres éléments, notamment l'oxygène de l'air et l'eau. Dans la nature, tu ne trouveras jamais un morceau de calcium pur par terre : il s'est déjà combiné avec autre chose depuis longtemps !
* **Ils font de jolies flammes :** Quand on les brûle, ils émettent des couleurs intenses. C'est pour ça qu'on les adore dans les **feux d'artifice** !
  * Le Strontium donne une flamme **rouge vif**.
  * Le Baryum donne une flamme **verte**.
  * Le Magnésium produit une lumière blanche aveuglante (utilisée autrefois pour les flashs des appareils photo).
```


## u4: Everyday occurrences and applications of calcium

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
        "quote": "C'est le composant majeur de tes os et de tes dents ! C'est aussi lui qui forme la craie, le calcaire et le ciment de nos bâtiments."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Calcium compounds (hydroxyapatite, calcium carbonate, calcium silicates) are the primary mineral constituents in bones, teeth, chalk, limestone, and construction cement.",
    "errors": []
  }
}
```

```text
* **Le Calcium ($Ca$) :** C'est le composant majeur de tes os et de tes dents ! C'est aussi lui qui forme la craie, le calcaire et le ciment de nos bâtiments.
```


## u5: Everyday biological and structural applications of magnesium

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
        "quote": "fabriquer des vélos de course ou des ordinateurs portables"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Magnesium is the central coordination ion in chlorophyll and is commonly alloyed with aluminum to produce lightweight, rigid structural frames and electronics casings.",
    "errors": []
  }
}
```

```text
* **Le Magnésium ($Mg$) :** Au cœur de la molécule de chlorophylle, c'est lui qui permet aux plantes de faire la photosynthèse. On l'utilise aussi en alliage avec l'aluminium pour fabriquer des vélos de course ou des ordinateurs portables, car il est très léger et résistant.
```


## u6: Exam review summary of key alkaline earth metal concepts

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
    "reason": "The four summarized points accurately capture the essential core curriculum knowledge regarding Group 2 metals.",
    "errors": []
  }
}
```

```text
Si tu as une question sur eux en devoir, retiens ces 4 points :
1. **Colonne 2** du tableau périodique.
2. Ils ont **2 électrons de valence**.
3. Ils forment facilement des ions **$X^{2+}$** (ex : $\text{Ca}^{2+}$, $\text{Mg}^{2+}$).
4. Ce sont des métaux **réactifs** qui ne se trouvent pas à l'état pur dans la nature.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Section 3 combines general physical and chemical properties with flame emission colors and pyrotechnic applications (fireworks, camera flash). This could be split into a CONCEPT unit for general properties and an EXAMPLE unit for flame tests/fireworks.",
    "proposed_resolution": "Kept intact as a single CONCEPT unit because all three bullet points jointly answer the section heading 'À quoi ressemblent-ils et comment réagissent-ils ?' within one unified teaching episode."
  },
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "Section 4 presents applications of calcium and magnesium in a single bulleted section. They could be interpreted as a single comparative EXAMPLE of Group 2 applications.",
    "proposed_resolution": "Separated into two distinct EXAMPLE units (u4 and u5) following the guideline that a list naming independent applications constitutes separate example units."
  }
]
```

## Unassigned text for coverage review

```text
Bonjour ! Installe-toi. Aujourd'hui, on va s'intéresser à une « famille » très importante du tableau périodique : **les métaux alcalino-terreux**. 

Tu vas voir, la chimie devient beaucoup plus simple quand on comprend la logique derrière le comportement de ces éléments.

---

### 1. Où se cachent-ils dans le tableau périodique ?


```

```text


---

### 2. Leur grand secret : les 2 électrons de trop !


```

```text


---

### 3. Leurs propriétés physiques et chimiques


```

```text


---

### 4. Dans la vraie vie, ils servent à quoi ?

Tu vis avec eux tous les jours :

```

```text


---

###  La fiche récap' pour ton prochain contrôle :


```

```text


Est-ce que cette explication te paraît claire, ou souhaites-tu qu'on regarde de plus près une équation de réaction avec l'un d'eux ?
```
