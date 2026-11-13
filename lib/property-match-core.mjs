const text=value=>typeof value==='string'?value.trim():'';
const unique=values=>[...new Set(values.filter(Boolean))];

export function probateNames(caseRecord){
 const partyNames=(caseRecord?.parties||[]).filter(p=>/decedent|deceased/i.test(p.role)).map(p=>text(p.name));
 const summaryNames=(caseRecord?.summaries||[]).flatMap(summary=>Object.entries(summary.raw||{}).filter(([key])=>/^(decedent|decedentname|decendentname)$/i.test(key)).map(([,value])=>text(value)));
 return unique([...partyNames,...(caseRecord?.titles||[]).map(text),...summaryNames]);
}

export function normalizedName(value){
 return text(value).toUpperCase().replace(/\b(ESTATE OF|EST OF|THE ESTATE OF|DECEASED|DECD|ET AL|ET UX|ET VIR)\b/g,' ').replace(/[^A-Z0-9' -]/g,' ').replace(/\b(JR|SR|II|III|IV)\b/g,' ').replace(/\s+/g,' ').trim();
}

const tokens=value=>normalizedName(value).split(' ').filter(token=>token.length>1);

export function scoreOwnerCandidate(subject,owner){
 const subjectTokens=tokens(subject),ownerTokens=tokens(owner);if(subjectTokens.length<2||ownerTokens.length<2)return {score:0,reason:'Insufficient name evidence'};
 const first=subjectTokens[0],last=subjectTokens.at(-1),hasFirst=ownerTokens.includes(first),hasLast=ownerTokens.includes(last);
 const overlap=subjectTokens.filter(token=>ownerTokens.includes(token)).length;
 if(!hasFirst||!hasLast)return {score:0,reason:'First and last name do not both match'};
 if(overlap===subjectTokens.length&&ownerTokens.length===subjectTokens.length)return {score:98,reason:'All owner-name tokens match'};
 if(overlap===subjectTokens.length)return {score:92,reason:'All estate-name tokens appear in the county owner field'};
 if(overlap>=3)return {score:86,reason:'First, last, and an additional name token match'};
 return {score:78,reason:'First and last name match; manual review required'};
}

export function rankParcelCandidates(subject,rows){
 return rows.map(row=>({...row,...scoreOwnerCandidate(subject,row.owner)})).filter(row=>row.score>=70).sort((a,b)=>b.score-a.score||a.parcelid.localeCompare(b.parcelid)).slice(0,20);
}

export function matchLabel(score){return score>=90?'Strong name match':'Review name match';}
