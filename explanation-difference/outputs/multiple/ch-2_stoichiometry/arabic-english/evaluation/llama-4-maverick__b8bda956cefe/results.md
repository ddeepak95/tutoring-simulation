# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides the definition of stoichiometry, explains the law of conservation of mass in chemical reactions, and gives step-by-step procedures and worked examples for balancing chemical equations.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 61,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 3,
    "PROCEDURE": 1
  },
  "nested_passages": 61,
  "unique_subtopics": 2,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 4,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry and conservation of atoms in chemical equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what stoichiometry is and the underlying principle of atom conservation in balanced chemical equations.

Accuracy: **accurate**. The definition of stoichiometry and the explanation of atom conservation and balanced molar quantities are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | القياس المتكافئ أو حساب العناصر المتفاعلة أو الموزونة أو المتكافئة (بالإنجليزية: Stoichiometry)‏ هو فرع من فروع الكيمياء والهندسة الكيميائية الذي يتعامل مع كميات المواد التي تتفاعل أو تنتج في التفاعل الكيميائي. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | يمكن صياغة معادلة التفاعل الكيميائي كتفاعل بين الجزيئات ، ولكن في نفس الوقت يظل عدد الذرات كما هو ، ولهذا يكون عدد الذرات قبل التفاعل مساويا لعدد الذرات بعد التفاعل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | وبناء على ذلك فأن مفهوم المعادلة المتزنة تعني أن عدد الذرات من كل عنصر على طرفي المعادلة متساوي. ولذلك يجب وزن المعادلة الكيميائية ، بمعنى أن نحدد معادلة التفاعل طبقا للكميات المولية الداخلة في التفاعل والكميات المولية الناتجة منه. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Balancing the formation reaction of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked introductory example showing the unbalanced and balanced equations for the reaction of hydrogen and oxygen to form water.

Accuracy: **contains_error**. Passage p7 incorrectly claims that in the unbalanced equation H2 + O2 = H2O, the number of oxygen atoms is equal while the number of hydrogen atoms is different. In reality, hydrogen is equal (2 atoms on each side) and oxygen is unequal (2 on the left vs. 1 on the right).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | مثال توضيحي: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 2 H2 + O2 = 2 H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p6 | معادلة غير موزونة :  H2 + O2 = H2O | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p7 | عدد ذرات الأكسجين على طرفي المعادلة متساوي ، ولكن عدد ذرات الهيدروجين مختلف. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | لوزن المعادلة يجب اختيار معاملات مناسبة للمواد الداخلة والناتجة من التفاعل (كما هو موضح في المعادلة الموزونة الأولى). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | عندئذ يصبح عدد ذرات الهيدروجين 4 في طرفي المعادلة ، وعدد ذرات الأكسجين 2 ، أي أن المعادلة موزونة. | EXAMPLE | {} | [&#x27;prose&#x27;] |

Error (major; p7): The passage states that oxygen atom counts are equal on both sides while hydrogen atom counts are different in the reaction H2 + O2 = H2O, reversing the true atom counts.

Correction: عدد ذرات الهيدروجين على طرفي المعادلة متساوي (ذرتان في كل طرف)، ولكن عدد ذرات الأكسجين مختلف (ذرتان في المتفاعلات وذرة واحدة في النواتج).

## u3: Steps for balancing a chemical equation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a systematic 4-step procedure for balancing any chemical equation.

Accuracy: **accurate**. The outlined steps for balancing chemical equations are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | يمكن وزن معادلة كيميائية بطرق مختلفة ولكن اتباع الطريقة المنظمة يسهل عملية الوزن. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | خطوات وزن المعادلة الكيميائية : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | 1- نكتب المعادلة الكيميائية بدون معاملات بمعنى أننا نكتب الصيغ الكيميائية الصحيحة للمواد المتفاعلة والناتجة من التفاعل. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | 2- نعد ذرات كل عنصر في المواد المتفاعلة والناتجة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 3- نبدأ بوزن العناصر ، واختيار الطريقة المناسبة لوزن المعادلة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | 4- التأكد من أن المعادلة موزونة ، وذلك بأن يكون عدد الذرات متساوي في طرفي المعادلة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Worked example: Balancing the combustion of methane (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step balancing of the methane combustion reaction.

Accuracy: **accurate**. The combustion of methane is correctly counted and balanced step by step, yielding CH4 + 2O2 -> CO2 + 2H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | مثال 1 : وزن معادلة احتراق غاز الميثان. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | المعادلة غير الموزونة :  CH4 + O2 → CO2 + H2O | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p18 | 1- تعد ذرات كل عنصر : الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | C = 1 C = 1 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | H = 4 H = 2 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | O = 2 O = 3 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | 2- نبدأ بالعناصر ، فنلاحظ أن ذرات الكربون متساوية على طرفي المعادلة. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | 3- نبدأ بوزن الهيدروجين ، بضرب (2) في H2O ، تصبح المعادلة : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | CH4 + O2 → CO2 + 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | C = 1 C = 1 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | H = 4 H = 4 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | O = 2 O = 4 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | 4- نزن ذرات الأكسجين ، وذلك بإضافة (2) إلى O2 ، فتصبح المعادلة : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | CH4 + 2O2 → CO2 + 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | C = 1 C = 1 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | H = 4 H = 4 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | O = 4 O = 4 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | 5- التأكد من أن المعادلة موزونة ، عدد الذرات في طرفي المعادلة متساوي. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Worked example: Balancing the combustion of propane (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step balancing of the propane combustion reaction and concludes the explanation.

Accuracy: **accurate**. The combustion of propane is correctly balanced step by step, yielding C3H8 + 5O2 -> 3CO2 + 4H2O, and the atom counts are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | مثال 2 : وزن معادلة احتراق البروبان. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | المعادلة غير الموزونة :  C3H8 + O2 → CO2 + H2O | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p38 | 1- تعد ذرات كل عنصر : الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | C = 3 C = 1 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | H = 8 H = 2 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | O = 2 O = 3 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | 2- نبدأ بالعنصر الأول (C) ، ونزن طرفي المعادلة بضرب (3) في CO2 ، فتصبح المعادلة : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | C3H8 + O2 → 3CO2 + H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | C = 3 C = 3 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p46 | H = 8 H = 2 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | O = 2 O = 7 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | 3- نزن ذرات الهيدروجين بضرب (4) في H2O ، فتصبح المعادلة : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | C3H8 + O2 → 3CO2 + 4H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p51 | C = 3 C = 3 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p52 | H = 8 H = 8 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | O = 2 O = 10 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | 4- نزن ذرات الأكسجين ، علماً بأن ذرات الأكسجين (O2) جزيء ، بضرب (5) في O2 ، فتصبح المعادلة : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p55 | C3H8 + 5O2 → 3CO2 + 4H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | الطرف الأيسر : الطرف الأيمن : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | C = 3 C = 3 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p58 | H = 8 H = 8 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p59 | O = 10 O = 10 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | 5- التأكد من أن المعادلة موزونة ، عدد الذرات في طرفي المعادلة متساوي. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | أتمنى أن أكون قد ساعدتك في فهم القياس المتكافئ بشكل جيد. هل لديك أي أسئلة أخرى؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

