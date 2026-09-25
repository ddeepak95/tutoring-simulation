# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses the requested topic of vapour phase refining, though it incorrectly explains the underlying process by describing physical distillation rather than chemical vapour phase transport.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 17,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 17,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "contains_error": 6
  },
  "proposed_error_records": 6,
  "proposed_error_severity": {
    "major": 6
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and scope of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the concept of vapour phase refining and mentions candidate metals.

Accuracy: **contains_error**. The passage confuses vapour phase refining with simple distillation refining and incorrectly cites zinc, mercury, and magnesium as typical examples of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bien sûr ! Je vais t&#x27;expliquer le raffinage en phase vapeur de manière simple. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **Qu&#x27;est-ce que le raffinage en phase vapeur ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Le raffinage en phase vapeur est un procédé utilisé pour purifier les métaux, notamment les métaux comme le zinc, le mercure et le magnésium. Mais pour simplifier, nous allons prendre l&#x27;exemple du zinc. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

Error (major; p3): The text defines vapour phase refining as a direct distillation method for low-boiling metals like zinc, mercury, and magnesium. In metallurgical chemistry, vapour phase refining refers to converting a metal into a volatile chemical compound with a reagent and decomposing it elsewhere (e.g., Mond process for nickel, Van Arkel process for titanium/zirconium), whereas zinc and mercury are purified by physical distillation.

Correction: Vapour phase refining is a chemical purification method where an impure metal reacts to form a volatile intermediate compound that is subsequently decomposed at higher temperature to yield the pure metal.

## u2: Operating principle of the refining method (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the physical principle claimed to govern the separation process.

Accuracy: **contains_error**. Explains the principle as differences in vapor pressure between the elemental metal and impurities, which describes distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **Comment ça marche ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. **Principe de base** : Le raffinage en phase vapeur repose sur le principe que les impuretés présentes dans un métal n&#x27;ont pas la même pression de vapeur que le métal lui-même. En d&#x27;autres termes, certains éléments se vaporisent plus facilement que d&#x27;autres. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p5): States that vapour phase refining is based purely on differing vapor pressures of elements (direct differential vaporization). This is the principle of distillation refining, not vapour phase refining.

Correction: Vapour phase refining relies on selective chemical reaction of the metal to form an unstable volatile compound followed by its thermal decomposition, rather than simple physical evaporation based on elemental vapor pressure.

## u3: Operational steps of the purification process (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the sequential operational steps (heating, selective vaporization, condensation, and collection).

Accuracy: **contains_error**. Presents the procedural steps of physical distillation instead of the steps of chemical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | 2. **Étapes du processus** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p7 |    - **Chauffage** : On chauffe le métal impur jusqu&#x27;à ce qu&#x27;il se vaporise. La température de chauffage est choisie de telle sorte que le métal que l&#x27;on veut purifier se vaporise, mais pas les impuretés qui ont un point d&#x27;ébullition plus élevé. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |    - **Vaporisation sélective** : Lorsque le métal impur est chauffé, il se transforme en vapeur. Les impuretés qui ont un point d&#x27;ébullition plus élevé restent solides. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 |    - **Condensation** : Les vapeurs du métal sont ensuite dirigées vers une zone plus froide où elles se condensent pour former des cristaux ou des gouttelettes du métal purifié. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 |    - **Collecte** : Le métal purifié est ensuite collecté. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p7, p8, p9, p10): Describes the steps as directly heating the impure metal to boiling, selective vaporization, and condensation. In vapour phase refining, the steps involve reacting the metal with a reagent to form a volatile compound, transporting that vapour, and thermally decomposing it.

Correction: The procedure for vapour phase refining consists of: (1) reacting the impure metal with a suitable reagent at a moderate temperature to form a volatile compound, leaving non-volatile impurities behind; (2) transferring the gaseous compound to another zone; and (3) decomposing the compound at an elevated temperature to deposit the pure metal.

## u4: Advantages and suitability of the process (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the claimed advantages and criteria for applying the purification process.

Accuracy: **contains_error**. Incorrectly states that the process is particularly suitable for metals with low boiling points.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | **Avantages** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | - Ce procédé permet d&#x27;obtenir des métaux de très haute pureté, ce qui est essentiel pour de nombreuses applications industrielles et technologiques. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | - Il est particulièrement utile pour les métaux qui ont un point d&#x27;ébullition relativement bas. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p13): Claims that vapour phase refining is particularly useful for metals with a relatively low boiling point. This is true for distillation refining, whereas vapour phase refining is used for high-boiling metals (such as nickel, titanium, and zirconium) that cannot easily be boiled directly.

Correction: Vapour phase refining is primarily used for metals with high melting and boiling points by converting them into low-boiling volatile derivatives, whereas low-boiling metals are purified by direct distillation.

## u5: Example of zinc purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an illustrative industrial example of heating zinc to vaporize and condense it.

Accuracy: **contains_error**. Provides distillation of zinc as an example of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **Exemple avec le zinc** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | Le zinc est souvent raffiné en utilisant ce procédé. Le zinc impur est chauffé dans un four sous vide ou dans une atmosphère contrôlée jusqu&#x27;à vaporisation. Les vapeurs de zinc sont ensuite condensées et collectées sous forme de zinc pur. | EXAMPLE | {} | [&#x27;prose&#x27;] |

Error (major; p15): Cites heating zinc to vaporization under vacuum and condensing it as an example of vapour phase refining. This is an example of distillation refining.

Correction: Standard examples of vapour phase refining are the Mond process for nickel (formation and decomposition of nickel tetracarbonyl) and the Van Arkel-de Boer method for zirconium or titanium (formation and decomposition of tetraiodides).

## u6: Summary of the purification method (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the explanation in the conclusion.

Accuracy: **contains_error**. Reiterates the erroneous principle that vapour phase refining functions by exploiting differences in physical vapour pressure between metals and impurities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **Conclusion** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | Le raffinage en phase vapeur est une technique puissante pour purifier les métaux. En exploitant les différences de pression de vapeur entre les métaux et leurs impuretés, il permet d&#x27;obtenir des produits de haute pureté essentiels pour diverses applications industrielles. C&#x27;est un exemple de la façon dont la compréhension des propriétés physiques des matériaux peut être utilisée pour développer des méthodes de purification efficaces. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

Error (major; p17): Concludes that vapour phase refining operates by exploiting differences in vapour pressure of physical materials, reinforcing the confusion with distillation.

Correction: Vapour phase refining operates through reversible chemical reactions forming volatile compounds rather than purely physical vapour pressure differences.

