# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt requested an explanation of covalent radius (சகப்பிணைப்பு ஆரம்). However, the response completely confuses covalent radius with covalent bonding (treating 'சகப்பிணைப்பு ஆரம்' as synonymous with 'Covalent Bond'). It explains electron sharing, the octet rule, single/double/triple bonds, and covalent compound properties, without addressing covalent radius or atomic size at all.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 34,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Covalent Bond (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent bonding as the sharing of electron pairs between atoms, though erroneously labeling it covalent radius.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # சகப்பிணைப்பு ஆரம் (Covalent Bond) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## சகப்பிணைப்பு ஆரம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | இரண்டு அணுக்கள் தங்களுக்கிடையே **எலக்ட்ரான் ஜோடிகளைப் பகிர்ந்துகொள்வதன்** மூலம் ஏற்படும் வேதியியல் பிணைப்பே **சகப்பிணைப்பு ஆரம்** எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Reason for Covalent Bond Formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent bonds form using the octet rule and noble gas stability.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## ஏன் இந்த பிணைப்பு உருவாகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - ஒவ்வொரு அணுவும் தன்னுடைய வெளிக்கூட்டு எலக்ட்ரான் அமைப்பை **நிலைப்புத்தன்மையுடைய நோபிள் வாயு அமைப்புக்கு (ஆக்டெட் விதி - 8 எலக்ட்ரான்கள்)** மாற்ற விரும்புகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | - எலக்ட்ரான்களை முழுவதுமாக இழக்காமல் அல்லது பெறாமல், **பகிர்ந்துகொள்வதன் மூலம்** இந்த நிலைப்புத்தன்மையை அடைகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Hydrogen Molecule Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates a single covalent bond formation using the hydrogen molecule (H2).

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## எடுத்துக்காட்டுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | ### 1. ஹைட்ரஜன் மூலக்கூறு (H₂) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | - இரண்டு ஹைட்ரஜன் அணுக்களும் தலா ஒரு எலக்ட்ரானை பங்களித்து, ஒரு எலக்ட்ரான் ஜோடியை பகிர்ந்துகொள்கின்றன. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - இதனால் **ஒற்றைப் பிணைப்பு (Single Bond)** உருவாகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - H – H | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Water Molecule Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates electron sharing in a water molecule (H2O).

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 2. நீர் மூலக்கூறு (H₂O) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | - ஆக்ஸிஜன் அணு இரண்டு ஹைட்ரஜன் அணுக்களுடன் எலக்ட்ரான்களைப் பகிர்கிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | - ஆக்ஸிஜனுக்கு 8 எலக்ட்ரான்களும், ஒவ்வொரு ஹைட்ரஜனுக்கும் 2 எலக்ட்ரான்களும் கிடைக்கின்றன. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Oxygen Molecule Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates a double covalent bond using the oxygen molecule (O2).

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. ஆக்ஸிஜன் மூலக்கூறு (O₂) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - இரு எலக்ட்ரான் ஜோடிகள் பகிரப்படுவதால் **இரட்டைப் பிணைப்பு (Double Bond)** உருவாகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - O = O | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Nitrogen Molecule Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates a triple covalent bond using the nitrogen molecule (N2).

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### 4. நைட்ரஜன் மூலக்கூறு (N₂) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | - மூன்று எலக்ட்ரான் ஜோடிகள் பகிரப்படுவதால் **முப்பிணைப்பு (Triple Bond)** உருவாகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - N ≡ N | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Classification of Covalent Bonds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the types of covalent bonds by number of shared pairs in a table.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## சகப்பிணைப்பு ஆரத்தின் வகைகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | &#124; வகை &#124; பகிரப்படும் எலக்ட்ரான் ஜோடிகள் &#124; எடுத்துக்காட்டு &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124;------&#124;-------------------------------&#124;-----------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p24 | &#124; ஒற்றைப் பிணைப்பு &#124; 1 &#124; H₂, CH₄ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124; இரட்டைப் பிணைப்பு &#124; 2 &#124; O₂, CO₂ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p26 | &#124; முப்பிணைப்பு &#124; 3 &#124; N₂ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u8: Properties of Covalent Compounds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists general physical and chemical properties of covalent compounds.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## முக்கிய பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | ✅ இது பொதுவாக **உலோகமற்ற அணுக்களுக்கு** இடையே ஏற்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | ✅ சகப்பிணைப்பு சேர்மங்கள் பொதுவாக **குறைந்த உருகுநிலை மற்றும் கொதிநிலையை** கொண்டிருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | ✅ இவை **மின்சாரத்தை கடத்தாது** (பொதுவாக). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | ✅ **அயனிப் பிணைப்புடன்** ஒப்பிடும்போது இது வலிமை குறைவானதாக இருக்கலாம், ஆனால் பல மூலக்கூறு சேர்மங்களில் மிக முக்கிய பங்கு வகிக்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u9: Mnemonic for Covalent Sharing (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick phrase 'பங்கீடு = பலம்' (Sharing = Strength) as a memory aid for covalent bonds.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## எளிய நினைவூட்டல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | &gt; **&quot;பங்கீடு = பலம்&quot;** - எலக்ட்ரான்களைப் பங்கிட்டுக் கொள்வதன் மூலம் இரு அணுக்களும் நிலைத்தன்மை பெறுகின்றன, இதுவே சகப்பிணைப்பு ஆரத்தின் அடிப்படை. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u10: Lewis Structure Practice Strategy (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recommends drawing Lewis structures to practice and better understand the topic.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining covalent bonding instead of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | இதை இன்னும் தெளிவாக புரிந்துகொள்ள, Lewis Structure (லூயிஸ் அமைப்பு) வரைந்து பயிற்சி செய்வது உதவும்! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

