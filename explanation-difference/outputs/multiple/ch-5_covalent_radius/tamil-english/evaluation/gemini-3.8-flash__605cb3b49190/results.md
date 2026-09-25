# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius in Tamil, covering its definition, formula, illustrative analogy, worked chemical calculation for chlorine, periodic trends, and the rationale behind measuring it via bonded atoms.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 31,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 31,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two identical bonded atoms and provides the corresponding mathematical formula.

Accuracy: **accurate**. The definition of covalent radius as half the internuclear distance between two identical atoms sharing a covalent bond and the formula r = d/2 are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வேதியியலில் (Chemistry) மிக முக்கியமான மற்றும் எளிமையான ஒரு தலைப்பான **&quot;சகப்பிணைப்பு ஆரம்&quot; (Covalent Radius)** பற்றி இன்று நாம் தெரிந்து கொள்ளலாம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஒரு உயர்நிலைப் பள்ளி மாணவனாக, இதை நீங்கள் எளிதாகப் புரிந்துகொள்ள நான் ஒரு ஆசிரியராக விளக்குகிறேன். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### சகப்பிணைப்பு ஆரம் என்றால் என்ன? (Definition) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | ஒரே தனிமத்தைச் சேர்ந்த இரண்டு அணுக்கள் **சகப்பிணைப்பால் (Covalent Bond - அதாவது எலக்ட்ரான்களைப் பகிர்ந்து கொள்வதன் மூலம்)** பிணைக்கப்பட்டிருக்கும் போது, **அந்த இரண்டு அணுக்கருக்களுக்கு (Nuclei) இடையே உள்ள தூரத்தின் சரிபாதியே &quot;சகப்பிணைப்பு ஆரம்&quot; ஆகும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | எளிய வாய்ப்பாடு (Formula): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | $$\text{சகப்பிணைப்பு ஆரம் } (r) = \frac{d}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | *(இங்கு &#x27;$d$&#x27; என்பது இரண்டு அணுக்கருக்களுக்கு இடையே உள்ள தூரம் - Internuclear distance)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Clay balls analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "இரண்டு சம அளவுள்ள களிமண் உருண்டைகளை எடுத்துக்கொள்ளுங்கள்."}]}

Annotation rationale: Uses pressed clay balls to help a student intuitively visualize the overlap of atoms and the measurement between centers divided by two.

Accuracy: **accurate**. The analogy accurately captures the concept of two overlapping bodies and taking half the distance between their centers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### ஒரு எளிய உதாரணம் (Real-life Analogy): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | இரண்டு சம அளவுள்ள களிமண் உருண்டைகளை எடுத்துக்கொள்ளுங்கள். அவற்றை லேசாக ஒன்றோடு ஒன்று அழுத்தி ஒட்ட வைக்கிறீர்கள் என்று வைத்துக்கொள்வோம் (இதுதான் சகப்பிணைப்பு).  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | இப்போது, முதல் உருண்டையின் மையப்புள்ளிக்கும், இரண்டாவது உருண்டையின் மையப்புள்ளிக்கும் இடையே உள்ள மொத்த தூரத்தை அளந்து, அதை **இரண்டால் வகுத்தால் (divide by 2)** என்ன கிடைக்குமோ, அதுதான் அந்த அணுவின் சகப்பிணைப்பு ஆரம்! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Calculation of covalent radius in chlorine molecule (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a concrete calculation using the experimental Cl-Cl bond length of 198 pm to find a covalent radius of 99 pm.

Accuracy: **accurate**. The internuclear distance for Cl2 (198 pm) and the resulting covalent radius (99 pm) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### அறிவியல் எடுத்துக்காட்டு (Example with Chlorine): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | * நாம் **குளோரின் மூலக்கூறை ($Cl_2$)** எடுத்துக்கொள்வோம். இதில் இரண்டு குளோரின் அணுக்கள் ஒற்றைச் சகப்பிணைப்பில் இணைந்துள்ளன. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | * இந்த இரண்டு குளோரின் அணுக்கருக்களுக்கு இடையே உள்ள தூரம் ($d$) = **$198\text{ pm}$** (பிக்கோ மீட்டர் - Picometre). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | * எனவே, குளோரினின் சகப்பிணைப்பு ஆரம்: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 |   $$r = \frac{198}{2} = 99\text{ pm}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how and why covalent radius changes across a period (decreases due to higher effective nuclear charge) and down a group (increases due to addition of shells).

Accuracy: **accurate**. Both periodic trends (decrease across a period, increase down a group) and their physical causes (nuclear charge vs. addition of electron shells) are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### தனிம வரிசை அட்டவணையில் இதன் மாற்றம் (Trends in Periodic Table): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | பரீட்சையில் இது மிக முக்கியமான கேள்வி. இது எப்படி மாறுகிறது என்று பார்ப்போம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | 1. **ஒரு தொடரில், இடமிருந்து வலமாகச் செல்லும்போது (Across a Period - Left to Right):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p23 |    * சகப்பிணைப்பு ஆரம் **குறைகிறது**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 |    * **காரணம்:** அணுக்கருவில் நேர்மின்சுமை (Nuclear charge/புரோட்டான்கள்) அதிகரிப்பதால், அது வெளிக்கூட்டு எலக்ட்ரான்களைத் தன் பக்கமாக வலுவாக ஈர்க்கிறது. இதனால் அணு சுருங்குகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | 2. **ஒரு தொகுதியில், மேலிருந்து கீழாக வரும்போது (Down a Group - Top to Bottom):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p26 |    * சகப்பிணைப்பு ஆரம் **அதிகரிக்கிறது**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |    * **காரணம்:** கீழே செல்லச் செல்லப் புதிய எலக்ட்ரான் கூடுகள் (New shells) சேர்வதால், அணுக்கருவிற்கும் வெளிக்கூட்டுக்கும் உள்ள தூரம் அதிகமாகி, அணுவின் அளவு பெரிதாகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Limitation of measuring the boundary of an isolated atom (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why atomic radius cannot be measured directly for a single isolated atom due to its diffuse electron cloud, justifying the necessity of measuring covalent radius via bonded atoms.

Accuracy: **accurate**. The explanation that an isolated atom lacks a sharp outer boundary because its electron cloud is diffuse is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### நினைவில் வைக்க வேண்டிய முக்கிய குறிப்பு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | தனியாக இருக்கும் ஒரு அணுவின் எல்லையைத் துல்லியமாக அளவிட முடியாது (ஏனெனில் எலக்ட்ரான் மேகம் பரவி இருக்கும்). அதனால்தான், சகப்பிணைப்பில் உள்ள இரண்டு அணுக்களின் மையத் தூரத்தை அளந்து, அதில் பாதியை எடுத்து &quot;சகப்பிணைப்பு ஆரம்&quot; என்று அழைக்கிறோம். | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p31 | இப்போது புரிகிறதா? இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேட்கலாம்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

