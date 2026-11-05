import test from 'node:test';
import assert from 'node:assert/strict';
import {authorizeNeonOwner,neonOwnerSession} from '../lib/neon-auth.mjs';

process.env.OWNER_EMAIL='owner@example.test';
process.env.NEON_AUTH_BASE_URL='https://example.neonauth.test/auth';
process.env.NEON_AUTH_COOKIE_SECRET='test-only-cookie-secret-with-more-than-32-characters';
test('Neon sessions require verified owner identity, including server-side API access',async()=>{
 for(const session of [null,{user:{email:'other@example.test',emailVerified:true}},{user:{email:'owner@example.test',emailVerified:false}}])assert.throws(()=>authorizeNeonOwner(session),{status:401});
 const owner={user:{email:'OWNER@example.test',emailVerified:true}};
 assert.equal(authorizeNeonOwner(owner),owner);
 await assert.rejects(neonOwnerSession({headers:{}}),{status:401});
 const {requireOwner}=await import('../lib/auth.mjs');
 await assert.rejects(requireOwner({headers:{cookie:'better-auth.session_token=legacy-token'}}),{status:401});
});
test('managed sign-up remains blocked through the application proxy',async()=>{
 const {default:handler}=await import('../pages/api/auth/[...all].js');
 const result={};const res={setHeader(){},status(status){result.status=status;return this;},json(data){result.data=data;return this;}};
 await handler({headers:{},method:'POST',query:{all:['sign-up','email']}},res);
 assert.equal(result.status,403);
});
