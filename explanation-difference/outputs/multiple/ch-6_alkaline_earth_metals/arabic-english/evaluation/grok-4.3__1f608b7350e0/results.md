# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and comprehensively explains the alkaline earth metals (Group 2 elements), covering their periodic table identity, physical and chemical properties, characteristic reactions, everyday applications, and comparison with alkali metals.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 32,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 4,
    "CAVEAT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 7,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition, member elements, and etymology of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what alkaline earth metals are, lists all six elements, and explains the reason for their naming.

Accuracy: **accurate**. The definition, list of elements (Be to Ra), and the etymological explanation regarding basic oxides in the earth's crust are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | السلام عليكم يا طالب! اليوم سأشرح لك بطريقة مبسطة ومنظمة عن **الفلزات القلوية الأرضية** (Alkaline Earth Metals)، وهي موضوع مهم في الكيمياء لطلاب المرحلة الثانوية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### ما هي الفلزات القلوية الأرضية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | هي مجموعة من العناصر الكيميائية توجد في **المجموعة الثانية** (Group 2) من الجدول الدوري. تتكون من ستة عناصر رئيسية: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - البريليوم (Be) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - المغنيسيوم (Mg) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - الكالسيوم (Ca) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - السترونتيوم (Sr) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - الباريوم (Ba) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | - الراديوم (Ra) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | سميت بهذا الاسم لأن أكاسيدها تذوب في الماء وتعطي محاليل قلوية (أساسية)، ومعظمها يوجد في قشرة الأرض على شكل معادن. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Electronic configuration and valence ion formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkaline earth metals form +2 cations based on their two outer-shell electrons.

Accuracy: **accurate**. Correctly states that valence shell has 2 electrons and they readily form 2+ cations such as Mg²⁺ and Ca²⁺.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### الخصائص العامة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | 1. **التركيب الإلكتروني**: تحتوي كل ذرة على إلكترونين في مستوى الطاقة الخارجي. لذلك تفقد هذين الإلكترونين بسهولة نسبية لتكوين أيونات موجبة الشحنة (+2)، مثل Mg²⁺ أو Ca²⁺. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Chemical reactivity of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the relative chemical activity of Group 2 metals compared to Group 1, noting why they are less reactive and illustrating reaction rate differences with cold water versus heating.

Accuracy: **accurate**. The explanation comparing reactivity to alkali metals and the reactivity of Ca vs Mg with water is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | 2. **النشاط الكيميائي**: أقل نشاطاً من الفلزات القلوية (المجموعة الأولى) لأنها تحتاج إلى فقدان إلكترونين بدلاً من واحد. لكنها لا تزال تتفاعل مع الأكسجين والماء والأحماض. مثال: يتفاعل الكالسيوم بسرعة مع الماء البارد، بينما يحتاج المغنيسيوم إلى التسخين. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Physical properties of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key physical properties such as luster, conductivity, melting/boiling points, and density.

Accuracy: **accurate**. All listed physical properties and their comparisons to alkali metals are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | 3. **الخصائص الفيزيائية**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 |    - لها لمعان معدني أبيض فضي. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 |    - موصلة جيدة للكهرباء والحرارة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 |    - درجات انصهار وغليان أعلى من الفلزات القلوية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 |    - كثافتها منخفضة نسبياً (لكن أعلى من الفلزات القلوية). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Major chemical reactions of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Surveys the typical reactions of alkaline earth metals with oxygen, water, and halogens.

Accuracy: **accurate**. The reaction statements, chemical equation, and example products (oxides, hydroxides, halides) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | 4. **التفاعلات المهمة**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 |    - مع الأكسجين: تكوّن أكاسيد قلوية مثل 2Mg + O₂ → 2MgO. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p21 |    - مع الماء: تكوّن هيدروكسيدات قلوية (مثل Ca(OH)₂). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 |    - مع الهالوجينات: تكوّن هاليدات مثل MgCl₂. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Applications of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "يُستخدم في سبائك الطائرات والسيارات لخفته، وفي صناعة الألعاب النارية"}]}

Annotation rationale: A real-world illustrative example of how magnesium is used in alloys and pyrotechnics.

Accuracy: **accurate**. Magnesium is indeed used in lightweight alloys for aircraft/automobiles and in fireworks for bright white light.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### الاستخدامات اليومية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | - **المغنيسيوم**: يُستخدم في سبائك الطائرات والسيارات لخفته، وفي صناعة الألعاب النارية (يعطي ضوءاً أبيض ساطعاً). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Applications of calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p25", "quote": "ضروري لبناء العظام والأسنان، ويُستخدم في صناعة الأسمنت والجير (CaO)."}]}

Annotation rationale: A real-world illustrative example detailing biological and industrial applications of calcium.

Accuracy: **accurate**. Calcium's physiological role in bones and teeth and its chemical compounds in cement and quicklime are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | - **الكالسيوم**: ضروري لبناء العظام والأسنان، ويُستخدم في صناعة الأسمنت والجير (CaO). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Applications of barium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p26", "quote": "يُستخدم في فحوصات الأشعة السينية للجهاز الهضمي (كبريتات الباريوم)."}]}

Annotation rationale: A real-world illustrative example of barium sulfate use in medical X-ray imaging.

Accuracy: **accurate**. Barium sulfate is standardly used as a radiopaque contrast agent for gastrointestinal imaging.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | - **الباريوم**: يُستخدم في فحوصات الأشعة السينية للجهاز الهضمي (كبريتات الباريوم). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Applications of strontium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p27", "quote": "يدخل في صناعة الألعاب النارية الحمراء اللون."}]}

Annotation rationale: A real-world illustrative example of strontium compounds providing red flame color in fireworks.

Accuracy: **accurate**. Strontium salts are widely used in pyrotechnics to generate bright red flames.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | - **السترونتيوم**: يدخل في صناعة الألعاب النارية الحمراء اللون. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Radioactivity and handling precaution for radium (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Highlights a critical safety caveat/qualification regarding radium being radioactive unlike the other Group 2 elements.

Accuracy: **accurate**. Radium is indeed radioactive and historically was used in early radiation therapy / medical treatments with extreme caution.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | **ملاحظة مهمة**: الراديوم عنصر مشع، ويُستخدم بحذر في بعض التطبيقات الطبية القديمة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u11: Comparison between alkaline earth metals and alkali metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares key properties of Group 2 metals with Group 1 metals, attaching the closing conversational prompt.

Accuracy: **accurate**. The comparison points (alkali metals are more reactive and less dense; alkaline earth metals are harder and form more lattice-stable ionic compounds) are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### مقارنة سريعة مع الفلزات القلوية (المجموعة 1) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | - الفلزات القلوية أكثر نشاطاً وأقل كثافة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - الفلزات القلوية الأرضية أقوى وأصلب، وتكوّن مركبات أكثر استقراراً. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | هل فهمت الشرح؟ إذا كان لديك سؤال عن عنصر معين أو عن تفاعل معين، أو تريد أمثلة على المعادلات الكيميائية، قل لي وسأوضح لك المزيد! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

