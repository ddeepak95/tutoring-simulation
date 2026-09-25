# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the identity, periodic table location, mnemonic, naming origin, chemical and physical properties, daily-life applications, and exam summary of Group 2 alkaline earth metals in Hindi.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 44,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "STUDY_SUPPORT": 2,
    "EXAMPLE": 3
  },
  "nested_passages": 44,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 4,
    "localized": 1,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Location and members of Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces alkaline earth metals as Group 2 elements and enumerates the six member elements.

Accuracy: **accurate**. Correctly states that alkaline earth metals are located in Group 2 of the periodic table and accurately names all 6 elements (Be, Mg, Ca, Sr, Ba, Ra) noting radium's radioactivity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम आवर्त सारणी (Periodic Table) के एक बहुत ही दिलचस्प और महत्वपूर्ण परिवार के बारे में बात करेंगे, जिसे **&quot;Alkaline Earth Metals&quot;** यानी **&quot;क्षारीय मृदा धातुएं&quot;** कहा जाता है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | आइए इसे बिल्कुल आसान भाषा में समझते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. ये कहाँ पाए जाते हैं? (Where are they?) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | अगर आप मॉडर्न पीरियोडिक टेबल देखेंगे, तो बिल्कुल बाईं तरफ **Group 2 (समूह 2)** में ये तत्व (elements) मौजूद होते हैं।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | इस परिवार में कुल 6 सदस्य हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. **Be** - बेरिलियम (Beryllium) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | 2. **Mg** - मैग्नीशियम (Magnesium) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 3. **Ca** - कैल्शियम (Calcium) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 4. **Sr** - स्ट्रोंटियम (Strontium) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | 5. **Ba** - बेरियम (Barium) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | 6. **Ra** - रेडियम (Radium - यह रेडियोएक्टिव है) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Mnemonic trick for remembering Group 2 elements (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p14", "quote": "> **Be**ta **M**an**g**e **Ca**r **S**coote**r** **Ba**ap **Ra**zi "}, {"passage_id": "p15", "quote": "> (बेटा मांगे कार स्कूटर, बाप राज़ी!)"}]}

Annotation rationale: Provides a popular Hindi acrostic mnemonic to memorize the order of the Group 2 elements.

Accuracy: **accurate**. The mnemonic accurately maps the syllables/letters to Be, Mg, Ca, Sr, Ba, and Ra in down-the-group sequence.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | &gt; **याद रखने की मज़ेदार ट्रिक:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | &gt; **Be**ta **M**an**g**e **Ca**r **S**coote**r** **Ba**ap **Ra**zi  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p15 | &gt; (बेटा मांगे कार स्कूटर, बाप राज़ी!) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u3: Etymology of 'Alkaline Earth' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why these metals are called 'Alkaline Earth', referencing the basic nature of their oxides/hydroxides and the historical geological meaning of 'earth'.

Accuracy: **accurate**. Accurately describes the basic/alkaline properties of their oxides and hydroxides (pH > 7) and the historical chemical designation of mineral oxides found in the Earth's crust as 'earths'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p17 | ### 2. इन्हें &quot;Alkaline Earth Metals&quot; क्यों कहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | इस नाम के पीछे दो मुख्य कारण हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | * **Alkaline (क्षारीय):** जब ये धातुएं पानी या ऑक्सीजन से क्रिया करती हैं, तो इनके ऑक्साइड और हाइड्रॉक्साइड **Basic (क्षारीय)** प्रकृति के होते हैं (यानी जिनका pH मान 7 से ज्यादा होता है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 | * **Earth (मृदा):** पुराने समय में वैज्ञानिक मिट्टी/भू-पर्पटी (Earth&#x27;s crust) में पाए जाने वाले ऐसे अघुलनशील पदार्थों को &#x27;Earth&#x27; कहते थे। चूंकि ये तत्व जमीन की ऊपरी सतह (crust) में खनिजों के रूप में मिलते हैं, इसलिए इन्हें &quot;Earth&quot; कहा गया। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u4: Key properties of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p36", "quote": "(पटाखों में हरा रंग बेरियम के कारण ही होता है!)"}]}

Annotation rationale: Explains the electronic configuration, valency/ion charge, physical properties, reactivity trend, and characteristic flame test colors.

Accuracy: **accurate**. All properties are factually sound: ns^2 configuration, formation of +2 ions, valency 2, silvery-white appearance, higher hardness/melting points than alkali metals, downward increase in reactivity, and flame colors (Ca brick red, Ba apple green).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ### 3. इनकी मुख्य विशेषताएं (Key Properties) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | एक हाई स्कूल छात्र के रूप में, आपको इनके ये गुण जरूर पता होने चाहिए: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | 1. **इलेक्ट्रॉनिक विन्यास (Electronic Configuration):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 |    * इनके सबसे बाहरी कोश (outermost shell) में हमेशा **2 इलेक्ट्रॉन** होते हैं ($ns^2$)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | 2. **संयोजकता (Valency):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 |    * ये आसानी से अपने 2 इलेक्ट्रॉन त्याग देते हैं और **$+2$ आयन ($M^{2+}$)** बनाते हैं (जैसे: $Ca^{2+}$, $Mg^{2+}$)। इसलिए इनकी संयोजकता (Valency) **2** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p28 | 3. **भौतिक गुण (Physical Properties):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 |    * ये चांदी जैसे सफेद (Silvery-white) और चमकदार होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 |    * ये Group 1 (Alkali metals) की तुलना में थोड़े **कठोर (harder)** होते हैं और इनका गलनांक (Melting point) भी उनसे अधिक होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p31 | 4. **अभिक्रियाशीलता (Reactivity):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 |    * ये काफी क्रियाशील धातुएं हैं (हालाँकि Group 1 से थोड़ी कम)।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p33 |    * समूह में ऊपर से नीचे जाने पर (Be से Ba की ओर) इनकी अभिक्रिया करने की क्षमता **बढ़ती** है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p34 | 5. **ज्वाला परीक्षण (Flame Test):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 |    * जब इन्हें आग की लौ पर गर्म किया जाता है, तो ये अलग-अलग रंग देते हैं।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 |    * जैसे: **Calcium** ईंट जैसा लाल (Brick red) रंग देता है, और **Barium** सेब जैसा हरा (Apple green) रंग देता है। (पटाखों में हरा रंग बेरियम के कारण ही होता है!) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Everyday applications of calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p39", "quote": "हमारी हड्डियों, दांतों और दूध में पाया जाता है। सीमेंट और चूना बनाने में भी इसका उपयोग होता है।"}]}

Annotation rationale: Illustrates daily-life and industrial roles of calcium in bones, teeth, milk, cement, and lime.

Accuracy: **accurate**. Correctly states calcium's occurrence in biological structures (bones, teeth), milk, and its use in cement and lime production.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### 4. हमारे दैनिक जीवन में इनका उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | * **कैल्शियम (Ca):** हमारी हड्डियों, दांतों और दूध में पाया जाता है। सीमेंट और चूना बनाने में भी इसका उपयोग होता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Everyday and biological applications of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p40", "quote": "पटाखों में जो चमकदार सफेद रोशनी होती है, वह मैग्नीशियम के जलने से होती है।"}]}

Annotation rationale: Illustrates applications of magnesium in pyrotechnics and its biological presence in chlorophyll.

Accuracy: **accurate**. Accurately mentions magnesium burning with a bright white flame in pyrotechnics and its central role in chlorophyll.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | * **मैग्नीशियम (Mg):** पटाखों में जो चमकदार सफेद रोशनी होती है, वह मैग्नीशियम के जलने से होती है। यह पौधों के क्लोरोफिल (Chlorophyll) का मुख्य हिस्सा है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Medical application of radium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives a real-world medical example of radium's usage in cancer radiotherapy.

Accuracy: **accurate**. Accurately references radium's historical and targeted therapeutic use in radiation therapy for cancer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | * **रेडियम (Ra):** कैंसर के इलाज (Radiotherapy) में इस्तेमाल होता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Summary recap for examinations (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise exam-oriented definition and recap of alkaline earth metals, followed by a closing conversational prompt.

Accuracy: **accurate**. Accurately summarizes alkaline earth metals as Group 2 elements with 2 valence electrons, +2 oxidation states, and basic oxides.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ### संक्षेप में (Summary for Exams): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | &quot;ग्रुप 2 के तत्व जिनके बाहरी कोश में 2 इलेक्ट्रॉन होते हैं, जो $+2$ ऑक्सीकरण अवस्था दिखाते हैं और जिनके ऑक्साइड क्षारीय होते हैं, उन्हें **Alkaline Earth Metals** कहते हैं।&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p44 | क्या आपको किसी विशेष तत्व (जैसे मैग्नीशियम या कैल्शियम की केमिकल रिएक्शन) के बारे में और गहराई से जानना है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

