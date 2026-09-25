# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains the concept of covalent radius in chemistry, including its definition, determination method, a concrete worked example with dichlorine, and its importance.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 18,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 18,
  "unique_subtopics": 3,
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

## u1: Définition générale du rayon covalent et de la liaison covalente (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic, greets the student, and defines covalent radius in relation to covalent bonding and electron sharing.

Accuracy: **accurate**. The definition of covalent radius as a measure of atomic size in a covalent bond and the description of covalent bonding via electron sharing are accurate for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Bienvenue dans le monde de la chimie !** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;heading&#x27;] |
| p2 | Aujourd&#x27;hui, nous allons explorer un concept fondamental en chimie : le rayon covalent. Ne t&#x27;inquiète pas si cela te semble compliqué, je vais t&#x27;expliquer cela de manière simple et claire. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | **Qu&#x27;est-ce qu&#x27;un rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | Le rayon covalent est une mesure de la taille d&#x27;un atome lorsqu&#x27;il est lié à d&#x27;autres atomes par des liaisons covalentes. Mais qu&#x27;est-ce qu&#x27;une liaison covalente ? C&#x27;est une liaison chimique qui se forme lorsque deux atomes partagent des électrons pour former une molécule. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Modèle géométrique intuitif du rayon covalent (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a qualitative mental model of covalent radius as the distance between the nucleus and the shared electron region.

Accuracy: **accurate**. Explaining the covalent radius conceptually as the distance from the atomic nucleus to the region of shared electrons is an accurate pedagogical visualization.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **Comment définir le rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Imagine que tu as deux atomes qui se lient pour former une molécule. Le rayon covalent est la distance entre le noyau de l&#x27;atome et le point où les électrons sont partagés avec l&#x27;autre atome. C&#x27;est comme si tu mesurais la &quot;taille&quot; de l&#x27;atome lorsqu&#x27;il est lié à un autre atome. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Méthode de calcul du rayon covalent (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the reusable action sequence for determining the covalent radius from the internuclear distance.

Accuracy: **accurate**. Measuring the distance between bonded nuclei and halving it is the standard method for determining the covalent radius in homonuclear systems.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Comment calculer le rayon covalent ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Le rayon covalent est généralement calculé en mesurant la distance entre les noyaux de deux atomes liés par une liaison covalente. On divise ensuite cette distance par 2 pour obtenir le rayon covalent de chaque atome. | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u4: Calcul du rayon covalent pour la molécule de dichlore (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the calculation procedure to the chlorine molecule (Cl2) using numerical values.

Accuracy: **accurate**. The internuclear bond distance of Cl2 is indeed approximately 0.198 nm (198 pm), yielding a covalent radius of approximately 0.099 nm (99 pm).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **Exemple concret** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Prenons l&#x27;exemple de la molécule de chlore (Cl2). La distance entre les deux noyaux de chlore est d&#x27;environ 0,198 nanomètres (nm). Pour calculer le rayon covalent du chlore, on divise cette distance par 2, ce qui nous donne un rayon covalent d&#x27;environ 0,099 nm. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Importance du rayon covalent en chimie (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the covalent radius is relevant, including understanding molecular geometry and predicting properties.

Accuracy: **accurate**. The covalent radius is indeed essential for predicting molecular geometry, bond lengths, and chemical/physical properties.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | **Pourquoi le rayon covalent est-il important ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Le rayon covalent est important car il nous aide à comprendre la structure des molécules et la façon dont les atomes s&#x27;agencent dans l&#x27;espace. Cela nous permet également de prédire les propriétés physiques et chimiques des substances. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Résumé et conclusion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Synthesizes the key takeaways of the lesson in bullet points and provides closing encouragement.

Accuracy: **accurate**. The summary points faithfully and accurately recapitulate the definitions, calculation method, and significance covered in the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **En résumé** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | * Le rayon covalent est une mesure de la taille d&#x27;un atome lorsqu&#x27;il est lié à d&#x27;autres atomes par des liaisons covalentes. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p15 | * Il est calculé en mesurant la distance entre les noyaux de deux atomes liés et en divisant cette distance par 2. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p16 | * Le rayon covalent est important pour comprendre la structure des molécules et prédire les propriétés des substances. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p17 | **Conclusion** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | J&#x27;espère que cette explication t&#x27;a aidé à comprendre le concept de rayon covalent. N&#x27;hésite pas à me poser des questions si tu as besoin de clarifications supplémentaires. La chimie peut sembler complexe, mais avec de la patience et de la pratique, tu deviendras un expert dans ce domaine ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

