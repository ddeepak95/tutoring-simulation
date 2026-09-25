# Stage 1: Hindi / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "The mole concept in chemistry, including Avogadro's number, molar mass, and formula calculations",
  "topic_match": "on_topic",
  "reason": "The text explains the mole concept comprehensively, introducing it through an analogy, defining Avogadro's number, relating moles to molar mass, and providing a worked formula calculation.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Analogy of dozen and century to introduce the mole as a counting unit for microscopic particles | {} | accurate |
| u2 | CONCEPT | Definition of 1 mole and Avogadro's number | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Relationship between moles, atomic/molecular mass, and molar mass | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Formula for calculating number of moles from given mass and molar mass | {"depth": "statement"} | accurate |
| u5 | EXAMPLE | Worked problem calculating moles and molecules in 36 grams of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | STUDY_SUPPORT | Recap summary of the mole concept definition, value, and role | {"subtype": "recap"} | accurate |

## u1: Analogy of dozen and century to introduce the mole as a counting unit for microscopic particles

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "जब तुम बाज़ार जाते हो, तो दुकानदार से क्या कहते हो?\n* \"मुझे **एक दर्जन** (1 Dozen) केले दे दो।\" दुकानदार तुरंत समझ जाता है कि तुम्हें **12 केले** चाहिए।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy correctly maps counting units used for everyday items (dozen, century) to the mole as a grouping unit for large numbers of microscopic particles.",
    "errors": []
  }
}
```

```text
### 1. रोज़मर्रा की ज़िंदगी से एक उदाहरण:
जब तुम बाज़ार जाते हो, तो दुकानदार से क्या कहते हो?
* "मुझे **एक दर्जन** (1 Dozen) केले दे दो।" दुकानदार तुरंत समझ जाता है कि तुम्हें **12 केले** चाहिए।
* अगर कोई कहे **"एक शतक"** (Century), तो तुम्हारे दिमाग में तुरंत आता है— **100 रन**।

यहाँ 'दर्जन' या 'शतक' क्या हैं? ये सिर्फ **गिनती करने के शब्द (Units)** हैं। 

### 2. हमें 'मोल' की ज़रूरत क्यों पड़ी?
रसायन विज्ञान में हम परमाणु (Atoms) और अणु (Molecules) की बात करते हैं। ये इतने छोटे होते हैं कि इन्हें आँखों से देखना नामुमकिन है। पानी की एक छोटी सी बूँद में भी अरबों-खरबों अणु होते हैं। 

अब अगर कोई वैज्ञानिक कहे कि "मुझे 500 परमाणु कार्बन दे दो," तो उन्हें गिनना असंभव है। इसलिए, वैज्ञानिकों को परमाणुओं और अणुओं को गिनने के लिए एक बहुत बड़े 'दर्जन' की ज़रूरत थी। 

**उसी 'सुपर दर्जन' का नाम है — मोल (Mole)।**
```


## u2: Definition of 1 mole and Avogadro's number

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "* (मज़ाक के लिए: अगर तुम्हारे पास 1 मोल समोसे हों, तो तुम्हारे पास $6.022 \\times 10^{23}$ समोसे होंगे!)"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The value of Avogadro's number and its application to atoms, molecules, or general items are factually correct.",
    "errors": []
  }
}
```

```text
### 3. तो 1 मोल में कितना होता है?
जैसे 1 दर्जन = 12 वस्तुएं, 
वैसे ही:
$$\mathbf{1 \text{ मोल}} = \mathbf{6.022 \times 10^{23} \text{ कण (परमाणु, अणु या आयन)}}$$

इस जादुई संख्या ($6.022 \times 10^{23}$) को हम **आवोगाद्रो संख्या (Avogadro's Number)** कहते हैं, और इसे $N_A$ से दर्शाते हैं।

* **1 मोल कार्बन** = $6.022 \times 10^{23}$ कार्बन के परमाणु।
* **1 मोल पानी** = $6.022 \times 10^{23}$ पानी के अणु।
* (मज़ाक के लिए: अगर तुम्हारे पास 1 मोल समोसे हों, तो तुम्हारे पास $6.022 \times 10^{23}$ समोसे होंगे!)
```


## u3: Relationship between moles, atomic/molecular mass, and molar mass

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
        "quote": "यानी, जब तुम 18 ग्राम पानी (लगभग एक घूँट) पीते हो, तो तुम वास्तव में $6.022 \\times 10^{23}$ पानी के अणु पी जाते हो!"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition of molar mass (atomic or molecular mass expressed in grams being equal to 1 mole) and the illustrative calculations for carbon and water are accurate.",
    "errors": []
  }
}
```

```text
### 4. मोल और वज़न (द्रव्यमान) का संबंध:
हम लैब में परमाणुओं को गिन तो नहीं सकते, लेकिन हम तराज़ू पर उन्हें **तौल (weigh)** ज़रूर सकते हैं। यहीं पर मोल संकल्पना का असली जादू काम आता है।

**नियम बहुत सीधा है:**
किसी भी तत्व के **परमाणु भार (Atomic Mass)** को यदि तुम **ग्राम (grams)** में लिख दो, तो वह **1 मोल** बन जाता है! इसे हम **मोलर द्रव्यमान (Molar Mass)** कहते हैं।

**उदाहरण से समझो:**
1. **कार्बन (Carbon):**
   * कार्बन का परमाणु भार = $12 \, \text{u}$
   * तो, **12 ग्राम कार्बन = 1 मोल कार्बन** = $6.022 \times 10^{23}$ कार्बन के परमाणु।
2. **पानी ($H_2O$):**
   * पानी का अणु भार = $(2 \times 1) + 16 = 18 \, \text{u}$
   * तो, **18 ग्राम पानी = 1 मोल पानी** = $6.022 \times 10^{23}$ पानी के अणु।

यानी, जब तुम 18 ग्राम पानी (लगभग एक घूँट) पीते हो, तो तुम वास्तव में $6.022 \times 10^{23}$ पानी के अणु पी जाते हो!
```


## u4: Formula for calculating number of moles from given mass and molar mass

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
    "reason": "The formula n = m / M correctly defines the mathematical relationship between the number of moles, given mass, and molar mass.",
    "errors": []
  }
}
```

```text
### 5. याद रखने योग्य मुख्य सूत्र (Formula):

परीक्षा के प्रश्नों को हल करने के लिए बस यह एक सूत्र याद रखो:

$$\text{मोलों की संख्या (n)} = \frac{\text{दिया गया द्रव्यमान (m)}}{\text{मोलर द्रव्यमान (M)}}$$
```


## u5: Worked problem calculating moles and molecules in 36 grams of water

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
    "reason": "All calculations for determining the number of moles (36 / 18 = 2 moles) and the number of molecules (2 * 6.022e23 = 1.204e24 molecules) are mathematically and conceptually correct.",
    "errors": []
  }
}
```

```text
**एक छोटा सा सवाल हल करें?**
> **सवाल:** 36 ग्राम पानी ($H_2O$) में कितने मोल होंगे?
> 
> **हल:**
> * दिया गया द्रव्यमान ($m$) = 36 ग्राम
> * पानी का मोलर द्रव्यमान ($M$) = 18 ग्राम/मोल
> * $\text{मोल (n)} = \frac{36}{18} = \mathbf{2 \text{ मोल}}$
> 
> *(और अगर कोई पूछे कि 36 ग्राम में अणु कितने होंगे, तो $2 \times 6.022 \times 10^{23} = 1.204 \times 10^{24}$ अणु होंगे!)*
```


## u6: Recap summary of the mole concept definition, value, and role

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
    "reason": "The summary correctly recaps the core takeaways of the mole concept.",
    "errors": []
  }
}
```

```text
### निष्कर्ष (Summary):
* **मोल क्या है?** सूक्ष्म कणों (परमाणुओं/अणुओं) को गिनने का एक मात्रक (Unit) है।
* **इसका मान:** $6.022 \times 10^{23}$ कण।
* **काम क्या करता है?** यह **कणों की संख्या** को तराज़ू पर **ग्राम के वज़न** से जोड़ता है।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Sections 1 and 2 could be split into an everyday example (dozen and century) and a concept explaining why chemistry needs a counting unit for particles.",
    "proposed_resolution": "They are kept together as a single ANALOGY unit because Section 1 sets up the source domain and Section 2 maps it directly to the target domain ('super dozen' = mole)."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Section 4 contains both the general rule defining molar mass and specific cases (carbon and water), which could be split into a CONCEPT unit and an EXAMPLE unit.",
    "proposed_resolution": "Kept together as one CONCEPT unit because the examples immediately clarify the definition within a single teaching episode, adhering to the guideline of keeping direct explanations together."
  },
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "Section 5 contains a formula and a worked problem. They could be merged into a single EXAMPLE unit where the formula serves as supporting setup.",
    "proposed_resolution": "Split into a CONCEPT unit for the general formula and an EXAMPLE unit for the worked problem because the formula is explicitly introduced under its own heading as a general rule for exam problems before introducing the specific problem."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते! रसायन विज्ञान (Chemistry) की इस कक्षा में तुम्हारा स्वागत है। 

अक्सर छात्र 'मोल' (Mole) का नाम सुनकर थोड़ा डर जाते हैं, लेकिन यकीन मानो, यह उतना ही आसान है जितना बाज़ार से केले खरीदना! आओ, इसे बिल्कुल सरल तरीके से समझते हैं।

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

```text


क्या अब मोल संकल्पना का डर दूर हुआ? यदि कोई बात समझ न आई हो, तो बेझिझक पूछो!
```
