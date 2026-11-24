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
 let result;
 const mode=req.body?.mode||'offline';
 if(mode==='gemini'){
 stage='gemini-request';
 if(!process.env.GEMINI_API_KEY)return res.status(503).json({error:'Gemini credential missing'});
 const catalog=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=100',{headers:{'x-goog-api-key':process.env.GEMINI_API_KEY},signal:AbortSignal.timeout(10000)});
 if(!catalog.ok)return res.status(503).json({error:'Gemini model discovery failed',httpStatus:catalog.status});
 const available=(await catalog.json()).models||[];
 const allowed=['gemini-3.1-flash-lite','gemini-3-flash-preview'];
 const candidates=allowed.filter(id=>available.some(m=>m.name==='models/'+id&&m.supportedGenerationMethods?.includes('generateContent')));
 if(!candidates.length)return res.status(503).json({error:'No approved Flash model available'});
 let response,model;const attempts=[];
 for(const id of candidates.slice(0,2)){
 model=id;
 try{response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify({contents:[{parts:[{text:task}]}],generationConfig:{maxOutputTokens:2048}}),signal:AbortSignal.timeout(15000)});}catch{return res.status(503).json({error:'Gemini network timeout or failure',model,attempts});}
 if(response.ok)break;
 let code='UNKNOWN';try{const j=await response.json();if(/^[A-Z_]{1,50}$/.test(j.error?.status||''))code=j.error.status;}catch{}
 attempts.push({model,httpStatus:response.status,code});
 console.error(JSON.stringify({stage:'gemini-generation',model,httpStatus:response.status,code}));
 if(![404,503].includes(response.status))break;
 }
 if(!response?.ok)return res.status(503).json({error:'Gemini generation unavailable',attempts});
 const data=await response.json();const answer=data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('');
 if(!answer)return res.status(503).json({error:'Gemini returned no text'});
 result={draft:answer,review:'Not independently reviewed',final:answer,status:'gemini-only',model};
 }else if(mode==='offline'){result=await collaborate(task,call);result.status='offline-demo';}else{return res.status(400).json({error:'Mode unavailable'});}
 stage='persist';
 await sql`INSERT INTO command_runs(task,draft,review,final,status,project_slug) VALUES(${task},${result.draft},${result.review},${result.final},${result.status},${project})`;
 return res.json(result);
 }catch(e){const reason=e.message==='Missing gateway credential'?'missing-credential':e.message==='Budget exhausted'?'budget-exhausted':/^Gateway request failed: [0-9]{3}$/.test(e.message)?e.message:'operation-failed';console.error(JSON.stringify({stage,reason}));return res.status(503).json({error:reason,stage});}
}
