# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains covalent radius in French, covering its definition, calculation with an example, significance, periodic trends, and applications.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 15,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 5,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and concept of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the distance between the nuclei of two identical bonded atoms and explains how it relates to bond length.

Accuracy: **accurate**. The definition of covalent radius and its relationship to internuclear bond length are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Aujourd&#x27;hui, nous allons explorer un concept fondamental en chimie : le rayon covalent. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **Qu&#x27;est-ce que le rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Le rayon covalent est la moitié de la distance entre les noyaux de deux atomes identiques liés par une liaison covalente. En d&#x27;autres termes, c&#x27;est la distance entre le noyau d&#x27;un atome et le point où les électrons de valence sont partagés avec un autre atome. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | **Comment définir le rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Pour comprendre le rayon covalent, imaginez deux atomes identiques qui s&#x27;approchent l&#x27;un de l&#x27;autre pour former une liaison covalente. La distance entre les noyaux de ces deux atomes est appelée la longueur de liaison. Le rayon covalent est alors la moitié de cette longueur de liaison. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical calculation using the bond length of Cl2 (198 pm) to determine the covalent radius of chlorine (99 pm).

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and the resulting covalent radius of 99 pm are chemically accurate and correctly calculated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | Par exemple, si la longueur de liaison entre deux atomes de chlore (Cl) est de 198 picomètres (pm), le rayon covalent du chlore est de 99 pm, soit la moitié de 198 pm. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Importance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is useful in predicting bond lengths and understanding molecular geometry.

Accuracy: **accurate**. The stated uses of covalent radii to predict bond lengths and understand molecular structures are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Pourquoi le rayon covalent est-il important ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Le rayon covalent est une propriété importante en chimie car il nous aide à comprendre la structure des molécules et les interactions entre les atomes. Il est utilisé pour prédire la longueur des liaisons covalentes entre différents atomes et pour comprendre les variations de la taille des atomes dans les molécules. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Discusses how covalent radius changes across the periodic table and attempts to provide underlying electronic explanations.

Accuracy: **contains_error**. The text inverts the terms 'période' (period/row) and 'groupe' (group/column). It claims that one goes down a period and left-to-right across a group, reversing standard periodic table terminology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **Comment varie le rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Le rayon covalent varie en fonction de plusieurs facteurs, notamment : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | 1. **La période :** Le rayon covalent augmente généralement lorsque l&#x27;on descend dans une période du tableau périodique, car les atomes ont plus de couches électroniques. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 2. **Le groupe :** Le rayon covalent diminue généralement lorsque l&#x27;on se déplace de gauche à droite dans un groupe du tableau périodique, car les atomes ont plus de protons dans leur noyau, ce qui attire davantage les électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p11, p12): The passage conflates 'période' and 'groupe': p11 describes moving down a column (group) due to added electron shells but labels it 'La période' and says 'descend dans une période'. Conversely, p12 describes moving left to right across a row (period) due to increased nuclear charge but labels it 'Le groupe' and says 'se déplace de gauche à droite dans un groupe'.

Correction: Dans le tableau périodique, les colonnes sont appelées groupes (ou familles) et les lignes horizontales sont appelées périodes. Le rayon covalent augmente lorsque l'on descend le long d'un groupe (ajout de couches électroniques) et diminue lorsque l'on va de gauche à droite le long d'une période (augmentation de la charge nucléaire effective).

## u5: Applications of covalent radius in chemistry and biochemistry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists domains where covalent radius is applied, including biochemistry, organic chemistry, and inorganic chemistry.

Accuracy: **accurate**. The applications to structural chemistry and biomolecules like proteins and nucleic acids are factual.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **Exemples et applications** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Le concept de rayon covalent est utilisé dans de nombreux domaines, tels que la chimie organique, la chimie inorganique et la biochimie. Par exemple, il est utilisé pour comprendre la structure des molécules biologiques, comme les protéines et les acides nucléiques. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u6: Summary and conclusion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the fundamental takeaway regarding covalent radius and concludes the lesson.

Accuracy: **accurate**. The summary accurately restates the core function of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | En résumé, le rayon covalent est une propriété fondamentale qui nous aide à comprendre les interactions entre les atomes et la structure des molécules. J&#x27;espère que cette explication vous a aidé à comprendre ce concept important en chimie ! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

