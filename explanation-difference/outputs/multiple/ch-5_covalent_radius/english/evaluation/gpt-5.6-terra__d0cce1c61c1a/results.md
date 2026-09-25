# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius, including its definition, an illustrative calculation with chlorine, periodic trends, and the effect of bond order.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 22,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 22,
  "unique_subtopics": 5,
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

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what covalent radius is, why internuclear distance is used instead of direct atomic edges, and gives the standard formal definition.

Accuracy: **accurate**. The definition correctly specifies half the internuclear distance between identical atoms joined by a single covalent bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Covalent radius** is a measure of the size of an atom when it is joined to another atom by a **covalent bond**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | A covalent bond forms when two atoms **share electrons**. Because atoms do not have sharp outer edges, scientists cannot directly measure the “edge” of one atom. Instead, they use the distance between the nuclei of two bonded atoms. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### Definition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | The covalent radius of an atom is: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | &gt; **Half the distance between the nuclei of two identical atoms joined by a single covalent bond.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a calculation of the covalent radius of chlorine from the internuclear distance in Cl2.

Accuracy: **accurate**. The internuclear distance of 198 pm in Cl2 correctly yields a covalent radius of 99 pm, and the definition of picometre is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | For example, in a chlorine molecule, Cl₂, the two chlorine atoms are joined by a covalent bond. If the distance between their nuclei is 198 pm (picometres), then: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p8 | \text{Covalent radius of Cl} = \frac{198}{2} = 99\text{ pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p10 | A **picometre (pm)** is \(10^{-12}\) metres, so atomic radii are extremely small. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic trends across periods and down groups, including nuclear charge and electron shielding/shells.

Accuracy: **accurate**. Correctly states and explains why covalent radius decreases across a period and increases down a group.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### Trends in the periodic table | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | - **Across a period (left to right):** covalent radius generally **decreases**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 |   This happens because the number of protons increases, pulling the outer electrons closer to the nucleus. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | - **Down a group (top to bottom):** covalent radius generally **increases**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 |   This is because each element has an additional electron shell, making the atom larger. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Dependence of covalent radius on bond multiplicity (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies the definition by noting that covalent radius varies depending on whether a single, double, or triple bond is formed.

Accuracy: **accurate**. Accurately explains that bond order shortens internuclear distance, resulting in smaller effective covalent radii for multiple bonds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### Important note | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | The covalent radius can depend slightly on the type of bond: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p18 | - A **single bond** is longer, so it gives a larger radius. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | - A **double bond** is shorter. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | - A **triple bond** is even shorter. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | For example, carbon has a slightly smaller effective radius in a triple bond than in a single bond because the atoms are pulled closer together. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Summary of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise concluding summary of the core concept.

Accuracy: **accurate**. Accurately summarizes the function of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | In short, covalent radius tells us the approximate size of an atom when it forms covalent bonds. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

