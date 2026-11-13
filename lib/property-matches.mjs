import {readWorkspace,writeWorkspace} from './workspace.mjs';
import {collectByFolio,collectByOwner,SOURCE} from './parcel-source.mjs';
import {matchLabel,probateNames,rankParcelCandidates} from './property-match-core.mjs';

function findCase(workspace,caseId){const item=workspace.cases.find(entry=>entry.id===caseId);if(!item)throw Object.assign(new Error('Probate case not found.'),{status:404});return item;}

export async function findPropertyMatches(caseId,fetcher=fetch){
 const workspace=await readWorkspace(),caseRecord=findCase(workspace,caseId),names=probateNames(caseRecord);if(!names.length)throw Object.assign(new Error('This case has no decedent name available for county matching.'),{status:400});
 const searches=await Promise.all(names.slice(0,3).map(async name=>({name,result:await collectByOwner(name,fetcher)})));
 const seen=new Map();for(const {name,result} of searches)for(const candidate of rankParcelCandidates(name,result.rows)){const current=seen.get(candidate.parcelid);if(!current||candidate.score>current.score)seen.set(candidate.parcelid,{...candidate,subjectName:name,label:matchLabel(candidate.score),retrievedAt:result.retrievedAt});}
 return {revision:workspace.revision,caseId,caseNumber:caseRecord.caseNumber,names,candidates:[...seen.values()].sort((a,b)=>b.score-a.score||a.parcelid.localeCompare(b.parcelid)).slice(0,20),source:SOURCE,notice:'County candidates are research leads, not verified ownership or seller authority.'};
}

export async function selectPropertyCandidate(body,actor,fetcher=fetch){
 if(!Number.isSafeInteger(body?.revision)||body.revision<0)throw Object.assign(new Error('Invalid workspace revision.'),{status:400});
 const workspace=await readWorkspace();if(workspace.revision!==body.revision)throw Object.assign(new Error('The workspace changed. Reload the case before selecting a candidate.'),{status:409});
 const caseRecord=findCase(workspace,body.caseId),names=probateNames(caseRecord),result=await collectByFolio(body.folio,fetcher),row=result.rows[0];if(!row)throw Object.assign(new Error('The selected folio is no longer present in the county feed.'),{status:404});
 const ranked=names.map(name=>({...rankParcelCandidates(name,[row])[0],subjectName:name})).filter(item=>item.parcelid).sort((a,b)=>b.score-a.score);const match=ranked[0];if(!match||match.score<70)throw Object.assign(new Error('The county owner name no longer meets the review threshold.'),{status:409});
 const propertyId='county:'+row.parcelid;let property=workspace.records.find(record=>record.id===propertyId);if(!property){property={id:propertyId,parcel:row.parcelid,address:row.address,city:row.city,owner:row.owner,mail:row.mailingaddress,caseNumber:caseRecord.caseNumber,notes:'County name-match candidate selected for manual ownership review. No ownership or seller authority determination has been made.',followup:'',verifiedAt:'',checks:{ownership:false,authority:false,status:false,mail:false},signals:[],sources:[{name:row.source,url:row.sourceurl,importedAt:result.retrievedAt}],stage:'Research'};workspace.records.push(property);}
 const existingLink=caseRecord.links.some(link=>link.propertyId===propertyId);if(!existingLink)caseRecord.links.push({propertyId,url:row.sourceurl,date:result.retrievedAt.slice(0,10),note:`County owner field matched ${match.subjectName} at ${match.score}/100. Candidate selected by ${actor} for manual verification; ownership is not verified.`,identityMatched:false,ownershipMatched:false,authorityMatched:false});
 if(existingLink)return {revision:workspace.revision,caseId:caseRecord.id,propertyId,folio:row.parcelid,notice:'This candidate is already in property research. Ownership remains unverified.'};
 caseRecord.status='Property review';caseRecord.activity.push({at:result.retrievedAt,action:'County candidate selected',note:`Folio ${row.parcelid} selected for research. No ownership or authority verification recorded.`});
 const saved=await writeWorkspace(workspace,workspace.revision);return {revision:saved.revision,caseId:caseRecord.id,propertyId,folio:row.parcelid,notice:'Candidate added to property research. Ownership remains unverified.'};
}
