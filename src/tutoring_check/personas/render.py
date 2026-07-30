"""Assemble a student persona from a level and a topic - deterministically, with no model call.

The student prompt is a pure function of (level, topic_id, language). Same inputs, same bytes,
every time; nothing is cached, pinned, or hashed, because there is nothing non-reproducible to pin.
The git commit is the record of what a run used, and `session.py` logs the assembled prompt into
the transcript header anyway.

Every section is rendered in the same three-part shape:

    ## <heading>
    What this is: <what this section covers, and why it is here>
    --
    <the behaviour the student performs>

The `What this is:` line is fixed per section and identical across all four levels; only the
behaviour under it varies. That split is what makes a level comparison mean anything - the frame is
a constant, so a difference between `struggling` and `reluctant` is the manipulation and not
phrasing that drifted between cells.

Three rules for those lines, each learned the hard way:

  * true of EVERY value the trait can take. The mood line must fit `engaged_persistent`,
    `confusion_to_frustration` and `flat_compliant` alike; one that fits a single value argues with
    the other two, which is why the heading it replaced ("...and frustration") contradicted its own
    body on three of the four levels;
  * it explains, it does not instruct - the prose below does that. The obvious mood line, "your
    mood shows in how you reply, you do not announce it", is exactly wrong: it contradicts
    `confusion_to_frustration`, whose whole content is saying out loud that this is too hard;
  * plain words.

Where each section's behaviour comes from:

    who_you_are                  the student profile - name, age, grade, languages, where they are
    what_you_believe             the library's primary entry (belief + predicts), held confidently
    what_you_can_and_cannot_use  the library's everyday_terms and answer_giveaway_terms
    how_you_talk                 the language, then register_and_verbosity +
                                 self_explanation_propensity + the typing mechanics, as one list
    how_you_respond_to_teaching  misconception_robustness + conceptual_change_rate, plus the
                                 library's changes_only_when and slides_into, as four bullets
    how_you_feel_as_it_goes      affect_trajectory
    what_you_want                goal_orientation
    when_you_are_stuck           help_seeking_style

Bullet labels live here rather than in `traits.py`, so a trait can be re-filed into another section
without editing its prose.
"""
from __future__ import annotations

from tutoring_check.personas.levels import resolve
from tutoring_check.personas.misconceptions import TopicLibrary
from tutoring_check.personas.profile import StudentProfile
from tutoring_check.personas.traits import prose

# Key, heading, and the `What this is:` text - all three in one table, so adding a section is one
# entry rather than an edit in three places. Fixed order; every level renders identically and only
# the behaviour differs.
#
# `what_you_want` used to be the second half of `when_you_are_stuck`. It is what the student wants
# out of the whole conversation, not what they do at an impasse, and filing it under "stuck" made
# that section read as two unrelated halves.
SECTIONS: tuple[tuple[str, str, str], ...] = (
    (
        "who_you_are",
        "Student identity and context",
        "the basics about you, and what is happening right now.",
    ),
    (
        "what_you_believe",
        "Current topic understanding and beliefs",
        "your current understanding of what the teacher is about to ask, and you believe it is "
        "true.",
    ),
    (
        "what_you_can_and_cannot_use",
        "Available and restricted vocabulary",
        "the words you can use, and the ones that are off limits. The second list is off limits "
        "because those words carry the answer, and you have not been taught it yet.",
    ),
    (
        "how_you_talk",
        "Response style and language use",
        "what your messages look like - how much you write, and how you type it.",
    ),
    (
        "how_you_respond_to_teaching",
        "Belief persistence and conceptual change",
        "how hard it is to move you off what you think, and what would actually do it. Being told "
        "you are wrong is not the same as being shown something.",
    ),
    (
        "how_you_feel_as_it_goes",
        "Temperament and mood",
        "your mood during the lesson, and how it changes from the start to the end. It moves with "
        "how well things are going for you.",
    ),
    (
        "what_you_want",
        "Learning goals and motivation",
        "what you are hoping for by the end, and the reason you answer at all. This is how you are "
        "about schoolwork in general, not just this topic.",
    ),
    (
        "when_you_are_stuck",
        "Behavior when stuck",
        "what you do at the moment you cannot go any further.",
    ),
)

SECTION_KEYS: tuple[str, ...] = tuple(key for key, _, _ in SECTIONS)

SEPARATOR = "*****"
EXPLANATION_RULE = "--"

# The boundary section names the terms that are out of reach, which for any topic are exactly the
# answer's terms. Naming a term as out of reach is the opposite of leaking it, so the answer-leak
# lint skips this section - and only this one.
ANSWER_LEAK_EXEMPT: frozenset[str] = frozenset({"what_you_can_and_cannot_use"})

MAX_SHIFTS = 2

# Subject-neutral on purpose. The topic catalog happens to be science, but nothing in the design is,
# and a persona hardcoding "a science question" would quietly contradict the first maths or history
# topic added.
#
# It used to close on "You are willing to say what you think" - a motivation claim sitting in the
# level-invariant layer, which is the exact thing `avoidant` help-seeking and `flat_compliant`
# affect exist to vary.
THE_SITUATION = "The teacher is about to ask you about {topic}."

# The language of the conversation - a property of the run, not of the student. `speaks` in
# who_you_are is a different fact: the languages this student has, which may not be the lesson's.
LANGUAGE_LINE = "You write in {language}, using its own script."

# How the belief is held rather than what it is - true of every level, because a student who hedges
# their wrong idea never states it plainly enough for the tutor to have anything to work on. How
# hard it is to give up is `misconception_robustness`, which the level does vary.
#
# One sentence now. It used to be four ways of saying the same thing: the section opened "Here is
# what you are sure of", then this said "You are confident about this", "It is not a guess", and
# "you would say it to a friend without hedging".
HELD_WITHOUT_HEDGING = "You are sure about this. You would say it straight out, not as a guess."

TEXTING_LEAD = "Write the way a student like you texts."

# The typing mechanics, appended to how_you_talk for every level and every language. A model playing
# a student writes tidy, fully punctuated sentences whatever `register_and_verbosity` says, so the
# fix sits outside the trait. Strict split, since both render into the same list: the trait owns how
# much is written, this owns the mechanics. Nothing here mentions length.
#
# Written loosely on purpose. A precise earlier version specified each mark to skip and the model
# applied it exactly: 0 of 10 replies carried a capital, a terminal stop, or an apostrophe.
# Uniformly stripped text is its own tell, just a different one from the tidy sentences it replaced.
#
# Two things are stated precisely anyway, because loose versions of them measurably failed:
#   * fillers are bounded ("without overdoing it", "not the same ones"). An earlier rate - "about
#     one reply in three carries a filler" - produced one in 10 of 10 turns, seven opening on the
#     same word. The prompt is rebuilt from scratch each turn, so a rate has no tally to refer to;
#   * typos carry a floor AND a ceiling. "One or two in the whole conversation" alone produced four
#     or five, because a lone number reads as a target rather than a limit.
#
# No example tokens anywhere: a quoted phrase gets echoed every turn, which `lint` also enforces.
STUDENT_REGISTER = (
    "Your response style should emulate the way a student from this students background would text. Following are some guidelines:\n"
    "- Punctuation: casual, the way teenagers text without explicit full stops in the end. Not careful or too formal.\n"
    "- Short forms: the slang and short spellings you would really use when texting.\n"
    "- Fillers: use fillers and interjections where they fit, but do not overdo it and do not keep "
    "using the same ones.\n"
    "- Typos: you do not go back and fix mistakes, so a slip stays in. One or two in the whole "
    "conversation, not one a turn."
)


def _join(parts: list[str]) -> str:
    return " ".join(p.strip() for p in parts if p and p.strip())


def _lines(parts: list[str]) -> str:
    return "\n".join(p.strip() for p in parts if p and p.strip())


def _bullets(items: tuple[str, ...]) -> str:
    return "; ".join(items)


def who_you_are(profile: StudentProfile, topic: str) -> str:
    """The profile as the student would state it. `region` is dropped when the run set sets none."""
    where = f" at school in {profile.region}" if profile.region else " at school"
    return _join([
        f"You are {profile.name}, {profile.age} years old and in {profile.grade}{where}.",
        f"You speak {profile.speaks}.",
        THE_SITUATION.format(topic=topic),
    ])


def build_sections(
    level: str,
    library: TopicLibrary,
    profile: StudentProfile,
    language: str,
    topic: str,
) -> dict[str, str]:
    """The behaviour half of every section, keyed by section name.

    The headings and their `What this is:` lines are fixed in `SECTIONS`; this supplies only what
    goes under the `--`. `student.py` adds the opening frame and the closing reminder and nothing
    else - a fact stated in both places is a fact with two authors, and every conflict found so far
    has been of exactly that kind.
    """
    traits = resolve(level)
    misconception = library.primary
    say = lambda key: prose(key, traits[key])   # noqa: E731 - reads better than a def here

    # Only the first two. The library orders them strongest-first, and listing every route into a
    # belief reads as a menu of ways to be talked out of it - which is the opposite of holding one.
    shifts = _bullets(misconception.changes_only_when[:MAX_SHIFTS])

    return {
        "who_you_are": who_you_are(profile, topic),
        "what_you_believe": _join([
            misconception.belief,
            f"So you would say: {misconception.predicts}",
            HELD_WITHOUT_HEDGING,
        ]),
        "what_you_can_and_cannot_use": (
            f"Words you already have: {_bullets(library.everyday_terms)}. "
            f"Words you do not have: {_bullets(library.answer_giveaway_terms)}. "
            "You do not use these words, or the idea behind them, until the teacher says them "
            "first."
        ),
        # One list of six, not prose followed by a separate block. Each line names what it governs,
        # so the two traits and the four mechanics rules cannot be read as one undifferentiated
        # instruction about "how to write".
        "how_you_talk": _lines([
            f"{LANGUAGE_LINE.format(language=language)} {TEXTING_LEAD}",
            f"- How much you say: {say('register_and_verbosity')}",
            f"- Explaining yourself: {say('self_explanation_propensity')}",
            STUDENT_REGISTER,
        ]),
        # Four jobs that used to run together as one paragraph. The labels also keep the first two
        # apart: both count turns ("four or more turns of evidence", "within a turn or two") and
        # they count different things.
        "how_you_respond_to_teaching": _lines([
            f"- Letting go of your idea: {say('misconception_robustness')}",
            f"- Taking in something new: {say('conceptual_change_rate')}",
            f"- What would actually shift you: {shifts}.",
            f"- What you think next: {misconception.slides_into}" if misconception.slides_into else "",
        ]),
        "how_you_feel_as_it_goes": say("affect_trajectory"),
        "what_you_want": say("goal_orientation"),
        "when_you_are_stuck": say("help_seeking_style"),
    }


def render(sections: dict[str, str]) -> str:
    """The sections as prompt text: heading, explanation, rule, behaviour, separator."""
    return f"\n{SEPARATOR}\n".join(
        f"## {heading}\nWhat this is: {what}\n{EXPLANATION_RULE}\n{sections[key].strip()}"
        for key, heading, what in SECTIONS
    )
