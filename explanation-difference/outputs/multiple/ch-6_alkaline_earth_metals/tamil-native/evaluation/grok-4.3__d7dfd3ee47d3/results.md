# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt explicitly requested an explanation of alkaline earth metals ('காரமண் உலோகங்கள்', Group 2 elements). However, the response completely explains alkali metals ('கார உலோகங்கள்', Group 1 elements: Li, Na, K, Rb, Cs, Fr) and makes no mention of alkaline earth metals.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 41,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 4,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 41,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 8,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and members of alkali metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces alkali metals as Group 1 elements, explains the naming origin (reacting with water to form alkaline solutions), and lists the individual elements.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | நீங்கள் ஒரு சிறந்த ஆசிரியர் என்று கேட்டீர்கள். எனவே, உயர்நிலைப் பள்ளி மாணவருக்கு எளிய மொழியில், படிப்படியாக விளக்குகிறேன். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### கார உலோகங்கள் (Alkali Metals) என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | கார உலோகங்கள் என்பவை **தனிம அட்டவணையின் (Periodic Table) 1ஆம் குழுவில்** உள்ள உலோகங்கள். இவற்றை **கார உலோகங்கள்** என்று அழைப்பதற்குக் காரணம், இவை தண்ணீருடன் வினைபுரிந்து **காரக் கரைசல்** (alkaline solution) உருவாக்குகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | **கார உலோகங்கள் பட்டியல்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - லித்தியம் (Li) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - சோடியம் (Na) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - பொட்டாசியம் (K) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - ரூபிடியம் (Rb) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | - சீசியம் (Cs) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | - ஃபிரான்சியம் (Fr) (இது மிகவும் அரிதானது) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Electronic configuration and high reactivity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkali metals are reactive based on their ns¹ valence shell configuration and tendency to form M⁺ ions.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### ஏன் இவை மிகவும் வினைத்திறன் கொண்டவை? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | இந்த உலோகங்களின் வெளிப்புற ஓட்டில் (outermost shell) **ஒரே ஒரு எலக்ட்ரான்** மட்டுமே இருக்கும் (ns¹ என்ற மின்னணு அமைப்பு). இந்த ஒற்றை எலக்ட்ரானை எளிதில் இழந்துவிட்டு +1 அயனியாக (M⁺) மாறிவிடும். இதனால் இவை மிகவும் வினைத்திறன் (reactive) கொண்டவை. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Physical properties of alkali metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the general physical properties of alkali metals such as softness, low density, low melting/boiling points, conductivity, and luster.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### முக்கிய பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | **1. இயற்பியல் பண்புகள் (Physical Properties)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - மிகவும் மென்மையான உலோகங்கள் (கத்தியால் வெட்டலாம்). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | - அடர்த்தி குறைவு (சோடியம், பொட்டாசியம் போன்றவை தண்ணீரில் மிதக்கும்). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | - குறைந்த உருகுநிலை மற்றும் கொதிநிலை. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | - மின்சாரம் மற்றும் வெப்பத்தை நன்றாக கடத்தும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | - தூய்மையான நிலையில் வெள்ளி போன்ற பளபளப்பான தோற்றம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Chemical properties of alkali metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains reactions of alkali metals with water, air (and consequent storage in kerosene), and hydrogen, including chemical equations.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | **2. வேதியியல் பண்புகள் (Chemical Properties)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | - **தண்ணீருடன் வினை:**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 |   2Na + 2H₂O → 2NaOH + H₂↑   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 |   (சோடியம் தண்ணீரில் வீச்சுடன் எரிந்து சோடியம் ஹைட்ராக்சைடு உருவாக்கும். பொட்டாசியம் இன்னும் வேகமாக வினைபுரியும்.) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p24 | - **காற்றுடன் வினை:** விரைவாக ஆக்சிஜனேற்றம் அடைந்து ஆக்சைடுகளை உருவாக்கும். அதனால் இவற்றை பெட்ரோலியம் அல்லது கெரோசினில் மூழ்க வைத்து சேமிக்க வேண்டும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | - **ஹைட்ரஜனுடன் வினை:** 2Na + H₂ → 2NaH (சோடியம் ஹைட்ரைடு) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Periodic trends down the alkali metals group (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the periodic trends observed going down the group (reactivity, atomic size, melting point, ionization energy).

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | **3. குழுவில் கீழே இறங்கும்போது ஏற்படும் மாற்றங்கள் (Trends)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | - வினைத்திறன் அதிகரிக்கும் (Cs &gt; Rb &gt; K &gt; Na &gt; Li) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | - அணு அளவு அதிகரிக்கும் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | - உருகுநிலை குறையும் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | - அயனியாக்கும் ஆற்றல் (Ionization energy) குறையும் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Real-world occurrence of sodium in table salt and the human body (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p32", "quote": "உப்பில் (NaCl) உள்ளது."}]}

Annotation rationale: Illustrates a concrete daily-life occurrence and role of sodium in common salt and human physiology.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### சுவாரசியமான உண்மைகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | - **சோடியம்**: மனித உடலில் முக்கியமானது. உப்பில் (NaCl) உள்ளது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Real-world occurrence of potassium in bananas and nerve function (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p33", "quote": "வாழைப்பழத்தில் அதிகம்."}]}

Annotation rationale: Illustrates the role of potassium in bananas and human biological nerve conduction.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | - **பொட்டாசியம்**: வாழைப்பழத்தில் அதிகம். உடலில் நரம்பு செயல்பாட்டிற்கு அவசியம். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Real-world application of lithium in batteries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p34", "quote": "மின்கலன்களில் (batteries) பயன்படும்."}]}

Annotation rationale: Illustrates the technological application of lithium in commercial batteries.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | - **லித்தியம்**: மின்கலன்களில் (batteries) பயன்படும். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Illustration of flame test colors for sodium and potassium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the characteristic flame test phenomenon exhibited by sodium and potassium.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | - சோடியம் மற்றும் பொட்டாசியம் தண்ணீரில் போட்டால் அழகான சுடர் வண்ணங்களை கொடுக்கும் (Flame test). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Safety precautions for handling reactive alkali metals (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a safety qualification regarding experiment handling in school laboratories due to high reactivity and explosion hazards.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### பாதுகாப்பு குறிப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | இந்த உலோகங்கள் மிகவும் வினைத்திறன் கொண்டவை. பள்ளி ஆய்வகத்தில் ஆசிரியர் மேற்பார்வையில் மட்டுமே பரிசோதனை செய்ய வேண்டும். குறிப்பாக பொட்டாசியம் தண்ணீரில் போட்டால் வெடிக்கக்கூடும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u11: Summary recap of alkali metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary formula highlighting the key characteristics of alkali metals, followed by a closing remark.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic, presenting alkali metals instead of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | **சுருக்கமாக:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p40 | கார உலோகங்கள் = **ஒற்றை வெளிப்புற எலக்ட்ரான்** + **மிக உயர் வினைத்திறன்** + **காரக் கரைசல் உருவாக்கும் தன்மை**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p41 | இந்த விளக்கத்தைப் புரிந்துகொண்டீர்களா? ஏதாவது ஒரு பகுதி மேலும் விரிவாக வேண்டுமா (எ.கா: வினைச் சமன்பாடுகள், போக்குகள், அல்லது பயன்கள்)? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

