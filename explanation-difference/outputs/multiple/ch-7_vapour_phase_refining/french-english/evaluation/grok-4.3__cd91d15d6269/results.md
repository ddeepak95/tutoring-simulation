# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains vapour phase refining accurately, covering the general principle and key industrial examples (Mond process and Van Arkel process).

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 16,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2
  },
  "nested_passages": 16,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and fundamental steps of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition, chemical rationale, and three-step operating principle of vapour phase refining.

Accuracy: **accurate**. The explanation correctly defines vapour phase refining, including the formation of a volatile compound, separation from non-volatile impurities, and thermal decomposition to recover pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour élève ! Je vais t’expliquer le raffinage en phase vapeur de façon simple et claire. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Le raffinage en phase vapeur est une méthode de purification des métaux qui repose sur la volatilité (capacité à passer à l’état de vapeur) de certains composés métalliques. On transforme le métal impur en un composé gazeux, on le sépare des impuretés, puis on le décompose pour récupérer le métal très pur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | **Principe général :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | 1. Le métal impur réagit avec un gaz (comme le monoxyde de carbone ou l’iode) pour former un composé volatil. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. Ce composé gazeux est vaporisé et transporté ailleurs ; les impuretés, qui ne forment pas de gaz, restent derrière. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | 3. On chauffe ensuite le composé volatil à plus haute température : il se décompose, libère le métal pur (solide) et régénère le gaz. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: The Mond process for purifying nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked real-world example of vapour phase refining detailing the formation of nickel tetracarbonyl, its conditions, chemical equations, and subsequent thermal decomposition.

Accuracy: **accurate**. The temperatures, reactions, and separation rationale for the Mond process are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Exemple concret : le nickel par le procédé Mond** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - À basse température (50-80 °C), le nickel impur réagit avec le monoxyde de carbone : | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 |   Ni (impur) + 4 CO → Ni(CO)₄ (gaz) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p10 | - Le Ni(CO)₄, très volatil, est distillé et transporté. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - À environ 180-200 °C, il se décompose : | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 |   Ni(CO)₄ → Ni (pur) + 4 CO | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p13 | Le nickel pur se dépose sous forme solide et le CO est recyclé. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | Les impuretés (cuivre, fer…) ne forment pas de composés volatils et restent dans le résidu. Cette méthode donne un nickel de très haute pureté. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: The Van Arkel process for titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Briefly mentions the Van Arkel method as a second industrial example using iodine to refine titanium or zirconium.

Accuracy: **accurate**. Correctly states that the Van Arkel process applies to titanium and zirconium using iodine to form volatile iodides that are subsequently decomposed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | Un autre exemple est le procédé van Arkel (titane ou zirconium) où l’on utilise de l’iode pour former un iodure volatil qui est ensuite décomposé. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | Tu as compris le principe ? Si tu veux un schéma ou d’autres exemples, dis-le-moi ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

