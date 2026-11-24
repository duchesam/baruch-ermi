import {neon} from '@neondatabase/serverless';
import {collaborate,gatewayCaller} from '../engine.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).end();
 if(req.headers['sec-fetch-site']!=='same-origin')return res.status(403).json({error:'Same-origin request required'});
 try{
 const sql=neon(process.env.DATABASE_URL);
 const task=req.body?.task;
 if(typeof task!=='string'||!task.trim()||Buffer.byteLength(task)>8000)return res.status(400).json({error:'Invalid task'});
 const live=process.env.COMMAND_LIVE==='true';
 const call=live?gatewayCaller({key:process.env.VERCEL_OIDC_TOKEN,enabled:true,reserve:async amount=>{const rows=await sql`UPDATE command_budget SET reserved=reserved+${amount} WHERE id=1 AND reserved+${amount}<=4500000 RETURNING reserved`;if(!rows.length)throw Error('Budget exhausted');}}):async(model)=>'Offline demonstration: '+model+' (no AI request)';
 const result=await collaborate(task,call);
 if(!live)result.status='offline-demo';
 await sql`INSERT INTO command_runs(task,draft,review,final,status) VALUES(${task},${result.draft},${result.review},${result.final},${result.status})`;
 return res.json(result);
 }catch(e){return res.status(503).json({error:'Request failed; check server configuration and budget.'});}
}
