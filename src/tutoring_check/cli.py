from __future__ import annotations

import argparse
import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.socratic.config import load_config, resolve_sessions
from tutoring_check.teachtune.config import create_example_configs
from tutoring_check.socratic.simulator import run_single_session
from tutoring_check.teachtune.session import run_teachtune_session


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the two-LLM tutoring simulator.")
    parser.add_argument(
        "--mode",
        choices=["teachtune", "socratic"],
        default="teachtune",
        help="teachtune: coverage-based TeachTune pipeline (default). "
        "socratic: original JSON-driven rubric simulator.",
    )
    parser.add_argument("--run-set", type=Path, default=Path("data/run_set.json"))
    parser.add_argument("--topics", type=Path, default=Path("data/topics.json"))
    parser.add_argument("--languages", type=Path, default=Path("data/languages.json"))
    parser.add_argument("--models", type=Path, default=Path("data/models.json"))
    parser.add_argument("--item-id", type=str, default=None, help="Run only one run_set entry id (socratic).")
    parser.add_argument("--topic", type=str, default=None, help="Run only the example config with this topic (teachtune).")
    parser.add_argument("--teacher-model", type=str, default=None)
    parser.add_argument("--student-model", type=str, default=None)
    parser.add_argument("--out", type=Path, default=Path("runs"))
    return parser


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    if args.mode == "teachtune":
        return await _run_teachtune(args)
    return await _run_socratic(args)


async def _run_teachtune(args: argparse.Namespace) -> int:
    teacher_model = args.teacher_model or os.getenv("TUTORING_TEACHER_MODEL")
    student_model = args.student_model or os.getenv("TUTORING_STUDENT_MODEL")
    if not teacher_model or not student_model:
        raise ValueError(
            "teachtune mode needs a teacher and student model. Pass --teacher-model "
            "and --student-model, or set TUTORING_TEACHER_MODEL / TUTORING_STUDENT_MODEL."
        )

    configs = create_example_configs()
    if args.topic:
        configs = [c for c in configs if c.topic == args.topic]
        if not configs:
            raise ValueError(f"No example config matched --topic '{args.topic}'")

    args.out.mkdir(parents=True, exist_ok=True)
    for config in configs:
        out_dir = await run_teachtune_session(
            config,
            teacher_model=teacher_model,
            student_model=student_model,
            output_root=args.out,
        )
        print(f"completed topic={config.topic!r} output_dir={out_dir}")
    return 0


async def _run_socratic(args: argparse.Namespace) -> int:
    run_set, topics, languages, models = load_config(
        run_set_path=args.run_set,
        topics_path=args.topics,
        languages_path=args.languages,
        models_path=args.models,
    )
    resolved = resolve_sessions(
        run_set=run_set,
        topics=topics,
        languages=languages,
        models=models,
        teacher_model_override=args.teacher_model,
        student_model_override=args.student_model,
    )

    if args.item_id:
        resolved = [s for s in resolved if s.run_set_item_id == args.item_id]
        if not resolved:
            raise ValueError(f"No run_set entry matched --item-id '{args.item_id}'")

    args.out.mkdir(parents=True, exist_ok=True)
    for session in resolved:
        result = await run_single_session(session=session, output_root=args.out)
        print(f"completed run_set_item_id={result.run_set_item_id} output_dir={result.output_dir}")
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return asyncio.run(run(args))
