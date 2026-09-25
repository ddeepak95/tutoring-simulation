# Stage 1: Hindi / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining (principles, steps, Mond process, Van Arkel process, and summary)",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly explains vapour phase refining of metals, including its principles, conditions, steps, and key industrial applications (Mond process and Van Arkel process).",
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
| u1 | CONCEPT | Principle and requirements of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | PROCEDURE | General procedural steps of vapour phase refining | {} | accurate |
| u3 | EXAMPLE | Mond process for nickel refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Van Arkel process for titanium and zirconium refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u5 | ANALOGY | Analogy of separating a volatile substance from sand | {} | accurate |
| u6 | STUDY_SUPPORT | Summary table of vapour phase refining | {"subtype": "recap"} | accurate |
| u7 | STUDY_SUPPORT | Mnemonic memory trick for vapour phase refining | {"subtype": "mnemonic"} | accurate |

## u1: Principle and requirements of vapour phase refining

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
    "reason": "Correctly defines vapour phase refining, states its operating principle, and lists the two fundamental requirements.",
    "errors": []
  }
}
```

```text
**वाष्प प्रावस्था परिष्करण (Vapour Phase Refining)** धातुओं को अत्यधिक शुद्ध करने की एक विधि है। इसका उपयोग उन धातुओं के लिए किया जाता है जो किसी उपयुक्त अभिकर्मक के साथ मिलकर **वाष्पशील (volatile) यौगिक** बना सकती हैं।

## मूल सिद्धांत

इस विधि में अशुद्ध धातु को पहले एक ऐसे यौगिक में बदला जाता है जो आसानी से गैस/वाष्प बन जाए। फिर उस वाष्पशील यौगिक को अलग स्थान पर गर्म करके तोड़ा जाता है, जिससे **शुद्ध धातु** प्राप्त हो जाती है।

इसे इस प्रकार समझ सकते हैं:

\[
\text{अशुद्ध धातु} \rightarrow \text{वाष्पशील यौगिक} \rightarrow \text{शुद्ध धातु}
\]

### इस विधि के लिए दो आवश्यक शर्तें

1. धातु का बना यौगिक **वाष्पशील** होना चाहिए।
2. उस यौगिक को आसानी से गर्म करके पुनः धातु में बदला जा सके।
```


## u2: General procedural steps of vapour phase refining

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately details the three general sequential steps of the refining process.",
    "errors": []
  }
}
```

```text
## प्रक्रिया के चरण

1. **अशुद्ध धातु को अभिकर्मक से मिलाते हैं**  
   इससे धातु का वाष्पशील यौगिक बनता है।

2. **वाष्पशील यौगिक को अलग कर लेते हैं**  
   अशुद्धियाँ सामान्यतः वाष्प नहीं बनतीं, इसलिए पीछे रह जाती हैं।

3. **वाष्प को गर्म सतह पर अपघटित करते हैं**  
   वाष्पशील यौगिक टूट जाता है और शुद्ध धातु जमा हो जाती है।
```


## u3: Mond process for nickel refining

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The reaction equations, stoichiometry, temperatures, and chemical reasoning for Mond's process are factually correct.",
    "errors": []
  }
}
```

```text
# 1. मोंड प्रक्रिया (Mond Process): निकेल का शोधन

निकेल को शुद्ध करने के लिए मोंड प्रक्रिया प्रयोग की जाती है।

### चरण 1: निकेल कार्बोनिल बनाना

अशुद्ध निकेल को लगभग **330–350 K** ताप पर कार्बन मोनोऑक्साइड (CO) गैस के साथ अभिक्रिया कराते हैं।

\[
\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4
\]

यहाँ निकल टेट्राकार्बोनिल \(\text{Ni(CO)}_4\) बनता है, जो एक **वाष्पशील पदार्थ** है।

### चरण 2: कार्बोनिल का अपघटन

निकेल कार्बोनिल के वाष्प को लगभग **450–470 K** तक गर्म किया जाता है।

\[
\text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO}
\]

इससे अत्यंत शुद्ध निकेल प्राप्त होता है और CO गैस फिर से निकल जाती है।

**मुख्य बात:** अशुद्धियाँ निकेल कार्बोनिल नहीं बनातीं, इसलिए वे अलग रह जाती हैं।
```


## u4: Van Arkel process for titanium and zirconium refining

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The description of the Van Arkel process using iodine, the formation and decomposition of volatile TiI4 on a tungsten filament, and the chemical equations are factually correct.",
    "errors": []
  }
}
```

```text
# 2. वान आर्केल प्रक्रिया (Van Arkel Process): टाइटेनियम और जिरकोनियम का शोधन

यह प्रक्रिया टाइटेनियम (Ti) और जिरकोनियम (Zr) जैसी धातुओं को बहुत शुद्ध करने के लिए उपयोग की जाती है।

### उदाहरण: टाइटेनियम

अशुद्ध टाइटेनियम को आयोडीन के साथ गर्म करते हैं:

\[
\text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4
\]

टाइटेनियम टेट्राआयोडाइड \(\text{TiI}_4\) वाष्पशील होता है। इसके वाष्प को गर्म टंग्स्टन तंतु (tungsten filament) पर प्रवाहित किया जाता है।

\[
\text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2
\]

इस प्रकार शुद्ध टाइटेनियम गर्म तंतु पर जम जाता है और आयोडीन पुनः प्राप्त हो जाती है।
```


## u5: Analogy of separating a volatile substance from sand

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "मान लीजिए रेत में कुछ ऐसी चीज़ मिली है जो गर्म करने पर भाप बन जाती है, लेकिन रेत नहीं बनती।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides a valid conceptual analogy illustrating selective volatilization and recovery.",
    "errors": []
  }
}
```

```text
## सरल उदाहरण से समझिए

मान लीजिए रेत में कुछ ऐसी चीज़ मिली है जो गर्म करने पर भाप बन जाती है, लेकिन रेत नहीं बनती।  
यदि हम उस मिश्रण को गर्म करें, तो केवल आवश्यक पदार्थ भाप बनकर अलग हो जाएगा। बाद में उस भाप को ठंडा या विघटित करके शुद्ध पदार्थ पा सकते हैं।

वाष्प प्रावस्था परिष्करण भी इसी विचार पर काम करता है, लेकिन इसमें रासायनिक अभिक्रियाओं का उपयोग किया जाता है।
```


## u6: Summary table of vapour phase refining

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
    "verdict": "accurate",
    "reason": "The summary accurately consolidates key aspects of the topic previously taught.",
    "errors": []
  }
}
```

```text
## संक्षेप में

| बिंदु | वाष्प प्रावस्था परिष्करण |
|---|---|
| सिद्धांत | धातु का वाष्पशील यौगिक बनाकर उसे पुनः विघटित करना |
| उद्देश्य | अत्यंत शुद्ध धातु प्राप्त करना |
| उदाहरण | निकेल का मोंड प्रक्रम, टाइटेनियम/जिरकोनियम का वान आर्केल प्रक्रम |
| लाभ | बहुत उच्च शुद्धता वाली धातु मिलती है |
```


## u7: Mnemonic memory trick for vapour phase refining

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
    "reason": "The memory trick correctly mirrors the sequence of steps and principle of vapour phase refining.",
    "errors": []
  }
}
```

```text
**याद रखने की ट्रिक:**  
**“वाष्पशील यौगिक बनाओ, उसे तोड़ो, शुद्ध धातु पाओ।”**
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```
