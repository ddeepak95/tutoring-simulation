# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains stoichiometry (வினைக் கூறுகளின் விகிதம்), covering mole ratios from balanced equations, the law of conservation of mass, mass ratios, and limiting reactants with worked and illustrative examples.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 81,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 81,
  "unique_subtopics": 6,
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

## u1: Definition of stoichiometric ratio of reactants (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what stoichiometric ratios represent in a chemical reaction and how they are indicated by coefficients in a balanced equation.

Accuracy: **accurate**. Correctly defines the ratio of reactants in terms of stoichiometric coefficients in a balanced chemical equation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வேதி வினையில் **வினைக் கூறுகளின் விகிதம்** என்பது, ஒரு வேதி வினை சரியாக நடைபெற வினைப்பொருட்கள் எவ்வளவு அளவில் சேர வேண்டும் என்பதைக் காட்டுகிறது. இந்த விகிதம், **சமநிலைப்படுத்தப்பட்ட வேதி சமன்பாட்டில்** உள்ள எண்களால் (குணகங்கள்) அறியப்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Water formation reaction mole ratio (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates mole ratios using the formation of water from hydrogen and oxygen.

Accuracy: **accurate**. The reaction 2H2 + O2 -> 2H2O and its 2:1 mole ratio of H2 to O2 are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ## 1. உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஹைட்ரஜன் மற்றும் ஆக்சிஜன் சேர்ந்து நீர் உருவாகும் வினை: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p4 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p5 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p6 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p7 | இதன் பொருள்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - 2 மூல்கள் ஹைட்ரஜன் \((H_2)\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - 1 மூல் ஆக்சிஜன் \((O_2)\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | சேர்ந்து | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | - 2 மூல்கள் நீர் \((H_2O)\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | உருவாக்குகின்றன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | அதாவது, ஹைட்ரஜன் : ஆக்சிஜன் விகிதம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | 2 : 1 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | இது **மூல் விகிதம்** ஆகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Law of conservation of mass explaining stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that atoms cannot be created or destroyed in chemical reactions, which is why coefficients must be balanced.

Accuracy: **accurate**. Correctly states the law of conservation of mass as the fundamental basis for balancing chemical equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ## 2. குணகங்கள் ஏன் முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | வேதி வினைகளில் அணுக்கள் உருவாகவோ அழியவோ முடியாது. அவை ஒரு பொருளிலிருந்து மற்றொரு பொருளுக்கு மறுசீரமைக்கப்படுகின்றன. இதை **நிறை நிலைத்தன்மை விதி** என்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Balancing the equation for water synthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates balancing H2 + O2 -> H2O to 2H2 + O2 -> 2H2O by counting atoms on each side.

Accuracy: **accurate**. The atom counting and balancing steps are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | உதாரணமாக: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | H_2 + O_2 \rightarrow H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | என்று எழுதினால் இடப்புறத்தில் 2 ஆக்சிஜன் அணுக்கள் உள்ளன; வலப்புறத்தில் 1 ஆக்சிஜன் அணு மட்டுமே உள்ளது. எனவே இது சமநிலையற்ற சமன்பாடு. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | சரியான சமநிலைப்படுத்தப்பட்ட சமன்பாடு: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | இப்போது இருபுறங்களிலும்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | - ஹைட்ரஜன் அணுக்கள் = 4 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - ஆக்சிஜன் அணுக்கள் = 2 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | என சமமாக உள்ளன. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Mole ratios in ammonia synthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents N2 + 3H2 -> 2NH3 and derives pair-wise stoichiometric mole ratios.

Accuracy: **accurate**. The equation N2 + 3H2 -> 2NH3 and all deduced mole ratios (1:3, 1:2, 3:2) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ## 3. மற்றொரு உதாரணம்: அமோனியா தயாரித்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | N_2 + 3H_2 \rightarrow 2NH_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | இதில்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | - நைட்ரஜன் : ஹைட்ரஜன் = \(1:3\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p41 | - நைட்ரஜன் : அமோனியா = \(1:2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p42 | - ஹைட்ரஜன் : அமோனியா = \(3:2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p43 | அதாவது, 1 மூல் நைட்ரஜனுடன் 3 மூல்கள் ஹைட்ரஜன் முழுமையாக வினைபுரிந்தால், 2 மூல்கள் அமோனியா உருவாகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Distinction between mole ratio and mass ratio (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that reaction coefficients represent mole ratios rather than direct mass ratios.

Accuracy: **accurate**. Correctly states that coefficients represent moles and do not directly equal mass ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p45 | ## 4. மூல் விகிதமும் நிறை விகிதமும் ஒன்றா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | இல்லை. சமன்பாட்டிலுள்ள எண்கள் பொதுவாக **மூல் விகிதத்தை** குறிக்கின்றன; அவை நேரடியாக நிறை விகிதம் அல்ல. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Converting mole ratio to mass ratio for water formation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through molar mass multiplication to convert the 2:1 mole ratio of H2 to O2 into a 1:8 mass ratio.

Accuracy: **accurate**. Calculations are exact: 4 g H2 reacts with 32 g O2, giving a mass ratio of 4:32 = 1:8.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | நீருக்கான வினையை எடுத்துக்கொள்வோம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | - 1 மூல் \(H_2\) நிறை = 2 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p52 | - 1 மூல் \(O_2\) நிறை = 32 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p53 | அதனால்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | - 2 மூல்கள் \(H_2\) = \(2 \times 2 = 4\) g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p55 | - 1 மூல் \(O_2\) = 32 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p56 | எனவே நிறை விகிதம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | H_2 : O_2 = 4:32 = 1:8 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | அதாவது, 1 g ஹைட்ரஜன் முழுமையாக வினைபுரிய 8 g ஆக்சிஜன் தேவைப்படும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Concept of limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is when reactants are not present in stoichiometric proportions.

Accuracy: **accurate**. Accurately defines limiting reactant (வரம்பு வினைப்பொருள்) as the reactant consumed completely first.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p62 | ## 5. அதிகமாக இருக்கும் வினைப்பொருள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | தேவையான விகிதத்தில் வினைப்பொருட்கள் இல்லாவிட்டால், ஒன்று முதலில் முழுமையாக முடிந்து விடும். அதனை **வரம்பு வினைப்பொருள்** (limiting reactant) என்போம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u9: Determining limiting and excess reactant with 2 mol H2 and 2 mol O2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numeric scenario determining the limiting reactant and excess reactant given 2 moles of H2 and 2 moles of O2.

Accuracy: **accurate**. Correctly shows that 2 moles of H2 require only 1 mole of O2, leaving 1 mole of O2 in excess and identifying H2 as the limiting reactant.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | உதாரணமாக, விகிதம் \(2H_2 : 1O_2\) ஆக இருக்க வேண்டும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p65 | ஆனால் உங்களிடம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p66 | - 2 மூல்கள் \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p67 | - 2 மூல்கள் \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p68 | இருந்தால், 2 மூல்கள் ஹைட்ரஜனுக்கு 1 மூல் ஆக்சிஜன் மட்டுமே தேவை. எனவே: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p69 | - ஹைட்ரஜன் முழுமையாக முடியும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p70 | - 1 மூல் ஆக்சிஜன் மீதமாக இருக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p71 | - ஹைட்ரஜன் வரம்பு வினைப்பொருள். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Summary points and rule on changing coefficients versus subscripts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key concepts learned about stoichiometry and reminds students not to alter chemical subscripts when balancing.

Accuracy: **accurate**. All summary points and the warning against modifying chemical formula subscripts (contrasting 2H2O with H4O2) are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p73 | ## நினைவில் கொள்ள வேண்டியவை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | 1. வேதி சமன்பாட்டை முதலில் சமநிலைப்படுத்த வேண்டும்.   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p75 | 2. சமன்பாட்டிலுள்ள குணகங்கள் வினைப்பொருட்களின் **மூல் விகிதத்தை** காட்டும்.   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p76 | 3. சரியான விகிதத்தில் சேர்த்தால் வினை முழுமையாக நடைபெறும்.   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p77 | 4. விகிதம் தவறினால், ஒரு வினைப்பொருள் மீதமாக இருக்கும்.   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p78 | 5. குணகங்களை மாற்றலாம்; ஆனால் ஒரு சேர்மத்தின் கீழெழுத்து எண்களை மாற்றக்கூடாது.   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p79 |    - சரி: \(2H_2O\)   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p80 |    - தவறு: \(H_4O_2\)   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p81 | சுருக்கமாக, வேதி வினைக் கூறுகளின் விகிதம் என்பது “எந்தப் பொருள் எவ்வளவு அளவு மற்றொரு பொருளுடன் வினைபுரியும்?” என்பதைச் சொல்லும் கணிதத் தொடர்பாகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

