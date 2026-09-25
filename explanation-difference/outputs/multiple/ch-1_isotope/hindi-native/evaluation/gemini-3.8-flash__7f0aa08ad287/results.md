# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains isotopes for a high school chemistry student, including foundational atomic concepts, definition, an illustrative analogy, examples (hydrogen and carbon), physical/chemical properties, and technological applications.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 48,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 48,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 10,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Atomic structure: protons, neutrons, atomic number, and mass number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the prerequisite concepts of atomic nucleus, protons determining element identity (atomic number), neutrons, and mass number.

Accuracy: **accurate**. Accurately describes atomic structure, protons, neutrons, atomic number, and mass number at high-school introductory level.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! एक शिक्षक के रूप में, मुझे विज्ञान की जटिल अवधारणाओं को आसान बनाकर सिखाना बहुत पसंद है।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | आज हम रसायन विज्ञान (Chemistry) के एक बहुत ही महत्वपूर्ण और दिलचस्प विषय को समझेंगे—**समस्थानिक (Isotopes)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | इसे रटने के बजाय, आइए एक कहानी और उदाहरण से समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### 1. पहले आधार समझें (Flashback) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | हम जानते हैं कि हर परमाणु (Atom) के नाभिक (Nucleus) में दो मुख्य कण होते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. **प्रोटॉन (Proton):** यह परमाणु का &#x27;आधार कार्ड&#x27; या &#x27;रोल नंबर&#x27; है। अगर प्रोटॉन की संख्या बदली, तो तत्व (Element) ही बदल जाएगा। इसे हम **परमाणु क्रमांक (Atomic Number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 2. **न्यूट्रॉन (Neutron):** यह नाभिक में प्रोटॉन के साथ रहता है, लेकिन इस पर कोई चार्ज नहीं होता।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | (प्रोटॉन + न्यूट्रॉन) की कुल संख्या को हम **परमाणु भार (Mass Number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition and etymological meaning of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the Hindi word 'समस्थानिक' (same position in the periodic table) and provides the formal scientific definition of isotopes.

Accuracy: **accurate**. The definition and etymology accurately describe atoms of the same element having the same atomic number but differing mass numbers due to neutron differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### 2. तो, &#x27;समस्थानिक&#x27; (Isotopes) क्या हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | शब्द को तोड़कर देखिए: **सम + स्थानिक** = जिनका आवर्त सारणी (Periodic table) में **&#x27;स्थान समान&#x27;** हो। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | **सरल परिभाषा:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | &gt; &quot;एक ही तत्व के ऐसे अलग-अलग रूप (परमाणु), जिनके पास **प्रोटॉन की संख्या (परमाणु क्रमांक) तो समान** होती है, लेकिन **न्यूट्रॉन की संख्या अलग** होने के कारण उनका **परमाणु भार (Mass Number) भिन्न** होता है, उन्हें **समस्थानिक (Isotopes)** कहते हैं।&quot; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Everyday school bag analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p17", "quote": "मान लीजिए आपके स्कूल बैग का वजन 3 किलोग्राम है।"}, {"passage_id": "p18", "quote": "अब सोचिए, आप वही छात्र हैं (आपकी पहचान नहीं बदली), लेकिन एक दिन आपने बैग में दो भारी किताबें अतिरिक्त रख लीं। अब आपका कुल वजन 2 किलो बढ़ गया।"}]}

Annotation rationale: Uses the analogy of a student carrying extra books in a backpack to illustrate that an atom retains its identity while having extra mass.

Accuracy: **accurate**. The analogy appropriately conveys how identity remains unchanged despite added weight.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ### 3. एक मज़ेदार उदाहरण (Daily Life Analogy) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | मान लीजिए आपके स्कूल बैग का वजन 3 किलोग्राम है।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p18 | अब सोचिए, आप वही छात्र हैं (आपकी पहचान नहीं बदली), लेकिन एक दिन आपने बैग में दो भारी किताबें अतिरिक्त रख लीं। अब आपका कुल वजन 2 किलो बढ़ गया।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p19 | क्या किताबें बढ़ने से आपका नाम बदल गया? नहीं!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p20 | **आप वही हैं, बस आपका वजन बढ़ गया।**  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p21 | समस्थानिक बिल्कुल ऐसे ही होते हैं—तत्व वही रहता है, बस कुछ परमाणुओं की जेब में न्यूट्रॉन ज़्यादा आ जाते हैं, जिससे वे भारी हो जाते हैं! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u4: Isotopes of hydrogen: protium, deuterium, and tritium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using hydrogen's three named isotopes (protium, deuterium, and tritium).

Accuracy: **accurate**. Correctly states the proton and neutron counts for protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n, radioactive).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p23 | ### 4. विज्ञान की दुनिया से सबसे प्रसिद्ध उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | #### (क) हाइड्रोजन के तीन भाई (Hydrogen Isotopes) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | हाइड्रोजन प्रकृति का इकलौता ऐसा तत्व है जिसके समस्थानिकों के अलग-अलग नाम भी हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | 1. **प्रोटियम ($^1H$):** 1 प्रोटॉन, **0 न्यूट्रॉन** (यह सबसे सामान्य हाइड्रोजन है जो पानी में होता है)। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | 2. **ड्यूटीरियम ($^2H$):** 1 प्रोटॉन, **1 न्यूट्रॉन** (इसे &#x27;भारी हाइड्रोजन&#x27; कहते हैं, इससे भारी जल बनता है)। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | 3. **ट्रिटियम ($^3H$):** 1 प्रोटॉन, **2 न्यूट्रॉन** (यह रेडियोधर्मी यानी Radioactive होता है)। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | *ध्यान दें: तीनों में प्रोटॉन केवल 1 ही है, इसलिए तीनों ही &#x27;हाइड्रोजन&#x27; हैं!* | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Isotopes of carbon: carbon-12 and carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using carbon-12 and carbon-14.

Accuracy: **accurate**. Accurately gives proton and neutron numbers for C-12 and C-14.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | #### (ख) कार्बन (Carbon) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | * **कार्बन-12 ($^{12}C$):** इसमें 6 प्रोटॉन और 6 न्यूट्रॉन हैं। (हमारे चारों ओर 99% यही है)। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | * **कार्बन-14 ($^{14}C$):** इसमें 6 प्रोटॉन और **8 न्यूट्रॉन** हैं। (यह दुर्लभ और रेडियोधर्मी है)। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share identical chemical properties (same electron configuration) while physical properties vary due to different masses.

Accuracy: **accurate**. Correctly explains the physical basis behind identical chemical properties and slightly different physical properties.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | ### 5. इनके गुण (Properties) कैसे होते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | * **रासायनिक गुण (Chemical Properties):** ये **एक जैसे** होते हैं, क्योंकि रासायनिक क्रियाओं में इलेक्ट्रॉन भाग लेते हैं और समस्थानिकों में इलेक्ट्रॉनों की संख्या समान होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 | * **भौतिक गुण (Physical Properties):** भार अलग होने के कारण इनका घनत्व (density), क्वथनांक (boiling point) आदि **थोड़े अलग** हो सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Application of carbon-14 in radiocarbon dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-14 dating of fossils, wood, and historical structures as a concrete application of isotopes.

Accuracy: **accurate**. Accurately identifies Carbon-14 as the isotope used in radiocarbon dating.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### 6. हम समस्थानिकों के बारे में क्यों पढ़ते हैं? (इनका उपयोग) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | समस्थानिक केवल किताबों में नहीं हैं, ये हमारे बहुत काम आते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | 1. **कार्बन डेटिंग (Carbon-14):** पुरानी लकड़ियों, जीवाश्मों और मिस्र के पिरामिडों की उम्र पता लगाने के लिए। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Application of cobalt-60 in cancer radiotherapy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the medical use of Cobalt-60 radiation therapy to destroy cancer cells.

Accuracy: **accurate**. Accurately identifies Cobalt-60 for cancer radiotherapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | 2. **कैंसर के इलाज में:** कोबाल्ट-60 ($^{60}Co$) का उपयोग कैंसर कोशिकाओं को नष्ट करने के लिए किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Application of iodine-131 in thyroid treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the medical use of Iodine-131 in thyroid/goitre diagnostics and treatment.

Accuracy: **accurate**. Accurately identifies Iodine-131 in thyroid diagnosis and treatment.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | 3. **घेंघा रोग (Goitre) की जांच:** आयोडीन-131 ($^{131}I$) का उपयोग थायरॉइड ग्रंथि के इलाज में होता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Application of uranium-235 in nuclear power (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of Uranium-235 as nuclear fuel in power reactors.

Accuracy: **accurate**. Accurately identifies Uranium-235 as a nuclear reactor fuel.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | 4. **परमाणु ऊर्जा:** यूरेनियम-235 ($^{235}U$) का उपयोग बिजली बनाने वाले परमाणु रिएक्टरों में ईंधन के रूप में होता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u11: Summary takeaway of isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key distinction between what remains identical (atomic number) and what differs (mass number / neutron count) in isotopes.

Accuracy: **accurate**. Accurately summarizes the core definition of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p45 | ### संक्षेप में याद रखने का मूलमंत्र: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | * **समान:** परमाणु क्रमांक (प्रोटॉन की संख्या)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p47 | * **भिन्न:** द्रव्यमान संख्या (न्यूट्रॉन की संख्या)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p48 | आशा है कि अब आपको &#x27;समस्थानिक&#x27; की अवधारणा पूरी तरह स्पष्ट हो गई होगी! क्या आप इससे जुड़ा कोई सवाल पूछना चाहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

