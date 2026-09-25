# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive, clear, and accurate explanation of isotopes (samsthanik) in Hindi, covering definition, atomic structure, examples, properties, and applications.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 47,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 47,
  "unique_subtopics": 7,
  "contextualization": {
    "localized": 1,
    "everyday": 3,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and etymological meaning of isotope (samsthanik) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p2", "quote": "हिंदी में Isotope को **'समस्थानिक'** कहा जाता है। अगर आप इस शब्द को तोड़ें, तो इसका मतलब है: **सम (समान) + स्थानिक (स्थान रखने वाला)**, यानी आवर्त सारणी (Periodic Table) में एक ही स्थान पर रहने वाले तत्व।"}]}

Annotation rationale: Introduces the term 'samsthanik' by breaking down its Hindi linguistic roots (occupying the same place in the periodic table) and provides the standard formal definition (same atomic number, different mass number).

Accuracy: **accurate**. The etymology and definition of isotopes correctly identify them as atoms of the same element having the same atomic number but different mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम केमिस्ट्री (रसायन विज्ञान) का एक बहुत ही महत्वपूर्ण और दिलचस्प टॉपिक समझेंगे, जिसे **Isotope** कहते हैं।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | हिंदी में Isotope को **&#x27;समस्थानिक&#x27;** कहा जाता है। अगर आप इस शब्द को तोड़ें, तो इसका मतलब है: **सम (समान) + स्थानिक (स्थान रखने वाला)**, यानी आवर्त सारणी (Periodic Table) में एक ही स्थान पर रहने वाले तत्व। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | आइए इसे बहुत आसान भाषा में समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### 1. आसान परिभाषा (Simple Definition) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **Isotopes (समस्थानिक)** एक ही तत्व (Element) के ऐसे अलग-अलग रूप (परमाणु) होते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | * जिनका **परमाणु क्रमांक (Atomic Number)** तो **समान (Same)** होता है, | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | * लेकिन उनकी **द्रव्यमान संख्या (Mass Number)** **अलग-अलग (Different)** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Twin brothers analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "मान लीजिए आपके स्कूल में दो जुड़वां भाई हैं—'अमन' और 'रमन'। "}]}

Annotation rationale: Uses an analogy of twin brothers who look the same and share the same class/identity but differ in body weight to explain identical identity/chemical behavior with differing mass.

Accuracy: **accurate**. The analogy accurately captures the conceptual distinction between identity/chemical appearance and physical weight/mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p10 | ### 2. एक मज़ेदार उदाहरण (Real-Life Analogy) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | मान लीजिए आपके स्कूल में दो जुड़वां भाई हैं—&#x27;अमन&#x27; और &#x27;रमन&#x27;।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | * दोनों का चेहरा एक जैसा है, दोनों एक ही कक्षा में पढ़ते हैं और उनका रोल नंबर भी लगभग एक जैसा है। | ANALOGY | {} | [&#x27;list&#x27;] |
| p13 | * लेकिन, अमन का वजन 45 किलो है और रमन का वजन 50 किलो है।  | ANALOGY | {} | [&#x27;list&#x27;] |
| p14 | **Isotopes भी बिल्कुल ऐसे ही होते हैं!** वे दिखने में और रासायनिक रूप से एक जैसे होते हैं, बस उनके **वजन (Mass)** में फर्क होता है। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Atomic composition: Protons versus neutrons in isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the underlying subatomic mechanism of isotopes: identical number of protons fixes atomic number/identity, while different numbers of neutrons cause the variation in mass number.

Accuracy: **accurate**. The explanation correctly describes that isotopes possess the same proton number but different neutron numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ### 3. इसके पीछे का विज्ञान (Inside the Atom) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | हम जानते हैं कि एक परमाणु (Atom) के अंदर तीन चीजें होती हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | 1. **प्रोटॉन (Protons)** - (यह तय करता है कि तत्व कौन-सा है) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p19 | 2. **इलेक्ट्रॉन (Electrons)** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 | 3. **न्यूट्रॉन (Neutrons)** - (यह वजन बढ़ाता है) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | &gt; **गोल्डन रूल याद रखें:** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | &gt; Isotopes में **प्रोटॉन की संख्या हमेशा बराबर** होती है (इसलिए Atomic Number सेम रहता है), लेकिन **न्यूट्रॉन की संख्या अलग-अलग** होती है (जिसकी वजह से Mass Number बदल जाता है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of hydrogen: Protium, deuterium, and tritium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p27", "quote": "1. **प्रोटियम ($^1_1H$):** 1 प्रोटॉन, 0 न्यूट्रॉन (यह आम हाइड्रोजन है जो पानी में होता है)"}]}

Annotation rationale: Illustrates the concept of isotopes using the three isotopes of hydrogen, detailing their composition (protons and neutrons).

Accuracy: **accurate**. Protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n, radioactive) are described completely accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | ### 4. सबसे प्रसिद्ध उदाहरण (Examples) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | #### **क) हाइड्रोजन (Hydrogen) के 3 समस्थानिक:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | प्रकृति में हाइड्रोजन 3 रूपों में मिलता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | 1. **प्रोटियम ($^1_1H$):** 1 प्रोटॉन, 0 न्यूट्रॉन (यह आम हाइड्रोजन है जो पानी में होता है) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | 2. **ड्यूटेरियम ($^2_1H$):** 1 प्रोटॉन, **1 न्यूट्रॉन** (इसे भारी हाइड्रोजन भी कहते हैं) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | 3. **ट्रिटियम ($^3_1H$):** 1 प्रोटॉन, **2 न्यूट्रॉन** (यह रेडियोएक्टिव होता है) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | *(तीनों हैं हाइड्रोजन ही, लेकिन न्यूट्रॉन बढ़ने से इनका भार 1, 2 और 3 हो गया!)* | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Isotopes of carbon: Carbon-12 and carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p32", "quote": "* **कार्बन-12 ($^{12}C$):** 6 प्रोटॉन + 6 न्यूट्रॉन (सामान्य कार्बन, जो कोयले या हममें है)"}]}

Annotation rationale: Illustrates isotopes using carbon-12 and carbon-14, noting carbon-14's application in radiocarbon dating.

Accuracy: **accurate**. The proton/neutron counts for Carbon-12 (6p, 6n) and Carbon-14 (6p, 8n) and Carbon-14's use in radiocarbon dating are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | #### **ख) कार्बन (Carbon):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | * **कार्बन-12 ($^{12}C$):** 6 प्रोटॉन + 6 न्यूट्रॉन (सामान्य कार्बन, जो कोयले या हममें है) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | * **कार्बन-14 ($^{14}C$):** 6 प्रोटॉन + **8 न्यूट्रॉन** (इसका उपयोग पुरानी जीवाश्मों और हड्डियों की उम्र पता करने यानी *Carbon Dating* में होता है) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Chemical versus physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share the same chemical properties (same electron configuration) but differ in physical properties (differing mass, density, and boiling point).

Accuracy: **accurate**. The physical and chemical property distinctions are scientifically accurate and standard for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ### 5. इनकी विशेषताएं (Characteristics) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | 1. **रासायनिक गुण (Chemical Properties) समान होते हैं:** क्योंकि इनमें इलेक्ट्रॉनों की संख्या समान होती है, इसलिए ये एक जैसी रासायनिक अभिक्रियाएं (reactions) करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p37 | 2. **भौतिक गुण (Physical Properties) अलग होते हैं:** क्योंकि इनका द्रव्यमान (वजन), घनत्व (density) और क्वथनांक (boiling point) थोड़ा अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Application of uranium-235 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites uranium-235 as an example of an isotope used in nuclear power generation.

Accuracy: **accurate**. Uranium-235 is indeed used as fissile fuel in nuclear reactors to generate power.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | ### 6. Isotopes हमारे किस काम आते हैं? (Uses) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | परीक्षा में अक्सर इसके उपयोग पूछे जाते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | * **यूरेनियम-235 ($^{235}U$):** इसका उपयोग परमाणु ऊर्जा संयंत्रों (Nuclear Power Plants) में बिजली बनाने के लिए किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Application of cobalt-60 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites cobalt-60 as an example of an isotope used in radiation therapy for cancer treatment.

Accuracy: **accurate**. Cobalt-60 is widely used in radiation therapy for cancer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | * **कोबाल्ट-60 ($^{60}Co$):** कैंसर के इलाज (Radiation Therapy) में इसका उपयोग होता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application of iodine-131 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites iodine-131 as an example of an isotope used in thyroid/goitre treatment.

Accuracy: **accurate**. Iodine-131 is standard in medical treatments for thyroid diseases and goitre.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | * **आयोडीन-131 ($^{131}I$):** घेंघा रोग (Goitre/Thyroid) के इलाज में काम आता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Quick summary for revision (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary formula and recap of key isotope concepts and examples for revision.

Accuracy: **accurate**. The summary correctly recaps the core definition and key examples.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ### सारांश (Quick Summary for Revision) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | * **Isotope = Same Protons (Atomic No.), Different Neutrons (Mass No.)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p46 | * उदाहरण: हाइड्रोजन के 3 रूप (प्रोटियम, ड्यूटेरियम, ट्रिटियम)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | क्या आपको न्यूट्रॉन और प्रोटॉन का यह सम्बंध समझ आया, या आप कोई खास उदाहरण दोबारा समझना चाहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

