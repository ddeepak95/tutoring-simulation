import {expect,it} from 'vitest';
import {rankWithTies,friedmanStatistic,friedmanPermutation,exactPairedDifference} from '../scripts/html-rating-statistics.mjs';

it('uses average ranks and applies the Friedman tie correction',()=>{
 expect(rankWithTies([3,1,1])).toEqual({ranks:[3,1.5,1.5],ties:6});
 const perfect=friedmanStatistic([[1,2,3],[2,3,4],[3,4,5]]);
 expect(perfect.statistic).toBeCloseTo(6);expect(perfect.kendall_w).toBeCloseTo(1);
 const tied=friedmanStatistic([[1,1,3],[2,2,4],[3,3,5]]);
 expect(tied.statistic).toBeCloseTo(6);expect(tied.kendall_w).toBeCloseTo(1);
 expect(tied.tie_correction).toBeCloseTo(.75);
});
it('agrees with the known 6/216 permutation tail for three perfectly ordered blocks',()=>{
 const result=friedmanPermutation([[1,2,3],[2,3,4],[3,4,5]],{resamples:19999,seed:'known-exact-null'});
 expect(result.p).toBeGreaterThan(.02);expect(result.p).toBeLessThan(.04);
 expect(result).toEqual(friedmanPermutation([[1,2,3],[2,3,4],[3,4,5]],{resamples:19999,seed:'known-exact-null'}));
});
it('does not mistake a topic-only effect for a language effect',()=>{
 const result=friedmanPermutation([[1,1,1],[3,3,3],[5,5,5]],{resamples:99});
 expect(result.p).toBe(1);expect(result.statistic).toBe(0);expect(result.kendall_w).toBe(0);
});
it('enumerates all 32 paired swaps and exposes the five-topic significance limit',()=>{
 const positive=exactPairedDifference([1,1,1,1,1],[2,2,2,2,2]);
 expect(positive.difference).toBe(1);expect(positive.permutations).toBe(32);expect(positive.p).toBe(.0625);
 expect(exactPairedDifference([2,2,2,2,2],[1,1,1,1,1]).p).toBe(positive.p);
 expect(exactPairedDifference([1,2,3,4,5],[1,2,3,4,5]).p).toBe(1);
 expect(()=>friedmanStatistic([[1,2],[3,NaN]])).toThrow(/finite/);
});
