// Read-only. Never prints credentials, contact information, or record content.
import {configReadiness} from '../lib/readiness.mjs';
import {database} from '../lib/db.mjs';
import {databaseReadiness} from '../lib/database-readiness.mjs';
const config=configReadiness(process.env);const result={configuration:config,database:'not checked',owner:'not checked'};
if(config.configured&&!process.argv.includes('--offline')){try{Object.assign(result,await databaseReadiness(database(),process.env));}catch{result.database='connection or schema check failed';}}
console.log(JSON.stringify(result,null,2));process.exit(config.configured&&(process.argv.includes('--offline')||result.owner==='one authorized owner found')?0:1);
