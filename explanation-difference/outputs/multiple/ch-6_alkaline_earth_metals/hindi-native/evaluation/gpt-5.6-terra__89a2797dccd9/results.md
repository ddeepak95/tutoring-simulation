# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains alkaline earth metals, including their definition, group elements, origin of the name, electronic configuration, chemical and physical properties, comparison with alkali metals, occurrence in nature, and everyday applications.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 111,
  "content_unit_kinds": {
    "CONCEPT": 11,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 111,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 9,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and elements of Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the alkaline earth metals as Group 2 elements, lists their atomic numbers and symbols in a table, and notes the radioactivity of radium.

Accuracy: **accurate**. Accurately identifies Group 2 elements (Be, Mg, Ca, Sr, Ba, Ra), their symbols, atomic numbers, and the radioactivity of radium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## क्षारीय मृदा धातुएँ (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | आवर्त सारणी (Periodic Table) के **समूह 2** के तत्वों को **क्षारीय मृदा धातुएँ** कहा जाता है। ये तत्व मुख्यतः पृथ्वी की पपड़ी में खनिजों के रूप में पाए जाते हैं और इनके ऑक्साइड/हाइड्रॉक्साइड सामान्यतः क्षारीय प्रकृति के होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### इस समूह के तत्व | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | &#124; परमाणु क्रमांक &#124; तत्व &#124; प्रतीक &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---:&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; 4 &#124; बेरिलियम &#124; Be &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; 12 &#124; मैग्नीशियम &#124; Mg &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; 20 &#124; कैल्शियम &#124; Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; 38 &#124; स्ट्रॉन्शियम &#124; Sr &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; 56 &#124; बेरियम &#124; Ba &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; 88 &#124; रेडियम &#124; Ra &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &gt; रेडियम एक रेडियोधर्मी (radioactive) तत्व है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin of the name 'alkaline earth' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why these metals are termed 'alkaline earth', detailing their basic hydroxides/oxides and historical reference to earth-like insoluble oxides.

Accuracy: **accurate**. The explanation of both 'alkaline' (forming basic hydroxides) and historical 'earth' (alchemical/early chemical designation for heat-resistant basic oxides) is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## इन्हें “क्षारीय मृदा” क्यों कहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - **क्षारीय (Alkaline):** इनके ऑक्साइड और हाइड्रॉक्साइड पानी में मिलकर क्षारीय घोल बनाते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 |   उदाहरण:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 |   \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 |   CaO + H_2O \rightarrow Ca(OH)_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 |   \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 |   कैल्शियम हाइड्रॉक्साइड क्षारीय होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | - **मृदा (Earth):** पुराने समय में इनके ऑक्साइड मिट्टी जैसे ठोस पदार्थों में पाए जाते थे, जिन्हें “earths” कहा जाता था। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic configuration and formation of +2 ions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the ns^2 valence electronic configuration and why alkaline earth metals readily lose two electrons to form dipositive cations.

Accuracy: **accurate**. The shell configurations for Be, Mg, and Ca, the general valence configuration ns^2, and the ionization equation are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## इलेक्ट्रॉनिक विन्यास | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | इन सभी तत्वों के बाहरी कक्षक (valence shell) में **2 इलेक्ट्रॉन** होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | सामान्य विन्यास: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p29 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | - Be = 2, 2   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | - Mg = 2, 8, 2   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | - Ca = 2, 8, 8, 2   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | ये दो इलेक्ट्रॉन आसानी से खो देते हैं, इसलिए सामान्यतः **+2 आयन** बनाते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Metallic nature and physical properties (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes general metallic properties such as luster, electrical and thermal conductivity, and relative hardness/softness.

Accuracy: **accurate**. Physical properties stated (luster, conductivity, hardness variation from Be to heavier members) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## प्रमुख गुण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | ### 1. ये धातुएँ हैं | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | ये चमकीली, ऊष्मा और विद्युत की सुचालक होती हैं। हालांकि बेरिलियम अपेक्षाकृत कठोर होता है, जबकि कैल्शियम आदि अपेक्षाकृत मुलायम होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Divalency and compound formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that alkaline earth metals exhibit a valency of 2 and an oxidation state of +2 in compounds, illustrated with typical formulas.

Accuracy: **accurate**. Correctly states the valency of 2 and +2 oxidation state, with valid compound examples (MgCl2, CaO, BaSO4).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ### 2. इनकी संयोजकता 2 होती है | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | क्योंकि ये दो इलेक्ट्रॉन छोड़ते हैं, इसलिए इनके यौगिकों में प्रायः +2 ऑक्सीकरण अवस्था होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p43 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p44 | - \(MgCl_2\) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p45 | - \(CaO\) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p46 | - \(BaSO_4\) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Reaction with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the trend in reactivity with water down Group 2 and shows the reaction of calcium with water.

Accuracy: **accurate**. The reaction trend with water (Be inert, Mg with steam/hot water, Ca with cold water) and the balanced equation with Ca are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### 3. जल के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | इनकी जल के साथ अभिक्रियाशीलता ऊपर से नीचे जाने पर बढ़ती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p49 | - बेरिलियम जल से लगभग अभिक्रिया नहीं करता। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p50 | - मैग्नीशियम गर्म जल या भाप से अभिक्रिया करता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p51 | - कैल्शियम ठंडे जल से भी अभिक्रिया करता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p52 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | इस अभिक्रिया में हाइड्रोजन गैस निकलती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u7: Reaction with oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the combustion of alkaline earth metals in oxygen to form oxides, with magnesium's burning reaction as an illustrative example.

Accuracy: **accurate**. The formation of oxide (2Mg + O2 -> 2MgO) and the characteristic dazzling white flame of burning magnesium are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ### 4. ऑक्सीजन के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | ये ऑक्सीजन से मिलकर ऑक्साइड बनाते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p58 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | मैग्नीशियम जलने पर तेज़ सफेद चमकदार लौ देता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u8: Periodic trend in chemical reactivity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical reactivity increases down the group based on increasing atomic radius and easier valence electron loss.

Accuracy: **accurate**. The explanation linking increasing atomic size and decreasing ionization energy to the reactivity order Be < Mg < Ca < Sr < Ba is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | ### 5. नीचे जाने पर अभिक्रियाशीलता बढ़ती है | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | समूह में ऊपर से नीचे जाने पर परमाणु आकार बढ़ता है और बाहरी इलेक्ट्रॉन नाभिक से दूर हो जाते हैं। इसलिए इलेक्ट्रॉन छोड़ना आसान होता जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p64 | अभिक्रियाशीलता का क्रम: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p65 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p67 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p68 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Distinction between alkali metals and alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Warns against confusing Group 1 and Group 2 metals and provides a structured comparison table across key chemical properties.

Accuracy: **accurate**. The comparison table correctly contrasts valence electrons, charge, reactivity, and basicity of hydroxides/oxides between Group 1 and Group 2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p69 | ## क्षार धातुओं से अंतर | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p70 | क्षारीय मृदा धातुओं को **क्षार धातुओं** (Group 1 जैसे Li, Na, K) से भ्रमित नहीं करना चाहिए। | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p71 | &#124; गुण &#124; क्षार धातु (समूह 1) &#124; क्षारीय मृदा धातु (समूह 2) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p72 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p73 | &#124; बाहरी इलेक्ट्रॉन &#124; 1 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p74 | &#124; आयन का आवेश &#124; +1 &#124; +2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p75 | &#124; उदाहरण &#124; Na, K &#124; Mg, Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p76 | &#124; अभिक्रियाशीलता &#124; बहुत अधिक &#124; अपेक्षाकृत कम &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p77 | &#124; ऑक्साइड/हाइड्रॉक्साइड &#124; अधिक प्रबल क्षारीय &#124; क्षारीय, पर अपेक्षाकृत कम &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p78 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Occurrence in nature and key minerals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p82", "quote": "चूना पत्थर, संगमरमर, खड़िया"}]}

Annotation rationale: Explains why alkaline earth metals are not found native/free in nature due to high reactivity, and lists their prominent mineral forms.

Accuracy: **accurate**. The reasoning for combined occurrence and the chemical formulas for calcite/limestone, gypsum, dolomite, magnesite, and barite are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p79 | ## प्रकृति में प्राप्ति | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | ये धातुएँ बहुत अभिक्रियाशील होती हैं, इसलिए प्रकृति में मुक्त अवस्था में नहीं मिलतीं। ये यौगिकों के रूप में पाई जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p81 | कुछ महत्वपूर्ण खनिज: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p82 | - **कैल्शियम कार्बोनेट** \((CaCO_3)\): चूना पत्थर, संगमरमर, खड़िया   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p83 | - **जिप्सम** \((CaSO_4 \cdot 2H_2O)\)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p84 | - **डोलोमाइट** \((CaMg(CO_3)_2)\)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p85 | - **मैग्नेसाइट** \((MgCO_3)\)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p86 | - **बैराइट** \((BaSO_4)\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p87 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Everyday and industrial uses of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p94", "quote": "हड्डियों और दाँतों के निर्माण में आवश्यक"}, {"passage_id": "p95", "quote": "सीमेंट, चूना और प्लास्टर बनाने में"}]}

Annotation rationale: Surveys the practical applications of magnesium, calcium, strontium, barium, and beryllium in industry, biology, and daily life.

Accuracy: **accurate**. All listed uses (Mg in alloys, flares, chlorophyll; Ca in bones, teeth, cement; Sr in red fireworks; BaSO4 as radiocontrast agent for X-rays; Be in specialty alloys) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p88 | ## उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | ### मैग्नीशियम (Mg) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p90 | - हल्की मिश्रधातुएँ बनाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p91 | - आतिशबाजी और फ्लेयर्स में तेज़ सफेद प्रकाश के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p92 | - पौधों के क्लोरोफिल का महत्वपूर्ण भाग | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p93 | ### कैल्शियम (Ca) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | - हड्डियों और दाँतों के निर्माण में आवश्यक | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p95 | - सीमेंट, चूना और प्लास्टर बनाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p96 | - इस्पात उद्योग में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p97 | ### स्ट्रॉन्शियम (Sr) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | - लाल रंग की आतिशबाजी में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p99 | ### बेरियम (Ba) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p100 | - बेरियम सल्फेट \((BaSO_4)\) का उपयोग पेट के एक्स-रे परीक्षण में किया जाता है, क्योंकि यह एक्स-रे को रोकता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p101 | ### बेरिलियम (Be) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | - हल्की और मजबूत मिश्रधातुओं में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p103 | - कुछ विशेष वैज्ञानिक उपकरणों में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Summary of key points to remember (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p110", "quote": "कैल्शियम हड्डियों के लिए और मैग्नीशियम पौधों के लिए महत्वपूर्ण है।"}]}

Annotation rationale: Summarizes the essential high school takeaway points covered in the lesson.

Accuracy: **accurate**. The recap items correctly summarize the key chemical principles and biological roles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ## याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | 1. क्षारीय मृदा धातुएँ आवर्त सारणी के **समूह 2** में होती हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p107 | 2. इनके बाहरी कक्षक में **2 इलेक्ट्रॉन** होते हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p108 | 3. ये सामान्यतः **+2 आयन** बनाती हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p109 | 4. नीचे जाने पर इनकी अभिक्रियाशीलता बढ़ती है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p110 | 5. कैल्शियम हड्डियों के लिए और मैग्नीशियम पौधों के लिए महत्वपूर्ण है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p111 | 6. इनकी तुलना में क्षार धातुएँ अधिक अभिक्रियाशील होती हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

