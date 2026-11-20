import test from 'node:test';
import assert from 'node:assert/strict';
import {validateInquiry,fingerprint} from '../lib/inquiries.mjs';

const base=()=>({kind:'seller',name:'Test Visitor',email:'TEST@example.com',address:'123 Example Lane',startedAt:Date.now()-5000,smsConsent:false,marketingConsent:false,website:''});

test('seller inquiry normalizes email and records no optional SMS consent by default',()=>{
 const {kind,data}=validateInquiry(base());
 assert.equal(kind,'seller');
 assert.equal(data.email,'test@example.com');
 assert.equal(data.consent.sms,false);
 assert.equal(data.consent.marketingSms,false);
 assert.equal(data.address,'123 Example Lane');
});
test('SMS opt-in requires a phone number',()=>{
 for(const field of ['smsConsent','marketingConsent']){
  assert.throws(()=>validateInquiry({...base(),[field]:true}),{status:400});
 }
});
test('valid phone and optional consent are recorded separately',()=>{
 const {data}=validateInquiry({...base(),phone:'8135550100',smsConsent:true});
 assert.equal(data.consent.sms,true);
 assert.equal(data.consent.marketingSms,false);
});
test('seller requires an address and agent requires address and brokerage',()=>{
 assert.throws(()=>validateInquiry({...base(),address:''}),{status:400});
 assert.throws(()=>validateInquiry({...base(),kind:'agent',brokerage:''}),{status:400});
 assert.equal(validateInquiry({...base(),kind:'agent',brokerage:'Example Realty'}).kind,'agent');
});
test('investor inquiries do not require a property address',()=>{
 const {data}=validateInquiry({...base(),kind:'investor',address:''});
 assert.equal(data.address,'');
});
test('honeypot and implausibly fast submissions are rejected',()=>{
 assert.throws(()=>validateInquiry({...base(),website:'spam'}),{status:400});
 assert.throws(()=>validateInquiry({...base(),startedAt:Date.now()}),{status:400});
});
test('same-day duplicate fingerprints match, distinct inquiries do not',()=>{
 const {data}=validateInquiry(base());
 assert.equal(fingerprint('seller',data),fingerprint('seller',data));
 assert.notEqual(fingerprint('seller',data),fingerprint('agent',data));
 assert.notEqual(fingerprint('seller',data),fingerprint('seller',{...data,message:'Different details'}));
});
