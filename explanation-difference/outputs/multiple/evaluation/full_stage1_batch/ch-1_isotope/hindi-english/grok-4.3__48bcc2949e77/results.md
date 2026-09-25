# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, examples (hydrogen and carbon), properties, and notation convention of isotopes",
  "topic_match": "on_topic",
  "reason": "The text explains what isotopes are (same atomic number, different mass number/neutrons), provides standard examples (hydrogen and carbon isotopes), discusses their chemical and physical properties, and explains their notation.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes and relation to atomic and mass numbers | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of hydrogen isotopes (protium, deuterium, tritium) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Comparison of carbon isotopes (carbon-12 and carbon-14) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Notation convention for writing mass number of isotopes | {"depth": "statement"} | accurate |

## u1: Definition of isotopes and relation to atomic and mass numbers

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "परिवार के सदस्य हैं। परिवार के सभी सदस्यों में कुछ चीजें एक जैसी होती हैं और कुछ अलग।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition correctly specifies that isotopes have the same number of protons (same atomic number) and different numbers of neutrons (different mass numbers).",
    "errors": []
  }
}
```

```text
कल्पना करो कि एक तत्व के परमाणु एक परिवार के सदस्य हैं। परिवार के सभी सदस्यों में कुछ चीजें एक जैसी होती हैं और कुछ अलग। ठीक उसी तरह:

**समस्थानिक** एक ही तत्व के वे परमाणु होते हैं जिनमें **प्रोटॉन की संख्या समान** होती है, लेकिन **न्यूट्रॉन की संख्या भिन्न** होती है।

### सरल परिभाषा:
- परमाणु क्रमांक (Atomic number) = प्रोटॉन की संख्या → **एक समान**
- द्रव्यमान संख्या (Mass number) = प्रोटॉन + न्यूट्रॉन → **भिन्न**
```


## u2: Comparison of hydrogen isotopes (protium, deuterium, tritium)

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The proton, neutron, and mass numbers for protium, deuterium, and tritium are factually correct, as is the qualitative explanation of why they are all hydrogen but differ in mass.",
    "errors": []
  }
}
```

```text
**1. हाइड्रोजन के तीन समस्थानिक:**

| समस्थानिक     | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या | नाम          |
|----------------|---------|----------|------------------|--------------|
| प्रोटियम      | 1       | 0        | 1                | ¹H           |
| ड्यूटीरियम    | 1       | 1        | 2                | ²H (D)       |
| ट्रिटियम      | 1       | 2        | 3                | ³H (T)       |

सभी हाइड्रोजन हैं क्योंकि प्रोटॉन 1 है, लेकिन न्यूट्रॉन अलग होने से उनका वजन अलग है।
```


## u3: Comparison of carbon isotopes (carbon-12 and carbon-14)

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Proton and neutron counts for C-12 and C-14 are correct, and C-14 is indeed heavier due to having two extra neutrons.",
    "errors": []
  }
}
```

```text
**2. कार्बन के समस्थानिक:**
- ¹²C → 6 प्रोटॉन + 6 न्यूट्रॉन
- ¹⁴C → 6 प्रोटॉन + 8 न्यूट्रॉन

दोनों कार्बन हैं, लेकिन ¹⁴C थोड़ा भारी है।
```


## u4: Chemical and physical properties of isotopes

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
    "verdict": "accurate",
    "reason": "The explanation correctly links identical chemical properties to having the same number of electrons and varying physical properties (density, melting point) to difference in atomic mass.",
    "errors": []
  }
}
```

```text
### समस्थानिकों के गुण:
- **रासायनिक गुण** लगभग एक जैसे होते हैं (क्योंकि इलेक्ट्रॉन की संख्या समान होती है)।
- **भौतिक गुण** (जैसे घनत्व, गलनांक) थोड़े अलग हो सकते हैं क्योंकि द्रव्यमान अलग होता है।
```


## u5: Notation convention for writing mass number of isotopes

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
    "verdict": "accurate",
    "reason": "Standard nuclear/isotope notation places the mass number as a leading superscript on the element symbol.",
    "errors": []
  }
}
```

```text
### याद रखने वाली बात:
समस्थानिकों को लिखते समय हम द्रव्यमान संख्या ऊपर बाईं तरफ लिखते हैं, जैसे ¹²C और ¹⁴C।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The introductory sentence compares atoms of an element to family members ('परिवार के सदस्य'). This could either be split as an ANALOGY unit or kept within CONCEPT unit u1 as a passing comparison.",
    "proposed_resolution": "Kept within u1 because it serves as an introductory lead-in without an independent explanatory domain-to-domain mapping, and contextualization is marked as 'everyday' due to the family analogy."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "The section is introduced with 'याद रखने वाली बात:' (Note to remember), which resembles a STUDY_SUPPORT section (e.g. study_strategy or recap), but it introduces the IUPAC notation convention for mass numbers for the first time.",
    "proposed_resolution": "Classified as CONCEPT with depth 'statement' in accordance with the guideline that a statement taught for the first time remains a CONCEPT unless its primary function is clearly study support."
  }
]
```

## Unassigned text for coverage review

```text
समस्थानिक क्या हैं?

नमस्ते! आज हम रसायन विज्ञान का एक आसान लेकिन महत्वपूर्ण टॉपिक समझेंगे — **समस्थानिक** (Isotopes)।


```

```text


### उदाहरण से समझो (बहुत आसान):


```

```text


अगर कोई सवाल हो (जैसे समस्थानिकों के उपयोग या अंतर) तो पूछो!
```
