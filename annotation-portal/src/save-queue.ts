import type { Annotation } from './types';
export type SaveState = 'saved' | 'saving' | 'pending' | 'error';
/** Serializes writes, keeps the newest draft on failure, and rejects stale revisions. */
export class SaveQueue<T = Annotation[]> {
  revision: number;
  private pending: T | null = null;
  private flight: Promise<void> | null = null;
  private timer?: ReturnType<typeof setTimeout>;
  error: string | null = null;
  constructor(revision: number, private transport: (annotations: T, revision: number) => Promise<number>, private changed: (state: SaveState, message?: string) => void, private cache: (draft: T | null, revision: number) => void) { this.revision = revision; }
  enqueue(annotations: T) {
    this.pending = structuredClone(annotations); this.cache(this.pending, this.revision);
    this.changed(this.error ? 'error' : 'pending', this.error || undefined); clearTimeout(this.timer);
    // A failed write waits for an explicit retry; never hide a conflict by retrying.
    if (!this.error) this.timer = setTimeout(() => { void this.flush().catch(() => {}); }, 500);
  }
  get dirty() { return this.pending !== null || this.flight !== null; }
  async flush() {
    clearTimeout(this.timer); this.error = null;
    while (this.dirty) {
      if (this.flight) { await this.flight; continue; }
      const batch = this.pending!; this.pending = null; this.changed('saving');
      const operation = (async () => {
        try {
          this.revision = await this.transport(batch, this.revision);
          this.cache(this.pending, this.revision); this.changed(this.pending ? 'pending' : 'saved');
        } catch (error) {
          this.pending ??= batch; this.error = error instanceof Error ? error.message : String(error);
          this.cache(this.pending, this.revision); this.changed('error', this.error); throw error;
        }
      })();
      this.flight = operation;
      try { await operation; } finally { this.flight = null; }
    }
  }
  dispose() { clearTimeout(this.timer); }
}
