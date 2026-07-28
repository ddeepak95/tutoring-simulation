"""CLI: print a rendered student prompt, and lint the inputs it is built from.

There is no compile step. A persona is a pure function of (level, topic, language), so this tool
only ever shows you what a run would use - it writes nothing and calls no model.

    # what the struggling student on tree-mass will actually be told
    python -m tutoring_check.personas.cli show --level struggling --topic tree-mass

    # every level side by side, sections only
    python -m tutoring_check.personas.cli show --topic tree-mass --sections-only

    # check the misconception library and the trait registry
    python -m tutoring_check.personas.cli lint --topic tree-mass
"""
from __future__ import annotations

import argparse
from pathlib import Path

from tutoring_check.personas import lint as lint_mod
from tutoring_check.personas.levels import level_names, resolve
from tutoring_check.personas.misconceptions import load_topic
from tutoring_check.personas.profile import StudentProfile
from tutoring_check.personas.render import build_sections, render
from tutoring_check.simulation.catalog import load_catalogs


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Inspect and lint literature-grounded student personas.")
    parser.add_argument("command", choices=("show", "lint"))
    parser.add_argument("--topic", default="tree-mass", help="topic_id from data/topics_ci.json")
    parser.add_argument("--level", default=None, help="One level; default is all of them.")
    parser.add_argument("--language", default="en-US", help="language_id from data/languages.json")
    parser.add_argument("--data-dir", type=Path, default=Path("data"))
    parser.add_argument("--sections-only", action="store_true", help="Skip the fixed frame; show only the persona.")
    parser.add_argument("--student", default=None, help="student_id from data/students.json; default is the first.")
    parser.add_argument("--region", default="China", help="Where the student is at school, for who_you_are.")
    return parser


def _library(args):
    return load_topic(args.topic, data_dir=args.data_dir / "misconceptions")


def _profile(args, cat) -> StudentProfile:
    student_id = args.student or next(iter(cat.students))
    if student_id not in cat.students:
        raise KeyError(f"unknown student_id {student_id!r}; known: {sorted(cat.students)}")
    return StudentProfile.from_row(cat.students[student_id], region=args.region)


def _show(args) -> int:
    cat = load_catalogs(args.data_dir)
    topic = cat.topics_ci[args.topic]
    language = cat.languages[args.language]["name"]
    library = _library(args)
    profile = _profile(args, cat)

    for level in ([args.level] if args.level else level_names()):
        traits = resolve(level)
        sections = build_sections(level, library, profile, language, args.language)
        print(f"\n{'=' * 30} {level} {'=' * 30}")
        if args.sections_only:
            print(render(sections))
        else:
            # Import here so `lint` stays usable even if the simulation package is mid-edit.
            from tutoring_check.simulation.config import SessionConfig
            from tutoring_check.simulation.student import build_student_system_prompt

            print(build_student_system_prompt(SessionConfig(
                scenario_id=args.topic, context_dependent=False,
                topic=topic["topic"], question=topic["question"], language=language,
                level=level, persona_sections=sections, traits=traits,
                misconception_id=library.primary.id, region=args.region, student=profile,
            )))
        for v in lint_mod.check_rendered(sections, library, level):
            print(f"\n  LINT {v}")
    return 0


def _lint(args) -> int:
    library = _library(args)
    violations = lint_mod.check_registry() + lint_mod.check_library(library)

    cat = load_catalogs(args.data_dir)
    language = cat.languages[args.language]["name"]
    profile = _profile(args, cat)
    for level in level_names():
        traits = resolve(level)
        sections = build_sections(level, library, profile, language, args.language)
        violations += lint_mod.check_rendered(sections, library, level)

    for v in violations:
        print(f"{v.rule_id:22} {v}")
    print(f"\n{len(violations)} violation(s)")
    return 1 if violations else 0


def main() -> int:
    args = build_parser().parse_args()
    return _show(args) if args.command == "show" else _lint(args)


if __name__ == "__main__":
    raise SystemExit(main())
