# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains isotopes, covering their definition, the underlying subatomic structure, specific examples of carbon isotopes, differences in physical and chemical properties, and practical applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 27,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "STUDY_SUPPORT": 1,
    "EXAMPLE": 4
  },
  "nested_passages": 27,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines isotopes as atoms of the same chemical element sharing the same number of protons but differing in the number of neutrons.

Accuracy: **accurate**. The definition correctly notes that isotopes share proton count (elemental identity) and vary in neutron count.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Isotopes! A fundamental concept in chemistry that can be a bit tricky to grasp at first, but don&#x27;t worry, I&#x27;m here to help you understand it clearly. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **What are isotopes?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Isotopes are atoms of the same chemical element that have the same number of protons in their atomic nuclei (that&#x27;s what makes them the same element), but differ in the number of neutrons. Yeah, it sounds a bit complicated, so let&#x27;s break it down. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Recap of basic atomic structure (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a refresher on the subatomic particles of the atom (protons, neutrons, and electrons), their locations, and their charges.

Accuracy: **accurate**. The basic atomic model, location of nucleons, and particle charges are accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **Atomic structure: a quick recap** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | To understand isotopes, we need to revisit the basic structure of an atom. An atom consists of three main parts: protons, neutrons, and electrons. Protons and neutrons live in the nucleus (center) of the atom, while electrons orbit around it. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p6 | * Protons are positively charged particles. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p7 | * Neutrons have no charge (they&#x27;re neutral). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p8 | * Electrons are negatively charged particles. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u3: Atomic number and neutron variation in isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how proton count determines atomic number and element identity, whereas variation in neutrons produces isotopes of that element.

Accuracy: **accurate**. Accurately details the relationship between proton number, atomic number, element identity, and varying neutron numbers in isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **The key to isotopes: protons and neutrons** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Now, let&#x27;s focus on the nucleus. The number of protons in an atom&#x27;s nucleus determines the element of an atom. For example, all carbon atoms have 6 protons in their nucleus. This is known as the atomic number. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | The number of neutrons, on the other hand, can vary. Isotopes are atoms of the same element (same number of protons) that have different numbers of neutrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of carbon (Carbon-12, Carbon-13, and Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopic variation by presenting three isotopes of carbon, showing their constant proton number and differing neutron counts.

Accuracy: **accurate**. The proton counts, neutron counts, and total nucleon numbers for carbon-12, carbon-13, and carbon-14 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | **Example: Carbon isotopes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Let&#x27;s take carbon as an example. Carbon has an atomic number of 6, which means it always has 6 protons. However, it can have different numbers of neutrons. Here are three isotopes of carbon: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | 1. **Carbon-12** (or ¹²C): 6 protons + 6 neutrons = 12 nucleons (particles in the nucleus) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | 2. **Carbon-13** (or ¹³C): 6 protons + 7 neutrons = 13 nucleons | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | 3. **Carbon-14** (or ¹⁴C): 6 protons + 8 neutrons = 14 nucleons | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | All three are carbon atoms, but they have different numbers of neutrons, making them isotopes of carbon. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Physical and chemical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share chemical properties due to electron configuration, but differ in physical properties such as mass and nuclear stability.

Accuracy: **accurate**. Accurately distinguishes the similarity in chemical properties from the differences in physical properties like mass and nuclear stability/decay.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | **Properties of isotopes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | Isotopes of the same element have very similar chemical properties, as the number of electrons (which is equal to the number of protons) remains the same. However, they can differ in their physical properties, such as: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | * Mass: Isotopes have different masses due to the varying number of neutrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | * Radioactivity: Some isotopes are radioactive, meaning they decay into other elements, while others are stable. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Isotope applications in medicine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions medical imaging and cancer treatment as real-world applications of radioisotopes, introduced by the shared heading and lead-in text.

Accuracy: **accurate**. Medical imaging and radiotherapy/cancer treatment are standard, factual applications of radioisotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | **Why are isotopes important?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | Isotopes have many practical applications in various fields, including: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | * Medicine: Radioisotopes are used in medical imaging and cancer treatment. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Isotope applications in environmental science (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotope use in tracking water cycles, understanding climate change, and geological research.

Accuracy: **accurate**. Stable and radioactive isotope ratios are widely used tools in environmental science, hydrology, and paleoclimatology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | * Environmental science: Isotopes help us understand climate change, track water cycles, and study geological processes. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Isotope applications in archaeology (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides radiocarbon dating of ancient artifacts as an archaeological application of Carbon-14, followed by closing remarks.

Accuracy: **accurate**. Radiocarbon dating using carbon-14 is an accurate and well-established archaeological dating technique.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | * Archaeology: Radioisotopes, like Carbon-14, are used to date ancient artifacts. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | Now, I hope you have a good understanding of isotopes! Do you have any questions or would you like me to elaborate on any of these points? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

