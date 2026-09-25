# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains the principles and major industrial processes (Mond process and Van Arkel method) of vapour phase refining in Tamil.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 32,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the general sequence of converting an impure metal into a volatile compound and subsequently decomposing it into a pure metal.

Accuracy: **accurate**. The explanation correctly outlines the core principle of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வேதியியலில் (Chemistry) உலோகங்களை பிரித்தெடுக்கும் பிரிவில் மிக முக்கியமான மற்றும் சுவாரஸ்யமான தலைப்பு **&quot;ஆவி நிலை முறை&quot; (Vapour Phase Refining)**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | இதை ஒரு ஆசிரியர் உங்களுக்கு வகுப்பறையில் விளக்குவது போல மிக எளிமையாகப் பார்க்கலாம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ஆவி நிலை முறை என்றால் என்ன? (Basic Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | பெயரிலேயே அதற்கான அர்த்தம் இருக்கிறது—**&quot;ஆவி&quot; (Vapour)**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | தூய்மையற்ற ஒரு உலோகத்தை, ஒரு தகுந்த வேதிப்பொருளுடன் சேர்த்து சூடாக்கி, அதை **எளிதில் ஆவியாகக்கூடிய ஒரு சேர்மமாக (Volatile Compound)** மாற்ற வேண்டும். பிறகு, அந்த ஆவியை இன்னும் அதிக வெப்பநிலைக்கு உட்படுத்தி சிதைத்தால் (decompose), நமக்கு **100% தூய உலோகம்** கிடைக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | சுருக்கமாகச் சொன்னால்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | &gt; **தூய்மையற்ற உலோகம் + வேதிப்பொருள் $\rightarrow$ ஆவியாகும் வாயு (அழுக்குகள் கீழே தங்கிவிடும்) $\rightarrow$ அதிக வெப்பத்தில் சூடாக்குதல் $\rightarrow$ தூய உலோகம்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Requirements for vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the two essential conditions (formation of a volatile compound and ease of thermal decomposition) required for vapour phase refining.

Accuracy: **accurate**. Accurately presents the two standard chemical prerequisites for vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### இதற்கு 2 முக்கிய நிபந்தனைகள் (Two Golden Rules) தேவை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | 1. நாம் தேர்ந்தெடுக்கும் உலோகம், ஒரு குறிப்பிட்ட காரணியுடன் (reagent) வினைபுரிந்து **எளிதில் ஆவியாகும் சேர்மமாக (volatile compound) மாற வேண்டும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 2. அந்த ஆவிச் சேர்மத்தை சூடாக்கும் போது, அது **எளிதில் உடைந்து (சிதைந்து) மீண்டும் தூய உலோகத்தைத் தர வேண்டும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world chemical application of vapour phase refining using the Mond process to purify nickel via nickel tetracarbonyl.

Accuracy: **accurate**. All temperatures, reagents, chemical equations, and intermediates for the Mond process are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | உங்கள் பள்ளித் தேர்வுகளுக்கு இந்த முறையின்கீழ் வரும் **இரண்டு முக்கிய உதாரணங்கள்** மிக மிக முக்கியம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | #### 1. மாண்ட் முறை (Mond Process) – நிக்கலைத் (Nickel) தூய்மையாக்குதல்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | நிக்கல் உலோகத்தை இந்த முறையில் மிக எளிதாகத் தூய்மைப்படுத்தலாம். இது இரண்டு படிகளில் நடக்கும்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | * **படி 1:** தூய்மையற்ற நிக்கல் உடன் **கார்பன் மோனாக்சைடு ($CO$)** வாயுவைச் சேர்த்து சுமார் $350 \text{ K}$ வெப்பநிலையில் சூடாக்கும் போது, **&quot;நிக்கல் டெட்ரா கார்பனைல்&quot;** $[Ni(CO)_4]$ என்ற வாயு உருவாகிறது. நிக்கலில் இருந்த அசுத்தங்கள் ஆவியாகாமல் அப்படியே நின்றுவிடும். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 |   $$\text{Ni (தூய்மையற்றது)} + 4\text{CO} \xrightarrow{350\text{ K}} \text{Ni(CO)}_4 \text{ (ஆவி)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | * **படி 2:** இப்போது இந்த வாயுவை மட்டும் தனியாகப் பிரித்து எடுத்து, சுமார் $450 - 470 \text{ K}$ வெப்பநிலைக்குச் சூடாக்க வேண்டும். அப்போது அந்தச் சேர்மம் உடைந்து, **தூய நிக்கல்** தனியாகவும், கார்பன் மோனாக்சைடு வாயு தனியாகவும் பிரிந்துவிடும். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |   $$\text{Ni(CO)}_4 \xrightarrow{450 - 470\text{ K}} \text{Ni (தூய உலோகம்)} + 4\text{CO}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Van Arkel method for titanium purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the application of vapour phase refining via the Van Arkel method to refine titanium using iodine and a tungsten filament.

Accuracy: **accurate**. Chemical equations, reaction conditions (iodine, vacuum vessel, 550 K and 1800 K tungsten filament), and descriptions are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | #### 2. வான்-ஆர்கெல் முறை (Van Arkel Method) – டைட்டானியம் (Ti) / சிர்கோனியம் (Zr): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | டைட்டானியம் மற்றும் சிர்கோனியம் போன்ற உலோகங்களில் உள்ள ஆக்சிஜன், நைட்ரஜன் போன்ற அசுத்தங்களை நீக்க இந்த முறை பயன்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | * **படி 1:** தூய்மையற்ற டைட்டானியத்தை **அயோடின் ($I_2$)** உடன் சேர்த்து ஒரு வெற்றிடக் கலனில் சுமார் $550 \text{ K}$ வெப்பநிலையில் சூடாக்க வேண்டும். அப்போது **&quot;டைட்டானியம் டெட்ரா அயோடைடு&quot;** ($TiI_4$) என்ற ஆவி உருவாகும். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 |   $$\text{Ti (தூய்மையற்றது)} + 2\text{I}_2 \xrightarrow{550\text{ K}} \text{TiI}_4 \text{ (ஆவி)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | * **படி 2:** இந்த ஆவியை மிக அதிக வெப்பத்தில் (சுமார் $1800 \text{ K}$) எரியும் **டங்ஸ்டன் இழை (Tungsten filament)** மீது செலுத்துவார்கள். அதிக வெப்பத்தால் அது சிதைந்து, **தூய டைட்டானியம்** அந்த டங்ஸ்டன் இழையின் மீது படியும். அயோடின் வாயுவாக வெளியேறிவிடும் (இதை மீண்டும் பயன்படுத்தலாம்). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |   $$\text{TiI}_4 \xrightarrow{1800\text{ K}} \text{Ti (தூய உலோகம்)} + 2\text{I}_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Summary cheat sheet for exam recall (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary cheat sheet linking processes to their respective metals and reagents for exam preparation, along with concluding remarks.

Accuracy: **accurate**. Accurately pairs the two processes with their corresponding metals and reagents.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### நினைவில் வைத்துக்கொள்ள வேண்டிய &#x27;Cheat Code&#x27;: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | * **Mond Process** $\rightarrow$ நிக்கல் ($Ni$) $\rightarrow$ கார்பன் மோனாக்சைடு ($CO$) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | * **Van Arkel Process** $\rightarrow$ டைட்டானியம் ($Ti$) / சிர்கோனியம் ($Zr$) $\rightarrow$ அயோடின் ($I_2$) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | இந்த விளக்கம் உங்களுக்குத் தெளிவாகப் புரிந்ததா? இதில் ஏதேனும் சமன்பாடுகளில் (Equations) சந்தேகம் உள்ளதா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

