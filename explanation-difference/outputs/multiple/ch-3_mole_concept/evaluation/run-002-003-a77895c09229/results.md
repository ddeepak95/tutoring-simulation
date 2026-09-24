# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains the mole concept for a high school student, covering analogies to counting units, Avogadro's number, molar mass, standard conversion formulas, a worked practice example, and a summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 49,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 49,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy between mole and everyday counting units (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "* 1 **டஜன்** வாழைப்பழம் = 12 வாழைப்பழங்கள்"}]}

Annotation rationale: Uses familiar counting units such as pairs, dozens, and centuries to explain how 'mole' acts as a specific counting unit in chemistry.

Accuracy: **accurate**. The analogies correctly illustrate counting terms and appropriately compare them to the role of a mole in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வாருங்கள், வேதியியலின் மிக முக்கியமான மற்றும் சுவாரஸ்யமான பாடமான **&quot;மோல் தத்துவம்&quot; (Mole Concept)** பற்றி மிக எளிமையாகப் புரிந்து கொள்வோம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | பல மாணவர்கள் இதைப் பார்த்து பயப்படுவார்கள். ஆனால் உண்மையில் இது ஒரு மளிகைக் கடை கணக்கு போன்றதுதான்! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. ஒரு எளிய உதாரணத்துடன் தொடங்குவோம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | நாம் கடைக்குச் சென்று பொருட்கள் வாங்கும்போது சில வார்த்தைகளைப் பயன்படுத்துகிறோம் அல்லவா? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | * 1 **ஜோடி** செருப்பு = 2 செருப்புகள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | * 1 **டஜன்** வாழைப்பழம் = 12 வாழைப்பழங்கள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | * 1 **செஞ்சுரி** (கிரிக்கெட்டில்) = 100 ரன்கள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | இங்கே &quot;டஜன்&quot; என்பது **12** என்ற எண்ணிக்கையைக் குறிக்கும் ஒரு பெயர், அவ்வளவுதான்.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | அதேபோல, வேதியியலாளர்கள் அணுக்களையும் (Atoms) மூலக்கூறுகளையும் (Molecules) எண்ணுவதற்குப் பயன்படுத்தும் ஒரு பெயர்தான் **&quot;மோல்&quot; (Mole)**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "ஒரு துளி தண்ணீரில் கோடிக்கணக்கான மூலக்கூறுகள் இருக்கும்."}]}

Annotation rationale: Explains why a large number is needed for atomic-scale counting and introduces Avogadro's number (6.022 x 10^23).

Accuracy: **accurate**. The definition of the mole and the numerical value of Avogadro's number are stated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ### 2. மோல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | அணுக்களும் மூலக்கூறுகளும் நம் கண்களுக்குத் தெரியாத அளவிற்கு மிக மிகச் சிறியவை. ஒரு துளி தண்ணீரில் கோடிக்கணக்கான மூலக்கூறுகள் இருக்கும். அவற்றை 1, 2, 3 என்று சாதாரணமாக எண்ண முடியாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | அதனால் விஞ்ஞானிகள் ஒரு பெரிய எண்ணிக்கையை &quot;ஒரு மோல்&quot; என்று கூடை போலக் கட்டி வைத்திருக்கிறார்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | &gt; **1 மோல் = $6.022 \times 10^{23}$ துகள்கள்** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p16 | இந்த மிகப்பெரிய எண்ணிற்கு **&quot;அவகாட்ரோ எண்&quot; (Avogadro&#x27;s Number - $N_A$)** என்று பெயர். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | * அதாவது, **1 மோல் பேனாக்கள்** என்றால் உங்களிடம் $6.022 \times 10^{23}$ பேனாக்கள் உள்ளன என்று அர்த்தம் (6-க்கு பக்கத்தில் 23 பூஜ்ஜியங்களை சேர்த்தால் எவ்வளவு பெரிய எண்ணோ அவ்வளவு!). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | * **1 மோல் ஹைட்ரஜன் அணுக்கள்** என்றால் அதில் $6.022 \times 10^{23}$ அணுக்கள் இருக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Relationship between mole, molar mass, and grams (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the mole acts as a bridge between microscopic particle count and macroscopic mass in grams using carbon-12 and molar mass.

Accuracy: **accurate**. The explanation of molar mass and its correspondence to atomic/molecular weights in grams is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### 3. மோலும் நிறையும் (Mole and Mass - கிராம் கணக்கு): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | &quot;சரி சார், இவ்வளவு பெரிய எண்ணை வைத்து நாம் என்ன செய்வது? ஆய்வகத்தில் இதை எப்படி அளப்பது?&quot; என்ற கேள்வி உங்களுக்கு வரலாம். அருமையான கேள்வி! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p22 | இங்குதான் ஒரு அற்புதம் நடக்கிறது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | தனிம வரிசை அட்டவணையில் (Periodic Table) கார்பனின் அணு நிறை (Atomic mass) **12** என்று பார்த்திருப்பீர்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | நீங்கள் சரியாக **12 கிராம் தூய கார்பனை** எடை போட்டு எடுத்தால், அதற்குள் சரியாக **1 மோல் ($6.022 \times 10^{23}$) கார்பன் அணுக்கள்** இருக்கும்! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | இதைத்தான் **&quot;மோலார் நிறை&quot; (Molar Mass)** என்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | * 1 மோல் கார்பன் = 12 கிராம் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | * 1 மோல் ஆக்சிஜன் ($O_2$) = 32 கிராம் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | * 1 மோல் தண்ணீர் ($H_2O$) = 18 கிராம் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | அதாவது, நாம் கண்ணால் பார்க்க முடியாத மூலக்கூறுகளின் எண்ணிக்கையை, ஆய்வகத்தில் **&quot;கிராம்&quot;** எடையை வைத்து அளக்க உதவும் ஒரு **பாலம் (Bridge)** தான் இந்த &quot;மோல்&quot;. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Formulas for calculating moles (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents procedural formulas to calculate the number of moles from given mass and from particle count.

Accuracy: **accurate**. Both conversion formulas (n = m/M and n = N/N_A) are stated accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### 4. தேர்வுக்குத் தேவையான முக்கியமான சூத்திரங்கள் (Formulas): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | கணக்குகளைத் தீர்க்க இந்த இரண்டு சூத்திரங்களை மட்டும் நினைவில் வையுங்கள்: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p33 | 1. **கொடுக்கப்பட்ட எடையை மோலாக மாற்ற:** | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p34 |    $$\text{மோல்களின் எண்ணிக்கை (n)} = \frac{\text{கொடுக்கப்பட்ட நிறை (m)}}{\text{மோலார் நிறை (M)}}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p35 | 2. **துகள்களின் எண்ணிக்கையை மோலாக மாற்ற:** | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p36 |    $$\text{மோல்களின் எண்ணிக்கை (n)} = \frac{\text{துகள்களின் எண்ணிக்கை (N)}}{\text{அவகாட்ரோ எண் } (6.022 \times 10^{23})}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Calculation of moles in 36 grams of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example calculating the number of moles present in 36 g of water.

Accuracy: **accurate**. The molar mass calculation for H2O (18 g/mol) and the resulting answer (36 / 18 = 2 moles) are mathematically and conceptually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### ஒரு சிறிய பயிற்சி கணக்கு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | **கேள்வி:** உங்களிடம் **36 கிராம் தூய தண்ணீர் ($H_2O$)** இருக்கிறது. அதில் எத்தனை மோல் தண்ணீர் உள்ளது? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | **தீர்வு:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | 1. நீரின் மோலார் நிறை ($H_2O$) = $2(1) + 16 = 18 \text{ கிராம்/மோல்}$. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p42 | 2. சூத்திரம்: $\text{மோல்} = \frac{\text{கொடுக்கப்பட்ட எடை}}{\text{மோலார் நிறை}}$ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p43 | 3. $\text{மோல்} = \frac{36}{18} = \mathbf{2 \text{ மோல்கள்}}$. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p44 | அவ்வளவுதான்! 36 கிராம் தண்ணீரில் **2 மோல்** தண்ணீர் உள்ளது (அதாவது $2 \times 6.022 \times 10^{23}$ தண்ணீர் மூலக்கூறுகள் உள்ளன). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concepts learned and closes with an interactive question to check understanding.

Accuracy: **accurate**. The recap accurately synthesizes the main points of the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ### சுருக்கம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | * **மோல்** என்பது அணுக்களை அளவிடும் ஒரு அளவீடு. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | * 1 மோல் = $6.022 \times 10^{23}$ துகள்கள் (அவகாட்ரோ எண்). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | * இது எடையையும் (Mass) அணுக்களின் எண்ணிக்கையையும் இணைக்கிறது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | இதில் உங்களுக்கு ஏதேனும் சந்தேகம் உள்ளதா? அல்லது ஒரு கணக்கை நாம் சேர்ந்து செய்து பார்க்கலாமா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

