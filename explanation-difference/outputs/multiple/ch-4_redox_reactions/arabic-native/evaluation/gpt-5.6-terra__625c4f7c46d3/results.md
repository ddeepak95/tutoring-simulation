# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response thoroughly explains redox reactions for high school chemistry in Arabic, covering electron transfer, definitions of oxidation and reduction, oxidizing and reducing agents, oxidation numbers, worked examples, everyday applications, and historical/organic definitions.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 145,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "STUDY_SUPPORT": 2,
    "EXAMPLE": 6,
    "PROCEDURE": 1
  },
  "nested_passages": 145,
  "unique_subtopics": 14,
  "contextualization": {
    "none": 11,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definitions of redox, oxidation, and reduction (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines redox reactions as electron transfer and provides straightforward definitions of oxidation as loss of electrons and reduction as gain of electrons.

Accuracy: **accurate**. Correctly defines redox, oxidation (loss of electrons), and reduction (gain of electrons).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | تفاعلات **الأكسدة والاختزال** (Redox) هي تفاعلات كيميائية يحدث فيها **انتقال للإلكترونات** بين المواد المتفاعلة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | - **الأكسدة**: فقدان الإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **الاختزال**: اكتساب الإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Memory aids and OIL RIG mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an Arabic memory summary and the classic English mnemonic OIL RIG (Oxidation Is Loss, Reduction Is Gain).

Accuracy: **accurate**. The OIL RIG mnemonic and corresponding Arabic memory rules are standard and completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | قاعدة سهلة للحفظ: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p6 | &gt; **أكسدة = فقد إلكترونات**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p7 | &gt; **اختزال = اكتساب إلكترونات** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p8 | بالإنجليزية يمكن تذكّرها بعبارة:   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p9 | **OIL RIG**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p10 | Oxidation Is Loss   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p11 | Reduction Is Gain | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Simultaneity of oxidation and reduction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the complementary nature of redox reactions: one substance cannot lose electrons unless another substance accepts them.

Accuracy: **accurate**. Accurately explains that electron conservation dictates oxidation and reduction occur concurrently.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## لماذا يحدثان معًا؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | لا يمكن لمادة أن تفقد إلكترونات إلا إذا أخذتها مادة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | لذلك في أي تفاعل أكسدة واختزال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | - مادة **تفقد** إلكترونات ← تتأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | - مادة **تكتسب** هذه الإلكترونات ← تختزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Reaction of magnesium with oxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the reaction of Mg with O2, writing the full equation, the half-reactions, and identifying the oxidized/reduced species and the oxidizing/reducing agents.

Accuracy: **accurate**. The chemical reactions, half-reactions, and assignment of oxidation, reduction, reducing agent, and oxidizing agent are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## مثال بسيط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | عند تفاعل المغنيسيوم مع الأكسجين: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | ### ماذا يحدث؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | - المغنيسيوم \(Mg\) يفقد إلكترونات ويتحول إلى أيون موجب: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p27 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | إذن المغنيسيوم **تأكسد**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | - الأكسجين يكتسب إلكترونات ويتحول إلى أيون سالب: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p32 | O_2 + 4e^- \rightarrow 2O^{2-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | إذن الأكسجين **اختُزل**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | في المثال السابق:   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | المغنيسيوم عامل مختزِل لأنه أعطى إلكترونات للأكسجين. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | في المثال السابق:   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | الأكسجين عامل مؤكسِد لأنه أخذ إلكترونات من المغنيسيوم. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Definitions of oxidizing and reducing agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidizing agent and reducing agent conceptually, explaining the inversion (the reducing agent is oxidized; the oxidizing agent is reduced), summarized in a table.

Accuracy: **accurate**. Accurately defines reducing and oxidizing agents and their relation to being oxidized and reduced.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | ## العامل المؤكسِد والعامل المختزِل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | هناك مصطلحان مهمان جدًا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p38 | ### 1. العامل المختزِل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | هو المادة التي **تعطي إلكترونات** لمادة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | - هو يجعل المادة الأخرى تختزل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p41 | - لكنه هو نفسه **يتأكسد**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p44 | ### 2. العامل المؤكسِد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | هو المادة التي **تأخذ إلكترونات** من مادة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | - هو يجعل المادة الأخرى تتأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p47 | - لكنه هو نفسه **يُختزل**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p50 | ### ملخص مهم | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | &#124; المادة &#124; ماذا تفعل بالإلكترونات؟ &#124; ماذا يحدث لها؟ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p52 | &#124;---&#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p53 | &#124; العامل المختزِل &#124; يعطي إلكترونات &#124; يتأكسد &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p54 | &#124; العامل المؤكسِد &#124; يأخذ إلكترونات &#124; يختزل &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Oxidation numbers and their rule in redox (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidation numbers and explains the rule that an increase corresponds to oxidation and a decrease corresponds to reduction.

Accuracy: **accurate**. The definition of oxidation state and the criteria relating change in oxidation state to oxidation/reduction are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | # أعداد التأكسد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | لمعرفة هل حدثت أكسدة أو اختزال، نستخدم **عدد التأكسد**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p58 | عدد التأكسد هو رقم يوضح الشحنة الظاهرية للعنصر في المركب. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p59 | ## القاعدة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p60 | - إذا **زاد عدد التأكسد** → أكسدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p61 | - إذا **قل عدد التأكسد** → اختزال. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction of zinc with copper sulfate (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the displacement redox reaction between zinc and copper(II) sulfate using oxidation numbers and half-reactions.

Accuracy: **accurate**. The net ionic reaction, oxidation state shifts, and half-reactions are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | ## مثال: تفاعل الزنك مع كبريتات النحاس | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p65 | Zn + CuSO_4 \rightarrow ZnSO_4 + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p67 | يمكن كتابة الجزء المهم هكذا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p69 | Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p71 | نقارن أعداد التأكسد: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p72 | - الزنك \(Zn\): كان \(0\)، وأصبح \(+2\).   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p73 |   إذن عدد تأكسده زاد → **تأكسد**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p74 | - النحاس \(Cu^{2+}\): كان \(+2\)، وأصبح \(0\).   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p75 |   إذن عدد تأكسده قل → **اختُزل**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | ### أنصاف التفاعلات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p77 | الأكسدة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p78 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p79 | Zn \rightarrow Zn^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p81 | الاختزال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p82 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p83 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p85 | الإلكترونات التي يفقدها الزنك هي نفسها التي يكتسبها النحاس. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p86 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Everyday example: Iron rusting (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p87", "quote": "# الأكسدة والاختزال في حياتنا اليومية"}, {"passage_id": "p88", "quote": "## 1. صدأ الحديد"}]}

Annotation rationale: Illustrates redox reactions in everyday life via the rusting of iron.

Accuracy: **accurate**. Accurately identifies iron rusting as a redox process where iron is oxidized and oxygen is reduced.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p87 | # الأكسدة والاختزال في حياتنا اليومية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p88 | ## 1. صدأ الحديد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | عندما يتفاعل الحديد مع الأكسجين والماء يتكون الصدأ. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p90 | - الحديد يتأكسد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p91 | - الأكسجين يختزل. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p92 | ولهذا فإن طلاء الحديد أو تغطيته بالزنك يساعد على حمايته من الصدأ. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u9: Everyday example: Fuel combustion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p93", "quote": "## 2. احتراق الوقود"}]}

Annotation rationale: Illustrates redox in everyday life via methane combustion.

Accuracy: **accurate**. The combustion equation for methane and the identification of carbon being oxidized and oxygen being reduced are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | ## 2. احتراق الوقود | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | عند احتراق غاز الميثان مثلًا: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p96 | CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p98 | - الكربون في الميثان يتأكسد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p99 | - الأكسجين يختزل. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Everyday example: Electrochemical batteries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p100", "quote": "## 3. البطاريات"}]}

Annotation rationale: Illustrates redox in everyday life through battery operation generating electric current via electron transfer.

Accuracy: **accurate**. Accurately describes how batteries generate an electric current via redox reactions at electrodes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | ## 3. البطاريات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p101 | البطاريات تعمل بسبب تفاعلات أكسدة واختزال: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p102 | - مادة تفقد إلكترونات عند أحد القطبين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p103 | - الإلكترونات تنتقل عبر الدائرة الكهربائية. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p104 | - مادة أخرى تستقبل الإلكترونات عند القطب الآخر. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p105 | وهذا الانتقال يولد تيارًا كهربائيًا. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p106 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Redox defined by oxygen, hydrogen, and electrons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts the historical definitions based on gaining/losing oxygen and hydrogen (commonly used in organic chemistry) with the modern electron/oxidation state definition.

Accuracy: **accurate**. Accurately describes both the historical and organic conventions involving oxygen/hydrogen addition and removal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p107 | # علاقة الأكسدة بالأكسجين والهيدروجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p108 | قديمًا كانت الأكسدة تُعرَّف بأنها اتحاد المادة مع الأكسجين، مثل: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p109 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p110 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p112 | والاختزال كان يعني إزالة الأكسجين من المادة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p113 | لكن التعريف الأدق والأوسع هو: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p114 | - الأكسدة: فقد إلكترونات أو زيادة عدد التأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p115 | - الاختزال: اكتساب إلكترونات أو انخفاض عدد التأكسد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p116 | وفي كثير من التفاعلات العضوية: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p117 | - إضافة الأكسجين غالبًا تعني أكسدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p118 | - إزالة الهيدروجين غالبًا تعني أكسدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p119 | - إضافة الهيدروجين غالبًا تعني اختزال. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p120 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Steps to identify redox in an equation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a step-by-step procedure to determine whether a reaction is redox and identify the oxidizing/reducing agents.

Accuracy: **accurate**. The procedural algorithm for analyzing redox equations is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p121 | # خطوات تحديد الأكسدة والاختزال في أي معادلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p122 | 1. اكتب أعداد التأكسد للعناصر المهمة. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p123 | 2. قارن عدد التأكسد قبل التفاعل وبعده. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p124 | 3. حدد العنصر الذي زاد عدد تأكسده: تأكسد. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p125 | 4. حدد العنصر الذي قل عدد تأكسده: اختزال. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p126 | 5. حدد العامل المؤكسد والعامل المختزل. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p127 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Practice example: Reaction of sodium with chlorine (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the reaction between sodium and chlorine to form NaCl using oxidation states.

Accuracy: **accurate**. The equation, oxidation state assignments, oxidized/reduced elements, and oxidizing/reducing agents are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p128 | ## مثال تدريبي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p129 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p130 | 2Na + Cl_2 \rightarrow 2NaCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p132 | - الصوديوم \(Na\): من \(0\) إلى \(+1\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p133 |   → تأكسد، لأنه فقد إلكترونًا. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p134 | - الكلور \(Cl\): من \(0\) إلى \(-1\)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p135 |   → اختزال، لأنه اكتسب إلكترونًا. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p136 | إذن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p137 | - الصوديوم: عامل مختزِل. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p138 | - الكلور: عامل مؤكسِد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p139 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Summary of redox concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap summarizing the key definitions and takeaways of the topic.

Accuracy: **accurate**. The recap correctly summarizes all core concepts of redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p140 | ## خلاصة سريعة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p141 | - **الأكسدة = فقد إلكترونات = زيادة عدد التأكسد.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p142 | - **الاختزال = اكتساب إلكترونات = انخفاض عدد التأكسد.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p143 | - المادة التي تتأكسد هي **العامل المختزِل**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p144 | - المادة التي تختزل هي **العامل المؤكسِد**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p145 | - الأكسدة والاختزال يحدثان دائمًا معًا في التفاعل نفسه. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

