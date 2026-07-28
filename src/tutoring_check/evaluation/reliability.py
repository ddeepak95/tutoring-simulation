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

from tutoring_check.evaluation.dimensions import dimension_keys, scale_keys

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


def _bootstrap_ci(
    n: int, statistic, *, n_boot: int = 5000, seed: int = 0
) -> tuple[float | None, float | None]:
    """Percentile bootstrap CI for a statistic over `n` units, resampling unit indices with replacement.

    Preferred over the asymptotic standard error because these dimensions are heavily skewed and
    the normal approximation misbehaves there.
    Resamples on which the statistic is undefined are dropped, so a wide or absent interval is itself
    a signal that the dimension is too rare to estimate.
    """
    rng = random.Random(seed)
    draws: list[float] = []
    for _ in range(n_boot):
        idx = [rng.randrange(n) for _ in range(n)]
        value = statistic(idx)
        if value is not None:
            draws.append(value)
    if len(draws) < n_boot * 0.5:
        return None, None
    return _percentile(draws, 0.025), _percentile(draws, 0.975)


def bootstrap_ci(
    a: list[int], b: list[int], *, n_boot: int = 5000, seed: int = 0
) -> tuple[float | None, float | None]:
    """Percentile bootstrap CI for Cohen's Kappa, resampling turns with replacement."""
    return _bootstrap_ci(
        len(a),
        lambda idx: cohen_kappa([a[i] for i in idx], [b[i] for i in idx]),
        n_boot=n_boot,
        seed=seed,
    )


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


@dataclass(frozen=True)
class GroupAgreement:
    """One dimension's agreement among three or more raters who all coded the same turns.

    Cohen's Kappa is defined for two raters only, so a panel is summarised with Fleiss' Kappa, which
    asks the same question of the whole panel instead of averaging pair coefficients that each rest on
    a different marginal.
    `kappa` is None when the statistic is undefined, which happens when the move is absent (or present)
    on every turn for every rater; `note` then says so.
    """
    dimension: str
    n: int
    raters: int
    kappa: float | None
    ci_low: float | None
    ci_high: float | None
    unanimous: float
    prevalence: float
    note: str = ""


def fleiss_kappa(vectors: list[list[int]]) -> float | None:
    """Fleiss' Kappa for `m` raters coding the same `n` units on one binary dimension.

    Returns None rather than 0.0 when chance agreement is total, since that case carries no
    information about agreement instead of indicating agreement at chance.
    """
    m = len(vectors)
    n = len(vectors[0]) if vectors else 0
    if m < 2 or n == 0:
        return None
    positives = [sum(v[i] for v in vectors) for i in range(n)]
    # Per-unit agreement: the share of rater pairs on a unit that assigned it the same code.
    p_bar = sum(p * p + (m - p) * (m - p) - m for p in positives) / (n * m * (m - 1))
    p_one = sum(positives) / (n * m)
    p_e = p_one * p_one + (1 - p_one) * (1 - p_one)
    if abs(1 - p_e) < 1e-12:
        return None
    return (p_bar - p_e) / (1 - p_e)


def group_agreement(
    vectors: list[list[int]], *, dimension: str, n_boot: int = 5000
) -> GroupAgreement:
    """Score one dimension across a panel of raters: Fleiss' Kappa with a bootstrap CI."""
    m, n = len(vectors), len(vectors[0]) if vectors else 0
    kappa = fleiss_kappa(vectors)
    note = "" if kappa is not None else "undefined: chance agreement is total, the move is near-absent for every rater"
    lo, hi = (
        _bootstrap_ci(n, lambda idx: fleiss_kappa([[v[i] for i in idx] for v in vectors]), n_boot=n_boot)
        if kappa is not None
        else (None, None)
    )
    unanimous = sum(1 for i in range(n) if len({v[i] for v in vectors}) == 1) / n if n else 0.0
    return GroupAgreement(
        dimension=dimension,
        n=n,
        raters=m,
        kappa=kappa,
        ci_low=lo,
        ci_high=hi,
        unanimous=unanimous,
        prevalence=sum(sum(v) for v in vectors) / (n * m) if n else 0.0,
        note=note,
    )


def shared_keys(raters: dict[str, dict[CodeKey, list[int]]], *, language: str | None = None) -> list[CodeKey]:
    """The turns every rater in the panel coded, optionally within one language.

    A panel coefficient needs one common set of units, so a turn any rater skipped is dropped for all.
    """
    if not raters:
        return []
    shared = set.intersection(*(set(codes) for codes in raters.values()))
    if language is not None:
        shared = {k for k in shared if k[1] == language}
    return sorted(shared)


def compare_panel(
    raters: dict[str, dict[CodeKey, list[int]]], *, language: str | None = None, n_boot: int = 5000
) -> list[GroupAgreement]:
    """Score every dimension across a whole panel over the turns all of them coded."""
    keys = shared_keys(raters, language=language)
    if not keys:
        raise ValueError("no turns coded by every rater" + (f" for language {language}" if language else ""))
    return [
        group_agreement(
            [[codes[k][i] for k in keys] for codes in raters.values()], dimension=dim, n_boot=n_boot
        )
        for i, dim in enumerate(dimension_keys())
    ]


def compare_pairs(
    raters: dict[str, dict[CodeKey, list[int]]],
    *,
    language: str | None = None,
    keys: list[CodeKey] | None = None,
    n_boot: int = 5000,
) -> dict[tuple[str, str], list[Agreement]]:
    """Cohen's Kappa for every pair in the panel, in rater order.

    Pass `keys` to hold every pair to one common unit set, which is what makes the pair coefficients
    comparable with each other and with the panel's Fleiss' Kappa; leave it out to let each pair use
    every turn the two of them share, which uses more data per pair but not the same data.
    """
    names = list(raters)
    out: dict[tuple[str, str], list[Agreement]] = {}
    for i, a in enumerate(names):
        for b in names[i + 1 :]:
            if keys is None:
                out[(a, b)] = compare(raters[a], raters[b], language=language, n_boot=n_boot)
            else:
                subset_a = {k: raters[a][k] for k in keys}
                subset_b = {k: raters[b][k] for k in keys}
                out[(a, b)] = compare(subset_a, subset_b, n_boot=n_boot)
    return out


@dataclass(frozen=True)
class ScaleAgreement:
    """One ordinal scale's agreement across a panel of raters, by Krippendorff's alpha.

    Cohen's Kappa treats a 1-vs-5 disagreement the same as 1-vs-2; on an interval scale that throws
    away the spacing, so the affective rating is scored with Krippendorff's alpha under an interval
    difference metric instead, which also takes any number of raters at once.
    `alpha` is None when the statistic is undefined, which happens when every rating in the pool is
    identical, so there is no expected disagreement to normalise by; `note` then says so.
    """
    dimension: str
    n_units: int
    raters: int
    alpha: float | None
    ci_low: float | None
    ci_high: float | None
    note: str = ""


def krippendorff_alpha_interval(units: list[list[int]]) -> float | None:
    """Krippendorff's alpha for ordinal ratings under an interval metric, δ²(a, b) = (a − b)².

    `units` holds one list of ratings per unit — the ratings the raters who coded that unit gave it.
    Units with fewer than two ratings carry no pairable information and are dropped. Returns None when
    the expected disagreement is zero (every rating identical), where alpha is undefined.
    """
    pairable = [u for u in units if len(u) >= 2]
    flat = [v for u in pairable for v in u]
    n = len(flat)
    if n < 2:
        return None
    # Observed: mean within-unit squared difference, each unit weighted by 1/(m_u − 1) per Krippendorff.
    observed = sum(
        sum((a - b) ** 2 for a in u for b in u) / (len(u) - 1) for u in pairable
    )
    # Expected: squared difference between every pair of ratings in the whole pool.
    expected = sum((a - b) ** 2 for a in flat for b in flat) / (n - 1)
    if abs(expected) < 1e-12:
        return None
    return 1 - observed / expected


def scale_agreement(
    raters: dict[str, dict[CodeKey, list[int]]],
    *,
    dimension_index: int,
    dimension: str,
    keys: list[CodeKey],
    n_boot: int = 5000,
) -> ScaleAgreement:
    """Score one ordinal scale across the panel over `keys`: Krippendorff's alpha with a bootstrap CI.

    The bootstrap resamples units (not ratings), so a unit's whole row of ratings moves together and the
    interval is not narrowed by pretending the raters are independent.
    """
    units = [[raters[name][k][dimension_index] for name in raters] for k in keys]
    alpha = krippendorff_alpha_interval(units)
    note = "" if alpha is not None else "undefined: every rating identical, no expected disagreement to normalise by"
    lo, hi = (
        _bootstrap_ci(len(units), lambda idx: krippendorff_alpha_interval([units[i] for i in idx]), n_boot=n_boot)
        if alpha is not None
        else (None, None)
    )
    return ScaleAgreement(
        dimension=dimension,
        n_units=len(keys),
        raters=len(raters),
        alpha=alpha,
        ci_low=lo,
        ci_high=hi,
        note=note,
    )


def compare_scales(
    raters: dict[str, dict[CodeKey, list[int]]], *, keys: list[CodeKey], n_boot: int = 5000
) -> list[ScaleAgreement]:
    """Score every ordinal scale dimension across the panel over the shared `keys`."""
    return [
        scale_agreement(raters, dimension_index=i, dimension=key, keys=keys, n_boot=n_boot)
        for i, key in enumerate(scale_keys())
    ]


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


def load_judge_scales(runs_dir: Path) -> dict[CodeKey, list[int]]:
    """Read every `evaluation_transcript*.jsonl` under `runs_dir` for its ordinal scale ratings.

    Returns one integer vector over `scale_keys()` per turn, keyed like `load_judge_codes`.
    Raises if a file was written under a stale scale vocabulary, which would misalign the columns.
    """
    keys = list(scale_keys())
    scales: dict[CodeKey, list[int]] = {}
    for path in sorted(runs_dir.rglob("evaluation_transcript*.jsonl")):
        if path.name.endswith(("_requests.jsonl", "_responses.jsonl")):
            continue
        rows = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
        if not rows:
            continue
        header = rows[0]
        if header.get("scales") != keys:
            raise ValueError(
                f"{path}: scale vocabulary {header.get('scales')} does not match "
                f"the current {keys}; re-run the annotator on this file"
            )
        scenario = path.parent.parent.name
        mode = header.get("mode")
        language = f"{header['language']} ({mode})" if mode else header["language"]
        for row in rows:
            if "turn_id" not in row:
                continue
            scales[(scenario, language, row["turn_id"])] = list(row["scales"])
    return scales


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


def format_group_table(results: list[GroupAgreement], *, title: str) -> str:
    """Render a panel's Fleiss' Kappa per dimension, with unanimity and prevalence beside it.

    `unanimous` is the share of turns on which every rater agreed, the panel counterpart of the
    observed agreement reported for a pair.
    """
    lines = [
        f"\n{title}  (n = {results[0].n} turns, {results[0].raters} raters)",
        "-" * 78,
        f"{'dimension':32s}{'fleiss':>7}{'95% CI':>16}{'unanim':>8}{'prev':>7}",
        "-" * 78,
    ]
    for r in results:
        ci = f"[{r.ci_low:+.2f},{r.ci_high:+.2f}]" if r.ci_low is not None else "-"
        kappa = f"{r.kappa:+.2f}" if r.kappa is not None else "-"
        lines.append(f"{r.dimension:32s}{kappa:>7}{ci:>16}{r.unanimous:>8.0%}{r.prevalence:>7.0%}")
        if r.note:
            lines.append(f"{'':32s}{r.note}")
    return "\n".join(lines)


def format_scale_table(results: list[ScaleAgreement], *, title: str) -> str:
    """Render each ordinal scale's Krippendorff's alpha with its bootstrap CI."""
    lines = [
        f"\n{title}  (n = {results[0].n_units} turns, {results[0].raters} raters)",
        "-" * 78,
        f"{'dimension':32s}{'alpha':>7}{'95% CI':>16}",
        "-" * 78,
    ]
    for r in results:
        ci = f"[{r.ci_low:+.2f},{r.ci_high:+.2f}]" if r.ci_low is not None else "-"
        alpha = f"{r.alpha:+.2f}" if r.alpha is not None else "-"
        lines.append(f"{r.dimension:32s}{alpha:>7}{ci:>16}")
        if r.note:
            lines.append(f"{'':32s}{r.note}")
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
