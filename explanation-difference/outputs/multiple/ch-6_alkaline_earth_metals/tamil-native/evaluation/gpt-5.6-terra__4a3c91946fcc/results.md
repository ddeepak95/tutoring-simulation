# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt specifically asked for an explanation of alkaline earth metals (Group 2 elements: Be, Mg, Ca, Sr, Ba, Ra; in Tamil: காரமண் உலோகங்கள்). The response completely confused this with alkali metals (Group 1 elements: Li, Na, K, Rb, Cs, Fr; in Tamil: கார உலோகங்கள்) and exclusively explains alkali metals across all units.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 68,
  "content_unit_kinds": {
    "CONCEPT": 8,
    "CAVEAT": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 68,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 11,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and elements of alkali metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines alkali metals as Group 1 elements, explains the etymology behind their name based on their reaction with water forming alkaline solutions, and lists all elements in the group.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **கார உலோகங்கள்** (Alkali Metals) என்பது கால அட்டவணையின் **1-ஆம் தொகுதியில்** உள்ள உலோகங்கள் ஆகும். இவை நீருடன் வினைபுரிந்து **காரத் தன்மை கொண்ட கரைசலை** உருவாக்குவதால் இப்பெயர் பெற்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## கார உலோகங்கள் யாவை? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | &#124; தனிமம் &#124; குறியீடு &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p4 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124; லித்தியம் &#124; Li &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; சோடியம் &#124; Na &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; பொட்டாசியம் &#124; K &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; ரூபிடியம் &#124; Rb &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; சீசியம் &#124; Cs &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; ஃபிரான்சியம் &#124; Fr &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u2: Exclusion of hydrogen from alkali metals (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that while hydrogen is placed in Group 1, it is a non-metal and not categorized as an alkali metal.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | &gt; **ஹைட்ரஜன் (H)** 1-ஆம் தொகுதியில் இருந்தாலும், அது உலோகம் அல்ல. எனவே பொதுவாக கார உலோகங்களின் பட்டியலில் சேர்க்கப்படாது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Valence electron configuration and +1 ion formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that alkali metals have a single valence electron and readily lose it to form +1 cations, illustrated with electronic configurations and an ionization equation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## முக்கிய பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | ### 1. வெளிப்புற மண்டலத்தில் ஒரு எலக்ட்ரான் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | ஒவ்வொரு கார உலோக அணுவின் வெளிப்புற மண்டலத்தில் **ஒரே ஒரு எலக்ட்ரான்** இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | உதாரணம்:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | - சோடியம்: 2, 8, **1**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - பொட்டாசியம்: 2, 8, 8, **1** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | இந்த ஒரு எலக்ட்ரானை எளிதில் இழந்து, இவை **+1 மின்னூட்டம் கொண்ட அயன்களாக** மாறுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p21 | Na \rightarrow Na^+ + e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: High reactivity and reaction with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the high reactivity of alkali metals towards water and oxygen, illustrated with the reaction between sodium and water and a comparison to potassium.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### 2. மிகவும் வினைத்திறன் கொண்டவை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | கார உலோகங்கள் மிகவும் வேகமாக வேதிவினை புரிகின்றன. குறிப்பாக நீர் மற்றும் காற்றில் உள்ள ஆக்சிஜனுடன் அவை வினைபுரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | உதாரணமாக, சோடியம் நீருடன் வினைபுரியும் போது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p28 | 2Na + 2H_2O \rightarrow 2NaOH + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p30 | இதில்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | - **சோடியம் ஹைட்ராக்சைடு (NaOH)** உருவாகிறது — இது ஒரு காரம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - **ஹைட்ரஜன் வாயு** வெளியேறும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | - வெப்பம் உருவாகும்; சில சமயங்களில் தீப்பற்றவும் செய்யலாம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | பொட்டாசியம் நீருடன் சோடியத்தை விட இன்னும் தீவிரமாக வினைபுரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Softness of alkali metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p37", "quote": "கத்தியால் வெட்டக்கூடிய அளவுக்கு மென்மையாக இருக்கும்"}]}

Annotation rationale: States that alkali metals are soft enough to be cut with a knife unlike typical hard metals.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### 3. மென்மையான உலோகங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | இவை சாதாரண உலோகங்களைப் போல கடினமாக இருக்காது. குறிப்பாக சோடியம், பொட்டாசியம் போன்றவற்றை கத்தியால் வெட்டக்கூடிய அளவுக்கு மென்மையாக இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Low density of alkali metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that Li, Na, and K are less dense than water and would float, while adding a safety caution against trying it directly.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### 4. அடர்த்தி குறைவு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | லித்தியம், சோடியம், பொட்டாசியம் போன்ற சில கார உலோகங்கள் நீரை விட குறைந்த அடர்த்தி கொண்டவை. ஆகவே அவை நீரில் மிதக்கக்கூடும். ஆனால் அவை நீருடன் உடனே வினைபுரிவதால் இதை நேரடியாக முயற்சிக்கக் கூடாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Electrical and thermal conductivity (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that alkali metals are good conductors of heat and electricity.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ### 5. நல்ல மின்கடத்திகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | கார உலோகங்கள் வெப்பத்தையும் மின்சாரத்தையும் நன்றாகக் கடத்தும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Periodic trends down Group 1 (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how atomic radius increases down the group from Li to Cs, facilitating outer electron loss and consequently increasing reactivity.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ## தொகுதியில் கீழே செல்லச் செல்ல ஏற்படும் மாற்றங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | லித்தியத்திலிருந்து சீசியம் வரை கீழே செல்லும்போது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 | - அணுவின் அளவு அதிகரிக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | - வெளிப்புற எலக்ட்ரானை இழப்பது எளிதாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p49 | - வினைத்திறன் அதிகரிக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p50 | அதாவது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p51 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p52 | Li &lt; Na &lt; K &lt; Rb &lt; Cs | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p53 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p54 | வினைத்திறன் வரிசையில் சீசியம் மிகவும் வினைத்திறன் கொண்டது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Storage of alkali metals in kerosene or mineral oil (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkali metals like sodium and potassium are stored immersed in kerosene or mineral oil to prevent reaction with atmospheric oxygen and moisture.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ## ஏன் இவை எண்ணெயில் பாதுகாக்கப்படுகின்றன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | சோடியம் மற்றும் பொட்டாசியம் போன்ற கார உலோகங்கள் காற்றிலுள்ள ஆக்சிஜன் மற்றும் ஈரப்பதத்துடன் உடனே வினைபுரியும். எனவே அவற்றை **மண்ணெண்ணெய் அல்லது கனிம எண்ணெயில்** மூழ்கவைத்து பாதுகாப்பார்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p58 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Applications of lithium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p60", "quote": "மொபைல் போன், மடிக்கணினி, மின்சார வாகன பேட்டரிகள்"}]}

Annotation rationale: Illustrates real-world applications of lithium in mobile phones, laptops, and electric vehicle batteries under the applications heading.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p59 | ## பயன்பாடுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p60 | - **லித்தியம்**: மொபைல் போன், மடிக்கணினி, மின்சார வாகன பேட்டரிகள். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Applications of sodium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p61", "quote": "சமையல் உப்பு தயாரிப்பில் உள்ள சேர்மங்கள்"}]}

Annotation rationale: Illustrates real-world applications of sodium in sodium-vapor lamps, chemical manufacturing, and table salt compounds.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | - **சோடியம்**: சோடியம் விளக்குகள், வேதிப்பொருள் தயாரிப்பு, சமையல் உப்பு தயாரிப்பில் உள்ள சேர்மங்கள். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u12: Applications of potassium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of potassium in the fertilizer industry.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | - **பொட்டாசியம்**: உரங்கள் தயாரிப்பில் முக்கியமாகப் பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u13: Applications of cesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the specialized application of cesium in atomic clocks.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | - **சீசியம்**: மிகத் துல்லியமான அணுக் கடிகாரங்களில் பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Summary of alkali metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding formula-style summary and concise recap of key alkali metal characteristics.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit discusses alkali metals instead of the requested topic of alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ## நினைவில் வைத்துக்கொள்ள வேண்டிய முக்கிய கருத்து | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | **கார உலோகங்கள் = 1-ஆம் தொகுதி உலோகங்கள் + வெளிப்புறத்தில் 1 எலக்ட்ரான் + மிகவும் வினைத்திறன் + நீருடன் வினைபுரிந்து காரம் உருவாக்கும்.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p67 | சுருக்கமாக:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | **லித்தியம், சோடியம், பொட்டாசியம் போன்றவை கார உலோகங்கள். இவை மென்மையானவை, மிகுந்த வினைத்திறன் உடையவை, மற்றும் +1 அயன்களை உருவாக்குகின்றன.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

