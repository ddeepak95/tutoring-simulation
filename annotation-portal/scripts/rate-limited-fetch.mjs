/** Bound jobs separately from request pacing: validation repairs share the same limiter. */
export async function runConcurrent(items, concurrency, task) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 5) throw Error('Concurrency must be an integer from 1 to 5.');
  let next = 0;
  const errors = [];
  await Promise.all(Array.from({length:Math.min(concurrency,items.length)}, async () => {
    while (next < items.length) {
      const index = next++;
      try { await task(items[index],index); } catch (error) { errors.push(error); }
    }
  }));
  if (errors.length) throw new AggregateError(errors, `${errors.length} job(s) failed; completed jobs were retained. First error: ${errors[0].message}`);
}

export function createRateLimitedFetch({fetcher=fetch,minIntervalMs=2000,maxRetries=4,
  now=Date.now,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms)),random=Math.random,onRetry=()=>{}} = {}) {
  if (!Number.isFinite(minIntervalMs) || minIntervalMs < 0) throw Error('Request interval must be nonnegative.');
  let nextStart = 0, cooldownUntil = 0, queue = Promise.resolve();
  async function pace(signal, send) {
    const previous = queue;
    let release;
    queue = new Promise(resolve=>{release=resolve;});
    await previous;
    try {
      for (;;) {
        signal?.throwIfAborted();
        const delay = Math.max(nextStart,cooldownUntil)-now();
        if (delay <= 0) break;
        // Recheck the shared cooldown after waking: another worker may have hit 429.
        await sleep(Math.min(delay,1000));
      }
      nextStart = now()+minIntervalMs;
      return send();
    } finally { release(); }
  }
  return async (input,init) => {
    for (let attempt=0;;attempt++) {
      let response;
      try {response = await pace(init?.signal,()=>fetcher(input,init));}
      catch(error){
        if(init?.signal?.aborted || attempt>=maxRetries || !['TypeError','TimeoutError'].includes(error.name))throw error;
        const delay=Math.min(60000,2000*2**attempt)+Math.floor(random()*1000);
        cooldownUntil=Math.max(cooldownUntil,now()+delay);
        onRetry({status:'network',retry:attempt+1,delay_ms:delay});
        continue;
      }
      if (![429,500,502,503,504].includes(response.status) || attempt >= maxRetries) return response;
      const header = response.headers.get('retry-after');
      const retryAfter = header === null ? 0 : /^\d+(?:\.\d+)?$/.test(header.trim())
        ? Number(header)*1000 : Math.max(0,Date.parse(header)-now())||0;
      const delay = Math.max(retryAfter,Math.min(60000,2000*2**attempt)+Math.floor(random()*1000));
      cooldownUntil = Math.max(cooldownUntil,now()+delay);
      await response.body?.cancel();
      onRetry({status:response.status,retry:attempt+1,delay_ms:delay});
    }
  };
}
