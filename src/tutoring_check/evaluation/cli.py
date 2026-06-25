"""CLI: traverse a runs/ tree and evaluate every conversation, resume-safe (evaluation.md "Modules").

Each `transcript.jsonl` under --runs is annotated in place; a conversation whose
`evaluation_transcript.jsonl` already exists is skipped, so re-running only fills gaps.
"""
from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.evaluation.evaluator import evaluate_transcript


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Evaluate simulated tutoring conversations with the mTeach annotator.")
    parser.add_argument("--runs", type=Path, default=Path("runs"), help="Root dir to traverse for transcript.jsonl.")
    parser.add_argument("--annotator-model", type=str, required=True, help="litellm model string for the annotator.")
    return parser


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    transcripts = sorted(args.runs.rglob("transcript.jsonl"))
    if not transcripts:
        raise ValueError(f"no transcript.jsonl found under {args.runs}")

    for transcript_path in transcripts:
        out_dir = await evaluate_transcript(transcript_path, annotator_model=args.annotator_model)
        if out_dir is None:
            print(f"skip (exists) {transcript_path.parent}")
        else:
            print(f"evaluated {out_dir}")
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
