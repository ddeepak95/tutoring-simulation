# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius, including its definition, analogy, calculation examples (Cl2 and H2), purpose, and trends in the periodic table.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 27,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 27,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Formal definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half of the internuclear distance between two covalently bonded atoms, prefaced by an introductory greeting and section heading.

Accuracy: **accurate**. The definition correctly states that the covalent radius is half the internuclear distance between two covalently bonded nuclei.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | மாணவரே, வணக்கம்! நான் உங்களுக்கு சகப்பிணைப்பு ஆரத்தை மிக எளிமையாகவும் தெளிவாகவும் விளக்குகிறேன். உயர்நிலைப் பள்ளி மட்டத்தில் புரிந்துகொள்ளும் வகையில் சொல்கிறேன். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### சகப்பிணைப்பு ஆரம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | இரண்டு அணுக்கள் **சகப்பிணைப்பு** (covalent bond) மூலம் ஒன்றாக இணைந்திருக்கும்போது, அந்த இரண்டு அணுக்களின் **அணுக்கருக்களுக்கு** இடையே உள்ள தூரத்தின் பாதியைத்தான் **சகப்பிணைப்பு ஆரம்** என்று அழைக்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Hand-holding analogy for covalent bond and radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "கையைப் பிடித்துக்கொண்டு நிற்பதுபோல்"}]}

Annotation rationale: Uses the intuitive everyday analogy of two entities holding hands to explain the shared distance between bonded atomic centers.

Accuracy: **accurate**. The analogy accurately conveys the concept of dividing the total distance between two bonded centers in half.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | எளிய வார்த்தைகளில் சொன்னால்:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | இரண்டு அணுக்கள் கையைப் பிடித்துக்கொண்டு நிற்பதுபோல் இணைந்திருக்கின்றன. அந்த இரண்டு அணுக்களின் மையப் பகுதிகளுக்கு (அணுக்கரு) இடையே உள்ள மொத்த தூரத்தை அரைத்தால் கிடைப்பதுதான் ஒரு அணுவின் சகப்பிணைப்பு ஆரம். | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation for Cl2 by taking the experimental bond length of 198 pm and dividing by 2 to determine the covalent radius of chlorine.

Accuracy: **accurate**. The bond length of 198 pm and resulting covalent radius of 99 pm for Cl are standard accepted chemical values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### உதாரணத்துடன் பார்ப்போம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | குளோரின் (Cl₂) மூலக்கூறை எடுத்துக்கொள்வோம்.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - இரண்டு குளோரின் அணுக்கள் சகப்பிணைப்பு மூலம் இணைந்திருக்கின்றன.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - இந்த இரண்டு அணுக்களின் அணுக்கருக்களுக்கு இடையே உள்ள மொத்த தூரம் (பிணைப்பு நீளம்) சுமார் **198 பிகோமீட்டர்** (pm).   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | இப்போது ஒவ்வொரு குளோரின் அணுவின் சகப்பிணைப்பு ஆரம் = 198 ÷ 2 = **99 pm**. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u4: Hydrogen molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the covalent radius of hydrogen (37 pm) from the bond length of H2 (74 pm).

Accuracy: **accurate**. The bond length of 74 pm and the resulting covalent radius of 37 pm for H are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | இதேபோல் ஹைட்ரஜன் (H₂) மூலக்கூறில் பிணைப்பு நீளம் 74 pm எனில், ஹைட்ரஜன் அணுவின் சகப்பிணைப்பு ஆரம் 37 pm ஆகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Significance and application of measuring covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radii are measured and notes their primary application to non-metallic elements.

Accuracy: **accurate**. Accurately explains that because atoms cannot be observed directly in isolation, covalent radii allow comparative sizing, particularly for non-metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### ஏன் இதை அளக்கிறோம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | அணுக்கள் நேரடியாகப் பார்க்க முடியாதவை. எனவே அணுக்களின் அளவை ஒப்பிடுவதற்கு இந்த ஆரத்தைப் பயன்படுத்துகிறோம். இது முக்கியமாக உலோகமற்ற தனிமங்களுக்கு (non-metals) அதிகம் பயன்படுத்தப்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how and why covalent radius changes across a period (decreases due to increased nuclear charge) and down a group (increases due to addition of electron shells).

Accuracy: **accurate**. Both trends (period decrease and group increase) and their underlying mechanisms (effective nuclear charge vs shell addition) are correctly described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### ஆவர்த்தன அட்டவணையில் சகப்பிணைப்பு ஆரத்தின் போக்கு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | 1. **ஒரு காலத்தில் (Period) இடமிருந்து வலதுபுறம் செல்லச் செல்ல**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 |    ஆரம் **குறைகிறது**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 |    காரணம்: அணுக்கருவின் மின்னூட்டம் (proton எண்ணிக்கை) அதிகரிக்கிறது. இது வெளிப்புற எலக்ட்ரான்களை இன்னும் இறுக்கமாக இழுத்து அணுவை சிறியதாக்குகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | 2. **ஒரு குழுவில் (Group) மேலிருந்து கீழே செல்லச் செல்ல**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 |    ஆரம் **அதிகரிக்கிறது**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 |    காரணம்: புதிய எலக்ட்ரான் ஷெல் (shell) சேர்கிறது. இந்த புதிய ஷெல் அணுவைப் பெரிதாக்குகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Summary recap and concluding check for understanding (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the lesson in bullet points, followed by closing social remarks from the tutor.

Accuracy: **accurate**. The summary points accurately reflect the established scientific definitions and periodic trends.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### சுருக்கமாக நினைவில் கொள்ள வேண்டியவை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | - சகப்பிணைப்பு ஆரம் = பிணைப்பு நீளத்தின் பாதி | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p23 | - அணுவின் அளவை ஒப்பிடுவதற்கு உதவும் | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p24 | - காலத்தில்: இடமிருந்து வலம் → ஆரம் குறைவு | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p25 | - குழுவில்: மேலிருந்து கீழ் → ஆரம் அதிகரிப்பு | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p26 | இப்போது புரிந்ததா மாணவரே?   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p27 | ஏதாவது இடம் தெளிவாக இல்லையா அல்லது உதாரணம் வேண்டுமா? சொல்லுங்கள், இன்னும் எளிதாக விளக்குகிறேன்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

