# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of alkaline earth metals (Group 2 elements) in Tamil, covering their identity, nomenclature, electronic structure, physical and chemical properties, reactivity trends, key compounds, flame test, anomalous behavior of beryllium, comparison with alkali metals, and a summary.

## Counts

```json
{
  "total_content_units": 15,
  "substantive_content_units": 15,
  "total_passages": 150,
  "content_unit_kinds": {
    "CONCEPT": 13,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 150,
  "unique_subtopics": 11,
  "contextualization": {
    "none": 12,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 15
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and list of Group 2 alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the Group 2 elements belonging to the alkaline earth metals family and lists them with their symbols and atomic numbers.

Accuracy: **accurate**. Correctly defines Group 2 elements as alkaline earth metals and accurately lists Be (4), Mg (12), Ca (20), Sr (38), Ba (56), and Ra (88), noting Ra's radioactivity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## காரத் தர உலோகங்கள் (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | தனிம அட்டவணையின் **2-ஆம் தொகுதியில் (Group 2)** உள்ள உலோகங்கள் **காரத் தர உலோகங்கள்** என்று அழைக்கப்படுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | இத்தொகுதியில் உள்ள தனிமங்கள்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; தனிமம் &#124; குறியீடு &#124; அணு எண் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---&#124;---:&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; பெரிலியம் &#124; Be &#124; 4 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; மக்னீசியம் &#124; Mg &#124; 12 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; கால்சியம் &#124; Ca &#124; 20 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; ஸ்ட்ரான்ஷியம் &#124; Sr &#124; 38 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; பேரியம் &#124; Ba &#124; 56 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; ரேடியம் &#124; Ra &#124; 88 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &gt; ரேடியம் கதிரியக்கத் தன்மை (radioactive) கொண்டது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin of the name 'Alkaline Earth Metals' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the historical origin and chemical meaning behind the terms 'alkaline' (basic oxides) and 'earth' (insoluble solid oxides).

Accuracy: **accurate**. Accurately relates basic oxide formation (CaO + H2O -> Ca(OH)2) to 'alkaline' and the historical terminology 'earths' to their refractory/insoluble oxides.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## ஏன் “காரத் தர” என்று அழைக்கப்படுகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | இந்த உலோகங்கள் ஆக்சிஜனுடன் சேர்ந்து உருவாக்கும் ஆக்சைடுகள் பொதுவாக **காரத் தன்மை (basic nature)** கொண்டவை. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | CaO + H_2O \rightarrow Ca(OH)_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | கால்சியம் ஆக்சைடு \((CaO)\) நீருடன் வினைபுரிந்து கால்சியம் ஹைட்ராக்சைடு \((Ca(OH)_2)\) உருவாக்குகிறது. இது காரத் தன்மையுடையது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | “Earth” என்ற சொல் பழங்காலத்தில் நீரில் கரையாத திட ஆக்சைடுகளைக் குறிக்கப் பயன்படுத்தப்பட்டது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic configuration and valence state (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the valence shell electron configuration ns^2, provides examples for Be, Mg, and Ca, and explains why they lose two electrons to form +2 ions.

Accuracy: **accurate**. Correctly states the general valence configuration ns^2, provides accurate configurations, ionization to +2 ions (Mg -> Mg^2+ + 2e^-), and oxidation state +2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## மின்னணு அமைப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | காரத் தர உலோகங்களின் வெளிப்புற மின்னணு அமைப்பு: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | \boxed{ns^2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | அதாவது, அவற்றின் வெளிப்புற ஓட்டில் **2 மின்னணுக்கள்** உள்ளன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | உதாரணங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | - Be: \(1s^2 2s^2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - Mg: \(2, 8, 2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | - Ca: \(2, 8, 8, 2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | இந்த 2 மின்னணுக்களையும் இழந்து இவை பொதுவாக **+2 அயனிகள்** உருவாக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p35 | Mg \rightarrow Mg^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p37 | எனவே, இவற்றின் பொதுவான ஆக்சிசனேற்ற எண் / இணைதிறன்: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p38 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p39 | \boxed{+2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p40 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Physical properties and atomic size trend (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists general physical characteristics including metallic luster, conductivity, hardness, melting points relative to alkali metals, and atomic size ordering.

Accuracy: **accurate**. All listed physical properties are factually correct, including the periodic trend of atomic radii increasing down Group 2: Be < Mg < Ca < Sr < Ba.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ## முக்கிய இயற்பியல் பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | 1. இவை அனைத்தும் உலோகங்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p44 | 2. வெள்ளி போன்ற ஒளிர்வு கொண்டவை. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p45 | 3. வெப்பத்தையும் மின்சாரத்தையும் கடத்தும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p46 | 4. கார உலோகங்களை விட கடினமானவை. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p47 | 5. அவற்றின் உருகுநிலை பொதுவாக கார உலோகங்களை விட அதிகம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | 6. தொகுதியில் மேலிருந்து கீழே செல்லும்போது அணு அளவு அதிகரிக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p49 | வரிசை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p50 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p51 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p52 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction with oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the formation of metal oxides upon reacting with oxygen, accompanied by the combustion equation of magnesium and observation of white light.

Accuracy: **accurate**. Correctly shows the balanced reaction 2Mg + O2 -> 2MgO and describes the characteristic dazzling white flame of burning magnesium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## வேதியியல் பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | ### 1. ஆக்சிஜனுடன் வினை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | இவை ஆக்சிஜனுடன் வினைபுரிந்து உலோக ஆக்சைடுகளை உருவாக்குகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p58 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p59 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p60 | மக்னீசியம் எரியும்போது கண்களைக் கவரும் **வெள்ளை ஒளி** வெளிப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p61 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how reactivity with water varies down the group from Be to Ba, and provides the balanced equation for Ca with water.

Accuracy: **accurate**. Accurately details water reactivity: Be does not react, Mg reacts slowly with cold water and vigorously with steam, Ca/Sr/Ba react with cold water to release H2 gas.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | ### 2. நீருடன் வினை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | தொகுதியில் கீழே செல்லச் செல்ல நீருடன் வினைபுரியும் திறன் அதிகரிக்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p64 | - **Be**: நீருடன் வினைபுரியாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p65 | - **Mg**: குளிர்ந்த நீருடன் மிக மெதுவாக வினைபுரியும்; நீராவியுடன் வேகமாக வினைபுரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p66 | - **Ca, Sr, Ba**: குளிர்ந்த நீருடனும் வினைபுரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p67 | உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 \uparrow | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | இதில் ஹைட்ரஜன் வாயு வெளிவரும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction with dilute acids (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the reaction of alkaline earth metals with dilute acids to produce salt and hydrogen gas.

Accuracy: **accurate**. Correctly states that alkaline earth metals react with dilute acids yielding salt and hydrogen gas, illustrated with Mg + 2HCl -> MgCl2 + H2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p73 | ### 3. அமிலங்களுடன் வினை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | நீர்த்த அமிலங்களுடன் வினைபுரிந்து உப்பு மற்றும் ஹைட்ரஜன் வாயுவை உருவாக்குகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p75 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p76 | Mg + 2HCl \rightarrow MgCl_2 + H_2 \uparrow | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p77 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p78 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction with halogens (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the formation of metal halides when alkaline earth metals react with halogens.

Accuracy: **accurate**. Accurately represents the combination reaction with halogens using Ca + Cl2 -> CaCl2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p79 | ### 4. ஹாலஜன்களுடன் வினை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | குளோரின் போன்ற ஹாலஜன்களுடன் சேர்ந்து உப்புகளை உருவாக்குகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p81 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p82 | Ca + Cl_2 \rightarrow CaCl_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p83 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p84 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Reactivity trend down the group and its cause (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the reactivity order Be < Mg < Ca < Sr < Ba and explains it based on increasing atomic radius and easier removal of the valence electrons.

Accuracy: **accurate**. Correctly states the reactivity trend and provides the standard periodic trend reasoning (larger atomic radius lowers effective nuclear pull on valence electrons).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p85 | ## வினைத்திறன் மாற்றம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p86 | தொகுதியில் மேலிருந்து கீழே செல்லும்போது வினைத்திறன் அதிகரிக்கும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p87 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p88 | \boxed{Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p89 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p90 | ### காரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | கீழே செல்லச் செல்ல அணுவின் அளவு அதிகரிக்கிறது. வெளிப்புற 2 மின்னணுக்கள் அணுக்கருவின் ஈர்ப்பிலிருந்து தொலைவில் இருப்பதால் அவற்றை இழப்பது எளிதாகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p92 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Magnesium applications and compounds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p96", "quote": "பட்டாசுகள் மற்றும் ஃபிளாஷ் விளக்குகளில் வெள்ளை ஒளி உருவாக்க."}, {"passage_id": "p98", "quote": "உடலுக்கு தேவையான முக்கிய கனிமம்."}]}

Annotation rationale: Details real-world applications of magnesium (fireworks, alloys, biological necessity) and refractory use of magnesium oxide.

Accuracy: **accurate**. All listed uses for Mg (pyrotechnics/flash, light alloys, essential mineral) and MgO (refractory material) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | ## முக்கிய சேர்மங்கள் மற்றும் பயன்பாடுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | ### 1. மக்னீசியம் (Mg) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | **பயன்பாடுகள்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p96 | - பட்டாசுகள் மற்றும் ஃபிளாஷ் விளக்குகளில் வெள்ளை ஒளி உருவாக்க. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p97 | - இலகுரக உலோகக் கலவைகள் தயாரிக்க. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p98 | - உடலுக்கு தேவையான முக்கிய கனிமம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p99 | **மக்னீசியம் ஆக்சைடு:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p100 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p101 | MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p102 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p103 | இது வெப்பத்தைத் தாங்கக்கூடிய பொருட்களில் பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Calcium applications and major compounds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p107", "quote": "எலும்புகள் மற்றும் பற்களின் முக்கிய கூறு."}, {"passage_id": "p109", "quote": "சிமெண்டு மற்றும் கட்டிடப் பொருட்களில் பயன்படுகிறது."}]}

Annotation rationale: Lists everyday uses of calcium and summarizes formulas and common names for limestone, quicklime, slaked lime, and gypsum.

Accuracy: **accurate**. All calcium uses and compound chemical names/formulas (CaCO3, CaO, Ca(OH)2, CaSO4·2H2O) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ### 2. கால்சியம் (Ca) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | **பயன்பாடுகள்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p107 | - எலும்புகள் மற்றும் பற்களின் முக்கிய கூறு. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p108 | - சுண்ணாம்பு தயாரிக்க. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p109 | - சிமெண்டு மற்றும் கட்டிடப் பொருட்களில் பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p110 | முக்கிய கால்சியம் சேர்மங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p111 | &#124; சேர்மம் &#124; வேதியியல் வாய்ப்பாடு &#124; பொதுப்பெயர் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p112 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p113 | &#124; கால்சியம் கார்பனேட் &#124; \(CaCO_3\) &#124; சுண்ணாம்புக்கல் / Marble &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p114 | &#124; கால்சியம் ஆக்சைடு &#124; \(CaO\) &#124; சுட்ட சுண்ணாம்பு (Quick lime) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p115 | &#124; கால்சியம் ஹைட்ராக்சைடு &#124; \(Ca(OH)_2\) &#124; அணைத்த சுண்ணாம்பு (Slaked lime) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p116 | &#124; கால்சியம் சல்பேட் &#124; \(CaSO_4 \cdot 2H_2O\) &#124; ஜிப்சம் (Gypsum) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Flame test colors of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents flame colors for Ca (brick red), Sr (crimson red), Ba (apple green), and notes that Be and Mg do not give flame colors.

Accuracy: **accurate**. The flame test colors are accurate: Ca gives brick red, Sr crimson red, Ba apple green, while Be and Mg do not impart characteristic flame colors due to high excitation energies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | ## சுடர் நிறங்கள் (Flame Test) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | சில காரத் தர உலோக உப்புகளை சுடரில் வைத்தால் தனித்துவமான நிறம் கிடைக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p120 | &#124; தனிமம் &#124; சுடர் நிறம் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p121 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p122 | &#124; Ca &#124; செங்கல் சிவப்பு (Brick red) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p123 | &#124; Sr &#124; கருஞ்சிவப்பு (Crimson red) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p124 | &#124; Ba &#124; ஆப்பிள் பச்சை (Apple green) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p125 | &#124; Mg, Be &#124; குறிப்பிடத்தக்க சுடர் நிறம் இல்லை &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p126 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Anomalous behavior of beryllium (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Highlights beryllium as an exception to general Group 2 trends due to its small size, lack of water reactivity, covalent tendency, and amphoteric BeO.

Accuracy: **accurate**. All anomalous features of beryllium are accurately described (covalent nature, amphoteric BeO, passivity to water).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p127 | ## பெரிலியத்தின் விதிவிலக்கு தன்மை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p128 | **பெரிலியம் (Be)** மற்ற காரத் தர உலோகங்களிலிருந்து சில வகையில் வேறுபடுகிறது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p129 | - அளவில் மிகச் சிறியது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p130 | - நீருடன் வினைபுரியாது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p131 | - அதன் சில சேர்மங்கள் காரத் தன்மையை விட இணைதிற (covalent) தன்மையைக் காட்டும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p132 | - \(BeO\) ஒரு **இருபண்பு ஆக்சைடு (amphoteric oxide)**; இது அமிலத்துடனும் காரத்துடனும் வினைபுரியும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p133 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Comparison between alkali and alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts Group 1 and Group 2 metals across group number, valence electrons, ions formed, relative reactivity, and representative elements.

Accuracy: **accurate**. The table accurately compares alkali and alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p134 | ## கார உலோகங்கள் மற்றும் காரத் தர உலோகங்கள் – வேறுபாடு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p135 | &#124; பண்பு &#124; கார உலோகங்கள் &#124; காரத் தர உலோகங்கள் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p136 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p137 | &#124; தொகுதி &#124; Group 1 &#124; Group 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p138 | &#124; வெளிப்புற மின்னணுக்கள் &#124; 1 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p139 | &#124; உருவாகும் அயனி &#124; \(M^+\) &#124; \(M^{2+}\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p140 | &#124; வினைத்திறன் &#124; மிக அதிகம் &#124; அதிகம்; ஆனால் Group 1-ஐ விட குறைவு &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p141 | &#124; உதாரணம் &#124; Na, K &#124; Mg, Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p142 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Summary recap of key points (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p148", "quote": "கால்சியம் எலும்புகள் மற்றும் பற்களுக்கு அவசியமானது."}]}

Annotation rationale: Provides a bulleted review of essential points to remember about alkaline earth metals.

Accuracy: **accurate**. All recap bullet points summarize previously taught factual points accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p143 | ## நினைவில் கொள்ள வேண்டிய முக்கிய புள்ளிகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p144 | - காரத் தர உலோகங்கள் தனிம அட்டவணையின் **Group 2**-ல் உள்ளன. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p145 | - வெளிப்புற மின்னணு அமைப்பு: **\(ns^2\)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p146 | - பொதுவாக **+2 அயனிகள்** உருவாக்குகின்றன. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p147 | - கீழே செல்லச் செல்ல வினைத்திறன் அதிகரிக்கிறது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p148 | - கால்சியம் எலும்புகள் மற்றும் பற்களுக்கு அவசியமானது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p149 | - மக்னீசியம் எரியும்போது பிரகாசமான வெள்ளை ஒளி தருகிறது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p150 | - Be மற்ற உறுப்புகளை விட விதிவிலக்கான பண்புகளைக் கொண்டது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

