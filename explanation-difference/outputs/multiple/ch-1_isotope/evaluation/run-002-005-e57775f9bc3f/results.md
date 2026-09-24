# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asked for an explanation of 'isotope' in Chemistry (in Tamil, ஓரிடத்தான்). The response completely misunderstood the term, interpreting 'ஓரிடத்தான்' as a fabricated Tamil grammatical or semantic concept referring to words that denote only one entity, with no reference to chemistry, atoms, or isotopes.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 13,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 13,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 6,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Oridathan as a word designating a single object (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines and explains the fabricated linguistic concept of Oridathan, supported by an introductory sentence and heading.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ஓரிடத்தான் என்றால் என்ன என்பதைப் பார்ப்போம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஓரிடத்தான் என்பது ஒரு இடத்தில் நிலைபெற்றிருப்பது அல்லது ஓரிடத்தில் பொருந்தி இருப்பது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | இதன் இலக்கணம் வருமாறு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | ஒரு சொல்லோ சொற்றொடரோ ஒரு பொருளைக் குறிக்கும். அச்சொல்லோ சொற்றொடரோ எந்நிலையிலும் வேறு பொருளைக் குறிக்காமல் அப்பொருளை மட்டும் குறித்தால் அது ஓரிடத்தான் எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Illustrative examples of banana and parental concern (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides illustrative examples to demonstrate the concept of words referring only to a specific meaning.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | எ.கா : வாழைப்பழம், பிள்ளைக் கவலை | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p6 | வாழைப்பழம் என்ற சொல் ஒரு குறிப்பிட்ட பழத்தை மட்டுமே குறிக்கும். வேறு எந்தப் பொருளைக் குறிக்காது. அதுபோலப் பிள்ளைக் கவலை என்பதும் பிள்ளைகள் மீது பெற்றோர்கள் கொண்ட அதீத அக்கறையைக் குறிக்கும். இவையே ஓரிடத்தான் ஆகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Grammatical requirement and testing method for Oridathan (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that Oridathan must be a noun and describes a substitution test to verify whether a word is an Oridathan.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ஓரிடத்தான் எப்போதும் பெயர்ச்சொல்லாக மட்டுமே இருக்கும். வேறு எந்தச் சொல்லாகவும் இருக்காது. ஒரு சொல் ஓரிடத்தானா என்பதைச் சோதிக்க அச்சொல்லை வேறு சொற்களுடன் சேர்த்துப் பார்க்க வேண்டும். அப்போது அச்சொல்லின் பொருள் மாறினால் அது ஓரிடத்தான் அல்ல. மாறவில்லையெனில் அது ஓரிடத்தான். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Counterexample using the adjective black (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates a negative example where the word changes referent according to context, showing it is not an Oridathan.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | எ.கா : கறுப்பு மேஜை, கருப்பு ஆடு | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | இவற்றில் கருப்பு என்பது வெவ்வேறு பொருள்களுடன் சேர்ந்து அப்பொருள்களின் நிறத்தை உணர்த்துகிறது. எனவே, இது ஓரிடத்தான் அல்ல. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Contrast statement reaffirming the rule of Oridathan (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the contrasting case where a word designates solely one object.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | இதுபோல் அல்லாமல் ஒரு சொல் ஒரே பொருளை மட்டும் குறித்து வந்தால் அது ஓரிடத்தான். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u6: Illustrative proper noun examples (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p11", "quote": "திருவள்ளுவர்"}]}

Annotation rationale: Presents proper nouns as illustrations of words that exclusively denote one specific individual.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | எ.கா : திருவள்ளுவர், கண்ணன் | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | திருவள்ளுவர் என்பது ஒருவரை மட்டுமே குறிக்கும். வேறு ஒருவரைக் குறிக்காது. அதுபோல கண்ணன் என்ற சொல்லும் ஒருவனை மட்டுமே குறிக்கும். எனவே, இவை ஓரிடத்தான் ஆகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Concluding recap of Oridathan (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the definition of Oridathan at the conclusion of the text.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic from chemistry isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | இவ்வாறு ஒரு சொல் ஒரு பொருளை மட்டும் குறித்து அப்பொருளிலேயே நிலைபெற்றிருப்பது ஓரிடத்தான் எனப்படும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

