import {expect,it} from 'vitest';
import {checkpointWriter} from '../scripts/checkpoint-file.mjs';

it('retries Windows sharing failures and serializes snapshots without replacing a valid file early',async()=>{
 const files=new Map<string,string>([['job.json','old']]);const delays:number[]=[];let attempts=0;
 const io={writeFile:async(file:string,value:string)=>{files.set(file,value);},
  rename:async(from:string,to:string)=>{attempts++;if(attempts<3){expect(files.get(to)).toBe('old');throw Object.assign(Error('busy'),{code:'EPERM'});}files.set(to,files.get(from)!);files.delete(from);},
  unlink:async(file:string)=>{files.delete(file);}};
 const write=checkpointWriter('job.json',{io,sleep:async(ms:number)=>{delays.push(ms);}});
 await Promise.all([write({revision:1}),write({revision:2})]);
 expect(JSON.parse(files.get('job.json')!)).toEqual({revision:2});
 expect(delays).toEqual([50,100]);expect(files.size).toBe(1);
});

it('preserves the prior checkpoint and removes temporary files after bounded permanent failures',async()=>{
 const files=new Map<string,string>([['job.json','old']]);let attempts=0;
 const write=checkpointWriter('job.json',{io:{writeFile:async(file:string,value:string)=>{files.set(file,value);},
  rename:async()=>{attempts++;throw Object.assign(Error('busy'),{code:'EBUSY'});},unlink:async(file:string)=>{files.delete(file);}},sleep:async()=>{}});
 await expect(write({revision:1})).rejects.toThrow('busy');
 expect(attempts).toBe(6);expect([...files]).toEqual([['job.json','old']]);
});
