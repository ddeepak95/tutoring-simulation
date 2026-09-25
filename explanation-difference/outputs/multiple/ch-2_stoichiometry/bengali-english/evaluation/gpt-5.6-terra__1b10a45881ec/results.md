# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains chemical stoichiometry in Bengali, covering balanced chemical equations, mole concept, molar mass, stoichiometric calculations, limiting reagents, and general problem-solving steps.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 142,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 3,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 142,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and scope of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines stoichiometry as the study of quantitative relationships between reactants and products in chemical reactions.

Accuracy: **accurate**. The definition and scope of stoichiometry are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | স্টইকিওমেট্রি (Stoichiometry) হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (reactant) ও উৎপাদ (product)-এর পরিমাণগত সম্পর্ক নির্ণয়ের পদ্ধতি। সহজভাবে বললে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | &gt; একটি বিক্রিয়ায় কত গ্রাম পদার্থ লাগবে, কত গ্রাম উৎপাদ তৈরি হবে, বা কত মোল গ্যাস উৎপন্ন হবে—এসব হিসাবই স্টইকিওমেট্রি। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Balancing equations and stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the necessity of balancing equations and how stoichiometric coefficients represent mole ratios.

Accuracy: **accurate**. Correctly describes the coefficients of a balanced equation as representing molar ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## ১. রাসায়নিক সমীকরণ ব্যালান্স করা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | স্টইকিওমেট্রির প্রথম শর্ত হলো **সমীকরণটি ব্যালান্সড** হতে হবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p8 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p10 | এখানে— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 2 মোল \(H_2\) বিক্রিয়া করে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - 1 মোল \(O_2\)-এর সঙ্গে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - 2 মোল \(H_2O\) তৈরি করে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | সমীকরণের সামনে থাকা সংখ্যা, যেমন 2, 1, 2—এগুলোকে **স্টইকিওমেট্রিক সহগ (coefficient)** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | এগুলোকে মোলের অনুপাত হিসেবে পড়া যায়: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p17 | H_2 : O_2 : H_2O = 2 : 1 : 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: The mole concept and conversion formulas (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines mole using Avogadro's number and provides the mathematical formulas relating mass, molar mass, and moles.

Accuracy: **accurate**. Avogadro's number and mole-mass conversion formulas are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## ২. মোল কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | রাসায়নিক হিসাবের মূল একক হলো **মোল**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | 1 মোল কোনো পদার্থে থাকে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p24 | 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p26 | টি কণা (পরমাণু, অণু বা আয়ন)। এই সংখ্যাকে অ্যাভোগাড্রো সংখ্যা বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | তবে স্টইকিওমেট্রিতে সাধারণত গ্রাম থেকে মোল এবং মোল থেকে গ্রামে রূপান্তর করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p28 | ### গুরুত্বপূর্ণ সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p30 | \text{মোলের সংখ্যা} = \frac{\text{ভর (গ্রাম)}}{\text{মোলার ভর (g/mol)}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p32 | অথবা, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p34 | \text{ভর} = \text{মোল} \times \text{মোলার ভর} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p35 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Molar mass definition and calculation examples (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass and demonstrates how to determine it using atomic masses.

Accuracy: **accurate**. Molar mass definition and the calculated values for H2, O2, and H2O are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## ৩. মোলার ভর কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | কোনো পদার্থের 1 মোলের ভরকে তার **মোলার ভর** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p39 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | - \(H_2\) এর মোলার ভর = \(2 \, g/mol\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | - \(O_2\) এর মোলার ভর = \(32 \, g/mol\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p42 | - \(H_2O\) এর মোলার ভর = \(18 \, g/mol\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | কারণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p44 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p45 | H_2O = 2(1) + 16 = 18 \, g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Calculation of water mass from hydrogen mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A complete worked problem demonstrating how to calculate the mass of product (H2O) formed from 4 g of reactant (H2).

Accuracy: **accurate**. All calculations from grams of H2 to moles of H2, mole ratio comparison, and conversion to grams of H2O (producing 36 g) are chemically and mathematically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | # উদাহরণ ১: কত গ্রাম পানি তৈরি হবে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | প্রশ্ন: 4 g হাইড্রোজেন সম্পূর্ণভাবে অক্সিজেনের সঙ্গে বিক্রিয়া করলে কত গ্রাম পানি উৎপন্ন হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p50 | সমীকরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p51 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p52 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p54 | ### ধাপ ১: হাইড্রোজেনের মোল বের করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p56 | \text{মোল } H_2 = \frac{4}{2} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p57 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p58 | ### ধাপ ২: সমীকরণ থেকে মোলের অনুপাত ব্যবহার করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | সমীকরণ অনুযায়ী: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p61 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p63 | অর্থাৎ 2 mol \(H_2\) থেকে 2 mol \(H_2O\) তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p64 | ### ধাপ ৩: পানির ভর বের করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p66 | \text{ভর } H_2O = 2 \times 18 = 36 \, g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p68 | **উত্তর: 4 g হাইড্রোজেন থেকে 36 g পানি তৈরি হবে।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p69 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: General procedure for solving stoichiometric problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a generalized, reusable step-by-step strategy for stoichiometric problem-solving.

Accuracy: **accurate**. The listed sequence (balance equation -> convert to moles -> apply molar ratio -> convert to desired unit) represents the standard stoichiometric problem-solving method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p70 | ## ৪. স্টইকিওমেট্রির সাধারণ ধাপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p71 | যেকোনো স্টইকিওমেট্রির অঙ্ক সমাধানের জন্য এই ধাপগুলো অনুসরণ করো: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p72 | 1. **রাসায়নিক সমীকরণ লেখো ও ব্যালান্স করো।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p73 | 2. প্রদত্ত ভরকে **মোলে** রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p74 | 3. সমীকরণের সহগ ব্যবহার করে এক পদার্থের মোল থেকে অন্য পদার্থের **মোল** বের করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p75 | 4. প্রয়োজন হলে মোলকে আবার **গ্রাম, অণু, বা গ্যাসের আয়তনে** রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p76 | সংক্ষেপে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p77 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p78 | \text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{মোল অনুপাত} \rightarrow \text{গ্রাম} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p79 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p80 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Calculation of carbon dioxide produced from calcium carbonate decomposition (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A worked example calculating the yield of CO2 from the thermal decomposition of 100 g of CaCO3.

Accuracy: **accurate**. Molar masses (CaCO3 = 100 g/mol, CO2 = 44 g/mol) and stoichiometric reasoning resulting in 44 g CO2 are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p81 | # উদাহরণ ২: ক্যালসিয়াম কার্বোনেটের বিয়োজন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p82 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p83 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p85 | প্রশ্ন: 100 g \(CaCO_3\) উত্তপ্ত করলে কত গ্রাম \(CO_2\) উৎপন্ন হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p86 | ### ধাপ ১: \(CaCO_3\)-এর মোলার ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p88 | CaCO_3 = 40 + 12 + 3(16) = 100 \, g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p90 | অতএব, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p91 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p92 | 100 \, g \, CaCO_3 = 1 \, mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p94 | ### ধাপ ২: সমীকরণের অনুপাত | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p96 | 1 \, mol \, CaCO_3 \rightarrow 1 \, mol \, CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p98 | অর্থাৎ 1 mol \(CaCO_3\) থেকে 1 mol \(CO_2\) তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p99 | ### ধাপ ৩: \(CO_2\)-এর ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p100 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p101 | CO_2 = 12 + 2(16) = 44 \, g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p103 | সুতরাং, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p104 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p105 | 1 \, mol \, CO_2 = 44 \, g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p107 | **উত্তর: 100 g \(CaCO_3\) থেকে 44 g \(CO_2\) উৎপন্ন হবে।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p108 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Limiting reagent definition (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reagent is and explains why it determines the extent of a reaction.

Accuracy: **accurate**. The definition and role of a limiting reagent are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p109 | ## ৫. লিমিটিং রিএজেন্ট বা সীমাবদ্ধ বিক্রিয়ক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | অনেক সময় দুটি বিক্রিয়কই দেওয়া থাকে, কিন্তু একটি আগে শেষ হয়ে যায়। যে পদার্থটি আগে শেষ হয়ে বিক্রিয়া বন্ধ করে দেয়, তাকে **লিমিটিং রিএজেন্ট** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u9: Identifying the limiting reagent in hydrogen and oxygen reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates how to determine the limiting reagent when given 2 moles of H2 and 2 moles of O2.

Accuracy: **accurate**. The deduction that 2 mol H2 needs 1 mol O2, leaving O2 in excess and H2 as the limiting reactant, is chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p111 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p112 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p113 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p115 | ধরা যাক আছে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p116 | - 2 mol \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p117 | - 2 mol \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p118 | সমীকরণ অনুযায়ী 2 mol \(H_2\)-এর জন্য মাত্র 1 mol \(O_2\) দরকার। কিন্তু এখানে \(O_2\) আছে 2 mol। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p119 | তাই \(H_2\) আগে শেষ হবে। অর্থাৎ \(H_2\) হলো **লিমিটিং রিএজেন্ট** এবং \(O_2\) অতিরিক্ত থাকবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p120 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Key reminders and common pitfalls in stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A bulleted checklist of essential rules and common pitfalls to keep in mind when solving stoichiometry problems.

Accuracy: **accurate**. All recap points are factually accurate guidance for stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p121 | ## ৬. মনে রাখার বিষয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p122 | - সমীকরণ ব্যালান্স না করলে স্টইকিওমেট্রির হিসাব ভুল হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p123 | - সমীকরণের সহগগুলো ভর নয়, **মোলের অনুপাত** বোঝায়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p124 | - গ্রাম থেকে সরাসরি গ্রামে যাওয়া যায় না; আগে সাধারণত মোলে যেতে হয়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p125 | - মোলার ভর বের করার সময় পর্যায় সারণির পারমাণবিক ভর ব্যবহার করতে হয়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p126 | - লিমিটিং রিএজেন্ট থাকলে উৎপাদের পরিমাণ সেটিই নির্ধারণ করে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p127 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Summary diagram and concluding summary (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A visual conversion flowchart and final wrap-up statement summarizing the core idea of stoichiometry.

Accuracy: **accurate**. The flow diagram and final summary succinctly and correctly summarize the concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p128 | ### একটি সহজ সূত্রে পুরো ধারণা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p129 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p130 | \boxed{ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p131 | \text{প্রদত্ত ভর} \div \text{মোলার ভর} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p132 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p133 | \text{মোল অনুপাত} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p134 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p135 | \text{মোল} \times \text{মোলার ভর} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p136 | } | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p137 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p138 | অর্থাৎ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p139 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p140 | \boxed{\text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{অনুপাত} \rightarrow \text{গ্রাম}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p141 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p142 | স্টইকিওমেট্রি মূলত রাসায়নিক সমীকরণকে ব্যবহার করে “কতটুকু পদার্থ লাগবে বা উৎপন্ন হবে” তার হিসাব করার বিজ্ঞান। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

