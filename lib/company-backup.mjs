import {createHash} from 'node:crypto';
import {readSnapshot} from './db.mjs';
import {backupWorkspace} from '../public/lead-assets/workspace-core.mjs';
export function inspectLeadBackup(input){const w=backupWorkspace(input);return {version:w.version,properties:w.records.length,probateCases:w.cases.length,summaryRows:w.cases.reduce((n,c)=>n+(c.summaries?.length||0),0),historyEntries:w.history.length,recoveryCopies:w.recoveryCopies?.length||0,suppressedProperties:w.records.filter(r=>r.stage==='Do not contact'||r.outreach?.suppressed).length,linkedProperties:new Set(w.cases.flatMap(c=>c.links.map(l=>l.propertyId))).size,propertySources:w.records.reduce((n,r)=>n+r.sources.length,0),sha256:createHash('sha256').update(JSON.stringify(w)).digest('hex')};}
export function backupChecksum(value){return createHash('sha256').update(JSON.stringify(value)).digest('hex');}
export async function companyBackup(){return readSnapshot(async query=>{
 const workspaceRows=await query("SELECT revision,data FROM crm_workspace WHERE id='company'");
 const operationsRows=await query("SELECT revision,data FROM crm_operations WHERE id='company'");
 if(!workspaceRows.length||!operationsRows.length)throw Object.assign(new Error('Company schema is incomplete.'),{status:503});
 const workspace={...JSON.parse(workspaceRows[0].data),revision:workspaceRows[0].revision};
 const operations={...JSON.parse(operationsRows[0].data),revision:operationsRows[0].revision};
 const inquiries=(await query('SELECT id,kind,created_at,data FROM inquiries ORDER BY id')).map(r=>({...r,data:JSON.parse(r.data)}));
 const scenarios=(await query('SELECT id,property_id,created_at,name,data FROM scenarios ORDER BY id')).map(r=>{const {data,...record}=r;return {...record,inputs:JSON.parse(data)};});
 const payload={format:'baruch-ermi-company-backup',version:1,generatedAt:new Date().toISOString(),workspace,operations,inquiries,scenarios};
 const content={...payload,counts:{...inspectLeadBackup(workspace),opportunities:operations.opportunities.length,tasks:operations.tasks.length,operationsActivity:operations.activity.length,inquiries:inquiries.length,scenarios:scenarios.length}};return {...content,checksum:backupChecksum(content)};
 });}
