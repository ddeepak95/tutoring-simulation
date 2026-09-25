# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains stoichiometry for a high school level, covering its definition, key concepts (mole, molar mass, mole ratio), procedural steps, a worked example, and a concluding recap.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 24,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 24,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and foundations of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry as the quantitative study of reactants and products based on the law of conservation of mass and molar relationships.

Accuracy: **accurate**. The definition and foundational principles of stoichiometry (conservation of mass and mole relationships) are described correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | بالطبع، يسعدني أن أشرح الحسابات الكيميائية بطريقة مبسطة ومفهومة لطالب في المرحلة الثانوية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### مقدمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | الحسابات الكيميائية هي جزء أساسي من الكيمياء، وتستخدم لتحديد كميات المواد المتفاعلة والمنتجات في التفاعلات الكيميائية. تعتمد هذه الحسابات على قوانين ومفاهيم كيميائية أساسية، مثل قانون حفظ الكتلة والعلاقات المولية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Fundamental concepts: mole, molar mass, and mole ratio (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the core conceptual tools needed for stoichiometry: the mole with Avogadro's number, molar mass and how to calculate it, and the mole ratio from balanced equations.

Accuracy: **accurate**. The definitions of mole (including Avogadro's number), molar mass, and mole ratio are accurate and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### المفاهيم الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. **المول**: هو وحدة قياس كمية المادة، ويمثل كمية المادة التي تحتوي على عدد أفوجادرو (6.022 × 10^23) من الجسيمات (ذرات، جزيئات، أيونات). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 2. **الكتلة المولية**: هي كتلة مول واحد من المادة، وتقاس بوحدة الغرام/مول. يمكن حسابها بجمع الكتل الذرية لجميع الذرات في الجزيء. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 3. **النسبة المولية**: هي النسبة بين عدد مولات المواد المتفاعلة والمنتجات في معادلة كيميائية متوازنة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Standard methodology for stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a six-step reusable procedure for solving stoichiometry problems, from writing a balanced equation to verifying units.

Accuracy: **accurate**. The procedure presents the correct canonical sequence of steps for stoichiometric problem solving.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### خطوات إجراء الحسابات الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | 1. **كتابة المعادلة الكيميائية**: أولاً، يجب كتابة المعادلة الكيميائية للتفاعل. يجب أن تكون المعادلة متوازنة، أي أن عدد ذرات كل عنصر يجب أن يكون متساويًا على جانبي المعادلة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | 2. **تحديد المعلومات المعطاة**: حدد الكميات المعطاة في المسألة، مثل كتلة أو عدد مولات المواد المتفاعلة أو المنتجات. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 3. **تحويل الوحدات**: إذا لزم الأمر، قم بتحويل الوحدات إلى المول أو الغرام باستخدام الكتلة المولية. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 4. **استخدام النسب المولية**: استخدم المعادلة الكيميائية المتوازنة لتحديد النسب المولية بين المواد المتفاعلة والمنتجات. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | 5. **الحساب**: قم بإجراء الحسابات اللازمة باستخدام النسب المولية والكميات المعطاة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 6. **التحقق من الإجابة**: تأكد من أن الإجابة منطقية ووحداتها مناسبة. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Worked calculation: mass of carbon dioxide from methane combustion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates a complete worked problem: balancing the combustion equation, finding mole ratios, calculating molar mass, and determining product mass.

Accuracy: **accurate**. The reaction equation is balanced, the molar mass calculation for CO2 (44 g/mol) is correct, and the resulting mass calculation (88 g) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### مثال عملي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | لنفترض أننا نريد حساب كتلة ثاني أكسيد الكربون (CO2) الناتجة عن احتراق 2 مول من الميثان (CH4) وفقًا للتفاعل: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | \[ \text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O} \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | 1. **المعادلة متوازنة**: المعادلة أعلاه متوازنة. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | 2. **المعلومات المعطاة**: 2 مول من CH4. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | 3. **النسبة المولية**: من المعادلة، نرى أن 1 مول من CH4 ينتج 1 مول من CO2. لذا، 2 مول من CH4 ستنتج 2 مول من CO2. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | 4. **الكتلة المولية ل CO2**: الكتلة المولية ل CO2 = 12 (لـ C) + 2*16 (لـ O2) = 44 غرام/مول. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | 5. **الحساب**: كتلة CO2 = 2 مول * 44 غرام/مول = 88 غرام. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Summary of stoichiometry concepts and problem-solving tips (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes by summarizing the core concepts and emphasizing balanced equations and proper units.

Accuracy: **accurate**. The summary provides accurate advice and correctly reinforces the foundational ideas.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### الخاتمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | الحسابات الكيميائية تعتمد على فهم المفاهيم الأساسية مثل المول والكتلة المولية والنسب المولية. من خلال اتباع الخطوات المنهجية والمنطقية، يمكن حل المسائل الكيميائية بسهولة ودقة. تذكر دائمًا أن تكتب المعادلات الكيميائية بشكل متوازن وتستخدم الوحدات الصحيحة في حساباتك. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

