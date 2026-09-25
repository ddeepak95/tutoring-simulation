# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains covalent radius in Tamil, covering its definition, calculation examples (Cl2 and H2), and key properties.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2
  },
  "nested_passages": 15,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the need for radius conventions due to the small size of atoms and defines covalent radius as half the distance between the nuclei of two atoms joined by a single covalent bond.

Accuracy: **accurate**. The definition correctly specifies half the internuclear distance between two covalently single-bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | கோவலன்ட் ஆரம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | மாணவர்களே, அணுக்கள் மிகவும் சிறியவை. எனவே அவற்றின் அளவை நேரடியாக அளக்க முடியாது. அதனால் விஞ்ஞானிகள் பல்வேறு வகையான “ஆரம்” (radius) வரையறைகளை உருவாக்கியுள்ளனர். அவற்றில் ஒன்றுதான் **கோவலன்ட் ஆரம்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### எளிய வரையறை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | இரண்டு அணுக்கள் **ஒற்றை கோவலன்ட் பிணைப்பு** (single covalent bond) மூலம் இணைந்திருக்கும்போது, அந்த இரண்டு அணுக்களின் அணுக்கருக்களுக்கு (nuclei) இடையே உள்ள தூரத்தின் **பாதியை** கோவலன்ட் ஆரம் என்று அழைக்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Covalent radius calculation for chlorine (Cl2) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked numerical example determining the covalent radius of chlorine from the Cl-Cl bond distance of 198 pm.

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and the resulting covalent radius of 99 pm are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### எடுத்துக்காட்டு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | - குளோரின் மூலக்கூறில் (Cl₂) இரண்டு குளோரின் அணுக்கள் ஒற்றைப் பிணைப்பால் இணைந்திருக்கின்றன. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | - Cl–Cl பிணைப்பின் மொத்த நீளம் 198 pm (பிகோமீட்டர்). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | - எனவே ஒரு குளோரின் அணுவின் கோவலன்ட் ஆரம் = 198 ÷ 2 = **99 pm**. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Covalent radius calculation for hydrogen (H2) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a second worked example calculating hydrogen's covalent radius as 37 pm from an H-H bond distance of 74 pm.

Accuracy: **accurate**. The H-H bond distance of 74 pm and the resulting covalent radius of 37 pm are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | இதே போல ஹைட்ரஜன் மூலக்கூறில் (H₂) H–H பிணைப்பு நீளம் 74 pm என்பதால் ஹைட்ரஜனின் கோவலன்ட் ஆரம் 37 pm ஆகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Characteristics, conditions, and significance of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains important properties and qualifications: that it is measured for single bonds, decreases with higher bond multiplicity, represents an operational measurement of size, and is used to study periodic trends.

Accuracy: **accurate**. All listed points regarding bond multiplicity, operational nature, and periodic trends are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### முக்கியக் குறிப்புகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | - கோவலன்ட் ஆரம் எப்போதும் **ஒற்றைப் பிணைப்பு** (single bond) உள்ள நிலையில் அளக்கப்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | - பிணைப்பு எண்ணிக்கை அதிகரிக்கும்போது (இரட்டை அல்லது மூன்று பிணைப்பு) கோவலன்ட் ஆரம் சற்று குறையும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | - இது அணுவின் உண்மையான அளவை அளவிடும் ஒரு வசதியான முறை மட்டுமே. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | இந்தக் கோவலன்ட் ஆரம் மதிப்புகளைப் பயன்படுத்தித்தான் நாம் தனிம அட்டவணையில் (periodic table) அணு ஆரம் எப்படி மாறுகிறது என்பதைப் படிக்கிறோம்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | இன்னும் ஏதேனும் சந்தேகம் இருந்தால் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

