# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the definition of the mole, Avogadro's number, molar mass, mole conversion formulas with worked examples, the mole triangle, stoichiometric mole ratios, and gas molar volume.

## Counts

```json
{
  "total_content_units": 20,
  "substantive_content_units": 20,
  "total_passages": 180,
  "content_unit_kinds": {
    "CONCEPT": 8,
    "EXAMPLE": 9,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1,
    "CAVEAT": 1
  },
  "nested_passages": 180,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 2,
    "none": 18
  },
  "proposed_substantive_verdicts": {
    "accurate": 20
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "just as we do not count grains of rice individually"}]}

Annotation rationale: Introduces the need for a counting unit in chemistry due to the tiny size of atoms and molecules, defines the mole as Avogadro's number of particles, and lists the types of representative particles.

Accuracy: **accurate**. Correctly introduces the mole concept, Avogadro's number (6.022 x 10^23), and appropriate representative particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## Mole Concept — Simple Explanation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | In chemistry, atoms and molecules are extremely tiny. We cannot count them one by one, just as we do not count grains of rice individually. So chemists use a special counting unit called the **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### 1. What is a mole? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | A **mole (mol)** is a fixed number of particles. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p6 | 1\text{ mole} = 6.022 \times 10^{23}\text{ particles} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p7 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p8 | This number is called **Avogadro’s number**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | The particles can be: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | - atoms, e.g., copper atoms | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - molecules, e.g., water molecules | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - ions, e.g., sodium ions | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - formula units, e.g., sodium chloride units | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Particle counts in one mole of common substances (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates particle quantities for 1 mol of carbon atoms, water molecules, and NaCl formula units.

Accuracy: **accurate**. Correctly states the particle count for 1 mole of carbon atoms, water molecules, and sodium chloride formula units.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | For example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | - 1 mol of carbon atoms = \(6.022 \times 10^{23}\) carbon atoms   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - 1 mol of water molecules = \(6.022 \times 10^{23}\) water molecules   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - 1 mol of NaCl = \(6.022 \times 10^{23}\) formula units of NaCl   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Dozen analogy for a mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p19", "quote": "- 1 dozen = 12 items"}]}

Annotation rationale: Compares 1 mole to 1 dozen items to explain counting by grouping.

Accuracy: **accurate**. The comparison between a dozen and a mole accurately illustrates the nature of a mole as a counting unit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | Think of it like this: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | - 1 dozen = 12 items   | ANALOGY | {} | [&#x27;list&#x27;] |
| p20 | - 1 mole = \(6.022 \times 10^{23}\) items   | ANALOGY | {} | [&#x27;list&#x27;] |
| p21 | The difference is that a mole is a much, much larger “packet.” | ANALOGY | {} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Molar mass definition and units (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance, provides its units (g/mol), and explains how to obtain it from the periodic table.

Accuracy: **accurate**. Molar mass is correctly defined and its unit (g/mol) and derivation from atomic masses are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## 2. Molar Mass | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | The **molar mass** is the mass of **one mole** of a substance. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | Its unit is: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p27 | \text{grams per mole (g/mol)} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p29 | You find molar mass by adding the atomic masses from the periodic table. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Calculating molar mass of oxygen gas (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step calculation of the molar mass of O2 from atomic mass.

Accuracy: **accurate**. Calculations and values for the molar mass of O2 (32 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### Example 1: Molar mass of oxygen gas, \(O_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | Atomic mass of oxygen = 16 g/mol. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | Since an oxygen molecule has two oxygen atoms: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p34 | M(O_2) = 2 \times 16 = 32\text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p36 | So: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p37 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p38 | 1\text{ mol of } O_2 = 32\text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |

## u6: Calculating molar mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step calculation of the molar mass of H2O from constituent atomic masses.

Accuracy: **accurate**. Calculations and values for the molar mass of H2O (18 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ### Example 2: Molar mass of water, \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | - Hydrogen = 1 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p42 | - Oxygen = 16 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p43 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p44 | M(H_2O) = (2 \times 1) + 16 = 18\text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p46 | Therefore: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p48 | 1\text{ mol of water} = 18\text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p50 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula n = m / M and defines the variables.

Accuracy: **accurate**. The formula n = m / M and variable definitions are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | ## 3. Important Mole Formulas | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | ### A. Moles from mass | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p54 | \boxed{\text{Moles} = \frac{\text{Mass}}{\text{Molar mass}}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p55 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p56 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p57 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p58 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p59 | Where: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | - \(n\) = number of moles | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p61 | - \(m\) = mass in grams | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p62 | - \(M\) = molar mass in g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Calculating moles in 36 g of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies n = m / M to determine that 36 g of water contains 2 moles.

Accuracy: **accurate**. The calculation 36 / 18 = 2 mol of water is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | ### Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | How many moles are in 36 g of water? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p65 | Molar mass of water = 18 g/mol. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p66 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p67 | n = \frac{36}{18} = 2\text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p68 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p69 | So, 36 g of water contains **2 moles of water molecules**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p70 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formula for calculating mass from moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula m = nM for finding mass from moles and molar mass.

Accuracy: **accurate**. The rearranged formula m = nM is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p71 | ### B. Mass from moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p72 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p73 | \boxed{\text{Mass} = \text{Moles} \times \text{Molar mass}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p74 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p75 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p76 | m = nM | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p77 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |

## u10: Calculating mass of 3 mol of carbon dioxide (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the molar mass of CO2 (44 g/mol) and multiplies by 3 mol to get 132 g.

Accuracy: **accurate**. The calculation 3 * 44 = 132 g for 3 mol of CO2 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p78 | ### Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p79 | Find the mass of 3 mol of carbon dioxide, \(CO_2\). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p80 | Molar mass of \(CO_2\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p81 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p82 | 12 + (2 \times 16) = 44\text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p84 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p85 | m = 3 \times 44 = 132\text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p87 | So, 3 mol of \(CO_2\) has a mass of **132 g**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p88 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Formula for calculating number of particles from moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents N = n * N_A and defines Avogadro's number.

Accuracy: **accurate**. The formula N = n * N_A is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p89 | ### C. Number of particles from moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p90 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p91 | \boxed{\text{Number of particles} = \text{Moles} \times 6.022 \times 10^{23}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p92 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p93 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p94 | N = nN_A | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p95 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p96 | Where \(N_A\) is Avogadro’s number. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u12: Calculating number of molecules in 2 mol of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies N = n * N_A to find that 2 mol of water contains 1.2044 x 10^24 molecules.

Accuracy: **accurate**. The calculation 2 * 6.022 x 10^23 = 1.2044 x 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | ### Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | How many molecules are in 2 mol of water? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p99 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p100 | N = 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p102 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p103 | N = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p105 | So, 2 mol of water contains: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p106 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p107 | \boxed{1.2044 \times 10^{24}\text{ molecules}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p109 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Formula for calculating moles from number of particles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for finding moles from particle count divided by Avogadro's number.

Accuracy: **accurate**. The formula n = N / 6.022 x 10^23 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ### D. Moles from number of particles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p112 | \boxed{\text{Moles} = \frac{\text{Number of particles}}{6.022 \times 10^{23}}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p113 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |

## u14: Calculating moles from a given count of iron atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies n = N / N_A to determine moles from 3.011 x 10^23 iron atoms.

Accuracy: **accurate**. The calculation (3.011 x 10^23) / (6.022 x 10^23) = 0.5 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p114 | ### Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p115 | How many moles are \(3.011 \times 10^{23}\) atoms of iron? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p116 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p117 | n = \frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p118 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p119 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p120 | n = 0.5\text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p122 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Mole triangle mnemonic for mass-mole conversions (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mole triangle diagram/mnemonic showing relationships between mass, moles, and molar mass.

Accuracy: **accurate**. The formula triangle and the derived relationships are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p123 | ## 4. Mole Triangle | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p124 | You can remember mass–mole calculations using this triangle: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p125 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;separator&#x27;] |
| p126 | \begin{array}{c} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;diagram&#x27;] |
| p127 | \text{Mass} \\ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;diagram&#x27;] |
| p128 | \hline | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;diagram&#x27;] |
| p129 | \text{Moles} \quad \text{Molar Mass} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;diagram&#x27;] |
| p130 | \end{array} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;diagram&#x27;] |
| p131 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;separator&#x27;] |
| p132 | - To find mass: multiply moles by molar mass. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p133 | - To find moles: divide mass by molar mass. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p134 | - To find molar mass: divide mass by moles. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p135 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Mole ratios from balanced chemical equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how coefficients in a balanced reaction provide mole ratios between reactants and products.

Accuracy: **accurate**. The explanation of stoichiometric coefficients and mole ratios in the water synthesis reaction is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p136 | ## 5. Mole Ratio in Chemical Equations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p137 | Moles are very important in chemical reactions. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p138 | Consider: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p139 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p140 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p141 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p142 | This equation means: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p143 | - 2 moles of hydrogen react with | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p144 | - 1 mole of oxygen to produce | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p145 | - 2 moles of water. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p146 | The numbers in front of formulas are called **coefficients**, and they give the **mole ratio**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p147 | So the mole ratio is: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p148 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p149 | 2\text{ mol } H_2 : 1\text{ mol } O_2 : 2\text{ mol } H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p150 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |

## u17: Calculating product moles from reactant moles using mole ratio (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the mole ratio to compute how much water is produced from 4 mol of hydrogen gas.

Accuracy: **accurate**. The dimensional analysis and stoichiometric conversion are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p151 | For example, if 4 moles of hydrogen react completely: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p152 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p153 | 4\text{ mol }H_2 \times \frac{2\text{ mol }H_2O}{2\text{ mol }H_2} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p154 | = 4\text{ mol }H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p155 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p156 | Thus, 4 mol of hydrogen can produce 4 mol of water, if enough oxygen is present. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p157 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u18: Molar volume of ideal gases at STP (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines STP conditions and states that one mole of an ideal gas occupies approximately 22.4 L.

Accuracy: **accurate**. Correctly states the molar volume of an ideal gas at traditional STP (0 °C, 1 atm) as approximately 22.4 L.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p158 | ## 6. Molar Volume of Gases | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p159 | For an ideal gas at **standard temperature and pressure (STP: 0°C and 1 atm)**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p160 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |
| p161 | \boxed{1\text{ mole of any gas occupies about }22.4\text{ L}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p162 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;] |

## u19: Gas volume calculations at STP (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates volume of 1 mol of O2 and calculates volume of 2 mol of N2 at STP.

Accuracy: **accurate**. Calculations of 1 mol (22.4 L) and 2 mol (44.8 L) at STP are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p163 | For example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p164 | - 1 mol of oxygen gas occupies 22.4 L at STP. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p165 | - 2 mol of nitrogen gas occupies: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p166 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p167 | 2 \times 22.4 = 44.8\text{ L} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p168 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |

## u20: Condition limitation for 22.4 L gas molar volume (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes that the 22.4 L rule applies only under standard conditions, followed by a quick recap table and main idea summarizing mole conversions.

Accuracy: **accurate**. The limitation and summary table/takeaway are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p169 | This rule applies only under the stated conditions. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p170 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p171 | ## Quick Summary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p172 | &#124; Quantity &#124; Formula &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p173 | &#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p174 | &#124; Moles from mass &#124; \(\displaystyle n=\frac{m}{M}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p175 | &#124; Mass from moles &#124; \(\displaystyle m=nM\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p176 | &#124; Particles from moles &#124; \(\displaystyle N=n \times 6.022\times10^{23}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p177 | &#124; Moles from particles &#124; \(\displaystyle n=\frac{N}{6.022\times10^{23}}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p178 | &#124; Gas volume at STP &#124; \(\displaystyle V=n \times 22.4\text{ L}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p179 | ### Main idea: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p180 | A mole connects the tiny world of atoms and molecules to measurable quantities like **grams**, **litres**, and **number of particles**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

