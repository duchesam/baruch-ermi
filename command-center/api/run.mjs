import {neon} from '@neondatabase/serverless';
import {collaborate,gatewayCaller} from '../engine.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).end();
 if(req.headers['sec-fetch-site']!=='same-origin')return res.status(403).json({error:'Same-origin request required'});
 let stage='database';
 try{
 const sql=neon(process.env.DATABASE_URL);
 const task=req.body?.task;
 if(typeof task!=='string'||!task.trim()||Buffer.byteLength(task)>8000)return res.status(400).json({error:'Invalid task'});
 const live=false; // Paid testing paused pending credit purchase.
 const project=req.body?.project||'general';
 if(typeof project!=='string'||project.length>80)return res.status(400).json({error:'Invalid project'});
 const projects=await sql`SELECT slug FROM command_projects WHERE slug=${project}`;if(!projects.length)return res.status(400).json({error:'Unknown project'});
 stage='gateway-auth';
 const token=process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN;
 if(live&&!token)throw Error('Missing gateway credential');
 const call=live?gatewayCaller({key:token,enabled:true,reserve:async amount=>{stage='budget';const rows=await sql`UPDATE command_budget SET reserved=reserved+${amount} WHERE id=1 AND reserved+${amount}<=4500000 RETURNING reserved`;if(!rows.length)throw Error('Budget exhausted');stage='gateway-request';}}):async(model)=>'Offline demonstration: '+model+' (no AI request)';
 const result=await collaborate(task,call);
 if(!live)result.status='offline-demo';
 stage='persist';
 await sql`INSERT INTO command_runs(task,draft,review,final,status,project_slug) VALUES(${task},${result.draft},${result.review},${result.final},${result.status},${project})`;
 return res.json(result);
 }catch(e){const reason=e.message==='Missing gateway credential'?'missing-credential':e.message==='Budget exhausted'?'budget-exhausted':/^Gateway request failed: [0-9]{3}$/.test(e.message)?e.message:'operation-failed';console.error(JSON.stringify({stage,reason}));return res.status(503).json({error:reason,stage});}
}
