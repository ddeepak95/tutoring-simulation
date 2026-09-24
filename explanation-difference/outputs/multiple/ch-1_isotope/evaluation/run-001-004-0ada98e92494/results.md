# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses isotopes at a high school chemistry level, covering their definition, subatomic structure, concrete examples, physical and chemical properties, real-world application, and a comprehension check.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 33,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 33,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes in terms of proton and neutron counts and relates them to atomic number and mass number.

Accuracy: **accurate**. The definition accurately states that isotopes share the same atomic number (protons) but differ in neutron count and mass number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Isotopes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Definition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **Isotopes** are atoms of the same element that have the **same number of protons** but a **different number of neutrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | This means isotopes have the same **atomic number** but different **mass numbers**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Atomic structure and origin of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down atomic subparticles (protons, neutrons, electrons) and explains how fixed proton counts define the element while variations in neutron count yield isotopes.

Accuracy: **accurate**. The descriptions of protons, neutrons, electrons, and how variation in neutron number creates isotopes are scientifically accurate and appropriate for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## Let&#x27;s Break This Down | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Remember the structure of an atom: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | - **Protons** (positive charge) — located in the nucleus | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | - **Neutrons** (no charge) — located in the nucleus | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | - **Electrons** (negative charge) — orbit around the nucleus | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | The **number of protons** determines what element an atom is. For example, every carbon atom has exactly 6 protons — that&#x27;s what makes it carbon! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | However, the **number of neutrons can vary**, even for the same element. This variation creates isotopes. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Carbon isotopes and notation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a table and explanation of Carbon-12, Carbon-13, and Carbon-14, followed by the standard chemical notation used to designate isotopes.

Accuracy: **accurate**. The proton, neutron, and mass numbers for carbon isotopes (Carbon-12, Carbon-13, and Carbon-14) and the notation explanation are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## Example: Carbon | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | &#124; Isotope &#124; Protons &#124; Neutrons &#124; Mass Number &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124;---------&#124;---------&#124;----------&#124;-------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124; Carbon-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; Carbon-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; Carbon-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | All three are **carbon** (6 protons), but they have different numbers of neutrons, making them different isotopes. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | 📝 *Notation:* We write isotopes as **Carbon-12** or **¹²C**, where the number represents the mass number (protons + neutrons). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the key properties distinguishing isotopes, including why their chemical properties are identical while physical properties and nuclear stability differ.

Accuracy: **accurate**. Accurately reflects standard high school chemistry principles regarding identical chemical reactivity due to identical electron structures, differences in physical properties, and radioactive decay in unstable isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Key Points to Remember | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | ✅ Isotopes of the same element have **identical chemical properties** (since chemistry depends on electrons/protons) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 | ✅ Isotopes can have **different physical properties**, like mass and stability | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | ✅ Some isotopes are **stable** (like Carbon-12), while others are **radioactive/unstable** (like Carbon-14, which decays over time) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Carbon dating application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-14 radiometric dating of ancient fossils and artifacts as a real-world application of radioactive isotopes.

Accuracy: **accurate**. Carbon-14 decay is correctly cited as the basis for radiocarbon dating of fossils and organic artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## Real-World Application | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | Carbon-14 is famously used in **carbon dating** — scientists measure how much Carbon-14 has decayed in ancient fossils or artifacts to determine their age! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Quick check practice question (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Offers a practice question asking students to determine whether two atoms with given proton and neutron counts are isotopes, along with an explanation of the correct answer.

Accuracy: **accurate**. Both atoms have 8 protons (identifying them as oxygen) and differing neutron counts (8 and 10), so they are indeed isotopes; the reasoning provided in the answer is completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## Quick Check ✏️ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | **Question:** An atom has 8 protons and 8 neutrons. Another atom has 8 protons and 10 neutrons. Are these isotopes? Why or why not? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p33 | *(Answer: Yes! They have the same number of protons — both are oxygen — but different numbers of neutrons.)* | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

