# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the mole concept in chemistry, including Avogadro's number, molar mass, conversion formulas between mass, moles, particle counts, and molar gas volume at STP, with worked examples.

## Counts

```json
{
  "total_content_units": 18,
  "substantive_content_units": 18,
  "total_passages": 166,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 9,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1,
    "CAVEAT": 1
  },
  "nested_passages": 166,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 17,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 18
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of mole and representative particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the need for a counting unit in chemistry, defines the mole and Avogadro's number, and details how the representative particle varies by substance type.

Accuracy: **accurate**. The definition of mole, the value of Avogadro's number (6.022 × 10^23), and the classification of representative particles are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## மோல் (Mole) கருத்து – எளிய விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | வேதியியலில் அணுக்கள், மூலக்கூறுகள் போன்றவை மிகவும் மிகச் சிறியவை. அவற்றை ஒன்றொன்றாக எண்ண முடியாது.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | அதனால், அவற்றை எண்ணுவதற்கு பயன்படுத்தப்படும் ஒரு பெரிய “எண்ணிக்கை அலகு” தான் **மோல் (mol)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### 1. மோல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | **1 மோல் = \(6.022 \times 10^{23}\)** துகள்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | இந்த எண்ணிக்கை **அவோகாட்ரோ எண் (Avogadro Number)** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | 1\ mol = 6.022 \times 10^{23}\ particles | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | இங்கே “துகள்கள்” என்பது சூழ்நிலைக்கேற்ப: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | - தனிமங்களுக்கு → அணுக்கள் (atoms) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p12 | - சேர்மங்களுக்கு → மூலக்கூறுகள் (molecules) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | - அயனிக் சேர்மங்களுக்கு → சூத்திர அலகுகள் (formula units) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | - அயன்களுக்கு → அயன்கள் (ions) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Representative particle example: hydrogen atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an illustrative example of representative particles in 1 mole of hydrogen atoms, attached to the shared section heading.

Accuracy: **accurate**. Correctly states that 1 mole of hydrogen atoms contains 6.022 × 10^23 hydrogen atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - 1 மோல் ஹைட்ரஜன் அணுக்கள் = \(6.022 \times 10^{23}\) ஹைட்ரஜன் அணுக்கள் | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Representative particle example: water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates that 1 mole of water consists of 6.022 × 10^23 water molecules.

Accuracy: **accurate**. Correctly specifies 6.022 × 10^23 molecules in 1 mole of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | - 1 மோல் நீர் \((H_2O)\) = \(6.022 \times 10^{23}\) நீர் மூலக்கூறுகள் | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Representative particle example: sodium chloride formula units (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates formula units in 1 mole of an ionic compound (sodium chloride), concluding the introductory examples section.

Accuracy: **accurate**. Correctly identifies formula units as the representative particle type for NaCl, containing 6.022 × 10^23 units per mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | - 1 மோல் சோடியம் குளோரைடு \((NaCl)\) = \(6.022 \times 10^{23}\) NaCl சூத்திர அலகுகள் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Counting analogy: mole compared to pair and dozen (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p26", "quote": "உதாரணமாக, “ஒரு டஜன் முட்டை” என்றால் 12 முட்டைகள்."}]}

Annotation rationale: Compares mole to common everyday counting units like pair and dozen, mentioning a dozen eggs.

Accuracy: **accurate**. The analogy between a dozen (12 items) and a mole (6.022 × 10^23 items) is an accurate and standard pedagogical comparison.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## 2. “டஜன்” போல மோல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | நாம் பொருட்களை எண்ணுவதற்கு: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p22 | - 1 ஜோடி = 2 | ANALOGY | {} | [&#x27;list&#x27;] |
| p23 | - 1 டஜன் = 12 | ANALOGY | {} | [&#x27;list&#x27;] |
| p24 | - 1 மோல் = \(6.022 \times 10^{23}\) | ANALOGY | {} | [&#x27;list&#x27;] |
| p25 | எனக் கொள்ளலாம். | ANALOGY | {} | [&#x27;prose&#x27;] |
| p26 | உதாரணமாக, “ஒரு டஜன் முட்டை” என்றால் 12 முட்டைகள்.   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p27 | அதேபோல் “ஒரு மோல் நீர்” என்றால் \(6.022 \times 10^{23}\) நீர் மூலக்கூறுகள். | ANALOGY | {} | [&#x27;prose&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Molar mass definition and numerical relation to atomic mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance, specifies its units (g/mol), and explains its numerical equivalence to atomic mass.

Accuracy: **accurate**. The definition of molar mass, units (g/mol), and relationship to atomic mass are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ## 3. மோலார் நிறை (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | **ஒரு பொருளின் 1 மோலின் நிறை** அதன் **மோலார் நிறை** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | அலகு: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p32 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p33 | g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p34 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p35 | ஒரு தனிமத்தின் அணு நிறை (Atomic mass) மற்றும் அதன் மோலார் நிறை எண்ணில் ஒரே மாதிரியாக இருக்கும்; அலகு மட்டும் மாறும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Molar mass calculation example: Carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates molar mass calculation and relationship to atomic mass and particle count for carbon.

Accuracy: **accurate**. 12 u atomic mass corresponds to 12 g/mol, meaning 12 g of carbon is 1 mol containing 6.022 × 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### உதாரணம் 1: கார்பன் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | கார்பனின் அணு நிறை = 12 u | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | அதன் மோலார் நிறை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | 12\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | அதாவது, | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | 12\ g \text{ கார்பன்} = 1\ mol \text{ கார்பன் அணுக்கள்} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | இதில் \(6.022 \times 10^{23}\) கார்பன் அணுக்கள் இருக்கும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Molar mass calculation example: Water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the molecular mass of water and relates it to molar mass and mole count.

Accuracy: **accurate**. The molecular mass calculation (2 × 1 + 16 = 18) and resulting molar mass (18 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### உதாரணம் 2: நீர் \((H_2O)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | நீரின் மூலக்கூறு நிறை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | H_2O = (2 \times 1) + 16 = 18 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | எனவே நீரின் மோலார் நிறை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | 18\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | அதாவது, | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | 18\ g \text{ நீர்} = 1\ mol \text{ நீர் மூலக்கூறுகள்} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formula relating moles to mass and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula n = m / M and defines each variable.

Accuracy: **accurate**. The equation n = m / M and its variable definitions are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | ## 4. நிறையிலிருந்து மோல் கண்டுபிடித்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | முக்கியமான சூத்திரம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p63 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p64 | \text{மோல்களின் எண்ணிக்கை} = \frac{\text{கொடுக்கப்பட்ட நிறை}}{\text{மோலார் நிறை}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | அல்லது, | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p67 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p68 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p69 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p70 | இங்கு: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p71 | - \(n\) = மோல்களின் எண்ணிக்கை | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p72 | - \(m\) = நிறை (g) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p73 | - \(M\) = மோலார் நிறை (g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u10: Worked example: Finding moles from mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the calculation of moles in 36 g of water.

Accuracy: **accurate**. Calculation 36 / 18 = 2 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p74 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p75 | 36 g நீரில் எத்தனை மோல் உள்ளது? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | நீரின் மோலார் நிறை = 18 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p77 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | n = \frac{36}{18} = 2\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | **பதில்: 36 g நீர் = 2 மோல் நீர்** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p81 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Formula relating particle count to moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for finding the number of particles by multiplying moles by Avogadro's number.

Accuracy: **accurate**. The formula particle count = moles × 6.022 × 10^23 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p82 | ## 5. மோலிலிருந்து துகள்களின் எண்ணிக்கை கண்டுபிடித்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p83 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p84 | \text{துகள்களின் எண்ணிக்கை} = \text{மோல்கள்} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p85 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u12: Worked example: Finding particles in 2 moles of oxygen molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the total number of oxygen molecules in 2 moles.

Accuracy: **accurate**. 2 × 6.022 × 10^23 = 1.2044 × 10^24 molecules is calculated accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p86 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | 2 மோல் ஆக்சிஜன் மூலக்கூறுகளில் எத்தனை மூலக்கூறுகள் உள்ளன? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p88 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | = 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | **பதில்: \(1.2044 \times 10^{24}\) ஆக்சிஜன் மூலக்கூறுகள்** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Formula relating moles to particle count (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the inverse formula for calculating moles from the number of particles.

Accuracy: **accurate**. The equation moles = particles / (6.022 × 10^23) is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p96 | ## 6. துகள்களின் எண்ணிக்கையிலிருந்து மோல் கண்டுபிடித்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p97 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p98 | \text{மோல்கள்} = | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p99 | \frac{\text{துகள்களின் எண்ணிக்கை}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p100 | {6.022 \times 10^{23}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p101 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u14: Worked example: Finding moles from particle count of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the calculation of moles given 3.011 × 10^23 water molecules.

Accuracy: **accurate**. (3.011 × 10^23) / (6.022 × 10^23) = 0.5 mol is calculated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p102 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p103 | \(3.011 \times 10^{23}\) நீர் மூலக்கூறுகள் எத்தனை மோல்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p104 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | n = \frac{3.011 \times 10^{23}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | {6.022 \times 10^{23}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | n = 0.5\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p110 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | **பதில்: 0.5 மோல்** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p112 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar volume and states that 1 mol of any ideal gas occupies 22.4 L at standard temperature and pressure (0 °C, 1 atm).

Accuracy: **accurate**. Standard high school chemistry definition: at STP (0 °C, 1 atm), 1 mol of gas occupies 22.4 L.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p113 | ## 7. வாயுக்களுக்கும் மோல் தொடர்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p114 | STP நிலையில் (0°C மற்றும் 1 atm அழுத்தம்), | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p115 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p116 | 1\ mol \text{ எந்த வாயுவும்} = 22.4\ L | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p117 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p118 | இதனை **மோலார் கனஅளவு (Molar Volume)** என்பர். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u16: Worked example: Volume of 2 moles of oxygen gas at STP (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the molar volume relationship to calculate the volume occupied by 2 moles of oxygen gas at STP.

Accuracy: **accurate**. V = 2 × 22.4 = 44.8 L is calculated accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p119 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p120 | STP நிலையில் 2 மோல் ஆக்சிஜன் வாயுவின் கனஅளவு: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p121 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | V = 2 \times 22.4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | V = 44.8\ L | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u17: Summary recap: key relationships and conversion formulas (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Consolidates and summarizes formulas and relationships in a structured review section and table.

Accuracy: **accurate**. The recap correctly summarizes the three core interconversions (mass, particle count, and STP volume).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p128 | ## முக்கியமான தொடர்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p129 | ### நிறை ↔ மோல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p130 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p131 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p132 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p133 | ### மோல் ↔ துகள்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p134 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p135 | N = n \times N_A | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p136 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p137 | இங்கு, | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p138 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p139 | N_A = 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p140 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p141 | ### வாயு கனஅளவு ↔ மோல் (STP) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p142 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p143 | n = \frac{V}{22.4} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p144 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p145 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p146 | ## ஒரு சிறிய சுருக்க அட்டவணை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p147 | &#124; அளவு &#124; தொடர்பு &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p148 | &#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p149 | &#124; 1 மோல் &#124; \(6.022 \times 10^{23}\) துகள்கள் &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p150 | &#124; மோல்களின் எண்ணிக்கை &#124; \(\frac{\text{நிறை}}{\text{மோலார் நிறை}}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p151 | &#124; துகள்களின் எண்ணிக்கை &#124; மோல் × அவோகாட்ரோ எண் &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p152 | &#124; STP-இல் 1 மோல் வாயு &#124; 22.4 L &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p153 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u18: Misconception: Distinguishing mole as a count versus mass (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the common student misconception that mole represents mass rather than count, emphasizing that 1 mole of different substances has equal particles but differing masses.

Accuracy: **accurate**. Accurately targets the distinction between number of entities and mass, using correct molar masses for H2, O2, H2O, and CO2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p154 | ## நினைவில் வைத்துக்கொள்ள வேண்டியது | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p155 | - **மோல் என்பது நிறை அல்ல; அது துகள்களின் எண்ணிக்கையைக் குறிக்கும் அலகு.** | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p156 | - ஆனால் ஒவ்வொரு பொருளுக்கும் 1 மோலின் நிறை வேறுபடும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p157 | - உதாரணமாக: | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p158 |   - 1 மோல் H₂ = 2 g | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p159 |   - 1 மோல் O₂ = 32 g | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p160 |   - 1 மோல் H₂O = 18 g | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p161 |   - 1 மோல் CO₂ = 44 g | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p162 | அனைத்திலும் துகள்களின் எண்ணிக்கை ஒன்றே: | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p163 | \[ | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p164 | 6.022 \times 10^{23} | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p165 | \] | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;equation&#x27;] |
| p166 | ஆனால் அவற்றின் நிறை மட்டும் வேறுபடும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

