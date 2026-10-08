import { afterEach, describe, expect, it, vi } from 'vitest';
import { SaveQueue } from '../src/save-queue';
import type { Annotation } from '../src/types';
const draft = (id: string) => [{ id, feature: 'examples', entry: {}, evidence: [] }] as Annotation[];
afterEach(() => vi.useRealTimers());
describe('cloud save serialization', () => {
  it('does not report Saved while a newer edit is still pending', async () => {
    vi.useFakeTimers(); const states: string[] = []; const calls: [string, number][] = []; let release!: (revision: number) => void;
    const queue = new SaveQueue(0, (annotations, revision) => { calls.push([annotations[0].id, revision]); return calls.length === 1 ? new Promise(resolve => { release = resolve; }) : Promise.resolve(revision + 1); }, state => states.push(state), () => {});
    queue.enqueue(draft('first')); const saving = queue.flush(); queue.enqueue(draft('newer')); release(1); await saving;
    expect(calls).toEqual([['first', 0], ['newer', 1]]); expect(queue.revision).toBe(2); expect(queue.dirty).toBe(false);
    expect(states.filter(state => state === 'saved')).toHaveLength(1); queue.dispose();
  });
  it('retains the newest draft and original revision when saving fails', async () => {
    vi.useFakeTimers(); let reject!: (reason: Error) => void; const cached: unknown[] = []; const states: string[] = [];
    const queue = new SaveQueue(5, () => new Promise((_resolve, fail) => { reject = fail; }), state => states.push(state), (next, revision) => cached.push([next, revision]));
    queue.enqueue(draft('old')); const saving = queue.flush(); queue.enqueue(draft('new')); reject(new Error('Revision conflict'));
    await expect(saving).rejects.toThrow(/conflict/); expect(queue.revision).toBe(5); expect(queue.dirty).toBe(true); expect(cached.at(-1)).toEqual([draft('new'), 5]); expect(states.at(-1)).toBe('error'); queue.dispose();
  });
  it('retries a failed save without dropping the pending draft', async () => {
    vi.useFakeTimers(); const transport = vi.fn().mockRejectedValueOnce(new Error('Network offline')).mockResolvedValueOnce(3);
    const queue = new SaveQueue(2, transport, () => {}, () => {}); queue.enqueue(draft('a'));
    await expect(queue.flush()).rejects.toThrow(/offline/); await queue.flush();
    expect(transport).toHaveBeenLastCalledWith(draft('a'), 2); expect(queue.revision).toBe(3); expect(queue.dirty).toBe(false); queue.dispose();
  });
  it('keeps retry available when an annotator continues editing after a failure', async () => {
    vi.useFakeTimers(); const states: string[] = [];
    const transport = vi.fn().mockRejectedValueOnce(new Error('Offline')).mockResolvedValueOnce(1);
    const queue = new SaveQueue(0, transport, state => states.push(state), () => {});
    queue.enqueue(draft('a')); await expect(queue.flush()).rejects.toThrow(); queue.enqueue(draft('latest'));
    expect(states.at(-1)).toBe('error'); await queue.flush();
    expect(transport).toHaveBeenLastCalledWith(draft('latest'), 0); queue.dispose();
  });
});
