# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains isotopes in French, including their subatomic composition, an analogy, standard notation, real-world examples (carbon), radioactive decay/dating, and a comprehension check.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 26,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition de base d'un isotope (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what an isotope is by breaking down atomic number Z (protons), neutron variance, and the resulting difference in mass.

Accuracy: **accurate**. Correctly defines isotopes as atoms of the same element with identical numbers of protons and different numbers of neutrons, resulting in different masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Explication : Les Isotopes (pour un lycéen) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## En français simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **Définition de base** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p4 | Un **isotope**, c&#x27;est une variante d&#x27;un même élément chimique. Deux isotopes ont : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | - Le **même nombre de protons** (donc le même numéro atomique Z) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | - Un **nombre différent de neutrons** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | - Donc une **masse atomique différente** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Analogie des frères et sœurs (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "Imagine des **frères et sœurs** : ils ont les mêmes parents (même \"identité familiale\" = même élément chimique), mais ils n'ont pas exactement le même poids."}]}

Annotation rationale: Uses the analogy of siblings sharing family identity (element/protons) but differing in weight (neutrons) to clarify the concept.

Accuracy: **accurate**. The analogy accurately captures the relationship between identical element identity and variation in atomic weight/mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## Analogie pour mieux comprendre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Imagine des **frères et sœurs** : ils ont les mêmes parents (même &quot;identité familiale&quot; = même élément chimique), mais ils n&#x27;ont pas exactement le même poids. Les isotopes, c&#x27;est pareil : même &quot;famille&quot; chimique (même nombre de protons), mais poids différent (nombre de neutrons différent). | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Isotopes du carbone (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using Carbon-12, Carbon-13, and Carbon-14 in a structured table.

Accuracy: **accurate**. The proton counts (6), neutron counts (6, 7, 8), and mass numbers (12, 13, 14) for carbon isotopes are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## Exemple concret : le Carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | &#124; Isotope &#124; Protons &#124; Neutrons &#124; Nombre de masse (A) &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | &#124;---------&#124;---------&#124;----------&#124;---------------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; Carbone-12 (¹²C) &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; Carbone-13 (¹³C) &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; Carbone-14 (¹⁴C) &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | 👉 Les trois sont du **carbone** (car ils ont tous 6 protons), mais ce sont des isotopes différents. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Notation isotopique standard (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and breaks down the standard isotopic notation (superscript A, subscript Z, element symbol X).

Accuracy: **accurate**. The nuclide/isotope notation format and the descriptions of A, Z, and X are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## Notation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | On écrit un isotope comme ceci : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | $$^{A}_{Z}X$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p20 | - **X** = symbole de l&#x27;élément | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 | - **Z** = numéro atomique (nombre de protons) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | - **A** = nombre de masse (protons + neutrons) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Stabilité et radioactivité des isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that some isotopes are stable while others are radioactive, connecting carbon-14 decay to archaeological dating.

Accuracy: **accurate**. Carbon-12 is indeed a stable isotope and Carbon-14 is a radioisotope used in archaeological radiocarbon dating.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Point important : stabilité | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Certains isotopes sont **stables** (comme le Carbone-12), d&#x27;autres sont **radioactifs** (comme le Carbone-14), c&#x27;est-à-dire qu&#x27;ils se désintègrent avec le temps. C&#x27;est d&#x27;ailleurs le principe utilisé pour la **datation au carbone 14** en archéologie ! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Question d'application (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a practice question asking the student to find mass number A given proton and neutron counts.

Accuracy: **accurate**. The question setup provides sound givens (8 protons, 10 neutrons) corresponding to Oxygen-18.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | **Question pour vérifier ta compréhension** : Si un atome a 8 protons et 10 neutrons, quel est son nombre de masse A ? 😊 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

