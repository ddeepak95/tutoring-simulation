# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and accurately explains vapour phase refining, including its operating principle, the general steps, and two classic industrial examples (the Mond process and the Van Arkel process).

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 5,
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

## u1: Définition et principe fondamental du raffinage en phase vapeur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what vapour phase refining is and the underlying chemical principle of volatility differences between the metal compound and impurities.

Accuracy: **accurate**. The core principle of forming a volatile compound from an impure metal and subsequently decomposing it to retrieve pure metal is correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le **raffinage en phase vapeur** est une méthode utilisée pour obtenir un métal **très pur**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Idée principale | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | On transforme d’abord le métal impur en un **composé gazeux** (ou qui peut facilement devenir vapeur). Ensuite, on décompose ce gaz pour récupérer le métal pur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | Cette méthode fonctionne parce que certains métaux forment des composés **volatils** : ils passent facilement à l’état gazeux, contrairement à la plupart des impuretés. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Étapes méthodologiques du raffinage en phase vapeur (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the generic four-step procedure used to purify metals via vaporisation, separation, and decomposition.

Accuracy: **accurate**. The procedural breakdown accurately describes the standard chemical sequence from impure solid to volatile gas, physical displacement, and thermal decomposition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## Les étapes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | 1. **Métal impur** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p8 |    - On part d’un métal contenant des impuretés. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p9 | 2. **Formation d’un gaz** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p10 |    - On fait réagir le métal avec une substance adaptée. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p11 |    - Le métal devient un composé gazeux, tandis que beaucoup d’impuretés restent solides. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p12 | 3. **Séparation** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p13 |    - Le gaz est déplacé dans une autre zone de l’installation. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p14 |    - Les impuretés, qui ne sont pas devenues gazeuses, sont laissées derrière. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p15 | 4. **Décomposition du gaz** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p16 |    - On chauffe ou on modifie les conditions. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p17 |    - Le composé gazeux se décompose et dépose du **métal pur**. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Exemple d'application industrielle : le procédé Mond pour le nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the concept through the industrial purification of nickel with carbon monoxide, including chemical equations and a toxicity safety note.

Accuracy: **accurate**. The reaction equations for the formation and decomposition of nickel tetracarbonyl Ni(CO)4 and the warning about toxicity are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## Exemple : purification du nickel, procédé Mond | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | Le nickel impur réagit avec du monoxyde de carbone, CO, à une température modérée : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | On obtient du **tétracarbonyle de nickel**, un gaz très volatil. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | Ensuite, on chauffe ce gaz : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | \text{Ni(CO)}_4 \rightarrow \text{Ni pur} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | Le nickel pur se dépose sous forme solide, tandis que le monoxyde de carbone peut être réutilisé. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | ⚠️ Ce procédé doit être réalisé dans des installations très contrôlées, car le monoxyde de carbone et certains composés formés sont très toxiques. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Exemple d'application : le procédé Van Arkel pour le titane et le zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a second industrial example using the Van Arkel-de Boer iodide process for purifying titanium or zirconium.

Accuracy: **accurate**. The description of the Van Arkel process (iodine reaction to form volatile iodide followed by decomposition on a hot filament) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## Autre exemple : purification du titane ou du zirconium | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | Dans le procédé de Van Arkel, le titane ou le zirconium forme un iodure volatil avec l’iode. Cet iodure est ensuite chauffé sur un filament très chaud : le métal pur se dépose sur le filament. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Récapitulatif des points clés et domaines d'utilisation (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential takeaway message of the lesson and contextualizes the economic cost and high-tech applications.

Accuracy: **accurate**. The summary accurately captures the fundamental logic of the process, its high cost, and its common industrial applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | ## À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | Le raffinage en phase vapeur repose sur cette idée : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p37 | &gt; **On transforme sélectivement le métal en gaz, puis on le retransforme en métal pur.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p38 | C’est une technique coûteuse, mais elle permet d’obtenir des métaux d’une très grande pureté, utiles par exemple en électronique, en aéronautique ou dans certaines recherches scientifiques. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

