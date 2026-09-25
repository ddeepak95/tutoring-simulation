# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the principle and general steps of vapour phase refining and illustrates them with the Mond process for purifying nickel.

## Counts

```json
{
  "total_content_units": 2,
  "substantive_content_units": 2,
  "total_passages": 13,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 13,
  "unique_subtopics": 2,
  "contextualization": {
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "contains_error": 1,
    "accurate": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Principles and steps of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining, provides its definition, and details the three core steps of the process.

Accuracy: **contains_error**. The unit inaccurately cites chlorides as typical volatile compounds formed in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour! Aujourd&#x27;hui, nous allons discuter de la purification des métaux par raffinage en phase vapeur, également connu sous le nom de raffinage en phase gazeuse. (Today, we&#x27;re going to discuss the purification of metals by vapour phase refining.) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Le raffinage en phase vapeur est une méthode utilisée pour purifier les métaux qui peuvent être facilement convertis en composés volatils. (Vapour phase refining is a method used to purify metals that can be easily converted into volatile compounds.) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | Voici comment cela fonctionne : (Here&#x27;s how it works:) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. **Conversion en composé volatil** : Tout d&#x27;abord, le métal impur est converti en un composé volatil, généralement un chlorure ou un iodure, qui a un point d&#x27;ébullition bas. (First, the impure metal is converted into a volatile compound, usually a chloride or iodide, which has a low boiling point.) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p5 | 2. **Vaporisation** : Le composé volatil est ensuite vaporisé à une température appropriée. (The volatile compound is then vaporized at a suitable temperature.) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 3. **Décomposition** : La vapeur du composé est ensuite décomposée à une température plus élevée pour obtenir le métal pur. (The vapour of the compound is then decomposed at a higher temperature to obtain the pure metal.) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (minor; p4): The passage asserts that the impure metal is usually converted into a chloride or an iodide ('généralement un chlorure ou un iodure'). In vapour phase refining, which depends on direct thermal decomposition of the volatile compound, carbonyls (e.g., Mond process) and iodides (e.g., Van Arkel–de Boer process) are used. Metal chlorides are generally too thermodynamically stable to decompose thermally into elemental metal at accessible temperatures.

Correction: State that the metal is typically converted into a carbonyl (such as nickel tetracarbonyl) or an iodide (such as zirconium or titanium tetraiodide), rather than a chloride.

## u2: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an industrial application of vapour phase refining using the Mond process for nickel, including balanced chemical reactions.

Accuracy: **accurate**. The explanation of the Mond process, including formation and decomposition of volatile nickel tetracarbonyl along with the chemical equations, is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | Un exemple classique de raffinage en phase vapeur est la purification du nickel par le procédé Mond. (A classic example of vapour phase refining is the purification of nickel by the Mond process.) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 |  Dans ce procédé, le nickel impur est traité avec du monoxyde de carbone (CO) pour former du nickel tétracarbonyle (Ni(CO)4), un composé volatil. (In this process, impure nickel is treated with carbon monoxide (CO) to form nickel tetracarbonyl (Ni(CO)4), a volatile compound.) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 |  Ni + 4CO → Ni(CO)4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | Ensuite, le Ni(CO)4 est vaporisé et décomposé à une température plus élevée pour obtenir le nickel pur. (Then, the Ni(CO)4 is vaporized and decomposed at a higher temperature to obtain pure nickel.) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 |  Ni(CO)4 → Ni + 4CO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | C&#x27;est ainsi que fonctionne le raffinage en phase vapeur ! (That&#x27;s how vapour phase refining works!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | Maintenant, avez-vous des questions sur ce processus ? (Now, do you have any questions about this process?) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

