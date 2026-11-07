import {getMigrations} from 'better-auth/db/migration';
import {getAuth} from '../lib/auth.mjs';import {initializeCRM} from '../lib/db.mjs';
if(process.env.VERCEL||!process.env.LOCAL_DATABASE_PATH)throw Error('This command is for an isolated local SQLite workspace only.');
if(!process.env.OWNER_EMAIL||!process.env.BOOTSTRAP_PASSWORD)throw Error('Set OWNER_EMAIL and BOOTSTRAP_PASSWORD (12+ characters).');
const auth=getAuth({bootstrap:true});const migrations=await getMigrations(auth.options);await migrations.runMigrations();await initializeCRM();
try{await auth.api.signUpEmail({body:{email:process.env.OWNER_EMAIL,password:process.env.BOOTSTRAP_PASSWORD,name:'Company owner'}});}catch(e){if(!String(e.message).toLowerCase().includes('exist'))throw e;}
console.log('Local schema and authorized owner ready. No production services were changed.');
process.exit(0);
