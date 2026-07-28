"""The student levels: the study's only manipulated student factor (personas.md "Part 5").

Each level is a fixed bundle of every trait in `traits.TRAITS`. A run-set item names a level; it
cannot name a trait. That holds the design at four cells per topic and keeps the comparison legible.

`struggling -> developing -> advanced` is an ordered ability spine. `reluctant` deliberately breaks
the ordering: it shares `developing`'s conceptual_change_rate, so it is just as capable, but
withholds - avoidant help-seeking, performance-avoidance goals, passive engagement, flat affect. It
dissociates ability from responsiveness, which the three ability levels confound. A tutor that gets
through to `struggling` by patient re-explanation should fail with `reluctant`, because
comprehension is not the bottleneck there.

This is the file you edit to change the study design. `traits.py` is the file you edit to change how
a level behaves.
"""
from __future__ import annotations

from tutoring_check.personas.traits import TRAITS, trait_keys

STRUGGLING = "struggling"
DEVELOPING = "developing"
ADVANCED = "advanced"
RELUCTANT = "reluctant"

LEVELS: dict[str, dict[str, str]] = {
    STRUGGLING: {
        "misconception_robustness": "robust",
        "conceptual_change_rate": "slow",
        "self_explanation_propensity": "passive",
        "help_seeking_style": "instrumental",
        "register_and_verbosity": "terse_colloquial",
        "goal_orientation": "mastery",
        "affect_trajectory": "confusion_to_frustration",
    },
    DEVELOPING: {
        "misconception_robustness": "intermediate",
        "conceptual_change_rate": "moderate",
        "self_explanation_propensity": "active",
        "help_seeking_style": "instrumental",
        "register_and_verbosity": "typical",
        "goal_orientation": "mastery",
        "affect_trajectory": "engaged_persistent",
    },
    ADVANCED: {
        "misconception_robustness": "labile",
        "conceptual_change_rate": "fast",
        "self_explanation_propensity": "constructive",
        "help_seeking_style": "instrumental",
        "register_and_verbosity": "typical",
        "goal_orientation": "mastery",
        "affect_trajectory": "engaged_persistent",
    },
    # Same change rate as `developing` on purpose: the difference is withholding, not ability.
    RELUCTANT: {
        "misconception_robustness": "intermediate",
        "conceptual_change_rate": "moderate",
        "self_explanation_propensity": "passive",
        "help_seeking_style": "avoidant",
        "register_and_verbosity": "terse_colloquial",
        "goal_orientation": "performance_avoidance",
        "affect_trajectory": "flat_compliant",
    },
}


def level_names() -> tuple[str, ...]:
    return tuple(LEVELS)


def resolve(level: str) -> dict[str, str]:
    """The full trait vector for `level`, validated against the registry.

    Raises if the level is unknown, if it omits a trait, or if it names a value the trait does not
    have - so a registry edit that renames a value fails here rather than producing a persona that
    silently drops a characteristic.
    """
    try:
        bundle = LEVELS[level]
    except KeyError:
        raise KeyError(f"unknown level {level!r}; known: {list(LEVELS)}") from None

    missing = [k for k in trait_keys() if k not in bundle]
    if missing:
        raise ValueError(f"level {level!r} does not set trait(s): {missing}")
    unknown = [k for k in bundle if k not in trait_keys()]
    if unknown:
        raise ValueError(f"level {level!r} sets unknown trait(s): {unknown}")

    for key, value in bundle.items():
        if value not in TRAITS[key]:
            raise ValueError(
                f"level {level!r} sets {key}={value!r}, which is not a value that trait has; "
                f"known: {list(TRAITS[key])}"
            )

    return {key: bundle[key] for key in TRAITS}  # registry order, not dict-literal order
