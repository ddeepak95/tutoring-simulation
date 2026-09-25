# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of alkaline earth metals (Group 2 elements) in Bengali, covering their identity, naming, electron configuration, general properties, chemical reactions, key compounds, flame test colours, comparison with alkali metals, a mnemonic, and a summary.

## Counts

```json
{
  "total_content_units": 18,
  "substantive_content_units": 18,
  "total_passages": 125,
  "content_unit_kinds": {
    "CONCEPT": 15,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 125,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 10,
    "everyday": 7,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 18
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction to Group 2 alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the Group 2 elements that comprise the alkaline earth metals family and provides a table with their symbols and names.

Accuracy: **accurate**. Correctly lists the Group 2 elements of the periodic table.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ### ক্ষারীয় মৃত্তিকা ধাতু (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | পর্যায় সারণির **২ নম্বর গোষ্ঠীর** মৌলগুলোকে ক্ষারীয় মৃত্তিকা ধাতু বলা হয়। এরা হলো— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | &#124; প্রতীক &#124; মৌলের নাম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p4 | &#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124; Be &#124; বেরিলিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; Mg &#124; ম্যাগনেসিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; Ca &#124; ক্যালসিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Sr &#124; স্ট্রনশিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Ba &#124; বেরিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Ra &#124; রেডিয়াম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u2: Radium's radioactivity limitation in school exams (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that radium is radioactive and rarely emphasized in school-level chemistry examinations.

Accuracy: **accurate**. Radium is indeed a radioactive Group 2 element and typically omitted from introductory school laboratory reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | &gt; রেডিয়াম একটি তেজস্ক্রিয় মৌল, তাই এটি সাধারণত স্কুল-স্তরের পরীক্ষায় কম ব্যবহৃত হয়। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Etymology and origin of the name alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why these metals are called 'alkaline earth metals', linking their oxides' basic/alkaline nature and the historical term 'earths' for heat-resistant mineral oxides.

Accuracy: **accurate**. Accurately relates the basic properties of the oxides/hydroxides (e.g., CaO + H2O -> Ca(OH)2) and the historical geological meaning of 'earths'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## কেন এদের “ক্ষারীয় মৃত্তিকা ধাতু” বলা হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - এদের অক্সাইড ও হাইড্রোক্সাইড সাধারণত **ক্ষারীয় বা ক্ষারধর্মী**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 |   - যেমন:   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 |     \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p17 |     CaO + H_2O \rightarrow Ca(OH)_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p18 |     \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p19 |   এখানে উৎপন্ন ক্যালসিয়াম হাইড্রোক্সাইড ক্ষারীয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | - আগে এদের অক্সাইডকে “earth” বা মৃত্তিকা বলা হতো, কারণ এগুলো প্রকৃতিতে মাটির/খনিজের সঙ্গে যুক্ত অবস্থায় পাওয়া যায় এবং সহজে গলত না। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Electronic configuration and valence ion formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the valence shell electron configuration ns^2, provides Bohr configuration examples for Mg and Ca, and explains the formation of +2 ions.

Accuracy: **accurate**. Correctly states the general valence configuration ns^2, the Bohr electronic configurations of Mg and Ca, oxidation to M2+, and valency 2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## ইলেকট্রন বিন্যাস | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | এই গোষ্ঠীর সব মৌলের সর্ববহিঃস্থ স্তরে **২টি ইলেকট্রন** থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | সাধারণ রূপ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p26 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p28 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | - Mg: \(2,8,2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | - Ca: \(2,8,8,2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | এই ২টি ইলেকট্রন ত্যাগ করে তারা সাধারণত **+2 আয়ন** গঠন করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p33 | Mg \rightarrow Mg^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p34 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p35 | তাই এদের যোজ্যতা সাধারণত **2**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Metallic nature and divalency of Group 2 elements (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the general metallic properties (lustre, conductivity, malleability/ductility) and divalency (forming M2+ ions).

Accuracy: **accurate**. Properties described are accurate standard chemical characteristics of Group 2 metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## প্রধান বৈশিষ্ট্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | ### ১. এরা ধাতু | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | এরা চকচকে, তাপ ও বিদ্যুৎ পরিবাহী এবং পেটানো বা টানা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | ### ২. এরা সাধারণত দ্বিযোজী | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | অর্থাৎ এরা \(M^{2+}\) আয়ন তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | যেমন: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p44 | Ca \rightarrow Ca^{2+} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p45 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |

## u6: Reactivity trend down Group 2 (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why reactivity increases down Group 2 based on atomic radius expansion and easier loss of outer electrons.

Accuracy: **accurate**. Correctly explains the periodic trend of reactivity: Be < Mg < Ca < Sr < Ba.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ### ৩. নিচের দিকে বিক্রিয়াশীলতা বাড়ে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | বেরিলিয়াম থেকে বেরিয়ামের দিকে নামলে পরমাণুর আকার বাড়ে। ফলে বাইরের ২টি ইলেকট্রন ত্যাগ করা সহজ হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p48 | তাই বিক্রিয়াশীলতার ক্রম: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p49 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p50 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p51 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |

## u7: Natural occurrence of alkaline earth metals in compounds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p55", "quote": "চুনাপাথর, মার্বেল"}]}

Annotation rationale: Explains that these elements are not found free in nature due to high reactivity, but rather as minerals (carbonates, sulphates, chlorides).

Accuracy: **accurate**. Accurately describes how alkaline earth metals occur combined in minerals such as limestone, dolomite/magnesite, and barite.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | ### ৪. এরা প্রকৃতিতে মুক্ত অবস্থায় পাওয়া যায় না | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | কারণ এরা বেশ বিক্রিয়াশীল। সাধারণত কার্বোনেট, সালফেট বা ক্লোরাইড হিসেবে পাওয়া যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p54 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p55 | - ক্যালসিয়াম কার্বোনেট: \(CaCO_3\) — চুনাপাথর, মার্বেল | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p56 | - ম্যাগনেসিয়াম কার্বোনেট: \(MgCO_3\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p57 | - বেরিয়াম সালফেট: \(BaSO_4\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p58 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction of alkaline earth metals with oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p64", "quote": "আগে ফটোগ্রাফিতে ম্যাগনেসিয়াম ফ্ল্যাশ ব্যবহার করা হতো।"}]}

Annotation rationale: Explains the oxidation reaction to form metal oxides, detailing the combustion of magnesium and its bright white flame.

Accuracy: **accurate**. Accurately represents the oxidation of magnesium to MgO and its historical use in flash photography due to bright white light.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p59 | ## অক্সিজেনের সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p60 | এরা অক্সিজেনের সঙ্গে বিক্রিয়া করে ধাতব অক্সাইড তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p61 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p62 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p63 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p64 | ম্যাগনেসিয়াম জ্বালালে অত্যন্ত উজ্জ্বল সাদা আলো উৎপন্ন হয়। তাই আগে ফটোগ্রাফিতে ম্যাগনেসিয়াম ফ্ল্যাশ ব্যবহার করা হতো। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p65 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Reaction of alkaline earth metals with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how reactivity with water varies down the group (Be does not react, Mg reacts slowly with cold/faster with steam, Ca/Sr/Ba react readily) producing hydroxide and hydrogen gas.

Accuracy: **accurate**. The reaction behavior across the group and the balanced equation for calcium reacting with water are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p66 | ## পানির সঙ্গে বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p67 | সব ক্ষারীয় মৃত্তিকা ধাতু পানির সঙ্গে একইভাবে বিক্রিয়া করে না। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p68 | &#124; ধাতু &#124; পানির সঙ্গে আচরণ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p69 | &#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p70 | &#124; Be &#124; সাধারণত বিক্রিয়া করে না &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p71 | &#124; Mg &#124; ঠান্ডা পানির সঙ্গে খুব ধীরে; গরম পানি/বাষ্পের সঙ্গে বিক্রিয়া করে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p72 | &#124; Ca &#124; ঠান্ডা পানির সঙ্গে বিক্রিয়া করে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p73 | &#124; Sr, Ba &#124; আরও দ্রুত বিক্রিয়া করে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p74 | ক্যালসিয়ামের বিক্রিয়া: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p75 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p76 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p77 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p78 | এখানে হাইড্রোজেন গ্যাস বের হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p79 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Calcium oxide properties and uses (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p84", "quote": "- সিমেন্ট তৈরিতে"}, {"passage_id": "p85", "quote": "- মাটির অম্লতা কমাতে"}, {"passage_id": "p86", "quote": "- নির্মাণকাজে"}]}

Annotation rationale: Describes quicklime (CaO) and its practical uses in cement production, soil acidity reduction, and construction.

Accuracy: **accurate**. Common name quicklime and listed applications are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p80 | ## গুরুত্বপূর্ণ যৌগ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p81 | ### ১. ক্যালসিয়াম অক্সাইড, \(CaO\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p82 | একে **পোড়া চুন** বা quicklime বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p83 | ব্যবহার: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p84 | - সিমেন্ট তৈরিতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p85 | - মাটির অম্লতা কমাতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p86 | - নির্মাণকাজে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u11: Calcium hydroxide properties and uses (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p90", "quote": "- দেয়াল সাদা করতে"}, {"passage_id": "p91", "quote": "- পানিশোধনে"}]}

Annotation rationale: Describes slaked lime (Ca(OH)2) and its uses in whitewashing walls, water purification, and soil neutralization.

Accuracy: **accurate**. Common name slaked lime and stated uses are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p87 | ### ২. ক্যালসিয়াম হাইড্রোক্সাইড, \(Ca(OH)_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p88 | একে **নিভানো চুন** বা slaked lime বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p89 | ব্যবহার: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p90 | - দেয়াল সাদা করতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p91 | - পানিশোধনে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p92 | - অম্লীয় মাটি নিরপেক্ষ করতে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u12: Calcium carbonate occurrence (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p94", "quote": "চুনাপাথর, মার্বেল ও চক-এর প্রধান উপাদান।"}]}

Annotation rationale: Notes that CaCO3 is the main constituent of limestone, marble, and chalk.

Accuracy: **accurate**. Correctly states the primary forms of calcium carbonate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | ### ৩. ক্যালসিয়াম কার্বোনেট, \(CaCO_3\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | চুনাপাথর, মার্বেল ও চক-এর প্রধান উপাদান। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u13: Biological importance of magnesium (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p96", "quote": "মানবদেহের জন্য গুরুত্বপূর্ণ। এটি পেশি ও স্নায়ুর কাজ এবং উদ্ভিদের ক্লোরোফিল গঠনে ভূমিকা রাখে।"}]}

Annotation rationale: Describes the role of magnesium in muscle and nerve function and in plant chlorophyll.

Accuracy: **accurate**. Magnesium is a key cofactor in human physiology and the central atom in chlorophyll porphyrin rings.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p95 | ### ৪. ম্যাগনেসিয়াম | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p96 | মানবদেহের জন্য গুরুত্বপূর্ণ। এটি পেশি ও স্নায়ুর কাজ এবং উদ্ভিদের ক্লোরোফিল গঠনে ভূমিকা রাখে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u14: Barium sulphate medical use (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p98", "quote": "চিকিৎসায় পাকস্থলী ও অন্ত্রের এক্স-রে পরীক্ষায় ব্যবহার করা হয়।"}]}

Annotation rationale: Explains that BaSO4 is insoluble and used as a radiopaque contrast agent for stomach and intestinal X-rays.

Accuracy: **accurate**. Accurately describes barium sulphate's insolubility and its application in medical imaging (barium meal).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | ### ৫. বেরিয়াম সালফেট, \(BaSO_4\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | এটি পানিতে অদ্রবণীয়। চিকিৎসায় পাকস্থলী ও অন্ত্রের এক্স-রে পরীক্ষায় ব্যবহার করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p99 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Flame test colours of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents flame test observations for Ca (brick red), Sr (crimson red), Ba (apple green), and notes that Be and Mg do not give distinct flame colours.

Accuracy: **accurate**. Flame colours (Ca: brick red, Sr: crimson, Ba: apple green, Be/Mg: no flame colour) are completely standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | ## শিখা পরীক্ষায় রং | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p101 | কিছু ক্ষারীয় মৃত্তিকা ধাতু শিখায় বিশেষ রং দেয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p102 | &#124; মৌল &#124; শিখার রং &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p103 | &#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p104 | &#124; Ca &#124; ইটের মতো লাল &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p105 | &#124; Sr &#124; গাঢ় লাল বা crimson red &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p106 | &#124; Ba &#124; আপেল-সবুজ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p107 | &#124; Mg ও Be &#124; সাধারণত বিশেষ রং দেয় না &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p108 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Comparison between alkali metals and alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts Group 1 and Group 2 metals across valence electrons, typical ions, valency, reactivity, and examples.

Accuracy: **accurate**. The comparative parameters between Group 1 and Group 2 metals are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p109 | ## ক্ষার ধাতু ও ক্ষারীয় মৃত্তিকা ধাতুর পার্থক্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | &#124; বিষয় &#124; ক্ষার ধাতু (Group 1) &#124; ক্ষারীয় মৃত্তিকা ধাতু (Group 2) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p111 | &#124;---&#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p112 | &#124; সর্ববহিঃস্থ ইলেকট্রন &#124; ১টি &#124; ২টি &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p113 | &#124; সাধারণ আয়ন &#124; \(M^+\) &#124; \(M^{2+}\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p114 | &#124; যোজ্যতা &#124; ১ &#124; ২ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p115 | &#124; বিক্রিয়াশীলতা &#124; বেশি &#124; তুলনামূলক কম &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p116 | &#124; উদাহরণ &#124; Na, K &#124; Mg, Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u17: Mnemonic for Group 2 elements (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p121", "quote": "“বেরি মাগে কাঁচা স্রবণ বারবার রাতে আসে।”"}]}

Annotation rationale: Provides a Bengali mnemonic sentence to remember the sequence Be, Mg, Ca, Sr, Ba, Ra.

Accuracy: **accurate**. The mnemonic maps cleanly to the chemical symbols Be, Mg, Ca, Sr, Ba, Ra.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | ## মনে রাখার সহজ উপায় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | **Be Mg Ca Sr Ba Ra** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p120 | বাংলায় মনে রাখতে পারো: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p121 | **“বেরি মাগে কাঁচা স্রবণ বারবার রাতে আসে।”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p122 | এখানে প্রথম অক্ষরগুলো যথাক্রমে Be, Mg, Ca, Sr, Ba, Ra বোঝায়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p123 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u18: Recap summary of alkaline earth metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise concluding summary of Group 2 metals.

Accuracy: **accurate**. Accurately summarizes the core points of the explanation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p124 | ### সংক্ষেপে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p125 | ক্ষারীয় মৃত্তিকা ধাতু হলো পর্যায় সারণির ২ নম্বর গোষ্ঠীর ধাতু। এদের বাইরের স্তরে ২টি ইলেকট্রন থাকে, তাই এরা সাধারণত \(+2\) আয়ন গঠন করে। ম্যাগনেসিয়াম ও ক্যালসিয়াম এ গোষ্ঠীর সবচেয়ে পরিচিত সদস্য এবং জীবদেহ ও শিল্পে এদের ব্যাপক ব্যবহার রয়েছে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

