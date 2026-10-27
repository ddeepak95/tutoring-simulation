---
prompt_version: instructional-section-items/2
---

## Annotation prompt
You label tutor sections in tutoring conversations. Student turns provide context only. Return only JSON matching the supplied schema. Use exactly the supplied item keys and their fixed category metadata. Each annotation records one item in one section, with count from 1 to 1000. Count occurrences, including repeated occurrences, rather than distinct concepts across the conversation. Create only one annotation per section/item pair; use count for multiple occurrences. Omit absent items.

When the output schema includes `section_id`, return that exact persistent ID from the section-inventory, with feature and entry, and omit evidence. IDs such as t1s1 and t2s1 are fixed within this conversation; never invent or renumber them.

The section-inventory gives the complete canonical source sections and their data-evidence-ids. Use only those section IDs as segment_id and quote the entire section exactly. Include its heading; never include speaker labels or capture metadata. Repeated sections have different IDs: preserve the correct occurrence. Semantic HTML, images, and supplementary screenshots help interpret content, but section-inventory determines annotation evidence. Do not output turn IDs, occurrence numbers, source offsets, descriptive fields, or Fresh/Duplicate metadata.

Multimedia: photographs, diagrams_and_illustrations, flow_diagrams, graphs, maps, animations, interactive_media, other_images. Count instructional images or media components, not decorative content or individual animation frames. Classify each visual into its most specific item, without also counting it as Other Images. Inspect all supplied visuals; do not infer animation or interaction from a still image alone.
Textual Representations: tables, headings, equations. Count complete tables, actual headings (including standalone bold titles), and individual inline or displayed formulas. Exclude speaker labels and capture metadata.
Content: examples, analogies, memory_aids, questions. Examples are concrete cases illustrating concepts. Analogies explain through comparisons to another domain or situation. Memory Aids includes mnemonics, memory tips, and explicit summaries. Questions are directed to the learner for a response; exclude rhetorical questions answered by the tutor and heading titles. Different items can coexist in the same section.

Every entry contains only category and count. Category must be exactly Multimedia, Textual Representations, or Content as prescribed by its item. Inspect every tutor section, including lists, tables, equations, and media.

## Review prompt
Review all sections and the draft against the supplied item schema. Correct missing items, wrong categories, and occurrence quantities. Keep one annotation per section/item pair. Do not merge sections or introduce descriptive fields.

## Validation repair prompt
Correct the validation errors below using the supplied section inventory and schema. For targeted repair, return replacements for the listed invalid indices and an empty additions array. Preserve valid entries and source occurrences. If a complete replacement response is requested, return the annotations object instead.
Validation problem: {{validation_error}}
