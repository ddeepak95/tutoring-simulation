# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses isotopes in Tamil ('ஓரிடத்தான்'), providing definitions, subatomic composition, etymology, concrete examples, and practical applications.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 43,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 43,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 8,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Twins of different weights analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "உங்கள் வகுப்பில் ஒரே மாதிரியான உருவம் கொண்ட இரட்டைப் பிறவிகள் (Twins) படிக்கிறார்கள் என்று வைத்துக்கொள்வோம். இருவருக்கும் ஒரே பெயர், ஒரே முகம், ஒரே மாதிரியான திறமைகள். ஆனால், எடை போடும் இயந்திரத்தில் நின்றால் ஒருவர் 40 கிலோ, இன்னொருவர் 42 கிலோ இருக்கிறார்."}]}

Annotation rationale: Uses the relatable scenario of twins with identical appearance and names but different body weights to introduce the concept of isotopes.

Accuracy: **accurate**. The analogy accurately captures the defining characteristic of isotopes: chemically identical atoms with different masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வாருங்கள், இன்று வேதியியலில் மிக முக்கியமானதும் சுவாரசியமானதுமான **&quot;ஓரிடத்தான்&quot; (Isotope - ஐசோடோப்)** பற்றி மிக எளிமையாகப் புரிந்து கொள்வோம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | முதலில் ஒரு சிறிய கற்பனை...  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | உங்கள் வகுப்பில் ஒரே மாதிரியான உருவம் கொண்ட இரட்டைப் பிறவிகள் (Twins) படிக்கிறார்கள் என்று வைத்துக்கொள்வோம். இருவருக்கும் ஒரே பெயர், ஒரே முகம், ஒரே மாதிரியான திறமைகள். ஆனால், எடை போடும் இயந்திரத்தில் நின்றால் ஒருவர் 40 கிலோ, இன்னொருவர் 42 கிலோ இருக்கிறார்.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | இதே போன்ற ஒரு விஷயம் அணுக்களின் உலகத்திலும் நடக்கிறது. அதுதான் **ஓரிடத்தான்**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition and subatomic composition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains subatomic particles (protons, electrons, neutrons), defines atomic number and mass number, and formalizes the definition of isotopes.

Accuracy: **accurate**. The definition of isotopes (same atomic number/protons, differing neutron count and mass number) is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p6 | ### ஓரிடத்தான் என்றால் என்ன? (விளக்கம்) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | ஒரு அணுவிற்குள் மூன்று முக்கியமான துகள்கள் இருக்கும் என்பது உங்களுக்குத் தெரியும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. **புரோட்டான்** (Proton - நேர் மின்சுமை) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 2. **எலக்ட்ரான்** (Electron - எதிர் மின்சுமை) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 3. **நியூட்ரான்** (Neutron - மின்சுமையற்றது) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | இதில் ஒரு தனிமத்தின் அடையாளமே அதன் **புரோட்டான் எண்ணிக்கை (அணு எண் - Z)** தான். புரோட்டான் எண்ணிக்கை மாறினால் தனிமமே மாறிவிடும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | &gt; **வரையறை:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | &gt; **&quot;ஒரே அணு எண்ணையும் (புரோட்டான்களின் எண்ணிக்கை), வெவ்வேறு நிறை எண்களையும் (புரோட்டான் + நியூட்ரான் எண்ணிக்கை) கொண்ட ஒரே தனிமத்தின் வெவ்வேறு அணுக்களே &#x27;ஓரிடத்தான்கள்&#x27; எனப்படும்.&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | சுருக்கமாகச் சொன்னால்:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | * இவற்றில் **புரோட்டான்கள் சமமாக** இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | * ஆனால் **நியூட்ரான்களின் எண்ணிக்கை மாறுபடும்**. இதனால் அவற்றின் எடையும் (நிறை எண்) மாறும்! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Etymology and Tamil coinage of 'Oridathan' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p19", "quote": "அதனால் தான் இதற்கு தமிழில் **\"ஓரிடத்தான்\" (ஓர் + இடம் + ஆன்)** என்று அழகாகப் பெயரிட்டார்கள்."}]}

Annotation rationale: Explains why isotopes are named 'ஓரிடத்தான்' (occupying the same place in the periodic table due to having the same atomic number).

Accuracy: **accurate**. Correctly explains the linguistic and scientific reasoning behind the Tamil translation 'ஓரிடத்தான்' (matching the Greek origin of 'isotope': isos + topos).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p18 | ### ஏன் இதற்கு &quot;ஓர்-இடத்தான்&quot; என்று பெயர் வந்தது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | தனிம வரிசை அட்டவணையில் (Periodic Table), தனிமங்கள் அவற்றின் அணு எண்ணை வைத்தே வரிசைப்படுத்தப்பட்டுள்ளன. இந்த அணுக்களுக்கு அணு எண் ஒன்றாக இருப்பதால், இவை அனைத்திற்கும் அட்டவணையில் **&quot;ஒரே இடம்தான்&quot;** ஒதுக்கப்பட்டுள்ளது. அதனால் தான் இதற்கு தமிழில் **&quot;ஓரிடத்தான்&quot; (ஓர் + இடம் + ஆன்)** என்று அழகாகப் பெயரிட்டார்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of hydrogen (Protium, Deuterium, Tritium) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using hydrogen's three isotopes, highlighting their proton and neutron counts.

Accuracy: **accurate**. The proton and neutron compositions of protium, deuterium, and tritium are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p21 | ### சிறந்த உதாரணம்: ஹைட்ரஜன் குடும்பம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | நம் பிரபஞ்சத்தின் மிக எளிய தனிமமான ஹைட்ரஜனுக்கு 3 ஓரிடத்தான்கள் உண்டு: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | 1. **புரோட்டியம் ($^1H_1$):** இதில் 1 புரோட்டான் உண்டு, நியூட்ரான் கிடையாது. (இயற்கையில் 99.9% இதுதான் உள்ளது). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | 2. **டியூட்டீரியம் ($^2H_1$):** இதில் 1 புரோட்டான் + **1 நியூட்ரான்** உண்டு. (இதன் எடை கொஞ்சம் அதிகம், இதை &#x27;கன ஹைட்ரஜன்&#x27; என்பர்). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | 3. **டிரிட்டியம் ($^3H_1$):** இதில் 1 புரோட்டான் + **2 நியூட்ரான்கள்** உண்டு. (இது இன்னும் கூடுதல் எடை). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | *இங்கு கவனித்தீர்களா? மூன்றிலுமே புரோட்டான் ஒன்றுதான் (அணு எண் = 1), ஆனால் நியூட்ரான் எண்ணிக்கை மாறுவதால் அவற்றின் நிறை 1, 2, 3 என மாறுகிறது.* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share the same chemical properties (same electron configuration) but differ in physical properties (difference in mass).

Accuracy: **accurate**. Accurately distinguishes between chemical properties (identical due to electron configuration) and physical properties (varying due to mass).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ### இவற்றின் பண்புகள் எப்படி இருக்கும்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | * **வேதிப்பண்புகள் (Chemical Properties):** ஒரே மாதிரியாக இருக்கும். (ஏனெனில் எலக்ட்ரான் எண்ணிக்கையில் மாற்றமில்லை). ஹைட்ரஜனின் மூன்று ஓரிடத்தான்களும் ஆக்ஸிஜனுடன் சேர்ந்து நீரை ($H_2O$) உருவாக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p30 | * **இயற்பியல் பண்புகள் (Physical Properties):** அடர்த்தி, கொதிநிலை, நிறை போன்றவை நியூட்ரான்கள் மாறுபடுவதால் சற்று மாறுபடும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Application of Carbon-14 in dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Carbon-14 and carbon dating as an application of isotopes.

Accuracy: **contains_error**. Passage p34 incorrectly claims Carbon-14 dating is used to determine the age of dinosaur fossils.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p32 | ### நிஜ வாழ்க்கையில் ஓரிடத்தான்களின் பயன்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | இவை வெறும் புத்தகத்தில் படிப்பதற்கு மட்டுமல்ல, அறிவியலில் மிகப்பெரிய புரட்சியை ஏற்படுத்துபவை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | 1. **கார்பன்-14 (Carbon-14):** பல ஆயிரம் ஆண்டுகள் பழமையான மரங்கள், டைனோசர் படிமங்கள் மற்றும் ஆதிமனிதர்களின் எலும்புகளின் வயதைக் கண்டறிய (Carbon Dating) பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

Error (minor; p34): Carbon-14 dating is stated to be used for dating dinosaur fossils ('டைனோசர் படிமங்கள்'). Radiocarbon dating is only viable for organic specimens up to roughly 50,000–60,000 years old. Non-avian dinosaur fossils are at least 66 million years old and cannot be dated with Carbon-14.

Correction: Carbon-14 dating applies to remains from the past several tens of thousands of years (such as ancient wood, charcoal, and early human remains); dinosaur fossils are dated via other radiometric methods like potassium-argon or uranium-lead dating of igneous layers.

## u7: Application of Cobalt-60 in cancer radiotherapy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Cobalt-60 as an example of medical radiation therapy using isotopes.

Accuracy: **accurate**. Cobalt-60 is indeed widely used in radiation therapy for cancer treatment.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | 2. **கோபால்ட்-60 (Cobalt-60):** புற்றுநோய் செல்களை அழிக்க மருத்துவத்தில் கதிர்வீச்சு சிகிச்சைக்குப் பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Application of Uranium-235 in nuclear power (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Uranium-235 as an example of an isotope used as fuel in nuclear power plants.

Accuracy: **accurate**. Uranium-235 is accurately identified as fissile nuclear fuel used in nuclear power plants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | 3. **யுரேனியம்-235 (Uranium-235):** அணுமின் நிலையங்களில் மின்சாரம் தயாரிக்க எரிபொருளாகப் பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application of Iodine-131 in thyroid treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Iodine-131 as an example of an isotope used to treat thyroid disorders.

Accuracy: **accurate**. Iodine-131 is accurately identified as a radioisotope used in the medical diagnosis and treatment of thyroid diseases.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | 4. **அயோடின்-131 (Iodine-131):** தைராய்டு நோயைக் குணப்படுத்தப் பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Summary rules for identifying isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference recap summarizing the atomic number, neutron number, and mass number relationships of isotopes.

Accuracy: **accurate**. The recap accurately synthesizes the core points: atomic number (protons) is identical, while neutron count and mass number differ.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | ### நினைவில் கொள்ள எளிய வழி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | * **அணு எண் (புரோட்டான்) = சமம்** (அடையாளம் மாறாது) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p41 | * **நியூட்ரான் = வேறுபடும்** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p42 | * **நிறை எண் = வேறுபடும்** (எடை மாறும்) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p43 | இப்போது புரிகிறதா ஓரிடத்தான் என்றால் என்னவென்று? இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

