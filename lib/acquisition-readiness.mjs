import {triageInquiry} from './inquiry-triage.mjs';
import {propertyEvidence} from './property-evidence.mjs';
// Advisory operational readiness, not an investment recommendation or independent title verification.
export function acquisitionReadiness(inquiry,records=[],opportunities=[]){
 const intake=triageInquiry(inquiry);
 const evidence=propertyEvidence(inquiry,records);
 const opportunity=opportunities.find(o=>o.linkType==='inquiry'&&o.linkId===inquiry?.id);
 if(inquiry?.kind!=='seller')return null;
 const blockers=[];
 if(intake.priority==='Needs details')blockers.push('Complete seller intake');
 if(evidence?.status!=='Verification recorded')blockers.push(...(evidence?.missing||['Property research']));
 if(!opportunity)blockers.push('Create Operations opportunity');
 else{
  if(!opportunity.responsible)blockers.push('Assign opportunity owner');
  if(!opportunity.nextAction||!opportunity.nextDate)blockers.push('Set next action and date');
 }
 const ready=intake.priority==='Review first'&&evidence?.status==='Verification recorded'&&Boolean(opportunity)&&Boolean(opportunity.responsible)&&Boolean(opportunity.nextAction)&&Boolean(opportunity.nextDate);
 return {status:ready?'Ready for underwriting review':'Action required',blockers,stage:opportunity?.stage||'Not tracked',next:ready?'Review supporting evidence and financing assumptions before any offer.':blockers[0]||'Review opportunity.'};
}
