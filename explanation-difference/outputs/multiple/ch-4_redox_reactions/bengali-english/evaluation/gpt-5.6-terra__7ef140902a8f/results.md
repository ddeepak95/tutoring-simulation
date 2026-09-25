# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high school level explanation of redox reactions in Bengali, covering definitions, electron-transfer mechanisms, half-reactions, oxidizing and reducing agents, oxidation number changes, and everyday real-world examples.

## Counts

```json
{
  "total_content_units": 19,
  "substantive_content_units": 19,
  "total_passages": 127,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 11,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 127,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 15,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 19
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and etymology of redox reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the portmanteau origins of the term 'redox' from reduction and oxidation, and defines a redox reaction in terms of simultaneous electron transfer.

Accuracy: **accurate**. The definition and etymological breakdown of redox reactions are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## রেডক্স বিক্রিয়া কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **Redox** শব্দটি এসেছে দুইটি শব্দ থেকে: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **Red**uction = বিজারণ   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p4 | - **Ox**idation = জারণ   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p5 | যে রাসায়নিক বিক্রিয়ায় একই সঙ্গে **জারণ ও বিজারণ ঘটে**, তাকে **রেডক্স বিক্রিয়া** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | অর্থাৎ, একটি পদার্থ ইলেকট্রন হারায় এবং অন্য একটি পদার্থ সেই ইলেকট্রন গ্রহণ করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Criteria for oxidation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the defining criteria of oxidation including electron loss, oxygen gain, hydrogen loss, and increase in oxidation number.

Accuracy: **accurate**. All four criteria listed for oxidation are scientifically valid.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## ১. জারণ (Oxidation) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | জারণ হলো— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **ইলেকট্রন ত্যাগ করা** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - অক্সিজেন গ্রহণ করা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - হাইড্রোজেন ত্যাগ করা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - জারণ সংখ্যা বৃদ্ধি পাওয়া | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Oxidation half-reaction of magnesium (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the oxidation process using the half-reaction of magnesium losing two electrons to form Mg2+.

Accuracy: **accurate**. The half-reaction Mg -> Mg2+ + 2e- and its designation as oxidation are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | এখানে ম্যাগনেসিয়াম (Mg) ২টি ইলেকট্রন হারিয়েছে। তাই Mg-এর **জারণ** হয়েছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Criteria for reduction (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the defining criteria of reduction including electron gain, oxygen loss, hydrogen gain, and decrease in oxidation number.

Accuracy: **accurate**. All four criteria listed for reduction are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## ২. বিজারণ (Reduction) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | বিজারণ হলো— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | - **ইলেকট্রন গ্রহণ করা** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | - অক্সিজেন ত্যাগ করা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - হাইড্রোজেন গ্রহণ করা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | - জারণ সংখ্যা হ্রাস পাওয়া | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Reduction half-reaction of copper(II) ion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the reduction process using the half-reaction of Cu2+ gaining two electrons to form metallic Cu.

Accuracy: **accurate**. The equation Cu2+ + 2e- -> Cu and its explanation as reduction are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | এখানে \(Cu^{2+}\) ২টি ইলেকট্রন গ্রহণ করেছে। তাই এর **বিজারণ** হয়েছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: OIL RIG mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the English mnemonic OIL RIG (Oxidation Is Loss, Reduction Is Gain) and translates its meaning into Bengali.

Accuracy: **accurate**. The mnemonic OIL RIG is correctly presented and explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## মনে রাখার সহজ কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | ইংরেজিতে একটি প্রচলিত সূত্র: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p34 | &gt; **OIL RIG**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p35 | &gt; **O**xidation **I**s **L**oss   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p36 | &gt; **R**eduction **I**s **G**ain | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p37 | অর্থাৎ: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p38 | - **Oxidation = Electron Loss** → ইলেকট্রন হারানো   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p39 | - **Reduction = Electron Gain** → ইলেকট্রন গ্রহণ করা   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Worked redox reaction between zinc and copper(II) sulfate (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the full and net ionic equation of Zn + CuSO4, breaks it into half-reactions, and identifies Zn as the reducing agent and Cu2+ as the oxidizing agent across noncontiguous passages.

Accuracy: **accurate**. The reaction equations, ionic breakdown, half-reactions, and identification of oxidizing and reducing agents are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | # একটি গুরুত্বপূর্ণ উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | Zn + CuSO_4 \rightarrow ZnSO_4 + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | আয়ন আকারে লিখলে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p46 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | এখন দেখি কী ঘটছে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p50 | ### জিঙ্কের পরিবর্তন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | Zn \rightarrow Zn^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | Zn ইলেকট্রন হারাচ্ছে। তাই Zn-এর **জারণ** হচ্ছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p55 | ### কপারের পরিবর্তন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p57 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \(Cu^{2+}\) ইলেকট্রন গ্রহণ করছে। তাই Cu-এর **বিজারণ** হচ্ছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | অতএব, পুরো বিক্রিয়াটি একটি **রেডক্স বিক্রিয়া**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p66 | উপরের উদাহরণে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p67 | \[ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | Cu^{2+} | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p69 | \] | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p70 | জিঙ্ককে ইলেকট্রন হারাতে বাধ্য করছে। তাই \(Cu^{2+}\) হলো **জারক পদার্থ**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p73 | উপরের উদাহরণে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p74 | \[ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p75 | Zn | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | \] | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p77 | কপার আয়নকে ইলেকট্রন দিচ্ছে। তাই Zn হলো **বিজারক পদার্থ**। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Concepts of oxidizing and reducing agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidizing agents and reducing agents conceptually and summarizes their roles and fates in a comparative table.

Accuracy: **accurate**. The definitions and summary table accurately describe that oxidizing agents oxidize others and are themselves reduced, while reducing agents reduce others and are themselves oxidized.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | # জারক ও বিজারক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | রেডক্স বিক্রিয়ায় দুটি বিশেষ পদার্থ থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p64 | ## জারক পদার্থ (Oxidizing agent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | যে পদার্থ অন্যকে জারিত করে এবং নিজে বিজারিত হয়, তাকে **জারক** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p71 | ## বিজারক পদার্থ (Reducing agent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p72 | যে পদার্থ অন্যকে বিজারিত করে এবং নিজে জারিত হয়, তাকে **বিজারক** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p78 | ### সংক্ষেপে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p79 | &#124; পদার্থ &#124; কী করে? &#124; নিজে কী হয়? &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p80 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p81 | &#124; জারক (Oxidizing agent) &#124; অন্যকে জারিত করে &#124; নিজে বিজারিত হয় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p82 | &#124; বিজারক (Reducing agent) &#124; অন্যকে বিজারিত করে &#124; নিজে জারিত হয় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p83 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Classical definition of oxidation by oxygen (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the classical/historical view of oxidation as the addition of oxygen.

Accuracy: **accurate**. Historically, oxidation was indeed initially defined as the addition of oxygen.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p84 | # অক্সিজেনের সাহায্যে জারণ-বিজারণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p85 | আগে জারণ বলতে শুধু অক্সিজেন যুক্ত হওয়াকে বোঝানো হতো। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u10: Oxidation of magnesium by oxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates classical oxidation using the reaction of magnesium with oxygen to produce MgO.

Accuracy: **accurate**. The reaction 2Mg + O2 -> 2MgO correctly illustrates oxidation via oxygen gain.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p86 | ### জারণের উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | এখানে Mg অক্সিজেন গ্রহণ করেছে। তাই Mg জারিত হয়েছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Reduction of copper(II) oxide by hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates reduction (and simultaneous oxidation) using the reaction CuO + H2 -> Cu + H2O.

Accuracy: **accurate**. CuO losing oxygen to become Cu (reduction) and H2 gaining oxygen to become H2O (oxidation) is described accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p91 | ### বিজারণের উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p92 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | CuO + H_2 \rightarrow Cu + H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | এখানে CuO থেকে অক্সিজেন অপসারিত হয়েছে এবং Cu তৈরি হয়েছে। তাই CuO-এর **বিজারণ** হয়েছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p96 | এখানে হাইড্রোজেন অক্সিজেন গ্রহণ করে পানিতে পরিণত হয়েছে, তাই হাইড্রোজেনের **জারণ** হয়েছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p97 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Identifying redox by oxidation numbers (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidation as an increase in oxidation number and reduction as a decrease in oxidation number.

Accuracy: **accurate**. The rule correlating changes in oxidation number with oxidation and reduction is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | # জারণ সংখ্যা দিয়ে রেডক্স চেনা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | কোনো মৌলের **জারণ সংখ্যা বৃদ্ধি পেলে জারণ**, আর **হ্রাস পেলে বিজারণ**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u13: Worked oxidation number analysis of Fe2+ and Cl2 reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step how changes in oxidation numbers from +2 to +3 for iron and 0 to -1 for chlorine confirm the reaction is a redox process.

Accuracy: **accurate**. The equation and the assignment of oxidation numbers (+2 to +3 for Fe, 0 to -1 for Cl) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p101 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | 2Fe^{2+} + Cl_2 \rightarrow 2Fe^{3+} + 2Cl^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | এখানে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p105 | - Fe: \(+2\) থেকে \(+3\) হয়েছে → জারণ সংখ্যা বেড়েছে → **জারণ** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p106 | - Cl: \(0\) থেকে \(-1\) হয়েছে → জারণ সংখ্যা কমেছে → **বিজারণ** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p107 | অতএব, এটি একটি রেডক্স বিক্রিয়া। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p108 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Everyday redox: Rusting of iron (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p110", "quote": "রেডক্স বিক্রিয়া আমাদের চারপাশে অনেক ঘটে।"}, {"passage_id": "p111", "quote": "লোহায় মরিচা ধরা"}]}

Annotation rationale: Presents iron rusting as an everyday phenomenon involving oxidation by reaction with oxygen.

Accuracy: **accurate**. Rusting of iron is an oxidation reaction between iron and oxygen (along with moisture).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p109 | # দৈনন্দিন জীবনে রেডক্স বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | রেডক্স বিক্রিয়া আমাদের চারপাশে অনেক ঘটে। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p111 | 1. **লোহায় মরিচা ধরা**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p112 |    লোহা অক্সিজেনের সঙ্গে বিক্রিয়া করে জারিত হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u15: Everyday redox: Combustion of fuel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p114", "quote": "কাঠ, কয়লা, গ্যাস ইত্যাদি অক্সিজেনের সঙ্গে বিক্রিয়া করে শক্তি উৎপন্ন করে।"}]}

Annotation rationale: Illustrates redox through burning wood, coal, and gas with oxygen to release energy.

Accuracy: **accurate**. Combustion of common fuels involves rapid oxidation by oxygen.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p113 | 2. **জ্বালানি পোড়ানো**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p114 |    কাঠ, কয়লা, গ্যাস ইত্যাদি অক্সিজেনের সঙ্গে বিক্রিয়া করে শক্তি উৎপন্ন করে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u16: Everyday redox: Respiration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p116", "quote": "আমাদের শরীরে গ্লুকোজ অক্সিজেনের সাহায্যে জারিত হয়ে শক্তি দেয়।"}]}

Annotation rationale: Describes respiration where glucose is oxidized with the help of oxygen to supply energy.

Accuracy: **accurate**. Cellular respiration oxidizes glucose to generate energy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p115 | 3. **শ্বাসক্রিয়া**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p116 |    আমাদের শরীরে গ্লুকোজ অক্সিজেনের সাহায্যে জারিত হয়ে শক্তি দেয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u17: Everyday redox: Batteries or electrochemical cells (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p118", "quote": "ব্যাটারিতে ইলেকট্রন স্থানান্তরের মাধ্যমে বিদ্যুৎ উৎপন্ন হয়।"}]}

Annotation rationale: Explains how electricity is generated in electrochemical cells via electron transfer.

Accuracy: **accurate**. Batteries operate on redox reactions where electron flow produces electric current.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p117 | 4. **ব্যাটারি বা সেল**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p118 |    ব্যাটারিতে ইলেকট্রন স্থানান্তরের মাধ্যমে বিদ্যুৎ উৎপন্ন হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u18: Everyday redox: Photosynthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that carbon dioxide is reduced in plants to form glucose during photosynthesis.

Accuracy: **accurate**. In photosynthesis, CO2 is indeed biochemically reduced to carbohydrates such as glucose. The heading uses 'প্রকাশ-সংশ্লেষণ' (a calque/borrowing from Hindi प्रकाश-संश्लेषण rather than the standard Bengali term সালোকসংশ্লেষণ), but structural headings do not compromise the factual validity of the unit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p119 | 5. **প্রকাশ-সংশ্লেষণ**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p120 |    উদ্ভিদে কার্বন ডাই-অক্সাইড বিজারিত হয়ে গ্লুকোজ তৈরি হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p121 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u19: Summary of redox concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key principles of redox reactions, oxidation/reduction definitions, simultaneous occurrence, and the behavior of agents.

Accuracy: **accurate**. All summary points accurately capture the core concepts of redox chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p122 | ## সারসংক্ষেপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p123 | - **জারণ** = ইলেকট্রন ত্যাগ / জারণ সংখ্যা বৃদ্ধি   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p124 | - **বিজারণ** = ইলেকট্রন গ্রহণ / জারণ সংখ্যা হ্রাস   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p125 | - জারণ ও বিজারণ সব সময় একসঙ্গে ঘটে।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p126 | - যে বিক্রিয়ায় উভয়টি ঘটে, সেটিই **রেডক্স বিক্রিয়া**।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p127 | - **জারক নিজে বিজারিত হয়**, আর **বিজারক নিজে জারিত হয়**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

