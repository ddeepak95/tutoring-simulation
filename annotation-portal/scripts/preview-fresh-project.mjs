import fs from 'node:fs';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
const credentials=JSON.parse(fs.readFileSync('.runtime/new-project/credentials.json','utf8'));
if(credentials.project!=='ersdkjgyixcgqwjwmosc')throw Error('Unexpected preview project.');
process.env.VITE_SUPABASE_URL=credentials.url;process.env.SUPABASE_URL=credentials.url;
process.env.VITE_SUPABASE_PUBLISHABLE_KEY=credentials.publicKey;process.env.SUPABASE_PUBLISHABLE_KEY=credentials.publicKey;process.env.SUPABASE_SERVICE_ROLE_KEY=credentials.secretKey;
const {createServer}=await import('vite');
const server=await createServer({server:{host:'127.0.0.1',port:5174,strictPort:true}});
await server.listen();console.log('New-project verification portal: http://127.0.0.1:5174');
