import {createHash} from 'node:crypto';
export function assertPreviewMigration(env){
 if(env.VERCEL_ENV==='production')throw Error('Preview migration cannot run in Production.');
 if(!env.DATABASE_URL)throw Error('An isolated PostgreSQL DATABASE_URL is required.');
 const u=new URL(env.DATABASE_URL);if(!['postgres:','postgresql:'].includes(u.protocol))throw Error('Migration requires PostgreSQL.');
 const fingerprint=createHash('sha256').update(env.DATABASE_URL).digest('hex');
 if(env.MIGRATION_DATABASE_SHA256!==fingerprint)throw Error('Confirm the exact isolated database by setting MIGRATION_DATABASE_SHA256 to the SHA-256 of its DATABASE_URL.');
 return true;
}
