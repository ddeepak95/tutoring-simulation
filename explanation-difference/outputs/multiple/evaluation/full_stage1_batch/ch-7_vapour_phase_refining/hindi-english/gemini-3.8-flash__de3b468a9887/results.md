# Stage 1: Hindi / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining in metallurgy, including its principle, conditions, Mond process, Van Arkel method, and an explanatory analogy",
  "topic_match": "on_topic",
  "reason": "The response directly and thoroughly explains vapour phase refining, including its core principles, essential criteria, and standard industrial applications (Mond's process and the Van Arkel method).",
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
| u1 | CONCEPT | Definition, principle, and required conditions of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Mond process for the refining of nickel | {"context": "real_world", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Van Arkel method for the refining of zirconium and titanium | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | ANALOGY | Mud-covered sponge analogy for volatile compound separation | {} | accurate |

## u1: Definition, principle, and required conditions of vapour phase refining

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
    "reason": "The definition, two-stage principle (formation of a volatile compound and its subsequent thermal decomposition), and the two required criteria are scientifically accurate for vapour phase refining.",
    "errors": []
  }
}
```

```text
### **वाष्प प्रावस्था शोधन क्या है? (What is it?)**

नाम से ही समझिए: **"वाष्प" (Vapour) + "शोधन" (Refining/Purification)**। 
यानी यह अशुद्ध धातु (Impure Metal) को शुद्ध करने का एक ऐसा तरीका है, जिसमें हम धातु को पहले **गैस (वाष्प)** में बदलते हैं और फिर उसे वापस **ठोस शुद्ध धातु** में बदल लेते हैं।

---

### **इसका मूल सिद्धांत (Basic Principle):**

इसे आप 2 आसान स्टेप्स का जादू समझ सकते हैं:

1. **स्टेप 1 (गैस बनाना):** अशुद्ध धातु को किसी ऐसे पदार्थ (Reagent) के साथ गर्म किया जाता है, जिससे वह धातु एक **वाष्पशील यौगिक (Volatile Compound)** यानी गैस जैसी अवस्था में बदल जाए। धातु तो गैस बन जाती है, लेकिन उसकी **अशुद्धियाँ (Impurities) नीचे ही छूट जाती हैं** क्योंकि वे गैस नहीं बनतीं।
2. **स्टेप 2 (धातु वापस पाना):** अब उस गैस (वाष्पशील यौगिक) को अलग ले जाकर और अधिक तापमान पर गर्म किया जाता है, जिससे वह टूट (Decompose) जाती है और हमें **100% शुद्ध धातु (Pure Metal)** मिल जाती है।

### **इस विधि के लिए 2 ज़रूरी शर्तें:**
1. धातु किसी अभिकर्मक (Reagent) के साथ मिलकर आसानी से **वाष्पशील (उड़ने वाला) यौगिक** बना ले।
2. वह यौगिक आसानी से गर्म करने पर **टूट भी जाए**, ताकि धातु वापस मिल सके।
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
    "reason": "The temperatures (330-350 K for formation of Ni(CO)4 and 450-470 K for decomposition), reagents, and chemical equations for the Mond process are factually correct.",
    "errors": []
  }
}
```

```text
#### **1. मोंड प्रक्रम (Mond's Process) — निकेल (Ni) के शोधन के लिए**
* **स्टेप 1:** अशुद्ध निकेल को कार्बन मोनोऑक्साइड ($CO$) के साथ लगभग $330 - 350 \text{ K}$ पर गर्म करते हैं। इससे निकेल टेट्राकार्बोनिल नाम की गैस बनती है। अशुद्धियां पीछे रह जाती हैं।
  $$\text{Ni (अशुद्ध)} + 4\text{CO} \xrightarrow{330-350 \text{ K}} \text{Ni(CO)}_4 \text{ (वाष्प)}$$

* **स्टेप 2:** अब इस गैस को और तेज़ तापमान ($450 - 470 \text{ K}$) पर गर्म करते हैं, जिससे यह टूट जाती है और शुद्ध निकेल प्राप्त होता है।
  $$\text{Ni(CO)}_4 \xrightarrow{450-470 \text{ K}} \text{Ni (शुद्ध)} + 4\text{CO}$$
```


## u3: Van Arkel method for the refining of zirconium and titanium

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
    "reason": "The reaction conditions, temperatures (~870 K and ~2075 K on a tungsten filament), chemical equations, and removal of oxygen/nitrogen impurities for Zr in the Van Arkel method are factually correct.",
    "errors": []
  }
}
```

```text
#### **2. वैन-आरकेल विधि (Van Arkel Method) — ज़िरकोनियम (Zr) और टाइटेनियम (Ti) के लिए**
इस विधि का उपयोग धातु से ऑक्सीजन और नाइट्रोजन जैसी अशुद्धियों को पूरी तरह हटाने के लिए किया जाता है ताकि **अति-शुद्ध (Ultra-pure)** धातु मिले।

* **स्टेप 1:** अशुद्ध ज़िरकोनियम या टाइटेनियम को आयोडीन ($I_2$) के साथ निर्वात (vacuum) में गर्म करते हैं, जिससे वाष्पशील आयोडाइड बनता है।
  $$\text{Zr (अशुद्ध)} + 2\text{I}_2 \xrightarrow{870 \text{ K}} \text{ZrI}_4 \text{ (वाष्प)}$$

* **स्टेप 2:** इस वाष्प को एक बहुत गर्म **टंगस्टन फिलामेंट** (लगभग $2075 \text{ K}$) के ऊपर से गुज़ारा जाता है। गर्मी के कारण यह टूट जाता है और शुद्ध धातु फिलामेंट पर जमा हो जाती है।
  $$\text{ZrI}_4 \xrightarrow{2075 \text{ K (टंगस्टन तार)}} \text{Zr (शुद्ध)} + 2\text{I}_2$$
```


## u4: Mud-covered sponge analogy for volatile compound separation

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "मान लीजिए आपके पास मिट्टी से सना हुआ एक स्पंज है।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The hypothetical analogy of a muddy sponge cleanly maps the core concept of separating a substance from non-volatile impurities by selective volatilization and recovery.",
    "errors": []
  }
}
```

```text
### **याद रखने के लिए एक सरल उदाहरण (Real-life Analogy):**
मान लीजिए आपके पास मिट्टी से सना हुआ एक स्पंज है। अगर आपके पास कोई ऐसा जादू हो कि सिर्फ स्पंज भाप बनकर उड़ जाए और हवा में जाकर ठंडा होकर वापस शुद्ध स्पंज बन जाए, तो मिट्टी तो ज़मीन पर ही छूट जाएगी ना? 
बस, यही काम **वाष्प प्रावस्था शोधन** में रसायन विज्ञान (Chemistry) के ज़रिए किया जाता है!
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
नमस्ते! आज हम धातु निष्कर्षण (Metallurgy) का एक बहुत ही महत्वपूर्ण और आसान टॉपिक समझेंगे, जिसका नाम है — **वाष्प प्रावस्था शोधन (Vapour Phase Refining)**।

बोर्ड परीक्षा (Class 12th Chemistry) के नजरिए से यह टॉपिक बहुत महत्वपूर्ण है। चलो, इसे बिल्कुल आसान भाषा में समझते हैं।

---


```

```text


---

### **इसके दो सबसे प्रसिद्ध उदाहरण (Examples):**

बोर्ड परीक्षा में सीधे इनके नाम से प्रश्न आता है:


```

```text


---


```

```text


---


```

```text


क्या आपको यह प्रक्रिया और दोनों विधियाँ (Mond & Van Arkel) समझ आ गईं? अगर कोई डाउट हो तो बेझिझक पूछिए!
```
