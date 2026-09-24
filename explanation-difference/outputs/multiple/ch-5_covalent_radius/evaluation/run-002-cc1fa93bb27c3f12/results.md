# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius for a high school student, covering its definition, analogy, a worked calculation with chlorine, significance, periodic trends, and key caveats.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "CAVEAT": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 8,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as an indicator of atomic size and specifically as half of the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition accurately reflects the standard chemical definition of homonuclear covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **சகப்பிணைப்பு ஆரம் (Covalent Radius)** என்பது ஒரு அணுவின் அளவைச் சுட்டிக்காட்டும் அளவாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஒரே தனிமத்தைச் சேர்ந்த இரண்டு அணுக்கள் சகப்பிணைப்பால் இணைந்திருக்கும்போது, அவற்றின் **கருக்களுக்கிடையேயான தூரத்தின் பாதி** அந்தத் தனிமத்தின் சகப்பிணைப்பு ஆரம் எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Touching spheres analogy and covalent radius formula (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "இரண்டு ஒரே அளவுள்ள பந்துகள் ஒன்றோடொன்று தொடுவதாகக் கற்பனை செய்யுங்கள்."}]}

Annotation rationale: Uses an analogy of two touching balls of equal size to explain how internuclear distance relates to covalent radius, concluding with the mathematical formula.

Accuracy: **accurate**. The analogy correctly represents the relation between center-to-center distance and radii, providing an accurate formula for homonuclear diatomic covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ### எளிய விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | இரண்டு ஒரே அளவுள்ள பந்துகள் ஒன்றோடொன்று தொடுவதாகக் கற்பனை செய்யுங்கள்.   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p5 | அவற்றின் மையங்களுக்கிடையிலான தூரம் இரு பந்துகளின் ஆரங்களின் கூட்டுத்தொகை.   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | அதேபோல், இரண்டு அணுக்கள் இணைந்தால்: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p8 | \text{சகப்பிணைப்பு ஆரம்} = \frac{\text{இரு கருக்களுக்கிடையிலான தூரம்}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Calculation of covalent radius in chlorine molecule (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked calculation of the covalent radius of chlorine using the Cl2 bond length (198 pm) and explains the picometer unit.

Accuracy: **accurate**. The bond length of Cl2 is 198 pm, resulting in a covalent radius of 99 pm, and 1 pm is correctly defined as 10^-12 m.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### உதாரணம்: குளோரின் மூலக்கூறு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | குளோரின் மூலக்கூறு \(Cl_2\)-இல் இரண்டு குளோரின் அணுக்கள் இணைந்துள்ளன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | கருக்களுக்கிடையிலான தூரம் \(198 \, pm\) எனில், | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p14 | \text{Cl-ன் சகப்பிணைப்பு ஆரம்} = \frac{198}{2} = 99 \, pm | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | இங்கு **pm (பிகோமீட்டர்)** என்பது மிகச் சிறிய நீள அலகு. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p18 | 1\, pm = 10^{-12}\, m | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Importance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the applications and chemical significance of understanding covalent radius.

Accuracy: **accurate**. The listed reasons accurately describe how covalent radii are used to compare atomic sizes, estimate bond lengths, and explain molecular geometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | சகப்பிணைப்பு ஆரம் மூலம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | - அணுக்களின் ஒப்பீட்டு அளவை அறியலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | - பிணைப்பு நீளத்தைப் புரிந்துகொள்ளலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - தனிமங்களின் பண்புகளை ஒப்பிடலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | - ஒரு மூலக்கூறின் அமைப்பை விளக்கலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the trends across a period (decrease due to increasing effective nuclear charge) and down a group (increase due to addition of electron shells).

Accuracy: **accurate**. The periodic table trends and their underlying physical mechanisms are described accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### அட்டவணையில் ஏற்படும் மாற்றம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | 1. **ஒரு காலத்தில் (இடமிருந்து வலமாகச் செல்லும்போது):**   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p28 |    பொதுவாக சகப்பிணைப்பு ஆரம் **குறையும்**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p29 |    காரணம்: கருவில் உள்ள நேர்ம மின்னூட்டம் அதிகரித்து, எலக்ட்ரான்களை அதிகமாக ஈர்க்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p30 | 2. **ஒரு தொகுதியில் (மேலிருந்து கீழாகச் செல்லும்போது):**   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p31 |    சகப்பிணைப்பு ஆரம் **அதிகரிக்கும்**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p32 |    காரணம்: புதிய எலக்ட்ரான் அடுக்குகள் சேருவதால் அணுவின் அளவு பெரிதாகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Applicability limitation of covalent radius (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the boundary of applicability: covalent radius specifically applies to atoms engaged in covalent bonding.

Accuracy: **accurate**. Accurately specifies that the measure is defined and applicable specifically in the context of covalent bonding.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ### நினைவில் கொள்ள வேண்டியது | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | - சகப்பிணைப்பு ஆரம் என்பது சகப்பிணைப்பில் உள்ள அணுக்களுக்குப் பயன்படுத்தப்படும் அளவு. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;] |

## u7: Misconception regarding fixed atomic boundaries (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that atoms do not possess a rigid, physical boundary and that covalent radius is an operational comparative quantity.

Accuracy: **accurate**. Correctly counters the misconception that atoms have sharp physical edges, clarifying the operational nature of atomic radii.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | - இது அணுவின் “உண்மையான எல்லை” அல்ல; அணுக்களின் அளவை ஒப்பிட உதவும் ஒரு நடைமுறை அளவாகும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |

## u8: Bond order variation qualification (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies that bond length and effective radius depend on bond order (single, double, or triple bond) and bond strength.

Accuracy: **accurate**. Accurately notes that bond multiplicity affects bond length and that stronger/higher-order bonds are shorter.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | - ஒற்றைப் பிணைப்பு, இரட்டைப் பிணைப்பு, மும்மைப் பிணைப்பு ஆகியவற்றில் பிணைப்பு நீளம் மாறலாம். பொதுவாக பிணைப்பின் வலிமை அதிகரிக்கும்போது பிணைப்பு நீளம் குறையும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

## u9: Summary recap of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes with a concise summary statement reiterating the central definition of covalent radius.

Accuracy: **accurate**. The recap accurately synthesizes the core definition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | **சுருக்கமாக:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | ஒரே தனிமத்தின் இரண்டு அணுக்கள் சகப்பிணைப்பில் இணைந்திருக்கும் போது, அவற்றின் கருக்களுக்கிடையிலான தூரத்தின் பாதியே அந்தத் தனிமத்தின் சகப்பிணைப்பு ஆரம். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

