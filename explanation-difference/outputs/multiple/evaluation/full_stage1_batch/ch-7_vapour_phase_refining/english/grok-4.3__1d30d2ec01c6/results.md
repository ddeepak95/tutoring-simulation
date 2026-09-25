# Stage 1: English / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Principles, operational stages, criteria, and examples (Mond and Van Arkel processes) of vapour phase refining",
  "topic_match": "on_topic",
  "reason": "The text explains vapour phase refining accurately and thoroughly, covering its general principle, operational steps, industrial examples (Mond process for nickel and Van Arkel process for titanium/zirconium), and necessary criteria.",
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
| u1 | CONCEPT | Definition and general mechanism of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Mond process for nickel refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Van Arkel process for titanium or zirconium refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Key requirements, purity outcome, and applicability of vapour phase refining | {"depth": "explanation"} | accurate |

## u1: Definition and general mechanism of vapour phase refining

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
    "reason": "The definition and three-step operating principle (formation of volatile compound, separation from non-volatile impurities, and thermal decomposition to recover pure metal) are chemically sound and accurate.",
    "errors": []
  }
}
```

```text
Vapour phase refining is a method used to purify certain metals that can easily form volatile (easily vaporized) compounds. The idea is simple: turn the impure metal into a gas or vapour, separate it from the solid impurities that stay behind, and then break the vapour back down into pure metal.

Here's how it works in clear steps:

1. **Form the volatile compound**  
   The impure metal is heated with a suitable gas or element (like carbon monoxide or iodine). Only the desired metal reacts to form a compound that turns into vapour at a relatively low temperature. Most impurities do not form such vapours and remain as solid residue.

2. **Vaporisation and separation**  
   The volatile compound is heated gently so it becomes a gas. This gas is moved away (often through a pipe or chamber), leaving the non-volatile impurities behind. Because the compound is now in vapour form, it can be purified very effectively.

3. **Decomposition to recover pure metal**  
   The purified vapour is then heated to a higher temperature or passed over a hot surface (like a heated filament). This causes the compound to break down, depositing the pure metal as a solid while releasing the original gas or element, which can often be reused.
```


## u2: Mond process for nickel refining

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
    "reason": "The temperatures (~50 °C for carbonyl formation, ~200 °C for thermal decomposition) and the balanced chemical equations accurately describe the Mond process.",
    "errors": []
  }
}
```

```text
- **Mond’s process for nickel**  
  Impure nickel is heated with carbon monoxide gas at about 50 °C to form nickel carbonyl vapour:  
  Ni (impure) + 4CO → Ni(CO)₄ (vapour)  
  The vapour is then heated to about 200 °C, where it decomposes:  
  Ni(CO)₄ → Ni (pure) + 4CO  
  The pure nickel deposits as a solid, and carbon monoxide is recycled.
```


## u3: Van Arkel process for titanium or zirconium refining

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
    "reason": "The operational description of the Van Arkel process, including reaction with iodine to form volatile iodide and thermal decomposition on an electrically heated tungsten filament at 1400–1800 °C, is factually accurate.",
    "errors": []
  }
}
```

```text
- **Van Arkel process for titanium or zirconium**  
  The impure metal is heated with iodine to form a volatile iodide vapour. This vapour is passed over a hot tungsten filament (around 1400–1800 °C). The iodide breaks down, leaving a rod of very pure metal on the filament while iodine vapour is released and can be reused.
```


## u4: Key requirements, purity outcome, and applicability of vapour phase refining

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
    "reason": "The stated criteria (compound must be volatile yet easily decomposed at higher temperatures) and the high purity outcome are standard and correct.",
    "errors": []
  }
}
```

```text
This method is especially useful when the metal forms a compound that is stable enough to vaporise but can be easily decomposed at higher temperatures. It gives metals of very high purity (often 99.9 % or more) and is used mainly for nickel, titanium, zirconium, and a few other reactive metals.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u4"
    ],
    "issue": "Whether the concluding paragraph (u4) should be separated as its own CONCEPT unit teaching the specific criteria and purity outcomes of vapour phase refining, or grouped into u1 as a discontinuous second excerpt continuing the general concept of the method.",
    "proposed_resolution": "Separated as u4 because it shifts focus to the thermodynamic requirements/conditions and purity yields of the technique after the worked examples are completed."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Whether the treatment attribute of u3 should be 'worked' or 'illustrative'. Unlike u2, u3 does not provide explicit chemical equations, but it follows the sequential operations, reaction conditions (iodine, 1400–1800 °C tungsten filament), and outcomes qualitatively.",
    "proposed_resolution": "Assigned 'worked' because the narrative traces through specific procedural operations to a concrete qualitative result (pure metal deposited on a filament and iodine recycled)."
  }
]
```

## Unassigned text for coverage review

```text


Two common examples taught in high school are:


```
