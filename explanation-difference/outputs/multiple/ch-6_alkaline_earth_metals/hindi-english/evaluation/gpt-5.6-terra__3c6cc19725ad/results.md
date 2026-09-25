# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains alkaline earth metals (Group 2 elements), their general properties, trends, reactions, key compounds, flame test, anomalous behavior of beryllium, uses, and comparison with alkali metals in Hindi as requested.

## Counts

```json
{
  "total_content_units": 18,
  "substantive_content_units": 18,
  "total_passages": 176,
  "content_unit_kinds": {
    "CONCEPT": 16,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 176,
  "unique_subtopics": 12,
  "contextualization": {
    "none": 13,
    "everyday": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 18
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and List of Group 2 Elements (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines alkaline earth metals as Group 2 elements and presents a complete table listing their names, symbols, atomic numbers, and radioactive nature of radium.

Accuracy: **accurate**. All Group 2 elements, atomic numbers (Be 4 to Ra 88), symbols, and the radioactivity of radium are described accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## क्षारीय मृदा धातुएँ (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | आवर्त सारणी (Periodic Table) के **समूह 2 (Group 2)** में आने वाले तत्वों को **क्षारीय मृदा धातुएँ** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | इन तत्वों के नाम हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; परमाणु क्रमांक &#124; तत्व &#124; प्रतीक &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; 4 &#124; बेरिलियम &#124; Be &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; 12 &#124; मैग्नीशियम &#124; Mg &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; 20 &#124; कैल्शियम &#124; Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; 38 &#124; स्ट्रॉन्शियम &#124; Sr &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; 56 &#124; बेरियम &#124; Ba &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; 88 &#124; रेडियम &#124; Ra &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | रेडियम रेडियोधर्मी (radioactive) होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Reasoning Behind the Name Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why these metals are termed alkaline earth metals, connecting the basic nature of their oxides and their historical occurrence as 'earths'.

Accuracy: **accurate**. The etymological origin based on alkaline oxide formation and historical occurrence in mineral earths is accurate, along with the reaction CaO + H2O -> Ca(OH)2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## इन्हें “क्षारीय मृदा धातुएँ” क्यों कहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - इनके ऑक्साइड, जैसे **CaO**, **MgO**, जल में मिलकर क्षारीय (basic/alkaline) प्रकृति दिखाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - पहले इनके ऑक्साइड पृथ्वी की मिट्टी/खनिजों में पाए जाते थे और इन्हें “earths” कहा जाता था। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | - इसलिए इन्हें **alkaline earth metals** नाम दिया गया। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | CaO + H_2O \rightarrow Ca(OH)_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | यहाँ बनने वाला कैल्शियम हाइड्रॉक्साइड \(\text{Ca(OH)}_2\) क्षारीय होता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic Configuration and Formation of Dipositive Cations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the ns^2 general valence configuration, gives specific configurations, and explains why group 2 elements form M^2+ ions and have a +2 oxidation state.

Accuracy: **accurate**. The ns^2 configuration, electron loss to yield M^2+, and the +2 oxidation state are accurately explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## इलेक्ट्रॉनिक विन्यास | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | इन सभी तत्वों के बाहरी कक्षक (outermost shell) में **2 इलेक्ट्रॉन** होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | सामान्य इलेक्ट्रॉनिक विन्यास: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | \boxed{ns^2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p29 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | - Be: \(1s^2 2s^2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - Mg: \(2, 8, 2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | - Ca: \(2, 8, 8, 2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | ये दो इलेक्ट्रॉन आसानी से छोड़कर \(M^{2+}\) आयन बनाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p35 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | Mg \rightarrow Mg^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p37 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p38 | इसी कारण इनकी सामान्य ऑक्सीकरण अवस्था (oxidation state) **+2** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Physical Properties of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists general physical characteristics including appearance, conductivity, hardness, atomic radius trend, and melting/boiling points relative to Group 1.

Accuracy: **accurate**. All stated physical properties and trends down the group (atomic size Be < Mg < Ca < Sr < Ba, higher hardness, higher melting/boiling points than alkali metals) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ## मुख्य भौतिक गुण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | 1. ये चमकीली, चाँदी जैसी धातुएँ होती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p42 | 2. ये ऊष्मा और विद्युत की अच्छी चालक हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | 3. ये समूह 1 की क्षार धातुओं (जैसे Na, K) की तुलना में अधिक कठोर होती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p44 | 4. नीचे जाने पर परमाणु आकार बढ़ता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p45 | क्रम: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p46 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p48 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p49 | 5. इनकी गलनांक और क्वथनांक सामान्यतः क्षार धातुओं से अधिक होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p50 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction with Oxygen (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how alkaline earth metals react with oxygen to form monoxides, citing Mg burning with a dazzling white flame and Ca forming CaO.

Accuracy: **accurate**. The oxidation reactions and visual observation of magnesium's bright white flame are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | ## रासायनिक गुण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | ### 1. ऑक्सीजन के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | ये ऑक्सीजन से अभिक्रिया करके ऑक्साइड बनाते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p54 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p55 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p56 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p57 | मैग्नीशियम जलने पर बहुत तेज़ सफेद चमकदार लौ देता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p58 | कैल्शियम: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p59 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p60 | 2Ca + O_2 \rightarrow 2CaO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p61 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction with Water (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how reactivity with water increases down the group, describing the behavior of Be, Mg, and Ca/Sr/Ba, along with the reaction equation for Ca.

Accuracy: **accurate**. Correctly states non-reactivity of Be, slow/steam reaction of Mg, vigorous reaction of Ca/Sr/Ba, and gives the balanced equation Ca + 2H2O -> Ca(OH)2 + H2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | ### 2. जल के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | समूह में नीचे जाने पर जल के साथ अभिक्रियाशीलता बढ़ती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p65 | - **Be** जल से अभिक्रिया नहीं करता। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p66 | - **Mg** ठंडे जल से बहुत धीरे, लेकिन गर्म जल या भाप से अभिक्रिया करता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p67 | - **Ca, Sr, Ba** ठंडे जल से तेजी से अभिक्रिया करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p68 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p69 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p70 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p71 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p72 | इस अभिक्रिया में हाइड्रोजन गैस निकलती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p73 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction with Acids (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the reaction of alkaline earth metals with dilute acids to produce metal salts and hydrogen gas, illustrated with Mg and HCl.

Accuracy: **accurate**. The reaction of group 2 metals with dilute acids to yield salt and H2 gas is accurately described and balanced.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p74 | ### 3. अम्लों के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p75 | ये पतले अम्लों के साथ अभिक्रिया करके लवण और हाइड्रोजन गैस बनाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p76 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p77 | Mg + 2HCl \rightarrow MgCl_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p78 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p79 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction with Halogens (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that alkaline earth metals react with halogens to form halides, with the reaction Ca + Cl2 -> CaCl2.

Accuracy: **accurate**. The formation of metal halides is correct, represented accurately by Ca + Cl2 -> CaCl2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p80 | ### 4. हैलोजन के साथ अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p81 | ये क्लोरीन, ब्रोमीन आदि से अभिक्रिया करके हैलाइड बनाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p82 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p83 | Ca + Cl_2 \rightarrow CaCl_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p84 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p85 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Order and Explanation of Reactivity Trend (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the trend of increasing chemical reactivity from Be to Ba based on increasing atomic size and easier removal of the two valence electrons.

Accuracy: **accurate**. The order Be < Mg < Ca < Sr < Ba and the explanation correlating atomic size, lower ionization energy, and reactivity are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p86 | ## अभिक्रियाशीलता का क्रम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | समूह में ऊपर से नीचे जाने पर अभिक्रियाशीलता बढ़ती है: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p88 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p89 | \boxed{Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p90 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p91 | कारण: नीचे जाने पर परमाणु का आकार बढ़ता है और बाहरी दो इलेक्ट्रॉनों को हटाना आसान हो जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p92 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Calcium Carbonate (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p95", "quote": "यह चूना पत्थर (limestone), संगमरमर (marble) और चॉक में मिलता है।"}]}

Annotation rationale: Introduces calcium carbonate (CaCO3), its natural occurrences, and thermal decomposition to CaO and CO2.

Accuracy: **accurate**. Occurrences in limestone, marble, and chalk, along with the thermal decomposition equation CaCO3 -> CaO + CO2, are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | ## महत्वपूर्ण यौगिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | ### 1. कैल्शियम कार्बोनेट \((CaCO_3)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | यह चूना पत्थर (limestone), संगमरमर (marble) और चॉक में मिलता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p96 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p97 | CaCO_3 \xrightarrow{\Delta} CaO + CO_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p98 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p99 | गरम करने पर यह कैल्शियम ऑक्साइड और कार्बन डाइऑक्साइड देता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p100 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Calcium Oxide (Quicklime) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p104", "quote": "- सीमेंट बनाने में"}, {"passage_id": "p105", "quote": "- अम्लीय मिट्टी को उदासीन करने में"}]}

Annotation rationale: Introduces calcium oxide (CaO), commonly known as quicklime, and lists its primary practical applications.

Accuracy: **accurate**. Common name quicklime (bina bujha chuna) and uses in cement, soil neutralization, and the steel industry are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p101 | ### 2. कैल्शियम ऑक्साइड \((CaO)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | इसे **क्विक लाइम (Quick lime)** या बिना बुझा चूना कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p103 | उपयोग: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p104 | - सीमेंट बनाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p105 | - अम्लीय मिट्टी को उदासीन करने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p106 | - इस्पात उद्योग में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p107 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Calcium Hydroxide (Slaked Lime) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces calcium hydroxide (Ca(OH)2), its preparation by slaking quicklime, and its reaction with CO2 used as a diagnostic test.

Accuracy: **accurate**. The formation of slaked lime, limewater identity, and the milkiness test caused by precipitation of CaCO3 are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p108 | ### 3. कैल्शियम हाइड्रॉक्साइड \((Ca(OH)_2)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p109 | इसे **स्लेक्ड लाइम (Slaked lime)** या बुझा हुआ चूना कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p110 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p111 | CaO + H_2O \rightarrow Ca(OH)_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p112 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p113 | इसका जलीय विलयन **लाइम वाटर** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p114 | कार्बन डाइऑक्साइड की पहचान: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p115 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p116 | Ca(OH)_2 + CO_2 \rightarrow CaCO_3 \downarrow + H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p117 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p118 | इससे लाइम वाटर दूधिया हो जाता है क्योंकि सफेद \(CaCO_3\) बनता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p119 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Plaster of Paris (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p127", "quote": "- टूटी हड्डियों पर प्लास्टर लगाने में"}, {"passage_id": "p128", "quote": "- मूर्तियाँ, सजावटी वस्तुएँ और साँचे बनाने में"}]}

Annotation rationale: Presents Plaster of Paris, stating its chemical formula (CaSO4 . 1/2 H2O), formation from gypsum, and uses.

Accuracy: **accurate**. Formula of Plaster of Paris CaSO4·0.5H2O, preparation from gypsum, and applications are all correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p120 | ### 4. प्लास्टर ऑफ पेरिस (POP) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p121 | रासायनिक सूत्र: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p122 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p123 | CaSO_4 \cdot \frac{1}{2}H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p124 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p125 | यह जिप्सम को गर्म करने पर बनता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p126 | उपयोग: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p127 | - टूटी हड्डियों पर प्लास्टर लगाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p128 | - मूर्तियाँ, सजावटी वस्तुएँ और साँचे बनाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p129 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Flame Test Colors of Group 2 Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a summary table of characteristic flame colors for alkaline earth metals (Ca brick-red, Sr crimson, Ba apple-green, and Be/Mg showing no color).

Accuracy: **accurate**. Flame test colors are completely accurate: Ca gives brick red, Sr gives crimson red, Ba gives apple green, while Be and Mg do not give characteristic colors in a burner flame due to high excitation energies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p130 | ## ज्वाला परीक्षण (Flame Test) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p131 | कुछ क्षारीय मृदा धातुएँ ज्वाला को विशेष रंग देती हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p132 | &#124; धातु &#124; ज्वाला का रंग &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p133 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p134 | &#124; Ca &#124; ईंट-लाल (Brick red) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p135 | &#124; Sr &#124; गहरा लाल (Crimson red) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p136 | &#124; Ba &#124; सेब-हरा (Apple green) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p137 | &#124; Mg &#124; कोई विशेष रंग नहीं &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p138 | &#124; Be &#124; कोई विशेष रंग नहीं &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p139 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Anomalous Behavior of Beryllium (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Highlights beryllium as an exception in Group 2, explaining its anomalous properties (covalent bonding, inertness to water, amphoteric oxide) due to its small size.

Accuracy: **accurate**. The anomalous behavior of beryllium (predominantly covalent compounds, unreactivity with water, and amphoteric BeO) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p140 | ## विशेष अपवाद: बेरिलियम (Be) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p141 | बेरिलियम अन्य समूह 2 के तत्वों से कुछ अलग व्यवहार करता है क्योंकि इसका आकार बहुत छोटा होता है। | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p142 | - Be के यौगिक अधिकतर सहसंयोजक (covalent) होते हैं। | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p143 | - Be जल से अभिक्रिया नहीं करता। | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p144 | - इसका ऑक्साइड \(BeO\) **उभयधर्मी (amphoteric)** होता है, अर्थात यह अम्ल और क्षार दोनों से अभिक्रिया कर सकता है। | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p145 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Uses of Group 2 Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p148", "quote": "- आतिशबाजी और फ्लैश बल्ब में"}, {"passage_id": "p152", "quote": "- हड्डियों और दाँतों के निर्माण में"}]}

Annotation rationale: Details practical and industrial applications of magnesium, calcium, strontium, and barium.

Accuracy: **accurate**. All listed uses, including pyrotechnics (Sr red, Ba green), barium sulfate in X-ray imaging, and biological roles of Ca and Mg, are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p146 | ## उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p147 | ### मैग्नीशियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p148 | - आतिशबाजी और फ्लैश बल्ब में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p149 | - हल्की धातु-मिश्र धातुएँ बनाने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p150 | - शरीर में मैग्नीशियम आयन आवश्यक होते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p151 | ### कैल्शियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p152 | - हड्डियों और दाँतों के निर्माण में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p153 | - सीमेंट और भवन निर्माण में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p154 | - मिट्टी की अम्लता कम करने में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p155 | ### स्ट्रॉन्शियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p156 | - लाल रंग की आतिशबाजी में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p157 | ### बेरियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p158 | - हरे रंग की आतिशबाजी में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p159 | - बेरियम सल्फेट \((BaSO_4)\) का उपयोग एक्स-रे जाँच में होता है | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p160 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u17: Comparison between Alkali and Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts Group 1 (alkali metals) with Group 2 (alkaline earth metals) across valence electrons, typical ions, reactivity, and hardness.

Accuracy: **accurate**. The comparison table correctly differentiates group 1 and group 2 elements by valence electrons (1 vs 2), ions (M+ vs M2+), reactivity, and hardness.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p161 | ## क्षार धातु और क्षारीय मृदा धातु में अंतर | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p162 | &#124; गुण &#124; क्षार धातु (Group 1) &#124; क्षारीय मृदा धातु (Group 2) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p163 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p164 | &#124; बाहरी इलेक्ट्रॉन &#124; 1 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p165 | &#124; सामान्य आयन &#124; \(M^+\) &#124; \(M^{2+}\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p166 | &#124; अभिक्रियाशीलता &#124; अधिक &#124; तुलनात्मक रूप से कम &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p167 | &#124; कठोरता &#124; नरम &#124; अधिक कठोर &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p168 | &#124; उदाहरण &#124; Na, K &#124; Mg, Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p169 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u18: Summary of Key Points to Remember (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p175", "quote": "5. कैल्शियम हड्डियों, दाँतों और सीमेंट के लिए महत्वपूर्ण है।  "}]}

Annotation rationale: Provides a numbered recap of key high-yield facts about alkaline earth metals for review.

Accuracy: **accurate**. All bullet points correctly summarize the fundamental concepts presented earlier.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p170 | ## याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p171 | 1. क्षारीय मृदा धातुएँ आवर्त सारणी के **समूह 2** में होती हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p172 | 2. इनके बाहरी कक्षक में **2 इलेक्ट्रॉन** होते हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p173 | 3. ये सामान्यतः \(+2\) आयन बनाती हैं।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p174 | 4. नीचे जाने पर इनकी अभिक्रियाशीलता बढ़ती है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p175 | 5. कैल्शियम हड्डियों, दाँतों और सीमेंट के लिए महत्वपूर्ण है।   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p176 | 6. मैग्नीशियम जलने पर चमकीली सफेद लौ देता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

