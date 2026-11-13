import test from 'node:test';
import assert from 'node:assert/strict';
import {matchLabel,normalizedName,probateNames,rankParcelCandidates,scoreOwnerCandidate} from '../lib/property-match-core.mjs';

test('extracts decedent names from raw parties, titles, and summary imports',()=>{assert.deepEqual(probateNames({parties:[{role:'Petitioner',name:'Not Subject'},{role:'Decedent',name:'Robert Allen Cross'}],titles:['ROBERT ALLEN CROSS'],summaries:[{raw:{decedent:'ROBERT ALLEN CROSS'}}]}),['Robert Allen Cross','ROBERT ALLEN CROSS']);assert.deepEqual(probateNames({parties:[],titles:[],summaries:[{raw:{decedent:'HELGA L MILES'}}]}),['HELGA L MILES']);});
test('normalizes estate labels without inventing identity',()=>{assert.equal(normalizedName('Estate of Robert Allen Cross, Deceased'),'ROBERT ALLEN CROSS');});
test('ranks only owner candidates with matching first and last names',()=>{const rows=[{parcelid:'1',owner:'CROSS ROBERT ALLEN'},{parcelid:'2',owner:'ROBERT CROSS ET AL'},{parcelid:'3',owner:'ROBERT DIFFERENT'},{parcelid:'4',owner:'ALLEN CROSS'}];const ranked=rankParcelCandidates('Robert Allen Cross',rows);assert.deepEqual(ranked.map(row=>row.parcelid),['1','2']);assert.equal(ranked[0].score,98);assert.equal(ranked[1].score,78);});
test('confidence labels remain review language',()=>{assert.equal(matchLabel(98),'Strong name match');assert.equal(matchLabel(78),'Review name match');assert.equal(scoreOwnerCandidate('Robert Cross','Robert Cross').score,98);});
