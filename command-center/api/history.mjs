import {neon} from '@neondatabase/serverless';
export default async function handler(req,res){
res.setHeader('Cache-Control','no-store');
if(req.method!=='GET')return res.status(405).end();
if(req.headers['sec-fetch-site']!=='same-origin')return res.status(403).json({error:'Same-origin request required'});
try{const sql=neon(process.env.DATABASE_URL);const rows=await sql`SELECT id,created_at,task,draft,review,final,status FROM command_runs ORDER BY created_at DESC LIMIT 25`;return res.json({runs:rows});}catch{return res.status(503).json({error:'History unavailable'});}
}