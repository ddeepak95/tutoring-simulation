# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains vapour phase refining in French, detailing the core principles, requirements, standard industrial examples (Mond and Van Arkel processes), and advantages.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 31,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 31,
  "unique_subtopics": 4,
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

## u1: Principle and requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what vapour phase refining is, the two main steps involved (formation of a volatile compound and its thermal decomposition), and the essential conditions required.

Accuracy: **accurate**. The explanation of the two-step mechanism (volatile compound formation followed by decomposition) and the requirement that impurities do not react in the same way is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Le Raffinage en Phase Vapeur (Affinage par voie gazeuse) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | Bonjour ! Je vais t&#x27;expliquer cette méthode de purification des métaux, utilisée en chimie inorganique. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## Le Principe de Base | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | Le raffinage en phase vapeur est une méthode utilisée pour **purifier les métaux** qui contiennent des impuretés. Le principe repose sur deux étapes clés : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | 1. On fait réagir le métal impur avec une substance chimique (souvent un gaz) pour former un **composé volatil** (qui se transforme facilement en vapeur) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 2. Ce composé volatil est ensuite **décomposé** pour récupérer le métal pur | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | **Condition essentielle :** Le métal doit former un composé volatil facile à décomposer, et les impuretés ne doivent pas réagir de la même manière. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond process for the refining of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Mond process for nickel with specific reaction conditions and chemical equations.

Accuracy: **accurate**. The reaction equations, stoichiometry, temperatures (330 K for tetracarbonylnickel formation, 450-470 K for decomposition), and chemical descriptions are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## Deux Exemples Célèbres | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | ### 1️⃣ Le Procédé Mond (pour le Nickel) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | **Étape 1 - Formation du composé volatil :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | $$Ni + 4CO \xrightarrow{330K} Ni(CO)_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | Le nickel impur réagit avec le monoxyde de carbone (CO) à 330 K pour former le **tétracarbonylnickel**, un composé gazeux. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | **Étape 2 - Décomposition (purification) :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | Ce gaz est ensuite chauffé à une température plus élevée (450-470 K), ce qui le décompose et libère le **nickel pur**. Le CO libéré peut être réutilisé ! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Van Arkel method for the refining of titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel-de Boer method for purifying titanium, detailing both reaction steps and temperatures.

Accuracy: **accurate**. The equations for titanium iodination at ~523 K and decomposition on a tungsten filament at ~1700 K are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### 2️⃣ Le Procédé Van Arkel (pour le Titane ou le Zirconium) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | **Étape 1 :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | $$Ti + 2I_2 \xrightarrow{523K} TiI_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | Le titane impur réagit avec l&#x27;iode pour former le **tétraiodure de titane**, volatil. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | **Étape 2 :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | $$TiI_4 \xrightarrow{1700K} Ti + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | Ce composé est décomposé sur un filament de tungstène chauffé à très haute température (1700 K), déposant le **titane pur** sur le filament. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Advantages and efficiency of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the method is effective, detailing high purity, reversibility/reagent recycling, and selectivity.

Accuracy: **accurate**. The stated advantages (separation from non-volatile impurities, reagent recycling, and selectivity) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Pourquoi Cette Méthode est-elle Efficace ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | &#124; Avantage &#124; Explication &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124;----------&#124;-------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p26 | &#124; ✅ Grande pureté &#124; Les impuretés restent solides, ne réagissant pas &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p27 | &#124; ✅ Réversible &#124; Le gaz réactif (CO ou I₂) est régénéré et réutilisable &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p28 | &#124; ✅ Sélective &#124; Seul le métal cible forme le composé volatil &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u5: Summary flowchart and closing inquiry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a high-level summary flow of vapour phase refining and ends with an invitation for follow-up questions.

Accuracy: **accurate**. The summary flow captures the overall process correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ## Petit Résumé à Retenir 📝 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | &gt; **Métal impur + Réactif → Composé volatil → (décomposition) → Métal pur + Réactif régénéré** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p31 | As-tu des questions sur l&#x27;une de ces étapes, ou souhaites-tu que j&#x27;approfondisse un exemple en particulier ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

