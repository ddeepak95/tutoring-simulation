# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of isotopes, explaining the definition, underlying atomic principles, examples, calculation methods, classifications, practical applications, and chemical/physical properties.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 47,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 6,
    "PROCEDURE": 1
  },
  "nested_passages": 47,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms of the same chemical element having the same atomic number (number of protons) but different mass numbers (different number of neutrons).

Accuracy: **accurate**. The definition of isotopes as atoms of the same element having identical proton numbers and differing neutron numbers is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # شرح مفهوم النظائر (Isotopes) 🧪 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | أهلاً بك! سأشرح لك هذا المفهوم المهم في الكيمياء بطريقة مبسطة. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## 🔹 التعريف | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **النظائر** هي ذرات لنفس العنصر الكيميائي، لها **نفس العدد الذري** (نفس عدد البروتونات)، لكنها تختلف في **العدد الكتلي** (عدد النيوترونات مختلف). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | بمعنى آخر: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | &gt; نفس العنصر... لكن &quot;وزن&quot; مختلف قليلاً! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Atomic composition and why isotopes occur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains atomic constituents (protons, neutrons, electrons) and why isotopes can exist (elemental identity is strictly defined by protons, whereas neutron count can vary).

Accuracy: **accurate**. Accurately describes atomic structure and explains that proton count defines elemental identity while neutron count may vary.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## 🔹 لماذا يحدث هذا؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | تذكّر أن الذرة تتكون من: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **بروتونات** (+) في النواة → تحدد **هوية العنصر** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - **نيوترونات** (بدون شحنة) في النواة → تحدد **الكتلة** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - **إلكترونات** (-) حول النواة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | العنصر يُعرَّف بعدد بروتوناته فقط، فمثلاً أي ذرة بها 6 بروتونات هي &quot;كربون&quot; بالضرورة، لكن عدد النيوترونات فيها قد يتغير! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete illustrative example using carbon-12, carbon-13, and carbon-14, demonstrating constant proton numbers alongside differing neutron numbers and mass numbers.

Accuracy: **accurate**. The listed proton, neutron, and mass numbers for carbon-12, carbon-13, and carbon-14 are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## 🔹 مثال توضيحي: الكربون | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | &#124; النظير &#124; عدد البروتونات &#124; عدد النيوترونات &#124; العدد الكتلي &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124;--------&#124;----------------&#124;------------------&#124;--------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; كربون-12 (¹²C) &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; كربون-13 (¹³C) &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124; كربون-14 (¹⁴C) &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | **لاحظ:** عدد البروتونات ثابت (6) في الثلاثة، لكن النيوترونات تختلف. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Formula for calculating number of neutrons (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general mathematical formula for determining neutron count from mass number and atomic number.

Accuracy: **accurate**. The formula (Number of neutrons = Mass number - Atomic number) is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## 🔹 كيف تحسب عدد النيوترونات؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | $$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p25 | \text{عدد النيوترونات} = \text{العدد الكتلي} - \text{العدد الذري} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p26 | $$ | PROCEDURE | {} | [&#x27;equation&#x27;] |

## u5: Calculating neutrons in Sodium-23 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates a worked calculation using Na-23, specifying givens (Z=11, A=23) and computing neutrons (23 - 11 = 12).

Accuracy: **accurate**. The values given for Na-23 (Z=11, A=23) and the subtraction yielding 12 neutrons are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | مثال: نظير الصوديوم Na-23  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | - العدد الذري (Z) = 11 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - العدد الكتلي (A) = 23 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | - عدد النيوترونات = 23 - 11 = **12** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Types of isotopes: stable and radioactive (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Classifies isotopes into stable and radioactive (unstable), providing short definitions and element examples for each category.

Accuracy: **accurate**. Accurately distinguishes between stable isotopes that do not decay and radioactive isotopes that emit radiation over time.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## 🔹 أنواع النظائر | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | 1. **نظائر مستقرة** 🟢: لا تتفكك، تبقى كما هي (مثل ¹²C, ¹³C) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | 2. **نظائر مشعة (غير مستقرة)** ☢️: تتفكك مع الزمن وتصدر إشعاعات (مثل ¹⁴C, اليورانيوم-235) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Application of Carbon-14 in dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a real-world application of the isotope carbon-14 in determining the age of antiquities and fossils.

Accuracy: **accurate**. Carbon-14 is standardly used in radiocarbon dating of archaeological artifacts and fossils.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## 🔹 استخدامات النظائر في الحياة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | &#124; النظير &#124; الاستخدام &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p38 | &#124;--------&#124;-----------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p39 | &#124; كربون-14 &#124; تحديد عمر الآثار والمستحاثات &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Application of Iodine-131 in thyroid treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a distinct medical application of iodine-131 for thyroid disease diagnosis and therapy.

Accuracy: **accurate**. Iodine-131 is widely used in medicine for diagnosing and treating thyroid conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | &#124; يود-131 &#124; تشخيص وعلاج أمراض الغدة الدرقية &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Application of Cobalt-60 in cancer radiotherapy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a distinct medical application of cobalt-60 in radiation therapy for cancer.

Accuracy: **accurate**. Cobalt-60 is an established gamma source used in external beam radiotherapy for cancer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | &#124; كوبالت-60 &#124; علاج السرطان بالإشعاع &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u10: Application of Uranium-235 in nuclear power (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an industrial/energy application of uranium-235 in generating nuclear power.

Accuracy: **accurate**. Uranium-235 is the primary fissile isotope utilized in commercial nuclear power generation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | &#124; يورانيوم-235 &#124; توليد الطاقة النووية &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical or nearly identical chemical properties (same electron number/configuration) while differing in physical properties such as mass and density.

Accuracy: **accurate**. Accurately relates identical electron configurations to identical chemical properties and mass differences to physical property variations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## 💡 نقطة مهمة للتذكر | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | بما أن النظائر لها نفس عدد الإلكترونات (لأنها نفس العنصر)، فهي تتشابه في **خواصها الكيميائية**، لكنها تختلف قليلاً في **خواصها الفيزيائية** (مثل الكتلة والكثافة). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p47 | هل تريد مني أن أوضح لك كيفية حساب **الكتلة الذرية النسبية** من نسب وفرة النظائر؟ 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

