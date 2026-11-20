import test from 'node:test';import assert from 'node:assert/strict';import {propertyEvidence} from '../lib/property-evidence.mjs';
const inquiry={id:'abc',kind:'seller'};
test('unlinked seller is not described as verified',()=>assert.equal(propertyEvidence(inquiry,[]).status,'Not linked'));
test('new website property is research pending',()=>assert.equal(propertyEvidence(inquiry,[{id:'inquiry:abc',checks:{ownership:false,authority:false,status:false,mail:false},verifiedAt:''}]).status,'Research pending'));
test('partial checks do not imply full verification',()=>assert.equal(propertyEvidence(inquiry,[{inquiryId:'abc',checks:{ownership:true},verifiedAt:''}]).status,'Partially reviewed'));
test('all checks and verification date are required',()=>assert.equal(propertyEvidence(inquiry,[{inquiryId:'abc',checks:{ownership:true,authority:true,status:true,mail:true},verifiedAt:'2026-11-20'}]).status,'Verification recorded'));
test('non-seller has no property evidence classification',()=>assert.equal(propertyEvidence({kind:'general'},[]),null));
