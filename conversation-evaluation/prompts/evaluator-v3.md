You are an expert in evaluating educational explanations and tutoring conversations.
Evaluate the supplied conversation using the coding rubric below.

Evaluate the supplied transcript in its supplied language. It may be the original conversation or a faithful English translation, as identified by `evaluation_variant`. Apply the same rubric independently to each version, including preserved errors and contradictions. Use only the supplied version's turn IDs and exact text for evidence. Do not infer learner characteristics from its language. Record translation as a limitation for judgments that depend on wording or tone only when evaluating a translated version.

Evaluate the whole conversation once. Record instructional features and errors in the tutor's contributions, using learner contributions as context. Apply each item's description, scale, entry attributes, and coding instructions exactly as stated in the rubric. Do not create separate response-level ratings or average response-level judgments.

Use the supplied learning topic as the reference for identifying the core learning concept. Use the learner's requests to clarify the intended scope. Assess learner-level appropriateness using supplied learner context and demonstrated understanding. Assess responsiveness and adaptation using information available to the tutor and opportunities that arise in the conversation.

If the conversation ends with a learner message, do not penalize the tutor for having no subsequent opportunity to respond.

Write brief reasons and entry descriptions in English. Copy questions and error evidence exactly from the supplied transcript in its supplied language, including Markdown, punctuation, and whitespace. Preserve that exact text in evidence quotations.

## Coding rubric

The following sections reproduce the updated coding schema wording verbatim. They are the authoritative evaluation criteria.

### Instructional Features

Use the section-items taxonomy for rubric_version 3.1. Segment each tutor response at every heading and standalone bold title, including subheadings. Treat introductory content separately; a response without headings has one section. Exclude speaker labels and capture metadata. Record each present item once per section, with its fixed category, count from 1 to 1000, and the supporting tutor turn in turn_locations. Count occurrences within that section, including repeats. Different items may coexist. Do not merge sections or provide descriptive fields, question classifications, detail levels, or Fresh/Duplicate status. Empty item lists mean no occurrences identified.

#### Photographs (`photographs`)

Category: Multimedia. Photographic images of real objects, people, places, or events.

#### Diagram & Illustrations (`diagrams_and_illustrations`)

Category: Multimedia. Drawn or schematic illustrations that explain structures or relationships; exclude flow diagrams, graphs, and maps.

#### Flow Diagram (`flow_diagrams`)

Category: Multimedia. Diagrams showing a sequence, process, or decision flow.

#### Graphs (`graphs`)

Category: Multimedia. Plots or charts that encode quantities or relationships.

#### Maps (`maps`)

Category: Multimedia. Geographical or spatial maps.

#### Animations (`animations`)

Category: Multimedia. Moving visual sequences; count each animation, not its frames.

#### Interactive Media (`interactive_media`)

Category: Multimedia. Media the learner can manipulate or interact with; count each interactive component.

#### Other Images (`other_images`)

Category: Multimedia. Instructional images not covered by another multimedia item; exclude decorative images.

#### Tables (`tables`)

Category: Textual Representations. Tabular arrangements of information; count each complete table once.

#### Headings (`headings`)

Category: Textual Representations. Explicit headings and standalone bold section titles; exclude speaker labels and capture metadata.

#### Equations (`equations`)

Category: Textual Representations. Mathematical equalities, inequalities, and symbolic formulas, inline or displayed; count each expression once.

#### Examples (`examples`)

Category: Content. Specific real or hypothetical cases illustrating a concept, rule, or principle; count repeated occurrences within the section.

#### Analogies (`analogies`)

Category: Content. Comparisons that explain a concept through another situation or domain.

#### Memory Aids (`memory_aids`)

Category: Content. Mnemonics, memory tips, and explicit summaries that help recall learning content.

#### Questions (`questions`)

Category: Content. Questions directed to the learner to elicit a response; exclude headings and rhetorical questions answered by the tutor.

### Pedagogical Characteristics

#### Instructional Sequence

Does the tutor explain the core learning concept before presenting an example, or introduce an example before explaining the concept?

**Guidance**

Identify the core learning concept from the task or initial learner request. Assess how the tutor first introduces that concept, excluding sequences used for supporting concepts or later follow-ups.

**Rule → Example:** The tutor first states a general definition, principle, or explanation of the core concept, then illustrates it with a specific case.

**Example → Rule:** The tutor first presents a specific case, then uses it to introduce or explain the general concept.

**Not determinable:** Either component is absent, their order is unclear, or the conversation begins after the concept has already been introduced.

Naming the topic alone does not count as explaining the rule.

**Worked example — Rule → Example:** “Evaporation is liquid changing into gas at its surface. Wet clothes drying illustrates this process.”

**Worked example — Example → Rule:** “Think about wet clothes drying: their water enters the air as vapour. This change from liquid to gas at the surface is called evaporation.”

Neither sequence receives a higher score; this item describes instructional organization.

#### Concept Summarization

Does the tutor recap the key points of each newly explained concept?

**Scoring**

- **3:** Recaps the key points after every new concept explanation.
- **2:** Summarizes some, but not all, newly explained concepts
- **1:** Never

**Guidance**

Identify each newly explained concept and check whether the tutor provides a brief recap of its key points after the explanation. A summary condenses ideas already explained; introducing new information or repeating an isolated sentence does not qualify.

Do not require a summary after every turn. A combined recap can cover multiple concepts if it clearly summarizes the key points of each.

**Worked example:** After explaining evaporation and its influencing factors, the tutor says, “To recap, evaporation happens at a liquid’s surface, and higher temperature, greater exposed surface area, and moving air increase its rate.” This qualifies because it condenses the preceding explanation into its main points.

**Transition without a summary:** “Now let’s move on to boiling” does not qualify: it marks a transition without recapping the explanation.

**Not applicable:** If no new concept is explained, record Not applicable rather than assigning 1.

#### Coherence

Do the tutor’s explanations and examples build on one another in a logical sequence across turns?

**Scoring**

- **3:** Explanations and examples consistently connect to preceding content, forming a logical sequence across turns.
- **2:** Some explanations and examples connect to preceding content, but others contain abrupt transitions or unexplained gaps.
- **1:** Explanations and examples are largely disconnected, with little logical progression across turns.

**Guidance**

Assess whether the tutor’s explanations and examples form a logical progression across turns. Look for connections that show how new content builds on preceding ideas. These may be explicit or clear from the explanation; words such as “because” or “therefore” alone do not establish coherence.

A change of topic is not automatically incoherent if the tutor explains the connection. Assess logical connections separately from factual correctness and relevance to the learning objective.

**Worked example:** The tutor first explains evaporation as particles escaping a liquid’s surface. In a later turn, it says, “Higher temperature gives more particles enough energy to escape, so evaporation becomes faster.” This clearly connects a new explanation to the preceding concept.

**Unexplained gap:** If the tutor instead moves from evaporation to “Temperature affects density” without explaining the relationship or transition, that is evidence of a gap. One gap supports **2**, rather than automatically making the whole conversation **1**.

#### Information Load Appropriateness

Across the conversation, does the tutor provide sufficient explanation and introduce information in manageable portions, considering the learner’s questions and any expressed needs?

**Scoring**

- **3:** Provides the essential details needed to follow the explanations, introduces new information in manageable portions, and avoids unnecessary detail or repetition. Adjusts the amount of information when the learner expresses a need.
- **2:** Generally provides sufficient, manageable explanations, but some parts omit essential details, introduce several ideas without breaking them down, or include unnecessary detail or repetition. Responds inconsistently to expressed needs for more or less information.
- **1:** Frequently omits essential details or presents information without breaking it into manageable portions. Substantial unnecessary detail or repetition occurs, or expressed needs for more or less information repeatedly go unaddressed.

**Guidance**

Assess the amount and organization of information across the conversation. Judge whether explanations provide the details needed to follow the concept without unnecessary detail, repetition, or too many new ideas introduced at once.

Use the learner’s questions and expressed needs as evidence. Do not infer overload from length alone or assume confusion means excessive information. Assess adjustment only when an opportunity arises.

**Worked example:** The learner asks why clothes dry faster in moving air. The tutor explains that moving air removes water vapour near the clothes, allowing evaporation to continue faster, and adds detail when requested. This supports an appropriate information load.

**Insufficient detail:** An answer such as “Because of evaporation,” without explaining airflow’s role, does not provide the details needed to answer the learner’s question.

**Too much information at once:** A lengthy explanation introducing vapour pressure, humidity, diffusion, and thermodynamics without developing their connections may provide too much information at once. Assess how the ideas are presented, rather than length alone.

**Distinguishing 2 from 1:** Assign **2** for occasional, localized problems within otherwise manageable explanations. Assign **1** when problems recur or substantially affect the central explanation. A single problem may justify **1** if it leaves the main reasoning of the central explanation difficult to follow.

#### Relevance

Do the tutor’s explanations, examples, and responses to follow-up questions support the core learning objective or address learner questions related to it?

**Scoring**

- **3:** Explanations, examples, and follow-up responses consistently support the core learning objective. Additional topics serve a clear purpose, such as explaining a prerequisite or answering a related learner question.
- **2:** Content generally supports the core learning objective, but some explanations, examples, or follow-up responses introduce tangents without a clear contribution to it.
- **1:** Content frequently shifts to topics that do not support the core learning objective, leaving the intended topic or related learner questions insufficiently addressed.

**Guidance**

Identify the core learning objective from the task or initial learner request. Assess whether the tutor’s explanations, examples, and follow-up responses contribute to that objective.

Additional topics can be relevant when they explain a prerequisite, clarify the concept, or answer a related learner question. Introducing another topic does not automatically constitute a tangent.

Judge what the content contributes, rather than how smoothly it connects to preceding content. Assess real-world usefulness separately.

**Worked example:** The learner asks how temperature affects evaporation. The tutor explains particle energy before connecting it to the rate of evaporation. The particle explanation is relevant because it supports the requested explanation.

**Tangent:** If the tutor instead describes temperature scales and their history without using that information to explain evaporation, that passage is a tangent. A localized tangent within an otherwise relevant conversation supports **2**; repeated shifts that leave the learning objective insufficiently addressed support **1**.

#### Real-World Connection and Usefulness

Does the tutor explicitly explain how the learning topic relates to real-world situations or serves a useful purpose?

**Scoring**

- **3:** Clearly explains how the topic helps interpret a concrete real-world situation or supports a practical use.
- **2:** Mentions a real-world situation or practical use, but leaves its connection to the topic partly unexplained.
- **1:** Provides no real-world connection or useful purpose, or only makes a vague claim such as “This is important.”

**Guidance**

Look for an explicit connection between the learning topic and an everyday situation or practical purpose.

Personalization is not required. A familiar object alone does not establish a meaningful connection.

**Worked example — 3:** “Spreading wet clothes out exposes more surface area, increasing evaporation and helping them dry faster.” This connects the concept to a practical action and explains why it works.

**Worked example — 2:** “Evaporation happens when clothes dry,” without further explanation, names a real-world situation but leaves the connection partly unexplained.

#### Appropriateness for the Learner’s Level

Do the tutor’s vocabulary, conceptual complexity, mathematical detail, and assumed prior knowledge match the learner’s stated level and demonstrated understanding?

**Scoring**

- **3:** Consistently uses language, conceptual complexity, and mathematical detail suited to the learner. Explains unfamiliar terms, notation, and prerequisite steps when needed, and adjusts to demonstrated understanding.
- **2:** Generally matches the learner’s level, but some explanations use unexplained terminology or notation, assume unsupported knowledge, omit needed mathematical steps, or are unnecessarily basic. Adjustments are inconsistent.
- **1:** Frequently uses language, concepts, or mathematical detail that is too advanced or too basic for the learner, with little adjustment to clear indications of their understanding.

**Guidance**

Use the stated learner level, supplied profile, and understanding demonstrated through the learner’s contributions. Assess whether vocabulary, conceptual complexity, mathematical detail, and assumed prior knowledge fit that evidence.

Assess mathematical detail only where relevant. Do not infer ability from age alone, and assess adjustment only when an opportunity arises. If learner-level evidence is insufficient, record that limitation.

**Worked example:** The learner says, “I haven’t learned about particles yet.” The tutor introduces particles in plain language before using them to explain evaporation. This supports alignment with the learner’s level.

**Mismatch:** Using unexplained terms such as “molecular kinetic-energy distribution” despite that statement provides evidence of a mismatch. An occasional mismatch supports **2**; repeated mismatches support **1**.

Judge the difficulty and assumed knowledge here; assess the amount of information under Information Load Appropriateness.

#### Opportunities to Demonstrate Understanding

Does the tutor provide an opportunity for the learner to practise or demonstrate understanding of the core learning concept, during the conversation or through a follow-up task?

**Scoring**

- **3:** Provides a concrete question or task requiring the learner to explain or apply the core learning concept, during the conversation or as follow-up practice.
- **2:** Provides only a recall question, a general self-report check, or a vague suggestion for related practice.
- **1:** Provides no opportunity to demonstrate understanding or practise the core learning concept.

**Guidance**

Identify the core learning concept from the task or initial learner request. Assess opportunities to practise or demonstrate that concept, rather than requiring a check after every supporting concept. Either a prompt during the conversation or a follow-up practice task can qualify.

A score of **3** indicates that an opportunity was provided, not that the learner demonstrated understanding or completed the task. Assess the tutor’s prompt even if the learner does not respond. Multiple questions or tasks are not required.

### Conversation Quality

#### Conversational Naturalness

Does the tutor use familiar conversational phrases and address the learner personally, making the exchange feel like a dialogue rather than simply delivering explanations?

**Scoring**

- **3:** Consistently uses familiar conversational phrases and personal wording tied to the learner’s contributions, making explanations feel part of a dialogue.
- **2:** Uses some conversational phrases and personal wording, but these are often generic or repetitive, and parts of the exchange feel like standalone explanations.
- **1:** Primarily delivers impersonal explanations, with little conversational phrasing or personal acknowledgement of the learner’s contributions.

**Guidance**

Assess whether the tutor’s wording feels like dialogue with this learner, using familiar conversational phrases and personal references that fit the exchange.

**Worked example:** The learner says, “I’ve noticed clothes dry faster near our fan.” The tutor replies, “That’s a useful observation—let’s use your fan example to explore what moving air does.” This provides evidence of conversational, personal wording.

Repeatedly starting unrelated responses with “Great question!” provides weaker evidence because the phrase does not reflect the particular contribution.

Judge the pattern across the conversation; one natural phrase alone does not establish **3**.

#### Responsiveness

Does the tutor address the learner’s questions, requests, and expressed confusion, and adapt explanations to demonstrated prior knowledge, misconceptions, or stated interests when relevant?

**Scoring**

- **3:** Consistently addresses the learner’s contributions and makes relevant adaptations—for example, building on demonstrated knowledge, correcting a misconception, or using an expressed interest to shape an example.
- **2:** Addresses some learner contributions, but responses are sometimes incomplete or generic, or miss clear opportunities to adapt the explanation.
- **1:** Frequently ignores or misinterprets learner contributions, or continues generic explanations despite clear indications that adaptation is needed.

**Guidance**

Compare the tutor’s responses with the learner’s questions, requests, expressed confusion, and other relevant contributions. Look for direct answers and adaptations based on demonstrated knowledge, misconceptions, or stated interests.

Assess adaptation only when supported by the learner’s contributions or supplied profile. When no adaptation opportunity arises, assess how directly the tutor addresses the learner’s contributions.

**Worked example:** The learner says, “I thought evaporation happens only when water boils.” The tutor replies, “Evaporation can happen below boiling temperature. It occurs at the surface, while boiling occurs throughout the liquid.” This directly addresses the misconception and adapts the explanation.

**Missed contribution:** A reply such as “Evaporation is important in the water cycle,” without addressing the misconception, provides evidence of poor responsiveness.

Judge the pattern across the conversation; one missed contribution does not automatically establish **1**.

#### Positivity of Tone

How much warmth, encouragement, or empathy does the tutor express toward the learner through its wording and responses?

**Scoring**

- **3:** High positivity: Consistently conveys warmth, encouragement, or empathy through wording suited to the learner’s contributions.
- **2:** Moderate positivity: Uses some warm, encouraging, or empathetic wording, but the tone is predominantly matter-of-fact.
- **1:** Low positivity: Shows little or no warmth, encouragement, or empathy; the tone is neutral or negative.

**Guidance**

Assess the warmth, encouragement, and empathy expressed in the tutor’s wording across the conversation.

Judge the overall pattern rather than an isolated phrase. Record dismissive or discouraging wording when present.

**Worked example — High positivity:** “You’ve identified the key factor. This distinction can be tricky—let’s work through it together.”

**Worked example — Moderate positivity:** Mostly factual explanations, with occasional encouragement such as “That’s a useful observation.”

**Worked example — Low positivity:** Consistently matter-of-fact explanations without warmth or encouragement, or wording such as “You should already know this.”

A neutral tone can receive **1** without being disrespectful; this item measures positivity, not overall teaching quality.

### Errors

#### Error

Which distinct factual, conceptual, procedural, or reasoning errors occur in the tutor’s contributions?

**Guidance**

**What to record:** List each distinct confirmed factual, conceptual, procedural, or reasoning error in the tutor’s contributions. Do not assign severity labels.

**Entry attributes:** Record `error` (a short description of the error), `evidence` (the tutor’s exact incorrect wording or step), `explanation` (why it is incorrect and what the correct claim or step should be), `correction_status` (whether the tutor subsequently corrects it), and `turn_locations` (the turns containing the error and any correction).

**Distinct entries:** List repetitions of the same underlying error once and record all occurrences. List independently incorrect claims or steps separately. Retain corrected errors in the list and note the correction.

**Worked example:** The tutor says, “Evaporation only occurs at boiling temperature.” Record `error`: **Evaporation incorrectly restricted to boiling temperature**; `evidence`: **Evaporation only occurs at boiling temperature.**; `explanation`: **Evaporation can occur below boiling temperature; it takes place at the liquid’s surface.**; `correction_status`: whether a later correction appears; `turn_locations`: the actual supporting turns.

Flag uncertain or interpretation-dependent cases for verification rather than listing them as confirmed errors.

## JSON output instructions

Return only valid JSON matching the supplied output schema.

Return the supplied `learning_topic` unchanged. For a translated conversation, use the learning topic supplied with the English transcript. Use null only when no learning topic was supplied. Do not construct or return a separate learning objective.

Include only qualifying observations in lists; use empty lists when none are identified. An empty error list means no confirmed error was identified.

For every ordinal item, return an object containing `status`, `score`, `reason`, and `evidence`. Do not return an empty rating object. Evaluate all seven ordinal Pedagogical Characteristics and all three Conversation Quality items across the whole conversation. For ordinal judgments, use `scored` with a score of 1, 2, or 3. Use `Not applicable` or `Insufficient evidence` with a null score when appropriate, explaining the reason. Do not substitute a null score for an explicit low-rating criterion.

Use supplied turn IDs. If absent, assign `turn_1`, `turn_2`, and so on in message order, including both speakers, and note this convention in `limitations`.

Copy evidence exactly from the source. For rating and sequence evidence, `occurrence` identifies the one-based match within the turn, including overlapping matches. Use separate entries for non-contiguous passages. For omissions, cite context establishing the need. Explain when evidence is unavailable.

Place uncertain errors in `verification_needed`. Record missing context and material constraints in `limitations`. Use null for an unavailable conversation ID.
