import {hash} from './html-sections.mjs';

export async function storeCapturePackage(pkg,{supabaseUrl,headers,userId,fetcher=fetch}){
 const bytes=Buffer.from(JSON.stringify(pkg));
 const reference={bucket:'conversation-packages',path:`packages/${userId}/${pkg.version_hash}.json`,sha256:hash(bytes),bytes:bytes.length,version_hash:pkg.version_hash,capture_id:pkg.capture_id};
 const url=`${supabaseUrl}/storage/v1/object/${reference.bucket}/${reference.path}`;
 const uploaded=await fetcher(url,{method:'POST',headers:{...headers,'Content-Type':'application/json','Cache-Control':'max-age=31536000'},body:bytes,signal:AbortSignal.timeout(30000)});
 if(!uploaded.ok&&!/Duplicate|already exists|ResourceAlreadyExists/i.test(await uploaded.text()))throw Error(`Package upload failed (HTTP ${uploaded.status}).`);
 const checked=await fetcher(url,{headers,signal:AbortSignal.timeout(30000)});
 const saved=Buffer.from(await checked.arrayBuffer());
 if(!checked.ok||saved.length!==bytes.length||hash(saved)!==reference.sha256)throw Error('Saved package failed byte/hash verification. Database rows were not changed.');
 return reference;
}
