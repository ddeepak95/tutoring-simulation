# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains covalent radius in Hindi for high school level, covering its definition, calculation examples, measurement methods, periodic trends, and comparison with other atomic radii.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 27,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "CAVEAT": 1
  },
  "nested_passages": 27,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 7,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two covalently bonded atoms and provides the basic formula.

Accuracy: **accurate**. The definition of covalent radius as half the distance between the nuclei of two covalently bonded identical atoms is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम **सहसंयोजक त्रिज्या** को बहुत आसान भाषा में समझेंगे। यह रसायन विज्ञान (Periodic Properties) का एक महत्वपूर्ण कॉन्सेप्ट है, जो परमाणुओं के आकार को मापने में मदद करता है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### सहसंयोजक त्रिज्या क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | जब दो परमाणु आपस में **सहसंयोजक बंध** (covalent bond) बनाते हैं, तो उनके केंद्र (नाभिक) के बीच की दूरी को बंध लंबाई कहते हैं। इस बंध लंबाई का **आधा** भाग ही उस परमाणु की **सहसंयोजक त्रिज्या** कहलाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | सरल शब्दों में:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | **सहसंयोजक त्रिज्या = सहसंयोजक बंध की लंबाई ÷ 2** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | यह त्रिज्या हमें बताती है कि जब परमाणु दूसरे परमाणु के साथ इलेक्ट्रॉन साझा करके बंध बनाता है, तो उसका आकार कितना होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked step-by-step calculation of chlorine's covalent radius using the Cl-Cl bond length of 198 pm.

Accuracy: **accurate**. The Cl-Cl bond length in Cl2 is accurately stated as 198 pm, resulting in a covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | सबसे आसान उदाहरण **क्लोरीन** का लें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | - क्लोरीन गैस (Cl₂) में दो क्लोरीन परमाणु एक-दूसरे से सहसंयोजक बंध बनाते हैं। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - Cl–Cl बंध की लंबाई = **198 pm** (पिकोमीटर) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - इसलिए एक क्लोरीन परमाणु की सहसंयोजक त्रिज्या = 198 ÷ 2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Calculation of hydrogen covalent radius (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the covalent radius of hydrogen using the H-H bond length of 74 pm.

Accuracy: **accurate**. The H-H single bond length in H2 is 74 pm, giving a covalent radius of 37 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | इसी तरह: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - हाइड्रोजन (H₂) में H–H बंध लंबाई 74 pm है, इसलिए H की सहसंयोजक त्रिज्या = **37 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Calculation of oxygen covalent radius from O2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Divides the O=O double bond length by 2 to compute oxygen's covalent radius.

Accuracy: **contains_error**. The standard covalent radius of oxygen is defined for a single covalent bond (typically ~66 pm or 73 pm). The bond in O2 is a double bond (O=O) with length ~121 pm; halving this yields the double-bond covalent radius (~60.5 pm), not the standard single-bond covalent radius usually taught at high school level without qualification.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | - ऑक्सीजन (O₂) में O=O बंध लंबाई 121 pm है, इसलिए O की सहसंयोजक त्रिज्या = **60.5 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

Error (minor; p14): Halving the double-bond length of O2 (121 pm) gives the double-bond covalent radius (60.5 pm), whereas the standard covalent radius of oxygen refers to a single covalent bond (around 66 pm).

Correction: The standard single-bond covalent radius of oxygen is approximately 66 pm (derived from single-bonded molecules like H2O2). In O2, the bond order is 2, so 60.5 pm represents its double-bond covalent radius.

## u5: Experimental measurement of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions experimental methods (X-ray diffraction, spectroscopy) used to measure internuclear bond distance.

Accuracy: **accurate**. X-ray diffraction and spectroscopy are standard techniques used to determine bond lengths.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### इसे कैसे मापा जाता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | वैज्ञानिक X-ray diffraction या स्पेक्ट्रोस्कोपी जैसी तकनीकों से अणु में दो परमाणुओं के नाभिकों के बीच की सटीक दूरी माप लेते हैं और उसे आधा कर देते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u6: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius decreases across a period and increases down a group in the periodic table.

Accuracy: **accurate**. The periodic trends and their underlying causes (effective nuclear charge across periods, addition of electron shells down groups) are accurately explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### महत्वपूर्ण बातें (High School स्तर पर) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | 1. **आवर्त सारणी में रुझान (Trend)**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p19 |    - **आवर्त में बाएँ से दाएँ** जाने पर सहसंयोजक त्रिज्या **घटती** है (क्योंकि प्रभावी नाभिकीय आवेश बढ़ता है, इलेक्ट्रॉन बादल अंदर की ओर खिंचता है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 |    - **समूह में ऊपर से नीचे** जाने पर सहसंयोजक त्रिज्या **बढ़ती** है (क्योंकि नया कोश जुड़ता है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Distinction between covalent, ionic, and van der Waals radii (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts covalent radius with atomic, ionic, and van der Waals radii.

Accuracy: **accurate**. Accurately contrasts covalent radius with van der Waals radius (non-bonded weak attraction) and ionic radius (cationic/anionic states).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | 2. **यह अन्य त्रिज्याओं से अलग है**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p22 |    - **परमाणु त्रिज्या** (Atomic radius): सामान्यतः सहसंयोजक त्रिज्या को ही परमाणु त्रिज्या माना जाता है जब परमाणु बंधित अवस्था में हो। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 |    - **आयनिक त्रिज्या**: धनायन या ऋणायन बनने पर आकार बदल जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |    - **वैन डर वाल्स त्रिज्या**: जब परमाणु बंध नहीं बनाते, सिर्फ कमजोर आकर्षण से पास आते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Homonuclear vs heteronuclear bond qualification (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes that covalent radius is fundamentally defined from homonuclear diatomic molecules, though heteronuclear bond lengths can also be estimated.

Accuracy: **accurate**. The qualification correctly notes that the standard definition relies on homonuclear bonds (r = d/2), while heteronuclear bonds require accounting for electronegativity differences or covalent radius addition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### याद रखने वाली बात | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | सहसंयोजक त्रिज्या हमेशा **दो समान परमाणुओं** (जैसे Cl–Cl, H–H) के बीच मापी जाती है। अगर दो अलग-अलग परमाणु हों (जैसे C–H), तो उससे भी अनुमान लगाया जा सकता है, लेकिन मूल परिभाषा समान परमाणुओं पर आधारित है। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p27 | क्या आपको अब सहसंयोजक त्रिज्या का कॉन्सेप्ट साफ हो गया? अगर आप चाहें तो मैं आवर्त सारणी में इसके ट्रेंड को और विस्तार से उदाहरणों के साथ समझा सकता हूँ। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

