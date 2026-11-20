import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {database} from '../../lib/db.mjs';
import {readWorkspace,addInquiryProperty} from '../../lib/workspace.mjs';
import {missingPropertyInquiries} from '../../lib/inquiry-recovery.mjs';

export default async function handler(req,res){
 res.setHeader('Cache-Control','private, no-store');
 try{
  await requireOwner(req);
  if(req.method!=='GET'&&req.method!=='POST')return res.status(405).end();
  if(req.method==='POST')requireOrigin(req);
  const {rows}=await database().query('SELECT id,kind,created_at,data FROM inquiries ORDER BY created_at DESC');
  const inquiries=rows.map(r=>({...r,data:typeof r.data==='string'?JSON.parse(r.data):r.data}));
  const workspace=await readWorkspace();
  const missing=missingPropertyInquiries(inquiries,workspace.records);
  if(req.method==='GET')return res.json({missingCount:missing.length,missing:missing.map(({id,kind,created_at,data})=>({id,kind,created_at,address:data.address,city:data.city}))});
  const requested=req.body?.ids;
  if(!Array.isArray(requested)||!requested.length||requested.length>25||requested.some(id=>typeof id!=='string'))return res.status(400).json({error:'Select 1–25 inquiry IDs to retry.'});
  const selected=missing.filter(i=>requested.includes(i.id));
  const results=[];
  for(const inquiry of selected){
   try{await addInquiryProperty(inquiry);results.push({id:inquiry.id,status:'linked'});}
   catch(error){console.error('CRM recovery failed',{inquiryId:inquiry.id,error});results.push({id:inquiry.id,status:'failed'});}
  }
  return res.json({results,skipped:requested.filter(id=>!selected.some(i=>i.id===id))});
 }catch(error){apiError(res,error);}
}
