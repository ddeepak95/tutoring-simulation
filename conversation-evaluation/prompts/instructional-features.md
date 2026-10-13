---
prompt_version: instructional-highlights/20
---

## Annotation prompt

You are an expert in identifying instructional features in tutoring conversations. Extract the six instructional feature categories and Issues from the supplied transcript and return only valid JSON matching the supplied response schema.

### Scope and language

Annotate only tutor contributions. Use student contributions as context. Identify and group instructional entries across the whole conversation, rather than treating each turn as an independent conversation. Use the supplied learning topic and learner requests to clarify the intended concept and scope. Evaluate the supplied transcript in its supplied language.

Annotate the six instructional features in the conversation in addition to the issues. 

Write brief entry descriptions in English. Preserve the supplied language in exact evidence quotations.

### Required annotation procedure

Follow these steps in order. Organise the work by section, not by completing one feature category across the transcript and then moving to the next. Keep the working outline and completeness checks internal; return only the annotations JSON.

1. **Read the whole conversation and identify the main topics.** Read all tutor and student turns before annotating. Identify the substantive topics actually taught, using the supplied learning topic and learner requests as context. Create a provisional topic map across the conversation. Several main topics are possible; do not force unrelated explanations under one topic. Later sections may clarify the map, so reconcile topic names before finalising.

2. **Map the sections and subsections in each tutor turn.** Use Markdown heading levels, setext headings, standalone bold section titles, and any supplied HTML heading or section hierarchy as navigation cues. 

**Bold-only titles are headings, equally to # headings.** A line consisting of bold title text such as `**How it works:**`, `**Example:**`, `**Limitations**:`, or `__Measurement__` is a heading even without a `#` marker. This includes titles inside list items and titles immediately followed by body text on the next line without a blank line. Apply this rule in every source language. Bold words embedded in a body sentence are emphasis, not headings. Do not skip a bold title because it is generic, repeated, or nested under a Markdown heading. These examples illustrate formatting only; annotate only titles present in the transcript.

**Use the supplied heading inventory.** The input includes tutor_heading_inventory: exact detected tutor heading quotations, turn IDs, and occurrence numbers. Every listed heading occurrence must receive a content-hierarchy highlight. Use this list as a completeness checklist, not as a substitute for reading the section's body or deciding its semantic classification. Preserve the original transcript; the inventory does not rewrite it. If structural nesting exceeds three levels, place each heading at the appropriate supported semantic level using a descriptive path rather than omitting it or inventing a fourth level.

3. **Highlight and classify every heading.** Work through the tutor turns in conversation order. Within each turn, visit the headings in the order they appear. For each heading, read the section beneath it, highlight the exact heading text, and place it in the content hierarchy: a main topic, a unit under a main topic, or a subunit under a unit. Use the section's meaning to choose its place; Markdown heading depth is only a navigation cue. Record its hierarchy path and detail level, then annotate its body in step 4 before moving to the next heading. Include every actual heading, including introductions, summaries, example sections, and closing invitations. Place these sections under the relevant topic using names that describe their function, such as Introduction, Summary, Examples, or Closing invitation. If a parent topic or unit has no heading, name that parent in the path without inventing a highlight for it. Text without a heading is still inspected in step 4.

4. **Annotate the content belonging to that section before advancing.** Read the section's own body from beginning to end and check, in order, for examples, analogies, representations, cultural references, eligible tutor questions, and issues. Inspect every paragraph, list item, table, equation, and worked step, rather than selecting only a representative passage. Record every distinct qualifying entry under its category rules. If the subsection itself develops a concrete example, annotate that example from its body even if its heading has already been classified in the content hierarchy. Section-heading-only highlighting applies to content hierarchy. Table representations use only the table header row as evidence; use the necessary exact passages for the other categories and representation types. A passage may support several categories, including an instructional feature and an issue.

5. **Repeat for every child subsection and remaining content block.** After inspecting a parent's own body, process each child subsection using steps 3 and 4 before moving to the next sibling. For this traversal, a section's own body excludes the bodies of separately visited child subsections; this prevents skipping or processing the same content twice. Read the full descendant content when judging the parent's meaning and detail level. Inspect trailing or unheaded blocks as well. Do not stop after finding one example, one issue, or one entry of another category in a section.

6. **Reconcile entries across the whole conversation and check completeness.** Confirm internally that every actual tutor heading has a content-hierarchy highlight and every tutor content block has been inspected for all other categories. Reconcile consistent topic and unit names, merge repeated entries according to each category's grouping rules, retain each distinct example or other qualifying entry, and preserve separate question occurrences. Keep every heading occurrence highlighted when merging repeated hierarchy nodes. For examples, keep highlights for every occurrence, marking each as Fresh or Duplicate. For the remaining categories, select the first qualifying evidence for each distinct entry as required below. Assess development using all relevant turns, and recheck exact quotations and occurrence numbers. A section may have a heading annotation and no body-feature annotations when its body contains no qualifying features or issues. Do not manufacture body annotations to fill such a section. Return the complete annotations object only.

### Exact highlight evidence

**Prefer exact source IDs.** The input includes tutor_source_passages with source_id, kind, turn_id, quote, and occurrence. For content-hierarchy highlights, select the source_id of the actual heading. For table representations, select the source_id whose kind is table_header. For other features, select an appropriate passage ID when that complete passage is the right evidence; otherwise use an exact quote for a narrower span. A source_id retrieves the original source text without rewriting it. Never use a whole passage if it includes neighbouring examples unnecessarily. All existing scope, grouping, occurrence, and example-status rules still apply.


For each entry, cite exact contiguous source quotations, tutor turn IDs, and one-based occurrence numbers (including overlapping matches). Quote the raw source Markdown, retaining punctuation, whitespace and Unicode. Never fabricate evidence or offsets. Use only the supplied tutor turn IDs. Do not assign new turn IDs.

For content hierarchy, highlight every actual heading occurrence, using heading-only evidence according to its rules below. For examples, highlight every qualifying occurrence of each distinct case, including repetitions in the same turn or in later turns. For the remaining categories, highlight the first qualifying occurrence of each distinct annotation entry, not just the first occurrence of its category. For table representations, highlight only the exact table header row, as specified below. For examples, issues, and all other categories and representation types, select exact evidence that demonstrates the entry; a section heading alone is insufficient when the body is needed to establish the case or issue. Use separate passages if the necessary evidence is non-contiguous. Distinct entries may use overlapping evidence when a passage supports different categories.

### Instructional Features

#### Concepts: Main Concepts, Explanatory Units, and Subunits

Capture the content richness of the explanation using up to three levels. First identify the main topics, then the explanatory units associated with each topic, then the explanatory subunits associated with each unit. A conversation may have multiple main topics. Identify the hierarchy from the meaning of the tutor's explanations, rather than mechanically copying Markdown heading levels.

**Main topics:** Identify the substantive concepts or overarching topics taught. The supplied learning topic is context, not a requirement that all content belong to one topic. Use consistent descriptive names in English. Do not create a main topic merely for an incidental mention.

**Explanatory units:** A unit answers a distinct aspect, method, or purpose within its main concept. Choose units from meaning, not heading depth or the presence of a generic grouping title. For Nucleus identification, Rutherford experiment, Mass spectrometry, and Scattering techniques are separate explanatory units. A generic heading such as Identification methods is an overview entry under Nucleus identification; it does not demote the distinct methods to subunits. Keep an overview heading separate from its method entries. For Covalent radius, Definition, Measurement, Importance and applications, and Measurement limitations are distinct units.

**Explanatory subunits:** A subunit develops a specific explanation within a unit: a mechanism, procedure, result, worked example, application, or limitation. For Measurement, X-ray diffraction, Electron diffraction, and Spectroscopy may be subunits. If the source has further nested headings, preserve them at this supported semantic level with context-specific names such as X-ray diffraction procedure, Electron diffraction procedure, or Spectroscopy hydrogen example. Do not invent a fourth level, merge different procedures merely because both headings say Procedure, or move a method to a different level solely because its source heading is nested more deeply.

**Stable naming and grouping:** Use the same main-concept name for equivalent content throughout the conversation. Name generic headings from their local instructional parent: Molecular shape examples, Bond strength examples, X-ray diffraction procedure, and Electron diffraction procedure. Do not merge headings from different explanations merely because they have identical title text. Merge repeated nodes only when they represent the same instructional identity, not just the same heading wording. An equivalent translated section should have the same semantic level and parent identity despite language or formatting differences; genuine content additions or omissions can change the hierarchy.

**Every heading is an anchor:** Annotate every actual tutor heading and classify it from its associated content as a topic, unit, or subunit. This includes explanatory, example, introductory, summary, and closing headings. Headings expressed as questions belong in the hierarchy without becoming entries in the Questions category. A heading's Markdown level does not fix its instructional level. Merge repeated hierarchy nodes semantically while retaining all their heading occurrences as evidence, and preserve distinct developed units. Substantive material without a heading may inform the parent classification or detail level; do not invent a heading or highlight its body as coverage evidence.

**Section-heading-only evidence applies only to this category:** Highlight only exact text within an actual tutor Markdown heading (including setext headings) or standalone bold section title. Preserve its raw source language and Markdown. You may quote the whole heading or its exact descriptive text within the heading. Do not highlight body sentences, paragraphs, bullets that are not headings, or heading-like text inside a code block. Read the body to judge meaning and depth, but never include it in this category's evidence. Examples, analogies, representations, cultural references, questions, and issues retain their own evidence rules, including header-row-only evidence for table representations.

**Concept level:** The category is displayed as Concepts. Its concept-level attribute is derived from the hierarchy path: one level = Main concept, two levels = Explanatory unit, three levels = Explanatory subunit. Do not output a separate level attribute; the server and portal derive it from topic, preventing conflicting classifications.

**Hierarchy paths:** Use feature concepts_and_subtopics_covered with topic as a path separated by " :: ": "Main topic" for a topic-level heading, "Main topic :: Explanatory unit" for a unit-level heading, or "Main topic :: Explanatory unit :: Explanatory subunit" for a subunit-level heading. Use one annotation per distinct hierarchy node and include every heading occurrence representing that node in its evidence array. Different nodes must remain separate even if their headings use the same wording. When a main topic or parent unit has no heading, infer its organising name in its children's paths without adding a separate annotation for that parent. Do not attach a parent's heading as fabricated evidence for an unheaded child. Use consistent parent names to connect entries.

**Illustrative hierarchy:** A conversation could have "Covalent radius" as a topic, "Covalent radius :: Measurement" as a unit, and "Covalent radius :: Measurement :: X-ray crystallography" as a subunit. Another unit could be "Covalent radius :: Importance and applications" with subunits for distinctly developed applications. Use only nodes and headings actually supported by the supplied transcript; these are not a required inventory.

**Breadth and depth:** Topics, units, and subunits represent different levels of coverage and should be counted separately. A parent is an organising node, not an extra independent explanatory contribution to add to its descendants. Assess each node's detail_level from the substantive explanation associated with it, using the surrounding body and relevant later development. Brief gives a meaningful concise definition or answer with limited development. Explained develops how or why it works. Elaborated develops multiple connected aspects, conditions, comparisons, or applications. For a purely functional section with no substantive explanation, retain the heading and use Brief; its presence does not establish explanatory depth. Do not assign every node the same level simply because the conversation is long.

**Entry attributes:** topic (a one-, two-, or three-level hierarchy path), detail_level (Brief / Explained / Elaborated), and exact heading-only tutor evidence. Do not add hierarchy fields or nested objects outside the supplied schema.


#### Examples

Which distinct specific cases or instances does the tutor use to illustrate a learning concept, rule, or principle?

**What to record:** Identify examples wherever they occur: standalone sentences, bullet lists, worked calculations, or entire subsections. A subsection can itself constitute an example. Read its heading and body together, identify the specific case being illustrated, and select evidence that captures that case and its instructional use. Record every distinct example separately, including each distinct case within an example list or subsection. An example may be real or hypothetical and must be linked to a learning concept, rule, or principle; a general explanation without a specific case is not an example. An example may occur within a coverage unit; annotate both using their respective evidence rules.

**Subsection examples:** A section such as "Example: Measuring the Covalent Radius of Chlorine" or "Real-World Example: Drug Design" can qualify when its body develops that concrete case to illustrate the learning content. Do not overlook it because the case spans multiple sentences or a whole subsection, or because it also explains a concept or application. Do not rely on the word "Example" alone: confirm the case and its instructional connection in the body. Use the actual case and source evidence from the transcript; do not copy these illustrative cases unless present.

**Required example audit, section by section:** Before grouping examples, build an internal candidate inventory in source order. For every tutor section inspect (1) paragraphs and parenthetical cases, (2) every bullet and nested bullet, (3) every table data row and its example cells, and (4) worked-example subsections and each method-specific application in them. For each candidate identify the concrete case, its instructional use, and the exact local evidence. Then decide eligibility, assign an entry, and retain every qualifying occurrence. Do not stop after finding a prominent worked example. Reconcile this inventory against the output before finalising; keep the inventory internal.

**Short and implicit examples qualify:** A named case can be Brief when its instructional connection is established by the surrounding sentence, subsection, table row, or column labels. It need not have a standalone explanation, an Example heading, English wording, or a complete sentence. Parenthetical cases introduced by local-language equivalents of e.g. count on the same basis as English cases. A material listed in a table's examples column for material design, or a molecule followed by its geometry, can qualify even if its cell contains only a few words. Bare incidental names without an instructional connection do not qualify. Use all source languages consistently and judge meaning rather than familiarity with English terminology.

**Table examples:** Inspect every data row, including summary tables, rather than annotating only the table as a Representation. Extract each distinct illustrative case in an example cell and connect it to that row's teaching claim. Retain repeated examples from a summary table as additional evidence with the correct Fresh/Duplicate status; a table recap is not a reason to skip them. Select the exact case-specific cell passage and, only when necessary to establish its use, a separate exact quotation of the relevant row label or claim. Do not highlight an entire table or unrelated rows as a single example. Header-only evidence remains the rule for Table representations, not for Examples.

**Stable example identity:** Define a distinct example by its concrete case or scenario AND the specific instructional relationship it illustrates. The same named object does not automatically identify the same example. Water's bent molecular geometry and water's hydrogen bonding/boiling point are separate instructional uses and therefore separate entries. Likewise, using H? to illustrate bond length, converting its length to metres to illustrate scale, and applying separate measurement methods to H? are distinct example scenarios. Keep each method-specific application separate when it teaches a different procedure or condition; keep the connected steps within one method application together. Merge occurrences only when they reuse the same case and instructional use. Do not merge merely because they share a molecule, number, or broad topic. Conversely, a body explanation and a table recap of the same case/use belong in one entry with multiple evidence occurrences.

**Lists and comparisons:** Separate independent co-listed cases, even when they occupy one bullet, cell, or sentence. Keep a deliberately comparative case or ordered series together when its instructional point depends on the relationship between its members, such as F? versus Cl? illustrating atomic size or a hydrogen-halide series illustrating a trend. Do not create both an umbrella comparison entry and separate entries for the same illustrative use of its members. A member can still have a separate entry elsewhere when used for a different instructional relationship. Several bullets describing the connected steps of one worked calculation remain one case.

**Exact evidence and boundaries:** Highlight every qualifying occurrence of each case/use, including partial repetitions and summary-table mentions. Select the smallest passage that establishes the specific case and its relationship; include worked steps needed for that occurrence, with separate quotations when non-contiguous. Do not annotate only a generic subsection heading, select one representative example from a list, or include neighbouring distinct examples in the same highlight. A case-specific passage may share essential context with another entry when the source sentence combines independent examples. Preserve instructional examples even when their claims are incorrect; annotate the issue separately.

**Coverage checks:** Where present in the source, check short molecular-geometry examples (including table-only cases), parenthetical physical-property or hardness cases, material-design examples in table cells, and reaction equations used as concrete illustrations. These are places to inspect, not a required chemistry-specific inventory. Never add a case merely because it appears in these instructions. Equivalent original and translated passages should receive equivalent eligibility and grouping decisions when their meaning is unchanged; do not force identical counts when the translation genuinely changes content.

**Entry attributes:** Record `example` (a short description of the specific case), `concept_illustrated` (the concept, rule, or principle it illustrates), `detail_level` (Brief / Explained / Elaborated), and `turn_locations` (the supporting turns).

**Distinct entries and repeated highlights:** Keep one examples entry per distinct case and instructional use, but include exact evidence for every qualifying occurrence of that case/use, including repeated uses within the same turn. Add example_status to each example evidence object: Fresh for the first qualifying occurrence and for later occurrences that repeat only part of an earlier example or add new example content; Duplicate only when the complete example is repeated, with no new example content. Compare the whole example occurrence, including its setup, facts, calculation or worked steps, explanation, and conclusion when present. Reusing the same case, entity, numbers, concept, or some steps is insufficient for Duplicate. A shortened reuse that repeats only selected elements is Fresh, as is an expanded occurrence that adds reasoning, details, steps, or an application. Complete repetition may use different wording or formatting; it must repeat the entire example content, rather than merely refer to the same case. If one occurrence needs several non-contiguous supporting passages, give all of those passages the same status. Order the evidence by conversation turn and source position. Assess detail_level using the case's development across its occurrences. Distinct case/use entries remain separate and each starts Fresh, even if they illustrate the same concept. Duplicate identifies complete repetition, not an error or a lower-quality example. Multiple occurrences within one case entry may therefore be Fresh. Do not confuse this status with occurrence, which identifies an exact quotation match within a turn. For example, an earlier chlorine-molecule explanation is Fresh. A later chlorine calculation bullet is Fresh if it repeats only some facts from that explanation or adds a calculation; it is Duplicate only if it repeats the earlier complete example with no new example content. The first hydrogen calculation bullet is Fresh. Highlight all three passages when present; do not skip the chlorine bullet because the case was already recorded.

**Detail levels:** **Brief:** Names a specific case and links it to the concept, for example, “Wet clothes drying is an example of evaporation.” **Explained:** Describes how the case illustrates the concept, for example, water in the clothes changes into vapour and enters the surrounding air. **Elaborated:** Develops the case further through reasoning, conditions, comparisons, or worked steps, for example, explaining why clothes dry faster in warm, moving air. These are descriptive detail levels rather than quality scores; a brief example may be sufficient.

**Worked example:** The tutor says, “Water evaporates from wet clothes as they dry. The water changes from liquid into water vapour and enters the surrounding air.” Record `example`: **Wet clothes drying**; `concept_illustrated`: **Evaporation**; `detail_level`: **Explained**; `turn_locations`: the actual turns containing this example.

If the tutor also explains water evaporating from a puddle, record **A puddle drying** as a second example, with its concept, detail level, and turn locations. Both illustrate evaporation, but use distinct cases.

**Explanation without an example:** If the tutor says only, “Evaporation is a change from liquid to gas,” do not record an example: it explains the concept without giving a specific case.

#### Analogies

Which distinct comparisons does the tutor make between a learning concept and another situation or system, using shared features or relationships to explain the concept?

**What to record:** List each distinct comparison the tutor uses to explain a learning concept through another situation or system. Identify both what is being explained and what it is compared with. The tutor must use a shared feature or relationship to support the explanation; the word “like” alone does not establish an analogy.

**Entry attributes:** Record `comparison` (a short description naming both sides of the comparison), `concept_explained` (the learning concept the comparison explains), `detail_level` (Brief / Explained / Elaborated), and `turn_locations` (the supporting turns).

**Distinct entries:** List repeated use of the same comparison once and include all supporting turn locations. Assess its detail level using its development across those turns. Record comparisons with different situations or systems separately, even when they explain the same concept.

**Detail levels:** **Brief:** Introduces a comparison and identifies a shared feature or relationship without developing it further. **Explained:** Explains how the features or relationships in one situation correspond to those in the learning concept. **Elaborated:** Develops the comparison through multiple connected correspondences, uses it to reason about the concept, or explains where the comparison stops applying. These are descriptive detail levels rather than quality scores.

**Worked example:** The tutor says, “Electric current is like water flowing through a pipe. Current describes the rate of flow of electric charge, just as water flow rate describes how much water passes through a pipe each second.” Record `comparison`: **Flow of electric charge compared with water flowing through a pipe**; `concept_explained`: **Electric current**; `detail_level`: **Explained**; `turn_locations`: the actual turns containing this comparison.

**Example without an analogy:** If the tutor says, “An electric current flows through a lamp when the circuit is closed,” do not record an analogy: the lamp is a specific case of the concept, but no comparison with another situation or system is made.

#### Representations

Which distinct diagrams, graphs, tables, equations, or other visual or symbolic forms does the tutor use to explain or illustrate a learning concept?

**What to record:** List each distinct visual or symbolic representation the tutor provides to explain or illustrate a learning concept. Record representations actually present in the conversation, including text-based diagrams or displayed equations. Do not record a representation that is merely suggested or mentioned without being provided.

**Table evidence ? highlight the header row only:** When representation_type is Table, read the entire table and its surrounding explanation to identify what it represents and the concept it illustrates, but highlight only the table's actual column-header row. For a Markdown table, quote the exact header line, preserving its pipes, spacing, and source-language text. Do not include the separator/alignment row, data rows, caption, nearby section heading, or explanatory paragraphs in this representation's evidence. For an HTML table, quote the exact source of its actual header row, preserving the markup. Never invent a header or substitute a nearby section title for it. If the table has multiple actual header rows, use separate exact quotations for those rows only. Data rows can still be highlighted separately for examples, issues, or other qualifying categories under their own rules. Other representation types retain the exact passage evidence needed to identify the representation.

**Entry attributes:** Record `representation` (a short description of what is provided), `representation_type` (Diagram / Graph / Table / Equation / Other visual or symbolic form), `concept_illustrated` (the concept it helps explain), and `turn_locations` (where it appears). For Other, specify the form.

**Distinct entries:** List repeated use of the same representation once and include all supporting turn locations. Record distinct representations separately, even when they illustrate the same concept.

**Worked example:** The tutor provides a temperature–time graph showing a heating curve and explains the flat section during a phase change. Record `representation`: **Temperature–time graph showing a heating curve**; `representation_type`: **Graph**; `concept_illustrated`: **Heating and phase changes**; `turn_locations`: the actual turns where the graph appears.

**Mention without a representation:** If the tutor only says, “You could draw a graph of temperature against time,” but provides no graph, do not list a representation.

#### Cultural References

Which distinct references to cultural practices, traditions, artifacts, stories, media, or shared cultural experiences does the tutor use to explain or illustrate a learning concept?

**What to record:** List each distinct reference to a cultural practice, tradition, or artifact that the tutor uses to explain or illustrate a learning concept. The cultural connection and its instructional use must be evident; exclude incidental cultural mentions.

**Entry attributes:** Record `reference` (the specific cultural reference used), `concept_illustrated` (the learning concept it helps explain), `detail_level` (Brief / Explained / Elaborated), and `turn_locations` (the supporting turns).

**Distinct entries:** List repeated use of the same reference once and include all supporting turn locations. Assess its detail level using its development across those turns.

**Detail levels:** **Brief:** Names the cultural reference and links it to the concept. **Explained:** Explains how the reference illustrates the concept. **Elaborated:** Develops the connection through reasoning, comparisons, or applications. These are descriptive detail levels rather than quality scores.

**Worked example:** The tutor discusses fireworks used during a named cultural festival and explains how heating atoms leads them to emit characteristic colours. Record `reference`: **Fireworks during the named festival** (using the festival actually named); `concept_illustrated`: **Atomic emission**; `detail_level`: **Explained**; `turn_locations`: the actual turns containing this reference and explanation.

**Everyday example without an explicit cultural connection:** An explanation of fireworks alone is an everyday example; list it as a cultural reference only when the tutor explicitly connects it to a cultural celebration or practice.

**Cultural artifacts:** References to objects such as traditional textiles, artworks, or musical instruments also qualify when the tutor uses their cultural context or features to explain a learning concept. For example, using repeating motifs in a traditional textile to explain symmetry can qualify.

#### Questions

Which questions does the tutor genuinely direct to the learner to elicit a response, and are they Knowledge-checking or Instructional?

**What to record:** Record only actual questions directed to the learner with an expectation of a learner response. The learner need not actually answer for the question to qualify. Record each eligible question occurrence separately, including repetitions. Exclude learner-only questions and questions used as section headings.

**Eligibility before classification:** Read the surrounding tutor content before assigning a question type. Exclude rhetorical questions that the tutor answers itself as part of its explanation, including a question followed by its definition, calculation, reasoning, or conclusion without inviting the learner to respond. Subject-matter wording or a question mark alone does not establish eligibility. A genuine learner-directed knowledge check remains eligible even if a later tutor turn explains the answer after a learner response or opportunity to respond.

**Closing invitations and suggested doubts:** Exclude statements or imperatives inviting the learner to ask questions, such as "If you have any other doubt, ask!", "We can explore in more detail", or "Let me know if you have questions." These are not questions to the learner. Also exclude lists of suggested questions the learner could ask the tutor, unless the tutor instead asks the learner to answer them. An actual learner-directed question such as "Do you have any questions?" or "Would you like another example?" remains eligible as Instructional. Do not convert an invitation into a question or include the surrounding invitation text in the highlighted question.

**Entry attributes:** Record `question` (the exact eligible question wording, preserving source language, Markdown, and punctuation), `question_type` (Knowledge-checking / Instructional), `concept_checked` (the knowledge or concept being checked for Knowledge-checking questions; null for Instructional questions), and `turn_locations` (the single tutor turn containing that occurrence). Record separate questions in the same turn as separate entries.

**Knowledge-checking:** The tutor asks the learner to recall, explain, compare, reason about, or apply subject-matter knowledge. It requests a demonstration of knowledge rather than a self-report of understanding. Classify it this way even if the learner does not answer, provided the question is genuinely posed to the learner rather than self-answered rhetorically.

**Instructional:** An eligible question manages the learning interaction without requesting a demonstration of subject-matter knowledge. This includes self-report checks such as "Have you understood?" or "Does that make sense?", actual questions such as "Do you have any questions?", and preference questions such as "Would you like another example?" Rhetorical self-answered questions, suggested learner doubts, and statements inviting questions do not qualify under either question type.

**Worked example - Knowledge-checking:** The tutor asks, "Why do wet clothes dry faster in moving air?", inviting the learner to explain the effect of airflow. Record that exact question as Knowledge-checking, with `concept_checked`: **Effect of airflow on evaporation**.

**Worked example - Instructional understanding check:** The tutor asks, "Have you understood?" Record that exact question as Instructional, with `concept_checked`: **null**.

**Excluded example - Rhetorical:** "What is evaporation? Evaporation is the change of liquid water into vapour." The tutor asks and answers its own explanatory question. Do not create a Questions annotation; if the question is a heading, retain its Concepts hierarchy annotation.

**Excluded example - Closing invitation:** "Or, if you have any other doubt, ask! We can explore in more detail. ??" Do not create a Questions annotation: this is an invitation, not a question requesting a learner response.

### Issues

Identify errors and mistakes in tutor contributions, including conceptual, factual, mathematical, procedural, reasoning, translation, and terminology issues. An issue may overlap an instructional highlight. Preserve qualifying instructional highlights even when their content contains a mistake; record the mistake separately under Issues.

**What to record:** Record each distinct issue with an issue description and an explanation of why it is problematic and what the correct statement, calculation, translation, or terminology should be. Prefix the issue description with its type, for example "Conceptual error: ...", "Translation error: ...", or "Terminology issue: ...". Group repeated instances of the same mistake into one entry with all supporting passages. Retain issues even if later corrected. Do not include correction status or a rating.

**Conceptual and other errors:** Include incorrect concepts, misleading definitions, false factual claims, calculation mistakes, invalid reasoning, incorrect procedures, inconsistent units or symbols, and contradictions that affect the learning content. Distinguish an actual error from an appropriate simplification for the supplied learner context. Do not flag harmless stylistic preferences.

**Translation errors:** In non-English conversations, identify mistranslations, meaning changes, incorrect word choice, or wording that misrepresents the learning concept. If the original text is provided, compare it with the translated text. Otherwise, assess the supplied text without inventing an original wording. Explain the corrected meaning or translation in the explanation field.

**Terminology and language appropriateness:** Also inspect terms that may be unfamiliar or uncommon in the student's supplied language or educational context, and transliterated foreign terminology used when an established equivalent exists in that language. Flag these when a commonly used native-language equivalent would be more appropriate and the tutor's wording creates avoidable ambiguity or a comprehension burden. Give the actual problematic term and the established alternative in the original language, and explain the difference. Use the student's wording and any supplied curriculum or learner context as evidence; do not assume a particular student's vocabulary from language alone. Do not automatically classify every loanword, technical term, or transliteration as an issue: established local usage, the learner's own usage, an explicit bilingual request, or a helpful definition may justify it. Do not invent a native-language equivalent or assert that a term is uncommon without a clear linguistic or contextual basis.

**Evidence and uncertainty:** Highlight the smallest exact tutor passage that demonstrates the issue; include additional exact passages when context is needed. Apply the same raw Markdown, turn ID, and occurrence rules as other categories. Include only issues with a clear basis. Explain any relevant contextual limits rather than claiming knowledge of the student's background or proficiency.

**Entry attributes:** Use issue (a concise type and description) and explanation (why it is problematic and the correction or appropriate alternative). Both fields must be non-empty English descriptions; preserve source-language terms and proposed equivalents within them. Do not add issue_type, severity, correction_status, or other fields.

## JSON output instructions

Return one object with a single annotations array. Each annotation must contain exactly feature, entry, and evidence. Do not include annotation IDs, offsets, turn_locations, ratings, reasons for ratings, conversation metadata, or any additional top-level fields. The server derives annotation IDs, offsets, and turn_locations from the exact evidence. Where the guidance above mentions turn_locations, supply the supporting turn IDs through evidence instead.

### Category keys and entry fields

- Concepts: feature = concepts_and_subtopics_covered; entry contains topic (Main topic, Main topic :: Unit, or Main topic :: Unit :: Subunit) and detail_level.
- Examples: feature = examples; entry contains example, concept_illustrated, and detail_level.
- Analogies: feature = analogies; entry contains comparison, concept_explained, and detail_level.
- Representations: feature = representations; entry contains representation, representation_type, and concept_illustrated.
- Cultural References: feature = cultural_references; entry contains reference, concept_illustrated, and detail_level.
- Questions: feature = questions; entry contains question, question_type, and concept_checked.
- Issues: feature = issues; entry contains issue and explanation.

Include all listed entry fields for the chosen category and no other entry fields. All descriptive attributes must be complete. Use null for an unavailable optional concept label (concept_illustrated, concept_explained, or concept_checked). detail_level must be Brief, Explained, or Elaborated. representation_type must be Diagram, Graph, Table, Equation, or Other visual or symbolic form. question_type must be Knowledge-checking or Instructional. For Instructional questions, concept_checked must always be null.

Each evidence object must contain turn_id (a supplied tutor turn ID), quote (an exact non-empty passage), and occurrence (a positive integer identifying this quote's one-based occurrence within that turn). For examples only, also include example_status, which must be Fresh or Duplicate. For source-ID evidence, supply exactly source_id, plus example_status for examples. Do not also supply turn_id, quote, or occurrence in the same evidence object. The server retrieves those from the source ID. Quote-based example evidence has exactly four fields; quote-based evidence for every other category has exactly the original three fields. Do not put example_status in entry or in another category. Do not duplicate the same supporting passage within an entry.

### Output example

```json
{
  "annotations": [
    {
      "feature": "examples",
      "entry": {
        "example": "Wet clothes drying",
        "concept_illustrated": "Evaporation",
        "detail_level": "Brief"
      },
      "evidence": [
        {
          "turn_id": "t1",
          "quote": "Wet clothes drying is an example of evaporation.",
          "occurrence": 1,
          "example_status": "Fresh"
        }
      ]
    }
  ]
}
```

The example illustrates the output shape only. Never copy its evidence unless it actually appears in the supplied transcript. Include only qualifying observations. Return {"annotations": []} when no instructional features or issues qualify. Do not wrap your response in Markdown fences or add commentary.

## Review prompt

Review and update the first-pass annotations against the original conversation. You will receive the original transcript and the first-pass annotations. Use the annotation instructions, category guidance, evidence rules, and response schema supplied with this request.

Treat the first-pass annotations as a draft, not as ground truth. Check the transcript independently, then compare your findings with the draft. Preserve correct entries; revise incorrect entries; remove unsupported or duplicate entries; and add qualifying instructional features or issues that were missed. Do not change entries merely to produce a different result.

**Review in the same procedural order:** First reread the whole conversation and verify its main-topic map. Then traverse every tutor section and subsection in source order using the Required annotation procedure. At each section, first check that its heading is highlighted and classified in the content hierarchy, then independently inspect its own body for examples, analogies, representations, cultural references, eligible questions, and issues before comparing those findings with the draft. Repeat for each child subsection and every unheaded or trailing block. Do not review only the passages already highlighted in the draft: unannotated content must receive the same inspection. Finally reconcile entries across turns and check that every actual heading is highlighted and every tutor content block was visited. Keep the review outline internal.

Check each occurrence in tutor_heading_inventory against the draft, including all bold-only titles. Add a hierarchy highlight for every missing occurrence. A standalone bold title has the same annotation requirement as a # heading; do not silently discard it as formatting or body emphasis.

Check each entry's category, description, required attributes, and supporting quotations. For content hierarchy entries, confirm that every evidence passage is heading-only and its depth is judged from the body. For Table representations, confirm that evidence contains only the actual header row or rows, excluding separators, data rows, captions, and surrounding prose; assess the description and concept using the full table. Other categories and representation types must retain their appropriate passage evidence. Apply the original grouping and first-occurrence rules. Check detail levels against the tutor's actual explanation. For questions, check eligibility before classification. Remove self-answered rhetorical questions, section-heading questions, suggested questions for the learner to ask, and statements or imperatives inviting doubts (for example, "If you have any other doubt, ask! We can explore in more detail."). Retain only genuine learner-directed questions requesting a response; then classify them as Knowledge-checking or Instructional. Do not mistake an invitation for an actual question. Confirm that every quotation is an exact contiguous passage from a supplied tutor turn, preserving raw Markdown, punctuation, whitespace, and Unicode. Verify its one-based occurrence number. Never rewrite the transcript or invent evidence.

Before finalizing, scan every tutor section, subsection, and list against the draft. Check the hierarchy from topics to associated units to associated subunits, with consistent parent names and no more than three levels. Check that every actual heading is highlighted and placed at the correct semantic level, including introductory, summary, and closing headings, without treating Markdown heading depth as the instructional hierarchy or inventing headings for unheaded material. Do not force missing levels, and keep parent and descendant counts separate. Check every concrete case, worked calculation, and example subsection for missed examples. Treat these as completeness checks, not reasons to invent entries. A question-form heading supports a hierarchy entry without becoming a Questions entry. Preserve the grouping of procedural steps. Keep heading-level parent nodes and count them separately from their descendants; when merging duplicate hierarchy nodes, retain every distinct heading occurrence as evidence.

Review Issues carefully for conceptual, factual, calculation, procedural, reasoning, translation, and terminology mistakes. For non-English conversations, inspect whether terminology is appropriate to the supplied language and learner context, including unnecessary transliterations where an established native-language equivalent exists. Confirm that each flagged issue has a clear basis and a valid correction or alternative. Remove speculative issues and do not treat every loanword or transliteration as an error. Do not invent an original translation, a student's vocabulary, or a native-language equivalent.

**Review examples from the source before inspecting the draft:** Independently rebuild the section-by-section candidate inventory, including parenthetical cases, nested lists, every table data row and example cell, and each method-specific worked application. Compare that inventory against the draft for missed cases and missed occurrences. Do not accept an example count merely because it looks plausible. Check that short names have their instructional connection in the local row, sentence, or section, and include qualifying Brief cases even without a standalone explanation. Separate the same entity used for different instructional relationships; merge only the same case/use across body passages and table recaps. Split an entry that combines water geometry with hydrogen bonding, or distinct H? measurement-method applications, when those uses are independently illustrated. Keep relational comparisons and ordered series together, and avoid duplicate umbrella entries. Check that each occurrence has example_status: Fresh for first occurrences, partial repetitions, or new content; Duplicate only for a complete repetition of the same case/use with no new content. Supporting fragments of one occurrence share its status. Retain each distinct example's case-specific evidence without selecting only representative bullets or skipping table recaps. Apply these checks consistently in every source language.

Return the complete revised annotations object, including retained, updated, and newly added entries. Use exactly the same JSON output format as the first pass: feature, entry, and evidence. Do not return only a list of changes. Do not include ratings, annotation IDs, offsets, correction status, review comments, or extra fields. Return only valid JSON matching the supplied schema. If the draft is fully correct and complete, return it unchanged.

## Validation repair prompt

Repair the reported validation problems using the original annotation instructions and the supplied response schema. Validation problem: {{validation_error}}. The next message specifies repair_mode and the affected entries with exact source choices. Prefer those source_ids rather than reconstructing quotations or adding wording from another source passage. Preserve the original transcript and retain supported observations.

For repair_mode targeted, return exactly replacements and additions. replacements contains objects with index (the original zero-based annotation index) and annotation (the complete corrected annotation). Replace only listed invalid indices. Never overwrite an entry not listed as invalid, delete entries, or regenerate the full annotation set. additions contains only content-hierarchy annotations for listed missing heading occurrences. A replacement may already cover a missing heading; do not add it twice. If a missing heading repeats an existing hierarchy node, use the same topic path; the server appends the new evidence without changing that node's attributes. Return empty arrays when no changes of that kind are needed. Recheck hierarchy depth, exact source evidence, header-only table evidence, and Fresh/Duplicate labels. Do not add unrelated features during validation repair; the review pass handles semantic additions and revisions.

For repair_mode full, the original output could not be read as an annotations object. Return the complete annotations JSON using the normal annotation schema. In either mode, return only valid JSON, without Markdown or commentary.
