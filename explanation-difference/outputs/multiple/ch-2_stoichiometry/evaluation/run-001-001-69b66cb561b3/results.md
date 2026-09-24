# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and thoroughly explains stoichiometry, covering chemical equations, mole ratios, molar mass, calculation pathways, a worked example, dimensional analysis, limiting reactants, common mistakes, and summary recaps.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 157,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "ANALOGY": 1,
    "CAVEAT": 2,
    "PROCEDURE": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 157,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 11,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as using balanced chemical equations to determine reactant and product amounts.

Accuracy: **accurate**. The definition of stoichiometry is chemically standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## Stoichiometry: The Chemistry of “How Much?” | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **Stoichiometry** is the part of chemistry that uses a balanced chemical equation to calculate how much of each substance reacts or is produced. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Baking Recipe Analogy for Chemical Equations (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "- A recipe might say: **2 eggs + 1 cup flour → 12 cookies**"}]}

Annotation rationale: Uses a cookie recipe comparison to introduce the concept of fixed stoichiometric ratios.

Accuracy: **accurate**. The analogy correctly represents stoichiometric coefficients as recipe-like proportion ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | It is like using a recipe: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | - A recipe might say: **2 eggs + 1 cup flour → 12 cookies** | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - A chemical equation might say: **2 molecules of hydrogen + 1 molecule of oxygen → 2 molecules of water** | ANALOGY | {} | [&#x27;list&#x27;] |
| p6 | The numbers in front of substances tell us the required ratios. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Balanced Chemical Equations and Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how coefficients in a balanced chemical equation establish the mole ratios of reactants and products, using water formation as an illustration.

Accuracy: **accurate**. The equation, its mole ratio (2 mol H2 : 1 mol O2 : 2 mol H2O), and the interpretation of stoichiometric coefficients are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## 1. Start with a Balanced Chemical Equation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | For example: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p13 | This means: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | - 2 molecules (or moles) of hydrogen gas react with | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - 1 molecule (or mole) of oxygen gas to make | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - 2 molecules (or moles) of water. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | So the mole ratio is: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | 2 \text{ mol } H_2 : 1 \text{ mol } O_2 : 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | The coefficients—**2, 1, and 2**—are essential in stoichiometry. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Distinguishing Subscripts from Coefficients (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Warns against confusing molecular formula subscripts with mole ratios.

Accuracy: **accurate**. Correctly clarifies that subscripts denote atom counts per molecule, not mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | &gt; Never use the small numbers inside chemical formulas as mole ratios.   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p23 | &gt; For example, the 2 in \(H_2\) means each hydrogen molecule has two hydrogen atoms. It does not mean “2 moles.” | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: The Mole as Chemistry's Counting Unit (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why moles are used to count microscopic particles and connects the mole to Avogadro's number and balanced equations.

Accuracy: **accurate**. Avogadro's number and the conceptual rationale for using the mole are accurately explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## 2. The Mole: Chemistry’s Counting Unit | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | Atoms and molecules are too tiny to count individually, so chemists use the **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p27 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | 1 \text{ mole} = 6.022 \times 10^{23} \text{ particles} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p29 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | A mole can refer to atoms, molecules, ions, or formula units. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | For stoichiometry, moles are important because balanced equations compare substances in **moles**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Molar Mass and Conversions Between Grams and Moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the role of molar mass in bridging laboratory mass measurements and mole amounts, illustrated by the molar mass of water.

Accuracy: **accurate**. The conversion formula and the calculation for the molar mass of water (18.02 g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## 3. Molar Mass Connects Grams and Moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | In a laboratory, substances are usually measured in grams, not moles. To convert between grams and moles, use **molar mass**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p35 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | \text{moles} = \frac{\text{mass in grams}}{\text{molar mass in g/mol}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p37 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p38 | For example, the molar mass of water, \(H_2O\), is: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | (2 \times 1.01) + 16.00 = 18.02 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | So: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | 1 \text{ mol } H_2O = 18.02 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: The Core Stoichiometric Calculation Pathway (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard multi-step sequence (grams to moles to moles to grams) for solving stoichiometry problems.

Accuracy: **accurate**. The 4-step sequence (balance, convert to moles, mole ratio, convert to target units) is the standard stoichiometry algorithm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | # The Main Stoichiometry Pathway | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | Most stoichiometry questions follow this pattern: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p49 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p50 | \boxed{\text{grams} \rightarrow \text{moles} \rightarrow \text{moles} \rightarrow \text{grams}} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p51 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p52 | More specifically: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p53 | 1. **Balance the equation.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p54 | 2. **Convert the given amount to moles.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p55 | 3. **Use the mole ratio from the balanced equation.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p56 | 4. **Convert the answer into the unit requested**, often grams. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked Problem: Calculating Grams of Water Formed (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the complete 4-step calculation to find grams of water formed from 4.00 g of hydrogen gas.

Accuracy: **accurate**. All steps and calculations (4.00 g / 2.02 g/mol = 1.98 mol H2; 1:1 ratio yields 1.98 mol H2O; 1.98 mol * 18.02 g/mol = 35.7 g H2O) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ## Example: How Many Grams of Water Form? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | Question: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | &gt; How many grams of water are produced when 4.00 g of hydrogen gas reacts completely with oxygen? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | ### Step 1: Write the balanced equation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p64 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | ### Step 2: Convert grams of hydrogen to moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | Molar mass of \(H_2\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p67 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p68 | 2.02 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | 4.00 \text{ g } H_2 \times \frac{1 \text{ mol } H_2}{2.02 \text{ g } H_2} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | = 1.98 \text{ mol } H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | ### Step 3: Use the mole ratio | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p75 | From the balanced equation: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | The ratio is: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p80 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | 1.98 \text{ mol } H_2 \times \frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | = 1.98 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | ### Step 4: Convert moles of water to grams | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p88 | Molar mass of water: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p89 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | 18.02 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | 1.98 \text{ mol } H_2O \times \frac{18.02 \text{ g } H_2O}{1 \text{ mol } H_2O} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | = 35.7 \text{ g } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | ### Final Answer | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p97 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \boxed{35.7 \text{ g of water}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Dimensional Analysis Setup for Stoichiometry (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows how to chain conversion factors in a single line so units systematically cancel.

Accuracy: **accurate**. The unit-cancellation setup is mathematically and chemically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p101 | # Dimensional Analysis: Let Units Guide You | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | A useful way to set up stoichiometry is to write conversion factors so that units cancel. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p103 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p104 | 4.00 \text{ g } H_2 | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p105 | \times | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p106 | \frac{1 \text{ mol } H_2}{2.02 \text{ g } H_2} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p107 | \times | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p108 | \frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p109 | \times | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p110 | \frac{18.02 \text{ g } H_2O}{1 \text{ mol } H_2O} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p111 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p112 | Everything cancels except grams of water: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p113 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p114 | \text{g } H_2 \rightarrow \text{mol } H_2 \rightarrow \text{mol } H_2O \rightarrow \text{g } H_2O | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p115 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p116 | This helps prevent mistakes. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Concept of Limiting Reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and explains that it dictates the maximum possible product formed.

Accuracy: **accurate**. Accurately defines limiting reactant and its governing role over theoretical yield.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | # Limiting Reactant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | Sometimes you are given amounts of **two reactants**. One may run out first. This substance is called the **limiting reactant**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p120 | The limiting reactant determines the maximum amount of product that can form. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u11: Worked Problem: Determining the Limiting and Excess Reactants (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through a specific reaction scenario comparing 2 moles of H2 and 2 moles of O2 to identify the limiting reactant and excess reactant.

Accuracy: **accurate**. Correctly deduces that 2 moles of H2 will consume 1 mole of O2, leaving 1 mole of O2 in excess, correctly identifying H2 as limiting.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p121 | For example: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p122 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | If you have: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p126 | - 2 moles of \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p127 | - 2 moles of \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p128 | The equation needs only 1 mole of \(O_2\) for every 2 moles of \(H_2\). Therefore: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p129 | - 2 moles of \(H_2\) use 1 mole of \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p130 | - You have 2 moles of \(O_2\), so 1 mole is left over | EXAMPLE | {} | [&#x27;list&#x27;] |
| p131 | - Hydrogen runs out first | EXAMPLE | {} | [&#x27;list&#x27;] |
| p132 | Therefore, \(H_2\) is the **limiting reactant**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p133 | The leftover reactant is called the **excess reactant**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p134 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Common Stoichiometry Mistakes (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details five frequent misconceptions and procedural errors students make in stoichiometry.

Accuracy: **accurate**. All five listed pitfalls are accurate warnings for high school stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p135 | # Common Stoichiometry Mistakes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p136 | 1. **Not balancing the equation first**   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p137 |    Always balance before calculating mole ratios. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p138 | 2. **Using grams directly in the mole ratio**   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p139 |    Coefficients compare **moles**, not grams. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p140 | 3. **Using subscripts instead of coefficients**   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p141 |    In \(2H_2 + O_2 \rightarrow 2H_2O\), use the coefficients 2, 1, and 2. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p142 | 4. **Forgetting molar mass**   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p143 |    You usually need molar mass to change grams into moles or moles into grams. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p144 | 5. **Reversing a conversion factor**   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p145 |    Make sure unwanted units cancel. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p146 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Quick Summary of Stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p157", "quote": "Think of the balanced equation as a recipe, and moles as the quantities needed to follow that recipe."}]}

Annotation rationale: Summarizes the definition, general calculation pathway, and overarching recipe analogy.

Accuracy: **accurate**. The summary accurately consolidates the central stoichiometry workflow and conceptual model.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p147 | ## Quick Summary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p148 | Stoichiometry uses a balanced chemical equation to calculate amounts of substances in a reaction. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p149 | The key sequence is: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p150 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p151 | \boxed{\text{Balance} \rightarrow \text{Convert to moles} \rightarrow \text{Use mole ratio} \rightarrow \text{Convert units}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p152 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p153 | The most common pattern is: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p154 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p155 | \boxed{\text{grams of A} \rightarrow \text{moles of A} \rightarrow \text{moles of B} \rightarrow \text{grams of B}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p156 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p157 | Think of the balanced equation as a recipe, and moles as the quantities needed to follow that recipe. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

