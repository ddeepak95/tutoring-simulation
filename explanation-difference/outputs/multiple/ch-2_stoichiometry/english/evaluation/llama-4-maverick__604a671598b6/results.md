# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains stoichiometry, covering its definition, etymology, prerequisite concepts, step-by-step problem-solving procedure, and a worked example.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 26,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 4,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and core concept of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the quantitative study of relationships between reactants and products in chemical reactions.

Accuracy: **accurate**. The definition of stoichiometry is scientifically accurate and appropriate for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Stoichiometry! It&#x27;s a fundamental concept in chemistry that can seem daunting at first, but trust me, it&#x27;s actually quite straightforward once you grasp the basics. So, let&#x27;s dive in! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **What is Stoichiometry?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Stoichiometry is the branch of chemistry that deals with the quantitative relationships between reactants and products in chemical reactions. In other words, it&#x27;s all about figuring out how much of each substance is involved in a chemical reaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Etymological origins of the term stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the Greek root words 'stoikheion' and 'metron' that form the term stoichiometry.

Accuracy: **accurate**. The Greek roots 'stoikheion' (element) and 'metron' (measure) are historically and linguistically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **The Word &quot;Stoichiometry&quot;** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | The word &quot;stoichiometry&quot; comes from the Greek words &quot;stoikheion&quot; (meaning &quot;element&quot;) and &quot;metron&quot; (meaning &quot;measure&quot;). So, stoichiometry is all about measuring the amounts of elements involved in a chemical reaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Basic prerequisite concepts for stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "It's like a dozen, but instead of 12, it's a really big number!"}]}

Annotation rationale: Presents foundational concepts needed to perform stoichiometric calculations: chemical equations, the mole, and molar mass.

Accuracy: **accurate**. The descriptions and definitions of chemical equations, Avogadro's number/the mole, and molar mass are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | **The Basics** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | To understand stoichiometry, you need to know a few basic concepts: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. **Chemical Equations**: A chemical equation represents a chemical reaction using chemical formulas and symbols. For example: 2H2 + O2 → 2H2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |
| p9 | 2. **Mole**: A mole is a unit of measurement that represents 6.022 x 10^23 particles (atoms or molecules). It&#x27;s like a dozen, but instead of 12, it&#x27;s a really big number! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | 3. **Molar Mass**: The molar mass of a substance is the mass of one mole of that substance. It&#x27;s usually measured in grams per mole (g/mol). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Step-by-step stoichiometry calculation process (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a reusable, sequential procedure to solve general stoichiometry problems.

Accuracy: **accurate**. The five-step procedure accurately captures the standard methodology for stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | **The Stoichiometry Process** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Now, let&#x27;s walk through the steps to solve a stoichiometry problem: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | 1. **Write a Balanced Equation**: Start by writing a balanced chemical equation for the reaction. This ensures that the number of atoms of each element is the same on both the reactant and product sides. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 2. **Identify the Given Information**: Identify the information given in the problem, such as the mass or number of moles of a reactant or product. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | 3. **Convert to Moles**: Convert the given information to moles using the molar mass of the substance. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | 4. **Use the Mole Ratio**: Use the balanced equation to determine the mole ratio between the given substance and the substance you&#x27;re trying to find. The mole ratio is the ratio of the coefficients in the balanced equation. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | 5. **Calculate the Answer**: Use the mole ratio to calculate the number of moles of the substance you&#x27;re trying to find. Then, convert this value to the desired unit (e.g., mass or volume). | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Worked example calculating required mass of O2 from moles of H2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked stoichiometry problem using the reaction 2H2 + O2 -> 2H2O to determine the mass of O2 required for 4 moles of H2.

Accuracy: **accurate**. The equation balance, mole ratio derivation (2 mol H2 : 1 mol O2), molar mass of O2 (32 g/mol), and final calculation (2 mol * 32 g/mol = 64 g) are all correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | **Example Problem** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | Let&#x27;s say we want to find the mass of oxygen gas (O2) required to react with 4 moles of hydrogen gas (H2) to form water (H2O). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | 1. Write a balanced equation: 2H2 + O2 → 2H2O | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p21 | 2. Identify the given information: 4 moles of H2 | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | 3. Convert to moles: Not needed, as we&#x27;re already given moles! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | 4. Use the mole ratio: From the balanced equation, we see that 2 moles of H2 react with 1 mole of O2. So, the mole ratio is 2:1. Therefore, 4 moles of H2 will react with 2 moles of O2. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | 5. Calculate the answer: The molar mass of O2 is 32 g/mol. So, the mass of O2 required is 2 moles x 32 g/mol = 64 g. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |
| p25 | **Conclusion** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | Stoichiometry is all about understanding the quantitative relationships between reactants and products in chemical reactions. By following these steps and practicing with different problems, you&#x27;ll become a pro at solving stoichiometry questions! Do you have any specific questions or topics you&#x27;d like me to clarify? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

