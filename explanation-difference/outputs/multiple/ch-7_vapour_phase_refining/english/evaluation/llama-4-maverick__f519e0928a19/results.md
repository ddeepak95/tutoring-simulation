# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response accurately explains vapour phase refining, including its definition, working mechanism, notable industrial examples (Mond's process and Van Arkel method), and advantages.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 22,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 22,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining as a technique for purifying metals by converting them into volatile compounds and subsequently decomposing them.

Accuracy: **accurate**. The definition correctly outlines the core premise of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Vapour phase refining is a method used to purify metals. I&#x27;d be happy to explain it in detail. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | **What is Vapour Phase Refining?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Vapour phase refining is a technique used to purify metals by converting them into their volatile compounds, which are then separated from impurities and decomposed to obtain the pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Mechanism and steps of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the process works step-by-step through conversion, separation, and thermal decomposition.

Accuracy: **accurate**. The three steps correctly and clearly outline the sequence of operations in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **How does it work?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | The process involves the following steps: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. **Conversion to a volatile compound**: The impure metal is converted into a volatile compound, such as a carbonyl or a halide, by reacting it with a suitable reagent. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **Separation from impurities**: The volatile compound is then separated from the impurities, which remain in the solid or liquid phase. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 3. **Decomposition**: The volatile compound is then decomposed, usually by heating, to obtain the pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Mond's process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Mond's process as a concrete real-world industrial application of vapour phase refining using carbon monoxide to form volatile nickel tetracarbonyl.

Accuracy: **accurate**. The chemical reactions and description of Mond's process for nickel are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **Examples** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | 1. **Mond&#x27;s process for Nickel**: In this process, impure nickel is reacted with carbon monoxide to form nickel tetracarbonyl, a volatile compound. The nickel tetracarbonyl is then decomposed by heating to obtain pure nickel. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | Ni (impure) + 4CO → Ni(CO)₄ (volatile) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | Ni(CO)₄ → Ni (pure) + 4CO | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Van Arkel method for zirconium and titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Van Arkel method as a concrete application of vapour phase refining using iodine to form volatile metal iodides.

Accuracy: **accurate**. The description and chemical equations for the Van Arkel refining of zirconium are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | 2. **Van Arkel method for Zirconium and Titanium**: In this process, impure zirconium or titanium is reacted with iodine to form a volatile iodide. The iodide is then decomposed by heating to obtain the pure metal. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | Zr (impure) + 2I₂ → ZrI₄ (volatile) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | ZrI₄ → Zr (pure) + 2I₂ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Advantages and high-tech utility of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the advantages and practical suitability of vapour phase refining for high-purity metals.

Accuracy: **accurate**. Accurately notes the advantages and industrial relevance of obtaining high-purity metals via this method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **Advantages** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | Vapour phase refining is a useful technique for purifying metals that form volatile compounds. It is particularly useful for metals like nickel, zirconium, and titanium, which are used in high-tech applications. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u6: Key takeaways of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a bulleted review of the key points covered in the lesson.

Accuracy: **accurate**. The recap points faithfully summarize the essential aspects of the topic without errors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | **Key Takeaways** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | * Vapour phase refining involves converting a metal into a volatile compound, separating it from impurities, and decomposing it to obtain the pure metal. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | * The technique is useful for purifying metals that form volatile compounds. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | * Examples include Mond&#x27;s process for nickel and the Van Arkel method for zirconium and titanium. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | I hope this explanation helps you understand vapour phase refining! Do you have any questions or need further clarification? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

