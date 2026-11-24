import {neon} from '@neondatabase/serverless';
import {scoreVerification,crossReview} from '../verification.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 // Deployment must have Vercel authentication protecting every route.
 if(process.env.V21_ENABLED!=='true')return res.status(503).json({error:'V2.1 disabled pending deployment protection'});
 try{
 const sql=neon(process.env.DATABASE_URL);
 if(req.method==='GET'){
 const projects=await sql`select p.slug,p.name,coalesce(i.instructions,'') instructions from command_projects p left join command_instructions_v21 i on i.project_slug=p.slug order by p.name`;
 const sessions=await sql`select id,project_slug,verification,created_at from command_sessions_v2 order by created_at desc limit 100`;
 const memory=await sql`select project_slug,note from command_memory_v2 order by created_at desc limit 100`;
 const scores=await sql`select session_id,score,evidence,created_at from command_verification_v21 order by created_at desc limit 100`;
 return res.json({projects,sessions,memory,scores});
 }
 if(req.method!=='POST')return res.status(405).end();
 if(req.headers.origin!=='https://'+req.headers.host)return res.status(403).end();
 const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
 if(b.action==='instructions'&&typeof b.instructions==='string'&&b.instructions.length<=12000){
 await sql`insert into command_instructions_v21(project_slug,instructions) values(${b.project},${b.instructions}) on conflict(project_slug) do update set instructions=excluded.instructions,updated_at=now()`;
 return res.json({saved:true});
 }
 if(b.action==='score'){
 const result=scoreVerification(b.evidence);
 await sql`insert into command_verification_v21(session_id,evidence,score) values(${b.session},${JSON.stringify(result)}::jsonb,${result.score})`;
 return res.json(result);
 }
 if(b.action==='review'){
 const rows=await sql`select instructions from command_instructions_v21 where project_slug=${b.project}`;
 return res.json({prompt:crossReview(b.task,b.responses,rows[0]?.instructions||'')});
 }
 return res.status(400).json({error:'Invalid action'});
 }catch{return res.status(400).json({error:'Request failed; check input and database configuration'});}
}
