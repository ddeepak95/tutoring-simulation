# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains stoichiometry in Tamil tailored for high school students, including its formal definition, an everyday cooking analogy, step-by-step problem-solving methods, a worked calculation example, real-world applications, and study tips.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 40,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 40,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 6,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic concept of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the method of calculating quantitative relationships between reactants and products in chemical equations, briefly comparing it to a recipe.

Accuracy: **accurate**. The definition correctly identifies stoichiometry as calculating quantitative relationships between reactants and products in chemical equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Stoichiometry - ஒரு எளிய விளக்கம் (High School Student களுக்கு) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Stoichiometry என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Stoichiometry (ஸ்டாய்கியோமெட்ரி) என்பது **வேதியியல் சமன்பாடுகளில் (chemical equations) உள்ள reactants மற்றும் products இடையே உள்ள அளவு உறவை** கணக்கிடும் ஒரு முறை. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | எளிமையாக சொன்னால் - **&quot;ஒரு recipe போன்றது&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Dosa recipe analogy and molecular reaction interpretation (ANALOGY)

Attributes: {}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p6", "quote": "தோசை"}, {"passage_id": "p7", "quote": "1 கப் மாவு + 2 முட்டை = 4 தோசை"}]}

Annotation rationale: Explains stoichiometry via a cross-domain comparison using a dosa recipe (ingredients to output) and maps it directly to the synthesis of water from hydrogen and oxygen molecules.

Accuracy: **accurate**. The analogy accurately illustrates stoichiometric ratios, and the chemical equation correctly maps the 2:1:2 molecular ratio for the formation of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## ஒரு உதாரணத்துடன் புரிந்துகொள்வோம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | நீங்கள் ஒரு **தோசை** செய்கிறீர்கள் என வைத்துக்கொள்வோம்: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | - 1 கப் மாவு + 2 முட்டை = 4 தோசை | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | இதேபோல தான் வேதியியலிலும்: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | இதன் அர்த்தம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - **2 மூலக்கூறு Hydrogen** + **1 மூலக்கூறு Oxygen** → **2 மூலக்கூறு Water** உருவாகும் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Steps for solving stoichiometry calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the sequential steps required to perform stoichiometric calculations: balancing the reaction, using the mole ratio, and calculating mass using molar mass.

Accuracy: **accurate**. The outlined steps correctly describe the standard method for stoichiometric conversions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## முக்கிய படிகள் (Steps) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ### 1️⃣ சமன்பாட்டை Balance செய்யவும் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | வேதியியல் சமன்பாடு சரியாக balance ஆகி இருக்க வேண்டும் (இரு பக்கமும் atoms எண்ணிக்கை சமமாக இருக்க வேண்டும்) | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p15 | ### 2️⃣ Mole Concept பயன்படுத்தவும் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - Coefficients (எண்கள்) mole ratio-வை காட்டும் | PROCEDURE | {} | [&#x27;list&#x27;] |
| p17 | - 2H₂ + O₂ → 2H₂O என்றால், **2 mole H₂ க்கு 1 mole O₂** தேவை | PROCEDURE | {} | [&#x27;list&#x27;] |
| p18 | ### 3️⃣ Mass கணக்கிடவும் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | $$Mass = Moles \times Molar\ Mass$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |

## u4: Worked calculation for oxygen reacting with hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example with specific numerical givens to calculate the required mass of oxygen to react with 4g of hydrogen.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, moles of O2 needed = 1 mol, mass of O2 = 32g) are chemically and mathematically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## நடைமுறை உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | **கேள்வி:** 4g Hydrogen முழுவதும் வினைபுரிய, எத்தனை கிராம் Oxygen தேவை? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | **தீர்வு:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | 1. Moles of H₂ = 4g ÷ 2g/mol = **2 moles** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | 2. Ratio படி: 2 mol H₂ க்கு 1 mol O₂ தேவை | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | 3. Moles of O₂ = 1 mole | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | 4. Mass of O₂ = 1 × 32 = **32g** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Importance and applications of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why stoichiometry is important in various domains like industry, medicine, and environmental science using a structured table.

Accuracy: **accurate**. Correctly summarizes standard applications of stoichiometry in industrial chemical synthesis, pharmaceutical dosing, and environmental monitoring.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | &#124; பயன்பாடு &#124; விளக்கம் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p30 | &#124;---------&#124;----------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p31 | &#124; Industry &#124; எவ்வளவு raw material தேவை என கணக்கிட &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p32 | &#124; Medicine &#124; சரியான அளவு மருந்து தயாரிக்க &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p33 | &#124; Environment &#124; Pollution அளவை கணக்கிட &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u6: Problem-solving tips and strategies (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides practical recommendations and guidelines for students on how to successfully solve stoichiometry problems.

Accuracy: **accurate**. The tips highlight key foundational practices (balancing equations, mole ratios, molar mass formula) without error.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## நினைவில் கொள்ள வேண்டியவை (Tips) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | ✅ எப்போதும் **balanced equation** உடன் ஆரம்பிக்கவும் | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p36 | ✅ **Mole ratio** தான் stoichiometry-ன் அடிப்படை | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p37 | ✅ Formula: $Mass = Moles \times Molar\ Mass$ ஐ நினைவில் வைத்துக்கொள்ளுங்கள் | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u7: Summary recap of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concisely summarizes stoichiometry as a mathematical technique to calculate reactant-product amounts and closes with an invitation for student questions.

Accuracy: **accurate**. The summary accurately captures the fundamental objective of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | **சுருக்கமாக:** Stoichiometry என்பது &quot;எவ்வளவு reactant இருந்தால், எவ்வளவு product கிடைக்கும்&quot; என்பதை கணக்கிடும் கணித முறை! 🧪 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p40 | இதில் ஏதேனும் சந்தேகம் இருந்தால் கேளுங்கள்! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

