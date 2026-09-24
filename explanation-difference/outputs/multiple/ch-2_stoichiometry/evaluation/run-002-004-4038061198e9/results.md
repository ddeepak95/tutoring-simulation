# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response explains stoichiometry in Tamil, covering its definition, underlying principle (conservation of mass), mole ratio interpretation in balanced equations, calculation procedure, a worked numerical example, and practical significance.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 39,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 2,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 39,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the method of calculating quantities of reactants and products involved in a chemical reaction.

Accuracy: **accurate**. The definition accurately captures stoichiometry as quantitative calculations involving reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # வேதி வினைக் கூறுகளின் விகிதம் (Stoichiometry) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## அறிமுகம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | வேதிவினையில் ஈடுபடும் **வினைபடு பொருட்கள்** (Reactants) மற்றும் உருவாகும் **விளைபொருட்களின்** (Products) அளவு தொடர்பான கணக்கீட்டு முறையே **வேதி வினைக் கூறுகளின் விகிதம்** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Underlying principle: Law of conservation of mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the law of conservation of mass dictates that total mass before and after a reaction is conserved, requiring chemical equations to be balanced.

Accuracy: **accurate**. The explanation correctly links the law of conservation of mass to mass conservation and the requirement for balancing chemical equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## அடிப்படைக் கோட்பாடு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | வேதிவினையில் **பொருள் அழிவதும் இல்லை, புதிதாக உருவாவதும் இல்லை** (Law of Conservation of Mass). எனவே: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - வினைக்கு முன் இருக்கும் மொத்த நிறை = வினைக்குப் பின் இருக்கும் மொத்த நிறை | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - இதனால், ஒரு சமன்படுத்தப்பட்ட வேதிச் சமன்பாட்டில் அணுக்களின் எண்ணிக்கை இரு பக்கமும் சமமாக இருக்க வேண்டும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Mole ratios in water formation reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates mole ratios using the balanced chemical reaction of hydrogen and oxygen forming water.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O and corresponding mole ratios (2:1:2) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## எடுத்துக்காட்டு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | **ஹைட்ரஜன் மற்றும் ஆக்ஸிஜன் இணைந்து நீர் உருவாகும் வினை:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | இங்கு: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | &#124; பொருள் &#124; மோல் விகிதம் &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124;--------&#124;-------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; H₂ &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; O₂ &#124; 1 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124; H₂O &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | **இதன் பொருள்:** 2 மோல் ஹைட்ரஜன், 1 மோல் ஆக்ஸிஜனுடன் வினைபுரிந்து, 2 மோல் நீர் உருவாக்குகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Mole calculation formula (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard mathematical relation between mass, molar mass, and moles.

Accuracy: **accurate**. The formula correctly gives number of moles as given mass (g) divided by molar mass (g/mol).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## முக்கியமான படிகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | ### 1. மோல் கருத்து (Mole Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | $$\text{மோல் எண்ணிக்கை} = \frac{\text{கொடுக்கப்பட்ட நிறை (g)}}{\text{மோலார் நிறை (g/mol)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u5: Steps for stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the general four-step procedure used to solve stoichiometry problems.

Accuracy: **accurate**. The sequence of steps (balance equation, find moles of given substance, determine moles of desired substance using mole ratio, convert to mass) is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### 2. கணக்கீட்டு முறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | 1. வேதிச் சமன்பாட்டை சமன்படுத்துக | PROCEDURE | {} | [&#x27;list&#x27;] |
| p23 | 2. கொடுக்கப்பட்ட பொருளின் மோல் எண்ணிக்கையைக் கணக்கிடுக | PROCEDURE | {} | [&#x27;list&#x27;] |
| p24 | 3. மோல் விகிதத்தைப் பயன்படுத்தி தேவையான பொருளின் மோல் எண்ணிக்கையைக் காண்க | PROCEDURE | {} | [&#x27;list&#x27;] |
| p25 | 4. அதை நிறையாக மாற்றுக | PROCEDURE | {} | [&#x27;list&#x27;] |

## u6: Worked stoichiometric calculation for water synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked numerical calculation to find the mass of oxygen required to react with 4g of hydrogen.

Accuracy: **accurate**. All calculations and values are correct: 4 g / 2 g/mol = 2 mol H2; 2 mol H2 requires 1 mol O2; 1 mol * 32 g/mol = 32 g O2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## எடுத்துக்காட்டு கணக்கு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | **கேள்வி:** 4g ஹைட்ரஜன் முழுவதுமாக வினைபுரிய எத்தனை கிராம் ஆக்ஸிஜன் தேவை? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | **தீர்வு:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | - H₂ மோலார் நிறை = 2 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | - H₂ மோல் எண்ணிக்கை = 4/2 = 2 மோல் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | - சமன்பாட்டின்படி: 2 மோல் H₂ க்கு 1 மோல் O₂ தேவை | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - O₂ மோலார் நிறை = 32 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | - தேவையான O₂ நிறை = 1 × 32 = **32 கிராம்** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Significance and uses of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the practical applications and importance of stoichiometry in predicting reaction quantities, industrial production, and laboratory work.

Accuracy: **accurate**. The listed applications in reaction estimation, chemical industry, and laboratory calculations are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## முடிவுரை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | வேதி வினைக் கூறுகளின் விகிதம் என்பது: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p36 | - வினையின் **அளவை கணிக்க** உதவுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - **தொழிற்சாலைகளில்** எந்த அளவு மூலப்பொருள் தேவை என அறிய உதவுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | - **ஆய்வகங்களில்** துல்லியமான கணக்கீடுகளுக்கு பயன்படுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Advice on practicing stoichiometry problems (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Encourages the student to solve more practice problems to gain a strong understanding of stoichiometry.

Accuracy: **accurate**. Sound pedagogical study advice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | இந்த கருத்தை நன்கு புரிந்துகொள்ள, அதிக பயிற்சி கணக்குகள் செய்வது அவசியம்! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

