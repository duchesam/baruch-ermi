import test from 'node:test';import assert from 'node:assert/strict';import {acquisitionReadiness} from '../lib/acquisition-readiness.mjs';
const inquiry={id:'abc',kind:'seller',data:{address:'123 Main St',email:'seller@example.com',message:'I would like to discuss selling this property this month.'}};
const record={inquiryId:'abc',checks:{ownership:true,authority:true,status:true,mail:true},verifiedAt:'2026-11-20'};
const opportunity={linkType:'inquiry',linkId:'abc',stage:'New',responsible:'Owner',nextAction:'Call seller',nextDate:'2026-11-21'};
test('full recorded evidence and follow-up enables underwriting review',()=>assert.equal(acquisitionReadiness(inquiry,[record],[opportunity]).status,'Ready for underwriting review'));
test('unlinked property cannot be ready',()=>assert.equal(acquisitionReadiness(inquiry,[],[opportunity]).status,'Action required'));
test('missing owner and follow-up block readiness',()=>{const r=acquisitionReadiness(inquiry,[record],[{...opportunity,responsible:'',nextDate:''}]);assert.equal(r.status,'Action required');assert.ok(r.blockers.includes('Assign opportunity owner'));});
test('missing opportunity blocks readiness',()=>assert.ok(acquisitionReadiness(inquiry,[record],[]).blockers.includes('Create Operations opportunity')));
test('non-seller excluded',()=>assert.equal(acquisitionReadiness({kind:'general'},[],[]),null));
