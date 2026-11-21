import {readOperations,changeOperations} from './operations.mjs';
// Safe to retry: deterministic request ID, existing-link check, optimistic revision retry.
export async function ensureInquiryOpportunity(inquiry){
 if(!inquiry?.id)throw Error('Inquiry ID required');
 for(let attempt=0;attempt<5;attempt++){
  const state=await readOperations();
  const existing=state.opportunities.find(o=>o.linkType==='inquiry'&&o.linkId===inquiry.id);
  if(existing)return {id:existing.id,created:false};
  try{
   const next=await changeOperations({revision:state.revision,command:{type:'opportunity.create',requestId:'auto-inquiry-'+inquiry.id,payload:{linkType:'inquiry',linkId:inquiry.id,nextAction:'Review inquiry and contact the sender'}}},'Website intake automation');
   const opportunity=next.opportunities.find(o=>o.linkType==='inquiry'&&o.linkId===inquiry.id);
   if(!opportunity)throw Error('Opportunity not present after creation');
   return {id:opportunity.id,created:true};
  }catch(e){if(e.status!==409&&!(e.status===400&&/already has an opportunity/i.test(e.message)))throw e;}
 }
 throw Object.assign(new Error('Operations busy; retry inquiry reconciliation.'),{status:409});
}

// An undated review task avoids inventing deadlines or sending messages without consent.
export async function ensureInquiryFollowup(inquiry){
 const opportunity=await ensureInquiryOpportunity(inquiry);
 const title='Review website inquiry and contact sender';
 for(let attempt=0;attempt<5;attempt++){
  const state=await readOperations();
  const existing=state.tasks.find(t=>t.opportunityId===opportunity.id&&t.title===title);
  if(existing)return {opportunityId:opportunity.id,taskId:existing.id,created:false};
  try{
   const next=await changeOperations({revision:state.revision,command:{type:'task.create',requestId:'auto-followup-'+inquiry.id,payload:{opportunityId:opportunity.id,title,due:''}}},'Website intake automation');
   const task=next.tasks.find(t=>t.opportunityId===opportunity.id&&t.title===title);
   if(!task)throw Error('Follow-up task not present after creation');
   return {opportunityId:opportunity.id,taskId:task.id,created:true};
  }catch(e){if(e.status!==409)throw e;}
 }
 throw Object.assign(new Error('Operations busy; retry follow-up reconciliation.'),{status:409});
}
