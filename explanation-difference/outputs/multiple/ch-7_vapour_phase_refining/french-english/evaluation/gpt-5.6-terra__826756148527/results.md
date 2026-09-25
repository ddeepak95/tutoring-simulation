# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains vapour phase refining in French, detailing its general principles, industrial examples (the Mond process and the Van Arkel-de Boer process), advantages, and limitations.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
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

## u1: Définition et principe général du raffinage en phase vapeur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition and mechanism of vapour phase refining: formation of a volatile compound from impure metal, separation from impurities, and thermal decomposition to yield pure metal.

Accuracy: **accurate**. The definition and 3-step general principle correctly characterize vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le **raffinage en phase vapeur** est une méthode utilisée pour purifier certains métaux. Elle repose sur l’idée suivante : on transforme le métal impur en un **composé volatil** (qui peut facilement passer à l’état gazeux), puis on décompose ce gaz pour récupérer le métal très pur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## Principe général | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | 1. **Le métal impur réagit avec un gaz ou une substance chimique**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p4 |    Il forme un composé volatil. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p5 | 2. **Le composé est séparé des impuretés**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 |    Les impuretés ne forment généralement pas de vapeur avec ce réactif et restent donc dans le récipient. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 3. **Le composé volatil est chauffé ou décomposé**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |    Il redonne le métal pur, qui se dépose sur une surface. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | On peut résumer ainsi : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p11 | \text{Métal impur} \rightarrow \text{composé volatil} \rightarrow \text{métal pur} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Exemple du procédé Mond pour le raffinage du nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world industrial example illustrating the refining of nickel via nickel tetracarbonyl and subsequent thermal decomposition.

Accuracy: **accurate**. The temperatures, chemical species, and equations for the Mond process are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## Exemple : raffinage du nickel (procédé Mond) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Le nickel impur réagit avec du monoxyde de carbone, CO, à environ 50–60 °C : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | On obtient du **tétracarbonyle de nickel**, un gaz volatil. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | Ensuite, ce gaz est chauffé vers 180–200 °C. Il se décompose alors : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | \text{Ni(CO)}_4 \rightarrow \text{Ni pur} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | Le nickel pur se dépose, tandis que le monoxyde de carbone peut être réutilisé. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Exemple de la purification du titane ou du zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the Van Arkel-de Boer method for purifying titanium and zirconium using iodine to form volatile iodides decomposed on a hot filament.

Accuracy: **accurate**. The Van Arkel process is correctly described as forming a volatile iodide that decomposes on a hot filament.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## Exemple : purification du titane ou du zirconium | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | Le titane impur peut réagir avec l’iode pour former un iodure volatil. Celui-ci est ensuite chauffé sur un filament très chaud, où il se décompose et dépose du titane très pur. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Avantages du raffinage en phase vapeur (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the primary advantages of vapour phase refining, including high purity product output.

Accuracy: **accurate**. The stated benefits of vapour phase refining are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## Avantages | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | - Permet d’obtenir des métaux de **très grande pureté**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | - Les impuretés sont facilement séparées. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | - Utile pour des métaux comme le nickel, le titane ou le zirconium. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Limites de la méthode (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies the practical and chemical limitations of vapour phase refining (specificity to certain metals, toxicity of gases, and high cost).

Accuracy: **accurate**. The limitations are scientifically accurate and appropriate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ## Limites | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | - Cette méthode ne convient pas à tous les métaux. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | - Certains gaz utilisés peuvent être dangereux, par exemple le monoxyde de carbone. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | - Elle peut être coûteuse. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Résumé final (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise concluding summary recapping the core mechanism of vapour phase refining.

Accuracy: **accurate**. The recap accurately synthesizes the process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | En résumé, le raffinage en phase vapeur purifie un métal en le faisant passer temporairement sous forme de gaz, puis en le récupérant sous forme de métal pur. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

