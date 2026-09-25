# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains the concept of isotopes for a high school audience, covering definition, atomic structure, examples, etymology, and practical applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 39,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 39,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Twin analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Imagine deux frères jumeaux. Ils ont exactement la même tête, le même ADN, ils portent le même nom de famille et s'habillent pareil."}, {"passage_id": "p6", "quote": "Mais l'un d'eux a décidé de mettre des haltères dans son sac à dos."}, {"passage_id": "p7", "quote": "Si tu les fais monter sur une balance : l'un est plus lourd que l'autre."}]}

Annotation rationale: Uses the analogy of identical twins, where one carries weights in a backpack, to illustrate how two identical entities can differ only in mass.

Accuracy: **accurate**. The analogy accurately captures the conceptual relationship between identical chemical identity and differing mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. Aujourd&#x27;hui, on s&#x27;attaque à un mot qui fait souvent peur au lycée, mais tu vas voir qu&#x27;en réalité, le concept est super simple et très visuel : **les isotopes**. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Pour bien comprendre, je vais te donner une image, puis on regardera la physique-chimie qu&#x27;il y a derrière, et enfin à quoi ça sert dans la vraie vie. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. L&#x27;analogie des jumeaux | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine deux frères jumeaux. Ils ont exactement la même tête, le même ADN, ils portent le même nom de famille et s&#x27;habillent pareil. Impossible de les distinguer au premier coup d&#x27;œil.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | Mais l&#x27;un d&#x27;eux a décidé de mettre des haltères dans son sac à dos.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | Si tu les fais monter sur une balance : l&#x27;un est plus lourd que l&#x27;autre. Pourtant, **ce sont fondamentalement les mêmes personnes**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | En chimie, c&#x27;est exactement ça, un **isotope**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Atomic structure review: protons, electrons, and neutrons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the constituents of the atom (protons defining elemental identity Z, electrons handling chemistry, and neutral neutrons stabilizing the nucleus and contributing mass).

Accuracy: **accurate**. The descriptions of protons, electrons, and neutrons align with standard high-school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p10 | ### 2. Le rappel express sur l&#x27;atome | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Dans un atome, tu as : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p12 | 1. **Les protons** : C&#x27;est la **carte d&#x27;identité** de l&#x27;atome (le numéro $Z$). Si un atome a 6 protons, c&#x27;est *obligatoirement* du carbone. S&#x27;il en a 7, c&#x27;est de l&#x27;azote. On ne peut pas y toucher. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | 2. **Les électrons** : Ils tournent autour, ce sont eux qui gèrent les réactions chimiques. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 3. **Les neutrons** : Ils sont dans le noyau avec les protons. Ils n&#x27;ont pas de charge électrique. En gros... ils servent de colle pour stabiliser le noyau et ils pèsent lourd. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Formal definition and chemical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms having the same number of protons but a different number of neutrons, leading to identical chemical behavior but different mass.

Accuracy: **accurate**. The definition and the explanation of identical chemical properties (governed by the electronic structure) are accurate and standard for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ### 3. La définition officielle (celle pour ton contrôle) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | &gt; **Des isotopes sont des atomes qui ont le même nombre de protons (donc c&#x27;est le même élément chimique), mais un nombre DIFFÉRENT de neutrons.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | Comme ils ont le même nombre de protons et d&#x27;électrons, **ils ont exactement les mêmes propriétés chimiques** (ils réagissent de la même façon). La seule chose qui change, c&#x27;est leur **masse** (leur poids). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of carbon (Carbon-12 and Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-12 and carbon-14 as concrete illustrations of isotopes of the same element with different neutron numbers.

Accuracy: **contains_error**. The text asserts that carbon exists in nature mainly in two forms: carbon-12 and carbon-14. In reality, the second most abundant natural isotope of carbon is stable carbon-13 (~1.1%), whereas carbon-14 is radioactive and exists only in trace amounts (~1 part per trillion).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | #### L&#x27;exemple classique : Le Carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | Dans la nature, le carbone existe principalement sous deux formes : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | * **Le Carbone 12 ($^{12}_{6}\text{C}$)** : 6 protons, 6 neutrons. (Masse = 12). C&#x27;est le carbone ultra-majoritaire (99% de ce qui t&#x27;entoure). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * **Le Carbone 14 ($^{14}_{6}\text{C}$)** : 6 protons... mais **8 neutrons** ! (Masse = 14). Il a deux neutrons de trop dans son sac à dos. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (minor; p20, p22): The passage states that natural carbon exists mainly under two forms, carbon-12 and carbon-14, omitting carbon-13 and incorrectly implying carbon-14 is one of the primary natural forms.

Correction: Natural carbon consists predominantly of carbon-12 (~98.9%) and carbon-13 (~1.1%). Carbon-14 exists only in minute trace quantities (about 1 part per trillion).

## u5: Etymology of isotope and periodic table placement (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the Greek etymology ('iso' = same, 'topos' = place) and how it relates to occupying the same cell in the periodic table.

Accuracy: **accurate**. The etymology and explanation of periodic table placement are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | ### 4. Mais pourquoi le mot &quot;Isotope&quot; ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | Une petite astuce étymologique pour briller en classe : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | En grec, *Iso* veut dire &quot;même&quot;, et *Topos* veut dire &quot;lieu&quot;. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | Les isotopes sont à la **&quot;même place&quot;** dans le tableau périodique de Mendeleïev. Tu n&#x27;as pas une case pour le Carbone 12 et une case pour le Carbone 14. Ils partagent la même case : celle du Carbone ($C$). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Archaeological dating using Carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the utility of isotopes through radioactive dating in archaeology.

Accuracy: **accurate**. Correctly describes the principle of radiocarbon dating based on the radioactive decay of unstable carbon-14 in organic remains.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | ### 5. À quoi ça sert ? (La minute culture) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | Tu pourrais te dire : *&quot;OK m&#x27;sieur/dame, mais qu&#x27;est-ce qu&#x27;on en a à faire qu&#x27;il y ait des neutrons en plus ?&quot;* | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | Eh bien, c&#x27;est crucial ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | 1. **L&#x27;archéologie (Datation au Carbone 14) :** Le carbone 14, avec ses neutrons en trop, est instable : il est *radioactif*. Il se désintègre à un rythme ultra-précis au fil des siècles. En mesurant ce qu&#x27;il en reste dans un os de mammouth ou un morceau de bois antique, on peut savoir exactement quand il est mort ! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Medical tracers using radioisotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates medical imaging applications using radioactive isotope tracers.

Accuracy: **accurate**. Accurately describes how radioactive isotopes are injected as tracers in medical imaging.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | 2. **La médecine :** On injecte parfois des isotopes radioactifs inoffensifs dans le corps (des traceurs) pour illuminer des tumeurs ou voir le fonctionnement du cœur au scanner. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Nuclear energy using Uranium-235 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates nuclear power applications by contrasting fissile uranium-235 with uranium-238.

Accuracy: **accurate**. Correctly highlights the practical distinction between fissile uranium-235 and uranium-238 in nuclear energy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | 3. **L&#x27;énergie nucléaire :** Dans les centrales, on utilise un isotope très précis de l&#x27;Uranium : **l&#x27;Uranium 235** (car il se casse facilement pour libérer de l&#x27;énergie), alors que l&#x27;Uranium 238, son grand frère, ne le fait pas. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: High school exam recap definition (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise single-sentence summary of the definition for high school exams.

Accuracy: **accurate**. The summary formula correctly equates isotopes with same atomic number Z and differing mass number A.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | ### Le récap&#x27; pour le bac : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | Si tu dois retenir une seule phrase :  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p38 | **&quot;Même numéro atomique $Z$ (même élément), mais nombre de masse $A$ différent (nombre de neutrons différent).&quot;** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p39 | Est-ce que c&#x27;est plus clair pour toi, ou tu veux qu&#x27;on fasse un petit exercice pour vérifier ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

