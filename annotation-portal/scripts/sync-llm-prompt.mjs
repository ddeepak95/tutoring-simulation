import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

export function syncLLMPrompt() {
 const portal=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
 const imageText=fs.readFileSync(path.resolve(portal,'../conversation-evaluation/prompts/turn-image-counts.md'),'utf8').trim();
 fs.mkdirSync(path.join(portal,'server/generated'),{recursive:true});
 fs.writeFileSync(path.join(portal,'server/generated/turn-image-prompt.ts'),'// Generated from conversation-evaluation/prompts/turn-image-counts.md.\nexport const turnImagePromptText = '+JSON.stringify(imageText)+';\n');
 const source='conversation-evaluation/prompts/instructional-features.md';
 const document=fs.readFileSync(path.resolve(portal,'..',source),'utf8');
 const parsed=document.match(/^---\r?\nprompt_version:\s*([^\r\n]+)\r?\n---\r?\n\s*## Annotation prompt\r?\n([\s\S]*?)\r?\n## Review prompt\r?\n([\s\S]*?)\r?\n## Validation repair prompt\r?\n([\s\S]*)$/);
 if(!parsed)throw new Error('Expected prompt_version metadata, Annotation prompt, Review prompt, and Validation repair prompt in instructional-features.md.');
 const version=parsed[1].trim(),prompt=parsed[2].trim(),review=parsed[3].trim(),repair=parsed[4].trim();
 if(!version || !prompt || !review || !repair || repair.split('{{validation_error}}').length!==2)throw new Error('Provide all three prompts and exactly one {{validation_error}} placeholder in the repair prompt.');
 const snapshot={instructionalPromptText:prompt,instructionalReviewPrompt:review,instructionalRepairPrompt:repair,instructionalPromptVersion:version,instructionalPromptSource:source,instructionalPromptSha256:crypto.createHash('sha256').update(document).digest('hex')};
 const out=path.join(portal,'server/generated');fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'instructional-prompt.ts'),`// Generated from ${source}; edit the Markdown source and run npm run sync:prompt.\n`+Object.entries(snapshot).map(([name,value])=>`export const ${name} = ${JSON.stringify(value)};`).join('\n')+'\n');
 return {source,version};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(syncLLMPrompt()));
