# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains isotopes in Arabic, covering the definition, atomic structure (protons and neutrons), carbon isotope examples, chemical and physical properties, practical applications, and a summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 44,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 44,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 7,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of identical cars with different cargo weights (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "### أولاً: لنتخيل هذا المثال من حياتنا اليومية 🚗"}, {"passage_id": "p5", "quote": "تخيل أن لديك سيارتين من نفس الموديل واللون والشركة المصنعة (مثلاً: سيارتان تويوتا كورولا بيضاء)."}]}

Annotation rationale: Uses a car analogy from daily life to illustrate that isotopes are the same entity/element with identical outer identity but differing in weight.

Accuracy: **accurate**. The analogy correctly represents the concept of identical chemical identity with different mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم. اعتبرني معلمك الخاص اليوم، وسنبسط الأمر تماماً كما نفعل في الحصة. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | موضوعنا اليوم هو **&quot;النظائر&quot; (Isotopes)**، وهي واحدة من أمتع الأفكار في الكيمياء والفيزياء. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### أولاً: لنتخيل هذا المثال من حياتنا اليومية 🚗 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | تخيل أن لديك سيارتين من نفس الموديل واللون والشركة المصنعة (مثلاً: سيارتان تويوتا كورولا بيضاء).  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | السيارة الأولى فارغة، بينما السيارة الثانية وضعنا في صندوقها الخلفي حقائب سفر ثقيلة جداً. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | * هل تغير نوع السيارة؟ **لا، ما زالت تويوتا كورولا.** | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | * هل تغير شكلها الخارجي؟ **لا.** | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | * ما الذي تغير؟ **وزنها فقط!** | ANALOGY | {} | [&#x27;list&#x27;] |
| p10 | هذا بالضبط ما يحدث في **النظائر**! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Scientific definition of isotopes and subatomic particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes and explains the roles of protons, electrons, and neutrons in determining atomic number, chemical reactivity, and mass number.

Accuracy: **accurate**. The explanation of subatomic particles and the formal definition of isotopes are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ### ثانياً: ما هي النظائر علمياً؟ 🔬 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | في الكيمياء، النظائر هي بمثابة **&quot;الإخوة التوائم&quot;** للذرات: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | &gt; **النظائر هي ذرات لنفس العنصر الكيميائي، لها نفس عدد البروتونات، ولكنها تختلف في عدد النيوترونات.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | لكي نفهمها بعمق، تذكر مكونات الذرة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | 1. **البروتونات ($P^+$):** هي &quot;بطاقة الهوية&quot; للعنصر، مستحيل أن تتغير! إذا تغير عدد البروتونات، يتغير العنصر تماماً. (تحدد **العدد الذري**). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | 2. **الإلكترونات ($e^-$):** تدور حول النواة وهي المسؤولة عن التفاعلات الكيميائية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | 3. **النيوترونات ($N^0$):** جزيئات متعادلة تعيش داخل النواة، **وهنا يكمن السر!** هذه النيوترونات يمكن أن يزيد عددها أو ينقص في نفس العنصر، مما يغير وزن الذرة فقط (يغير **العدد الكتلي**). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Carbon isotopes comparison (Carbon-12 vs. Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "(هذا هو الكربون الطبيعي الهادئ الموجود في جسمك وفي قلم الرصاص)."}]}

Annotation rationale: Illustrates the concept of isotopes using real-world carbon isotopes, showing their exact numbers of protons and neutrons and resulting masses.

Accuracy: **accurate**. The proton and neutron counts and mass numbers for carbon-12 and carbon-14 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p20 | ### ثالثاً: أشهر مثال في الثانوية (عائلة الكربون) ✏️ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | الكربون هو العنصر الأساسي للحياة، وله نظائر شهيرة، دعنا نقارن بين اثنين منها: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | 1. **كربون-12 ($^{12}\text{C}$):** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 |    * لديه: 6 بروتونات + **6 نيوترونات** = كتلته 12. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 |    * (هذا هو الكربون الطبيعي الهادئ الموجود في جسمك وفي قلم الرصاص). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | 2. **كربون-14 ($^{14}\text{C}$):** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 |    * لديه: 6 بروتونات + **8 نيوترونات** = كتلته 14. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 |    * لاحظ! عدد البروتونات لم يتغير (6)، لكن زاد نيوترونان فأصبح أثقل، وأصبح &quot;مشعاً&quot;. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Chemical vs. physical behavior of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share the same chemical properties (same electron configuration) while differing in physical properties (mass, density, nuclear stability).

Accuracy: **accurate**. Correctly states that chemical behavior is governed by electrons, leading to identical chemical reactivity, while physical properties differ due to mass differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | ### رابعاً: سؤال ذكي يسأله طلاب الثانوية دائماً 🤔 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | **هل تتفاعل النظائر كيميائياً بنفس الطريقة؟** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | * **الجواب: نعم، تماماً!**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | لأن التفاعلات الكيميائية تعتمد على **الإلكترونات**، والنظائر لها نفس عدد الإلكترونات. كربون-12 يتفاعل مع الأكسجين لينتج $CO_2$، وكربون-14 سيتفاعل أيضاً وينتج $CO_2$. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p33 | * **أين الاختلاف إذن؟** الاختلاف يكون في **الخواص الفيزيائية** فقط (مثل الكتلة، الكثافة، وبعضها يكون مستقراً وبعضها غير مستقر ويُصدر إشعاعات). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Medical applications of isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of radioisotopes like iodine-131 in medicine for diagnosing and treating thyroid diseases and cancer.

Accuracy: **accurate**. Iodine-131 is accurately cited as a medical isotope used for thyroid treatment and imaging.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ### خامساً: لماذا ندرس النظائر؟ وما فائدتها للبشرية؟ 🌍 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | النظائر ليست مجرد نظريات في الكتب، بل تُنقذ أرواحاً وتكشف أسراراً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p37 | 1. **في الطب:** نستخدم نظائر مشعة (مثل نظير اليود-131) لعلاج وتشخيص أمراض الغدة الدرقية، ونظائر أخرى لتدمير الخلايا السرطانية. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Archaeological and historical dating using Carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Discusses radiometric dating using carbon-14, but applies it erroneously to 50-million-year-old dinosaur fossils.

Accuracy: **contains_error**. Carbon-14 dating has a half-life of 5,730 years and can only date organic materials up to approximately 50,000 to 60,000 years old. It cannot be used to date dinosaur fossils that are 50 million years old; other radiometric methods (e.g., uranium-lead or potassium-argon) are required.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | 2. **في التاريخ والآثار:** هل تساءلت يوماً كيف يعرف العلماء أن هذا الهيكل العظمي للديناصور عمره 50 مليون سنة؟ عن طريق قياس نسبة (كربون-14) المتبقية فيه! | EXAMPLE | {} | [&#x27;list&#x27;] |

Error (major; p38): The passage claims that scientists date a 50-million-year-old dinosaur skeleton by measuring the remaining carbon-14 in it.

Correction: Carbon-14 dating is only effective up to about 50,000 to 60,000 years. Dating ancient geological fossils such as dinosaurs (tens of millions of years old) relies on other radiometric methods, such as potassium-argon or uranium-lead dating of surrounding rock layers.

## u7: Energy application of uranium isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of uranium isotopes as fuel in nuclear reactors for electricity generation.

Accuracy: **accurate**. The use of uranium isotopes for nuclear power generation is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | 3. **في الطاقة:** نستخدم نظائر اليورانيوم كوقود في المفاعلات النووية لتوليد الكهرباء. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Summary and practice offer (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key rules governing isotopes in two bullet points and invites the student to practice.

Accuracy: **accurate**. The recap accurately synthesizes the core principles of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p41 | ### الملخص في سطرين 📝: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | * **نفس عدد البروتونات** = نفس العنصر = نفس الخواص الكيميائية. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p43 | * **اختلاف عدد النيوترونات** = كتلة مختلفة = **نظائر**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p44 | أتمنى أن تكون الفكرة واضحة تماماً الآن! هل تود أن نجرب حل مسألة حسابية صغيرة معاً لحساب عدد نيوترونات أحد النظائر؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

