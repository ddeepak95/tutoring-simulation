# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains alkaline earth metals (Group 2 elements) in Bengali, covering their definition, electron configuration, physical and chemical properties, notable compounds, flame tests, uses, and comparison with alkali metals.

## Counts

```json
{
  "total_content_units": 16,
  "substantive_content_units": 16,
  "total_passages": 126,
  "content_unit_kinds": {
    "CONCEPT": 15,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 126,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 12,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 15,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and list of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines alkaline earth metals as Group 2 elements and enumerates each element in the group along with a note on radium's radioactivity.

Accuracy: **accurate**. Correctly defines Group 2 elements as alkaline earth metals, lists Be, Mg, Ca, Sr, Ba, and Ra, and notes Ra's radioactivity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## ক্ষারীয় মৃত্তিকা ধাতু (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | পর্যায় সারণির **গ্রুপ–2**-এর মৌলগুলোকে ক্ষারীয় মৃত্তিকা ধাতু বলা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | এগুলো হলো: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; প্রতীক &#124; মৌল &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; Be &#124; বেরিলিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; Mg &#124; ম্যাগনেসিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Ca &#124; ক্যালসিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Sr &#124; স্ট্রনশিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Ba &#124; বেরিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; Ra &#124; রেডিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &gt; রেডিয়াম তেজস্ক্রিয় (radioactive), তাই সাধারণত দৈনন্দিন ব্যবহারে দেখা যায় না। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Etymology of the name alkaline earth metal (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why these metals are called alkaline earth metals based on the basic nature of their oxides and the historical term 'earth'.

Accuracy: **accurate**. Accurately explains the origin of the term 'alkaline earth metals' via the basic/alkaline nature of their oxides/hydroxides and the historical meaning of 'earth'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## নামকরণের কারণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | এদের অক্সাইড ও হাইড্রোক্সাইড সাধারণত **ক্ষারীয় (basic/alkaline)** প্রকৃতির। যেমন— | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p17 | CaO + H_2O \rightarrow Ca(OH)_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p18 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p19 | এখানে উৎপন্ন ক্যালসিয়াম হাইড্রোক্সাইড ক্ষারধর্মী। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | আগে এদের অক্সাইডকে “মৃত্তিকা” বা মাটির মতো কঠিন পদার্থ মনে করা হতো। তাই নাম হয়েছে **ক্ষারীয় মৃত্তিকা ধাতু**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic configuration and valency of Group 2 metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains outer-shell electronic configuration (ns2), the formation of M2+ cations, and resulting valency of 2.

Accuracy: **accurate**. The electronic configurations, cation formation equation, and resulting valency of 2 are all standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## ইলেকট্রন বিন্যাস ও যোজ্যতা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | গ্রুপ–2 মৌলগুলোর সর্ববহিঃস্থ স্তরে **2টি ইলেকট্রন** থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | সাধারণ ইলেকট্রন বিন্যাস: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | যেমন: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | - Mg: \(2, 8, 2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | - Ca: \(2, 8, 8, 2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | এরা সহজে 2টি ইলেকট্রন ত্যাগ করে **\(M^{2+}\)** আয়ন তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p33 | Mg \rightarrow Mg^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p34 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | তাই এদের যোজ্যতা সাধারণত **2**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Physical properties and periodic trend in atomic size (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes metallic properties, hardness/density/melting point comparisons with alkali metals, and the down-group increase in atomic size.

Accuracy: **accurate**. The stated physical properties and the order of atomic radii (Be < Mg < Ca < Sr < Ba) are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## প্রধান ভৌত ধর্ম | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | 1. এরা ধাতু—চকচকে, তাপ ও বিদ্যুৎ পরিবাহী। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | 2. ক্ষার ধাতুর তুলনায় এরা কিছুটা বেশি কঠিন ও ঘন। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | 3. এদের গলনাঙ্ক সাধারণত ক্ষার ধাতুর চেয়ে বেশি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | 4. নিচের দিকে গেলে পরমাণুর আকার বৃদ্ধি পায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p42 | অর্থাৎ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p44 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p45 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | পরমাণুর আকার এই ক্রমে বাড়ে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction of alkaline earth metals with oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the formation of basic metal oxides upon reaction with oxygen, illustrated by magnesium burning with a bright white light.

Accuracy: **accurate**. The reaction 2Mg + O2 -> 2MgO and the observation of a brilliant white flame are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ## রাসায়নিক ধর্ম | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | ### ১. অক্সিজেনের সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | এরা অক্সিজেনের সঙ্গে বিক্রিয়া করে অক্সাইড তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p51 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p52 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p53 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p54 | ম্যাগনেসিয়াম জ্বললে উজ্জ্বল সাদা আলো দেখা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction of alkaline earth metals with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains reactions with water across the group, the production of hydroxides and hydrogen, and the downward trend in reactivity.

Accuracy: **accurate**. The reaction Ca + 2H2O -> Ca(OH)2 + H2 and the stated reactivity order (Be < Mg < Ca < Sr < Ba) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ### ২. পানির সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | বেরিলিয়াম পানির সঙ্গে প্রায় বিক্রিয়া করে না। ম্যাগনেসিয়াম ঠান্ডা পানির সঙ্গে খুব ধীরে বিক্রিয়া করে, কিন্তু ক্যালসিয়াম ও তার নিচের মৌলগুলো সহজে বিক্রিয়া করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p58 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p59 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p60 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p61 | এখানে হাইড্রোজেন গ্যাস উৎপন্ন হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p62 | গ্রুপে নিচের দিকে গেলে পানির সঙ্গে বিক্রিয়াশীলতা বাড়ে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p63 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p64 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p65 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p66 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction of alkaline earth metals with acids (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the reaction with dilute acids producing salts and hydrogen gas, illustrated with Mg and HCl.

Accuracy: **accurate**. The reaction Mg + 2HCl -> MgCl2 + H2 is balanced and chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p67 | ### ৩. অ্যাসিডের সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p68 | পাতলা অ্যাসিডের সঙ্গে বিক্রিয়া করে লবণ ও হাইড্রোজেন গ্যাস উৎপন্ন করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p69 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p70 | Mg + 2HCl \rightarrow MgCl_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p71 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction of alkaline earth metals with halogens (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the direct reaction of alkaline earth metals with halogens to yield metal halides, illustrated with Ca and Cl2.

Accuracy: **accurate**. The reaction Ca + Cl2 -> CaCl2 is chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p73 | ### ৪. হ্যালোজেনের সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | ক্লোরিনের মতো হ্যালোজেনের সঙ্গে বিক্রিয়া করে হ্যালাইড লবণ তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p75 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p76 | Ca + Cl_2 \rightarrow CaCl_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p77 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p78 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Calcium carbonate (CaCO3) and thermal decomposition (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p81", "quote": "এটি চুনাপাথর, মার্বেল, চক ইত্যাদিতে থাকে।"}]}

Annotation rationale: Presents calcium carbonate occurrences and its thermal decomposition into quicklime and carbon dioxide.

Accuracy: **accurate**. The occurrence of CaCO3 in limestone/marble/chalk and the thermal decomposition equation to form CaO and CO2 are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p79 | ## গুরুত্বপূর্ণ যৌগ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | ### ক্যালসিয়াম কার্বোনেট, \(CaCO_3\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p81 | এটি চুনাপাথর, মার্বেল, চক ইত্যাদিতে থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p82 | তাপ দিলে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p83 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p84 | CaCO_3 \xrightarrow{\Delta} CaO + CO_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p85 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p86 | এখানে \(CaO\) হলো কুইকলাইম বা পোড়া চুন। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p87 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Calcium oxide (CaO) and slaking (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents quicklime (CaO) and its reaction with water to produce calcium hydroxide.

Accuracy: **accurate**. Accurately identifies quicklime as CaO and gives the reaction CaO + H2O -> Ca(OH)2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p88 | ### ক্যালসিয়াম অক্সাইড, \(CaO\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | একে পোড়া চুন বা quicklime বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p90 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p91 | CaO + H_2O \rightarrow Ca(OH)_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p92 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p93 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Calcium hydroxide (Ca(OH)2) and its applications (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p95", "quote": "একে স্লেকড লাইম বা নেভানো চুন বলে। এটি সাদা রং করা, নির্মাণকাজ ও মাটির অম্লতা কমাতে ব্যবহৃত হয়।"}]}

Annotation rationale: Identifies slaked lime as Ca(OH)2 and outlines its common applications.

Accuracy: **accurate**. The description of slaked lime and its applications in whitewash, construction, and soil acidity reduction is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p94 | ### ক্যালসিয়াম হাইড্রোক্সাইড, \(Ca(OH)_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | একে স্লেকড লাইম বা নেভানো চুন বলে। এটি সাদা রং করা, নির্মাণকাজ ও মাটির অম্লতা কমাতে ব্যবহৃত হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p96 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Magnesium sulfate (MgSO4) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p98", "quote": "এটি এপসম লবণ নামে পরিচিত এবং চিকিৎসাসহ নানা ক্ষেত্রে ব্যবহৃত হয়।"}]}

Annotation rationale: Identifies Epsom salt as MgSO4 and mentions its medical applications.

Accuracy: **accurate**. Correctly states that magnesium sulfate is commonly known as Epsom salt and used in medicine.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | ### ম্যাগনেসিয়াম সালফেট, \(MgSO_4\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | এটি এপসম লবণ নামে পরিচিত এবং চিকিৎসাসহ নানা ক্ষেত্রে ব্যবহৃত হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p99 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Flame test colors of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the characteristic flame colors of alkaline earth metal salts.

Accuracy: **contains_error**. Magnesium salts do not impart a characteristic color to a Bunsen burner flame in a flame test. The entry conflates burning magnesium metal with the flame test of magnesium salts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | ## শিখা পরীক্ষা (Flame Test) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p101 | কিছু ক্ষারীয় মৃত্তিকা ধাতুর লবণ শিখায় বিশেষ রং সৃষ্টি করে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p102 | &#124; মৌল &#124; শিখার রং &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p103 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p104 | &#124; Ca &#124; ইট লাল / কমলা-লাল &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p105 | &#124; Sr &#124; গাঢ় লাল &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p106 | &#124; Ba &#124; আপেল-সবুজ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p107 | &#124; Mg &#124; উজ্জ্বল সাদা আলোতে জ্বলে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p108 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

Error (minor; p107): In the flame test table for alkaline earth metal salts, magnesium is listed with the flame color 'উজ্জ্বল সাদা আলোতে জ্বলে' (burns with bright white light). In a standard flame test, magnesium salts do not impart a color to the flame; the bright white light is produced when magnesium metal ribbon burns in air.

Correction: In a flame test, magnesium salts do not produce a characteristic flame color (no persistent color / colorless).

## u14: Uses of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p110", "quote": "- **ম্যাগনেসিয়াম (Mg):** হালকা সংকর ধাতু, আতশবাজি, ফ্ল্যাশ লাইটে।"}, {"passage_id": "p111", "quote": "- **ক্যালসিয়াম (Ca):** হাড় ও দাঁত গঠনে গুরুত্বপূর্ণ; সিমেন্ট ও চুন তৈরিতে ব্যবহৃত।"}, {"passage_id": "p112", "quote": "- **স্ট্রনশিয়াম (Sr):** লাল রঙের আতশবাজিতে।"}]}

Annotation rationale: Lists major real-world applications of Be, Mg, Ca, Sr, and Ba.

Accuracy: **accurate**. All listed uses for Be, Mg, Ca, Sr, and Ba are standard, factual applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p109 | ## ব্যবহার | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | - **ম্যাগনেসিয়াম (Mg):** হালকা সংকর ধাতু, আতশবাজি, ফ্ল্যাশ লাইটে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p111 | - **ক্যালসিয়াম (Ca):** হাড় ও দাঁত গঠনে গুরুত্বপূর্ণ; সিমেন্ট ও চুন তৈরিতে ব্যবহৃত। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p112 | - **স্ট্রনশিয়াম (Sr):** লাল রঙের আতশবাজিতে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p113 | - **বেরিয়াম (Ba):** এক্স-রে পরীক্ষায় বেরিয়াম সালফেট ব্যবহৃত হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p114 | - **বেরিলিয়াম (Be):** বিশেষ হালকা ও শক্ত সংকর ধাতু তৈরিতে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p115 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Comparison between alkali metals and alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares Group 1 and Group 2 metals across valence electrons, ions formed, valency, reactivity, and examples.

Accuracy: **accurate**. The comparison table correctly distinguishes the valence electrons, ions, valency, and relative reactivities of Group 1 and Group 2 metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | ## ক্ষার ধাতুর সঙ্গে পার্থক্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | &#124; বিষয় &#124; ক্ষার ধাতু (Group 1) &#124; ক্ষারীয় মৃত্তিকা ধাতু (Group 2) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p118 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p119 | &#124; সর্ববহিঃস্থ ইলেকট্রন &#124; 1টি &#124; 2টি &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p120 | &#124; গঠিত আয়ন &#124; \(M^+\) &#124; \(M^{2+}\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p121 | &#124; যোজ্যতা &#124; 1 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p122 | &#124; বিক্রিয়াশীলতা &#124; বেশি &#124; তুলনামূলক কম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p123 | &#124; উদাহরণ &#124; Na, K &#124; Mg, Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p124 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Summary formula for alkaline earth metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary formula linking group number, valence electrons, ionic state, and alkaline oxides.

Accuracy: **accurate**. The concise summary accurately aggregates the key defining traits of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p125 | ### সংক্ষেপে মনে রাখো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p126 | **গ্রুপ–2 + বাইরের স্তরে 2 ইলেকট্রন + \(2+\) আয়ন + ক্ষারীয় অক্সাইড/হাইড্রোক্সাইড = ক্ষারীয় মৃত্তিকা ধাতু।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

