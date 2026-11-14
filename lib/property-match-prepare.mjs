import {readWorkspace,writeWorkspace} from './workspace.mjs';
import {collectByFolio} from './parcel-source.mjs';
import {probateNames,rankParcelCandidates} from './property-match-core.mjs';

export function uniqueHighConfidenceCandidate(caseRecord){
 const candidates=caseRecord?.propertyMatchScan?.candidates;
 if(!Array.isArray(candidates)||candidates.length!==1)return null;
 const candidate=candidates[0],score=Number(candidate?.score)||0,folio=String(candidate?.parcelid||'');
 if(score<90||!/^[0-9]{1,11}$/.test(folio))return null;
 const propertyId='county:'+folio;
 if((caseRecord.links||[]).some(link=>link.propertyId===propertyId))return null;
 return candidate;
}

function bestCurrentMatch(caseRecord,row){
 return probateNames(caseRecord).map(name=>{const match=rankParcelCandidates(name,[row])[0];return match?{...match,subjectName:name}:null;}).filter(Boolean).sort((a,b)=>b.score-a.score)[0]||null;
}

export async function prepareHighConfidenceResearch(body,actor,fetcher=fetch){
 const revision=body?.revision;if(!Number.isSafeInteger(revision)||revision<0)throw Object.assign(new Error('Invalid workspace revision.'),{status:400});
 const workspace=await readWorkspace();if(workspace.revision!==revision)throw Object.assign(new Error('The workspace changed. Reload before preparing matches.'),{status:409});
 const eligible=workspace.cases.map(caseRecord=>({caseRecord,candidate:uniqueHighConfidenceCandidate(caseRecord)})).filter(item=>item.candidate);
 const checked=await Promise.all(eligible.map(async item=>{try{const result=await collectByFolio(item.candidate.parcelid,fetcher);return {...item,result,row:result.rows[0]||null};}catch(error){return {...item,error:String(error?.message||'County recheck failed.').slice(0,300)};}}));
 let prepared=0,skipped=0,failed=0;
 for(const item of checked){
  if(item.error||!item.row){failed++;continue;}
  const match=bestCurrentMatch(item.caseRecord,item.row);if(!match||match.score<90){skipped++;continue;}
  const row=item.row,propertyId='county:'+row.parcelid;let property=workspace.records.find(record=>record.id===propertyId);
  if(!property){property={id:propertyId,parcel:row.parcelid,address:row.address,city:row.city,owner:row.owner,mail:row.mailingaddress,caseNumber:item.caseRecord.caseNumber,notes:'High-confidence county name-match candidate prepared for manual ownership review. No ownership or seller authority determination has been made.',followup:'',verifiedAt:'',checks:{ownership:false,authority:false,status:false,mail:false},signals:[],sources:[{name:row.source,url:row.sourceurl,importedAt:item.result.retrievedAt}],stage:'Research'};workspace.records.push(property);}
  item.caseRecord.links=item.caseRecord.links||[];if(item.caseRecord.links.some(link=>link.propertyId===propertyId)){skipped++;continue;}
  item.caseRecord.links.push({propertyId,url:row.sourceurl,date:item.result.retrievedAt.slice(0,10),note:`County owner field matched ${match.subjectName} at ${match.score}/100. Prepared by ${actor} for manual verification; ownership is not verified.`,identityMatched:false,ownershipMatched:false,authorityMatched:false});
  item.caseRecord.status='Property review';item.caseRecord.activity=item.caseRecord.activity||[];item.caseRecord.activity.push({at:item.result.retrievedAt,action:'High-confidence county candidate prepared',note:`Folio ${row.parcelid} added to research. No ownership or authority verification recorded.`});prepared++;
 }
 const saved=prepared?await writeWorkspace(workspace,workspace.revision):workspace;
 return {revision:saved.revision,eligible:eligible.length,prepared,skipped,failed,notice:`Prepared ${prepared} top match${prepared===1?'':'es'} for manual property review. Ownership and estate authority remain unverified; nothing was sent.`};
}
