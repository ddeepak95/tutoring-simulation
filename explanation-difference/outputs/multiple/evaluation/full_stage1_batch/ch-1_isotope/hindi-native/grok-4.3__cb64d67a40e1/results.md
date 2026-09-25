# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, properties, examples, and identification of isotopes",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly explains what isotopes are, provides standard examples (hydrogen and carbon), explains their physical and chemical properties, and offers memory aids and a practice question.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Classroom analogy comparing students in the same class to isotopes | {} | accurate |
| u2 | CONCEPT | Definition and nuclear composition of isotopes | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Hydrogen isotopes: protium, deuterium, and tritium | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Carbon isotopes: carbon-12 and carbon-14 | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | CONCEPT | Chemical, physical, and nuclear properties of isotopes | {"depth": "explanation"} | accurate |
| u6 | STUDY_SUPPORT | Etymological memory aid for the term 'samsthanik' | {"subtype": "mnemonic"} | accurate |
| u7 | STUDY_SUPPORT | Practice check question on identifying isotopes | {"subtype": "practice_question"} | accurate |

## u1: Classroom analogy comparing students in the same class to isotopes

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "कल्पना करो कि एक कक्षा में सभी बच्चे एक ही कक्षा के हैं, लेकिन कुछ बच्चे मोटे हैं, कुछ पतले हैं"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy reasonably maps elements sharing identity (same class) while varying in mass/weight to the behavior of isotopes.",
    "errors": []
  }
}
```

```text
कल्पना करो कि एक कक्षा में सभी बच्चे एक ही कक्षा के हैं, लेकिन कुछ बच्चे मोटे हैं, कुछ पतले हैं, कुछ लंबे हैं, कुछ छोटे हैं। सब एक ही कक्षा के हैं, लेकिन उनका वज़न और साइज़ अलग-अलग है।
```


## u2: Definition and nuclear composition of isotopes

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
    "reason": "The definition accurately states that isotopes have the same number of protons (atomic number) but different numbers of neutrons (mass number).",
    "errors": []
  }
}
```

```text
ठीक इसी तरह, **समस्थानिक** एक ही तत्व (Element) के परमाणु होते हैं, जिनमें:
- **प्रोटॉन** की संख्या **समान** होती है (इसलिए वे एक ही तत्व कहलाते हैं)
- लेकिन **न्यूट्रॉन** की संख्या **अलग-अलग** होती है

इस वजह से उनका **द्रव्यमान** (मास) अलग-अलग होता है।

### सरल परिभाषा:
> **समस्थानिक** वे परमाणु हैं जिनका **परमाणु क्रमांक (Atomic Number)** तो समान होता है, लेकिन **द्रव्यमान संख्या (Mass Number)** अलग-अलग होता है।
```


## u3: Hydrogen isotopes: protium, deuterium, and tritium

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
    "reason": "The table and explanation correctly give the proton, neutron, and mass numbers for protium, deuterium, and tritium.",
    "errors": []
  }
}
```

```text
### उदाहरण से समझो (सबसे अच्छा उदाहरण)

**हाइड्रोजन** के तीन समस्थानिक हैं:

| नाम          | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या | नाम (अंग्रेजी)    |
|--------------|--------|----------|------------------|------------------|
| प्रोटियम     | 1      | 0        | 1                | Protium          |
| ड्यूटेरियम   | 1      | 1        | 2                | Deuterium        |
| ट्राइटियम    | 1      | 2        | 3                | Tritium          |

- तीनों में **प्रोटॉन** = 1 (इसलिए तीनों हाइड्रोजन ही हैं)
- लेकिन न्यूट्रॉन की संख्या अलग होने से इनका वज़न अलग-अलग है।
```


## u4: Carbon isotopes: carbon-12 and carbon-14

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Carbon-12 and carbon-14 are indeed standard isotopes of carbon.",
    "errors": []
  }
}
```

```text
इसी तरह **कार्बन** के भी समस्थानिक हैं — **कार्बन-12** और **कार्बन-14**।
```


## u5: Chemical, physical, and nuclear properties of isotopes

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
    "reason": "Correctly explains why chemical properties are nearly identical (same electron count) while physical and nuclear properties vary due to differing mass and nuclear stability.",
    "errors": []
  }
}
```

```text
### समस्थानिकों की खास बातें:

1. **रासायनिक गुण लगभग समान** होते हैं  
   क्योंकि रासायनिक गुण मुख्य रूप से इलेक्ट्रॉनों पर निर्भर करते हैं, और समस्थानिकों में इलेक्ट्रॉनों की संख्या भी समान होती है।

2. **भौतिक गुण अलग** होते हैं  
   क्योंकि उनका द्रव्यमान अलग होता है। उदाहरण: भारी पानी (D₂O) हल्के पानी से अलग होता है।

3. **नाभिकीय गुण अलग** होते हैं  
   कुछ समस्थानिक स्थिर होते हैं, जबकि कुछ **रेडियोएक्टिव** (अस्थिर) होते हैं। जैसे कार्बन-14 रेडियोएक्टिव है, इसलिए कार्बन डेटिंग में इस्तेमाल होता है।
```


## u6: Etymological memory aid for the term 'samsthanik'

```json
{
  "attributes": {
    "subtype": "mnemonic"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The term 'समस्थानिक' literally translates to occupying the same place (in the periodic table, determined by atomic number/protons). Interpreting 'स्थान' (place) directly as proton count serves as an acceptable mnemonic simplification.",
    "errors": []
  }
}
```

```text
### याद रखने का आसान तरीका:

- **सम** = समान
- **स्थानिक** = जगह (यहाँ जगह का मतलब प्रोटॉन की संख्या से है)

यानी **समान जगह वाले** परमाणु → समस्थानिक।
```


## u7: Practice check question on identifying isotopes

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The question and accompanying parenthetical answer correctly apply the definition of isotopes (same atomic number 6, different neutron numbers 6 and 8).",
    "errors": []
  }
}
```

```text
### एक छोटा सवाल (तुम सोचकर जवाब दो):

अगर किसी तत्व के परमाणु में प्रोटॉन की संख्या 6 है, लेकिन एक में 6 न्यूट्रॉन हैं और दूसरे में 8 न्यूट्रॉन हैं, तो क्या वे समस्थानिक होंगे?  
(जवाब: हाँ, क्योंकि प्रोटॉन समान हैं)
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3",
      "u4"
    ],
    "issue": "Whether the brief mention of carbon isotopes (carbon-12 and carbon-14) should be kept as a distinct illustrative example or merged with the preceding hydrogen isotopes example.",
    "proposed_resolution": "Separated as u4 because it introduces a separate element/case, even though it is very brief."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते! आज हम **समस्थानिक** (Isotopes) के बारे में आसान भाषा में बात करेंगे। मैं कोशिश करूँगा कि तुम्हें बिल्कुल क्लियर हो जाए।

### समस्थानिक क्या होते हैं?


```

```text


---

अब तुम्हें समस्थानिक समझ आ गए होंगे। अगर तुम्हें कोई खास हिस्सा और विस्तार से समझना हो (जैसे रेडियोएक्टिव समस्थानिक या उपयोग), तो बता देना!
```
