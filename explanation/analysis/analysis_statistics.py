"""Exact within-topic rank and paired permutation tests, with Holm correction."""
import itertools


def omnibus(blocks):
    ranks = [[2 * sum(other < value for other in block)
              + sum(other == value for other in block) + 1 for value in block]
             for block in blocks]
    def statistic(values):
        return sum(sum(block[j] for block in values) ** 2 for j in range(3))
    observed = statistic(ranks)
    extreme = total = 0
    for permuted in itertools.product(*(list(itertools.permutations(block)) for block in ranks)):
        total += 1
        extreme += statistic(permuted) >= observed
    return extreme / total


def paired(blocks, a, b):
    differences = [block[a] - block[b] for block in blocks]
    observed = abs(sum(differences))
    extreme = total = 0
    for signs in itertools.product([-1, 1], repeat=len(blocks)):
        total += 1
        extreme += abs(sum(sign * value for sign, value in zip(signs, differences))) >= observed - 1e-12
    return extreme / total


def holm(values):
    adjusted = [0.0] * len(values)
    previous = 0.0
    for position, index in enumerate(sorted(range(len(values)), key=values.__getitem__)):
        previous = max(previous, min(1.0, (len(values) - position) * values[index]))
        adjusted[index] = previous
    return adjusted
