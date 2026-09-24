# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation comprehensively covers stoichiometry for high school chemistry, including the definition, balanced equations, the mole concept, step-by-step problem-solving procedure, a worked calculation, limiting reactants, study tips, and real-world applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 46,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 46,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 3,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry and baking recipe analogy (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "recipe in baking: if the recipe says \"2 cups flour + 1 cup sugar makes 12 cookies,\" you can scale it up or down to figure out how many cookies you'll get from 4 cups of flour."}]}

Annotation rationale: Introduces the concept of stoichiometry as the quantitative relationship between reactants and products in a chemical reaction using a baking recipe analogy.

Accuracy: **accurate**. The definition and recipe analogy accurately capture the essence of stoichiometry for an introductory audience.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Stoichiometry is basically the &quot;math of chemistry.&quot; It helps you figure out exactly how much stuff (reactants) you need to make a certain amount of product in a chemical reaction—or how much product you can make from what you have. Think of it like a recipe in baking: if the recipe says &quot;2 cups flour + 1 cup sugar makes 12 cookies,&quot; you can scale it up or down to figure out how many cookies you&#x27;ll get from 4 cups of flour. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Conservation of mass, balanced equations, and mole ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical reactions require balanced equations due to the law of conservation of mass, and illustrates how coefficients provide mole ratios using the formation of water.

Accuracy: **accurate**. Correctly links the law of conservation of mass to balancing equations and explains how stoichiometric coefficients represent mole and molecule ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### Why We Need It | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Chemical reactions follow the law of conservation of mass—atoms are never created or destroyed, just rearranged. So we use **balanced chemical equations** to show the exact ratios of molecules involved. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | Example (unbalanced): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | H₂ + O₂ → H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p6 | Balanced: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | 2H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p8 | This tells us that **2 molecules of hydrogen** react with **1 molecule of oxygen** to make **2 molecules of water**. The numbers in front (called coefficients) give us the mole ratios. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: The mole concept, Avogadro's number, and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "just like a \"dozen\" = 12"}]}

Annotation rationale: Defines the mole as a counting unit in chemistry, introduces Avogadro's number, explains molar mass, and demonstrates how to determine the molar mass of water.

Accuracy: **accurate**. The definition of the mole, the value of Avogadro's number, and the calculation of the molar mass of water are correct within standard high school precision and pedagogical conventions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### The Mole: Chemistry&#x27;s Counting Unit | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Atoms and molecules are tiny, so we don&#x27;t count them one by one. Instead, we use the **mole** (just like a &quot;dozen&quot; = 12). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 1 mole = 6.022 × 10²³ particles (Avogadro&#x27;s number) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - We convert between **grams** (what we can measure) and **moles** using molar mass (found on the periodic table). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | For water (H₂O): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | - H = 1.008 g/mol × 2 = 2.016 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - O = 16.00 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - Total molar mass = 18.016 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | So 1 mole of water weighs about 18 grams. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Step-by-step procedure for stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general four-step algorithmic method used to solve mass-to-mass stoichiometry problems.

Accuracy: **accurate**. The four steps correctly capture the standard sequence: balancing the reaction, converting mass to moles, applying the mole ratio, and converting moles to mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### How Stoichiometry Works (Step by Step) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | You always follow these steps: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p20 | 1. Write and balance the equation. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p21 | 2. Convert given amounts (usually in grams) to moles. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p22 | 3. Use the mole ratio from the balanced equation to find moles of what you&#x27;re looking for. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p23 | 4. Convert back to grams if needed. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u5: Worked example: Calculating mass of water formed from 8 grams of hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a complete calculation applying the four-step stoichiometry process to determine the mass of water formed from 8 grams of hydrogen reacting with excess oxygen.

Accuracy: **accurate**. All calculations, conversions, mole ratios, and the final result (72 g H₂O) are mathematically and chemically correct using standard rounded molar masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | **Real example**: How many grams of water can you make from 8 grams of hydrogen gas (H₂) reacting with plenty of oxygen? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | Balanced equation: 2H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p26 | - Step 1: Convert 8 g H₂ to moles.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 |   Molar mass of H₂ = 2 g/mol   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 |   8 g ÷ 2 g/mol = 4 moles of H₂ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - Step 2: Use the mole ratio.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 |   From the equation: 2 moles H₂ make 2 moles H₂O   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 |   So the ratio is 2:2 (or 1:1)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 |   4 moles H₂ will make 4 moles H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | - Step 3: Convert moles of H₂O to grams.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 |   Molar mass of H₂O = 18 g/mol   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 |   4 moles × 18 g/mol = 72 grams of water | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | You can make 72 grams of water from 8 grams of hydrogen. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Limiting reactant concept and illustrative scenario (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and provides an illustrative hypothetical reaction with specific mole amounts to show how product amount is limited and excess remains.

Accuracy: **accurate**. The definition is accurate and the illustrative problem (4 moles H₂ and 1 mole O₂ producing 2 moles H₂O with oxygen limiting) is chemically sound and correctly solved.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ### Limiting Reactant (The One That Runs Out First) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | Sometimes you don&#x27;t have &quot;plenty&quot; of everything. The reactant that gets used up first limits how much product you can make. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | Example: If you have 4 moles of H₂ but only 1 mole of O₂, oxygen is the limiting reactant (because the equation needs 2 H₂ per 1 O₂, so you can only use 2 moles of H₂). You&#x27;ll only make 2 moles of water, and you&#x27;ll have leftover hydrogen. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Study tips and strategies for mastering stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides practical learning tips, dimensional analysis reminders, and encouragement for high school students.

Accuracy: **accurate**. The tips reflect standard, effective chemistry problem-solving strategies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ### Quick Tips for Students | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | - Always balance the equation first—everything else depends on it. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p42 | - Keep track of units (grams → moles → moles → grams). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p43 | - Practice with simple reactions like combustion or making water/ammonia. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p44 | - It feels like a lot at first, but once you do 3–4 problems, the pattern becomes automatic. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |

## u8: Real-world applications of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p45", "quote": "making medicine, calculating fuel in rockets, figuring out how much fertilizer plants need, or even baking on a huge industrial scale."}]}

Annotation rationale: Surveys real-world and industrial applications of stoichiometry and concludes with a conversational closing offer.

Accuracy: **accurate**. The listed practical domains accurately represent major real-world uses of stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | Stoichiometry is used everywhere in real life: making medicine, calculating fuel in rockets, figuring out how much fertilizer plants need, or even baking on a huge industrial scale. Master this and a huge part of chemistry suddenly makes sense!  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | Want me to walk through another example (like making ammonia or burning propane)? Just give me a reaction and amounts. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

