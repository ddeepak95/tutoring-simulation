# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains the requested concept of isotopes in Arabic, including their definition, subatomic composition, illustrative examples (hydrogen and carbon isotopes), properties, and a practice question.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 33,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 33,
  "unique_subtopics": 4,
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

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the formal scientific definition of isotopes as atoms of the same chemical element that share the same atomic number (protons) but differ in mass number due to differing numbers of neutrons.

Accuracy: **accurate**. The definition of isotopes provided is scientifically accurate and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # النظائر (Isotopes) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## التعريف | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **النظائر** هي ذرات تنتمي إلى نفس العنصر الكيميائي، ولها نفس **العدد الذري** (عدد البروتونات)، لكنها تختلف في **العدد الكتلي** (بسبب اختلاف عدد النيوترونات في النواة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Atomic structure explanation of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the subatomic constituents of the atom (protons, neutrons, and electrons) relate to isotopes, explaining why isotopes remain the same element despite differences in mass.

Accuracy: **accurate**. The subatomic particle descriptions and their relation to elemental identity and isotopic variation are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## الشرح المبسط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | تخيل أن الذرة تتكون من: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | - **بروتونات** (شحنة موجبة) — تحدد هوية العنصر | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - **نيوترونات** (متعادلة الشحنة) — تضيف كتلة للذرة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | - **إلكترونات** (شحنة سالبة) — تدور حول النواة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | النظائر تشترك في **نفس عدد البروتونات** (لذلك تبقى نفس العنصر)، لكنها تختلف في **عدد النيوترونات**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a real-world illustrative table comparing the three isotopes of hydrogen (protium, deuterium, and tritium) in terms of proton count, neutron count, and mass number.

Accuracy: **accurate**. The values for protium, deuterium, and tritium (protons, neutrons, and mass numbers) are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## مثال توضيحي: نظائر الهيدروجين 🔬 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | &#124; النظير &#124; البروتونات &#124; النيوترونات &#124; العدد الكتلي &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124;--------&#124;:---:&#124;:---:&#124;:---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; **الهيدروجين العادي (Protium)** &#124; 1 &#124; 0 &#124; 1 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124; **الديوتيريوم (Deuterium)** &#124; 1 &#124; 1 &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124; **التريتيوم (Tritium)** &#124; 1 &#124; 2 &#124; 3 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | جميعها هيدروجين (لأن عدد البروتونات = 1)، لكنها تختلف في الكتلة. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world illustrative example detailing carbon-12, carbon-13, and carbon-14, their particle compositions, relative stability, and the practical application of carbon-14 in radiocarbon dating.

Accuracy: **accurate**. The factual details concerning carbon-12, carbon-13, and carbon-14 (proton counts, neutron counts, stability, and archaeological radiocarbon dating use) are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## مثال آخر: نظائر الكربون | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | - **الكربون-12** (⁶C¹²): 6 بروتونات + 6 نيوترونات — **الأكثر شيوعًا واستقرارًا** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | - **الكربون-13** (⁶C¹³): 6 بروتونات + 7 نيوترونات — مستقر أيضًا | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | - **الكربون-14** (⁶C¹⁴): 6 بروتونات + 8 نيوترونات — **مشع** ويُستخدم في تحديد عمر الأحافير (التأريخ الكربوني) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Key takeaways on isotope properties (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Functions as a high-level summary and study recap ('نقاط مهمة يجب تذكرها') highlighting the core rules regarding chemical properties, physical properties, nuclear stability/radioactivity, and weighted average atomic mass.

Accuracy: **accurate**. All four summarized takeaways are scientifically accurate, including the explanation of chemical similarity due to identical electron configuration, physical differences, radioactivity, and natural abundance averaging in the periodic table.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## نقاط مهمة يجب تذكرها ✅ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | 1. النظائر لها **نفس الخواص الكيميائية** تقريبًا (لأن التفاعلات الكيميائية تعتمد على الإلكترونات) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p27 | 2. النظائر تختلف في **الخواص الفيزيائية** مثل الكتلة والكثافة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p28 | 3. بعض النظائر **مستقرة** وبعضها **مشع (غير مستقر)** ويتحلل مع الزمن | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p29 | 4. الكتلة الذرية المذكورة في الجدول الدوري هي **متوسط** كتل النظائر المختلفة للعنصر حسب نسبة وجودها في الطبيعة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Practice question on defining criteria of isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a comprehension check question ('سؤال للتفكير') testing whether identical neutron count qualifies atoms as isotopes, followed by the correct answer.

Accuracy: **accurate**. The question and answer correctly reiterate that isotopes require matching proton numbers, not neutron numbers (which would make them isotones).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## سؤال للتفكير 🤔 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | إذا كان لديك ذرتان لهما نفس عدد النيوترونات لكن عدد بروتونات مختلف، هل تُعتبران نظائر لبعضهما؟ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p33 | **الإجابة:** لا! فالنظائر تُعرَّف بناءً على **تشابه عدد البروتونات**، وليس النيوترونات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

