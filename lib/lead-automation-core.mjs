const safeText=(value,max=1000)=>typeof value==='string'?value.trim().slice(0,max):'';
const truthySignal=(record,pattern)=>(record?.signals||[]).some(signal=>pattern.test(String(signal?.name||signal?.type||signal)));
const uniqueSources=(caseRecord,property)=>new Set([...(caseRecord.sources||[]),...(property?.sources||[]).map(source=>source.name||source.url)].filter(Boolean)).size;
const caseName=caseRecord=>caseRecord.parties?.find(p=>/decedent|deceased/i.test(p.role))?.name||caseRecord.titles?.[0]||caseRecord.summaries?.[0]?.raw?.decedent||caseRecord.summaries?.[0]?.raw?.decendentName||caseRecord.summaries?.[0]?.raw?.decedentName||'Estate record';

export const LEAD_STATUSES=['Research required','Compliance review','Ready for mail approval','Approved for mail','Responded','Suppressed'];
export const emptyLeadAutomation=()=>({version:1,reviews:{}});

export function normalizeLeadAutomation(value){
 const input=value&&typeof value==='object'?value:{};
 return {version:1,reviews:input.reviews&&typeof input.reviews==='object'&&!Array.isArray(input.reviews)?structuredClone(input.reviews):{}};
}

export function scoreProbateCase(caseRecord,records,review={}){
 const linked=(caseRecord.links||[]).map(link=>records.find(record=>record.id===link.propertyId)).filter(Boolean);
 const property=linked[0]||null;
 const evidence=(caseRecord.evidence||[]).filter(item=>!property||item.propertyId===property.id);
 const ownership=Boolean(property?.checks?.ownership)&&evidence.some(item=>/ownership|owner/i.test(item.kind+' '+item.note));
 const link=property&&caseRecord.links?.find(item=>item.propertyId===property.id);
 const parcel=Boolean(property&&(property.parcel||property.address)&&link?.identityMatched===true&&link?.ownershipMatched===true&&property.checks?.ownership===true);
 const absentee=truthySignal(property,/absentee|mailing address/i);
 const tax=truthySignal(property,/tax|certificate|delinquen/i);
 const vacancy=truthySignal(property,/vacan/i);
 const condition=truthySignal(property,/code|repair|condition|violation/i);
 const corroborated=uniqueSources(caseRecord,property)>=2;
 const representative=review.representativeStatus==='verified';
 const rules=[
  ['Verified estate-to-owner match',25,ownership],['Verified property link',20,parcel],['Absentee mailing evidence',10,absentee],
  ['Tax-delinquency evidence',15,tax],['Vacancy evidence',10,vacancy],['Condition or code evidence',10,condition],
  ['Multiple corroborating sources',5,corroborated],['Verified estate representative',5,representative]
 ];
 return {score:rules.reduce((total,[,points,met])=>total+(met?points:0),0),rules:rules.map(([label,points,met])=>({label,points,met})),property};
}

export function deriveLead(caseRecord,records,review={}){
 const scored=scoreProbateCase(caseRecord,records,review);
 const suppressed=Boolean(review.suppressed||review.responseStatus==='do-not-contact');
 const complianceComplete=review.dncNational==='clear'&&review.dncFlorida==='clear'&&review.contactSource&&review.contactVerifiedAt;
 const mailReady=Boolean(scored.property&&review.representativeStatus==='verified'&&review.mailingAddressStatus==='verified');
 let status='Research required';
 if(suppressed)status='Suppressed';
 else if(review.responseStatus&&review.responseStatus!=='none')status='Responded';
 else if(review.mailApprovedAt)status='Approved for mail';
 else if(mailReady&&complianceComplete)status='Ready for mail approval';
 else if(mailReady)status='Compliance review';
 const band=scored.score>=80?'Immediate review':scored.score>=60?'High-priority research':scored.score>=40?'Nurture and monitor':'Hold for evidence';
 return {caseId:caseRecord.id,caseNumber:caseRecord.caseNumber,name:caseName(caseRecord),classification:caseRecord.classification,score:scored.score,band,status,propertyId:scored.property?.id||'',propertyLabel:parcelLabel(caseRecord,scored.property),propertyCandidate:Boolean(scored.property)&&!scored.rules.find(rule=>rule.label==='Verified property link')?.met,rules:scored.rules,review};
}

function parcelLabel(caseRecord,property){if(!property)return '';const link=caseRecord.links?.find(item=>item.propertyId===property.id);return link?.identityMatched===true&&link?.ownershipMatched===true&&property.checks?.ownership===true?(property.address||property.parcel):'';}

export function leadAutomationReport(cases,records,automation){
 const leads=cases.map(item=>deriveLead(item,records,automation.reviews[item.id]||{}));
 const count=status=>leads.filter(lead=>lead.status===status).length;
 return {leads,metrics:{total:leads.length,research:count('Research required'),compliance:count('Compliance review'),ready:count('Ready for mail approval'),approved:count('Approved for mail'),responded:count('Responded'),suppressed:count('Suppressed'),highPriority:leads.filter(lead=>lead.score>=60).length}};
}

export function updateLeadReview(current,caseIds,payload,{actor,at}){
 const next=normalizeLeadAutomation(current);const caseId=safeText(payload.caseId,120);
 if(!caseIds.has(caseId))throw Object.assign(new Error('Probate case not found.'),{status:400});
 const allowed={representativeStatus:['unverified','researching','verified'],mailingAddressStatus:['unverified','researching','verified'],dncNational:['not-screened','clear','listed'],dncFlorida:['not-screened','clear','listed'],responseStatus:['none','interested','later','represented','wrong-person','sold','do-not-contact']};
 const review={representativeStatus:'unverified',mailingAddressStatus:'unverified',dncNational:'not-screened',dncFlorida:'not-screened',responseStatus:'none',...(next.reviews[caseId]||{})};
 for(const [key,values] of Object.entries(allowed))if(payload[key]!==undefined){if(!values.includes(payload[key]))throw Object.assign(new Error('Invalid '+key+'.'),{status:400});review[key]=payload[key];}
 for(const key of ['contactSource','contactVerifiedAt','notes'])if(payload[key]!==undefined)review[key]=safeText(payload[key],key==='notes'?2000:500);
 if(review.contactVerifiedAt&&!/^\d{4}-\d{2}-\d{2}$/.test(review.contactVerifiedAt))throw Object.assign(new Error('Enter a valid verification date.'),{status:400});
 if(payload.suppressed!==undefined)review.suppressed=Boolean(payload.suppressed);
 if(payload.approveMail===true){
  if(review.representativeStatus!=='verified'||review.mailingAddressStatus!=='verified'||review.dncNational!=='clear'||review.dncFlorida!=='clear'||!review.contactSource||!review.contactVerifiedAt)throw Object.assign(new Error('Complete representative, address, source, verification date, and both compliance screens before approving mail.'),{status:400});
  review.mailApprovedAt=at;review.mailApprovedBy=actor;
 }
 if(payload.revokeMail===true){review.mailApprovedAt='';review.mailApprovedBy='';}
 if(review.responseStatus==='do-not-contact')review.suppressed=true;
 review.updatedAt=at;review.updatedBy=actor;next.reviews[caseId]=review;return next;
}
