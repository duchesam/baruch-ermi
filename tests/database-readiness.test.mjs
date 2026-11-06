import test from 'node:test';
import assert from 'node:assert/strict';
import {databaseReadiness} from '../lib/database-readiness.mjs';
test('managed auth readiness never accepts a legacy owner row as managed sign-in evidence', async()=>{
 const queries=[];
 const db={query:async(sql)=>{queries.push(sql);return {rows:[{id:'legacy-owner'}]};}};
 const result=await databaseReadiness(db,{NEON_AUTH_BASE_URL:'https://auth.example.test',OWNER_EMAIL:'owner@example.test'});
 assert.equal(queries.length,5);
 assert.equal(queries.some(sql=>sql.includes('"user"')),false);
 assert.equal(result.ownerInitialized,null);
 assert.match(result.owner,/browser verification required/);
});
test('legacy readiness still checks the authorized owner and propagates schema failures',async()=>{
 const db={query:async()=>({rows:[]})};
 assert.equal((await databaseReadiness(db,{OWNER_EMAIL:'owner@example.test'})).ownerInitialized,false);
 await assert.rejects(()=>databaseReadiness({query:async()=>{throw Error('missing table');}},{OWNER_EMAIL:'owner@example.test'}),/missing table/);
});
