# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive introductory explanation of chemical stoichiometry in Bengali, covering definitions, mole ratios, problem-solving steps, a step-by-step worked example, limiting reagents, and practical applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 45,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 45,
  "unique_subtopics": 8,
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

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the branch of chemistry dealing with quantitative relationships between reactants and products.

Accuracy: **accurate**. The definition accurately describes stoichiometry as quantitative calculations involving reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # রাসায়নিক সমীকরণমিতি (Stoichiometry) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## সমীকরণমিতি কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | সমীকরণমিতি হলো রসায়নের এমন একটি শাখা যেখানে আমরা রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (reactant) ও উৎপাদের (product) মধ্যে **পরিমাণগত সম্পর্ক** নিয়ে আলোচনা করি। সহজ কথায়, একটি বিক্রিয়ায় কত পরিমাণ পদার্থ লাগবে এবং কত পরিমাণ পদার্থ উৎপন্ন হবে—এটাই আমরা হিসাব করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Balanced Chemical Equations and Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that balanced chemical equations serve as the foundation of stoichiometry, interpreting coefficients as mole ratios using the formation of ammonia as an illustrative example.

Accuracy: **accurate**. The equation N2 + 3H2 -> 2NH3 is balanced correctly, and the coefficients accurately represent the stoichiometric mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## মূল ভিত্তি: সুষম রাসায়নিক সমীকরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | সমীকরণমিতির ভিত্তি হলো একটি **সুষম (balanced) রাসায়নিক সমীকরণ**। উদাহরণ দেখি: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | $$N_2 + 3H_2 \rightarrow 2NH_3$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p7 | এই সমীকরণটি আমাদের বলছে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - **১ মোল** নাইট্রোজেন গ্যাস | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - **৩ মোল** হাইড্রোজেন গ্যাসের সাথে বিক্রিয়া করে | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - **২ মোল** অ্যামোনিয়া উৎপন্ন করে | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | এই সংখ্যাগুলো (১, ৩, ২) কে **মোল অনুপাত** বা **স্টোইকিওমেট্রিক কোএফিসিয়েন্ট** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: The Mole Concept and Mass Conversion Formula (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Reviews essential prerequisite definitions and formulas regarding the mole, Avogadro's constant, and the relation between mass, molar mass, and moles.

Accuracy: **accurate**. Avogadro's number (6.022 x 10^23) and the formula n = m / M are stated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## মোলের ধারণা মনে রাখি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | সমীকরণমিতি বুঝতে হলে &quot;মোল&quot; বুঝতে হবে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - ১ মোল = $6.022 \times 10^{23}$ টি কণা (অ্যাভোগেড্রো সংখ্যা) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - মোল = ভর ÷ মোলার ভর | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | $$n = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u4: General Steps for Solving Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a four-step reusable procedure for solving standard mass-to-mass stoichiometric problems.

Accuracy: **accurate**. The four-step algorithm (balance equation, mass to moles, apply mole ratio, moles to mass) is the standard and correct approach in introductory chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## সমীকরণমিতির ধাপসমূহ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | কোনো সমস্যা সমাধানের জন্য এই ধাপগুলো অনুসরণ করি: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p19 | **ধাপ ১:** সমীকরণটি সুষম করা | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p20 | **ধাপ ২:** প্রদত্ত পদার্থের ভরকে মোলে রূপান্তর করা | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p21 | **ধাপ ৩:** মোল অনুপাত ব্যবহার করে কাঙ্ক্ষিত পদার্থের মোল বের করা | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p22 | **ধাপ ৪:** মোলকে ভরে রূপান্তর করা | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u5: Worked Example: Synthesizing Ammonia from Nitrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step calculation of the mass of ammonia produced from 28 grams of nitrogen gas.

Accuracy: **accurate**. The molar mass of N2 is 28 g/mol, giving 1 mol N2; the 1:2 stoichiometric ratio produces 2 mol NH3; with a molar mass of 17 g/mol for NH3, the mass is correctly computed as 34 g.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## একটি বাস্তব উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | **সমস্যা:** ২৮ গ্রাম নাইট্রোজেন গ্যাসের সাথে পূর্ণ বিক্রিয়ায় কত গ্রাম অ্যামোনিয়া উৎপন্ন হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | **সমাধান:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | সমীকরণ: $N_2 + 3H_2 \rightarrow 2NH_3$ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | **ধাপ ১ - মোল বের করা:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | $$N_2\text{-এর মোলার ভর} = 28 \text{ g/mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | $$n(N_2) = \frac{28}{28} = 1 \text{ মোল}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | **ধাপ ২ - মোল অনুপাত ব্যবহার:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | সমীকরণ থেকে, ১ মোল $N_2$ থেকে ২ মোল $NH_3$ উৎপন্ন হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | $$n(NH_3) = 1 \times 2 = 2 \text{ মোল}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | **ধাপ ৩ - ভরে রূপান্তর:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | $$NH_3\text{-এর মোলার ভর} = 17 \text{ g/mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | $$m(NH_3) = 2 \times 17 = 34 \text{ গ্রাম}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | **উত্তর:** ৩৪ গ্রাম অ্যামোনিয়া উৎপন্ন হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Limiting Reagents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of a limiting reagent as the reactant consumed first, which determines the maximum yield of products.

Accuracy: **accurate**. The explanation accurately identifies the limiting reagent as the substance that runs out first and restricts product formation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## সীমাবদ্ধ বিকারক (Limiting Reagent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | বাস্তব বিক্রিয়ায় সব বিক্রিয়ক ঠিক অনুপাতে থাকে না। যে বিক্রিয়কটি **আগে শেষ হয়ে যায়**, সেটিই বিক্রিয়ার পরিমাণ নির্ধারণ করে। একে **সীমাবদ্ধ বিকারক** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Importance of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists practical reasons why stoichiometry is vital, including industry, pharmaceuticals, cost reduction, and lab work.

Accuracy: **accurate**. The listed applications accurately reflect the standard real-world significance of stoichiometric control.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ## কেন সমীকরণমিতি গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | - শিল্পক্ষেত্রে সঠিক পরিমাণে কাঁচামাল ব্যবহার করতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | - ওষুধ তৈরিতে সঠিক অনুপাত মেনে চলতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p42 | - বিক্রিয়ার খরচ ও অপচয় কমাতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | - পরীক্ষাগারে সঠিক ফলাফল পেতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Summary and Practice Invitation (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap emphasizing the role of balanced equation coefficients, followed by an interactive closing offer.

Accuracy: **accurate**. The recap appropriately summarizes coefficients as the key factor in stoichiometric calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | **সংক্ষেপে মনে রাখো:** সমীকরণমিতি হলো রসায়নের &quot;গণিত&quot;—যেখানে সুষম সমীকরণের কোএফিসিয়েন্টগুলোই তোমার হিসাবের চাবিকাঠি! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p45 | তুমি কি কোনো নির্দিষ্ট সমস্যা নিয়ে অনুশীলন করতে চাও? 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

