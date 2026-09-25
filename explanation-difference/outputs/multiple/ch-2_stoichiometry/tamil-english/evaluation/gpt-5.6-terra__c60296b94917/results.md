# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains stoichiometry in Tamil, covering definitions, balancing equations, mole ratios, molar masses, worked calculation examples, limiting reactants, and percentage yield.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 163,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 163,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction and Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the study of mathematical quantitative relationships between reactants and products in a chemical reaction.

Accuracy: **accurate**. The definition of stoichiometry is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## ஸ்டாய்கியோமெட்ரி (Stoichiometry) என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **ஸ்டாய்கியோமெட்ரி** என்பது ஒரு வேதிவினையில் (chemical reaction) கலந்து கொள்ளும் பொருட்களின் **அளவுகளுக்கிடையிலான கணித உறவை**ப் படிப்பதாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | எளிமையாகச் சொன்னால்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | &gt; “ஒரு பொருள் எவ்வளவு எடுத்தால், அதற்கு எதிர்வினை செய்ய மற்றொரு பொருள் எவ்வளவு வேண்டும்? எவ்வளவு புதிய பொருள் உருவாகும்?”   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | &gt; என்பதைக் கணக்கிடுவதே ஸ்டாய்கியோமெட்ரி. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Balancing Equations and Mole Ratio (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how balancing a chemical reaction provides the mole ratio of reactants and products, using water formation as an illustrative case.

Accuracy: **accurate**. The reaction balancing and interpretation of stoichiometric coefficients as mole ratios are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## 1. சமன்பாட்டை சமநிலைப்படுத்துதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | H_2 + O_2 \rightarrow H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | இது சமநிலையற்ற சமன்பாடு. இடப்புறத்தில் ஆக்சிஜன் 2 அணுக்கள் உள்ளன; வலப்புறத்தில் 1 ஆக்சிஜன் மட்டுமே உள்ளது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | சமநிலைப்படுத்தினால்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | இதன் பொருள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | - 2 மோல் ஹைட்ரஜன் (\(H_2\)) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | - 1 மோல் ஆக்சிஜன் (\(O_2\)) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - வினைபுரிந்து | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - 2 மோல் நீர் (\(H_2O\)) உருவாகும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | இதிலுள்ள எண்கள் **மோல் விகிதம் (mole ratio)** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p24 | H_2 : O_2 : H_2O = 2 : 1 : 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: The Mole Concept and Avogadro's Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition of a mole and its relation to Avogadro's constant.

Accuracy: **accurate**. Avogadro's number and the concept of mole are accurately represented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## 2. மோல் (Mole) என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | வேதியியலில் மிகச் சிறிய துகள்களின் எண்ணிக்கையை அளவிட “மோல்” என்ற அலகு பயன்படுத்தப்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | 1 \text{ mole} = 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | துகள்கள் (அணுக்கள், மூலக்கூறுகள், அயனிகள்) ஆகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | - 1 மோல் நீர் = \(6.022 \times 10^{23}\) நீர் மூலக்கூறுகள் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | - 1 மோல் கார்பன் = \(6.022 \times 10^{23}\) கார்பன் அணுக்கள் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | ஆனால் கணக்குகளில் பெரும்பாலும் மோலை கிராமிலிருந்து மாற்றிப் பயன்படுத்துவோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Molar Mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass and illustrates how to compute it using the chemical formula of water.

Accuracy: **accurate**. The definition and calculation of the molar mass of water (18 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## 3. மோலர் நிறை (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | ஒரு பொருளின் 1 மோலின் நிறைதான் அதன் **மோலர் நிறை**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | ### உதாரணம்: நீர் \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | - H-ன் அணு நிறை = 1 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p42 | - O-ன் அணு நிறை = 16 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p43 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | H_2O = (2 \times 1) + 16 = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | அதாவது, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | 1 \text{ mole } H_2O = 18 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Steps for Solving Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable step-by-step procedure to solve stoichiometry calculations.

Accuracy: **accurate**. The 4-step procedure outlined is the standard and correct approach to stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | # ஸ்டாய்கியோமெட்ரி கணக்கிடும் படிகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | பொதுவாக பின்வரும் வழிமுறையைப் பின்பற்றலாம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | 1. **வேதிச் சமன்பாட்டை சமநிலைப்படுத்தவும்.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p54 | 2. கொடுக்கப்பட்ட நிறையை **மோலாக மாற்றவும்.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p55 | 3. சமன்பாட்டிலுள்ள **மோல் விகிதத்தை** பயன்படுத்தவும். | PROCEDURE | {} | [&#x27;list&#x27;] |
| p56 | 4. தேவைப்பட்டால் மோலை மீண்டும் **கிராமாக மாற்றவும்.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Worked Example: Formation of Water from Hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A complete worked calculation determining the mass of water produced from 4 g of hydrogen.

Accuracy: **accurate**. All steps and mathematical calculations for the synthesis of water are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ## உதாரணம் 1: ஹைட்ரஜனில் இருந்து நீர் உருவாகுதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | கேள்வி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | &gt; 4 g ஹைட்ரஜன் முழுமையாக ஆக்சிஜனுடன் வினைபுரிந்தால் எத்தனை கிராம் நீர் உருவாகும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | சமன்பாடு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p62 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p64 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | ### படி 1: \(H_2\)-ன் மோலர் நிறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | H_2 = 2 \times 1 = 2 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p68 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | ### படி 2: 4 g ஹைட்ரஜனை மோலாக மாற்றுதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p70 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | \text{Moles of } H_2 = \frac{4}{2} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | ### படி 3: மோல் விகிதம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | சமன்பாட்டில்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p75 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | 2H_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | அதாவது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p79 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | எனவே 2 mol \(H_2\) மூலம் 2 mol \(H_2O\) உருவாகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p83 | ### படி 4: நீரின் நிறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p84 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | H_2O = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | \text{Mass of } H_2O = 2 \times 18 = 36 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | ### விடை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | \boxed{36 \text{ g நீர் உருவாகும்}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Worked Example: Calcium Carbonate Decomposition (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A worked calculation finding the mass of carbon dioxide produced from the thermal decomposition of 100 g of calcium carbonate.

Accuracy: **accurate**. Calculations of molar mass for CaCO3 and CO2, stoichiometric mole ratio, and final mass of CO2 produced are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p95 | ## உதாரணம் 2: கால்சியம் கார்பனேட் சிதைவு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p96 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | கேள்வி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p100 | &gt; 100 g கால்சியம் கார்பனேட் (\(CaCO_3\)) வெப்பப்படுத்தப்பட்டால் எத்தனை கிராம் கார்பன் டைஆக்சைடு (\(CO_2\)) உருவாகும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p101 | ### படி 1: மோலர் நிறைகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | CaCO_3 = 40 + 12 + (3 \times 16) = 100 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | CO_2 = 12 + (2 \times 16) = 44 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | ### படி 2: சமன்பாட்டின் மோல் விகிதம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p109 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p110 | 1CaCO_3 \rightarrow 1CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p112 | அதாவது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p113 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | 1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p116 | 100 g \(CaCO_3\) = 1 mol. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p117 | எனவே உருவாகும் \(CO_2\) = 1 mol. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p118 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p119 | 1 \text{ mol } CO_2 = 44 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p120 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | ### விடை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p122 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | \boxed{44 \text{ g } CO_2 \text{ உருவாகும்}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Limiting Reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and demonstrates it with an illustrative example involving H2 and O2.

Accuracy: **accurate**. The definition of limiting reactant and the comparison between amounts of H2 and O2 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p126 | # முக்கியமான கருத்து: வரம்பிடும் வினைப்பொருள்   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p127 | ## (Limiting Reactant) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p128 | சில நேரங்களில் இரண்டு வினைப்பொருட்களும் கொடுக்கப்பட்டிருக்கும். அவற்றில் முதலில் முழுமையாகத் தீர்ந்துபோகும் பொருள் **வரம்பிடும் வினைப்பொருள்** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p129 | அதுவே எவ்வளவு விளைபொருள் உருவாகும் என்பதை நிர்ணயிக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p130 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p131 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | 2 mol \(H_2\) க்கு 1 mol \(O_2\) தேவை. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p135 | - உங்களிடம் 2 mol \(H_2\), 1 mol \(O_2\) இருந்தால் இரண்டும் முழுமையாக வினைபுரியும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p136 | - உங்களிடம் 2 mol \(H_2\), ஆனால் 0.5 mol \(O_2\) மட்டும் இருந்தால், ஆக்சிஜன் முதலில் தீர்ந்துவிடும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p137 | - எனவே \(O_2\) தான் **limiting reactant**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p138 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Percentage Yield (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines actual and theoretical yields, introduces the formula for percentage yield, and works through a numerical example.

Accuracy: **accurate**. The formulas, definitions, and calculation (30/36 * 100 = 83.3%) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p139 | # சதவீத விளைச்சல் (Percentage Yield) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p140 | கணக்கில் கிடைக்க வேண்டிய அளவு **தத்துவ விளைச்சல்** (Theoretical yield). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p141 | ஆய்வகத்தில் உண்மையில் கிடைக்கும் அளவு **உண்மையான விளைச்சல்** (Actual yield). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p142 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p143 | \text{Percentage Yield} = | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p144 | \frac{\text{Actual Yield}}{\text{Theoretical Yield}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p145 | \times 100 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p146 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p147 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p148 | கணக்குப்படி 36 g நீர் கிடைக்க வேண்டும். ஆனால் உண்மையில் 30 g மட்டுமே கிடைத்தது என்றால்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p149 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p150 | \text{Percentage Yield} = | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | \frac{30}{36} \times 100 = 83.3\% | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p153 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Summary of Stoichiometric Conversion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key flow of stoichiometry calculations: Grams to Moles to Mole Ratio to Grams.

Accuracy: **accurate**. The recap correctly summarizes the sequence of stoichiometric conversions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p154 | # நினைவில் வைத்துக்கொள்ள வேண்டிய சுருக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p155 | ஸ்டாய்கியோமெட்ரி கணக்குகளில்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p156 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p157 | \boxed{\text{கிராம்} \rightarrow \text{மோல்} \rightarrow \text{மோல் விகிதம்} \rightarrow \text{கிராம்}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p158 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p159 | அதாவது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p160 | 1. கிராமை மோலாக மாற்று   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p161 | 2. சமன்பாட்டின் விகிதத்தைப் பயன்படுத்து   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p162 | 3. மீண்டும் மோலை கிராமாக மாற்று   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p163 | இதுவே ஸ்டாய்கியோமெட்ரியின் அடிப்படை முறையாகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

