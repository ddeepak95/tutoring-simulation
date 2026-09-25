# Stage 1: Tamil / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Endemic species in biology and ecology",
  "topic_match": "off_topic",
  "reason": "The prompt asked to explain 'ஓரிடத்தான்' in the context of high school Chemistry (isotope). However, the response completely misunderstands the term and explains biological endemism ('endemic species' living in a single geographic habitat such as the Western Ghats), confusing the chemical concept of an isotope with biological endemism.",
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
| u1 | CONCEPT | Definition of an endemic species | {"depth": "statement"} | not_assessed_due_to_topic_mismatch |
| u2 | ANALOGY | Analogy of a lifelong village resident illustrating endemism | {} | not_assessed_due_to_topic_mismatch |
| u3 | EXAMPLE | Nilgiri Tahr as an example of an endemic animal | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u4 | EXAMPLE | Lion-tailed Macaque as an example of an endemic animal | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u5 | EXAMPLE | Nilgiri pipit and rare flora as examples of endemic organisms | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u6 | CONCEPT | Ecological vulnerability and conservation necessity of endemic species | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u7 | STUDY_SUPPORT | Summary recap of key points about endemic organisms | {"subtype": "recap"} | not_assessed_due_to_topic_mismatch |

## u1: Definition of an endemic species

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
**ஓரிடத்தான்** என்றால், **ஒரு குறிப்பிட்ட இடத்தில் மட்டும்** வாழும் உயிரினம். அதாவது, அந்த உயிரினம் உலகின் வேறு எந்த இடத்திலும் இயற்கையாகக் கிடைக்காது. அது ஒரே ஒரு பகுதிக்கு மட்டும் உரியது.
```


## u2: Analogy of a lifelong village resident illustrating endemism

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "நீ ஒரு கிராமத்தில் பிறந்து, வாழ்நாள் முழுவதும் அந்தக் கிராமத்தைவிட்டு வெளியே போகாமல் இருந்தால்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
- நீ ஒரு கிராமத்தில் பிறந்து, வாழ்நாள் முழுவதும் அந்தக் கிராமத்தைவிட்டு வெளியே போகாமல் இருந்தால், நீ அந்தக் கிராமத்துக்கு **ஓரிடத்தான்** மனிதன் என்று சொல்லலாம்.
- அதேபோல், ஒரு தாவரம் அல்லது விலங்கு **ஒரே ஒரு மலைப்பகுதி அல்லது தீவில் மட்டும்** வாழ்ந்தால், அதை **ஓரிடத்தான் உயிரினம்** என்று அழைக்கிறோம்.
```


## u3: Nilgiri Tahr as an example of an endemic animal

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
        "quote": "தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைகளில் (குறிப்பாக நீலகிரி, அனைமலை) மட்டுமே வாழும் விலங்கு."
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
1. **நீலகிரி வரையாடு** (Nilgiri Tahr)  
   தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைகளில் (குறிப்பாக நீலகிரி, அனைமலை) மட்டுமே வாழும் விலங்கு. உலகில் வேறு எங்கும் இயற்கையாகக் கிடைக்காது. இது நமது **ஓரிடத்தான்** விலங்கு.
```


## u4: Lion-tailed Macaque as an example of an endemic animal

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
        "quote": "மேற்குத் தொடர்ச்சி மலைகளில் மட்டும் வாழும் குரங்கு."
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
2. **சிங்கவால் குரங்கு** (Lion-tailed Macaque)  
   மேற்குத் தொடர்ச்சி மலைகளில் மட்டும் வாழும் குரங்கு. இதையும் வேறு எங்கும் பார்க்க முடியாது.
```


## u5: Nilgiri pipit and rare flora as examples of endemic organisms

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
        "quote": "நீலகிரி புள்"
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
3. **நீலகிரி புள்** போன்ற சில பறவைகள் மற்றும் பல அரிய தாவரங்கள்.
```


## u6: Ecological vulnerability and conservation necessity of endemic species

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
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
- இந்த உயிரினங்கள் **மிகவும் பாதிக்கப்படக்கூடியவை**. ஏனென்றால் அவை ஒரே இடத்தில் மட்டும் இருப்பதால், அந்த இடத்தில் ஏதேனும் மாற்றம் (காடழிப்பு, காலநிலை மாற்றம்) ஏற்பட்டால், அந்த உயிரினம் முழுவதுமாக அழிந்துவிடும் வாய்ப்பு அதிகம்.
- இதனால்தான் அரசு இந்த இடங்களை **வனவிலங்கு சரணாலயம்** அல்லது **பாதுகாக்கப்பட்ட பகுதி** என்று அறிவிக்கிறது.
```


## u7: Summary recap of key points about endemic organisms

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
    "reason": "The response is off-topic; factual accuracy is not assessed per protocol.",
    "errors": []
  }
}
```

```text
- **ஓரிடத்தான்** = ஒரே ஒரு இடத்துக்கு மட்டும் உரியது  
- இவை உலகின் **சொந்தச் சொத்து** போன்றவை  
- இவற்றைப் பாதுகாப்பது நம் பொறுப்பு
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2"
    ],
    "issue": "Whether the village resident analogy in u2 should be kept within the introductory definition unit u1 as illustrative support or separated as an independent ANALOGY unit.",
    "proposed_resolution": "Separated as an ANALOGY unit because it explicitly constructs a cross-domain comparison mapping a lifelong village resident to endemic wildlife on an isolated mountain or island."
  },
  {
    "unit_ids": [
      "u3",
      "u4",
      "u5"
    ],
    "issue": "Whether the three real-world examples under 'உண்மையான உதாரணங்கள்' should be grouped into a single multi-item EXAMPLE unit or separated into individual EXAMPLE units.",
    "proposed_resolution": "Separated into individual EXAMPLE units (u3, u4, u5) following the guideline that a list of distinct, non-comparative applications or cases constitutes separate units."
  }
]
```

## Unassigned text for coverage review

```text
சரி, உயர்நிலைப் பள்ளி மாணவரே! நான் உனக்கு **ஓரிடத்தான்** என்ற சொல்லை மிக எளிமையாகவும், சுவாரஸியமாகவும் விளக்குகிறேன்.

### ஓரிடத்தான் என்றால் என்ன?


```

```text


எளிய உதாரணத்துடன் புரிய வைக்கிறேன்:


```

```text


### உண்மையான உதாரணங்கள்


```

```text


### ஏன் இவை முக்கியம்?


```

```text


### சுருக்கமாக நினைவில் கொள்ள:


```

```text


உனக்கு இப்போது புரிந்ததா? இன்னும் ஏதாவது உதாரணம் வேண்டுமா அல்லது இது எப்படி அழிந்து போகிறது என்பதைப் பற்றி விளக்கட்டுமா?
```
