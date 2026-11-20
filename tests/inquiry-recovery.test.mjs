import test from 'node:test';
import assert from 'node:assert/strict';
import {missingPropertyInquiries} from '../lib/inquiry-recovery.mjs';

test('recovery finds only inquiries with missing property links',()=>{
 const inquiries=[{id:'a',data:{address:'123 Main'}},{id:'b',data:{address:'456 Main'}},{id:'c',data:{address:''}}];
 const records=[{id:'inquiry:a',inquiryId:'a'}];
 assert.deepEqual(missingPropertyInquiries(inquiries,records).map(i=>i.id),['b']);
});
test('recovery recognizes legacy records by deterministic ID',()=>{
 assert.deepEqual(missingPropertyInquiries([{id:'a',data:{address:'123 Main'}}],[{id:'inquiry:a'}]),[]);
});
