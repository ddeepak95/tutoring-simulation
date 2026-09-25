# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and clearly explains the definition, measurement, significance, and application of covalent radius in chemistry.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 15,
  "unique_subtopics": 2,
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

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the covalent radius and explains how it relates to bond length between covalently bonded atoms.

Accuracy: **accurate**. The explanation correctly defines covalent radius in the context of introductory chemistry as half the internuclear distance of bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Covalent radius is an important concept in chemistry that helps us understand the size of atoms and how they interact with each other. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | **What is Covalent Radius?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Covalent radius is the radius of an atom when it is covalently bonded to another atom. In other words, it is the distance from the center of an atom to the point where it is bonded to another atom through a covalent bond. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | **Let&#x27;s Break it Down** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | When two atoms share one or more pairs of electrons to form a covalent bond, the distance between the nuclei of the two atoms is called the bond length. The covalent radius is half of this bond length. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Determining covalent radius in Cl2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation showing how the covalent radius of chlorine is determined from the internuclear distance in a homonuclear diatomic molecule (Cl2).

Accuracy: **accurate**. The bond length of 198 pm for Cl2 and the resulting covalent radius of 99 pm are standard, accurate values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | For example, consider a molecule of chlorine (Cl2). The distance between the two chlorine nuclei is measured to be 198 pm (picometers). Since the two chlorine atoms are identical, the covalent radius of chlorine is half of this distance, which is 99 pm. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Significance of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is important, including atomic sizing, molecular packing, reactivity, and molecular shape.

Accuracy: **accurate**. Accurately describes how covalent radius informs our understanding of atomic dimensions and chemical behavior.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Why is Covalent Radius Important?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Covalent radius is a useful concept because it helps us understand the size of atoms and how they pack together in molecules. It&#x27;s also related to the physical and chemical properties of elements, such as their reactivity and the shape of their molecules. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Summary of key points (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concepts and takeaways regarding covalent radius.

Accuracy: **accurate**. The recap accurately synthesizes the main points previously presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **Key Points to Remember** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | 1. Covalent radius is the radius of an atom when it&#x27;s covalently bonded to another atom. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. It&#x27;s half the distance between the nuclei of two atoms that are covalently bonded. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 3. Covalent radius helps us understand the size of atoms and their interactions. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Estimating bond length in HCl using covalent radii (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates how covalent radii can be summed to estimate the bond length in a heteronuclear molecule (HCl) and compares it with the experimentally measured value.

Accuracy: **accurate**. The calculation (37 pm + 99 pm = 136 pm) and the experimentally measured value (~127 pm) for HCl are scientifically accurate, as is the acknowledgment of additional factors affecting bond length.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **Example to Illustrate the Concept** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Let&#x27;s consider a simple molecule like HCl (hydrogen chloride). The covalent radius of hydrogen is 37 pm, and that of chlorine is 99 pm. The bond length between H and Cl is the sum of their covalent radii, which is 37 + 99 = 136 pm. This is close to the experimentally measured bond length, which is 127 pm (the difference is due to other factors that affect bond length). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | Now, I hope you have a good understanding of covalent radius! Do you have any questions or would you like me to explain further? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

