# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the requested topic of isotopes, covering their definition, an illustrative example with carbon isotopes, and their classification into stable and radioactive types.

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 13,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1
  },
  "nested_passages": 13,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and nuclear structure of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what an isotope is and explains the relationship between protons determining the element, varying neutrons, and resulting differences in atomic mass.

Accuracy: **accurate**. The definition accurately states that isotopes share proton numbers but differ in neutron counts and atomic masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | An **isotope** is a version of an element that has the same number of **protons** but a different number of **neutrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | - The number of **protons** decides which element it is. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p3 | - The number of **neutrons** can change without changing the element. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - Therefore, isotopes of the same element have different **masses**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Carbon isotopes (Carbon-12, Carbon-13, and Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a real-world chemistry example comparing the subatomic particle compositions of three natural carbon isotopes.

Accuracy: **accurate**. The proton counts (6), neutron counts (6, 7, 8), and mass numbers (12, 13, 14) for carbon isotopes are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### Example: Carbon isotopes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Every carbon atom has **6 protons**. However, carbon can have different numbers of neutrons: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | &#124; Isotope &#124; Protons &#124; Neutrons &#124; Mass number &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p8 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p9 | &#124; Carbon-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p10 | &#124; Carbon-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124; Carbon-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | All three are carbon because they all contain 6 protons. But they are different isotopes because their numbers of neutrons are different. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Isotope stability and radioactivity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the distinction between stable and radioactive isotopes and notes the archaeological dating application of carbon-14.

Accuracy: **accurate**. The descriptions of stability, radioactivity, and radiocarbon dating of organic matter and fossils are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | Some isotopes are **stable**, meaning they do not change over time. Others are **radioactive**, meaning they slowly break down and release radiation. For example, carbon-14 is radioactive and is used to estimate the age of ancient bones, wood, and fossils. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

