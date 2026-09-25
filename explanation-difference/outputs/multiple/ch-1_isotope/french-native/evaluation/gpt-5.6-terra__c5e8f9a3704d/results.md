# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly covers the requested topic of isotopes in French for a high school student, explaining their subatomic definition, examples, properties, and applications.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 49,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1,
    "CAVEAT": 1
  },
  "nested_passages": 49,
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

## u1: Définition de l'élément chimique par le nombre de protons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces isotopes generally and explains that the identity of a chemical element is defined strictly by the number of protons in its atomic nucleus.

Accuracy: **accurate**. The definition of an element by its atomic number (proton count) is completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Un **isotope** est une version d’un même élément chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### 1. Même élément = même nombre de protons | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Chaque élément est défini par son nombre de **protons** dans le noyau : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - Hydrogène : 1 proton   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p5 | - Carbone : 6 protons   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p6 | - Oxygène : 8 protons   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | Deux atomes sont donc du **même élément** s’ils ont le même nombre de protons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Définition des isotopes par la variation du nombre de neutrons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that isotopes have identical numbers of protons but different numbers of neutrons, which gives them different atomic masses.

Accuracy: **accurate**. The definition of isotopes differing by neutron count and mass is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### 2. Les isotopes diffèrent par leurs neutrons | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Dans le noyau, il y a aussi des **neutrons**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | Des isotopes ont : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - le **même nombre de protons** ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - mais un **nombre différent de neutrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | Ils ont donc une masse différente. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Exemple concret des isotopes du carbone et écriture conventionnelle (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the isotope concept to carbon-12, carbon-13, and carbon-14, walking through mass number calculation and standard nuclide notation.

Accuracy: **accurate**. All calculations for mass numbers of carbon isotopes and the isotopic notation representation are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### Exemple : les isotopes du carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | Tous les atomes de carbone possèdent **6 protons**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | &#124; Isotope &#124; Protons &#124; Neutrons &#124; Nombre de masse &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;, &#x27;separator&#x27;] |
| p18 | &#124; Carbone-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; Carbone-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124; Carbone-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | Le nombre indiqué après le nom, par exemple dans **carbone-14**, est le **nombre de masse** : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \text{nombre de masse} = \text{protons} + \text{neutrons} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | Ainsi, pour le carbone-14 : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | 6 \text{ protons} + 8 \text{ neutrons} = 14 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | On peut aussi l’écrire : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | {}^{14}_{6}\mathrm{C} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | - Le **6** en bas est le numéro atomique : nombre de protons. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | - Le **14** en haut est le nombre total de nucléons (protons + neutrons). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Propriétés chimiques et physiques des isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share nearly identical chemical properties (same electron configuration) while differing slightly in physical properties (such as mass).

Accuracy: **accurate**. Chemical behavior is determined by the electronic structure (identical in neutral isotopes), while physical properties depend partly on mass, making the statements accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | ### 3. Ont-ils les mêmes propriétés chimiques ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | Presque oui. Comme les isotopes d’un élément ont le même nombre de protons, ils ont aussi généralement le même nombre d’électrons. Ils réagissent donc de façon très semblable chimiquement. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p37 | Par exemple, le carbone-12 et le carbone-14 peuvent tous deux former du dioxyde de carbone, \(CO_2\). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | En revanche, ils peuvent avoir des propriétés physiques légèrement différentes, notamment leur masse. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Stabilité nucléaire, radioactivité et application à la datation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Differentiates stable isotopes from radioactive isotopes and illustrates this distinction using carbon isotopes and carbon-14 dating.

Accuracy: **accurate**. The explanation of stability and radioactivity, the status of carbon isotopes (12 and 13 stable, 14 radioactive), and the application of carbon-14 dating are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### 4. Isotopes stables et radioactifs | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | Certains isotopes sont **stables** : leur noyau ne change pas spontanément.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p41 | D’autres sont **radioactifs** : leur noyau est instable et se transforme en émettant des rayonnements. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p42 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | - carbone-12 : stable ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | - carbone-13 : stable ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 | - carbone-14 : radioactif. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p46 | Le carbone-14 est utilisé pour dater des objets anciens, comme des os, du bois ou des tissus : c’est la **datation au carbone 14**. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Récapitulatif de la définition d'un isotope (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise takeaway summary of the core definition of isotopes for student retention.

Accuracy: **accurate**. The summary accurately captures the defining criteria of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | &gt; Des isotopes sont des atomes d’un même élément : ils ont le même nombre de protons, mais pas le même nombre de neutrons. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

## u7: Distinction essentielle entre isotope et ion (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explicitly warns against the common high school misconception confusing ions (electron change) with isotopes (neutron difference).

Accuracy: **accurate**. The distinction between ions (gain/loss of electrons) and isotopes (different neutron number) is fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | Ne pas confondre avec un **ion** : un ion a gagné ou perdu des **électrons**, tandis qu’un isotope diffère par son nombre de **neutrons**. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

