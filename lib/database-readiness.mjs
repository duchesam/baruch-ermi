// Read-only schema checks. A database identity row never proves browser sign-in.
export async function databaseReadiness(db, env) {
 const managed = Boolean(env.NEON_AUTH_BASE_URL);
 const tables = ['crm_workspace','inquiries','scenarios','crm_operations','request_limits'];
 if (!managed) tables.push('user','session','account','verification','rateLimit');
 for (const table of tables) await db.query('SELECT COUNT(*) AS count FROM "'+table+'"');
 if (managed) return {database:'required application tables accessible',owner:'managed Neon Auth: authenticated browser verification required',ownerInitialized:null};
 const owner=await db.query('SELECT id FROM "user" WHERE lower(email)=?',[env.OWNER_EMAIL.toLowerCase()]);
 return {database:'required tables accessible',owner:owner.rows.length===1?'one authorized owner found':'owner setup incomplete',ownerInitialized:owner.rows.length===1};
}
