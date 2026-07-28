"""Assemble a student persona from a level and a topic - deterministically, with no model call.

The student prompt is a pure function of (level, topic_id, language). Same inputs, same bytes,
every time; nothing is cached, pinned, or hashed, because there is nothing non-reproducible to pin.
The git commit is the record of what a run used, and `session.py` logs the assembled prompt into
the transcript header anyway.

Where each section comes from:

    who_you_are                  the student profile - name, age, grade, languages, where they are
    what_you_believe             the library's primary entry (belief + predicts), held without hedging
    what_you_can_and_cannot_use  the library's everyday_terms and answer_giveaway_terms
    how_you_talk                 traits register_and_verbosity + self_explanation_propensity,
                                 plus a register note for the target language
    how_you_respond_to_teaching  traits misconception_robustness + conceptual_change_rate,
                                 plus the library's changes_only_when and slides_into
    how_you_feel_as_it_goes      trait affect_trajectory
    when_you_are_stuck           traits help_seeking_style + goal_orientation

Which trait goes where is decided below, in one place, by name. A new trait means one more name in
one section - which is easier to read than a routing field on the trait itself.
"""
from __future__ import annotations

from tutoring_check.personas.levels import resolve
from tutoring_check.personas.misconceptions import TopicLibrary
from tutoring_check.personas.profile import StudentProfile
from tutoring_check.personas.traits import prose

# Fixed keys and fixed render order. The headings live here rather than in any authored text, so
# every level has identical structure and only the content differs.
SECTION_ORDER: tuple[tuple[str, str], ...] = (
    ("who_you_are", "Who you are"),
    ("what_you_believe", "What you think is going on"),
    ("what_you_can_and_cannot_use", "Words and ideas you have, and ones you don't"),
    ("how_you_talk", "How you talk"),
    ("how_you_respond_to_teaching", "What changes your mind"),
    ("how_you_feel_as_it_goes", "How you feel as it goes"),
    ("when_you_are_stuck", "When you're stuck"),
)

SECTION_KEYS: tuple[str, ...] = tuple(key for key, _ in SECTION_ORDER)

# The boundary section names the terms that are out of reach, which for any topic are exactly the
# answer's terms. Naming a term as out of reach is the opposite of leaking it, so the answer-leak
# lint skips this section - and only this one.
ANSWER_LEAK_EXEMPT: frozenset[str] = frozenset({"what_you_can_and_cannot_use"})

MAX_SHIFTS = 2

# The situation, which is the same for every student; the identity in front of it is not.
#
# Subject-neutral on purpose. The topic catalog happens to be science, but nothing in the design is,
# and a persona hardcoding "a science question" would quietly contradict the first maths or history
# topic added. The subject arrives from `config.topic` in the frame and from the library's own
# vocabulary, so it does not need saying twice.
#
# It used to close on "You are willing to say what you think" - a motivation claim sitting in the
# level-invariant layer, which is the exact thing `avoidant` help-seeking and `flat_compliant`
# affect exist to vary. The turn-taking floor it was standing in for is a ground rule in student.py
# now, phrased as when you reply rather than how willing you are.
THE_SITUATION = "You are sitting with a teacher to learn."

# How the belief is held rather than what it is - true of every level, because a student who hedges
# their wrong idea never states it plainly enough for the tutor to have anything to work on. How
# hard it is to give up is the `misconception_robustness` trait, which the level does vary.
HELD_WITHOUT_HEDGING = (
    "You are confident about this. It is not a guess, and you would say it to a friend without "
    "hedging."
)

# Per-language register note appended to how_you_talk. Language-agnostic on purpose: it says how a
# real student of that age writes, without smuggling in English-specific advice. Takes the age from
# the profile rather than saying "middle schooler", so a Year 11 profile does not contradict its own
# register note. Add an entry here when a language needs something sharper.
#
# What it names is deliberately what `register_and_verbosity` does not. The trait covers how much
# they write and whether the wording is spoken or bookish; this covers the mechanics a model gets
# wrong in every language - it writes complete, tidy, well-punctuated sentences and reaches for the
# precise word, none of which a 13-year-old messaging does. Adding to it costs prompt tokens against
# `lint.TOKEN_BUDGET`, so anything already said by the trait should not be repeated here.
LANGUAGE_REGISTER: dict[str, str] = {}
DEFAULT_LANGUAGE_REGISTER = (
    "Write {language} the way a real {age}-year-old writes it to a friend, not the way it appears "
    "in a schoolbook: a fragment where a whole sentence is not needed, no semicolons, dashes or "
    "bulleted lists, and when the exact word will not come you use two plain ones rather than "
    "reaching for a better one."
    # No "you do not tidy it up before sending" here - `register_and_verbosity=typical` already
    # says it, and this note is appended to every value of that trait. See the rule above.
)


def _join(parts: list[str]) -> str:
    return " ".join(p.strip() for p in parts if p and p.strip())


def _bullets(items: tuple[str, ...]) -> str:
    return "; ".join(items)


def who_you_are(profile: StudentProfile) -> str:
    """The profile as the student would state it. `region` is dropped when the run set sets none."""
    where = f" at school in {profile.region}" if profile.region else " at school"
    return _join([
        f"You are {profile.name}, {profile.age} years old and in {profile.grade}{where}.",
        f"You speak {profile.speaks}.",
        THE_SITUATION,
    ])


def build_sections(
    level: str,
    library: TopicLibrary,
    profile: StudentProfile,
    language: str,
    language_id: str,
) -> dict[str, str]:
    """Every persona section for one cell, from the registry, the library and the profile."""
    traits = resolve(level)
    misconception = library.primary
    say = lambda key: prose(key, traits[key])   # noqa: E731 - reads better than a def here

    register_note = LANGUAGE_REGISTER.get(
        language_id, DEFAULT_LANGUAGE_REGISTER
    ).format(language=language, age=profile.age)

    # Only the first two. The library orders them strongest-first, and listing every route into a
    # belief reads as a menu of ways to be talked out of it - which is the opposite of holding one.
    shifts = _bullets(misconception.changes_only_when[:MAX_SHIFTS])
    next_idea = (
        f" When you do let go of it, the next thing you think is this: {misconception.slides_into}"
        if misconception.slides_into
        else ""
    )

    return {
        "who_you_are": who_you_are(profile),
        "what_you_believe": _join(
            [f"Here is what you are sure of: {misconception.belief}",
             f"So you would say this: {misconception.predicts}",
             HELD_WITHOUT_HEDGING]
        ),
        "what_you_can_and_cannot_use": (
            f"Words and ideas you already have: {_bullets(library.everyday_terms)}. "
            f"Words you do not have until the teacher uses them first: "
            f"{_bullets(library.answer_giveaway_terms)}. "
            "You do not reach for those, and you do not reach for the idea behind them either, "
            "until the teacher puts them in front of you."
        ),
        "how_you_talk": _join([
            say("register_and_verbosity"),
            say("self_explanation_propensity"),
            register_note,
        ]),
        "how_you_respond_to_teaching": _join([
            say("misconception_robustness"),
            say("conceptual_change_rate"),
            f"The only things that move you at all: {shifts}.{next_idea}",
        ]),
        "how_you_feel_as_it_goes": say("affect_trajectory"),
        "when_you_are_stuck": _join([say("help_seeking_style"), say("goal_orientation")]),
    }


def render(sections: dict[str, str]) -> str:
    """The sections as prompt text, in fixed order under fixed headings."""
    return "\n\n".join(
        f"{heading}:\n{sections[key].strip()}" for key, heading in SECTION_ORDER
    )
