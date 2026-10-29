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

Prompt version: conversation-section-items/10. Output rubric_version remains 3.1 (the section-item wire format).

When no canonical section inventory is supplied, segment tutor responses at headings and standalone bold titles; introductory content is separate, and an unheaded response has one section. Use supporting tutor turn IDs in turn_locations for legacy transcripts.

Count occurrences within each tutor section, including repeats; student turns supply context only. Save one annotation per section/item pair with count from 1 to 1000; omit absent items. Categories are fixed metadata. Do not merge sections. The same passage can receive multiple labels only when each definition is independently satisfied. Apply the same criteria across languages and translations.

Walkthrough continuation rule: a cohesive walkthrough with at least two linked steps may span consecutive sections. Count it once on the section where it starts; its consecutive continuation sections add no walkthrough count. A walkthrough independently presented again later counts normally, even when its content is similar. Do not deduplicate walkthroughs across the whole conversation. Other labels retain their own counting rules.

For HTML captures, use the exact persistent section_id from the supplied section inventory. Never invent, renumber, or resegment registered sections; translations inherit the original mappings. Section evidence includes its heading and owned interaction states. Speaker labels, capture metadata, section borders, and supporting-view captions are not instructional content.

Count the same logical occurrence once across source text, rendered images, image tiles, and captured supporting states. Distinct repeated occurrences remain separate. Inspect text-drawn layouts and all supplied visuals. Classify each static visual under its most specific visual label: Diagrams & Illustrations, Flow Diagrams, Graphs, or Static Images. A dynamic graph may also receive Interactive & Animated Media when playback or substantive manipulation is evidenced; do not count its frames as additional graphs. Decorative imagery qualifies as Static Images, but portal controls and locator decorations do not.

Include hidden questions or images only when explicit counters, numbered pagination, thumbnails, or other quantity cues establish their total. Count that total once per component, including the visible item. A navigation arrow alone establishes no quantity. For hidden images, use a specific type only when supported; otherwise use Static Images. Supporting interaction views do not add occurrences of the same component. A quiz with a stated total retains that total across answer selection, feedback, and navigation. Explain inferred totals using their quantity cue when evidence is requested.

One cohesive notation sequence or connected derivation is one Mathematical Notation occurrence within its section; unrelated sequences count separately. Count a complete list block once. A specific worked example can receive both Examples and Step-by-Step Walkthroughs, but procedural steps do not additionally count as Lists. Double-tag authentic concrete examples with Real-World Connections / Applications. Callouts can overlap pedagogical labels; bold formatting alone never qualifies.

For text-section annotations, model runs also return one exact-source highlight for each counted occurrence. Prefer a meaningful phrase of two to eight words (at least two or three words when available), rather than highlighting an entire section. For Social Cues, highlight the complete conversational expression instead of applying this phrase-length preference, excluding adjacent factual explanation. If it exceeds 500 characters, use the shortest complete utterance establishing the social move. A one-word title, mathematical symbol, or nonverbal diagram may use the shortest available identifying anchor. Keep the defining words or other evidence that justifies the label, not merely an unrelated nearby phrase. Store each quote with its one-based occurrence within its owning section; repeated text must identify the correct occurrence. These optional highlights do not replace section IDs or section counts. Different labels may highlight the same text independently. Each feature has its own display color; label names and icons remain available to identify overlapping highlights. Existing annotations without highlights remain valid; do not fabricate highlights for them. HTML and image-only evaluations retain section-based labeling when exact transcript anchors are unavailable.

### Diagrams & Illustrations (`diagrams_and_illustrations`)
Category: Visuals & Rich Media. Tag conceptual drawings, system architectures, anatomical/scientific schematics, or visual metaphors (including ASCII, SVG, or Mermaid structural diagrams). Exclude sequential flowcharts (*Flow Diagrams*) and quantitative data plots (*Graphs*). Include text-drawn diagrams made from ASCII or Unicode characters, including fenced code or preformatted blocks. An image attachment is not required. Inspect preserved line breaks, spacing, endpoints, and connectors. Exclude ordinary prose, lists, executable code, and isolated chemical formulas without a schematic spatial representation. Apply the same structural criteria in every language and translation; translating labels alone does not add or remove a diagram.

### Flow Diagrams (`flow_diagrams`)
Category: Visuals & Rich Media. Tag multi-line visual representations of sequential processes, algorithms, decision trees, state machines, or workflows with directional arrows. Require more than one meaningful visual row or level. A single-line sequence such as "Input → Process → Output" is not a Flow Diagram, even when bold, fenced as code, or automatically wrapped onto several screen lines. Prose, numbered instructions, and line breaks alone do not qualify. For images, SVG, or Mermaid, judge the rendered visual layout, not serialized source line counts. A top-to-bottom multi-level process or a branching decision diagram qualifies when connected stages span multiple visual rows or levels. Exclude static structural diagrams without sequential flow (Diagrams & Illustrations). Count each complete qualifying diagram once, not its rows, stages, or arrows.

### Graphs (`graphs`)
Category: Visuals & Rich Media. Tag quantitative data visualizations or mathematical function plots (e.g., bar charts, line graphs, scatter plots, histograms, plotted $x/y$ coordinate curves). Exclude node-edge network diagrams that do not plot quantitative axes.

### Static Images (`static_images`)
Category: Visuals & Rich Media. Tag non-schematic static visual media, including real-world photographs, geographical/spatial maps, UI screenshots, or decorative/other imagery. Exclude explanatory diagrams, flowcharts, or quantitative data graphs.

### Interactive & Animated Media (`interactive_animated_media`)
Category: Visuals & Rich Media. Tag any visual or audio-visual asset with temporal playback or user manipulation (e.g., GIFs, embedded video/audio players, dynamic animations, interactive sliders, or runnable canvas simulations/applets). Count each media component once, not individual animation frames or interaction states. Require evidence of playback or substantive manipulation; do not infer these from a still image alone. Question pagination and gallery Previous/Next controls alone do not qualify.

### Headings (`headings`)
Category: Formatting & Notation. Tag visual section dividers used to organize the explanation hierarchy, including Markdown headings (`#`, `##`, `###`) and standalone bolded lines acting as section titles. Do not tag bolded lead-in phrases inside a bullet point or paragraph.

### Lists / Bullet Points (`lists`)
Category: Formatting & Notation. Tag unordered (`*`, `-`) or numbered (`1.`, `2.`) vertical groupings of items, features, or points (count the entire list block as `1` instance). Exclude sequential numbered instructions showing how to solve a problem or execute a process from start to finish (*Step-by-Step Walkthroughs*). Count each complete list block once, not each bullet or item. Nested sublists within one cohesive list belong to that occurrence. Procedural walkthroughs do not additionally count as Lists / Bullet Points.

### Tables (`tables`)
Category: Formatting & Notation. Tag structured grid layouts organizing information into rows and columns (e.g., Markdown tables, comparison matrices, truth tables). Exclude tab-aligned plain text or lists.

### Callouts (`callouts`)
Category: Formatting & Notation. Tag visually set-apart text blocks used to draw attention to side notes, tips, or warnings (e.g., Markdown blockquotes `>`, admonition boxes like `Note:` or `Tip:`). Can be double-tagged with pedagogical labels (like *Misconceptions* or *Summaries / Key Takeaways*) if the callout serves that specific pedagogical role. Count each distinct callout block once within its section. Bold or italic formatting alone never qualifies, whether applied to a word, phrase, complete sentence, or paragraph. Exclude ordinary bold or italic body text, heading titles, speaker labels, portal section borders and labels. A formula display or boxed numerical result alone is not a Callout. The same block may receive both Callouts and a pedagogical label when both definitions are independently satisfied.

### Mathematical Notation (`equations`)
Category: Formatting & Notation. Tag formal symbolic math, equations, formulas, or variables rendered via LaTeX or mathematical symbols (e.g., standalone equations, inline variables like $x$ or $\theta$, chemical reaction equations). Exclude plain-text numbers, dates, currency, or percentages. Chemical formulas and species names alone do not qualify, even with subscripts, superscripts, ionic charges, or LaTeX formatting (e.g., H2O, CO2, NaCl, or Ca2+). Count chemical notation only when it represents a reaction with reactants and products; a list or comparison of chemical formulas is not a reaction. An actual mathematical calculation involving chemical quantities can still qualify as math; do not count its chemical species separately. Count one cohesive notation sequence or connected derivation once within its section, including its general formula, substitutions, rearrangements, intermediate steps, and final answer. Count unrelated notation sequences separately; do not count each variable or line within the same sequence. Standalone formal symbolic variables qualify when outside an already counted sequence. Symbolic comparisons and ordered relationships qualify whether the compared terms are variables, numerical values, or descriptive labels. Exclude isolated plain-text numbers, dates, currency, percentages, and unit labels. Centering, bold text, or TeX formatting alone does not establish Mathematical Notation.

### Definitions (`definitions`)
Category: Explanatory & Pedagogical Devices. Tag explicit statements introducing and explaining the formal meaning of a domain term, concept, law, or theorem (e.g., *"X is defined as..."*, *"In biology, X refers to..."*). Exclude passing mentions of jargon where the term is not explained. Count each explicitly defined term or concept once per presentation, not every sentence in its definition.

### Step-by-Step Walkthroughs (`step_by_step_walkthroughs`)
Category: Explanatory & Pedagogical Devices. Tag an ordered explanation containing at least two distinct, linked procedural steps that demonstrate how to execute a procedure, derive a formula, or solve a problem. Each step must advance the same procedure toward its outcome. A single-step explanation, one substitution, one arithmetic operation, or an answer with a brief explanation is not a Step-by-Step Walkthrough, even when numbered or spread across several lines. Unordered facts and independent one-step examples do not become a walkthrough merely by appearing together. Count each cohesive procedure or worked solution once, not each step. When the same walkthrough continues across consecutive sections, treat that uninterrupted sequence as one walkthrough and assign its count only to the section where the walkthrough starts. Later consecutive sections that continue that procedure receive no additional walkthrough count. The sequence as a whole must contain at least two linked steps; those steps may span consecutive sections. Do not combine unrelated single-step explanations. This is continuation counting, not conversation-wide deduplication: a walkthrough independently presented again later can count as a new occurrence, even if it uses the same method or problem. Sharing a topic or similar wording alone does not establish continuation. Keep the count on its starting section and preserve all persistent section IDs; do not merge or renumber sections. A specific worked example can receive both Examples and Step-by-Step Walkthroughs when it meets this multi-step requirement. A general procedure without a concrete instance is a Walkthrough only. Do not additionally count the procedural steps as Lists / Bullet Points.

### Examples (`examples`)
Category: Explanatory & Pedagogical Devices. Tag concrete instances, sample scenarios, or specific cases used to instantiate an abstract rule or concept (e.g., *"For example..."*, sample inputs/outputs, specific numerical/textual illustrations). Tag *all* concrete instances as *Examples*, and **double-tag** with *Real-World Connections / Applications* if the example is grounded in an authentic everyday, historical, or industry context. Exclude figurative comparisons to an unrelated domain (*Analogies*). Count each concrete case once within its section, including brief illustrative instances. Its introduction, diagram, calculations, intermediate steps, answer, and explanation belong to the same occurrence. Continuing or referring back to that case does not create another occurrence. Count separately presented cases separately. A case independently presented again in another section receives a count in that section. A specific worked example can receive both Examples and Step-by-Step Walkthroughs. An analogy is not automatically an Example. Unsolved practice questions alone are Questions, not Examples.

### Real-World Connections / Applications (`real_world_connections`)
Category: Explanatory & Pedagogical Devices. Tag references that bridge the abstract concept to authentic out-of-classroom contexts, industry practices, nature, history, or the learner's everyday lived experience (answers *"Where is this used in real life?"* or *"Why does this matter?"*). Tag standalone when mentioning real-world relevance broadly, or **double-tag** with *Examples* when walking through a specific real-world instance. Exclude figurative metaphors where the real-world object is not literally using the concept (*Analogies*). Count each distinct authentic application or relevance connection once, including its supporting explanation.

### Analogies (`analogies`)
Category: Explanatory & Pedagogical Devices. Tag figurative comparisons, metaphors, or similes that map an unfamiliar target concept onto a familiar everyday source domain (e.g., *"Think of X like a..."*, *"Just as a traffic cop directs cars..."*). Exclude literal within-domain examples (*Examples*) or literal applications in daily life (*Real-World Connections / Applications*). Count each distinct figurative mapping once, including its elaboration.

### Misconceptions (`misconceptions_pitfalls`)
Category: Explanatory & Pedagogical Devices. Tag explicit, accurate warnings where the chatbot proactively addresses common learner errors, false intuitions, pitfalls, edge cases, or non-examples showing what a concept is not (e.g., "A common mistake is...", "Be careful not to confuse X with Y"). Do not confuse with Bot Errors / Hallucinations, where the chatbot itself makes an error. Count each distinct misconception or pitfall addressed once, including its accurate correction. A quoted learner error followed by an accurate correction is Misconceptions, not a bot error. An inaccurate warning or correction can instead qualify as Bot Errors / Hallucinations; do not label it as an accurate misconception correction.

### Memory Aids (`memory_aids`)
Category: Explanatory & Pedagogical Devices. Tag explicit cognitive tricks designed to help the learner recall information, such as acronyms (e.g., *PEMDAS*, *SOHCAHTOA*), acrostics, rhymes, wordplay associations, or visual recall hooks. Exclude regular summaries or takeaways. Count each distinct recall device once; a regular summary or takeaway belongs under Summaries / Key Takeaways.

### Summaries / Key Takeaways (`summaries_key_takeaways`)
Category: Explanatory & Pedagogical Devices. Tag high-level syntheses or recaps that condense the core message of the explanation (e.g., *"In short..."*, *"TL;DR:"*, *"Key Takeaways:"*, *"To wrap up..."*, or concluding synthesis paragraphs). Exclude introductory topic sentences or transitions. Count each cohesive recap block once, not each takeaway bullet. A recap list can also count as Lists / Bullet Points.

### Social Cues (`social_cues`)
Category: Conversational & Tutoring Moves. Tag utterances whose conversational function is directly engaging the learner socially: acknowledging or registering their input, validating feelings or confusion, expressing empathy, praising effort or contributions, encouraging them, friendly greetings or pleasantries, or establishing collaboration and rapport. Short expressions such as "Okay", "Got it", and "Great question!" qualify when context establishes this social function; no minimum word count or substantive-engagement threshold applies. Apply the same contextual criteria in English, Tamil, and other languages. An acknowledgment such as "Yes" or "No" can qualify, but a bare domain answer or quoted example does not automatically qualify. Count one cohesive conversational move once within its section, even when expressed across multiple sentences. Count separately expressed social moves separately, such as a distinct acknowledgment followed by distinct encouragement; do not count each word or sentence of one cohesive move separately. Highlight the complete conversational expression, excluding adjacent factual explanation. This overrides the general two-to-eight-word highlight preference for Social Cues. Keep each exact-source highlight within its owning section and the existing 500-character limit; for an exceptionally long expression, use the shortest complete utterance establishing the social move. Exclude factual explanations, neutral organizational transitions, quoted examples, and instructional wording without a social function. "Let's work through this together" establishes collaboration and qualifies; "Next, consider atomic size" and purely procedural "Let's calculate the radius" do not qualify alone. Domain-knowledge questions belong to Questions, self-report pulse-checks to Comprehension Checks, and follow-up offers to Next Step Suggestions; these do not become Social Cues merely through friendly wording. Add Social Cues alongside these labels only for a separately identifiable social expression.

### Questions (`questions`)
Category: Conversational & Tutoring Moves. Tag substantive pedagogical questions posed by the chatbot that require the learner to think, recall, apply knowledge, or clarify their learning goal (e.g., Socratic questions, practice problems, or diagnostic clarifying questions). Exclude rhetorical questions immediately answered by the bot, or passive check-ins (*Comprehension Checks*). Count each independently answerable pedagogical question or practice problem once. A diagnostic question clarifying the learning goal qualifies. Do not also classify the same question as a Comprehension Check or Next Step Suggestion.

### Comprehension Checks (`comprehension_checks`)
Category: Conversational & Tutoring Moves. Tag low-stakes conversational pulse-checks gauging whether the user is following the explanation (e.g., *"Does that make sense so far?"*, *"How are you feeling about this concept?"*, *"Are you with me on step 2?"*). Exclude questions that test domain knowledge (*Questions*) social pleasantries (*Social Cues*), or offers for new topics (*Next Step Suggestions*). Count each distinct self-report check once. Classify by its requested response, not the presence of a question mark.

### Hints / Scaffolding (`hints_scaffolding`)
Category: Conversational & Tutoring Moves. Tag partial clues, guiding frameworks, or strategic nudges that help the learner solve a problem themselves without revealing the final answer (e.g., *"Try looking at the denominator first..."*, or providing a partially completed template for the user to finish). Exclude full worked solutions (*Step-by-Step Walkthroughs*). Count each cohesive hint or scaffold once, not every sentence in it. A full worked answer is not a Hint.

### Next Step Suggestions (`next_step_suggestions`)
Category: Conversational & Tutoring Moves. Tag closing conversational offers proposing specific follow-up actions, deeper dives, or practice opportunities to guide the learning trajectory (e.g., *"Would you like to try a practice problem next, or explore another example?"*). Exclude direct comprehension checks or immediate test questions. Count each cohesive closing offer once, including alternative follow-up choices in that offer. An immediate practice question is Questions instead.

### Bot Errors / Hallucinations (`bot_errors_hallucinations`)
Category: Quality & Error Tracking. Tag any span where the chatbot makes a mistake. This includes factual inaccuracies, hallucinated facts or citations, mathematical or logical calculation errors, internal self-contradictions, broken formatting or rendering glitches (e.g., unrendered LaTeX or broken tables), or pedagogical failures (e.g., directly giving away the final answer when the user explicitly asked for just a hint). Can be double-tagged over any structural or pedagogical element that contains the error. Count each distinct confirmed error once within its section, including its supporting explanation; repeated references to the same error within that occurrence do not add counts. Require evidence that the bot asserts the error or that the supplied rendering actually fails. Corrected learner errors, deliberately marked incorrect examples, valid source markup, unfamiliar terminology, language differences, and ordinary stylistic preferences alone are not bot errors. Do not infer a rendering failure from valid Markdown or LaTeX source alone. Treat uncertain or unverifiable claims as uncertain rather than confirmed errors. Judge the supplied conversation version; do not attribute an unseen source-language error to its translation or vice versa.

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

The section-based Bot Errors / Hallucinations label and this detailed error tracker describe the same confirmed mistakes at different levels. Include qualifying errors in both contracts when required; the detailed error list is not an additional instructional-feature occurrence.

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


Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.

HTML capture v2: section IDs are frozen at source capture and preserved in translations. Component/state IDs identify supporting views within the same section; count each occurrence once across views of the same component. Labels reference the section ID directly, without transcript quotations or offsets.
