# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains isotopes to a high school student in Hindi, covering definition, atomic structure, hydrogen/carbon examples, properties, and a memory aid.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 35,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 35,
  "unique_subtopics": 4,
  "contextualization": {
    "everyday": 1,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Classroom analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "कल्पना करो कि एक कक्षा में सभी बच्चे एक ही कक्षा के हैं, लेकिन कुछ बच्चे मोटे हैं, कुछ पतले हैं, कुछ लंबे हैं, कुछ छोटे हैं। सब एक ही कक्षा के हैं, लेकिन उनका वज़न और साइज़ अलग-अलग है।"}]}

Annotation rationale: Uses an analogy of students in the same class having different weights and sizes to intuitively introduce isotopes.

Accuracy: **accurate**. The analogy serves as a sound introductory pedagogical tool to explain elements having identical class/identity but different mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम **समस्थानिक** (Isotopes) के बारे में आसान भाषा में बात करेंगे। मैं कोशिश करूँगा कि तुम्हें बिल्कुल क्लियर हो जाए। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### समस्थानिक क्या होते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | कल्पना करो कि एक कक्षा में सभी बच्चे एक ही कक्षा के हैं, लेकिन कुछ बच्चे मोटे हैं, कुछ पतले हैं, कुछ लंबे हैं, कुछ छोटे हैं। सब एक ही कक्षा के हैं, लेकिन उनका वज़न और साइज़ अलग-अलग है। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition and nuclear composition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that isotopes are atoms of the same element having the same number of protons (atomic number) but differing numbers of neutrons (mass number).

Accuracy: **accurate**. The scientific definitions of isotopes, atomic number, and mass number are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ठीक इसी तरह, **समस्थानिक** एक ही तत्व (Element) के परमाणु होते हैं, जिनमें: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | - **प्रोटॉन** की संख्या **समान** होती है (इसलिए वे एक ही तत्व कहलाते हैं) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - लेकिन **न्यूट्रॉन** की संख्या **अलग-अलग** होती है | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | इस वजह से उनका **द्रव्यमान** (मास) अलग-अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | ### सरल परिभाषा: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | &gt; **समस्थानिक** वे परमाणु हैं जिनका **परमाणु क्रमांक (Atomic Number)** तो समान होता है, लेकिन **द्रव्यमान संख्या (Mass Number)** अलग-अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the classic illustration of isotopes using protium, deuterium, and tritium with a breakdown of proton, neutron, and mass numbers.

Accuracy: **accurate**. The proton counts, neutron counts, and mass numbers for protium, deuterium, and tritium are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### उदाहरण से समझो (सबसे अच्छा उदाहरण) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | **हाइड्रोजन** के तीन समस्थानिक हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | &#124; नाम          &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; नाम (अंग्रेजी)    &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124;--------------&#124;--------&#124;----------&#124;------------------&#124;------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p14 | &#124; प्रोटियम     &#124; 1      &#124; 0        &#124; 1                &#124; Protium          &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; ड्यूटेरियम   &#124; 1      &#124; 1        &#124; 2                &#124; Deuterium        &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124; ट्राइटियम    &#124; 1      &#124; 2        &#124; 3                &#124; Tritium          &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | - तीनों में **प्रोटॉन** = 1 (इसलिए तीनों हाइड्रोजन ही हैं) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - लेकिन न्यूट्रॉन की संख्या अलग होने से इनका वज़न अलग-अलग है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Briefly lists carbon-12 and carbon-14 as an additional real-world example of isotopes.

Accuracy: **accurate**. Carbon-12 and carbon-14 are valid, standard examples of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | इसी तरह **कार्बन** के भी समस्थानिक हैं — **कार्बन-12** और **कार्बन-14**। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Characteristics and properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical chemical properties (same electron configuration), different physical properties (different mass), and different nuclear properties (stability vs. radioactivity).

Accuracy: **accurate**. The reasoning regarding electron configuration governing chemical properties, mass difference causing physical property differences, and nuclear instability causing radioactivity is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### समस्थानिकों की खास बातें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | 1. **रासायनिक गुण लगभग समान** होते हैं   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 |    क्योंकि रासायनिक गुण मुख्य रूप से इलेक्ट्रॉनों पर निर्भर करते हैं, और समस्थानिकों में इलेक्ट्रॉनों की संख्या भी समान होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | 2. **भौतिक गुण अलग** होते हैं   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |    क्योंकि उनका द्रव्यमान अलग होता है। उदाहरण: भारी पानी (D₂O) हल्के पानी से अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | 3. **नाभिकीय गुण अलग** होते हैं   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 |    कुछ समस्थानिक स्थिर होते हैं, जबकि कुछ **रेडियोएक्टिव** (अस्थिर) होते हैं। जैसे कार्बन-14 रेडियोएक्टिव है, इसलिए कार्बन डेटिंग में इस्तेमाल होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Mnemonic for remembering 'समस्थानिक' (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the Hindi term 'समस्थानिक' into 'सम' (same) and 'स्थानिक' (place/position) to help the student remember its meaning.

Accuracy: **accurate**. The breakdown accurately reflects the etymology (same place in the periodic table, determined by atomic number/protons).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### याद रखने का आसान तरीका: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | - **सम** = समान | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p29 | - **स्थानिक** = जगह (यहाँ जगह का मतलब प्रोटॉन की संख्या से है) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p30 | यानी **समान जगह वाले** परमाणु → समस्थानिक। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u7: Check for understanding practice question (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a practice question testing whether atoms with 6 protons and differing neutron numbers (6 vs 8) are isotopes, along with the correct answer.

Accuracy: **accurate**. Both the question and provided solution are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### एक छोटा सवाल (तुम सोचकर जवाब दो): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | अगर किसी तत्व के परमाणु में प्रोटॉन की संख्या 6 है, लेकिन एक में 6 न्यूट्रॉन हैं और दूसरे में 8 न्यूट्रॉन हैं, तो क्या वे समस्थानिक होंगे?   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p33 | (जवाब: हाँ, क्योंकि प्रोटॉन समान हैं) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | अब तुम्हें समस्थानिक समझ आ गए होंगे। अगर तुम्हें कोई खास हिस्सा और विस्तार से समझना हो (जैसे रेडियोएक्टिव समस्थानिक या उपयोग), तो बता देना! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

