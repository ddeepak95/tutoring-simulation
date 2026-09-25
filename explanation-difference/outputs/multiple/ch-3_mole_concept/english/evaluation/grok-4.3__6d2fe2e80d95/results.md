# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the mole concept in chemistry, including Avogadro's number, molar mass, conversion formulas, worked calculation examples, and its practical importance.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 56,
  "content_unit_kinds": {
    "ANALOGY": 2,
    "CONCEPT": 4,
    "EXAMPLE": 6,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 56,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 2,
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 13,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Dozen-to-mole counting analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "Imagine you want to buy eggs. You don’t count them one by one; you ask for “one dozen.” One dozen always means **12 eggs**."}]}

Annotation rationale: Introduces the mole by drawing an analogy to buying eggs by the dozen to explain why chemists need a counting unit for microscopic particles.

Accuracy: **accurate**. The analogy correctly relates counting objects by dozens to counting atoms and molecules using moles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **The Mole Concept – Explained Simply** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | Imagine you want to buy eggs. You don’t count them one by one; you ask for “one dozen.” One dozen always means **12 eggs**. Chemists face the same problem, but with atoms and molecules. Atoms are so tiny that you can’t count them directly. So scientists created a special “counting unit” called the **mole**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the mole as Avogadro's number of particles and illustrates what one mole represents for different chemical species.

Accuracy: **accurate**. The definition of the mole, the value of Avogadro's number, and the particle count representations are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ### 1. What is a Mole? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | A **mole** is just a number — a very large number.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | **1 mole = 6.022 × 10²³ particles** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p6 | This number is called **Avogadro’s number** (Nₐ).   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | So: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | - 1 mole of carbon atoms = 6.022 × 10²³ carbon atoms | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - 1 mole of water molecules = 6.022 × 10²³ water molecules | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - 1 mole of oxygen gas = 6.022 × 10²³ oxygen molecules | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | It’s like saying “one dozen = 12” but instead of 12, it’s 602,200,000,000,000,000,000,000 particles! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Scale of Avogadro's number and weighing particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why Avogadro's number is enormous due to the sub-microscopic mass of atoms, and why chemists weigh samples instead of counting individual particles.

Accuracy: **contains_error**. The calculation in passage p15 substantially underestimates the time required to count one mole at a rate of 1 atom per second.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 2. Why This Huge Number? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Because atoms are extremely small.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | - 1 gram of hydrogen contains about 6 × 10²³ atoms.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | If you tried to count them at the rate of 1 atom per second, it would take you about **19 million years** to finish counting one mole! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | So instead of counting particles, chemists **weigh** them. That’s the clever part of the mole concept. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p15): Counting at a rate of 1 atom per second would take 6.022 × 10²³ seconds. Dividing by ~3.156 × 10⁷ seconds per year yields approximately 1.91 × 10¹⁶ years (about 19 quadrillion years), not 19 million years.

Correction: Counting one mole of atoms at 1 atom per second would take approximately 1.9 × 10¹⁶ years (about 19 quadrillion years).

## u4: Definition and determination of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance and describes how it is determined for individual elements and compounds using the periodic table.

Accuracy: **accurate**. The definition and rules for determining molar mass from atomic weights are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### 3. Molar Mass – Connecting Mass and Number | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | The mass of **one mole** of any substance is called its **molar mass**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | - For atoms: molar mass (in grams) = atomic mass (shown on the periodic table) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | - For compounds: add up the atomic masses of all atoms in the formula | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an illustrative example of the molar mass of carbon, including the shared table structure.

Accuracy: **accurate**. Carbon has an atomic mass of approximately 12 u and a molar mass of 12 g/mol, containing 6.022 × 10²³ atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | **Examples**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | &#124; Substance     &#124; Formula     &#124; Atomic Masses                  &#124; Molar Mass     &#124; Meaning                                      &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;, &#x27;heading&#x27;] |
| p23 | &#124;---------------&#124;-------------&#124;--------------------------------&#124;----------------&#124;----------------------------------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p24 | &#124; Carbon        &#124; C           &#124; C = 12                         &#124; 12 g/mol       &#124; 12 g of carbon = 1 mole = 6.022 × 10²³ atoms &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u6: Molar mass of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an illustrative example calculating the molar mass of water from hydrogen and oxygen atomic masses.

Accuracy: **accurate**. Water (H₂O) has a molar mass of 18 g/mol (2×1 + 16), containing 6.022 × 10²³ molecules per mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | &#124; Water         &#124; H₂O         &#124; H=1, O=16 → 2(1) + 16          &#124; 18 g/mol       &#124; 18 g of water = 1 mole = 6.022 × 10²³ molecules &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Molar mass of sodium chloride (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an illustrative example calculating the molar mass of sodium chloride.

Accuracy: **accurate**. Sodium chloride (NaCl) has a molar mass of 58.5 g/mol (23 + 35.5).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | &#124; Sodium Chloride &#124; NaCl      &#124; Na=23, Cl=35.5 → 23 + 35.5     &#124; 58.5 g/mol     &#124; 58.5 g of salt = 1 mole                      &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Molar mass of oxygen gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an illustrative example calculating the molar mass of diatomic oxygen gas.

Accuracy: **accurate**. Diatomic oxygen gas (O₂) has a molar mass of 32 g/mol (2 × 16).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | &#124; Oxygen gas    &#124; O₂          &#124; 2 × 16                         &#124; 32 g/mol       &#124; 32 g of O₂ = 1 mole                          &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Formulas for mole conversions (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the general mathematical relationships and formulas used to convert between mass, moles, and number of particles.

Accuracy: **accurate**. The conversion formulas connecting mass, moles, and particle count via molar mass and Avogadro's number are mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### 4. How to Use the Mole in Calculations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | There are three things you can convert between: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | - **Mass** (grams) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p31 | - **Number of moles** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p32 | - **Number of particles** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p33 | **Basic formulas**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | - Number of moles = Mass (g) ÷ Molar mass (g/mol) | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p35 | - Number of particles = Number of moles × 6.022 × 10²³ | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u10: Calculating moles from mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates step-by-step how to find the number of moles present in 36 grams of water.

Accuracy: **accurate**. 36 g divided by 18 g/mol yields exactly 2 moles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | **Example 1**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | How many moles are in 36 grams of water?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | Molar mass of H₂O = 18 g/mol   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p39 | Moles = 36 ÷ 18 = **2 moles** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u11: Calculating number of molecules from mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates step-by-step how to calculate the number of molecules present in 9 grams of water.

Accuracy: **accurate**. 9 g / 18 g/mol = 0.5 moles, and 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | **Example 2**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | How many molecules are in 9 grams of water?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | Moles = 9 ÷ 18 = 0.5 moles   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p43 | Molecules = 0.5 × 6.022 × 10²³ = **3.011 × 10²³ molecules** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u12: Importance of the mole in chemistry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the role of the mole in writing balanced chemical equations, performing stoichiometric calculations, and comparing substances.

Accuracy: **accurate**. The stated uses of the mole in chemical equations and stoichiometric predictions are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ### 5. Why Is the Mole So Important? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | Chemists use the mole to: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p46 | - Write balanced chemical equations (they show ratios of **moles**, not grams) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p47 | - Calculate how much reactant is needed or how much product will form | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | - Compare amounts of different substances fairly | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u13: Recipe analogy for mole ratios (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p50", "quote": "If a recipe says “mix 2 moles of hydrogen with 1 mole of oxygen,” it always means the same number of molecules, no matter which gas you use."}]}

Annotation rationale: Uses a recipe comparison to explain that chemical equations specify fixed molecular ratios rather than mass ratios.

Accuracy: **accurate**. The analogy accurately describes how stoichiometric coefficients indicate fixed molecule count ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | **Real-life analogy**:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | If a recipe says “mix 2 moles of hydrogen with 1 mole of oxygen,” it always means the same number of molecules, no matter which gas you use. That’s why the mole makes chemistry predictable. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u14: Summary of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the mole concept and includes an offer for further follow-up on stoichiometry.

Accuracy: **accurate**. The recap accurately synthesizes the main points of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p52 | **Quick Summary**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | - Mole = a huge counting unit (6.022 × 10²³ particles) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p54 | - 1 mole of any substance has a mass equal to its molar mass in grams | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p55 | - It lets us go from “weighing in grams” to “counting particles” | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p56 | Would you like me to explain how to use moles in chemical equations (stoichiometry) with easy examples next? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

