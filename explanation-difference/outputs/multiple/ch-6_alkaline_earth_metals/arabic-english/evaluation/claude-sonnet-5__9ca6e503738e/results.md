# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the Group 2 alkaline earth metals in Arabic, addressing their definition, constituent elements, electronic configuration, physical and chemical properties, key chemical reactions, periodic trends, real-world applications, and a mnemonic aid.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 59,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 59,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 7,
    "everyday": 1,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and constituent elements of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines alkaline earth metals as Group 2 (IIA) elements in the periodic table and lists the six elements in the group.

Accuracy: **accurate**. The definition and list of the six alkaline earth metals (Be, Mg, Ca, Sr, Ba, Ra) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # الفلزات القلوية الترابية (المعادن الأرضية القلوية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## مرحباً عزيزي الطالب! دعنا نتعرف على هذه المجموعة المهمة من العناصر | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;heading&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ## 📍 ما هي الفلزات القلوية الترابية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | هي مجموعة من العناصر الكيميائية تقع في **المجموعة الثانية (IIA)** من الجدول الدوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | ### العناصر الستة في هذه المجموعة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | 1. **البريليوم** (Be) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | 2. **المغنيسيوم** (Mg) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 3. **الكالسيوم** (Ca) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 4. **السترانشيوم** (Sr) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | 5. **الباريوم** (Ba) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | 6. **الراديوم** (Ra) - عنصر مشع | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Electronic configuration of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the valence electron configuration (s²) and explains how it accounts for the similarity in their chemical properties.

Accuracy: **accurate**. Alkaline earth metals have two valence electrons in their outermost s orbital (ns²), explaining their similar chemical behavior.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## ⚛️ الخصائص الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | ### 1. التركيب الإلكتروني | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - تحتوي جميعها على **إلكترونين في المدار الأخير** (s²) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | - هذا يفسر تشابه خصائصها الكيميائية | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Physical properties of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Tabulates the physical properties of alkaline earth metals, including appearance, density, melting point/hardness, and conductivity.

Accuracy: **accurate**. The listed physical properties accurately describe Group 2 metals compared to alkali metals (higher density, higher melting points, harder, shiny silver appearance, and good conductors).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### 2. الخصائص الفيزيائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | &#124; الخاصية &#124; الوصف &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124;---------&#124;-------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124; اللون &#124; فضية لامعة &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; الكثافة &#124; أعلى من الفلزات القلوية (المجموعة الأولى) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; درجة الانصهار &#124; أعلى نسبياً وأكثر صلابة &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124; التوصيل &#124; موصلة جيدة للحرارة والكهرباء &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u4: Chemical properties and reactivity of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that alkaline earth metals lose two electrons to form dipositive cations (+2), illustrates this with magnesium, and compares their reactivity to Group 1 metals.

Accuracy: **accurate**. Alkaline earth metals readily oxidize to +2 oxidation state cations and are somewhat less reactive than alkali metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### 3. الخصائص الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | - **تفقد إلكترونين** لتكوين أيونات موجبة الشحنة (+2) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | - مثال: Mg → Mg²⁺ + 2e⁻ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p28 | - **أقل نشاطاً** من الفلزات القلوية (المجموعة الأولى) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | - تتفاعل مع الماء والأكسجين (لكن بشكل أبطأ من المجموعة الأولى) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction of calcium with water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives the balanced chemical reaction equation of calcium reacting with water to yield calcium hydroxide and hydrogen gas.

Accuracy: **accurate**. The equation Ca + 2H₂O → Ca(OH)₂ + H₂ is balanced and factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## 🔥 التفاعلات المهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | ### التفاعل مع الماء: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | Ca + 2H₂O → Ca(OH)₂ + H₂ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction of magnesium with oxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives the balanced chemical reaction equation for the combustion of magnesium in oxygen to form magnesium oxide.

Accuracy: **accurate**. The equation 2Mg + O₂ → 2MgO is balanced and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### التفاعل مع الأكسجين: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | 2Mg + O₂ → 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Periodic trends down Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the periodic trends descending the group for atomic radius, chemical reactivity, ionization energy, and electronegativity.

Accuracy: **accurate**. Atomic radius and reactivity increase down Group 2, while ionization energy and electronegativity decrease.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ## 📈 الاتجاهات في المجموعة (من الأعلى للأسفل) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | - ⬆️ **يزداد** نصف الذرة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | - ⬆️ **يزداد** النشاط الكيميائي | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p44 | - ⬇️ **تقل** طاقة التأين | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p45 | - ⬇️ **تقل** الكهروسالبية | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Everyday importance and uses of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p50", "quote": "| **الكالسيوم** | تكوين العظام والأسنان |"}]}

Annotation rationale: Tabulates the real-world and biological roles of calcium, magnesium, and barium.

Accuracy: **accurate**. The listed applications (calcium in bones and teeth, magnesium in alloys and chlorophyll, barium in medical imaging) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ## 🌍 أهميتها في الحياة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | &#124; العنصر &#124; الاستخدام &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124;--------&#124;-----------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p50 | &#124; **الكالسيوم** &#124; تكوين العظام والأسنان &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p51 | &#124; **المغنيسيوم** &#124; صناعة السبائك الخفيفة والكلوروفيل في النباتات &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p52 | &#124; **الباريوم** &#124; الأشعة السينية في الطب &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Mnemonic for memorizing the order of alkaline earth metals (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p56", "quote": "**\"بابا محمد كان سعيداً براحته\"**"}]}

Annotation rationale: Provides an Arabic mnemonic phrase based on the initial letters of the element names to help the student memorize the order of the alkaline earth metals.

Accuracy: **accurate**. The mnemonic accurately maps to the Arabic names and periodic order of Group 2 elements: Beryllium (بابا), Magnesium (محمد), Calcium (كان), Strontium (سعيداً), Barium (بـ), Radium (ـراحته).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## 💡 نصيحة للحفظ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | تذكر الترتيب بهذه الجملة:  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p56 | **&quot;بابا محمد كان سعيداً براحته&quot;** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p57 | (بريليوم - مغنيسيوم - كالسيوم - سترانشيوم - باريوم - راديوم) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p58 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p59 | **هل لديك أي سؤال حول هذا الموضوع؟** 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

