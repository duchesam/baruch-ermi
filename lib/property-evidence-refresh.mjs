import {collectByFolio} from './parcel-source.mjs';
import {readWorkspace,writeWorkspace} from './workspace.mjs';

const key=value=>String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');

export async function refreshPreparedEvidence(payload,actor,{fetcher=fetch,read=readWorkspace,write=writeWorkspace}={}){
 if(!Number.isSafeInteger(payload?.revision)||payload.revision<0)throw Object.assign(new Error('Invalid workspace revision.'),{status:400});
 const workspace=await read();if(workspace.revision!==payload.revision)throw Object.assign(new Error('The workspace changed. Reload before refreshing evidence.'),{status:409});
 const prepared=workspace.records.filter(record=>record.id.startsWith('county:')&&!record.checks?.ownership&&workspace.cases.some(item=>item.links.some(link=>link.propertyId===record.id)));
 let refreshed=0,unchanged=0,changed=0,missing=0,failed=0;
 for(const property of prepared){
  try{
   const result=await collectByFolio(property.parcel,fetcher),row=result.rows.find(item=>item.parcelid===property.parcel);
   if(!row){missing++;continue;}
   const ownerUnchanged=key(row.owner)===key(property.owner),addressUnchanged=key(row.address)===key(property.address),mailUnchanged=key(row.mailingaddress)===key(property.mail);
   if(ownerUnchanged&&addressUnchanged&&mailUnchanged)unchanged++;else changed++;
   property.address=row.address;property.city=row.city;property.owner=row.owner;property.mail=row.mailingaddress;
   const source={name:row.source,url:row.sourceurl,importedAt:result.retrievedAt};const index=property.sources.findIndex(item=>item.url===row.sourceurl);if(index>=0)property.sources[index]=source;else property.sources.push(source);
   const date=result.retrievedAt.slice(0,10),note=`Official county folio snapshot refreshed by ${actor}. Owner field ${ownerUnchanged?'unchanged':'changed'}; situs address ${addressUnchanged?'unchanged':'changed'}; mailing address ${mailUnchanged?'unchanged':'changed'}. This snapshot does not prove estate authority or contact permission.`;
   for(const caseRecord of workspace.cases.filter(item=>item.links.some(link=>link.propertyId===property.id))){const evidence={propertyId:property.id,kind:'County snapshot',url:row.sourceurl,date,note};const existing=caseRecord.evidence.findIndex(item=>item.propertyId===property.id&&item.kind==='County snapshot'&&item.date===date);if(existing>=0)caseRecord.evidence[existing]=evidence;else caseRecord.evidence.push(evidence);caseRecord.activity.push({at:result.retrievedAt,action:'County evidence refreshed',note});}
   refreshed++;
  }catch{failed++;}
 }
 const saved=refreshed?await write(workspace,workspace.revision):workspace;
 return {revision:saved.revision,total:prepared.length,refreshed,unchanged,changed,missing,failed,notice:`County evidence refreshed for ${refreshed} of ${prepared.length} prepared properties. ${changed} record${changed===1?' has':'s have'} changed county fields; ${failed+missing} need manual follow-up. No property was marked verified and nothing was sent.`};
}
