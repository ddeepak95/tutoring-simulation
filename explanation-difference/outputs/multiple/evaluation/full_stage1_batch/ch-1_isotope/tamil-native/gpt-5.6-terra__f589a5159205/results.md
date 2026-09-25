# Stage 1: Tamil / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Endemic species (Biology)",
  "topic_match": "off_topic",
  "reason": "The prompt asked to explain 'ஓரிடத்தான்', which in Chemistry refers to isotopes (atoms with the same atomic number but different mass numbers). The response mistranslated or misinterpreted the term as biological 'Endemic species' and explained endemic flora and fauna instead.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": true
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of endemic species | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u2 | EXAMPLE | Nilgiri tahr as an endemic species | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u3 | EXAMPLE | Lion-tailed macaque as an endemic species | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u4 | EXAMPLE | Neelakurinji flower as an endemic species | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u5 | CONCEPT | Ecological vulnerability and importance of endemic species | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u6 | STUDY_SUPPORT | Core takeaway definition of endemic species | {"subtype": "recap"} | not_assessed_due_to_topic_mismatch |
| u7 | CAVEAT | Distinction between endemic species and rare species | {"subtype": "misconception"} | not_assessed_due_to_topic_mismatch |

## u1: Definition of endemic species

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
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
**ஓரிடத்தான்** என்பது ஆங்கிலத்தில் **Endemic species** என்று அழைக்கப்படுகிறது.

ஒரு குறிப்பிட்ட **பகுதியில் மட்டுமே இயற்கையாக வாழும்** தாவரம் அல்லது விலங்கு ஓரிடத்தான் எனப்படும். அது உலகின் வேறு இடங்களில் இயற்கையாகக் காணப்படாது.
```


## u2: Nilgiri tahr as an endemic species

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "இந்தியாவின் மேற்குத் தொடர்ச்சி மலையில்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
- **நீலகிரி வரையாடு** – இந்தியாவின் மேற்குத் தொடர்ச்சி மலையில் மட்டுமே இயற்கையாக வாழ்கிறது.
```


## u3: Lion-tailed macaque as an endemic species

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "மேற்குத் தொடர்ச்சி மலைக் காடுகளில்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
- **சிங்கவால் குரங்கு** – மேற்குத் தொடர்ச்சி மலைக் காடுகளில் மட்டுமே காணப்படுகிறது.
```


## u4: Neelakurinji flower as an endemic species

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "மேற்குத் தொடர்ச்சி மலைப் பகுதிகளுடன்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
- **நீலகுறிஞ்சி மலர்** – மேற்குத் தொடர்ச்சி மலைப் பகுதிகளுடன் தொடர்புடைய ஒரு சிறப்பான தாவரம்.
```


## u5: Ecological vulnerability and importance of endemic species

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
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
### ஏன் இவை முக்கியம்?
ஓரிடத்தான் உயிரினங்கள் ஒரு சிறிய பகுதிக்கே கட்டுப்பட்டிருப்பதால், அந்தப் பகுதியின் காடுகள் அழிந்தால் அல்லது காலநிலை மாறினால் அவை எளிதில் அழிவின் விளிம்புக்குச் செல்லலாம். எனவே அவற்றின் வாழிடங்களைப் பாதுகாப்பது மிகவும் அவசியம்.
```


## u6: Core takeaway definition of endemic species

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
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
### நினைவில் கொள்ளுங்கள்
> **“ஒரே இடத்தில் மட்டுமே இயற்கையாக வாழும் உயிரினம் = ஓரிடத்தான்.”**
```


## u7: Distinction between endemic species and rare species

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit was not assessed because the overall response is off-topic.",
    "errors": []
  }
}
```

```text
இது **அரிய உயிரினம்** என்பதற்குச் சமமான சொல் அல்ல. ஒரு உயிரினம் அரியதாக இருக்கலாம்; ஆனால் பல இடங்களில் வாழலாம். ஓரிடத்தான் உயிரினம் மட்டும் ஒரு குறிப்பிட்ட இடத்திலேயே வாழும்.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3",
      "u4"
    ],
    "issue": "The three bullet points list independent examples of endemic organisms under the same heading ('எளிய உதாரணம்'). They could alternatively be grouped as a single composite list example unit.",
    "proposed_resolution": "Separated into three individual EXAMPLE units following the guideline that a list of independent applications or cases constitutes distinct units unless they jointly demonstrate a specific comparison or relationship."
  }
]
```

## Unassigned text for coverage review

```text


### எளிய உதாரணம்

```
