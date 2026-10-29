import fs from 'node:fs/promises';
import {randomUUID} from 'node:crypto';

/** Serialize snapshots and retain the previous checkpoint until atomic replacement succeeds. */
export function checkpointWriter(file,{io=fs,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}) {
 let queue=Promise.resolve();
 return value=>{
  const contents=JSON.stringify(value,null,2)+'\n';
  queue=queue.catch(()=>{}).then(async()=>{
   const temporary=file+'.tmp-'+randomUUID();
   await io.writeFile(temporary,contents,{mode:0o600});
   try {
    for(let attempt=0;;attempt++){
     try {await io.rename(temporary,file);break;}
     catch(error){
      if(!['EPERM','EACCES','EBUSY'].includes(error.code)||attempt>=5)throw error;
      await sleep(50*2**attempt);
     }
    }
   } finally {await io.unlink(temporary).catch(()=>{});}
  });
  return queue;
 };
}
