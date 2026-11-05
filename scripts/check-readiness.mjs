// Read-only. Never prints credentials, contact information, or record content.
import {configReadiness} from '../lib/readiness.mjs';
import {database} from '../lib/db.mjs';
const config=configReadiness(process.env);const result={configuration:config,database:'not checked',owner:'not checked'};
if(config.configured&&!process.argv.includes('--offline')){try{const db=database();for(const table of ['crm_workspace','inquiries','scenarios','crm_operations','request_limits','user','session','account','verification','rateLimit'])await db.query('SELECT COUNT(*) AS count FROM "'+table+'"');const owner=await db.query('SELECT id FROM "user" WHERE lower(email)=?',[process.env.OWNER_EMAIL.toLowerCase()]);result.database='required tables accessible';result.owner=owner.rows.length===1?'one authorized owner found':'owner setup incomplete';}catch{result.database='connection or schema check failed';}}
console.log(JSON.stringify(result,null,2));process.exit(config.configured&&(process.argv.includes('--offline')||result.owner==='one authorized owner found')?0:1);
