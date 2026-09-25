# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asked to explain 'ஓரிடத்தான்' (the Tamil scientific term for chemical isotopes). The response completely misinterprets the term as an alleged concept in Tamil grammar and phonetics (letters produced at the same place of articulation), discussing phonetic articulation, Tolkappiyam, and sandhi rules instead of atomic chemistry.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 28,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 28,
  "unique_subtopics": 5,
  "contextualization": {
    "localized": 6
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Phonetic definition of Oridathan (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p3", "quote": "\"ஓரிடத்தான்\" என்பது தமிழ் **எழுத்தியல்** (Phonetics) பாடத்தில் வரும் ஒரு முக்கியமான கருத்தாகும். இது **தொல்காப்பியத்தில்** விளக்கப்பட்டுள்ளது."}]}

Annotation rationale: Explains the etymology and phonetic concept of letters sharing the same place of articulation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # ஓரிடத்தான் - தமிழ் எழுத்தியல் கருத்து | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## அறிமுகம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | &quot;ஓரிடத்தான்&quot; என்பது தமிழ் **எழுத்தியல்** (Phonetics) பாடத்தில் வரும் ஒரு முக்கியமான கருத்தாகும். இது **தொல்காப்பியத்தில்** விளக்கப்பட்டுள்ளது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## பொருள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | **ஓர் + இடத்தான்** = ஒரே இடத்தில் பிறக்கும் எழுத்துகள் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | நாம் பேசும்போது ஒவ்வொரு எழுத்தும் வாயில் ஒரு குறிப்பிட்ட இடத்தில் (நாக்கு, பல், அண்ணம் போன்றவற்றின் உதவியுடன்) உருவாகிறது. இந்த இடத்தை **பிறப்பிடம்** என்று அழைப்போம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | **ஒரே பிறப்பிடத்தில் பிறக்கும் எழுத்துகளை &quot;ஓரிடத்தான்&quot; என்று கூறுவோம்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Six places of articulation in Tamil (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p8", "quote": "## தமிழில் உள்ள 6 பிறப்பிடங்கள்"}]}

Annotation rationale: Presents a reference table categorizing Tamil consonants by six points of articulation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## தமிழில் உள்ள 6 பிறப்பிடங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | &#124; வ.எண் &#124; பிறப்பிடம் &#124; எழுத்துகள் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124;-------&#124;-----------&#124;-------------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; 1 &#124; **மிடறு** (தொண்டை) - கண்டத்தான் &#124; க், ங் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &#124; 2 &#124; **அண்ணம்** (மேல்வாய்) - அண்ணத்தான் &#124; ச், ஞ், ய் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p13 | &#124; 3 &#124; **முடி/மூர்த்தா** (நாக்கு மேலே சுருண்டு) - மூர்த்தன் &#124; ட், ண், ர், ழ் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p14 | &#124; 4 &#124; **பல்** - தந்தத்தான் &#124; த், ந், ல் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p15 | &#124; 5 &#124; **இதழ்** (உதடு) - ஓஷ்டத்தான் &#124; ப், ம் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p16 | &#124; 6 &#124; **பல்/இதழ் இணைந்து** - தந்தோஷ்டத்தான் &#124; வ் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u3: Example of throat consonants (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p18", "quote": "**க், ங்** என்ற இரண்டு எழுத்துகளையும் உச்சரித்துப் பாருங்கள்."}]}

Annotation rationale: Illustrates consonants articulated at the throat (k, ng).

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## எளிய உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | **க், ங்** என்ற இரண்டு எழுத்துகளையும் உச்சரித்துப் பாருங்கள். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | - இரண்டும் **தொண்டையின்** (மிடறு) பகுதியில் இருந்து பிறக்கின்றன. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - எனவே **க், ங்** ஆகிய இரண்டும் **ஓரிடத்தான்** எழுத்துகள் ஆகும். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Example of labial consonants (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p21", "quote": "அதேபோல, **ப், ம்** ஆகிய எழுத்துகள் **இதழ்** (உதடு) பகுதியில் பிறப்பதால், அவையும் ஓரிடத்தான் எழுத்துகளாகும்."}]}

Annotation rationale: Illustrates consonants articulated at the lips (p, m).

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | அதேபோல, **ப், ம்** ஆகிய எழுத்துகள் **இதழ்** (உதடு) பகுதியில் பிறப்பதால், அவையும் ஓரிடத்தான் எழுத்துகளாகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Importance of articulation points in grammar (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p23", "quote": "1. இது **மெய்ம்மயக்கம்** (இரண்டு மெய்யெழுத்துகள் இணைவது) சரியாக அமைய உதவுகிறது."}]}

Annotation rationale: Explains why understanding places of articulation is important for Tamil grammar rules like mey-mayakkam and punarchi.

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | 1. இது **மெய்ம்மயக்கம்** (இரண்டு மெய்யெழுத்துகள் இணைவது) சரியாக அமைய உதவுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p24 | 2. **புணர்ச்சி விதிகளை** (சொற்கள் இணையும் விதிமுறைகள்) புரிந்துகொள்ள உதவும்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 |    - உதாரணம்: &quot;தமிழ்&quot; + &quot;நாடு&quot; = &quot;தமிழ்நாடு&quot; போன்ற சொற்களில் மெய்யெழுத்து மாற்றம் எப்படி நடக்கிறது என்பதைப் புரிந்துகொள்ள இது உதவும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | 3. தமிழ் மொழியின் **அறிவியல் அடிப்படையிலான அமைப்பை** புரிந்துகொள்ள உதவுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Summary recap (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p28", "quote": "**சுருக்கமாக:** ஓரிடத்தான் என்பது வாயின் ஒரே பகுதியில் பிறக்கும் எழுத்துகளின் தொகுப்பு. இது தமிழ் மொழியின் ஒலியியல் அமைப்பை ஆழமாகப் புரிந்துகொள்ள உதவும் ஒரு அடிப்படைக் கருத்தாகும். 📚"}]}

Annotation rationale: Summarizes the discussion on articulation points in Tamil phonetics.

Accuracy: **not_assessed_due_to_topic_mismatch**. The entire response is off-topic relative to the requested subject of chemical isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | **சுருக்கமாக:** ஓரிடத்தான் என்பது வாயின் ஒரே பகுதியில் பிறக்கும் எழுத்துகளின் தொகுப்பு. இது தமிழ் மொழியின் ஒலியியல் அமைப்பை ஆழமாகப் புரிந்துகொள்ள உதவும் ஒரு அடிப்படைக் கருத்தாகும். 📚 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

