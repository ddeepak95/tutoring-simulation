# Stage 1: French / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining of metals, including its operating principle, general stages, and specific industrial examples (the Mond and Van Arkel processes)",
  "topic_match": "on_topic",
  "reason": "The explanation directly covers vapour phase refining, explaining the principle of forming a volatile compound and decomposing it to recover pure metal, followed by standard textbook industrial examples (Mond process for Ni and Van Arkel process for Ti/Zr).",
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
| u1 | CONCEPT | Principle and definition of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | PROCEDURE | General multi-step procedure of vapour phase refining | {} | accurate |
| u3 | EXAMPLE | Purification of nickel via the Mond process | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Purification of titanium or zirconium via the Van Arkel process | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | STUDY_SUPPORT | Takeaway summary and applications of vapour phase refining | {"subtype": "recap"} | accurate |

## u1: Principle and definition of vapour phase refining

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
    "reason": "The definition accurately captures the core thermodynamic and chemical principle of vapour phase refining: selective conversion of an impure metal to a volatile intermediate followed by thermal decomposition into pure metal.",
    "errors": []
  }
}
```

```text
Le **raffinage en phase vapeur** est une méthode utilisée pour obtenir un métal **très pur**.

### Idée principale

On transforme d’abord le métal impur en un **composé gazeux** (ou qui peut facilement devenir vapeur). Ensuite, on décompose ce gaz pour récupérer le métal pur.

Cette méthode fonctionne parce que certains métaux forment des composés **volatils** : ils passent facilement à l’état gazeux, contrairement à la plupart des impuretés.
```


## u2: General multi-step procedure of vapour phase refining

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The general sequence of steps (reaction to form volatile compound, physical transfer away from non-volatile impurities, and decomposition to deposit pure metal) correctly reflects the standard technical method.",
    "errors": []
  }
}
```

```text
## Les étapes

1. **Métal impur**
   - On part d’un métal contenant des impuretés.

2. **Formation d’un gaz**
   - On fait réagir le métal avec une substance adaptée.
   - Le métal devient un composé gazeux, tandis que beaucoup d’impuretés restent solides.

3. **Séparation**
   - Le gaz est déplacé dans une autre zone de l’installation.
   - Les impuretés, qui ne sont pas devenues gazeuses, sont laissées derrière.

4. **Décomposition du gaz**
   - On chauffe ou on modifie les conditions.
   - Le composé gazeux se décompose et dépose du **métal pur**.
```


## u3: Purification of nickel via the Mond process

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
    "reason": "The reaction equations and chemical descriptions for the Mond process (formation of volatile nickel tetracarbonyl and its thermal decomposition to deposit pure nickel) are chemically and factually accurate, including the safety caveat regarding toxicity.",
    "errors": []
  }
}
```

```text
## Exemple : purification du nickel, procédé Mond

Le nickel impur réagit avec du monoxyde de carbone, CO, à une température modérée :

\[
\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4
\]

On obtient du **tétracarbonyle de nickel**, un gaz très volatil.

Ensuite, on chauffe ce gaz :

\[
\text{Ni(CO)}_4 \rightarrow \text{Ni pur} + 4\text{CO}
\]

Le nickel pur se dépose sous forme solide, tandis que le monoxyde de carbone peut être réutilisé.

⚠️ Ce procédé doit être réalisé dans des installations très contrôlées, car le monoxyde de carbone et certains composés formés sont très toxiques.
```


## u4: Purification of titanium or zirconium via the Van Arkel process

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
    "reason": "The description accurately outlines the Van Arkel–de Boer method involving reaction with iodine to form volatile iodides and decomposition on a heated filament.",
    "errors": []
  }
}
```

```text
## Autre exemple : purification du titane ou du zirconium

Dans le procédé de Van Arkel, le titane ou le zirconium forme un iodure volatil avec l’iode. Cet iodure est ensuite chauffé sur un filament très chaud : le métal pur se dépose sur le filament.
```


## u5: Takeaway summary and applications of vapour phase refining

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
    "reason": "The summary accurately distills the core mechanism and correctly notes the high-cost nature and high-purity applications of the resulting metals.",
    "errors": []
  }
}
```

```text
## À retenir

Le raffinage en phase vapeur repose sur cette idée :

> **On transforme sélectivement le métal en gaz, puis on le retransforme en métal pur.**

C’est une technique coûteuse, mais elle permet d’obtenir des métaux d’une très grande pureté, utiles par exemple en électronique, en aéronautique ou dans certaines recherches scientifiques.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Classification of 'Les étapes' as PROCEDURE versus CONCEPT.",
    "proposed_resolution": "Classified as PROCEDURE because it is explicitly structured as an operational step-by-step protocol (1 to 4) detailing how the refining task is carried out in practice, rather than an abstract theoretical explanation."
  }
]
```

## Unassigned text for coverage review

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
