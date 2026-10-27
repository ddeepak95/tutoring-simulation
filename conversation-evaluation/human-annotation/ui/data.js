window.ANNOTATION_DATA = {
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
      "guidance": "Photographic images of real objects, people, places, or events. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "guidance": "Drawn or schematic illustrations that explain structures or relationships; exclude flow diagrams, graphs, and maps. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "guidance": "Diagrams showing a sequence, process, or decision flow. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "guidance": "Plots or charts that encode quantities or relationships. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "guidance": "Geographical or spatial maps. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "description": "Media the learner can manipulate or interact with; count each interactive component.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Media the learner can manipulate or interact with; count each interactive component. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "guidance": "Instructional images not covered by another multimedia item; exclude decorative images. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "description": "Mathematical equalities, inequalities, and symbolic formulas, inline or displayed; count each expression once.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Mathematical equalities, inequalities, and symbolic formulas, inline or displayed; count each expression once. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
      "description": "Questions directed to the learner to elicit a response; exclude headings and rhetorical questions answered by the tutor.",
      "entry_attributes": "`category` (fixed metadata); `count` (1-1000); `turn_locations`",
      "guidance": "Questions directed to the learner to elicit a response; exclude headings and rhetorical questions answered by the tutor. Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.",
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
  "samples": []
};
