"""Topic-stratified mean contrasts using Welch–Satterthwaite t inference."""
import math
import numpy as np
from scipy import stats


def holm(values):
    ordered = sorted((float(value), index) for index, value in enumerate(values) if value is not None)
    result = [None] * len(values)
    previous = 0.0
    for rank, (value, index) in enumerate(ordered):
        previous = max(previous, min(1.0, value * (len(ordered) - rank)))
        result[index] = previous
    return result


def _estimate(blocks, paired):
    if not blocks:
        return dict(difference=None, se=None, df=None, difference_p=None, ci90=None, ci95=None,
                    left_mean=None, right_mean=None, n_left=0, n_right=0, topics=0,
                    unavailable_reason="No topic with at least two observations on each side")
    components = []
    effects, left_means, right_means = [], [], []
    all_deltas = []
    for left, right in blocks:
        left, right = np.asarray(left, dtype=float), np.asarray(right, dtype=float)
        if len(left) < 2 or len(right) < 2 or not np.isfinite(left).all() or not np.isfinite(right).all():
            raise ValueError("Each included topic needs at least two finite observations per side")
        if paired and len(left) != len(right):
            raise ValueError("Paired arrays must have the same length")
        left_means.append(float(left.mean()))
        right_means.append(float(right.mean()))
        effects.append(float(right.mean() - left.mean()))
        if paired:
            deltas = right - left
            all_deltas.extend(deltas.tolist())
            components.append((float(np.var(deltas, ddof=1) / len(deltas)), len(deltas) - 1))
        else:
            components.extend([(float(np.var(left, ddof=1) / len(left)), len(left) - 1),
                               (float(np.var(right, ddof=1) / len(right)), len(right) - 1)])
    count = len(blocks)
    variance = sum(value for value, _ in components) / count**2
    effect = float(np.mean(effects))
    result = dict(difference=effect, se=math.sqrt(variance), df=None, difference_p=None, ci90=None, ci95=None,
                  left_mean=float(np.mean(left_means)), right_mean=float(np.mean(right_means)),
                  n_left=sum(len(left) for left, _ in blocks), n_right=sum(len(right) for _, right in blocks),
                  topics=count, unavailable_reason=None)
    if paired:
        result.update(mae=float(np.mean(np.abs(all_deltas))),
                      rmse=float(np.sqrt(np.mean(np.square(all_deltas)))),
                      median_change=float(np.median(all_deltas)))
    if variance <= 1e-24:
        result["unavailable_reason"] = "Zero estimated sampling variance; t inference unavailable"
        return result
    total = sum(value for value, _ in components)
    df = total**2 / sum(value**2 / degrees for value, degrees in components)
    se = result["se"]
    result.update(df=float(df), difference_p=float(2 * stats.t.sf(abs(effect / se), df)))
    for level, key in [(0.90, "ci90"), (0.95, "ci95")]:
        half = float(stats.t.ppf((1 + level) / 2, df) * se)
        result[key] = [effect - half, effect + half]
    return result


def paired_estimate(blocks):
    """Right minus left, preserving source/translation pairing within topic."""
    return _estimate(blocks, paired=True)


def independent_estimate(blocks):
    """Right minus left, treating original-English and translated runs independently."""
    return _estimate(blocks, paired=False)


def tost(estimate, margin):
    if not math.isfinite(margin) or margin <= 0:
        raise ValueError("Equivalence margin must be positive")
    if estimate["df"] is None:
        return dict(margin=margin, lower_p=None, upper_p=None, p=None)
    difference, se, degrees = estimate["difference"], estimate["se"], estimate["df"]
    lower = float(stats.t.sf((difference + margin) / se, degrees))
    upper = float(stats.t.cdf((difference - margin) / se, degrees))
    return dict(margin=margin, lower_p=lower, upper_p=upper, p=max(lower, upper))
