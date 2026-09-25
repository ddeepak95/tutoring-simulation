# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response explains covalent radius in Hindi, covering its definition, formula, worked examples (Cl2 and H2), periodic trends, significance, and a memory aid.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 35,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 35,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two identical covalently bonded atoms and presents the corresponding formula.

Accuracy: **accurate**. The definition and formula correctly state that covalent radius is half of the internuclear distance between two identical bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # सहसंयोजक त्रिज्या (Covalent Radius) - विस्तृत व्याख्या | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | जब दो **समान परमाणु** आपस में एक **सहसंयोजक बंधन (covalent bond)** बनाकर जुड़ते हैं, तो उन दोनों परमाणुओं के **नाभिकों (nuclei) के बीच की दूरी** को हम मापते हैं। इस दूरी का **आधा भाग** ही **सहसंयोजक त्रिज्या** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## सरल सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | $$\text{सहसंयोजक त्रिज्या} = \frac{\text{दो परमाणुओं के नाभिकों के बीच की दूरी}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Chlorine molecule example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the covalent radius formula to the homonuclear diatomic chlorine molecule with given values and a diagram.

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and the resulting covalent radius of 99 pm are scientifically accurate standard values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## एक उदाहरण से समझें 📚 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | मान लीजिए **क्लोरीन (Cl₂) अणु** है, जिसमें दो क्लोरीन परमाणु आपस में जुड़े हुए हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - दोनों क्लोरीन परमाणुओं के नाभिकों के बीच की दूरी = **198 pm** (पिकोमीटर) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - तो क्लोरीन की सहसंयोजक त्रिज्या = 198/2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | ``` | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p11 | Cl -------- Cl | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p12 | &#124;←--- 198 pm ---→&#124; | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p13 | &#124;← 99 pm →&#124;←99 pm→&#124; | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p14 |    (r)        (r) | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p15 | ``` | EXAMPLE | {} | [&#x27;diagram&#x27;] |

## u3: Hydrogen molecule example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the covalent radius calculation using the hydrogen molecule.

Accuracy: **accurate**. The H-H bond distance of 74 pm and the resulting covalent radius of 37 pm are correct standard values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## एक और उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | **हाइड्रोजन (H₂) अणु** में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | - दो H परमाणुओं के बीच की दूरी = 74 pm | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | - H की सहसंयोजक त्रिज्या = 74/2 = **37 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Key properties and periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the applicability, units, and periodic trends (along with their physical reasons) in tabular format.

Accuracy: **accurate**. All facts in the table, including units (pm, Å), the decrease across a period due to increasing nuclear charge, and the increase down a group due to added shells, are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## महत्वपूर्ण बातें (याद रखने योग्य बिंदु) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | &#124; बिंदु &#124; विवरण &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124;------&#124;--------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; **कब लागू होता है?** &#124; जब दोनों परमाणु **एक जैसे** हों (जैसे Cl-Cl, H-H) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124; **इकाई (Unit)** &#124; पिकोमीटर (pm) या एंगस्ट्रॉम (Å) में मापी जाती है &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124; **आवर्त में प्रवृत्ति** &#124; बाएं से दाएं जाने पर **घटती** है (नाभिकीय आवेश बढ़ने से) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p26 | &#124; **समूह में प्रवृत्ति** &#124; ऊपर से नीचे जाने पर **बढ़ती** है (नए कोश जुड़ने से) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u5: Significance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists reasons why understanding covalent radius is important in chemistry.

Accuracy: **accurate**. The listed applications (estimating atomic size, predicting periodic trends, and assessing bond strength) are scientifically valid.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## क्यों जरूरी है यह अवधारणा? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | सहसंयोजक त्रिज्या की मदद से हम: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | 1. परमाणु के **आकार** का अनुमान लगा सकते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | 2. **आवर्त सारणी** में तत्वों के गुणों की **भविष्यवाणी** कर सकते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | 3. यह समझ सकते हैं कि परमाणु कितनी मजबूती से बंधन बनाता है | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Mnemonic trick for covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a rhyming mnemonic to help students remember the concept, followed by a polite conversational wrap-up.

Accuracy: **accurate**. The mnemonic accurately captures the definition (half the internuclear distance equals the radius).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## याद रखने की ट्रिक 🎯 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | &gt; &quot;**आधी दूरी, पूरी त्रिज्या**&quot; - जब दो एक जैसे परमाणु जुड़ें, उनके बीच की दूरी को आधा कर दो, वही सहसंयोजक त्रिज्या है! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | **क्या आप चाहेंगे कि मैं आयनिक त्रिज्या (Ionic Radius) से इसकी तुलना करके समझाऊं?** इससे आपको दोनों के बीच का अंतर और स्पष्ट हो जाएगा। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

