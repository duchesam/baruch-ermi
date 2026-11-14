import {createHash} from 'node:crypto';
import {readWorkspace,writeWorkspace} from './workspace.mjs';
import {parseProbateCSV,mergeCases} from '../public/lead-assets/probate-logic.mjs';

const cleanName=value=>String(value||'').replace(/[^a-zA-Z0-9._ -]/g,'').trim().slice(0,180)||'court-parties.csv';
export async function importCourtParties(body,actor,{read=readWorkspace,write=writeWorkspace}={}){
 if(!Number.isSafeInteger(body?.revision)||body.revision<0)throw Object.assign(new Error('Reload the workflow before importing.'),{status:400});
 if(!Array.isArray(body.files)||!body.files.length||body.files.length>20)throw Object.assign(new Error('Choose 1 to 20 Clerk CSV files.'),{status:400});
 if(body.files.reduce((sum,file)=>sum+Buffer.byteLength(String(file?.text||''),'utf8'),0)>10_000_000)throw Object.assign(new Error('Court-party import limit is 10 MB.'),{status:413});
 const workspace=await read();if(workspace.revision!==body.revision)throw Object.assign(new Error('The workspace changed. Reload before importing.'),{status:409});
 let incoming=[],rows=0,issues=[];
 for(const file of body.files){const name=cleanName(file?.name),text=String(file?.text||'');if(!text.trim())throw Object.assign(new Error(`${name} is empty.`),{status:400});const id=createHash('sha256').update(text).digest('hex')+':'+name;let parsed;try{parsed=parseProbateCSV(text,{id,file:name,importedAt:new Date().toISOString()});}catch(error){throw Object.assign(new Error(`${name}: ${error.message}`),{status:400});}if(!parsed.cases.some(item=>item.parties?.length))throw Object.assign(new Error(`${name} contains case summaries, not court-party rows. Export the Clerk related-party file with CaseNumber, PartyType, and CaseTypeDescription.`),{status:400});incoming=mergeCases(incoming,parsed.cases).cases;rows+=parsed.validRows;issues.push(...parsed.issues.map(item=>({...item,file:name})));}
 const existingIds=new Set(workspace.cases.map(item=>item.id)),matching=incoming.filter(item=>existingIds.has(item.id));if(!matching.length)throw Object.assign(new Error('No imported case numbers match the current probate queue.'),{status:400});
 const before=new Map(workspace.cases.map(item=>[item.id,item.parties.length])),merged=mergeCases(workspace.cases,matching),partiesAdded=merged.cases.reduce((sum,item)=>sum+Math.max(0,item.parties.length-(before.get(item.id)||0)),0),at=new Date().toISOString();workspace.cases=merged.cases;workspace.history.unshift({kind:'Court-party CSV import',label:body.files.map(file=>cleanName(file.name)).join(', '),count:rows,status:`${partiesAdded} party records added across ${matching.length} matching cases`,at,actor,issues});const saved=await write(workspace,workspace.revision);
 return {revision:saved.revision,rows,casesMatched:matching.length,partiesAdded,unknownCases:incoming.filter(item=>!existingIds.has(item.id)).length,issues:issues.length,notice:`Court-party import saved: ${partiesAdded} new party records across ${matching.length} matching cases. No representative was automatically verified.`};
}
