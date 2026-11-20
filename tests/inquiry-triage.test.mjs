import test from 'node:test';import assert from 'node:assert/strict';import {triageInquiry} from '../lib/inquiry-triage.mjs';
test('detailed seller inquiry is prioritized for review',()=>{assert.equal(triageInquiry({kind:'seller',data:{address:'123 Main St',email:'seller@example.com',message:'I would like to discuss selling this property this month.'}}).priority,'Review first');});
test('seller missing address needs details',()=>{assert.equal(triageInquiry({kind:'seller',data:{email:'seller@example.com',message:'I would like to discuss selling this property this month.'}}).priority,'Needs details');});
test('non seller does not receive seller qualification',()=>{assert.equal(triageInquiry({kind:'general',data:{}}).priority,'Standard');});
