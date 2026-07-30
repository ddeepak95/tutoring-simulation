"""Assembly of the student prompt.

An opening frame, the rendered sections, and a closing reminder. Nothing else.

Everything the student is told is authored in `personas/render.py` - who they are, the topic, the
language, what they believe, what words they have, how they write, what moves them, how they feel,
what they want, what they do when stuck. This file used to restate the first three in a frame of
its own, and every one of them caused a problem: the identity duplicated the profile section and
could contradict it; a "The topic is:" heading told the student twice what it was there for; and a
block of ground rules banned behaviours that traits were separately asking for, which is how
`instrumental` help-seeking came to fail on the one level whose affect trait also told it to stop.

The rule that survived all of that: **a fact stated in two places has two authors.** The sections
are the author. If something needs saying to the student, it goes in a section, where it sits next
to the trait it might conflict with and can be seen to.

What lives here instead are the two things that are NOT facts about the student - they are
instructions to the model about the simulation, and there is no section they could sit in:

    ROLE      what this is and where to draw from, stated before the sections
    REMINDER  to hold the character over a long conversation, stated after them

Neither may restate anything a section says. `ROLE` deliberately does not tell the student to avoid
the answer terms or to keep asking questions: the first is the vocabulary section's job and the
second is `help_seeking_style`'s, and the last time this file gave orders in their territory it
broke `instrumental` help-seeking on the one level whose affect trait pulled the other way.
"""
from __future__ import annotations

from tutoring_check.personas.render import SEPARATOR, render
from tutoring_check.simulation.config import SessionConfig

# Names the job before the sections arrive, so the eight headings are read as an identity to inhabit
# rather than a brief to summarise.
#
# The middle clause is the only one genuinely about the model rather than the student, and it has to
# name it as the model to land. No section can carry it: a section speaks to the student, who has
# never heard of photosynthesis, while it is the model that knows the answer and has to set it
# aside. That gap is where an answer leak comes from, and it is where the one leak in the last
# `traits-v2` run came through.
#
# It used to close on "Be realistic and do not drift from the instructions", which is dropped. "Be
# realistic" appeals to a standard the model fills in from its own priors, and the model's prior of
# a realistic student is the articulate, cooperative, well-punctuated one - exactly the default the
# whole persona exists to override. "Do not drift" was said twice: the clause before it says the
# same thing, and REMINDER says it again below with the part that carries information.
ROLE = (
    "You are role-playing a student in a tutoring conversation. The instructions below describe "
    "that student. As an AI model you know things this student does not but guide your responses "
    "only based on the provided instructions."
)

# The only place drift is addressed, and it sits at the end because recency is its mechanism: over
# ten exchanges the model gets steadily more cooperative and quicker to understand than the persona
# says, and this is the last thing before the turns where that is worst.
#
# It names the DIRECTION of drift, which is the part a model can act on - "do not drift" alone says
# nothing. An earlier version read "respond authentically as a confused but on-task student", which
# described a fifth student no level defines and pulled the reluctant and flat levels back toward
# engagement.
REMINDER = (
    "Stay this student even when the lesson goes badly. Do not get quicker, keener, or easier to "
    "teach than the instructions say."
)


def build_student_system_prompt(config: SessionConfig) -> str:
    """The student system prompt for the conversation, carrying the cell's persona."""
    return (
        f"{ROLE}\n\n{render(config.persona_sections)}\n"
        f"{SEPARATOR}\n## Reminder\n{REMINDER}\n"
    )
