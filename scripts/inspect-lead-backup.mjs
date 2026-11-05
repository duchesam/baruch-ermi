// Read-only: reports counts/checksum, never modifies the source or a database.
import fs from 'node:fs';
import {inspectLeadBackup} from '../lib/company-backup.mjs';
const file=process.argv[2];if(!file)throw Error('Usage: node scripts/inspect-lead-backup.mjs /path/to/lead-desk-backup.json');
const raw=JSON.parse(fs.readFileSync(file,'utf8'));console.log(JSON.stringify(inspectLeadBackup(raw.workspace||raw),null,2));
