# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains the concept of covalent radius in Tamil, covering its definition, formula, a worked example with chlorine, limitations, periodic trend, and importance.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 27,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 27,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Handshake analogy for atomic separation distance (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "இரண்டு நபர்கள் கை குலுக்கும்போது, அவர்களுடைய உடல்கள் ஒரு குறிப்பிட்ட தூரத்தில் நிற்கிறார்கள் அல்லவா?"}]}

Annotation rationale: Uses the daily-life action of two people shaking hands staying at a fixed distance to introduce how bonded atoms stay at a fixed distance.

Accuracy: **accurate**. The introductory analogy clearly and correctly relates interpersonal distance during a handshake to internuclear distance between bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # கூட்டிணைவு ஆரம் (Covalent Radius) - விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## முதலில் புரிந்துகொள்வோம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | மாணவரே, இதை ஒரு எளிய உதாரணத்துடன் தொடங்குவோம். இரண்டு நபர்கள் கை குலுக்கும்போது, அவர்களுடைய உடல்கள் ஒரு குறிப்பிட்ட தூரத்தில் நிற்கிறார்கள் அல்லவா? அதே போலத்தான் இரண்டு அணுக்கள் இணையும்போதும் ஒரு குறிப்பிட்ட தூரத்தில் நிற்கும். | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition and mathematical formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the distance between the nuclei of two identical atoms joined by a single covalent bond, accompanied by its formula.

Accuracy: **accurate**. The definition and formula correctly reflect standard high school chemistry definitions of homonuclear covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## கூட்டிணைவு ஆரம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | **வரையறை:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | இரண்டு ஒரே மாதிரியான அணுக்கள் (identical atoms) ஒரு **ஒற்றைப் பிணைப்பு (single covalent bond)** மூலம் இணைந்திருக்கும்போது, அவ்விரு அணுக்களின் **மையங்களுக்கு (nuclei) இடையேயான தூரத்தில் பாதி** தான் **கூட்டிணைவு ஆரம்** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | ## சூத்திரம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | $$\text{கூட்டிணைவு ஆரம்} = \frac{\text{இரு அணு மையங்களுக்கு இடையேயான தூரம்}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u3: Calculation of covalent radius for the chlorine molecule (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked step-by-step calculation of the covalent radius of chlorine using the Cl2 internuclear distance of 198 pm.

Accuracy: **accurate**. The experimental internuclear distance in Cl2 (198 pm) and the resulting covalent radius (99 pm) are factually correct and accurately calculated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## உதாரணத்துடன் விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | **குளோரின் மூலக்கூறை (Cl₂) எடுத்துக்கொள்வோம்:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | Cl -------- Cl | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p13 |     d (தூரம்) | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p14 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | - Cl₂ மூலக்கூறில் இரண்டு குளோரின் அணுக்களுக்கு இடையேயான தூரம் = 198 pm (picometre) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - எனவே, குளோரின் அணுவின் கூட்டிணைவு ஆரம் = 198/2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Applicability limitations of the covalent radius definition (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies the boundaries of applicability for the basic formula: it applies specifically to homonuclear combinations and single covalent bonds.

Accuracy: **accurate**. Correctly states the conditions under which r = d/2 applies, namely for homonuclear single bonds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## முக்கிய குறிப்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | 1. **ஒரே தனிமத்தின் இரு அணுக்கள்** இணையும்போது மட்டுமே இது பொருந்தும் | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;] |
| p19 | 2. இது **ஒற்றைப் பிணைப்புக்கு (single bond)** மட்டுமே பொருந்தும் | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;] |

## u5: Periodic trend of covalent radius down a group (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic variation of covalent radius down a group as atomic number increases.

Accuracy: **accurate**. Correctly states that covalent radius generally increases down a group with increasing atomic number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | 3. அணு எண் (atomic number) அதிகரிக்கும்போது, பொதுவாக கூட்டிணைவு ஆரமும் அதிகரிக்கும் (ஒரே தொகுதியில்) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Significance and applications of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the primary reasons why knowing covalent radius is important in chemistry.

Accuracy: **accurate**. The listed applications (comparing atomic size, determining molecular geometry, and explaining periodic trends) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | - அணுக்களின் **அளவை** ஒப்பிட உதவுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | - **மூலக்கூறு அமைப்பை** புரிந்துகொள்ள உதவுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - **கால அட்டவணையில் (Periodic Table)** போக்குகளை (trends) விளக்க பயன்படுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Summary recap and student check-in (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise concluding summary of the core definition along with a social closing.

Accuracy: **accurate**. The recap accurately synthesizes the main concept of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | **சுருக்கமாக:** ஒரே தனிமத்தின் இரு அணுக்கள் ஒற்றைப் பிணைப்பால் இணையும்போது, அவற்றின் மைய புள்ளிகளுக்கு இடையேயான தூரத்தில் **பாதி அளவு** தான் கூட்டிணைவு ஆரம். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p27 | ஏதாவது சந்தேகம் இருந்தால் கேளுங்கள்! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

