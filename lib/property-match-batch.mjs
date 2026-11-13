import {readWorkspace,writeWorkspace} from './workspace.mjs';
import {collectByOwner,SOURCE} from './parcel-source.mjs';
import {matchLabel,probateNames,rankParcelCandidates} from './property-match-core.mjs';

const integer=(value,fallback)=>Number.isSafeInteger(value)?value:fallback;

export async function scanCaseCandidates(caseRecord,fetcher){
 const names=probateNames(caseRecord);if(!names.length)return {candidates:[],error:'No decedent name is available for matching.',retrievedAt:new Date().toISOString()};
 try{const searches=await Promise.all(names.slice(0,2).map(async name=>({name,result:await collectByOwner(name,fetcher)}))),seen=new Map();for(const {name,result} of searches)for(const candidate of rankParcelCandidates(name,result.rows)){const current=seen.get(candidate.parcelid);if(!current||candidate.score>current.score)seen.set(candidate.parcelid,{...candidate,subjectName:name,label:matchLabel(candidate.score),retrievedAt:result.retrievedAt});}return {candidates:[...seen.values()].sort((a,b)=>b.score-a.score||a.parcelid.localeCompare(b.parcelid)).slice(0,20),error:'',retrievedAt:searches[0]?.result.retrievedAt||new Date().toISOString()};}
 catch(error){return {candidates:[],error:String(error.message||'County search failed.').slice(0,300),retrievedAt:new Date().toISOString()};}
}

export async function scanPropertyMatchBatch(body,actor,fetcher=fetch){
 const revision=integer(body?.revision,-1),cursor=Math.max(0,integer(body?.cursor,0)),limit=Math.min(8,Math.max(1,integer(body?.limit,6)));if(revision<0)throw Object.assign(new Error('Invalid workspace revision.'),{status:400});
 const workspace=await readWorkspace();if(workspace.revision!==revision)throw Object.assign(new Error('The workspace changed. Reload before continuing the batch scan.'),{status:409});
 const cases=workspace.cases,chunk=cases.slice(cursor,cursor+limit),results=await Promise.all(chunk.map(item=>scanCaseCandidates(item,fetcher)));let matched=0,noMatch=0,failed=0;
 for(let index=0;index<chunk.length;index++){const item=chunk[index],result=results[index];item.propertyMatchScan={retrievedAt:result.retrievedAt,source:SOURCE,error:result.error,candidates:result.candidates};if(result.error)failed++;else if(result.candidates.length)matched++;else noMatch++;item.activity.push({at:result.retrievedAt,action:'County property batch scan',note:result.error?`Search incomplete: ${result.error}`:`${result.candidates.length} unverified candidate${result.candidates.length===1?'':'s'} recorded for review by ${actor}.`});}
 const saved=chunk.length?await writeWorkspace(workspace,workspace.revision):workspace,nextCursor=Math.min(cases.length,cursor+chunk.length);return {revision:saved.revision,processed:chunk.length,matched,noMatch,failed,nextCursor,done:nextCursor>=cases.length,total:cases.length};
}
