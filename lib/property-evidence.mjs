// Reports only evidence recorded in the Lead Desk; does not independently verify property facts.
export function propertyEvidence(inquiry,records=[]){
 if(inquiry?.kind!=='seller')return null;
 const record=records.find(r=>r.inquiryId===inquiry.id||r.id==='inquiry:'+inquiry.id);
 if(!record)return {status:'Not linked',detail:'No matching Lead Desk property record.',next:'Review CRM link recovery.',missing:['CRM property link']};
 const labels={ownership:'ownership',authority:'seller authority',status:'property status',mail:'mailing address'};
 const checks=Object.entries(labels).filter(([key])=>record.checks?.[key]===true).map(([,label])=>label);
 const missing=Object.entries(labels).filter(([key])=>record.checks?.[key]!==true).map(([,label])=>label);
 const hasDate=typeof record.verifiedAt==='string'&&record.verifiedAt.trim().length>0;
 const complete=checks.length===4&&hasDate;
 if(!hasDate)missing.push('verification date');
 return {missing,status:complete?'Verification recorded':checks.length||hasDate?'Partially reviewed':'Research pending',detail:checks.length+' of 4 Lead Desk checks marked complete'+(hasDate?'; verification date recorded':'')+'.',next:complete?'Review recorded evidence and proceed to underwriting if appropriate.':'Open Lead Desk to verify ownership, authority, status, and mailing address.'};
}
