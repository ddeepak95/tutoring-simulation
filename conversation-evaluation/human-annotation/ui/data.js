window.ANNOTATION_DATA = {
  "annotation_metadata": {
    "html_capture": "html-conversation/2: HTML is authoritative. Source-assigned section IDs are shared with translations; labels require no transcript spans.",
    "llm_evidence": "Optional single-line model justification, separate from source evidence; at most 1000 characters."
  },
  "rubric_source": "conversation-evaluation/human-annotation/coding-guidebook.md",
  "label_schema_version": "section-items/1",
  "rubric": [
    {
      "key": "photographs",
      "name": "Photographs",
      "short_label": "Photographs",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Photographic images of real objects, people, places, or events.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Photographic images of real objects, people, places, or events. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "diagrams_and_illustrations",
      "name": "Diagram & Illustrations",
      "short_label": "Diagram & Illustrations",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Drawn or schematic illustrations that explain structures or relationships; exclude flow diagrams, graphs, and maps.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Drawn or schematic illustrations that explain structures or relationships; exclude flow diagrams, graphs, and maps. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "flow_diagrams",
      "name": "Flow Diagram",
      "short_label": "Flow Diagram",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Diagrams showing a sequence, process, or decision flow.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Diagrams showing a sequence, process, or decision flow. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "graphs",
      "name": "Graphs",
      "short_label": "Graphs",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Plots or charts that encode quantities or relationships.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Plots or charts that encode quantities or relationships. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "maps",
      "name": "Maps",
      "short_label": "Maps",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Geographical or spatial maps.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Geographical or spatial maps. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "animations",
      "name": "Animations",
      "short_label": "Animations",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Moving visual sequences; count each animation, not its frames.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Moving visual sequences; count each animation, not its frames. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "interactive_media",
      "name": "Interactive Media",
      "short_label": "Interactive Media",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Instructional media the learner can substantively manipulate or explore, such as simulations, adjustable parameters, draggable elements, or responsive visualizations; count each interactive component. Question pagination and Previous/Next buttons alone do not qualify as Interactive Media. Do not classify a quiz as interactive media solely because it allows navigation between questions.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Instructional media the learner can substantively manipulate or explore, such as simulations, adjustable parameters, draggable elements, or responsive visualizations; count each interactive component. Question pagination and Previous/Next buttons alone do not qualify as Interactive Media. Do not classify a quiz as interactive media solely because it allows navigation between questions. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "other_images",
      "name": "Other Images",
      "short_label": "Other Images",
      "category": "Multimedia",
      "color": "#36759c",
      "highlight": "#e7f2fa",
      "description": "Instructional images not covered by another multimedia item; exclude decorative images.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Instructional images not covered by another multimedia item; exclude decorative images. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections. Include hidden instructional images when an explicit quantity cue establishes the total; include the visible image in that total once. Classify hidden images only as specifically as the evidence supports, using Other Images when their type is unknown. A navigation arrow alone does not establish a quantity. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "headings",
      "name": "Headings",
      "short_label": "Headings",
      "category": "Textual Representations",
      "color": "#765b96",
      "highlight": "#f0eaf7",
      "description": "Explicit headings and standalone bold section titles; exclude speaker labels and capture metadata.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Explicit headings and standalone bold section titles; exclude speaker labels and capture metadata. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "tables",
      "name": "Tables",
      "short_label": "Tables",
      "category": "Textual Representations",
      "color": "#765b96",
      "highlight": "#f0eaf7",
      "description": "Tabular arrangements of information; count each complete table once.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Tabular arrangements of information; count each complete table once. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "equations",
      "name": "Equations",
      "short_label": "Equations",
      "category": "Textual Representations",
      "color": "#765b96",
      "highlight": "#f0eaf7",
      "description": "Mathematical equalities, inequalities, and symbolic formulas, inline or displayed. Count a connected equation, calculation, or derivation solving for one result as one occurrence, including its general formula, substitutions, rearrangements, intermediate steps, and final answer, even across multiple lines or displays. For example, r = d/2 followed by r = 74/2 = 37 pm is one equation occurrence. Count separate calculations or unrelated formulas separately; keep counts within their section.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Mathematical equalities, inequalities, and symbolic formulas, inline or displayed. Count a connected equation, calculation, or derivation solving for one result as one occurrence, including its general formula, substitutions, rearrangements, intermediate steps, and final answer, even across multiple lines or displays. For example, r = d/2 followed by r = 74/2 = 37 pm is one equation occurrence. Count separate calculations or unrelated formulas separately; keep counts within their section. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "examples",
      "name": "Examples",
      "short_label": "Examples",
      "category": "Content",
      "color": "#397b71",
      "highlight": "#e2f3ee",
      "description": "Specific real or hypothetical cases illustrating a concept, rule, or principle; count repeated occurrences within the section.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Specific real or hypothetical cases illustrating a concept, rule, or principle; count repeated occurrences within the section. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "analogies",
      "name": "Analogies",
      "short_label": "Analogies",
      "category": "Content",
      "color": "#397b71",
      "highlight": "#e2f3ee",
      "description": "Comparisons that explain a concept through another situation or domain.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Comparisons that explain a concept through another situation or domain. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "memory_aids",
      "name": "Memory Aids",
      "short_label": "Memory Aids",
      "category": "Content",
      "color": "#397b71",
      "highlight": "#e2f3ee",
      "description": "Mnemonics, memory tips, and explicit summaries that help recall learning content.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Mnemonics, memory tips, and explicit summaries that help recall learning content. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    },
    {
      "key": "questions",
      "name": "Questions",
      "short_label": "Questions",
      "category": "Content",
      "color": "#397b71",
      "highlight": "#e2f3ee",
      "description": "Knowledge-checking questions that ask the student to demonstrate subject-matter knowledge by giving an answer, explanation, prediction, calculation, or solution. Exclude rhetorical or tutor-answered questions, heading titles, self-report understanding checks such as \"Have you understood?\" or \"Does that make sense?\", invitations for questions, and learning-preference or continuation questions.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Knowledge-checking questions that ask the student to demonstrate subject-matter knowledge by giving an answer, explanation, prediction, calculation, or solution. Exclude rhetorical or tutor-answered questions, heading titles, self-report understanding checks such as \"Have you understood?\" or \"Does that make sense?\", invitations for questions, and learning-preference or continuation questions. Include hidden questions in a clearly knowledge-checking quiz when explicit counters or pagination establish the total, including the visible question once. Do not infer knowledge-checking intent from a question mark alone. Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings.",
      "fields": [
        {
          "key": "count",
          "label": "Occurrences",
          "numeric": true
        }
      ]
    }
  ],
  "rubric_sha256": "8297714e71518ac3a421eb6e6b217e4582873b62ea8416993319abf2a9135113",
  "samples": [],
  "section_state_semantics": "Captured interaction states are supporting views of the original containing section, not additional sections or additional components. A quiz with three questions remains three questions when the learner selects an answer, views feedback, or navigates Previous/Next. Count each question/image in that component once across its supporting views. Separate components in the same section remain separate; do not deduplicate merely by matching text. Supporting-view captions and capture metadata do not count as headings."
};
