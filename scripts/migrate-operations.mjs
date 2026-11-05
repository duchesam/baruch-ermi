import {assertPreviewMigration} from '../lib/migration-safety.mjs';
// Run only after approval against a confirmed isolated preview database.
import {database} from '../lib/db.mjs';
import {emptyOperations} from '../lib/operations-core.mjs';
if(process.env.OPERATIONS_MIGRATION_APPROVED!=='isolated-preview'||!process.env.DATABASE_URL)throw Error('Confirm an isolated preview PostgreSQL database and set OPERATIONS_MIGRATION_APPROVED=isolated-preview.');
assertPreviewMigration(process.env);
const db=database();await db.query('CREATE TABLE IF NOT EXISTS crm_operations (id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL)');
await db.query('INSERT INTO crm_operations (id,revision,data) VALUES (?,?,?) ON CONFLICT(id) DO NOTHING',['company',0,JSON.stringify(emptyOperations())]);
console.log('Additive Operations schema ready; existing records retained.');process.exit(0);
