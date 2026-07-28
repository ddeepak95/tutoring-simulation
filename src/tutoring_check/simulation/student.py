"""Assembly of the student prompt.

One fixed, hand-written frame plus the sections of a rendered persona
(docs/student_personas.md). The frame varies only with the topic and the language - not with the
level and not with who the student is - which is the comparability guarantee: a comparison across
levels isolates the learner and nothing else. Everything else comes from `personas.render`, a pure
function of (level, topic, profile, language): no model call here or anywhere downstream, so the
same cell produces the same prompt every time.

**The frame states role and constraints. It never states motivation or affect.** That division is
the whole reason the levels can differ. How much a student wants to understand is
`goal_orientation`; how they hold up when it does not land is `affect_trajectory`; whether they ask
for help is `help_seeking_style`. A fixed line asserting any of those overrides all four levels at
once, and it overrides them toward the cooperative, eager default - which is exactly the
under-specified student this design replaces.

The frame's inline `#` comments record prompt-engineering history and are worth keeping: they are
what stops a fixed line being "improved" back into something already found to fail.
"""
from __future__ import annotations

from tutoring_check.personas.render import render
from tutoring_check.simulation.config import SessionConfig


def build_student_system_prompt(config: SessionConfig) -> str:
    """The student system prompt for the conversation, carrying the cell's persona."""
    return (
        # Role and premise only. Who the student is belongs to `who_you_are`.
        #
        # This line used to read "You are {name}, a student from {region} who genuinely doesn't
        # understand a specific {topic} concept. Your goal is to learn, not to test the teacher."
        # Three things were wrong with it. The identity duplicated the persona. The topic strings in
        # topics_ci.json are titles, not clause fragments, so it produced "a specific Where a tree's
        # mass comes from concept". And "your goal is to learn" is a motivation claim that
        # contradicts `reluctant` outright - that level is built on performance-avoidance, whose
        # whole point is that the student's goal is to not look stupid.
        "You are a student in a one-to-one conversation with a teacher.\n"
        f"The topic is: {config.topic}\n\n"

        f"Speak entirely in {config.language}, written in its native script, throughout the conversation.\n\n"

        # Before the persona, not after: the persona closes on what the student does when stuck,
        # and two "what not to do" blocks in one prompt read as a contradiction waiting to happen.
        #
        # The last rule is the participation floor, and it is deliberately about turn-taking rather
        # than willingness. "You are willing to say what you think" would guarantee the same turns
        # while contradicting `avoidant` help-seeking, which is built on going quiet.
        "Ground rules, whatever kind of student you are:\n"
        "• You are the student, not the teacher. Let the teacher lead.\n"
        "• Don’t ask leading questions or fish for specific information.\n"
        "• Don’t suggest what to cover next, and don’t set out to test the teacher.\n"
        "• You reply whenever the teacher says something to you.\n\n"

        f"{render(config.persona_sections)}\n\n"

        # The question itself is deliberately absent, and `config.question` is read only by the
        # tutor now. The tutor opens the conversation by posing it (session.py), and across the
        # English transcripts it always paraphrases rather than quotes - so putting the canonical
        # wording here gave the student a second, differently-worded copy of a question nobody had
        # asked yet. Two costs: the persona says the teacher is *about to* ask, which the block
        # contradicted; and the tutor is instructed to frame the concept in the student's own
        # regional context, which has less to bite on if the student is already holding the plain
        # item text. What orients the student instead is the topic line above plus the library's
        # `predicts`, which is written around the scenario in the student's own voice.
        #
        # It also removed a rare artifact: of six runs where the tutor opened with "are you ready?"
        # instead of the question, one student answered anyway.

        # Was "respond authentically as a confused but on-task student", which described a fifth
        # student no level defines, and pulled the reluctant and flat levels back toward engagement.
        # What a closing reminder is actually good for is resisting drift: over a long conversation
        # the model gets steadily more cooperative and quicker to understand than the persona says.
        "Reminder:\n"
        "Stay the student described above for the whole conversation, including when that makes the "
        "lesson go badly. Do not become easier to teach than that student would be.\n\n"
    )
