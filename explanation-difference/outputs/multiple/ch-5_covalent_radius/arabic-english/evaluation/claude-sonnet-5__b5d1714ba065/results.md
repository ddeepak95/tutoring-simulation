# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of covalent radius in high-school chemistry, providing its definition, formula, worked example, governing factors, periodic table trends, and rationale.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 39,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 39,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two identical bonded atoms and explains how it is determined.

Accuracy: **accurate**. The definition accurately states that covalent radius is half the distance between the nuclei of two identical atoms joined by a single covalent bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # نصف القطر التساهمي (نصف قطر الرابطة التساهمية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## التعريف | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **نصف القطر التساهمي** هو نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية واحدة (بسيطة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | بمعنى آخر: عندما ترتبط ذرتان من نفس العنصر برابطة تساهمية، نقيس المسافة بين نواتيهما، ثم نقسم هذه المسافة على 2، فنحصل على نصف القطر التساهمي لتلك الذرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Diagrammatic representation of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the relationship between the internuclear distance d and the covalent radius (d/2) using an ASCII diagram.

Accuracy: **accurate**. The diagram correctly represents the internuclear bond distance d and defines covalent radius as d / 2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## التوضيح بالرسم | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p7 |         نصف القطر    نصف القطر | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p8 |         التساهمي     التساهمي | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p9 |       ◄────────►  ◄────────► | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p10 |       (⊙)————————————(⊙) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p11 |        نواة        نواة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p12 |        ذرة أ  ← الرابطة →  ذرة ب | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p13 |       ◄────────── d ──────────► | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p14 |       نصف القطر التساهمي = d ÷ 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;, &#x27;equation&#x27;] |
| p15 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Chlorine molecule calculation example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked numerical calculation using the chlorine molecule (Cl2) with a bond distance of 198 pm yielding a covalent radius of 99 pm.

Accuracy: **accurate**. The internuclear distance of 198 pm in Cl2 and the resulting covalent radius of 99 pm are scientifically accurate standard values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## مثال توضيحي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | في جزيء الكلور (Cl₂): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | - المسافة بين نواتي ذرتي الكلور = 198 بيكومتر (pm) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | - نصف القطر التساهمي للكلور = 198 ÷ 2 = **99 بيكومتر** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u4: Factors affecting covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the number of energy levels and effective nuclear charge impact the covalent radius in a tabular format.

Accuracy: **accurate**. Accurately relates covalent radius positively to the number of energy levels and inversely to effective nuclear charge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## العوامل المؤثرة فيه | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | &#124; العامل &#124; التأثير &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p23 | &#124; **عدد مستويات الطاقة** &#124; كلما زاد عدد المستويات، زاد نصف القطر &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124; **الشحنة النووية الفعالة** &#124; كلما زادت، قلّ نصف القطر (جذب أقوى للإلكترونات) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u5: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic trends across periods and down groups, including the underlying reasons (effective nuclear charge vs. addition of electron shells).

Accuracy: **accurate**. Correctly states and explains that covalent radius decreases across a period due to increased effective nuclear charge and increases down a group due to the addition of electron energy levels.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## الاتجاهات في الجدول الدوري | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | 📍 **عبر الدورة (من اليسار إلى اليمين):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | - يقل نصف القطر التساهمي | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | - السبب: زيادة الشحنة النووية مع بقاء عدد المستويات ثابتًا | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p29 | 📍 **عبر المجموعة (من الأعلى إلى الأسفل):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | - يزداد نصف القطر التساهمي | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - السبب: زيادة عدد مستويات الطاقة (المدارات) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Rationale for using covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is measured operationalizing atomic size, noting the wave nature of electrons and the lack of sharp atomic boundaries.

Accuracy: **accurate**. Accurately references the quantum mechanical / wave nature of electrons as the reason isolated atoms lack well-defined physical boundaries.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## لماذا نستخدمه؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | نظرًا لأن الإلكترون له طبيعة موجية (لا يمكن تحديد موقعه بدقة)، فإن الذرة ليس لها حد فاصل واضح. لذلك نلجأ لقياس نصف القطر التساهمي كطريقة عملية ودقيقة لمقارنة أحجام الذرات المختلفة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Quick recap of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key definitions and periodic trends into a concise checklist, concluding with a conversational transition offer.

Accuracy: **accurate**. The recap points accurately reflect the established definition and periodic trends.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## ملخص سريع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | ✅ يُقاس بين ذرتين مرتبطتين برابطة تساهمية | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p36 | ✅ يساوي نصف المسافة بين النواتين | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p37 | ✅ يقل من اليسار لليمين في الدورة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p38 | ✅ يزداد من الأعلى للأسفل في المجموعة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p39 | هل تريد أن أشرح لك الفرق بينه وبين أنصاف الأقطار الأخرى مثل نصف القطر الأيوني أو الفلزي؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

