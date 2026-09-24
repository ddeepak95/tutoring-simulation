# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and thoroughly explains the mole concept, including why it is needed, its definition via Avogadro's number, the connection to atomic mass and molar mass, conversion formulas, a worked calculation example, and a summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 59,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1,
    "ANALOGY": 1
  },
  "nested_passages": 59,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 4,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Why Chemists Need the Mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "Imagine trying to count grains of sand on a beach one by one — impossible, right?"}, {"passage_id": "p5", "quote": "- **1 dozen** = 12 items"}]}

Annotation rationale: Explains why a macroscopic counting unit is necessary when dealing with microscopic particles, drawing parallels to everyday grouping units such as dozens and pairs.

Accuracy: **accurate**. Accurately introduces the physical motivation for the mole as a macroscopic counting unit for microscopic entities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # The Mole Concept | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Why Do We Need the Mole? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Imagine trying to count grains of sand on a beach one by one — impossible, right? Similarly, atoms and molecules are so incredibly tiny that we can&#x27;t count them individually. If you have a small drop of water, it contains billions of billions of molecules!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | Chemists needed a convenient &quot;counting unit&quot; for these tiny particles — just like we use: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | - **1 dozen** = 12 items | ANALOGY | {} | [&#x27;list&#x27;] |
| p6 | - **1 pair** = 2 items | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | - **1 gross** = 144 items | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | For atoms and molecules, chemists created **1 mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition of the Mole and Avogadro's Number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p14", "quote": "So, just like \"1 dozen\" always means 12 items (whether it's 12 eggs or 12 pencils):"}]}

Annotation rationale: States the formal definition of the mole as representing 6.022 x 10^23 particles and introduces Avogadro's number.

Accuracy: **accurate**. Accurately defines the mole as 6.022 x 10^23 entities (Avogadro's number) regardless of particle type.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## What is a Mole? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | **A mole is simply a number** — a very large number that represents a fixed quantity of particles. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | $$\boxed{1 \text{ mole} = 6.022 \times 10^{23} \text{ particles}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | This number is called **Avogadro&#x27;s Number** (or Avogadro&#x27;s Constant), named after the Italian scientist Amedeo Avogadro. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | So, just like &quot;1 dozen&quot; always means 12 items (whether it&#x27;s 12 eggs or 12 pencils): | ANALOGY | {} | [&#x27;prose&#x27;] |
| p15 | **1 mole always means 6.022 × 10²³ particles** (whether it&#x27;s atoms, molecules, ions, or electrons) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Rationale for Avogadro's Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the physical reason Avogadro's number was chosen so that 1 mole of atoms in grams equals the element's atomic mass.

Accuracy: **accurate**. Accurately explains the connection between atomic mass in unified atomic mass units and mass in grams for 1 mole of atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## Why This Specific Number? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | This number isn&#x27;t random! It was chosen because: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | **1 mole of atoms of any element = the atomic mass of that element in grams** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Illustration: Carbon Mass and Atom Count (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole-to-mass principle using carbon, showing that 12 grams of carbon contains 6.022 x 10^23 atoms.

Accuracy: **accurate**. The introductory illustrative example with carbon-12 (12 u = 12 g/mol) is standard, simplified, and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### Example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | - Atomic mass of Carbon = 12 u (atomic mass units) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | - So, **12 grams of Carbon** contains exactly **6.022 × 10²³ atoms** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | - This gives us an easy way to convert between the *microscopic world* (atoms) and the *macroscopic world* (grams we can measure on a scale)! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: The Three Key Relationships and Conversion Formulas (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the mole acts as a central hub converting between number of particles, mass, and molar gas volume at STP, accompanied by explicit conversion formulas.

Accuracy: **accurate**. All conversion factors and formulas (Avogadro's number for particles, molar mass for grams, and 22.4 L/mol at STP for gas volume) are scientifically accurate within standard high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## The Three Key Relationships | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | The mole connects three important quantities: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;diagram&#x27;] |
| p28 |         NUMBER OF PARTICLES | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p29 |               ↑    ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p30 |          (× or ÷ by 6.022×10²³) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p31 |               ↑    ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p32 |             MOLES  ←→  MASS (grams) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p33 |               ↑    ↓         (× or ÷ by molar mass) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p34 |          (× or ÷ by 22.4 L) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p35 |               ↑    ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p36 |       VOLUME (for gases at STP) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p37 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;diagram&#x27;] |
| p38 | ### Key Formulas: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | &#124; To Find &#124; Formula &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p40 | &#124;---------&#124;---------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p41 | &#124; **Number of particles** &#124; Moles × 6.022 × 10²³ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p42 | &#124; **Mass** &#124; Moles × Molar Mass &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p43 | &#124; **Volume of gas at STP** &#124; Moles × 22.4 L &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Worked Problem: Calculating Atoms from Mass of Carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a step-by-step worked problem calculating the number of carbon atoms in a given mass (24 g).

Accuracy: **accurate**. The worked calculations for moles (24 / 12 = 2 mol) and number of atoms (2 * 6.022 x 10^23 = 1.2044 x 10^24 atoms) are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ## Worked Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | **Question:** How many atoms are present in 24 grams of Carbon? (Atomic mass of C = 12) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | **Step 1:** Find moles of Carbon | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | $$\text{Moles} = \frac{\text{Given Mass}}{\text{Molar Mass}} = \frac{24}{12} = 2 \text{ moles}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | **Step 2:** Find number of atoms | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p50 | $$\text{Number of atoms} = \text{Moles} \times 6.022 \times 10^{23}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | $$= 2 \times 6.022 \times 10^{23} = 1.2044 \times 10^{24} \text{ atoms}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Quick Summary of the Mole Concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p57", "quote": "even \"moles of pens\" if you wanted!"}]}

Annotation rationale: Recapitulates the main takeaways of the mole concept in bullet points for easy revision.

Accuracy: **accurate**. Correctly summarizes the core principles of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | ## Quick Summary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | ✅ **Mole** = A counting unit for extremely small particles   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p55 | ✅ **1 mole** = 6.022 × 10²³ particles (Avogadro&#x27;s Number)   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p56 | ✅ It bridges the gap between **atoms/molecules** (too small to weigh) and **grams** (which we can measure)   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p57 | ✅ Works for **any particle**: atoms, molecules, ions, electrons — even &quot;moles of pens&quot; if you wanted! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p58 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Dozen vs Mole Comparison Callout (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p59", "quote": "Just like a \"dozen\" doesn't care whether you're counting eggs or oranges"}]}

Annotation rationale: Reiterates the universal nature of the mole using a cross-domain comparison to a dozen of eggs or oranges.

Accuracy: **accurate**. The analogy accurately captures that a mole is a fixed quantity regardless of the nature of the particle counted.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p59 | **💡 Remember:** Just like a &quot;dozen&quot; doesn&#x27;t care whether you&#x27;re counting eggs or oranges, a &quot;mole&quot; doesn&#x27;t care whether you&#x27;re counting atoms, molecules, or ions — it&#x27;s ALWAYS 6.022 × 10²³ of them! | ANALOGY | {} | [&#x27;prose&#x27;] |

