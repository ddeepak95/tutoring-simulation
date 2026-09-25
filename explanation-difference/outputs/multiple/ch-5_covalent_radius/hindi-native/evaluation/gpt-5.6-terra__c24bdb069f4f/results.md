# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius in Hindi, covering its definition, formula, a calculation example, the rationale for measuring it, variation with bond order, periodic trends, and distinction from general atomic radius.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 50,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 50,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the basic definition of covalent radius as half the internuclear distance between two identical bonded atoms, along with its formula.

Accuracy: **accurate**. The definition and formula provided are standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **सहसंयोजक त्रिज्या (Covalent Radius)** किसी परमाणु के आकार को बताने का एक तरीका है, जब वह दूसरे परमाणु के साथ **सहसंयोजक बंध** बनाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### परिभाषा   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | जब एक ही तत्व के दो परमाणु सहसंयोजक बंध बनाते हैं, तो उनके नाभिकों के बीच की दूरी का आधा भाग उस तत्व की **सहसंयोजक त्रिज्या** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p5 | \text{सहसंयोजक त्रिज्या} = \frac{\text{दो नाभिकों के बीच की दूरी}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Worked calculation of covalent radius for chlorine (Cl2) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical calculation using the bond length in a diatomic chlorine molecule, including unit definition for picometers.

Accuracy: **accurate**. The internuclear distance for Cl2 (~198 pm) and calculated radius (99 pm) are standard and correct, as is the picometer definition (1 pm = 10^-12 m).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### उदाहरण   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | मान लीजिए क्लोरीन का अणु \(Cl_2\) है। इसमें दो क्लोरीन परमाणुओं के नाभिकों के बीच दूरी लगभग \(198\ pm\) है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | \text{Cl की सहसंयोजक त्रिज्या} = \frac{198}{2}=99\ pm | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | यहाँ **pm (पिकोमीटर)** बहुत छोटी दूरी की इकाई है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | 1\ pm = 10^{-12}\ m | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p15 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Reason for measuring covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is measured: atoms lack sharp outer boundaries, so bonded distances provide a measurable estimate of size.

Accuracy: **accurate**. Accurately explains the absence of sharp atomic boundaries and the reliance on bond distance for size estimation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## इसे क्यों मापते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | परमाणु की कोई स्पष्ट बाहरी सीमा नहीं होती, इसलिए उसकी “त्रिज्या” सीधे मापना कठिन है। वैज्ञानिक परमाणुओं के बीच बंध की दूरी मापकर परमाणु का अनुमानित आकार बताते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Relationship between bond order and covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how increasing bond order decreases the covalent radius due to increased nuclear attraction.

Accuracy: **accurate**. The inverse relation between bond order and covalent radius (single > double > triple) is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## महत्वपूर्ण बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | ### 1. एकल, द्वि और त्रि-बंध में त्रिज्या बदल सकती है   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | जितना अधिक बंध क्रम (bond order) होगा, परमाणु उतने अधिक पास होंगे। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | - एकल बंध: \(C-C\) — अपेक्षाकृत लंबा   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p24 | - द्वि-बंध: \(C=C\) — छोटा   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 | - त्रि-बंध: \(C\equiv C\) — सबसे छोटा   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | अर्थात: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p27 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p28 | \text{एकल बंध त्रिज्या} &gt; \text{द्वि-बंध त्रिज्या} &gt; \text{त्रि-बंध त्रिज्या} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p30 | क्योंकि अधिक बंध बनने पर दोनों नाभिकों के बीच आकर्षण बढ़ जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Periodic trend across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius decreases across a period from left to right due to increased effective nuclear charge.

Accuracy: **accurate**. The explanation of nuclear charge increasing from left to right causing radius reduction is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### 2. आवर्त (Period) में बाएँ से दाएँ जाने पर त्रिज्या घटती है   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | जैसे सोडियम से क्लोरीन की ओर जाने पर नाभिक में प्रोटॉन बढ़ते हैं। नाभिक इलेक्ट्रॉनों को अधिक मजबूती से खींचता है, इसलिए परमाणु छोटा होता जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | \text{बाएँ से दाएँ: सहसंयोजक त्रिज्या घटती है} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p36 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Periodic trend down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius increases down a group due to the addition of electron shells.

Accuracy: **accurate**. The explanation of radius increasing down a group due to additional principal electron shells is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### 3. समूह (Group) में ऊपर से नीचे जाने पर त्रिज्या बढ़ती है   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | नीचे जाने पर इलेक्ट्रॉन-खोल (shells) बढ़ते जाते हैं। इसलिए परमाणु का आकार बढ़ता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p40 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p41 | \text{ऊपर से नीचे: सहसंयोजक त्रिज्या बढ़ती है} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p42 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Difference between atomic radius and covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Differentiates general atomic radius from covalent radius.

Accuracy: **accurate**. The comparison is clear and factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## सहसंयोजक त्रिज्या और परमाणु त्रिज्या में अंतर   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | - **परमाणु त्रिज्या**: परमाणु के आकार का सामान्य अनुमान है।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p46 | - **सहसंयोजक त्रिज्या**: विशेष रूप से सहसंयोजक बंध में जुड़े परमाणुओं की दूरी से निकाली जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Key takeaway and recap (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary sentence to memorize the core concept.

Accuracy: **accurate**. The recap accurately synthesizes the main definition and conceptual meaning.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ### याद रखने की आसान बात   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | &gt; “दो समान परमाणुओं के नाभिकों के बीच की दूरी का आधा = सहसंयोजक त्रिज्या।” | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p50 | यह त्रिज्या हमें बताती है कि सहसंयोजक बंध बनाते समय परमाणु लगभग कितना बड़ा दिखाई देता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

