# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains vapour phase refining accurately and comprehensively, discussing its core principle, generalized reaction steps, the Mond process for nickel, the Van Arkel–de Boer process for titanium and zirconium, and the prerequisite conditions for success.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 70,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 70,
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

## u1: Principle and general mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition of vapour phase refining, its underlying scientific principle, and the generalized three-step reaction mechanism using a generic metal M.

Accuracy: **accurate**. Correctly describes the core idea and generalized steps of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **التنقية في الطور البخاري (Vapour Phase Refining)** هي طريقة تُستخدم لتنقية بعض الفلزات للحصول على فلز نقي جداً. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تعتمد هذه الطريقة على حقيقة أن بعض الفلزات يمكن أن تتفاعل مع مادة غازية لتكوين **مركّب متطاير**؛ أي يتحول بسهولة إلى بخار عند درجة حرارة مناسبة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | بعد ذلك: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | 1. نُحوِّل الفلز غير النقي إلى مركب بخاري متطاير. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | 2. نفصل هذا البخار عن الشوائب، لأن معظم الشوائب لا تتحول إلى بخار معه. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | 3. نسخّن المركب البخاري أو نحلله على سطح ساخن. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p8 | 4. يترسب الفلز النقي، بينما تُستعاد المادة الغازية لتُستخدم مرة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p10 | ## خطوات التنقية بشكل عام | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | لنفترض أن لدينا فلزاً غير نقي \(M\): | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | ### 1. تكوين مركب متطاير | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | يتفاعل الفلز غير النقي مع غاز مناسب لتكوين مركب متطاير: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p15 | M + \text{غاز} \rightarrow \text{مركب متطاير للفلز} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p16 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p17 | ### 2. فصل الشوائب | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | المركب المتطاير يتحول إلى بخار وينتقل بعيداً، أما الشوائب فغالباً تبقى في الوعاء لأنها لا تكوّن مركبات متطايرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | ### 3. تحليل المركب المتطاير | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | يمر البخار فوق سطح ساخن، فيتحلل المركب ويترسب الفلز النقي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p22 | \text{مركب متطاير} \xrightarrow{\text{تسخين}} M \text{ نقي} + \text{غاز} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p23 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an industrial illustration of vapour phase refining via the Mond process for nickel, specifying temperature ranges and chemical reactions.

Accuracy: **accurate**. The reaction equations and temperatures (330-350 K for formation of Ni(CO)4 and 450-470 K for its thermal decomposition) are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | # مثال مهم: تنقية النيكل بطريقة موند (Mond Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | تُستخدم هذه الطريقة لتنقية **النيكل**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | ### الخطوة الأولى | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | يتفاعل النيكل غير النقي مع غاز أول أكسيد الكربون عند درجة حرارة منخفضة نسبياً، حوالي \(330 - 350\,K\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | Ni + 4CO \rightarrow Ni(CO)_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | يتكون مركب يسمى **رباعي كربونيل النيكل**: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | Ni(CO)_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | وهو مركب متطاير. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | ### الخطوة الثانية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | يُسخّن هذا البخار إلى درجة حرارة أعلى، حوالي \(450 - 470\,K\)، فيتحلل: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | Ni(CO)_4 \rightarrow Ni + 4CO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | فينتج **نيكل نقي جداً**، بينما يعود غاز أول أكسيد الكربون ويمكن استخدامه من جديد. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel–de Boer process for titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel–de Boer method with iodine, detailing the reactions for titanium.

Accuracy: **accurate**. Correctly describes the Van Arkel–de Boer process for Ti and Zr and provides accurate chemical equations for titanium tetraiodide formation and decomposition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | # مثال آخر: تنقية التيتانيوم والزركونيوم | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | تُستخدم طريقة تسمى **عملية فان أركل – دي بور (Van Arkel–de Boer Process)** لتنقية فلزات مثل: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p46 | - التيتانيوم \(Ti\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p47 | - الزركونيوم \(Zr\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p48 | يتفاعل الفلز غير النقي مع اليود ليكوّن يوديداً متطايراً، ثم يتحلل هذا المركب على سلك ساخن، فيترسب الفلز النقي. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | مثال مبسط للتيتانيوم: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p50 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | Ti + 2I_2 \rightarrow TiI_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | ثم عند التسخين: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | TiI_4 \rightarrow Ti + 2I_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Conditions and requirements for vapour phase refining (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Specifies the conditions and qualifications that must be met for a metal to be refined via the vapour phase technique.

Accuracy: **accurate**. Accurately lists the essential thermodynamic and chemical requirements needed for successful vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ## شروط نجاح هذه الطريقة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | لكي يمكن تنقية فلز بهذه الطريقة، يجب أن: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p60 | - يُكوّن الفلز مركباً **متطايراً** بسهولة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p61 | - يكون هذا المركب قابلاً للتحلل بالتسخين. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p62 | - لا تتحول الشوائب إلى مركبات متطايرة بنفس السهولة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p63 | - يكون الفلز الناتج ثابتاً ونقياً بعد التحلل. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Summary of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap summarizing the primary principle of vapour phase refining and its two most notable applications.

Accuracy: **accurate**. Accurately summarizes the core mechanism and key examples.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ## خلاصة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | التنقية في الطور البخاري تقوم على: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p67 | &gt; **تحويل الفلز غير النقي إلى مركب بخاري متطاير، ثم تحليل هذا المركب للحصول على الفلز النقي.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p68 | وأشهر أمثلتها: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p69 | - تنقية النيكل بطريقة موند باستخدام \(CO\). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p70 | - تنقية التيتانيوم والزركونيوم باستخدام اليود. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

