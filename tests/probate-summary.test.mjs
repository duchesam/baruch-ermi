import test from 'node:test';
import assert from 'node:assert/strict';
import {parseProbateCSV,mergeCases,casePriority,summariesCSV} from '../public/lead-assets/probate-logic.mjs';
import {validateWorkspace} from '../public/lead-assets/workspace-core.mjs';
const csv='Case Number,Case Type,Decedent,Decedent Listed Address,Verification Status,Score,Other Party Addresses,Source Files\n26-CP-000001,Formal Administration,Fictional Decedent,"Fictional address, Tampa",NOT verified,8,"Unknown party address",';
const source={id:'fixture-digest:summary.csv',file:'summary.csv',importedAt:'2026-11-06T00:00:00Z'};
test('summary import preserves source fields without manufacturing parties or properties',()=>{
 const parsed=parseProbateCSV(csv,source);assert.equal(parsed.format,'case-summary');assert.equal(parsed.cases.length,1);
 const c=parsed.cases[0];assert.equal(c.parties.length,0);assert.equal(c.links.length,0);assert.equal(c.status,'Unmatched');assert.equal(c.summaries[0].raw.score,'8');assert.equal(casePriority(c,[]).score,0);
 const w=validateWorkspace({version:4,records:[],cases:parsed.cases,history:[],outreachSettings:{}});
 assert.equal(w.records.length,0);assert.match(summariesCSV(w.cases),/NOT verified/);
});
test('repeat summaries dedupe while changed sources survive and research remains intact',()=>{
 const first=mergeCases([],parseProbateCSV(csv,source).cases);first.cases[0].notes='Keep research';first.cases[0].status='Do not contact';
 const repeat=mergeCases(first.cases,parseProbateCSV(csv,source).cases);assert.equal(repeat.unchanged,1);assert.equal(repeat.cases[0].summaries.length,1);
 const changed=mergeCases(repeat.cases,parseProbateCSV(csv.replace('NOT verified','Still NOT verified'),{...source,id:'second'}).cases);
 assert.equal(changed.cases[0].summaries.length,2);assert.equal(changed.cases[0].notes,'Keep research');assert.equal(changed.cases[0].status,'Do not contact');
});
test('invalid case summaries reject rows and malformed persisted summaries fail validation',()=>{
 assert.equal(parseProbateCSV(csv.replace('26-CP-000001','bad'),source).issues.length,1);
 const cases=parseProbateCSV(csv,source).cases;cases[0].summaries[0].raw.score={unsafe:true};
 assert.throws(()=>validateWorkspace({version:4,records:[],cases,history:[],outreachSettings:{}}),/Invalid case summary/);
});
