import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {database} from '../../lib/db.mjs';
import {validateInquiry,fingerprint} from '../../lib/inquiries.mjs';
import {randomUUID,addInquiryProperty} from '../../lib/workspace.mjs';
import {createHmac} from 'node:crypto';
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{
 if(req.method==='GET'){await requireOwner(req);const {rows}=await database().query('SELECT id,kind,created_at,data FROM inquiries ORDER BY created_at DESC');return res.json(rows.map(r=>({...r,data:JSON.parse(r.data)})));}
 if(req.method!=='POST')return res.status(405).end();requireOrigin(req);const {kind,data}=validateInquiry(req.body);const db=database();
 const secret=process.env.BETTER_AUTH_SECRET;if(!secret)throw Object.assign(new Error('Configuration required'),{status:503});
 const bucket=Math.floor(Date.now()/600000);const id=createHmac('sha256',secret).update(data.email+':'+bucket).digest('hex');
 await db.query('INSERT INTO request_limits (id,count,expires_at) VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET count=request_limits.count+1',[id,1,(bucket+1)*600000]);const limit=await db.query('SELECT count FROM request_limits WHERE id=?',[id]);if(limit.rows[0].count>5)throw Object.assign(new Error('Too many requests. Please try later or contact us directly.'),{status:429});
 const dedupe=fingerprint(kind,data),newId=randomUUID(),at=new Date().toISOString();await db.query('INSERT INTO inquiries (id,dedupe,kind,created_at,data) VALUES (?,?,?,?,?) ON CONFLICT(dedupe) DO NOTHING',[newId,dedupe,kind,at,JSON.stringify(data)]);
 const {rows}=await db.query('SELECT id,kind,created_at,data FROM inquiries WHERE dedupe=?',[dedupe]);const inquiry={...rows[0],data:JSON.parse(rows[0].data)};await addInquiryProperty(inquiry);
 return res.status(201).json({id:inquiry.id,message:'Your inquiry has been saved. Our team can review it in the company workspace.'});
 }catch(e){apiError(res,e);}}
