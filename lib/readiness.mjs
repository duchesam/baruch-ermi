export function configReadiness(env){const required=['DATABASE_URL','BETTER_AUTH_URL','OWNER_EMAIL',...(env.NEON_AUTH_BASE_URL?['NEON_AUTH_COOKIE_SECRET']:['BETTER_AUTH_SECRET'])];const missing=required.filter(k=>!env[k]);const problems=[];
 if(env.NEON_AUTH_BASE_URL){try{const u=new URL(env.NEON_AUTH_BASE_URL);if(u.protocol!=='https:'||u.search||u.hash)problems.push('NEON_AUTH_BASE_URL must be an HTTPS URL.');}catch{problems.push('NEON_AUTH_BASE_URL is invalid.');}}
 if(env.NEON_AUTH_COOKIE_SECRET&&env.NEON_AUTH_COOKIE_SECRET.length<32)problems.push('NEON_AUTH_COOKIE_SECRET must contain at least 32 characters.');
 if(env.BETTER_AUTH_SECRET&&env.BETTER_AUTH_SECRET.length<32)problems.push('BETTER_AUTH_SECRET must contain at least 32 characters.');
 if(env.OWNER_EMAIL&&!/^\S+@\S+\.\S+$/.test(env.OWNER_EMAIL))problems.push('OWNER_EMAIL is invalid.');
 if(env.BETTER_AUTH_URL){try{const u=new URL(env.BETTER_AUTH_URL);if(u.protocol!=='https:'||u.pathname!=='/'||u.search||u.hash)problems.push('BETTER_AUTH_URL must be an HTTPS origin.');if(u.hostname==='localhost')problems.push('Hosted auth cannot use localhost.');}catch{problems.push('BETTER_AUTH_URL is invalid.');}}
 if(env.DATABASE_URL){try{const u=new URL(env.DATABASE_URL);if(!['postgres:','postgresql:'].includes(u.protocol)||!u.hostname||!u.pathname.slice(1))problems.push('DATABASE_URL must identify a PostgreSQL database.');}catch{problems.push('DATABASE_URL is invalid.');}}
 if(env.LOCAL_DATABASE_PATH)problems.push('Remove LOCAL_DATABASE_PATH from hosted configuration.');
 if(env.BOOTSTRAP_PASSWORD)problems.push('Remove BOOTSTRAP_PASSWORD after owner setup.');
 if(env.RENTCAST_ENABLED==='true')problems.push('Paid estimates are enabled; separate activation approval is required.');
 return {configured:!missing.length&&!problems.length,missing,problems};}
