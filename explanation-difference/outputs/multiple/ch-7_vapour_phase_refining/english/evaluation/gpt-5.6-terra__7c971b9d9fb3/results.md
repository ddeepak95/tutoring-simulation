# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains vapour phase refining directly, detailing its core principles, general procedural steps, and standard industrial examples (the Mond process and the Van Arkel process).

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 42,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 42,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition, principle, and steps of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what vapour phase refining is, the underlying scientific principle, and the sequence of steps that achieve purification.

Accuracy: **accurate**. The definition, temperature-dependent principle, and three steps accurately describe vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Vapour phase refining** is a method used to purify metals by converting the impure metal into a **volatile compound** (a compound that easily changes into vapour). This vapour is then decomposed to obtain the **pure metal**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Principle | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Some metals form gaseous compounds with certain chemicals at low temperatures. When these gaseous compounds are heated at a higher temperature, they break down and deposit the pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### Steps involved | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. **Formation of a volatile compound**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 |    The impure metal reacts with a suitable gas or chemical to form a volatile compound. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **Separation from impurities**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |    The volatile compound turns into vapour and separates from the non-volatile impurities, which are left behind. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 3. **Decomposition of vapour**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 |    The vapour is heated or passed over a hot surface. It decomposes and deposits pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Mond process as a concrete real-world chemical application of vapour phase refining to nickel.

Accuracy: **accurate**. The reaction equations, temperature ranges (330–350 K and 450–470 K), and chemical behavior of nickel tetracarbonyl are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## Example 1: Mond Process for Nickel | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Nickel is purified using **carbon monoxide**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | ### Step 1: Formation of nickel carbonyl | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | Impure nickel reacts with carbon monoxide at about **330–350 K**: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | Nickel tetracarbonyl, \(\text{Ni(CO)}_4\), is a volatile gas. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | ### Step 2: Decomposition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | The gas is heated to about **450–470 K**: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | Pure nickel is deposited, while carbon monoxide can be reused. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel process for titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Van Arkel process using iodine to purify titanium as a concrete illustrative example.

Accuracy: **accurate**. The description of titanium tetraiodide formation and its subsequent decomposition over a hot tungsten filament correctly describes the Van Arkel process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## Example 2: Van Arkel Process for Titanium and Zirconium | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Titanium or zirconium is purified by reacting it with **iodine**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | For titanium: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | Titanium tetraiodide (\(\text{TiI}_4\)) is volatile. Its vapour is passed over a hot tungsten filament, where it decomposes: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | Pure titanium is deposited on the filament. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Summary recap of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a high-level summary flowchart and lists the metals typically purified using this method.

Accuracy: **accurate**. The overall sequence and the mentioned applicable metals (Ni, Ti, Zr) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### In short | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | Vapour phase refining works because: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p41 | &gt; **Impure metal → volatile compound → vapour → heating → pure metal** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p42 | It is mainly used for metals that can form volatile compounds, such as **nickel, titanium, and zirconium**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

