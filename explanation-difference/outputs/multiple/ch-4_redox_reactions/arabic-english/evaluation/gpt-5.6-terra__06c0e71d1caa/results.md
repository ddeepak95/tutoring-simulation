# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains redox reactions in Arabic, covering definitions, electron transfer, oxidation states, worked examples, oxidizing/reducing agents, everyday illustrations, and identification methods.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 117,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 2,
    "PROCEDURE": 1
  },
  "nested_passages": 117,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 9,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Redox Reactions and Coupled Electron Transfer (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces redox reactions as electron-transfer processes where oxidation and reduction necessarily occur together.

Accuracy: **accurate**. The definition of redox reactions and the simultaneous nature of oxidation and reduction are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## ما هي تفاعلات الأكسدة والاختزال؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | تفاعلات **الأكسدة والاختزال**، وتسمّى أيضًا **تفاعلات ريدوكس (Redox)**، هي تفاعلات كيميائية يحدث فيها **انتقال للإلكترونات** بين المواد المتفاعلة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | لا تحدث الأكسدة وحدها ولا الاختزال وحده؛ بل يجب أن يحدثا معًا: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | - مادة **تفقد إلكترونات** → تتأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - مادة **تكتسب إلكترونات** → تُختزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition and Mechanism of Oxidation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains oxidation in terms of electron loss and increase in oxidation state, illustrated with magnesium.

Accuracy: **accurate**. Oxidation is correctly defined as the loss of electrons and an increase in oxidation number, accurately illustrated using Mg.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## 1. الأكسدة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | **الأكسدة** هي:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | &gt; فقدان المادة للإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | مثال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p12 | \mathrm{Mg \rightarrow Mg^{2+} + 2e^-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p13 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p14 | في هذا المثال، ذرة المغنيسيوم فقدت إلكترونين، لذلك تأكسدت. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | يمكن أيضًا معرفة الأكسدة من خلال **عدد التأكسد**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | &gt; الأكسدة = زيادة عدد التأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | فالمغنيسيوم في حالته العنصرية عدد تأكسده \(0\)، ثم أصبح في الأيون \(Mg^{2+}\) وعدد تأكسده \(+2\). إذن زاد عدد تأكسده، أي تأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Definition and Mechanism of Reduction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains reduction in terms of electron gain and decrease in oxidation state, illustrated with chlorine.

Accuracy: **accurate**. Reduction is accurately defined as electron gain and a decrease in oxidation number, correctly exemplified using Cl2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## 2. الاختزال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | **الاختزال** هو:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | &gt; اكتساب المادة للإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | مثال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p24 | \mathrm{Cl_2 + 2e^- \rightarrow 2Cl^-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p26 | تكتسب ذرات الكلور إلكترونات، ولذلك تُختزل. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | وباستخدام عدد التأكسد: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p28 | &gt; الاختزال = نقصان عدد التأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | فالكلور في \(Cl_2\) عدد تأكسده \(0\)، ثم أصبح في \(Cl^-\) وعدد تأكسده \(-1\). أي انخفض عدد تأكسده، إذن اختُزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Complete Worked Example: Reaction of Magnesium with Chlorine (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the synthesis of magnesium chloride step-by-step: oxidation state determination, half-reactions, and identification of the reducing and oxidizing agents.

Accuracy: **accurate**. The reaction equations, oxidation state assignments, half-reactions, and identification of Mg as reducing agent and Cl2 as oxidizing agent are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## 3. مثال كامل على تفاعل ريدوكس | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | لنأخذ التفاعل الآتي: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p34 | \mathrm{Mg + Cl_2 \rightarrow MgCl_2} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p36 | ### الخطوة الأولى: تحديد أعداد التأكسد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | - \(Mg\) في صورته العنصرية: عدد التأكسد = \(0\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p38 | - \(Cl_2\) في صورته العنصرية: عدد التأكسد = \(0\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p39 | - في \(MgCl_2\): | EXAMPLE | {} | [&#x27;list&#x27;] |
| p40 |   - المغنيسيوم: \(Mg^{2+}\) → عدد التأكسد \(+2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p41 |   - الكلور: \(Cl^-\) → عدد التأكسد \(-1\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p42 | ### ماذا حدث؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | - المغنيسيوم: من \(0\) إلى \(+2\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 |   إذن **تأكسد** وفقد إلكترونين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p46 | \mathrm{Mg \rightarrow Mg^{2+} + 2e^-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p48 | - الكلور: من \(0\) إلى \(-1\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p49 |   إذن **اختُزل** واكتسب إلكترونين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p50 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p51 | \mathrm{Cl_2 + 2e^- \rightarrow 2Cl^-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p60 | في المثال السابق، المغنيسيوم \(Mg\) هو **العامل المختزِل** لأنه أعطى إلكترونات للكلور. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p65 | في المثال السابق، الكلور \(Cl_2\) هو **العامل المؤكسِد** لأنه أخذ إلكترونات من المغنيسيوم. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Definitions and Rules of Oxidizing and Reducing Agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines reducing agents and oxidizing agents conceptually, detailing their electron action and what happens to them, reinforced by a reference table.

Accuracy: **accurate**. The definitions and complementary roles of oxidizing and reducing agents are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## 4. العامل المؤكسِد والعامل المختزِل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | في تفاعلات ريدوكس توجد مادتان مهمتان: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p56 | ### العامل المختزِل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | هو المادة التي **تعطي إلكترونات** لمادة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p58 | - هو نفسه يتأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p59 | - لأنه يجعل المادة الأخرى تختزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p61 | ### العامل المؤكسِد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | هو المادة التي **تأخذ إلكترونات** من مادة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p63 | - هو نفسه يُختزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p64 | - لأنه يجعل المادة الأخرى تتأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p66 | ### قاعدة مهمة جدًا | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p67 | &#124; المادة &#124; ماذا تفعل؟ &#124; ماذا يحدث لها؟ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p68 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p69 | &#124; العامل المختزِل &#124; يمنح إلكترونات &#124; يتأكسد &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p70 | &#124; العامل المؤكسِد &#124; يستقبل إلكترونات &#124; يُختزل &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p71 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Mnemonic Device: OIL RIG (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the OIL RIG mnemonic (Oxidation Is Loss, Reduction Is Gain) and its Arabic equivalent to aid memorization.

Accuracy: **accurate**. The OIL RIG mnemonic is standard and accurately transcribed and translated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p72 | ## 5. طريقة سهلة للحفظ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p73 | يمكن حفظ القاعدة التالية: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p74 | - **الأكسدة = فقد إلكترونات** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p75 | - **الاختزال = اكتساب إلكترونات** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p76 | وبالإنجليزية توجد عبارة مشهورة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p77 | &gt; **OIL RIG**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p78 | &gt; Oxidation Is Loss   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p79 | &gt; Reduction Is Gain | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p80 | أي: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p81 | &gt; الأكسدة فقد، والاختزال كسب. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p82 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Everyday Example: Rusting of Iron (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p83", "quote": "## 6. مثال من الحياة اليومية: صدأ الحديد"}, {"passage_id": "p84", "quote": "عندما يصدأ الحديد، يتفاعل مع الأكسجين والماء. الحديد يفقد إلكترونات ويتحول إلى أيونات الحديد، لذلك فهو يتأكسد."}]}

Annotation rationale: Illustrates a real-life redox reaction using the rusting of iron in the presence of oxygen and water.

Accuracy: **accurate**. The simplified description of iron oxidation and oxygen reduction during rust formation is conceptually and factually correct for introductory chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p83 | ## 6. مثال من الحياة اليومية: صدأ الحديد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p84 | عندما يصدأ الحديد، يتفاعل مع الأكسجين والماء. الحديد يفقد إلكترونات ويتحول إلى أيونات الحديد، لذلك فهو يتأكسد. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p85 | بصورة مبسطة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p86 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p87 | \mathrm{Fe \rightarrow Fe^{3+} + 3e^-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p89 | أما الأكسجين فيكتسب الإلكترونات، لذلك يُختزل. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p90 | إذن صدأ الحديد مثال شائع على تفاعل أكسدة واختزال. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p91 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Step-by-Step Procedure to Identify a Redox Reaction (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a reusable 5-step procedure to determine whether a given chemical reaction is a redox reaction.

Accuracy: **accurate**. The procedural steps for identifying redox reactions via tracking oxidation states are methodologically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p92 | ## 7. كيف أتعرف إلى تفاعل ريدوكس؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | اتبع هذه الخطوات: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p94 | 1. اكتب أعداد التأكسد للعناصر في المتفاعلات والنواتج. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p95 | 2. ابحث عن عنصر تغيّر عدد تأكسده. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p96 | 3. إذا زاد عدد التأكسد → حدثت أكسدة. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p97 | 4. إذا نقص عدد التأكسد → حدث اختزال. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p98 | 5. إذا حدثت أكسدة واختزال معًا → التفاعل ريدوكس. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p99 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Additional Worked Example: Zinc and Copper Ion Reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked displacement redox reaction between Zn and Cu2+, showing oxidation states and identifying oxidized/reduced species and agents.

Accuracy: **accurate**. The reaction analysis of Zn + Cu2+ -> Zn2+ + Cu correctly identifies changes in oxidation numbers and appropriately designates Zn as the reducing agent and Cu2+ as the oxidizing agent.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | ## مثال إضافي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p101 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p102 | \mathrm{Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p104 | - الزنك \(Zn\): من \(0\) إلى \(+2\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p105 |   → تأكسد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p106 | - النحاس \(Cu^{2+}\): من \(+2\) إلى \(0\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p107 |   → اختُزل. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p108 | إذن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p109 | - الزنك هو **العامل المختزِل**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p110 | - أيون النحاس \(Cu^{2+}\) هو **العامل المؤكسِد**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p111 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Summary of Redox Core Concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the lesson, including definitions of redox, oxidation, reduction, and the corresponding agents.

Accuracy: **accurate**. The recap succinctly and accurately summarizes all primary principles taught in the response.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p112 | ## خلاصة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p113 | - تفاعل ريدوكس هو تفاعل يحدث فيه انتقال للإلكترونات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p114 | - **الأكسدة:** فقد إلكترونات وزيادة عدد التأكسد. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p115 | - **الاختزال:** اكتساب إلكترونات ونقصان عدد التأكسد. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p116 | - المادة التي تتأكسد تسمى **عاملًا مختزِلًا**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p117 | - المادة التي تُختزل تسمى **عاملًا مؤكسِدًا**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

