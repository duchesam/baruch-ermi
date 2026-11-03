import test from 'node:test';import assert from 'node:assert/strict';import {parseCSV,normalize,mergeRecords,key,csvCell,ready,safeURL} from './assets/logic.mjs';
test('CSV preserves quoted commas and multiline notes',()=>{const r=parseCSV('address,city,notes\r\n"12 Main, Unit 2",Tampa,"first\nsecond"');assert.equal(r[0].address,'12 Main, Unit 2');assert.equal(r[0].notes,'first\nsecond');});
test('Malformed CSV fails instead of dropping fields',()=>{assert.throws(()=>parseCSV('address,city\n"unfinished,Tampa'));assert.throws(()=>parseCSV('address,city\n1 Main'));});
test('Name alone does not create match',()=>{const a=normalize({address:'1 Main',owner:'Smith'}),b=normalize({address:'1 Main',owner:'Smith'});assert.notEqual(key(a),key(b));});
test('Parcel matching combines signals and flags conflicting owners',()=>{const a=normalize({parcelid:'ABC',address:'1 Main',owner:'A',probate:'yes'}),b=normalize({parcelid:'ABC',owner:'B',vacant:'true'});const r=mergeRecords([a],[b]);assert.equal(r.records.length,1);assert.deepEqual(r.records[0].signals,['Probate','Vacancy']);assert.match(r.records[0].notes,/conflict/);});
test('Sample records cannot be outreach ready',()=>{assert.equal(ready({demo:true,checks:{a:true},verifiedAt:new Date().toISOString()}),false);});
test('Old verification expires',()=>{assert.equal(ready({demo:false,checks:{a:true},verifiedAt:'2020-01-01'}),false);});
test('Unsafe links and spreadsheet formulas are neutralized',()=>{assert.equal(safeURL('javascript:alert(1)'), '');assert.equal(csvCell('=SUM(A1)'), '"\'=SUM(A1)"');});
test('Address matching preserves units',()=>{assert.notEqual(key(normalize({address:'1 Main Unit 1',city:'Tampa'})),key(normalize({address:'1 Main Unit 2',city:'Tampa'})));});

test('Do not contact records stay excluded',()=>{assert.equal(ready({demo:false,stage:'Do not contact',checks:{ownership:true,authority:true,status:true,mail:true},verifiedAt:new Date().toISOString()}),false);});
