# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the core principles, steps, standard industrial examples (Mond process and Van Arkel process), and criteria of vapour phase refining.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 18,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2
  },
  "nested_passages": 18,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the fundamental physical and chemical idea underlying the technique.

Accuracy: **accurate**. The definition and broad principle of converting impure metal to volatile compound and decomposing it back to pure metal are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Vapour phase refining is a method used to purify certain metals that can easily form volatile (easily vaporized) compounds. The idea is simple: turn the impure metal into a gas or vapour, separate it from the solid impurities that stay behind, and then break the vapour back down into pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: General step-by-step procedure of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the three-step sequence of forming the volatile compound, separating it in the gas phase, and decomposing it to recover the pure metal.

Accuracy: **accurate**. The procedural sequence accurately reflects standard vapour phase refining protocol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | Here&#x27;s how it works in clear steps: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | 1. **Form the volatile compound**   | PROCEDURE | {} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p4 |    The impure metal is heated with a suitable gas or element (like carbon monoxide or iodine). Only the desired metal reacts to form a compound that turns into vapour at a relatively low temperature. Most impurities do not form such vapours and remain as solid residue. | PROCEDURE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |
| p5 | 2. **Vaporisation and separation**   | PROCEDURE | {} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p6 |    The volatile compound is heated gently so it becomes a gas. This gas is moved away (often through a pipe or chamber), leaving the non-volatile impurities behind. Because the compound is now in vapour form, it can be purified very effectively. | PROCEDURE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |
| p7 | 3. **Decomposition to recover pure metal**   | PROCEDURE | {} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p8 |    The purified vapour is then heated to a higher temperature or passed over a hot surface (like a heated filament). This causes the compound to break down, depositing the pure metal as a solid while releasing the original gas or element, which can often be reused. | PROCEDURE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |

## u3: Mond process for nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining through the industrial application of Mond's process for purifying nickel, including reaction equations and operating temperatures.

Accuracy: **accurate**. The reaction equations, reagent (CO), formation temperature (~50 °C), and decomposition temperature (~200 °C) accurately depict the Mond process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | Two common examples taught in high school are: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **Mond’s process for nickel**   | EXAMPLE | {} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p11 |   Impure nickel is heated with carbon monoxide gas at about 50 °C to form nickel carbonyl vapour:   | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |
| p12 |   Ni (impure) + 4CO → Ni(CO)₄ (vapour)   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p13 |   The vapour is then heated to about 200 °C, where it decomposes:   | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |
| p14 |   Ni(CO)₄ → Ni (pure) + 4CO   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p15 |   The pure nickel deposits as a solid, and carbon monoxide is recycled. | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |

## u4: Van Arkel process for titanium or zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel-de Boer method for purifying titanium and zirconium using iodine over a hot filament.

Accuracy: **accurate**. The description of converting titanium/zirconium to volatile iodide and decomposing it on an electrically heated tungsten filament (~1400–1800 °C) is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | - **Van Arkel process for titanium or zirconium**   | EXAMPLE | {} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p17 |   The impure metal is heated with iodine to form a volatile iodide vapour. This vapour is passed over a hot tungsten filament (around 1400–1800 °C). The iodide breaks down, leaving a rod of very pure metal on the filament while iodine vapour is released and can be reused. | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;list&#x27;] |

## u5: Requirements and features of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the thermodynamic prerequisites (compound must be stable enough to vaporise but easily decomposed) and notes purity outcomes and typical metals.

Accuracy: **accurate**. The stated requirements (volatile compound formation and high-temperature decomposability) and high purity levels achieved are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | This method is especially useful when the metal forms a compound that is stable enough to vaporise but can be easily decomposed at higher temperatures. It gives metals of very high purity (often 99.9 % or more) and is used mainly for nickel, titanium, zirconium, and a few other reactive metals. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

