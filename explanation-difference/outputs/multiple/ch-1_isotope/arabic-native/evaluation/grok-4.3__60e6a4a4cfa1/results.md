# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The prompt asks to explain the plural term 'نظائر' (isotopes) to a secondary school student in Arabic. The response covers both the linguistic aspects of the term in Arabic and its core scientific definition and examples in chemistry.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 7,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 4,
  "contextualization": {
    "localized": 2,
    "none": 8,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Morphological classification of the plural نظائر (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p5", "quote": "\"نظائر\" هو **جمع تكسير**، وليس جمعًا سالمًا."}, {"passage_id": "p6", "quote": "وزن الجمع: **فَعَائِل** (مثل: رسائل، حدائق، كنائس)."}]}

Annotation rationale: Explains the singular form, the broken plural category (جمع تكسير), and its morphological weight (وزن فَعَائِل) in Arabic grammar.

Accuracy: **accurate**. The morphological breakdown of نظير / نظائر as a broken plural on the weight of فعائل is grammatically correct in Arabic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **شرح كلمة &quot;نظائر&quot; لطلاب المرحلة الثانوية** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ### 1. المفرد والجمع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | - **المفرد**: **نظير** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **الجمع**: **نظائر** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | &quot;نظائر&quot; هو **جمع تكسير**، وليس جمعًا سالمًا.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | وزن الجمع: **فَعَائِل** (مثل: رسائل، حدائق، كنائس). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: General semantic meaning of نظير in Arabic (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the non-scientific, general lexical meaning of the word 'نظير' as an equivalent or counterpart.

Accuracy: **accurate**. The lexical definition of 'نظير' as something matching or equivalent is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### 2. معنى الكلمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | **النظير** = الشيء المشابه أو المماثل أو المكافئ لشيء آخر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Illustrative sentence: peer student in intelligence (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "- هذا الطالب **نظير** زميله في الذكاء والاجتهاد."}]}

Annotation rationale: Provides an illustrative sentence using the singular 'نظير' in the context of academic comparison.

Accuracy: **accurate**. The sentence accurately illustrates the usage of نظير.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **أمثلة توضيحية**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | - هذا الطالب **نظير** زميله في الذكاء والاجتهاد. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Illustrative sentence: matching theoretical framework (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an illustrative sentence using the feminine singular 'نظيرة' to compare theories.

Accuracy: **accurate**. The sentence accurately illustrates the feminine form نظيرة.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | - هذه النظرية **نظيرة** للنظرية التي درسناها سابقًا. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Illustrative sentence: plural students of equal standing (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "- هؤلاء الطلاب **نظائر** في المستوى."}]}

Annotation rationale: Provides an illustrative sentence demonstrating the plural form 'نظائر' applied to people.

Accuracy: **accurate**. The usage demonstrates a valid grammatical plural application.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | وعند الجمع نقول: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - هؤلاء الطلاب **نظائر** في المستوى. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Illustrative sentence: counterpart theories in plural (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an illustrative sentence showing the plural form 'نظائر' applied to abstract entities.

Accuracy: **accurate**. The sentence accurately demonstrates the plural usage.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | - هذه النظريات **نظائر** لبعضها. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Scientific definition of isotopes in chemistry and physics (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes in chemistry as atoms of the same element having the same atomic number (protons) but different mass numbers due to differing neutron counts.

Accuracy: **accurate**. The definition of isotopes is chemically and physically standard and precise.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. الاستخدام العلمي (مهم جدًا في الثانوية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | في مادة الكيمياء والفيزياء، تأخذ كلمة **&quot;نظائر&quot;** معنى خاصًا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | **النظائر** = ذرات لنفس العنصر الكيميائي، لها نفس العدد الذري (عدد البروتونات)، لكن أعداد كتلية مختلفة (بسبب اختلاف عدد النيوترونات). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Hydrogen isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives concrete chemical examples of hydrogen isotopes: protium (H-1), deuterium (H-2), and tritium (H-3).

Accuracy: **accurate**. The listed isotopes of hydrogen and their common names are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | **أمثلة شائعة**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | - **نظائر الهيدروجين**: هيدروجين-1، هيدروجين-2 (ديوتيريوم)، هيدروجين-3 (تريتيوم). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Carbon isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists concrete examples of carbon isotopes: carbon-12, carbon-13, and carbon-14.

Accuracy: **accurate**. The listed carbon isotopes are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | - **نظائر الكربون**: كربون-12، كربون-13، كربون-14. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Uranium isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists common isotopes of uranium: uranium-235 and uranium-238.

Accuracy: **accurate**. The listed uranium isotopes are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | - **نظائر اليورانيوم**: يورانيوم-235، يورانيوم-238. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Linguistic distinction between نظائر and نظراء (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p24", "quote": "- **نظائر**: تستخدم غالبًا في المعنى العلمي (النظائر الكيميائية) وفي معنى \"المماثل\"."}, {"passage_id": "p25", "quote": "- **نظراء**: تستخدم أكثر في معنى \"الأقران\" أو \"المتساوون في المكانة\"، مثل: \"هؤلاء نظراء في السن والمستوى\"."}]}

Annotation rationale: Qualifies the proper contextual usage of the two plurals of 'نظير': 'نظائر' for scientific/counterpart contexts versus 'نظراء' for human peers.

Accuracy: **accurate**. The distinction between نظائر and نظراء in contemporary and classical Arabic usage is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### 4. ملاحظة لغوية إضافية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | لكلمة &quot;نظير&quot; جمعان: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | - **نظائر**: تستخدم غالبًا في المعنى العلمي (النظائر الكيميائية) وفي معنى &quot;المماثل&quot;. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p25 | - **نظراء**: تستخدم أكثر في معنى &quot;الأقران&quot; أو &quot;المتساوون في المكانة&quot;، مثل: &quot;هؤلاء نظراء في السن والمستوى&quot;. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

## u12: Summary of grammatical and scientific definitions (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick bulleted summary reinforcing the linguistic form, general meaning, and chemistry definition, followed by a closing pedagogical prompt.

Accuracy: **accurate**. The recap correctly summarizes the key points.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### ملخص سريع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | - **نظير** ← **نظائر** (جمع تكسير على وزن فَعَائِل). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p28 | - في اللغة العامة = المماثل والمشابه. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p29 | - في الكيمياء = ذرات نفس العنصر بأعداد نيوترونات مختلفة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p30 | هل تريد أمثلة إضافية من المنهج أو تمارين على استخدام الكلمة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

