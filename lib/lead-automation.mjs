import {database} from './db.mjs';
import {readWorkspace} from './workspace.mjs';
import {normalizeLeadAutomation,leadAutomationReport,updateLeadReview} from './lead-automation-core.mjs';

export async function readLeadAutomation(){
 const [workspace,result]=await Promise.all([readWorkspace(),database().query('SELECT revision,data FROM crm_operations WHERE id=?',['company'])]);
 if(!result.rows.length)throw Object.assign(new Error('Operations schema is awaiting migration.'),{status:503});
 const operations=JSON.parse(result.rows[0].data);const automation=normalizeLeadAutomation(operations.leadAutomation);
 return {revision:result.rows[0].revision,automation,...leadAutomationReport(workspace.cases,workspace.records,automation)};
}

export async function changeLeadAutomation(body,actor){
 if(!Number.isSafeInteger(body?.revision)||body.revision<0)throw Object.assign(new Error('Invalid revision.'),{status:400});
 const [workspace,result]=await Promise.all([readWorkspace(),database().query('SELECT revision,data FROM crm_operations WHERE id=?',['company'])]);
 if(!result.rows.length)throw Object.assign(new Error('Operations schema is awaiting migration.'),{status:503});
 if(result.rows[0].revision!==body.revision)throw Object.assign(new Error('Another session changed the workspace. Reload before saving.'),{status:409});
 const operations=JSON.parse(result.rows[0].data);const at=new Date().toISOString();
 operations.leadAutomation=updateLeadReview(operations.leadAutomation,new Set(workspace.cases.map(item=>item.id)),body.review||{},{actor,at});
 operations.activity=Array.isArray(operations.activity)?operations.activity:[];
 operations.activity.push({id:crypto.randomUUID(),entityId:body.review?.caseId||'',requestId:crypto.randomUUID(),at,actor,type:'lead.review.update',summary:body.review?.approveMail?'Mail review approved':'Lead review updated',changes:structuredClone(body.review||{})});
 operations.revision=result.rows[0].revision+1;
 const {changes}=await database().query('UPDATE crm_operations SET revision=?,data=? WHERE id=? AND revision=?',[operations.revision,JSON.stringify(operations),'company',result.rows[0].revision]);
 if(changes!==1)throw Object.assign(new Error('Another session changed the workspace. Reload before saving.'),{status:409});
 return readLeadAutomation();
}
