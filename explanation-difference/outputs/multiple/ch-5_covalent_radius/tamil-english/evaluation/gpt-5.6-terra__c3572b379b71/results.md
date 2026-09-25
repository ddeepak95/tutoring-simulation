# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius in Tamil, addressing definition, formula, example calculation, significance, and periodic trends.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 41,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 41,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the formal definition and equation for covalent radius as half the internuclear distance between two covalently bonded identical atoms.

Accuracy: **accurate**. The definition and formula correctly state that covalent radius is half the internuclear distance between two identical covalently bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **கோவேலன்ட் ஆரம் (Covalent Radius)** என்பது ஒரு அணுவின் அளவை குறிப்பிடும் அளவாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஒரே வகை இரண்டு அணுக்கள் ஒரு **கோவேலன்ட் பிணைப்பால்** இணைந்திருக்கும் போது, அவற்றின் கருக்களுக்கு (nuclei) இடையிலான தூரத்தின் **பாதி** அந்த அணுவின் கோவேலன்ட் ஆரம் எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### வரையறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | \text{கோவேலன்ட் ஆரம்} = \frac{\text{இரண்டு இணைந்த அணுக்களின் கருக்களுக்கிடையிலான தூரம்}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Worked example calculating covalent radius of chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical calculation determining the covalent radius of Cl from the bond distance of Cl2, along with unit conversion for picometres.

Accuracy: **accurate**. The internuclear distance of Cl2 (198 pm) and calculated radius (99 pm), as well as the picometre definition (10^-12 m), are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | குளோரின் மூலக்கூறு \(Cl_2\)-இல் இரண்டு குளோரின் அணுக்கள் இணைந்துள்ளன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | கருக்களுக்கிடையிலான தூரம் \(198\ \text{pm}\) என்றால், | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | \text{Cl-ன் கோவேலன்ட் ஆரம்} = \frac{198}{2} = 99\ \text{pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | இங்கே **pm (picometre)** என்பது மிகவும் சிறிய நீள அலகு. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | 1\ \text{pm} = 10^{-12}\ \text{m} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p16 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Significance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists reasons why knowing the covalent radius is important in chemistry.

Accuracy: **accurate**. The listed applications (estimating relative atomic size, understanding bond lengths, comparing element properties) are factually valid.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | கோவேலன்ட் ஆரம் மூலம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | - அணுவின் ஒப்பீட்டு அளவை அறியலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | - பிணைப்பின் நீளத்தைப் புரிந்துகொள்ளலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 | - தனிமங்களின் பண்புகளை ஒப்பிடலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Variation of covalent radius across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that covalent radius decreases across a period from left to right due to increased effective nuclear charge pulling electrons closer.

Accuracy: **accurate**. Accurately identifies the decreasing trend in covalent radius across a period and gives the correct physical reason (increase in effective nuclear charge).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### ஆவர்த்தன அட்டவணையில் மாற்றம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | **1. ஒரு வரிசையில் இடமிருந்து வலமாகச் செல்லும்போது:**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | கோவேலன்ட் ஆரம் பொதுவாக **குறையும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | காரணம்: கருவில் உள்ள நேர்ம மின்சுமை அதிகரிப்பதால், எலக்ட்ரான்கள் கருவை நோக்கி அதிகமாக இழுக்கப்படுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Period 2 trend illustration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the decreasing covalent radius trend across period 2 with the elements C > N > O > F.

Accuracy: **accurate**. The sequence C > N > O > F correctly demonstrates the decrease in covalent radius across period 2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | உதாரணம்:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | \text{C} &gt; \text{N} &gt; \text{O} &gt; \text{F} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | (அணு ஆரம் படிப்படியாகக் குறையும்.) | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Variation of covalent radius down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the increase in covalent radius down a group due to the addition of successive electron shells.

Accuracy: **accurate**. The explanation correctly identifies that covalent radius increases down a group due to the addition of electron shells.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | **2. ஒரு தொகுதியில் மேலிருந்து கீழே செல்லும்போது:**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p32 | கோவேலன்ட் ஆரம் பொதுவாக **அதிகரிக்கும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | காரணம்: ஒவ்வொரு கீழ் நிலைக்கும் புதிய எலக்ட்ரான் படலம் (shell) சேர்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Group 17 trend illustration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the increasing covalent radius down group 17 with the halogens F < Cl < Br < I.

Accuracy: **accurate**. The sequence F < Cl < Br < I accurately demonstrates the increasing covalent radius down the halogen group.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | உதாரணம்:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p35 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | \text{F} &lt; \text{Cl} &lt; \text{Br} &lt; \text{I} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Recap and key takeaways (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference reminder of periodic trends and a concluding summary of the core definition.

Accuracy: **accurate**. The recap accurately synthesizes the period trend, group trend, and the definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### நினைவில் வைத்துக்கொள்ள எளிய குறிப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | - **ஒரே வரிசையில் → வலப்புறம் சென்றால் ஆரம் குறையும்** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p40 | - **ஒரே தொகுதியில் → கீழே சென்றால் ஆரம் அதிகரிக்கும்** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p41 | சுருக்கமாக, **கோவேலன்ட் பிணைப்பில் இணைந்த இரண்டு ஒரே அணுக்களின் கருக்களுக்கிடையிலான தூரத்தின் பாதியே கோவேலன்ட் ஆரம்** ஆகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

