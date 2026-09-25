# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high school-level explanation of the mole concept, including Avogadro's number, molar mass, conversion formulas, worked examples, and stoichiometric application in chemical reactions.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 125,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 6,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 125,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 2,
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of mole to everyday counting units (dozen and pair) (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "நாம் தினசரி பொருட்களை எண்ணும்போது:"}, {"passage_id": "p3", "quote": "- 1 டஜன் = 12 பொருட்கள்  "}, {"passage_id": "p4", "quote": "- 1 ஜோடி = 2 பொருட்கள்  "}]}

Annotation rationale: Introduces the mole as a counting unit for particles in chemistry by comparing it to familiar counting units used in everyday life, such as a dozen and a pair, and introduces Avogadro's number.

Accuracy: **accurate**. The analogy accurately describes dozens and pairs as counting units and correctly states Avogadro's number as 6.022 x 10^23 particles per mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வேதியியலில் **“மோல்” (mole)** என்பது மிகச் சிறிய துகள்களை—அணுக்கள், மூலக்கூறுகள், அயன்கள் போன்றவற்றை—எண்ணுவதற்கான ஒரு அலகாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | நாம் தினசரி பொருட்களை எண்ணும்போது: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | - 1 டஜன் = 12 பொருட்கள்   | ANALOGY | {} | [&#x27;list&#x27;] |
| p4 | - 1 ஜோடி = 2 பொருட்கள்   | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | அதேபோல் வேதியியலில்: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | - **1 மோல் = \(6.022 \times 10^{23}\) துகள்கள்** | ANALOGY | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p7 | இந்த மிகப் பெரிய எண் **அவோகாட்ரோ எண்** (Avogadro’s number) எனப்படுகிறது. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Why the mole concept is needed (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "உதாரணமாக, ஒரு சிறிய துளி நீரில்கூட எண்ணிலடங்காத நீர் மூலக்கூறுகள் உள்ளன."}]}

Annotation rationale: Explains why chemists need the mole unit: individual atoms and molecules are far too small to be counted one by one, so grouping them into large packages (moles) makes them measurable.

Accuracy: **accurate**. The reasoning correctly articulates the physical motivation for the mole as a macroscopic unit representing immense microscopic particle counts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## 1. மோல் ஏன் தேவை? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | அணுக்கள் மற்றும் மூலக்கூறுகள் கண்களுக்குத் தெரியாத அளவுக்கு மிகச் சிறியவை. உதாரணமாக, ஒரு சிறிய துளி நீரில்கூட எண்ணிலடங்காத நீர் மூலக்கூறுகள் உள்ளன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | எனவே, ஒவ்வொரு அணுவையும் தனித்தனியாக எண்ண முடியாது. அதற்குப் பதிலாக, அதிக எண்ணிக்கையிலான துகள்களை ஒரு தொகுப்பாகக் குறிப்பிட **மோல்** பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Definition of 1 mole (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines that 1 mole of any substance contains exactly 6.022 x 10^23 particles.

Accuracy: **accurate**. Correctly states the general definition that one mole contains Avogadro's number of constituent particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## 2. 1 மோல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | **1 மோல் எந்தப் பொருளாக இருந்தாலும், அதில் \(6.022 \times 10^{23}\) துகள்கள் இருக்கும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u4: Example of 1 mole: hydrogen atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete illustrative example of 1 mole applied to atomic species (hydrogen atoms).

Accuracy: **accurate**. 1 mole of hydrogen atoms correctly equates to 6.022 x 10^23 hydrogen atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | உதாரணங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | - 1 மோல் ஹைட்ரஜன் அணுக்கள்   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 |   = \(6.022 \times 10^{23}\) ஹைட்ரஜன் அணுக்கள் | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u5: Example of 1 mole: water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete illustrative example of 1 mole applied to molecular species (water molecules).

Accuracy: **accurate**. 1 mole of water molecules correctly corresponds to 6.022 x 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | - 1 மோல் நீர் மூலக்கூறுகள் \((H_2O)\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 |   = \(6.022 \times 10^{23}\) நீர் மூலக்கூறுகள் | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u6: Example of 1 mole: sodium ions (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete illustrative example of 1 mole applied to ionic species (sodium cations).

Accuracy: **accurate**. 1 mole of sodium ions correctly corresponds to 6.022 x 10^23 sodium ions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | - 1 மோல் சோடியம் அயன்கள் \((Na^+)\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 |   = \(6.022 \times 10^{23}\) சோடியம் அயன்கள் | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Definition and units of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance, establishes its unit as g/mol, and explains its physical meaning.

Accuracy: **accurate**. Molar mass is accurately defined as the mass of 1 mole of a substance with the standard unit g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## 3. மோலர் நிறை (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | ஒரு பொருளின் **1 மோலின் நிறை**, அதன் **மோலர் நிறை** எனப்படும். இதன் அலகு: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | \text{g/mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | அதாவது, “ஒரு மோலுக்கு எத்தனை கிராம்?” என்பதைக் காட்டுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates molar mass calculation using atomic mass for carbon, connecting 12 g of carbon to 1 mole and Avogadro's number of atoms.

Accuracy: **accurate**. The atomic mass of carbon-12 (standard reference 12 g/mol) and its particle count are stated accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### உதாரணம் 1: கார்பன் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | கார்பனின் அணு நிறை = 12 | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p31 | அதனால்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | 1 \text{ mol கார்பன்} = 12 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | அதாவது, 12 கிராம் கார்பனில் \(6.022 \times 10^{23}\) கார்பன் அணுக்கள் உள்ளன. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u9: Molar mass of water (H2O) (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step how to compute molecular molar mass for water by summing the atomic masses of constituent atoms (H and O).

Accuracy: **accurate**. The calculation 2(1) + 16 = 18 g/mol for water is completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### உதாரணம் 2: நீர் \((H_2O)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | நீரில்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | - ஹைட்ரஜன் = 1 × 2 = 2   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p39 | - ஆக்சிஜன் = 16   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p40 | ஆக, | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | H_2O = 2 + 16 = 18 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | எனவே: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | 1 \text{ mol } H_2O = 18 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | அதாவது, 18 கிராம் நீரில் ஒரு மோல் நீர் மூலக்கூறுகள் உள்ளன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the key quantitative formula relating number of moles, mass, and molar mass: n = m / M, defining each variable.

Accuracy: **accurate**. The formula n = m / M and its parameter definitions are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ## 4. மோலைக் கணக்கிடும் முக்கிய சூத்திரம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | ஒரு பொருளின் நிறை தெரிந்தால், அதில் உள்ள மோல்களின் எண்ணிக்கையை இச்சூத்திரத்தால் கணக்கிடலாம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p52 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p53 | \text{மோல்களின் எண்ணிக்கை} = | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p54 | \frac{\text{பொருளின் நிறை (g)}}{\text{மோலர் நிறை (g/mol)}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p55 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p56 | அல்லது: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p58 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p59 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p60 | இங்கு: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p61 | - \(n\) = மோல்களின் எண்ணிக்கை   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p62 | - \(m\) = பொருளின் நிறை   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p63 | - \(M\) = மோலர் நிறை   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Worked problem: moles and molecules in 36 g of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a full numerical problem: finding the moles in 36 g of water (n = 36/18 = 2 mol) and then multiplying by Avogadro's number to find the number of molecules.

Accuracy: **accurate**. Calculations for moles (36 / 18 = 2 mol) and number of molecules (2 x 6.022 x 10^23 = 1.2044 x 10^24) are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ## 5. உதாரணக் கணக்கு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | ### கேள்வி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p67 | 36 கிராம் நீரில் எத்தனை மோல்கள் உள்ளன? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | நீரின் மோலர் நிறை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p69 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | H_2O = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | n = \frac{36}{18} = 2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | எனவே: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | \boxed{36 \text{ g நீர்} = 2 \text{ mol நீர்}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | இதில் உள்ள நீர் மூலக்கூறுகளின் எண்ணிக்கை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p80 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | மூலக்கூறுகள். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p87 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Calculating particle count from moles with oxygen example (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the formula for calculating total particles from moles by multiplying by Avogadro's number, accompanied by a brief calculation for 2 moles of oxygen.

Accuracy: **accurate**. The conversion formula (N = n x N_A) and the calculation for 2 moles of O2 giving 1.2044 x 10^24 molecules are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p88 | ## 6. மோல் மற்றும் துகள்களின் எண்ணிக்கை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | துகள்களின் எண்ணிக்கையைக் கண்டறிய: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p90 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p91 | \text{துகள்களின் எண்ணிக்கை} = | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p92 | \text{மோல்களின் எண்ணிக்கை} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p93 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p94 | உதாரணமாக, 2 மோல் ஆக்சிஜன் மூலக்கூறுகள் இருந்தால்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | = | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | ஆக்சிஜன் மூலக்கூறுகள் இருக்கும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p101 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Role of moles in chemical reactions and stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how stoichiometric coefficients in chemical balanced equations represent mole ratios rather than direct mass ratios, illustrated with the synthesis of water (2H2 + O2 -> 2H2O).

Accuracy: **accurate**. The interpretation of 2H2 + O2 -> 2H2O as 2 moles H2 reacting with 1 mole O2 to yield 2 moles H2O is accurate and clearly explains stoichiometric mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p102 | ## 7. வேதிவினைகளில் மோலின் பயன்பாடு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p103 | வேதிச் சமன்பாடுகளில் உள்ள எண்கள், துகள்களின் விகிதத்தையும் மோல்களின் விகிதத்தையும் காட்டுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p104 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p105 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | இதன் பொருள்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p109 | - 2 மோல் ஹைட்ரஜன்   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p110 | - 1 மோல் ஆக்சிஜன்   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p111 | வினைபுரிந்து, | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p112 | - 2 மோல் நீர்   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p113 | உருவாகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p114 | அதாவது, வேதிச் சமன்பாடுகள் “எத்தனை கிராம்?” என்பதை விட முதலில் “எத்தனை மோல்?” என்ற அடிப்படையில் செயல்படுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p115 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Summary of key mole concept points (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential points of the lesson including Avogadro's number, molar mass definition, the mole formula, and stoichiometry.

Accuracy: **accurate**. All summarized bullet points and concluding statements are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | ## நினைவில் கொள்ள வேண்டிய முக்கிய குறிப்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | 1. **1 மோல் = \(6.022 \times 10^{23}\) துகள்கள்** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p118 | 2. இந்த எண் **அவோகாட்ரோ எண்** எனப்படும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p119 | 3. **மோலர் நிறை** என்பது 1 மோல் பொருளின் நிறை. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p120 | 4. மோல்களைக் கணக்கிட: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p121 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p122 | \text{மோல்} = \frac{\text{நிறை}}{\text{மோலர் நிறை}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p123 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p124 | 5. வேதிவினைகளில் பொருட்களின் அளவைப் புரிந்துகொள்ள மோல் மிகவும் முக்கியம். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p125 | சுருக்கமாகச் சொன்னால், **மோல் என்பது அணுக்கள் மற்றும் மூலக்கூறுகளை மிகப் பெரிய தொகுப்புகளாக எண்ணும் வேதியியல் அலகு** ஆகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

