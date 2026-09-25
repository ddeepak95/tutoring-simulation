# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the prompt's inquiry about the Arabic term 'نظائر' (isotopes), covering both its Arabic linguistic morphology/meaning and its core scientific definition, characteristics, and examples in chemistry.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 29,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 29,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 3,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Linguistic origin, meaning, and morphology of 'nazā'ir' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the linguistic aspect of the word 'نظائر', including its singular forms (نظير / نظيرة), definitions, illustrative contextual usages in Arabic, and morphological categorization as a broken plural on the pattern 'فعائل'.

Accuracy: **accurate**. The morphological weight (فعائل), singular forms (نظير / نظيرة), and semantic definitions of 'نظير' are linguistically accurate in Arabic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بني في فصلي. سؤالك ممتاز ويدل على شغفك باللغة؛ فكلمة **&quot;نَظَائِر&quot;** من الكلمات الجميلة التي تلتقي فيها براعة اللغة العربية مع المفاهيم العلمية التي تدرسها في المرحلة الثانوية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | دعنا نقسم شرحها إلى جانبين: **لغوي** و**علمي**، لتستوعبها تماماً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### أولاً: الجانب اللغوي (في معجم لغتنا الجميلة) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. **المفرد:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 |    * مفردها: **نَظِير** (للمذكر) أو **نَظِيرَة** (للمؤنث). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **المعنى:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |    * النَّظِير هو: **الشَّبِيه، والمَثِيل، والمُسَاوِي**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 |    * نقول في لغتنا: *&quot;هذا عالمٌ لا نَظِيرَ له&quot;*، أي لا مثيل له ولا شبيه له في علمه. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 |    * ونقول: *&quot;الدولتان وقّعتا اتفاقية، بحضور وزير الخارجية ونَظِيرِه في الدولة الأخرى&quot;*، أي من يشغل نفس منصبه ومكانته. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 3. **نوع الجمع:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |    * هو **جمع تكسير** (على وزن: **فَعَائِل**). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Scientific definition and periodic table placement of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p18", "quote": "مثل الإخوة التوائم الذين يتشابهون في الشكل والصفات الأساسية، لكن وزن أحدهم يختلف قليلاً عن الآخر!"}]}

Annotation rationale: Provides the formal chemistry definition of isotopes (atoms of the same element with identical atomic numbers but different mass numbers due to differing neutron counts) and explains why they share chemical properties and position in the periodic table.

Accuracy: **accurate**. The scientific definition of isotopes and the rationale behind their name and shared chemical behavior are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### ثانياً: الجانب العلمي (في الكيمياء والفيزياء - Isotopes) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | بما أنك في المرحلة الثانوية، فمن المؤكد أنك قابلت كلمة &quot;النظائر&quot; في منهج الكيمياء أو الفيزياء. فما هي؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | * **تعريف النظائر علمياً:** هي ذرات **لنفس العنصر الكيميائي**، تتشابه في **العدد الذري** (عدد البروتونات)، لكنها تختلف في **العدد الكتلي** (بسبب اختلاف عدد النيوترونات). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | * **لماذا سُميت نظائر؟**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 |   سُميت كذلك لغوياً لأنها &quot;تتناظر&quot; وتتشابه؛ فهي تشغل **نفس المكان (نفس النظير)** في الجدول الدوري، ولها نفس الخواص الكيميائية تقريباً، مثل الإخوة التوائم الذين يتشابهون في الشكل والصفات الأساسية، لكن وزن أحدهم يختلف قليلاً عن الآخر! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the concept of isotopes using the real-world standard example of hydrogen (protium, deuterium, and tritium) by detailing their subatomic compositions.

Accuracy: **accurate**. The proton and neutron counts for protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n) are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * **مثال توضيحي:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |   عنصر **الهيدروجين** له نظائر أشهرها: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 |   1. الهيدروجين العادي (بروتيوم): بروتون واحد، صفر نيوترون. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 |   2. الديتيريوم: بروتون واحد + نيوترون واحد (أثقل قليلاً، وهو نظير للهيدروجين). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |   3. التريتيوم: بروتون واحد + نيوترونان. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Quick summary of linguistic and scientific definitions (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick bulleted summary reinforcing the key linguistic points and scientific definition of 'نظائر'.

Accuracy: **accurate**. The recap accurately synthesizes the linguistic morphology and the scientific definition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ### خلاصة سريعة تحفظها: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | * **نَظَائِر:** جمع تكسير، مفرده **نَظِير** أو **نَظِيرَة**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | * **معناها العام:** الأشباه والأمثال. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | * **معناها العلمي:** ذرات العنصر الواحد المتفقة في العدد الذري والمختلفة في العدد الكتلي. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | أتمنى أن يكون الشرح واضحاً وسهلاً، وإذا كان لديك أي استفسار آخر في اللغة أو ربطها بالعلوم، فأنا هنا لمساعدتك دائماً يا بطل! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

