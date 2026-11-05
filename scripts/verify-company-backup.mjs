// Read-only integrity check; never imports data or exposes contact information.
import fs from 'node:fs';
import {backupChecksum,inspectLeadBackup} from '../lib/company-backup.mjs';
const file=process.argv[2];if(!file)throw Error('Usage: node scripts/verify-company-backup.mjs /path/to/company-backup.json');
const {checksum,...payload}=JSON.parse(fs.readFileSync(file,'utf8'));
if(payload.format!=='baruch-ermi-company-backup'||payload.version!==1||checksum!==backupChecksum(payload))throw Error('Backup format or integrity check failed. Do not import this file.');
const inspection=inspectLeadBackup(payload.workspace);const ids=new Set(payload.workspace.records.map(r=>r.id));
const danglingScenarios=payload.scenarios.filter(s=>!ids.has(s.property_id)).length;
console.log(JSON.stringify({integrity:'verified',...inspection,inquiries:payload.inquiries.length,scenarios:payload.scenarios.length,opportunities:payload.operations.opportunities.length,tasks:payload.operations.tasks.length,danglingScenarios},null,2));
if(danglingScenarios)process.exitCode=1;
