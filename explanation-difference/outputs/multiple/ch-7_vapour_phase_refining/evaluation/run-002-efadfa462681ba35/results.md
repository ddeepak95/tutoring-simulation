# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains vapour phase refining in metallurgy, including its general principles and conditions, alongside the standard textbook examples (Mond process and Van Arkel process) and an introductory analogy.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 42,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 42,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 1,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Camphor and sand separation analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "உங்களிடம் மணலும் கற்பூரமும் கலந்த ஒரு கலவை இருக்கிறது என்று வைத்துக்கொள்வோம்."}, {"passage_id": "p6", "quote": "வெப்பப்படுத்தினால் போதும்! கற்பூரம் மட்டும் ஆவியாகி மேலே சென்றுவிடும், மணல் அடியிலேயே தங்கிவிடும்."}]}

Annotation rationale: Uses the familiar household example of separating a mixture of camphor and sand by heating to introduce the core concept of converting a desired substance into vapour to leave non-volatile impurities behind.

Accuracy: **accurate**. The analogy accurately describes the physical separation of camphor from sand via sublimation and connects the concept to vapour phase purification.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வேதியியல் என்பது நாம் அன்றாடம் பார்க்கும் மாற்றங்களின் அறிவியல். இன்று நாம் உலோகவியலில் (Metallurgy) மிக முக்கியமான மற்றும் சுவாரஸ்யமான ஒரு தலைப்பான **&quot;ஆவி நிலைமை தூய்மையாக்கல்&quot; (Vapour Phase Refining)** பற்றி மிக எளிமையாகப் புரிந்துகொள்ளப் போகிறோம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஒரு கதையோடு தொடங்கலாம்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ஒரு சிறிய கற்பனை (Analogy): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | உங்களிடம் மணலும் கற்பூரமும் கலந்த ஒரு கலவை இருக்கிறது என்று வைத்துக்கொள்வோம். இரண்டையும் எப்படிப் பிரிப்பீர்கள்?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | வெப்பப்படுத்தினால் போதும்! கற்பூரம் மட்டும் ஆவியாகி மேலே சென்றுவிடும், மணல் அடியிலேயே தங்கிவிடும். அந்த ஆவியை குளிரவைத்தால் சுத்தமான கற்பூரம் கிடைத்துவிடும் அல்லவா?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | கிட்டத்தட்ட இதே தத்துவம்தான் **ஆவி நிலைமை தூய்மையாக்கல்** முறையிலும் பயன்படுகிறது. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition, conditions, and general two-step mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the fundamental chemical principle of vapour phase refining, the two essential conditions required for the metal and the volatile compound, and the two sequential steps (volatilization and thermal decomposition).

Accuracy: **accurate**. The explanation correctly outlines the chemical requirements (formation of a volatile compound with a specific reagent and its subsequent thermal decomposition) as well as the general two-step equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | ### ஆவி நிலைமை தூய்மையாக்கல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | ஒரு அசுத்தமான உலோகத்தை, ஒரு குறிப்பிட்ட வாயுவுடன் சேர்த்து சூடுபடுத்தி, **எளிதில் ஆவியாகும் ஒரு சேர்மமாக (Volatile Compound)** மாற்ற வேண்டும்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | அசுத்தங்கள் ஆவியாகாமல் அப்படியே தங்கிவிடும். பிறகு, அந்த ஆவியை மட்டும் தனியாகப் பிடித்து, இன்னும் அதிக வெப்பநிலைக்குச் சூடுபடுத்தினால், அது சிதைந்து நமக்கு **100% தூய உலோகம்** கிடைக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | இம்முறையில் இரண்டு முக்கிய நிபந்தனைகள் உள்ளன: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | 1. உலோகம் ஒரு குறிப்பிட்ட காரணியுடன் (reagent) வினைபுரிந்து **எளிதில் ஆவியாக மாற வேண்டும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | 2. உருவான அந்த ஆவிச் சேர்மம், எளிதில் **சிதைந்து (decompose) மீண்டும் தூய உலோகத்தைத் தர வேண்டும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ### இந்த முறையில் இரண்டு முக்கியப் படிகள் உள்ளன: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | * **படி 1 (ஆவியாக்குதல்):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p18 |   $$\text{அசுத்த உலோகம்} + \text{காரணி} \xrightarrow{\text{குறைந்த வெப்பம்}} \text{ஆவியாகும் சேர்மம்}$$  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p19 |   *(இங்கு அசுத்தங்கள் ஆவியாகாமல் தனியே பிரிந்துவிடும்)* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | * **படி 2 (சிதைத்தல்):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p21 |   $$\text{ஆவியாகும் சேர்மம்} \xrightarrow{\text{அதிக வெப்பம்}} \text{தூய உலோகம்} + \text{காரணி}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p22 |   *(காரணி வாயுவாக வெளியேறிவிடும், தூய உலோகம் மட்டும் நமக்குக் கிடைக்கும்)* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the real-world industrial application of vapour phase refining to purify nickel using carbon monoxide through the Mond process.

Accuracy: **accurate**. The reaction conditions and chemical equations for the formation of nickel tetracarbonyl at ~350 K and its thermal decomposition at ~450-470 K are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | ### உங்கள் பொதுத்தேர்வுக்கு முக்கியமான இரண்டு எடுத்துக்காட்டுகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | உயர்நிலைப் பள்ளிப் பாடத்திட்டத்தில் இது தொடர்பாக இரண்டு முறைகள் அடிக்கடி கேட்கப்படும்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | #### 1. மாண்ட் முறை (Mond Process) - நிக்கலை (Nickel) தூய்மையாக்க: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | * **படி 1:** அசுத்தமான நிக்கல், கார்பன் மோனாக்சைடு ($CO$) வாயுவுடன் சுமார் $350 \text{ K}$ வெப்பநிலையில் வினைபுரிந்து, **நிக்கல் டெட்ரா கார்பனைல்** எனும் ஆவியாகும் சேர்மமாக மாறுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |   $$\text{Ni} (\text{அசுத்தம்}) + 4\text{CO} \xrightarrow{350\text{ K}} \text{Ni(CO)}_4 \text{ (ஆவி)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | * **படி 2:** இந்த ஆவியை $450 - 470 \text{ K}$ வெப்பநிலைக்குச் சூடுபடுத்தும்போது, அது சிதைந்து **தூய நிக்கல்** படிகிறது. கார்பன் மோனாக்சைடு வெளியேறுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 |   $$\text{Ni(CO)}_4 \xrightarrow{450\text{ K}} \text{Ni} (\text{தூயது}) + 4\text{CO} \uparrow$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Van Arkel method for zirconium and titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of vapour phase refining to titanium and zirconium using iodine vapor and a hot tungsten filament.

Accuracy: **accurate**. The temperatures (~550 K and ~1800 K on tungsten filament), chemical species, and equations for the Van Arkel purification of titanium are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | #### 2. வான்-ஆர்கல் முறை (Van Arkel Method) - சிர்கோனியம் (Zr) / டைட்டானியம் (Ti) தூய்மையாக்க: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | விண்வெளி மற்றும் அணு உலைகளில் பயன்படும் மிகத் தூய்மையான டைட்டானியம் மற்றும் சிர்கோனியத்தை இந்த முறையில் பிரிப்பார்கள். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | * **படி 1:** அசுத்தமான டைட்டானியத்தை **அயோடின் ($I_2$)** ஆவியுடன் $550 \text{ K}$ வெப்பநிலையில் வினைபுரியச் செய்து, எளிதில் ஆவியாகும் **டைட்டானியம் டெட்ரா அயோடைடு ($TiI_4$)** உருவாக்கப்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |   $$\text{Ti} (\text{அசுத்தம்}) + 2\text{I}_2 \xrightarrow{550\text{ K}} \text{TiI}_4 \text{ (ஆவி)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | * **படி 2:** இந்த ஆவி, மிக அதிக வெப்பநிலையில் (சுமார் $1800 \text{ K}$) எரியும் டங்ஸ்டன் இழை (Tungsten filament) மீது செலுத்தப்படும்போது, அது சிதைந்து இழையின் மீது **தூய டைட்டானியம்** படிகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 |   $$\text{TiI}_4 \xrightarrow{1800\text{ K}} \text{Ti} (\text{தூயது}) + 2\text{I}_2 \uparrow$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Exam tips and core concept summary (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key associations (Mond with Ni + CO; Van Arkel with Ti/Zr + I2) and the two-step framework for student revision.

Accuracy: **accurate**. The summary correctly recaps the reagents, metals, and two steps of both refining processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### நினைவில் வைத்துக்கொள்ள ஒரு &#x27;Teacher&#x27;s Tip&#x27;: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | * **மாண்ட் முறை (Mond)** என்றால் நிக்கல் + கார்பன் மோனாக்சைடு ($\text{Ni} + \text{CO}$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p40 | * **வான்-ஆர்கல் முறை (Van Arkel)** என்றால் சிர்கோனியம்/டைட்டானியம் + அயோடின் ($\text{Ti/Zr} + \text{I}_2$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p41 | * இரண்டு முறைகளிலுமே **முதல் படி: ஆவியாக்குதல்**, **இரண்டாம் படி: சிதைத்தல்**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p42 | இப்போது புரிகிறதா? இது உலோகங்களை அவற்றின் ஆவி நிலைக்குக் கொண்டுசென்று தூய்மைப்படுத்தும் ஒரு புத்திசாலித்தனமான வேதியியல் முறை! இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

