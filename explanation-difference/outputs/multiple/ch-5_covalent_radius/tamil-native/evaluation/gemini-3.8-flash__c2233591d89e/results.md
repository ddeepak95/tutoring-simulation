# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius, including why it is needed, its formal definition and formula, a worked calculation for the chlorine molecule, its trends across periods and down groups in the periodic table, and a summary recap.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 3,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Need for covalent radius and nature of atomic boundaries (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "டேப் (Tape) வைத்தெல்லாம் அளக்க முடியாது"}]}

Annotation rationale: Explains why measuring atomic radius directly is not feasible due to the electron cloud lacking a sharp physical boundary, motivating the definition of covalent radius.

Accuracy: **accurate**. Correctly states that atoms lack fixed physical boundaries because of the electron cloud, necessitating practical conventions like covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம் மாணவரே! வாருங்கள், வேதியியலில் மிக முக்கியமான மற்றும் எளிமையான ஒரு தலைப்பான **&quot;சகப்பிணைப்பு ஆரம்&quot; (Covalent Radius)** பற்றி இன்று மிகத் தெளிவாகப் புரிந்து கொள்வோம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | முதலில் ஒரு சின்னக் கேள்வி:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | *ஒரு வட்டத்தின் ஆரம் (Radius) என்றால் என்ன? அதன் மையத்திலிருந்து விளிம்பு வரை உள்ள தூரம், சரியா?*  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ஆனால், அணுக்கள் விஷயத்தில் இது அவ்வளவு சுலபமல்ல. ஏனென்றால், அணுவுக்கு என்று ஒரு திடமான சுவர் அல்லது எல்லை கிடையாது. எலக்ட்ரான்கள் ஒரு மேகம் போல அணுக்கருவைச் சுற்றி ஓடிக்கொண்டே இருக்கும். அதனால் ஒரு தனித்த அணுவின் ஆரத்தை நம்மால் டேப் (Tape) வைத்தெல்லாம் அளக்க முடியாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | இதற்கு விஞ்ஞானிகள் கண்டுபிடித்த ஒரு புத்திசாலித்தனமான வழிதான் **சகப்பிணைப்பு ஆரம்**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "இரண்டு சிறந்த நண்பர்கள் ஒருவரையொருவர் இறுக்கமாகக் கைகுலுக்கிக் கொள்வது போல"}]}

Annotation rationale: Introduces the definition of covalent radius as half the internuclear distance between two identical single-bonded atoms, supported by an analogy and the formula r = d/2.

Accuracy: **accurate**. The definition of homonuclear single covalent radius and its mathematical relationship (r = d/2) are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### சகப்பிணைப்பு ஆரம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | இதை ஒரு எளிய உதாரணத்தின் மூலம் பார்ப்போம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | இரண்டு சிறந்த நண்பர்கள் ஒருவரையொருவர் இறுக்கமாகக் கைகுலுக்கிக் கொள்வது போல, இரண்டு அணுக்கள் எலக்ட்ரான்களைப் **பகிர்ந்து கொண்டு** பிணைப்பை (Covalent Bond) ஏற்படுத்துகின்றன.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | இப்போது வரையறைக்கு வருவோம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | &gt; **&quot;ஒரே தனிமத்தைச் சேர்ந்த இரண்டு அணுக்கள் ஒற்றைச் சகப்பிணைப்பால் பிணைக்கப்பட்டிருக்கும் போது, அந்த இரண்டு அணுக்களின் அணுக்கருக்களுக்கு (Nuclei) இடையே உள்ள தூரத்தின் சரிபாதி அளவே &#x27;சகப்பிணைப்பு ஆரம்&#x27; எனப்படும்.&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | ### ஒரு எளிய கணக்கு (Formula): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | இரண்டு அணுக்கருக்களுக்கு இடையே உள்ள மொத்த தூரத்தை **&quot;d&quot; (Bond length)** என்று வைத்துக்கொள்வோம்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | அப்படியென்றால், சகப்பிணைப்பு ஆரம் ($r$): | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | $$r = \frac{d}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u3: Calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation finding the covalent radius of chlorine from the Cl-Cl internuclear bond distance (198 pm / 2 = 99 pm).

Accuracy: **accurate**. The chlorine Cl-Cl bond length of 198 pm and the calculated covalent radius of 99 pm are factually and mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **உதாரணம் (குளோரின் மூலக்கூறு - $Cl_2$):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | * இரண்டு குளோரின் அணுக்கள் இணையும் போது, அவற்றின் மையங்களுக்கு இடையே உள்ள தூரம் **$198\text{ pm}$** (பிகோமீட்டர்). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | * இப்போது இதன் சகப்பிணைப்பு ஆரம் = $\frac{198}{2} = 99\text{ pm}$. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p19 | * அவ்வளவுதான்! குளோரின் அணுவின் ஆரம் **$99\text{ pm}$**. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p28", "quote": "வெங்காயத்தில் அடுக்குகள் கூடக்கூட அதன் அளவு பெரிதாவது போல"}]}

Annotation rationale: Explains why covalent radius decreases across a period (increasing nuclear charge) and increases down a group (addition of electron shells).

Accuracy: **accurate**. The stated periodic trends and underlying physical explanations (nuclear pull across periods, principal shell addition down groups) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p21 | ### ஆவர்த்தன அட்டவணையில் (Periodic Table) இது எப்படி மாறும்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | தேர்வுக்கு இது மிக முக்கியம், கவனமாகக் கேளுங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | 1. **இடமிருந்து வலமாகச் செல்லும்போது (தொடரில் - Across a Period):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |    * சகப்பிணைப்பு ஆரம் **குறையும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 |    * *ஏன்?* அணுக்கருவில் நேர்மின்சுமை (புரோட்டான்கள்) அதிகரிப்பதால், அது எலக்ட்ரான்களைத் தன்னை நோக்கி பலமாக இழுக்கும். இதனால் அணு சுருங்கிவிடும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | 2. **மேலிருந்து கீழாக வரும்போது (தொகுதியில் - Down a Group):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 |    * சகப்பிணைப்பு ஆரம் **அதிகரிக்கும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 |    * *ஏன்?* ஒவ்வொரு படியாகக் கீழே வரும்போதும் புதிய எலக்ட்ரான் கூடுகள் (Shells) சேர்ந்துகொண்டே போகும். உதாரணத்திற்கு, வெங்காயத்தில் அடுக்குகள் கூடக்கூட அதன் அளவு பெரிதாவது போல, அணுவின் அளவும் பெரிதாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Summary of covalent radius and periodic trends (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents bullet points summarizing the definition, formula, and periodic trends for quick revision, followed by a closing remark.

Accuracy: **accurate**. The recap accurately synthesizes the core definitions, formula, and periodic trends discussed in the explanation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | ### சுருக்கமாக நினைவில் வைக்க: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | * **சகப்பிணைப்பு:** எலக்ட்ரான் பங்கீடு. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p32 | * **ஆரம்:** இரண்டு மையங்களுக்கு இடைப்பட்ட தூரத்தில் **பாதி** ($\frac{d}{2}$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p33 | * தொடரில் **குறையும்**, தொகுதியில் **கூடும்**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p34 | இதில் உங்களுக்கு ஏதேனும் சந்தேகம் உள்ளதா? அல்லது வேறு ஏதேனும் உதாரணம் பார்க்கலாமா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

