# Stage 1: Tamil / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "A fabricated Tamil grammatical concept of words having a single, fixed referent",
  "topic_match": "off_topic",
  "reason": "The prompt asked to explain 'ஓரிடத்தான்' (the Tamil scientific term for isotope in Chemistry). Instead of explaining chemical isotopes (atoms with the same atomic number but different mass numbers), the text invents a Tamil grammatical concept where 'ஓரிடத்தான்' is defined as a noun or phrase that refers exclusively to one specific entity.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": true
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of the fabricated grammatical concept of oridathaan | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u2 | EXAMPLE | Illustrative examples of words claimed to be oridathaan | {"context": "abstract_or_hypothetical", "treatment": "worked"} | not_assessed_due_to_topic_mismatch |
| u3 | PROCEDURE | Method for testing whether a word is an oridathaan | {} | not_assessed_due_to_topic_mismatch |
| u4 | EXAMPLE | Negative example illustrating a non-oridathaan word | {"context": "abstract_or_hypothetical", "treatment": "worked"} | not_assessed_due_to_topic_mismatch |
| u5 | EXAMPLE | Worked examples using proper nouns | {"context": "abstract_or_hypothetical", "treatment": "worked"} | not_assessed_due_to_topic_mismatch |
| u6 | STUDY_SUPPORT | Concluding recap of the concept definition | {"subtype": "recap"} | not_assessed_due_to_topic_mismatch |

## u1: Definition of the fabricated grammatical concept of oridathaan

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
ஓரிடத்தான் என்பது ஒரு இடத்தில் நிலைபெற்றிருப்பது அல்லது ஓரிடத்தில் பொருந்தி இருப்பது.

இதன் இலக்கணம் வருமாறு:
ஒரு சொல்லோ சொற்றொடரோ ஒரு பொருளைக் குறிக்கும். அச்சொல்லோ சொற்றொடரோ எந்நிலையிலும் வேறு பொருளைக் குறிக்காமல் அப்பொருளை மட்டும் குறித்தால் அது ஓரிடத்தான் எனப்படும்.
```


## u2: Illustrative examples of words claimed to be oridathaan

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "வாழைப்பழம்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
எ.கா : வாழைப்பழம், பிள்ளைக் கவலை

வாழைப்பழம் என்ற சொல் ஒரு குறிப்பிட்ட பழத்தை மட்டுமே குறிக்கும். வேறு எந்தப் பொருளைக் குறிக்காது. அதுபோலப் பிள்ளைக் கவலை என்பதும் பிள்ளைகள் மீது பெற்றோர்கள் கொண்ட அதீத அக்கறையைக் குறிக்கும். இவையே ஓரிடத்தான் ஆகும்.
```


## u3: Method for testing whether a word is an oridathaan

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
ஓரிடத்தான் எப்போதும் பெயர்ச்சொல்லாக மட்டுமே இருக்கும். வேறு எந்தச் சொல்லாகவும் இருக்காது. ஒரு சொல் ஓரிடத்தானா என்பதைச் சோதிக்க அச்சொல்லை வேறு சொற்களுடன் சேர்த்துப் பார்க்க வேண்டும். அப்போது அச்சொல்லின் பொருள் மாறினால் அது ஓரிடத்தான் அல்ல. மாறவில்லையெனில் அது ஓரிடத்தான்.
```


## u4: Negative example illustrating a non-oridathaan word

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "கறுப்பு மேஜை, கருப்பு ஆடு"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
எ.கா : கறுப்பு மேஜை, கருப்பு ஆடு

இவற்றில் கருப்பு என்பது வெவ்வேறு பொருள்களுடன் சேர்ந்து அப்பொருள்களின் நிறத்தை உணர்த்துகிறது. எனவே, இது ஓரிடத்தான் அல்ல.
```


## u5: Worked examples using proper nouns

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "திருவள்ளுவர்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
இதுபோல் அல்லாமல் ஒரு சொல் ஒரே பொருளை மட்டும் குறித்து வந்தால் அது ஓரிடத்தான்.

எ.கா : திருவள்ளுவர், கண்ணன்

திருவள்ளுவர் என்பது ஒருவரை மட்டுமே குறிக்கும். வேறு ஒருவரைக் குறிக்காது. அதுபோல கண்ணன் என்ற சொல்லும் ஒருவனை மட்டுமே குறிக்கும். எனவே, இவை ஓரிடத்தான் ஆகும்.
```


## u6: Concluding recap of the concept definition

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is completely off-topic.",
    "errors": []
  }
}
```

```text
இவ்வாறு ஒரு சொல் ஒரு பொருளை மட்டும் குறித்து அப்பொருளிலேயே நிலைபெற்றிருப்பது ஓரிடத்தான் எனப்படும்.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "u3 begins with a property/rule ('ஓரிடத்தான் எப்போதும் பெயர்ச்சொல்லாக மட்டுமே இருக்கும்...') before giving a testing procedure ('ஒரு சொல் ஓரிடத்தானா என்பதைச் சோதிக்க...'). It could be classified as CONCEPT or PROCEDURE.",
    "proposed_resolution": "Classified as PROCEDURE because its operational focus is providing a test to verify whether a word qualifies as 'oridathaan'."
  }
]
```

## Unassigned text for coverage review

```text
ஓரிடத்தான் என்றால் என்ன என்பதைப் பார்ப்போம்.


```
