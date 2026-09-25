# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains isotopes in French, including atomic structure fundamentals, definitions, an analogy, carbon isotopes as concrete illustrations, chemical and physical properties, and real-world applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 42,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 42,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 8,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Atomic structure and atomic number as chemical identity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Reviews basic subatomic particles (protons, neutrons, electrons) and explains that the atomic number Z (number of protons) exclusively determines the identity of a chemical element.

Accuracy: **accurate**. The descriptions of subatomic particles and the role of the atomic number Z in defining an element are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi, tu vas voir que la notion d&#x27;**isotope**, c’est en fait très visuel et beaucoup plus simple qu&#x27;il n&#x27;y paraît.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Pour bien comprendre, faisons un tout petit rappel sur l&#x27;atome, et ensuite, je te donne une métaphore. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. Le petit rappel : La &quot;carte d&#x27;identité&quot; de l&#x27;atome | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Dans un atome, tu as un noyau au centre avec : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | *   Des **protons** (chargés positivement). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | *   Des **neutrons** (neutres, pas de charge). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | Et autour, des **électrons** qui tournent. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | Ce qui définit un élément chimique (le carbone, l&#x27;or, l&#x27;oxygène...), c&#x27;est **UNIQUEMENT son nombre de protons** (noté **$Z$**, le numéro atomique).  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | * C&#x27;est sa carte d&#x27;identité : si un atome a 6 protons, c&#x27;est **toujours** du carbone. S&#x27;il en a 7, c&#x27;est de l&#x27;azote. Tu ne peux pas changer le nombre de protons sans changer d&#x27;élément. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u2: Identical twins with backpacks metaphor (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p12", "quote": "Imagine des jumeaux identiques. Ils ont exactement le même visage, le même ADN, le même nom de famille. Mais l'un d'eux a un sac à dos un peu plus lourd que l'autre. "}]}

Annotation rationale: Introduces an everyday analogy comparing isotopes to identical twins carrying backpacks of differing weights.

Accuracy: **accurate**. The analogy accurately captures the concept that isotopes share the same core chemical identity while differing in mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### 2. Alors, c&#x27;est quoi un isotope ? (La métaphore des jumeaux) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Imagine des jumeaux identiques. Ils ont exactement le même visage, le même ADN, le même nom de famille. Mais l&#x27;un d&#x27;eux a un sac à dos un peu plus lourd que l&#x27;autre.  | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Definition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the conceptual and formal definition of isotopes as atoms having the same atomic number Z but different mass numbers A due to different neutron counts.

Accuracy: **accurate**. The definition of isotopes (same Z, different A) and explanation of the mass difference from neutrons are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **Les isotopes, ce sont des atomes &quot;jumeaux&quot; :** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | * Ils ont le **même nombre de protons** (donc c&#x27;est le même élément chimique). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | * Mais ils ont un **nombre de neutrons différent**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | Comme les neutrons pèsent lourd, l&#x27;un des atomes sera simplement plus lourd que l&#x27;autre ! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | &gt; **La définition officielle à retenir pour tes contrôles :**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | &gt; Des isotopes sont des atomes qui ont le **même numéro atomique $Z$** (même nombre de protons), mais un **nombre de masse $A$ différent** (nombre de neutrons différent). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of carbon: Carbon-12 and Carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the concept of isotopes using the classic pair Carbon-12 and Carbon-14, detailing their protons, neutrons, and mass numbers.

Accuracy: **accurate**. The proton and neutron counts and mass numbers for Carbon-12 and Carbon-14, as well as the abundance figure for Carbon-12 (~99%), are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p20 | ### 3. L&#x27;exemple classique : Le Carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | Dans la nature, le carbone existe sous plusieurs formes (isotopes). Les deux plus connus sont : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | 1.  **Le Carbone 12 ($^{12}\text{C}$) :** C&#x27;est le plus courant (99 % du carbone sur Terre). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |     *   6 protons | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 |     *   **6 neutrons** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 |     *   Masse totale ($A$) = 6 + 6 = **12** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p26 | 2.  **Le Carbone 14 ($^{14}\text{C}$) :** Tu en as sûrement entendu parler pour dater les fossiles ! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |     *   Toujours 6 protons (sinon ce ne serait plus du carbone !) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |     *   **8 neutrons** (il a deux neutrons de plus dans son &quot;sac à dos&quot;) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |     *   Masse totale ($A$) = 6 + 8 = **14** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u5: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical chemical properties (same electron configuration) but different physical properties (mass and nuclear stability leading to radioactivity).

Accuracy: **accurate**. The differentiation between identical chemical behavior and differing physical properties (mass and radioactive decay) is accurate at the high school chemistry level.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | ### 4. Est-ce qu&#x27;ils se comportent de la même façon ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | *   **Chimiquement : OUI.** Comme ils ont le même nombre d&#x27;électrons et de protons, ils font exactement les mêmes réactions chimiques. Le Carbone 14 peut faire du CO₂ tout comme le Carbone 12. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | *   **Physiquement : NON.**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |     *   Leur masse est légèrement différente. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 |     *   Certains ont un noyau trop &quot;chargé&quot; en neutrons et deviennent instables : on dit qu&#x27;ils sont **radioactifs** (c&#x27;est le cas du Carbone 14 ou de l&#x27;Uranium 235). Avec le temps, ils finissent par se désintégrer. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Application in archaeology: Carbon-14 dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world application of radioisotopes in archaeology for dating mummies and prehistoric paintings using Carbon-14.

Accuracy: **accurate**. Radiocarbon dating is accurately identified as a method used in archaeology to date organic artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### 5. À quoi ça sert dans la vraie vie ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | *   **En archéologie :** Dater des momies ou des peintures préhistoriques (grâce au Carbone 14). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Application in medicine: Scanners and radiotherapy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the medical use of radioisotopes for diagnostic imaging (scanners) and cancer treatment (radiotherapy).

Accuracy: **accurate**. Radioisotopes are indeed used in nuclear medicine for medical imaging and radiotherapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | *   **En médecine :** Certains isotopes radioactifs sont injectés à toute petite dose pour faire des scanners ou détruire des tumeurs (radiothérapie). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Application in energy: Uranium-235 in nuclear power plants (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the energy sector application of Uranium-235 as a nuclear fuel.

Accuracy: **accurate**. Uranium-235 is the fissile isotope standardly utilized as fuel in nuclear reactors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | *   **En énergie :** L&#x27;Uranium 235 est l&#x27;isotope utilisé comme combustible dans les centrales nucléaires. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Summary of isotope concept and comprehension check (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential takeaway (same element/protons/chemical behavior, different neutrons/weight) and offers a closing comprehension check.

Accuracy: **accurate**. The recap accurately synthesizes the core points defining isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | **En résumé :**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | Même élément, mêmes protons, même comportement chimique... mais pas le même nombre de neutrons, donc pas le même poids ! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p42 | Est-ce que c&#x27;est plus clair pour toi, ou tu veux qu&#x27;on fasse un petit exercice pour t&#x27;entraîner ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

