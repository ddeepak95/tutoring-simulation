"""Interrater reliability between two sets of per-turn move codes (evaluation.md "Dimensions").

Cohen's Kappa needs the joint distribution of two raters' decisions, so every comparison here
aligns codes on (scenario, language, turn_id) and never on conversation totals; two raters can
post identical totals while agreeing on no turn at all.
Each dimension is scored separately, because pooling the six columns would blend the near-constant
ones into the contested ones and inflate agreement.
"""
from __future__ import annotations

import csv
import json
import random
from dataclasses import dataclass
from pathlib import Path

from tutoring_check.evaluation.dimensions import dimension_keys

# A single coded unit: one tutor turn of one conversation in one language.
CodeKey = tuple[str, str, int]


@dataclass(frozen=True)
class Agreement:
    """One dimension's agreement between two raters over a set of turns.

    `kappa` is None when the statistic is undefined, which happens when both raters are constant;
    `note` then says why.
    `pabak` is the prevalence-adjusted bias-adjusted kappa, reported because a skewed dimension can
    show high raw agreement and near-zero kappa at the same time.
    """
    dimension: str
    n: int
    kappa: float | None
    ci_low: float | None
    ci_high: float | None
    observed_agreement: float
    prevalence_a: float
    prevalence_b: float
    pabak: float | None
    note: str = ""


def cohen_kappa(a: list[int], b: list[int]) -> float | None:
    """Cohen's Kappa for two binary code vectors, or None when chance agreement is total.

    Returns None rather than 0.0 when p_e == 1, since that case carries no information about
    agreement instead of indicating agreement at chance.
    """
    n = len(a)
    if n == 0:
        return None
    p_o = sum(1 for x, y in zip(a, b) if x == y) / n
    pa, pb = sum(a) / n, sum(b) / n
    p_e = pa * pb + (1 - pa) * (1 - pb)
    if abs(1 - p_e) < 1e-12:
        return None
    return (p_o - p_e) / (1 - p_e)


def _percentile(values: list[float], q: float) -> float:
    """Linear-interpolated percentile of `values` at quantile `q` in [0, 1]."""
    if not values:
        raise ValueError("no values")
    ordered = sorted(values)
    if len(ordered) == 1:
        return ordered[0]
    pos = q * (len(ordered) - 1)
    lo = int(pos)
    hi = min(lo + 1, len(ordered) - 1)
    return ordered[lo] + (ordered[hi] - ordered[lo]) * (pos - lo)


def bootstrap_ci(
    a: list[int], b: list[int], *, n_boot: int = 5000, seed: int = 0
) -> tuple[float | None, float | None]:
    """Percentile bootstrap CI for Kappa, resampling turns with replacement.

    Preferred over the asymptotic standard error because these dimensions are heavily skewed and
    the normal approximation misbehaves there.
    Resamples that land on a constant vector yield an undefined Kappa and are dropped, so a wide or
    absent interval is itself a signal that the dimension is too rare to estimate.
    """
    rng = random.Random(seed)
    n = len(a)
    draws: list[float] = []
    for _ in range(n_boot):
        idx = [rng.randrange(n) for _ in range(n)]
        k = cohen_kappa([a[i] for i in idx], [b[i] for i in idx])
        if k is not None:
            draws.append(k)
    if len(draws) < n_boot * 0.5:
        return None, None
    return _percentile(draws, 0.025), _percentile(draws, 0.975)


def agreement(a: list[int], b: list[int], *, dimension: str, n_boot: int = 5000) -> Agreement:
    """Score one dimension: Kappa with a bootstrap CI, plus the context needed to read it."""
    n = len(a)
    p_o = sum(1 for x, y in zip(a, b) if x == y) / n if n else 0.0
    kappa = cohen_kappa(a, b)
    note = ""
    if kappa is None:
        constant_a = len(set(a)) == 1
        constant_b = len(set(b)) == 1
        if constant_a and constant_b:
            note = "undefined: both raters constant, no variance to agree about"
        else:
            note = "undefined: chance agreement is total"
    lo, hi = bootstrap_ci(a, b, n_boot=n_boot) if kappa is not None else (None, None)
    return Agreement(
        dimension=dimension,
        n=n,
        kappa=kappa,
        ci_low=lo,
        ci_high=hi,
        observed_agreement=p_o,
        prevalence_a=sum(a) / n if n else 0.0,
        prevalence_b=sum(b) / n if n else 0.0,
        pabak=2 * p_o - 1 if n else None,
        note=note,
    )


def load_human_codes(path: Path) -> tuple[dict[CodeKey, list[int]], dict[CodeKey, str]]:
    """Read hand-coded turns from a CSV with coder, scenario, language, turn_id, then one dimension per column.

    Values may be written as TRUE/FALSE or 1/0; anything else in a dimension column is an error.
    Returns the codes and the coder who produced each one, since which human coded a cell decides
    which comparisons are interpretable.
    """
    keys = list(dimension_keys())
    codes: dict[CodeKey, list[int]] = {}
    coders: dict[CodeKey, str] = {}
    with path.open() as fh:
        for row in csv.DictReader(fh):
            missing = [k for k in keys if k not in row]
            if missing:
                raise ValueError(f"{path}: missing dimension columns {missing}")
            if "coder" not in row:
                raise ValueError(f"{path}: missing 'coder' column; coder identity is required to read any contrast")
            vector = []
            for k in keys:
                raw = row[k].strip().upper()
                if raw in {"TRUE", "1"}:
                    vector.append(1)
                elif raw in {"FALSE", "0"}:
                    vector.append(0)
                else:
                    raise ValueError(f"{path}: unreadable value {row[k]!r} in column {k}")
            key = (row["scenario"], row["language"], int(row["turn_id"]))
            if key in codes:
                raise ValueError(
                    f"{path}: {key} coded twice, by {coders[key]!r} and {row['coder']!r}. "
                    "This format holds one coder per unit; double-coded units need a format keyed by "
                    "coder, and they are what human-human kappa would be computed from"
                )
            codes[key] = vector
            coders[key] = row["coder"]
    return codes, coders


def filter_by_coder(codes: dict[CodeKey, list[int]], coders: dict[CodeKey, str], coder: str) -> dict[CodeKey, list[int]]:
    """The subset of `codes` produced by one coder."""
    return {k: v for k, v in codes.items() if coders.get(k) == coder}


def load_judge_codes(runs_dir: Path) -> dict[CodeKey, list[int]]:
    """Read every `evaluation_transcript*.jsonl` under `runs_dir`, binarised to presence/absence.

    The evaluator emits counts; a count above zero becomes 1, since the coding scheme asks whether a
    move occurred and a second instance in one turn is a segmentation artifact.
    Raises if a file was written under a stale dimension vocabulary, which would silently misalign
    the columns against the human codes.
    """
    keys = list(dimension_keys())
    codes: dict[CodeKey, list[int]] = {}
    for path in sorted(runs_dir.rglob("evaluation_transcript*.jsonl")):
        if path.name.endswith(("_requests.jsonl", "_responses.jsonl")):
            continue
        rows = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
        if not rows:
            continue
        header = rows[0]
        if header.get("dimensions") != keys:
            raise ValueError(
                f"{path}: dimension vocabulary {header.get('dimensions')} does not match "
                f"the current {keys}; re-run the annotator on this file"
            )
        scenario = path.parent.parent.name
        mode = header.get("mode")
        language = f"{header['language']} ({mode})" if mode else header["language"]
        for row in rows:
            if "turn_id" not in row:
                continue
            codes[(scenario, language, row["turn_id"])] = [1 if v > 0 else 0 for v in row["dimensions"]]
    return codes


def compare(
    a: dict[CodeKey, list[int]],
    b: dict[CodeKey, list[int]],
    *,
    language: str | None = None,
    n_boot: int = 5000,
) -> list[Agreement]:
    """Score every dimension over the turns both raters coded, optionally within one language.

    Turns coded by only one rater are dropped, since Kappa is defined only on shared units.
    """
    shared = sorted(set(a) & set(b))
    if language is not None:
        shared = [k for k in shared if k[1] == language]
    if not shared:
        raise ValueError("no turns coded by both raters" + (f" for language {language}" if language else ""))
    results = []
    for i, dim in enumerate(dimension_keys()):
        results.append(
            agreement([a[k][i] for k in shared], [b[k][i] for k in shared], dimension=dim, n_boot=n_boot)
        )
    return results


def project_language(
    codes: dict[CodeKey, list[int]],
    language: str,
    *,
    coders: dict[CodeKey, str] | None = None,
) -> dict[CodeKey, list[int]]:
    """Re-key one language's codes onto language-free units so two languages can be compared turn by turn.

    Comparing a transcript against its own translation is not interrater reliability: it is one rater
    applied to two stimuli, so it measures whether the instrument survives translation.
    Pass `coders` for human codes; the returned units carry the coder so `cross_language` can refuse a
    contrast in which the coder changes along with the language and neither effect is recoverable.
    """
    out = {}
    for (scenario, lang, turn), vector in codes.items():
        if lang != language:
            continue
        tag = coders.get((scenario, lang, turn), "") if coders else ""
        out[(scenario, tag, turn)] = vector
    return out


def cross_language(
    codes: dict[CodeKey, list[int]],
    lang_a: str,
    lang_b: str,
    *,
    coders: dict[CodeKey, str] | None = None,
    n_boot: int = 5000,
) -> list[Agreement]:
    """Score one rater against itself across a translation, refusing the contrast if the rater changed.

    A cell coded by one person in `lang_a` and a different person in `lang_b` varies coder and language
    together, so any coefficient over it is uninterpretable; that is an error rather than a warning.
    """
    a = project_language(codes, lang_a, coders=coders)
    b = project_language(codes, lang_b, coders=coders)
    shared_units = {(s, t) for s, _, t in a} & {(s, t) for s, _, t in b}
    if not shared_units:
        raise ValueError(f"no turns coded in both {lang_a} and {lang_b}")
    if coders is not None:
        a_by, b_by = {(s, t): c for s, c, t in a}, {(s, t): c for s, c, t in b}
        mismatched = sorted(u for u in shared_units if a_by[u] != b_by[u])
        if mismatched:
            raise ValueError(
                f"{lang_a} vs {lang_b}: coder changes with language on {len(mismatched)} unit(s) "
                f"(e.g. {mismatched[0]}: {a_by[mismatched[0]]} vs {b_by[mismatched[0]]}); "
                "coder and language are confounded, so this contrast is not interpretable"
            )
    pa = {(s, t): v for (s, _, t), v in a.items()}
    pb = {(s, t): v for (s, _, t), v in b.items()}
    keyed_a = {(s, "", t): pa[(s, t)] for s, t in sorted(shared_units)}
    keyed_b = {(s, "", t): pb[(s, t)] for s, t in sorted(shared_units)}
    return compare(keyed_a, keyed_b, n_boot=n_boot)


def languages(codes: dict[CodeKey, list[int]]) -> list[str]:
    """The distinct languages present in a set of codes, in sorted order."""
    return sorted({lang for _, lang, _ in codes})


def format_matrix(cells: dict[str, list[Agreement]], *, title: str) -> str:
    """Render one Kappa per dimension per cell as a grid, for reading across cells at a glance.

    Prints the point estimate only; the per-cell tables carry the intervals that say whether any of
    these numbers can be told apart.
    """
    names = list(cells)
    width = max(len(n) for n in names) + 2
    lines = [f"\n{title}", "-" * (32 + width * len(names))]
    lines.append(f"{'dimension':32s}" + "".join(n.rjust(width) for n in names))
    lines.append("-" * (32 + width * len(names)))
    for i, dim in enumerate(dimension_keys()):
        row = f"{dim:32s}"
        for n in names:
            k = cells[n][i].kappa
            row += (f"{k:+.2f}" if k is not None else "-").rjust(width)
        lines.append(row)
    lines.append(f"\n  n per cell: " + ", ".join(f"{n}={cells[n][0].n}" for n in names))
    return "\n".join(lines)


def format_table(results: list[Agreement], *, title: str) -> str:
    """Render scored dimensions as a fixed-width table, with prevalence beside every coefficient."""
    def cell(v: float | None, width: int = 6) -> str:
        return f"{v:+.2f}".rjust(width) if v is not None else "".rjust(width - 1) + "-"

    lines = [f"\n{title}  (n = {results[0].n} turns)", "-" * 78]
    lines.append(f"{'dimension':32s}{'kappa':>7}{'95% CI':>16}{'agree':>7}{'prev A':>8}{'prev B':>8}")
    lines.append("-" * 78)
    for r in results:
        ci = f"[{r.ci_low:+.2f},{r.ci_high:+.2f}]" if r.ci_low is not None else "-"
        lines.append(
            f"{r.dimension:32s}{cell(r.kappa):>7}{ci:>16}"
            f"{r.observed_agreement:>7.0%}{r.prevalence_a:>8.0%}{r.prevalence_b:>8.0%}"
        )
        if r.note:
            lines.append(f"{'':32s}{r.note}")
    return "\n".join(lines)
