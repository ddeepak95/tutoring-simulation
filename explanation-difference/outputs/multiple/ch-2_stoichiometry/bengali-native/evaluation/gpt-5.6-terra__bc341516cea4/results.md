# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a clear, comprehensive introduction to stoichiometry for high school students in Bengali, covering mole ratios, balanced equations, molar mass, standard stoichiometry calculations, limiting reagents, and molar gas volume.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 215,
  "content_unit_kinds": {
    "CONCEPT": 7,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 215,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what stoichiometry is in terms of quantitative relationships between reactants and products.

Accuracy: **accurate**. Accurately defines stoichiometry as the calculation of quantitative relationships among reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | রাসায়নিক **সমীকরণমিতি** (Stoichiometry) হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (reactant) ও উৎপাদ (product)-এর **পরিমাণগত সম্পর্ক** নিয়ে হিসাব করার পদ্ধতি। সহজভাবে বললে— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | &gt; একটি বিক্রিয়ায় কত গ্রাম পদার্থ লাগবে, কত গ্রাম উৎপন্ন হবে, বা কত মোল গ্যাস তৈরি হবে—এসব বের করাই সমীকরণমিতি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Role of chemical equations and mole ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how stoichiometric coefficients in a chemical equation represent mole ratios.

Accuracy: **accurate**. Correctly interprets reaction coefficients as mole ratios for 2H2 + O2 -> 2H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## ১. রাসায়নিক সমীকরণ কেন গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | ধরা যাক, হাইড্রোজেন ও অক্সিজেন বিক্রিয়া করে পানি তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p7 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p8 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p9 | এখানে সংখ্যাগুলোকে **সহগ** (coefficient) বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | এর অর্থ হলো: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 2 মোল \(H_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p12 | - 1 মোল \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | - বিক্রিয়া করে | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | - 2 মোল \(H_2O\) তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | অর্থাৎ মোলের অনুপাত: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p17 | H_2 : O_2 : H_2O = 2 : 1 : 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p18 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p19 | সমীকরণমিতির সব হিসাবের মূল চাবিকাঠি হলো এই **মোল অনুপাত**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Balancing chemical equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the necessity of balancing equations based on conservation of mass and atom counting.

Accuracy: **accurate**. Accurately connects the conservation of atoms to the balancing of chemical equations, with a correct demonstration.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## ২. সমীকরণ অবশ্যই সাম্যাবস্থায় (Balanced) হতে হবে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | রাসায়নিক বিক্রিয়ায় কোনো পরমাণু সৃষ্টি বা ধ্বংস হয় না। তাই বিক্রিয়ার দুই পাশে প্রতিটি মৌলের পরমাণুর সংখ্যা সমান থাকতে হবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p25 | H_2 + O_2 \rightarrow H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p26 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p27 | এটি অসমতাযুক্ত, কারণ বাম পাশে অক্সিজেন 2টি, ডান পাশে 1টি। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p28 | সাম্য করলে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p30 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p32 | এখন— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | &#124; মৌল &#124; বাম পাশ &#124; ডান পাশ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p34 | &#124;---&#124;---:&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p35 | &#124; H &#124; 4 &#124; 4 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p36 | &#124; O &#124; 2 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p37 | তাই এটি সঠিক সাম্যযুক্ত সমীকরণ। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: The mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines 1 mole as 6.02 x 10^23 particles (Avogadro's number) with basic examples.

Accuracy: **accurate**. Accurately defines 1 mole and cites Avogadro's constant as 6.02 x 10^23 particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ## ৩. মোল কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | **1 মোল** কোনো পদার্থের এমন পরিমাণ যাতে থাকে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p41 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 | 6.02 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p43 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p44 | টি কণা (পরমাণু, অণু বা আয়ন)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p45 | এই সংখ্যাকে অ্যাভোগাড্রো সংখ্যা বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 | - 1 মোল কার্বন পরমাণু = \(6.02 \times 10^{23}\) টি কার্বন পরমাণু | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | - 1 মোল পানি = \(6.02 \times 10^{23}\) টি পানির অণু | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Molar mass definition and calculations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, demonstrates how to calculate it for water using atomic masses, and tabulates common values.

Accuracy: **accurate**. Accurately defines molar mass with unit g/mol and gives standard values for H2O, H2, O2, CO2, and NaCl.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ## ৪. মোলার ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | কোনো পদার্থের 1 মোলের ভরকে তার **মোলার ভর** বলে। একক: g/mol। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p52 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | ### পানির মোলার ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p55 | H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p56 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p57 | - H-এর পারমাণবিক ভর = 1 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p58 | - O-এর পারমাণবিক ভর = 16 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p59 | তাই, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p61 | H_2O = (2 \times 1) + 16 = 18 \text{ g/mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p62 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p63 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p64 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | 1 \text{ mol } H_2O = 18 \text{ g} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p67 | আরও কিছু উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | &#124; পদার্থ &#124; মোলার ভর &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p69 | &#124;---&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p70 | &#124; \(H_2\) &#124; 2 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p71 | &#124; \(O_2\) &#124; 32 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p72 | &#124; \(CO_2\) &#124; 44 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p73 | &#124; \(NaCl\) &#124; 58.5 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p74 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Core steps of stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general workflow: mass -> mole -> mole ratio -> mole -> mass.

Accuracy: **accurate**. Correctly describes the standard step-by-step algorithm for mass-mass stoichiometric conversions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p75 | ## ৫. সমীকরণমিতির মূল ধাপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p76 | সাধারণত এই ক্রমে হিসাব করা হয়: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p77 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p78 | \text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{মোল অনুপাত} \rightarrow \text{মোল} \rightarrow \text{গ্রাম} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p79 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p80 | অর্থাৎ— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p81 | 1. রাসায়নিক সমীকরণ সাম্য করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p82 | 2. দেওয়া ভরকে মোল-এ রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p83 | 3. সমীকরণের সহগ থেকে মোল অনুপাত ব্যবহার করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p84 | 4. প্রয়োজনীয় পদার্থের মোল বের করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p85 | 5. দরকার হলে মোলকে গ্রামে রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p86 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Worked example: Mass of water produced from 4 g hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Step-by-step worked calculation converting 4 g H2 to 36 g H2O via mole ratios.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, moles of H2O = 2 mol, mass of H2O = 36 g) are mathematically and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p87 | # উদাহরণ ১: 4 গ্রাম হাইড্রোজেন থেকে কত গ্রাম পানি তৈরি হবে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p88 | সমীকরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p89 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | ### ধাপ ১: \(H_2\)-এর মোল বের করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | \(H_2\)-এর মোলার ভর = 2 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p94 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | \text{মোল} = \frac{\text{ভর}}{\text{মোলার ভর}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | = \frac{4}{2} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | অর্থাৎ 4 g হাইড্রোজেন = 2 mol \(H_2\) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p101 | ### ধাপ ২: মোল অনুপাত ব্যবহার করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | সমীকরণ থেকে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p103 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | তাই 2 mol \(H_2\) থেকে তৈরি হবে 2 mol \(H_2O\)। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p107 | ### ধাপ ৩: পানির ভর বের করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p108 | \(H_2O\)-এর মোলার ভর = 18 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p109 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p110 | \text{ভর} = \text{মোল} \times \text{মোলার ভর} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p112 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p113 | = 2 \times 18 = 36 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | ### উত্তর: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p116 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p117 | \boxed{4 \text{ g } H_2 \text{ থেকে } 36 \text{ g } H_2O \text{ তৈরি হবে}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p118 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p119 | শর্ত: অক্সিজেন পর্যাপ্ত পরিমাণে থাকতে হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p120 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked example: Thermal decomposition of 100 g calcium carbonate (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Step-by-step worked calculation converting 100 g CaCO3 to 44 g CO2.

Accuracy: **accurate**. Calculations of CaCO3 molar mass (100 g/mol), mole conversion, and yield of CO2 (44 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p121 | # উদাহরণ ২: ক্যালসিয়াম কার্বোনেট উত্তপ্ত করলে কত কার্বন ডাই-অক্সাইড তৈরি হবে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p122 | সমীকরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p123 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | ধরা যাক, 100 g \(CaCO_3\) উত্তপ্ত করা হলো। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p127 | ### ধাপ ১: \(CaCO_3\)-এর মোলার ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p128 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | CaCO_3 = 40 + 12 + (3 \times 16) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | = 100 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p135 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p136 | 100 \text{ g } CaCO_3 = 1 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | ### ধাপ ২: মোল অনুপাত | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p139 | সমীকরণ থেকে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p140 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p141 | 1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p142 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | তাই 1 mol \(CaCO_3\) থেকে 1 mol \(CO_2\) তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p144 | ### ধাপ ৩: \(CO_2\)-এর ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p145 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | CO_2 = 12 + (2 \times 16) = 44 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p148 | অতএব, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p149 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p150 | 1 \text{ mol } CO_2 = 44 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | ### উত্তর: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p153 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p154 | \boxed{100 \text{ g } CaCO_3 \text{ থেকে } 44 \text{ g } CO_2 \text{ তৈরি হবে}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p155 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p156 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Limiting reagent concept (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines limiting reagents and explains how the reactant that is fully consumed limits the amount of product formed.

Accuracy: **accurate**. Accurately defines limiting reagent and illustrates it with 2 mol H2 and 2 mol O2, correctly identifying H2 as limiting.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p157 | ## ৬. সীমাবদ্ধ বিক্রিয়ক (Limiting Reagent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p158 | অনেক সময় দুটি বিক্রিয়কই দেওয়া থাকে, কিন্তু একটি পদার্থ আগে শেষ হয়ে যায়। যে পদার্থটি আগে শেষ হয়, তাকে **সীমাবদ্ধ বিক্রিয়ক** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p159 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p160 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p161 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p162 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p163 | ধরা যাক, আছে— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p164 | - 2 mol \(H_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p165 | - 2 mol \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p166 | সমীকরণ অনুযায়ী 2 mol \(H_2\)-এর জন্য দরকার মাত্র 1 mol \(O_2\)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p167 | এখানে \(H_2\) পুরোটা শেষ হয়ে যাবে, কিন্তু \(O_2\)-এর 1 mol অতিরিক্ত থাকবে। তাই— | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p168 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p169 | \boxed{H_2 \text{ হলো সীমাবদ্ধ বিক্রিয়ক}} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p170 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p171 | এবং যত পানি তৈরি হবে, তা নির্ধারণ করবে \(H_2\)-এর পরিমাণ। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p172 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Molar volume of gas at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the molar volume of an ideal gas at STP (22.4 L/mol) with a calculation for 2 mol oxygen.

Accuracy: **accurate**. Accurately gives the traditional standard molar volume of 22.4 L at STP and calculates volume for 2 mol O2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p173 | ## ৭. গ্যাসের ক্ষেত্রে মোলার আয়তন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p174 | সাধারণ তাপমাত্রা ও চাপে (STP) 1 মোল আদর্শ গ্যাসের আয়তন প্রায়: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p175 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p176 | 22.4 \text{ L} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p177 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p178 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p179 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p180 | 1 \text{ mol gas} = 22.4 \text{ L at STP} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p181 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p182 | উদাহরণ: 2 mol অক্সিজেন গ্যাসের আয়তন— | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p183 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p184 | 2 \times 22.4 = 44.8 \text{ L} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p185 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p186 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Formula cheat sheet (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference list of conversion formulas for moles, mass, particle count, and gas volume.

Accuracy: **accurate**. All listed formulas for mole, mass, particles, and volume are mathematically and physically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p187 | ## মনে রাখার সহজ সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p188 | ### মোল বের করতে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p189 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p190 | \boxed{\text{মোল} = \frac{\text{ভর}}{\text{মোলার ভর}}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p191 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p192 | ### ভর বের করতে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p193 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p194 | \boxed{\text{ভর} = \text{মোল} \times \text{মোলার ভর}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p195 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p196 | ### কণার সংখ্যা বের করতে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p197 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p198 | \boxed{\text{কণার সংখ্যা} = \text{মোল} \times 6.02 \times 10^{23}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p199 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p200 | ### STP-তে গ্যাসের আয়তন বের করতে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p201 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p202 | \boxed{\text{আয়তন} = \text{মোল} \times 22.4 \text{ L}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p203 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p204 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Summary recap of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the lesson, emphasizing the central importance of mole ratios.

Accuracy: **accurate**. Recaps the essential steps of stoichiometric problem solving clearly and correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p205 | ## সংক্ষিপ্ত সারাংশ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p206 | সমীকরণমিতিতে প্রধান বিষয়গুলো হলো: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p207 | - আগে রাসায়নিক সমীকরণ সাম্য করতে হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p208 | - গ্রাম থেকে মোল-এ যেতে হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p209 | - সমীকরণের সহগ ব্যবহার করে মোলের অনুপাত নিতে হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p210 | - তারপর প্রয়োজন অনুযায়ী গ্রাম, কণা সংখ্যা বা গ্যাসের আয়তন বের করতে হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p211 | - একাধিক বিক্রিয়ক থাকলে সীমাবদ্ধ বিক্রিয়ক চিহ্নিত করতে হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p212 | সবচেয়ে গুরুত্বপূর্ণ কথা: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p213 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p214 | \boxed{\text{সমীকরণমিতির কেন্দ্রবিন্দু হলো “মোল অনুপাত”}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p215 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |

