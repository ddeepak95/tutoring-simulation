# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius, including its definition, formula, illustrative worked examples (Cl2 and H2), an everyday analogy, periodic trends, and key characteristics.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 35,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 35,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the distance between the nuclei of two identical bonded atoms and provides the corresponding mathematical equation.

Accuracy: **accurate**. The definition and formula accurately specify covalent radius as half the internuclear distance between two identical covalently bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # सहसंयोजक त्रिज्या (Covalent Radius) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | जब दो **समान परमाणु** आपस में **सहसंयोजक बंध (covalent bond)** बनाकर जुड़ते हैं, तो उन दोनों नाभिकों (nuclei) के बीच की दूरी की **आधी दूरी** को **सहसंयोजक त्रिज्या** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### सूत्र: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | $$\text{सहसंयोजक त्रिज्या} = \frac{\text{दोनों परमाणुओं के नाभिकों के बीच की दूरी}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculating the covalent radius of chlorine using its Cl-Cl bond distance of 198 pm.

Accuracy: **accurate**. The internuclear distance in a Cl2 molecule is approximately 198 pm, giving an accurate covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | मान लीजिए, क्लोरीन (Cl₂) के अणु में दो क्लोरीन परमाणु आपस में जुड़े हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | - अगर दोनों नाभिकों के बीच की दूरी = **198 pm** (पिकोमीटर) है | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - तो क्लोरीन का सहसंयोजक त्रिज्या = 198/2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Hydrogen molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculating the covalent radius of hydrogen using its H-H bond distance of 74 pm.

Accuracy: **accurate**. The H-H bond distance in H2 is indeed 74 pm, giving an accurate covalent radius of 37 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | इसी तरह H₂ अणु में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | - H-H बंध की लंबाई = 74 pm | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | - हाइड्रोजन का सहसंयोजक त्रिज्या = 74/2 = **37 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Two touching balls analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p16", "quote": "सोचिए दो गेंदें (परमाणु) आपस में चिपकी हुई हैं। दोनों गेंदों के केंद्र (नाभिक) के बीच की कुल दूरी नापकर उसे 2 से भाग दे दिया जाए, तो एक गेंद की त्रिज्या (radius) मिल जाएगी।"}]}

Annotation rationale: Explains covalent radius intuitively using two balls sticking together and measuring the distance between their centers.

Accuracy: **accurate**. The analogy clearly and correctly captures the geometric logic of dividing the internuclear distance of two identical spheres by two.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## सरल भाषा में समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | सोचिए दो गेंदें (परमाणु) आपस में चिपकी हुई हैं। दोनों गेंदों के केंद्र (नाभिक) के बीच की कुल दूरी नापकर उसे 2 से भाग दे दिया जाए, तो एक गेंद की त्रिज्या (radius) मिल जाएगी। यही सहसंयोजक त्रिज्या है। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the directional trends across periods and down groups in the periodic table along with the underlying structural causes (effective nuclear charge and shell addition).

Accuracy: **accurate**. The trends (increasing down a group due to added electron shells and decreasing left-to-right across a period due to increased effective nuclear charge) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## आवर्त सारणी में प्रवृत्ति (Trend) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | ### 1️⃣ **समूह में ऊपर से नीचे (Group)**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | त्रिज्या **बढ़ती है** ⬆️ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | - कारण: नए इलेक्ट्रॉन शेल (shell) जुड़ते जाते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 | ### 2️⃣ **आवर्त में बाएं से दाएं (Period)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | त्रिज्या **घटती है** ⬇️ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | - कारण: नाभिकीय आवेश (nuclear charge) बढ़ता है, जिससे इलेक्ट्रॉन नाभिक की ओर अधिक आकर्षित होते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Key properties and units of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a summary table detailing scope of applicability, units of measurement, and practical utility in determining bond lengths.

Accuracy: **accurate**. The stated points regarding applicability to covalent compounds, standard units (pm and Å), and usage in calculating bond lengths are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## महत्वपूर्ण बिंदु | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | &#124; बिंदु &#124; विवरण &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p28 | &#124;------&#124;--------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p29 | &#124; लागू होता है &#124; केवल सहसंयोजक यौगिकों पर (अणु बनाने वाले परमाणुओं पर) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p30 | &#124; मापन इकाई &#124; पिकोमीटर (pm) या एंगस्ट्रॉम (Å) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p31 | &#124; प्रयोग &#124; बंध लंबाई (bond length) ज्ञात करने में &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Mnemonic and follow-up offer (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a rhyming memory tip for calculating covalent radius, followed by a conversational closing offer.

Accuracy: **accurate**. The memory slogan correctly encapsulates halving the distance to obtain the radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## याद रखने की तरकीब 🎯 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | &quot;**दूरी को दो से बांटो, त्रिज्या मिल जाएगी!**&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p35 | क्या आप चाहेंगे कि मैं **आयनिक त्रिज्या** और **सहसंयोजक त्रिज्या** के बीच का अंतर भी समझाऊं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

