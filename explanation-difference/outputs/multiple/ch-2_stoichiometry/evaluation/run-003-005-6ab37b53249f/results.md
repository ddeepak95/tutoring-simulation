# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly introduces and explains stoichiometry, including its role in chemical equations and a worked mass-to-mass stoichiometry calculation.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 18,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2
  },
  "nested_passages": 18,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry, explaining what it is and how it relates the quantities and mole ratios of reactants and products in chemical equations.

Accuracy: **accurate**. The definition accurately captures stoichiometry as the study of quantitative relationships and mole ratios between reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! இன்று நாம் ஸ்டோயிகியோமெட்ரி (stoichiometry) பற்றி படிக்க போகிறோம். ஸ்டோயிகியோமெட்ரி என்றால் என்ன? அது எவ்வாறு வேதியியல் சமன்பாடுகளில் பயன்படுத்தப்படுகிறது என்பதை தெரிந்து கொள்வோம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **ஸ்டோயிகியோமெட்ரி என்றால் என்ன?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஸ்டோயிகியோமெட்ரி என்பது வேதியியல் சமன்பாடுகளில் உள்ள வினைபொருட்கள் மற்றும் விளைபொருட்களின் அளவுகளுக்கு இடையே உள்ள தொடர்பை பற்றியது. இது வேதியியல் வினைகளில் பங்குபெறும் தனிமங்கள் அல்லது சேர்மங்களின் மோல் விகிதத்தை கணக்கிட உதவுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Concept of a Chemical Equation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a chemical equation is and explains that it provides information regarding reactants and products.

Accuracy: **accurate**. The explanation correctly defines a chemical equation and its constituent components (reactants and products).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **வேதியியல் சமன்பாடு** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | ஒரு வேதியியல் சமன்பாடு என்பது ஒரு வேதியியல் வினையை விளக்கும் ஒரு குறியீடு. இதில் வினைபொருட்கள் (reactants) மற்றும் விளைபொருட்கள் (products) சம்பந்தப்பட்ட தகவல்கள் இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Illustration of a Chemical Equation: Formation of Water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a balanced chemical equation for the formation of water to illustrate reactants and products.

Accuracy: **accurate**. The balanced chemical equation for water synthesis (2H₂ + O₂ → 2H₂O) and the identification of reactants and products are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | உதாரணமாக, ஹைட்ரஜன் மற்றும் ஆக்ஸிஜன் இணைந்து நீர் உருவாவதை கீழ்க்கண்ட சமன்பாடு மூலம் குறிப்பிடலாம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | 2H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p8 | இங்கு, 2H₂ மற்றும் O₂ வினைபொருட்கள், 2H₂O விளைபொருள். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Worked Stoichiometric Mass Calculation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked stoichiometric calculation using the water synthesis reaction, finding the mass of oxygen needed to react completely with 4 grams of hydrogen.

Accuracy: **accurate**. The molar masses, mole-to-mass conversions, stoichiometric ratios, and final calculation (4 g of H₂ reacts with 32 g of O₂) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **ஸ்டோயிகியோமெட்ரி கணக்கீடு** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | இப்போது, ஸ்டோயிகியோமெட்ரி கணக்கீட்டை பார்ப்போம். மேலே உள்ள சமன்பாட்டில், 2 மோல் ஹைட்ரஜன் (H₂) 1 மோல் ஆக்ஸிஜனுடன் (O₂) வினைபுரிந்து 2 மோல் நீரை (H₂O) உருவாக்குகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | இதிலிருந்து, நமக்கு தெரிந்தால்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | * 1 மோல் H₂ = 2 கிராம் H₂ (ஹைட்ரஜனின் மோலார் நிறை) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | * 1 மோல் O₂ = 32 கிராம் O₂ (ஆக்ஸிஜனின் மோலார் நிறை) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | * 1 மோல் H₂O = 18 கிராம் H₂O (நீரின் மோலார் நிறை) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | என்றால், 4 கிராம் H₂ எவ்வளவு O₂ உடன் வினைபுரியும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | விடை: 2 மோல் H₂ = 4 கிராம் H₂. சமன்பாட்டின்படி, 2 மோல் H₂ 1 மோல் O₂ உடன் வினைபுரியும். எனவே, 4 கிராம் H₂ 32 கிராம் O₂ உடன் வினைபுரியும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | இவ்வாறு, ஸ்டோயிகியோமெட்ரி மூலம் வேதியியல் சமன்பாடுகளில் உள்ள வினைபொருட்கள் மற்றும் விளைபொருட்களின் அளவுகளை கணக்கிட முடியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | இன்றைய பாடம் இதோடு முடிந்தது. உங்களுக்கு ஏதேனும் சந்தேகம் இருந்தால் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

