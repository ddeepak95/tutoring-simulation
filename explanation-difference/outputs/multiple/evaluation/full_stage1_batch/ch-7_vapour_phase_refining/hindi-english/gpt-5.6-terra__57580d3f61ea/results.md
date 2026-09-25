# Stage 1: Hindi / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining of metals, including its principles and specific methods (Mond process and Van Arkel process)",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines vapour phase refining, states its underlying chemical principles, and demonstrates it using the standard industrial methods (Mond process for nickel and Van Arkel process for titanium/zirconium).",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition, principles, and general scheme of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Mond process for the refining of nickel | {"context": "real_world", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Van Arkel process for refining titanium and zirconium | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | STUDY_SUPPORT | Summary recap of vapour phase refining concepts and methods | {"subtype": "recap"} | accurate |

## u1: Definition, principles, and general scheme of vapour phase refining

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
    "reason": "Correctly defines vapour phase refining and explains the two fundamental criteria required for the technique (formation of a volatile compound and its facile thermal decomposition).",
    "errors": []
  }
}
```

```text
**वाष्प अवस्था परिशोधन (Vapour Phase Refining)** धातुओं को शुद्ध करने की एक विधि है। इसमें अशुद्ध धातु को पहले किसी गैस/रसायन के साथ अभिक्रिया कराकर उसका **वाष्पशील यौगिक** बनाया जाता है। फिर उस यौगिक को गर्म करके तोड़ दिया जाता है, जिससे **शुद्ध धातु** प्राप्त होती है।

## सिद्धान्त

यह विधि दो बातों पर आधारित है:

1. अशुद्ध धातु किसी उपयुक्त पदार्थ के साथ मिलकर **वाष्पशील यौगिक** बनाए।
2. वह वाष्पशील यौगिक गरम करने पर आसानी से **विघटित** होकर शुद्ध धातु दे दे।

अशुद्धियाँ सामान्यतः वाष्पशील यौगिक नहीं बनातीं, इसलिए वे पीछे रह जाती हैं।

### सामान्य प्रक्रिया

\[
\text{अशुद्ध धातु} + \text{अभिकर्मक} \rightarrow \text{वाष्पशील यौगिक}
\]

फिर,

\[
\text{वाष्पशील यौगिक} \xrightarrow{\text{गरम करने पर}} \text{शुद्ध धातु} + \text{अन्य पदार्थ}
\]
```


## u2: Mond process for the refining of nickel

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
    "reason": "The reaction equations, temperature ranges (330–350 K for formation and 450–470 K for decomposition), and safety note regarding nickel tetracarbonyl toxicity are factually accurate.",
    "errors": []
  }
}
```

```text
## 1. मोंड प्रक्रिया (Mond Process): निकेल का शोधन

इस विधि से **निकेल (Ni)** को शुद्ध किया जाता है।

### चरण 1: निकेल कार्बोनिल बनाना

अशुद्ध निकेल को लगभग **330–350 K** तापमान पर कार्बन मोनोऑक्साइड गैस (CO) के साथ मिलाया जाता है।

\[
\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4
\]

यह **निकेल टेट्राकार्बोनिल** \(\text{Ni(CO)}_4\) एक वाष्पशील यौगिक है।

### चरण 2: गर्म करके विघटन

निकेल कार्बोनिल के वाष्प को लगभग **450–470 K** तक गर्म किया जाता है।

\[
\text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO}
\]

इससे शुद्ध निकेल प्राप्त हो जाता है और CO गैस को फिर से उपयोग किया जा सकता है।

**ध्यान दें:** निकेल कार्बोनिल बहुत विषैला (toxic) होता है, इसलिए यह प्रक्रिया सावधानी से उद्योगों में की जाती है।
```


## u3: Van Arkel process for refining titanium and zirconium

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
    "reason": "The chemistry of the Van Arkel process for titanium, including reaction with iodine to form volatile TiI4 and decomposition over a heated tungsten filament, is correctly described.",
    "errors": []
  }
}
```

```text
## 2. वैन आर्केल प्रक्रिया (Van Arkel Process): टाइटेनियम और जिरकोनियम का शोधन

इस विधि से **टाइटेनियम (Ti)** और **जिरकोनियम (Zr)** जैसी धातुओं को अत्यधिक शुद्ध किया जाता है।

### उदाहरण: टाइटेनियम का शोधन

अशुद्ध टाइटेनियम को आयोडीन के साथ गर्म किया जाता है:

\[
\text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4
\]

यह टाइटेनियम टेट्राआयोडाइड \(\text{TiI}_4\) वाष्पशील होता है।

फिर इसके वाष्प को बहुत गर्म टंग्स्टन तार पर प्रवाहित किया जाता है:

\[
\text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2
\]

शुद्ध टाइटेनियम टंग्स्टन तार पर जम जाता है और आयोडीन फिर से प्रयोग की जा सकती है।
```


## u4: Summary recap of vapour phase refining concepts and methods

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
    "reason": "The recap accurately summarizes the main takeaways and single-sentence definition of vapour phase refining.",
    "errors": []
  }
}
```

```text
## याद रखने योग्य बातें

- वाष्प अवस्था परिशोधन में धातु का **वाष्पशील यौगिक** बनाया जाता है।
- फिर उस यौगिक को गर्म करके **शुद्ध धातु** प्राप्त की जाती है।
- **मोंड प्रक्रिया** → निकेल के लिए  
- **वैन आर्केल प्रक्रिया** → टाइटेनियम और जिरकोनियम के लिए  

### एक पंक्ति में परिभाषा

**वह परिशोधन विधि जिसमें धातु को वाष्पशील यौगिक में बदलकर, फिर उसे विघटित करके शुद्ध धातु प्राप्त की जाती है, वाष्प अवस्था परिशोधन कहलाती है।**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "Whether the Mond process and Van Arkel process should be classified as EXAMPLE or PROCEDURE.",
    "proposed_resolution": "Classified as EXAMPLE because each represents a specific industrial metallurgical case/application illustrating the broader concept of vapour phase refining, rather than an abstract, domain-general reusable procedure."
  }
]
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
