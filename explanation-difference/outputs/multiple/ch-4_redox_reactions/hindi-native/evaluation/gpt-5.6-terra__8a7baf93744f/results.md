# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation thoroughly introduces oxidation-reduction reactions, covering definitions (electron transfer, oxygen/hydrogen transfer, oxidation numbers), half-reactions, oxidizing and reducing agents, everyday examples, and review points in Hindi for high school level.

## Counts

```json
{
  "total_content_units": 15,
  "substantive_content_units": 15,
  "total_passages": 127,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 8,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 127,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 11,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 15
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Redox Reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the etymology of the word 'redox' and defines a redox reaction as a chemical process where oxidation and reduction occur simultaneously.

Accuracy: **accurate**. The etymology and definition of redox reactions as simultaneous oxidation and reduction processes are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## रेडॉक्स अभिक्रियाएँ (Redox Reactions) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **रेडॉक्स** शब्द दो शब्दों से मिलकर बना है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **रेड**क्शन (Reduction) = अपचयन   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **ऑक्स**ीडेशन (Oxidation) = ऑक्सीकरण   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | जिस रासायनिक अभिक्रिया में **ऑक्सीकरण और अपचयन दोनों एक साथ** होते हैं, उसे **रेडॉक्स अभिक्रिया** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Concept and Criteria of Oxidation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidation in terms of loss of electrons, addition of oxygen, removal of hydrogen, and increase in oxidation state.

Accuracy: **accurate**. All listed criteria for oxidation (loss of electrons, gain of oxygen, loss of hydrogen, increase in oxidation number) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## 1. ऑक्सीकरण क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | ऑक्सीकरण वह प्रक्रिया है जिसमें किसी पदार्थ से **इलेक्ट्रॉन निकलते हैं**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | इसे इस प्रकार भी पहचान सकते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | - इलेक्ट्रॉन का **हानि** होना   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - ऑक्सीजन का **जुड़ना**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - हाइड्रोजन का **हटना**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - ऑक्सीकरण संख्या (Oxidation Number) का **बढ़ना** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Oxidation Half-Reaction of Magnesium (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows magnesium losing two electrons to form Mg2+ with step-by-step reasoning demonstrating oxidation.

Accuracy: **accurate**. Mg losing 2 electrons to form Mg2+ is an accurate oxidation half-reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | यहाँ मैग्नीशियम (Mg) ने 2 इलेक्ट्रॉन खो दिए, इसलिए इसका **ऑक्सीकरण** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Concept and Criteria of Reduction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines reduction as gain of electrons, loss of oxygen, addition of hydrogen, and decrease in oxidation state.

Accuracy: **accurate**. All listed reduction criteria are factually correct and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## 2. अपचयन क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | अपचयन वह प्रक्रिया है जिसमें कोई पदार्थ **इलेक्ट्रॉन ग्रहण करता है**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | इसे इस प्रकार पहचान सकते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | - इलेक्ट्रॉन का **लाभ** होना   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - ऑक्सीजन का **हटना**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | - हाइड्रोजन का **जुड़ना**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | - ऑक्सीकरण संख्या का **घटना** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Reduction Half-Reaction of Copper Ion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates reduction via Cu2+ gaining two electrons to yield Cu metal.

Accuracy: **accurate**. The equation Cu2+ + 2e- -> Cu accurately models a reduction half-reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | यहाँ कॉपर आयन \((Cu^{2+})\) ने 2 इलेक्ट्रॉन प्राप्त किए, इसलिए इसका **अपचयन** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: OIL RIG Mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mnemonic OIL RIG (Oxidation Is Loss, Reduction Is Gain) and a simple Hindi equivalent for remembering electron transfer.

Accuracy: **accurate**. The OIL RIG mnemonic is accurately expanded and explained in both English and Hindi.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## याद रखने की ट्रिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | अंग्रेज़ी की एक प्रसिद्ध ट्रिक है: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p35 | &gt; **OIL RIG** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p36 | - **OIL** = Oxidation Is Loss (ऑक्सीकरण में इलेक्ट्रॉन की हानि)   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p37 | - **RIG** = Reduction Is Gain (अपचयन में इलेक्ट्रॉन का लाभ) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p38 | हिंदी में याद रखें: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p39 | &gt; **ऑक्सीकरण = इलेक्ट्रॉन खोना**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p40 | &gt; **अपचयन = इलेक्ट्रॉन पाना** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Redox Reaction of Zinc and Copper Sulfate with Agent Identification (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the reaction Zn + CuSO4 -> ZnSO4 + Cu into ionic equations, half-reactions, and explicitly identifies Cu2+ as the oxidizing agent and Zn as the reducing agent in this reaction.

Accuracy: **accurate**. The reaction Zn + Cu2+ -> Zn2+ + Cu correctly identifies zinc undergoing oxidation and acting as the reducing agent, and Cu2+ undergoing reduction and acting as the oxidizing agent.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | # 3. रेडॉक्स अभिक्रिया का उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | Zn + CuSO_4 \rightarrow ZnSO_4 + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | इसे आयनों के रूप में लिखें: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | अब देखें: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p51 | ### जिंक (Zn) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | Zn \rightarrow Zn^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | जिंक ने इलेक्ट्रॉन खोए हैं, इसलिए **जिंक का ऑक्सीकरण** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p56 | ### कॉपर आयन \((Cu^{2+})\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | कॉपर आयन ने इलेक्ट्रॉन पाए हैं, इसलिए **कॉपर का अपचयन** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | अतः यह एक **रेडॉक्स अभिक्रिया** है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p67 | ऊपर वाले उदाहरण में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | Cu^{2+} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | कॉपर आयन जिंक से इलेक्ट्रॉन लेता है। इसलिए यह **ऑक्सीकारक** है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p74 | उदाहरण में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p75 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | Zn | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | जिंक इलेक्ट्रॉन देता है। इसलिए यह **अपचायक** है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Definitions and Rules of Oxidizing and Reducing Agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the general definitions of oxidizing agent and reducing agent alongside a summary table of their behavior.

Accuracy: **accurate**. The conceptual definitions and table for oxidizing agents (electron acceptors, causing oxidation) and reducing agents (electron donors, causing reduction) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | # 4. ऑक्सीकारक और अपचायक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | रेडॉक्स अभिक्रिया में दो विशेष पदार्थ होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p65 | ## (क) ऑक्सीकारक पदार्थ (Oxidising Agent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | जो पदार्थ दूसरे पदार्थ का ऑक्सीकरण कराता है और स्वयं अपचयित हो जाता है, उसे **ऑक्सीकारक** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p72 | ## (ख) अपचायक पदार्थ (Reducing Agent) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p73 | जो पदार्थ दूसरे पदार्थ का अपचयन कराता है और स्वयं ऑक्सीकृत हो जाता है, उसे **अपचायक** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p79 | ### सरल नियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | &#124; पदार्थ क्या करता है? &#124; उसका नाम &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p81 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p82 | &#124; इलेक्ट्रॉन ग्रहण करता है &#124; ऑक्सीकारक &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p83 | &#124; इलेक्ट्रॉन देता है &#124; अपचायक &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p84 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Identifying Redox via Oxidation Number Changes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that a reaction involving a change in oxidation numbers of elements is generally a redox reaction.

Accuracy: **accurate**. A change in oxidation states of elements indicates an oxidation-reduction reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p85 | # 5. ऑक्सीकरण संख्या से रेडॉक्स पहचानना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p86 | किसी अभिक्रिया में किसी तत्व की ऑक्सीकरण संख्या बदल रही हो, तो वह सामान्यतः रेडॉक्स अभिक्रिया होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u10: Analysis of Magnesium Combustion using Oxidation Numbers (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates how tracking oxidation numbers in 2Mg + O2 -> 2MgO identifies oxidation and reduction.

Accuracy: **accurate**. Tracking Mg (0 to +2) and O (0 to -2) in the formation of MgO correctly exemplifies redox identification by oxidation states.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p87 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p88 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | - Mg की ऑक्सीकरण संख्या: \(0 \rightarrow +2\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p92 |   इसलिए Mg का **ऑक्सीकरण** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p93 | - O की ऑक्सीकरण संख्या: \(0 \rightarrow -2\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p94 |   इसलिए O का **अपचयन** हुआ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | अतः यह रेडॉक्स अभिक्रिया है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p96 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Everyday Example: Rusting of Iron (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p97", "quote": "# 6. दैनिक जीवन में रेडॉक्स अभिक्रियाएँ"}, {"passage_id": "p99", "quote": "### 1. लोहे में जंग लगना"}, {"passage_id": "p100", "quote": "लोहे का ऑक्सीजन और नमी के साथ अभिक्रिया करना जंग लगने का कारण है।"}]}

Annotation rationale: Presents rusting of iron by reaction with oxygen and moisture as an everyday redox/oxidation process.

Accuracy: **accurate**. Rusting of iron in the presence of water and oxygen is an accurate qualitative example of an everyday redox/oxidation process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | # 6. दैनिक जीवन में रेडॉक्स अभिक्रियाएँ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | रेडॉक्स अभिक्रियाएँ हमारे जीवन में बहुत महत्वपूर्ण हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p99 | ### 1. लोहे में जंग लगना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p100 | लोहे का ऑक्सीजन और नमी के साथ अभिक्रिया करना जंग लगने का कारण है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p101 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | Fe + O_2 + H_2O \rightarrow \text{Rust} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | यह ऑक्सीकरण का उदाहरण है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u12: Everyday Example: Combustion of Fuels (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p105", "quote": "### 2. ईंधन का जलना"}, {"passage_id": "p106", "quote": "लकड़ी, पेट्रोल, गैस आदि का जलना रेडॉक्स अभिक्रिया है।"}]}

Annotation rationale: Illustrates redox reactions through the combustion of methane and common household fuels.

Accuracy: **accurate**. Combustion of methane (CH4 + 2O2 -> CO2 + 2H2O) is a classic, correctly balanced redox reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ### 2. ईंधन का जलना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | लकड़ी, पेट्रोल, गैस आदि का जलना रेडॉक्स अभिक्रिया है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p107 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u13: Everyday Example: Cellular Respiration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p111", "quote": "हमारे शरीर में भोजन का ऑक्सीकरण होकर ऊर्जा निकलती है।"}]}

Annotation rationale: Explains cellular respiration (glucose oxidation releasing energy) as a biological redox process.

Accuracy: **accurate**. Respiration represented qualitatively as Glucose + O2 -> CO2 + H2O + Energy is an accurate high-school level redox illustration.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ### 3. श्वसन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | हमारे शरीर में भोजन का ऑक्सीकरण होकर ऊर्जा निकलती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p112 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p113 | \text{Glucose} + O_2 \rightarrow CO_2 + H_2O + \text{Energy} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u14: Everyday Example: Electric Batteries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p115", "quote": "### 4. बैटरी"}, {"passage_id": "p116", "quote": "बैटरी में बिजली उत्पन्न होने का कारण भी रेडॉक्स अभिक्रियाएँ ही हैं।"}]}

Annotation rationale: Notes that batteries generate electricity through redox reactions.

Accuracy: **accurate**. Electrochemical cells and batteries produce electrical energy directly via spontaneous redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p115 | ### 4. बैटरी | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p116 | बैटरी में बिजली उत्पन्न होने का कारण भी रेडॉक्स अभिक्रियाएँ ही हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Summary of Key Points (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the core principles of oxidation, reduction, agents, and oxidation states in bullet points and a one-line summary.

Accuracy: **accurate**. The summary accurately consolidates all the concepts presented in the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | # 7. मुख्य बिंदु | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | - **ऑक्सीकरण** = इलेक्ट्रॉन का निकलना   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p120 | - **अपचयन** = इलेक्ट्रॉन का ग्रहण करना   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p121 | - दोनों प्रक्रियाएँ हमेशा साथ-साथ होती हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p122 | - इलेक्ट्रॉन देने वाला पदार्थ **अपचायक** कहलाता है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p123 | - इलेक्ट्रॉन लेने वाला पदार्थ **ऑक्सीकारक** कहलाता है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p124 | - ऑक्सीकरण संख्या में वृद्धि = ऑक्सीकरण   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p125 | - ऑक्सीकरण संख्या में कमी = अपचयन   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p126 | ### एक पंक्ति में | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p127 | &gt; **रेडॉक्स अभिक्रिया में एक पदार्थ इलेक्ट्रॉन खोता है और दूसरा पदार्थ वही इलेक्ट्रॉन प्राप्त करता है।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

