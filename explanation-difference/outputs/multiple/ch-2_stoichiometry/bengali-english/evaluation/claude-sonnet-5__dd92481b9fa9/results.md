# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate explanation of stoichiometry in Bengali, covering its definition, balanced chemical equations, mole ratios, a worked example, related concepts such as limiting reagents and percent yield, a problem-solving strategy, and a practice question.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 49,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 49,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Etymology of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the quantitative relationship between reactants and products in a chemical reaction and breaks down its Greek linguistic roots.

Accuracy: **accurate**. The definition of stoichiometry and the Greek root words (stoicheion = element, metron = measure) are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # স্টয়কিওমেট্রি (Stoichiometry) - সহজ ভাষায় ব্যাখ্যা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | আচ্ছা, আজকে আমরা রসায়নের একটি গুরুত্বপূর্ণ বিষয় **স্টয়কিওমেট্রি** নিয়ে আলোচনা করব। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## স্টয়কিওমেট্রি কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | স্টয়কিওমেট্রি হলো রসায়নের এমন একটি শাখা যেখানে আমরা **রাসায়নিক বিক্রিয়ায় বিভিন্ন পদার্থের পরিমাণগত সম্পর্ক** নিয়ে কাজ করি। অর্থাৎ, একটি বিক্রিয়ায় কতটুকু বিক্রিয়ক (Reactant) লাগবে এবং কতটুকু উৎপাদ (Product) তৈরি হবে - তা হিসাব করাই স্টয়কিওমেট্রির কাজ। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | **গ্রিক শব্দ থেকে এসেছে:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - Stoicheion = উপাদান (Element) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - Metron = পরিমাপ (Measure) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Balanced Chemical Equations as the Basis of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that balanced chemical equations are the prerequisite for stoichiometry and that reaction coefficients denote molar proportions.

Accuracy: **accurate**. Accurately describes how the stoichiometric coefficients in 2H2 + O2 -> 2H2O relate molar amounts of reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## মূল ভিত্তি: ভারসাম্যপূর্ণ সমীকরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | স্টয়কিওমেট্রি বুঝতে হলে প্রথমে দরকার একটি **balanced chemical equation**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | উদাহরণ দেখি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | এখানে সহগ (coefficient) গুলো (2, 1, 2) আমাদের বলে দেয়: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | - **2 mol** হাইড্রোজেন + **1 mol** অক্সিজেন → **2 mol** পানি তৈরি করে | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Mole Ratios in Stoichiometric Calculations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains mole ratios derived from a balanced equation and how they allow determination of unknown quantities from known quantities.

Accuracy: **accurate**. The mole ratios for the water synthesis reaction are written correctly, and their role as conversion factors is accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## মোল অনুপাত (Mole Ratio) - স্টয়কিওমেট্রির প্রাণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | উপরের সমীকরণ থেকে আমরা পাই: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | $$\frac{H_2}{O_2} = \frac{2}{1}, \quad \frac{H_2}{H_2O} = \frac{2}{2}, \quad \frac{O_2}{H_2O} = \frac{1}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p17 | এই অনুপাতগুলো ব্যবহার করেই আমরা যেকোনো একটি পদার্থের পরিমাণ জানলে বাকিগুলো বের করতে পারি। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Worked Example: Calculating Mass of Water Produced from Given Mass of Hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates a complete four-step calculation determining the mass of water formed from 4 grams of hydrogen gas.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, moles of H2O = 2 mol, mass of H2O = 36 g) are mathematically and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## সমস্যা সমাধানের ধাপসমূহ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | চলো একটি উদাহরণ দিয়ে বুঝি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | **সমস্যা:** 4 gram H₂ সম্পূর্ণ বিক্রিয়া করলে কত গ্রাম H₂O তৈরি হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | ### ধাপ ১: সমীকরণ লিখে ব্যালেন্স করো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | ### ধাপ ২: দেওয়া ভরকে মোলে রূপান্তর করো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | $$\text{মোল} = \frac{\text{ভর}}{\text{আণবিক ভর}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | $$n(H_2) = \frac{4g}{2 \, g/mol} = 2 \, mol$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | ### ধাপ ৩: মোল অনুপাত ব্যবহার করো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | সমীকরণ অনুযায়ী, 2 mol H₂ → 2 mol H₂O | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | তাই, 2 mol H₂ থেকে **2 mol H₂O** তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | ### ধাপ ৪: মোলকে আবার ভরে রূপান্তর করো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | $$\text{ভর} = \text{মোল} \times \text{আণবিক ভর}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | $$\text{ভর}(H_2O) = 2 \, mol \times 18 \, g/mol = 36 \, gram$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | **উত্তর: 36 গ্রাম পানি উৎপন্ন হবে।** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Key Concepts: Limiting Reagent, Excess Reagent, and Yields (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a summary table defining essential stoichiometric terms including limiting reagent, excess reagent, theoretical yield, actual yield, and percentage yield.

Accuracy: **accurate**. All definitions and the percentage yield formula are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## গুরুত্বপূর্ণ ধারণা যা জানা দরকার | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | &#124; ধারণা &#124; ব্যাখ্যা &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p35 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p36 | &#124; **Limiting Reagent** &#124; যে বিক্রিয়ক আগে শেষ হয়ে যায় এবং বিক্রিয়া থামিয়ে দেয় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p37 | &#124; **Excess Reagent** &#124; যে বিক্রিয়ক অতিরিক্ত থেকে যায় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p38 | &#124; **Theoretical Yield** &#124; তাত্ত্বিকভাবে যতটুকু উৎপাদ পাওয়া উচিত &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p39 | &#124; **Actual Yield** &#124; বাস্তবে পরীক্ষাগারে যতটুকু পাওয়া যায় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p40 | &#124; **Percentage Yield** &#124; $\frac{\text{Actual Yield}}{\text{Theoretical Yield}} \times 100\%$ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u6: Problem-Solving Roadmap Trick (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a high-level flowchart outlining the sequence of conversions required in stoichiometry problems.

Accuracy: **accurate**. The conversion sequence from given mass/volume to given moles to desired moles to desired mass/volume is the standard stoichiometric pathway.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ## মনে রাখার সহজ কৌশল (Trick) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | স্টয়কিওমেট্রি সমস্যা সমাধানের সময় সবসময় এই পথ অনুসরণ করো: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p43 | $$\text{ভর/আয়তন (দেওয়া)} \rightarrow \text{মোল (দেওয়া)} \rightarrow \text{মোল (চাওয়া)} \rightarrow \text{ভর/আয়তন (চাওয়া)}$$ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |

## u7: Stoichiometry Practice Exercise (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a practice problem based on the Haber-Bosch ammonia synthesis reaction with hints on molecular weights.

Accuracy: **accurate**. The equation is balanced, the problem statement is well-defined, and the molecular masses provided in the hint (N2 = 28, NH3 = 17) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## অনুশীলনের জন্য একটি প্রশ্ন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | তুমি নিজে চেষ্টা করো: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p46 | $$N_2 + 3H_2 \rightarrow 2NH_3$$ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;equation&#x27;] |
| p47 | যদি 28 gram N₂ বিক্রিয়া করে, তাহলে কত গ্রাম NH₃ উৎপন্ন হবে? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p48 | **(Hint: N₂ এর আণবিক ভর = 28, NH₃ এর আণবিক ভর = 17)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p49 | তুমি কি এই সমস্যাটি নিজে সমাধান করে দেখতে চাও? আমি তোমাকে সাহায্য করতে পারি! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

