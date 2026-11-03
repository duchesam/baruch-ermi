// Preparation command only: never run against a live/production database without approval.
import {getMigrations} from 'better-auth/db/migration';import {getAuth} from '../lib/auth.mjs';import {initializeCRM} from '../lib/db.mjs';
if(process.env.MIGRATION_APPROVED!=='isolated-preview')throw Error('Set MIGRATION_APPROVED=isolated-preview only after checking that DATABASE_URL identifies an empty, separate preview database.');
if(!process.env.DATABASE_URL||!process.env.OWNER_EMAIL||!process.env.BOOTSTRAP_PASSWORD)throw Error('DATABASE_URL, OWNER_EMAIL and BOOTSTRAP_PASSWORD are required.');
const auth=getAuth({bootstrap:true});await(await getMigrations(auth.options)).runMigrations();await initializeCRM();await auth.api.signUpEmail({body:{email:process.env.OWNER_EMAIL,password:process.env.BOOTSTRAP_PASSWORD,name:'Company owner'}});console.log('Isolated preview schema and authorized owner created. Remove BOOTSTRAP_PASSWORD from the environment.');process.exit(0);
