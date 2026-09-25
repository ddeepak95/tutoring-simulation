# Stage 1: English / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "vapour phase refining of metals, including its principle, steps, and examples (Mond process and Van Arkel process)",
  "topic_match": "on_topic",
  "reason": "The explanation directly covers the definition, principle, general steps, and classic chemical examples of vapour phase refining (Mond process for nickel and Van Arkel process for titanium/zirconium).",
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
| u1 | CONCEPT | Definition, principle, and general stages of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Mond process for the purification of nickel | {"context": "real_world", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Van Arkel process for the purification of titanium | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | STUDY_SUPPORT | Summary recap of the vapour phase refining process flow | {"subtype": "recap"} | accurate |

## u1: Definition, principle, and general stages of vapour phase refining

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
    "reason": "The definitions, principle of reversible formation/decomposition at different temperatures, and procedural steps accurately describe the mechanism of vapour phase refining.",
    "errors": []
  }
}
```

```text
**Vapour phase refining** is a method used to purify metals by converting the impure metal into a **volatile compound** (a compound that easily changes into vapour). This vapour is then decomposed to obtain the **pure metal**.

### Principle
Some metals form gaseous compounds with certain chemicals at low temperatures. When these gaseous compounds are heated at a higher temperature, they break down and deposit the pure metal.

### Steps involved
1. **Formation of a volatile compound**  
   The impure metal reacts with a suitable gas or chemical to form a volatile compound.

2. **Separation from impurities**  
   The volatile compound turns into vapour and separates from the non-volatile impurities, which are left behind.

3. **Decomposition of vapour**  
   The vapour is heated or passed over a hot surface. It decomposes and deposits pure metal.
```


## u2: Mond process for the purification of nickel

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
    "reason": "The temperatures (330–350 K for formation of volatile nickel tetracarbonyl and 450–470 K for decomposition), balanced chemical reactions, and operational description of the Mond process are factually correct.",
    "errors": []
  }
}
```

```text
## Example 1: Mond Process for Nickel

Nickel is purified using **carbon monoxide**.

### Step 1: Formation of nickel carbonyl
Impure nickel reacts with carbon monoxide at about **330–350 K**:

\[
\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4
\]

Nickel tetracarbonyl, \(\text{Ni(CO)}_4\), is a volatile gas.

### Step 2: Decomposition
The gas is heated to about **450–470 K**:

\[
\text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO}
\]

Pure nickel is deposited, while carbon monoxide can be reused.
```


## u3: Van Arkel process for the purification of titanium

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
    "reason": "The reaction of titanium with iodine to form volatile titanium tetraiodide and its subsequent thermal decomposition on a hot tungsten filament are factually accurate.",
    "errors": []
  }
}
```

```text
## Example 2: Van Arkel Process for Titanium and Zirconium

Titanium or zirconium is purified by reacting it with **iodine**.

For titanium:

\[
\text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4
\]

Titanium tetraiodide (\(\text{TiI}_4\)) is volatile. Its vapour is passed over a hot tungsten filament, where it decomposes:

\[
\text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2
\]

Pure titanium is deposited on the filament.
```


## u4: Summary recap of the vapour phase refining process flow

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
    "reason": "The flow diagram and mentioned metals correctly summarize the essence and common applications of vapour phase refining.",
    "errors": []
  }
}
```

```text
### In short
Vapour phase refining works because:

> **Impure metal → volatile compound → vapour → heating → pure metal**

It is mainly used for metals that can form volatile compounds, such as **nickel, titanium, and zirconium**.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The 'Steps involved' section could potentially be classified as a distinct PROCEDURE unit rather than part of the initial CONCEPT unit.",
    "proposed_resolution": "Kept together within u1 as a CONCEPT because the steps describe the general conceptual mechanism of vapour phase refining directly continuing from the definition and principle, following the guideline to prefer keeping uncertain splits within one teaching episode together."
  },
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "Whether the treatment attribute for the chemical examples should be 'worked' or 'illustrative'.",
    "proposed_resolution": "Assigned 'worked' because both examples trace a multi-step qualitative reaction pathway with specific conditions and balanced chemical equations to achieve the purified metal product, rather than merely mentioning the reactions illustratively."
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
