# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and thoroughly explains stoichiometry for a high school student, covering its definition, balanced equations, mole and mass relationships, a step-by-step worked calculation, and limiting reactants.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 40,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of chemical stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry as the quantitative science of calculating reactant requirements and product yields in chemical reactions.

Accuracy: **accurate**. Correctly defines stoichiometry in high-school friendly terms as the calculation of quantities of reactants and products in a reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! আমি তোমার রসায়নের শিক্ষক। আজ আমরা খুব সহজ ভাষায় **রাসায়নিক সমীকরণমিতি** (Stoichiometry) বুঝব।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### সমীকরণমিতি আসলে কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | সমীকরণমিতি হলো রাসায়নিক বিক্রিয়ায় **“কতটা”** জিনিস লাগবে আর **“কতটা”** জিনিস তৈরি হবে, সেটা হিসাব করার বিজ্ঞান।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Baking recipe analogy for balanced chemical equations (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "যেমন: যদি তুমি একটা কেক বানাতে চাও, তাহলে রেসিপিতে লেখা থাকে—২ কাপ ময়দা + ১ কাপ চিনি + ২টা ডিম। এই অনুপাত না মানলে কেক ঠিক হবে না।"}]}

Annotation rationale: Compares balanced chemical equations to a baking recipe that specifies fixed ingredient ratios.

Accuracy: **accurate**. The analogy accurately conveys the concept of fixed stoichiometric proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | যেমন: যদি তুমি একটা কেক বানাতে চাও, তাহলে রেসিপিতে লেখা থাকে—২ কাপ ময়দা + ১ কাপ চিনি + ২টা ডিম। এই অনুপাত না মানলে কেক ঠিক হবে না। ঠিক একইভাবে রসায়নে প্রতিটা বিক্রিয়ার একটা নির্দিষ্ট “রেসিপি” আছে, সেটাই হলো **ভারসাম্যযুক্ত রাসায়নিক সমীকরণ**। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Balancing equations as a prerequisite for stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the fundamental rule that chemical equations must be balanced before conducting stoichiometric calculations.

Accuracy: **accurate**. It is a standard and necessary rule in chemistry that stoichiometric calculations require a balanced equation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### প্রথম ধাপ: সমীকরণ ভারসাম্য করা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | যেকোনো সমীকরণমিতির হিসাব করার আগে সমীকরণকে অবশ্যই ভারসাম্য করতে হবে।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Balancing the water synthesis reaction (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates balancing an equation by counting atoms of hydrogen and oxygen on both reactant and product sides.

Accuracy: **accurate**. The reaction 2H2 + O2 -> 2H2O correctly balances 4 hydrogen atoms and 2 oxygen atoms on each side.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **উদাহরণ:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | হাইড্রোজেন গ্যাস ও অক্সিজেন গ্যাস থেকে পানি তৈরি হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | অসমীকরণ: H₂ + O₂ → H₂O   | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p10 | ভারসাম্য সমীকরণ: **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p11 | এখানে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p12 | - বাম পাশে ৪টা H ও ২টা O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | - ডান পাশেও ৪টা H ও ২টা O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | এখন সমীকরণ ভারসাম্য হয়ে গেছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Mole ratios and mass relationships from stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how stoichiometric coefficients convey molar ratios and how these translate into mass ratios using molar mass.

Accuracy: **accurate**. The conversion between moles (2 mol H2 + 1 mol O2 -> 2 mol H2O) and masses (4 g H2 + 32 g O2 -> 36 g H2O) is chemically and mathematically exact.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### দ্বিতীয় ধাপ: মোল অনুপাত বোঝা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | ভারসাম্য সমীকরণের সংখ্যাগুলো (coefficients) আমাদের **অনুপাত** দেয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | **2H₂ + O₂ → 2H₂O** সমীকরণ থেকে আমরা বলতে পারি: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p18 | - ২ মোল H₂ + ১ মোল O₂ বিক্রিয়া করে → ২ মোল H₂O তৈরি করে | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p19 | - অথবা, ৪ গ্রাম H₂ + ৩২ গ্রাম O₂ → ৩৬ গ্রাম পানি তৈরি করে | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p20 | (কারণ H₂-এর আণবিক ভর = ২, তাই ২ মোল = ৪ গ্রাম) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Worked stoichiometric calculation for water synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked quantitative problem calculating required oxygen mass and produced water mass from 4 g of hydrogen gas.

Accuracy: **accurate**. All calculations (4 g H2 = 2 mol, requiring 1 mol O2 = 32 g, forming 2 mol H2O = 36 g) are correct and clearly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### সহজ উদাহরণ দিয়ে হিসাব করা যাক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | **প্রশ্ন:** ৪ গ্রাম হাইড্রোজেন গ্যাসের সাথে কত গ্রাম অক্সিজেন বিক্রিয়া করবে এবং কত গ্রাম পানি তৈরি হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | **সমাধান:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | 1. সমীকরণ লিখি: **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p25 | 2. অনুপাত বের করি: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 |    - ২ মোল H₂ : ১ মোল O₂ : ২ মোল H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | 3. ৪ গ্রাম H₂ = ২ মোল H₂ (কারণ ১ মোল H₂ = ২ গ্রাম) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | 4. অনুপাত অনুসারে: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 |    - ২ মোল H₂-এর জন্য লাগবে **১ মোল O₂** = ৩২ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 |    - তৈরি হবে **২ মোল H₂O** = ৩৬ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | **উত্তর:** ৩২ গ্রাম অক্সিজেন লাগবে এবং ৩৬ গ্রাম পানি তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Concept of limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that when reactants are present in non-stoichiometric ratios, the reactant consumed first limits and governs the amount of product formed.

Accuracy: **accurate**. Correctly defines the limiting reactant and its governing role in reaction extent.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### আরেকটা গুরুত্বপূর্ণ কথা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | যদি তোমার কাছে একটা বিক্রিয়ক বেশি থাকে আর আরেকটা কম থাকে, তাহলে যেটা আগে শেষ হয়ে যাবে, সেটাই বিক্রিয়া নিয়ন্ত্রণ করবে। একে বলে **সীমাবদ্ধ বিক্রিয়ক** (Limiting Reactant)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Summary of core stoichiometry components and practice invitation (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the three core foundations of stoichiometry (balanced equations, mole ratios, and molar mass) and invites follow-up practice.

Accuracy: **accurate**. Accurately identifies the three essential elements needed for stoichiometric problem solving.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### সারকথা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | সমীকরণমিতি মূলত তিনটা জিনিসের উপর নির্ভর করে: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p36 | 1. ভারসাম্য সমীকরণ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p37 | 2. মোল অনুপাত | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p38 | 3. ভর ও মোলের সম্পর্ক (মোলার ভর) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p39 | তুমি যদি এখন একটা সহজ সমস্যা সমাধান করে দেখাতে চাও, তাহলে বলো। আমি তোমার সাথে ধাপে ধাপে সমাধান করব।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p40 | কোনো অংশ বুঝতে অসুবিধা হলে সরাসরি জিজ্ঞাসা করো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

