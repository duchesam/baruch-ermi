import {useEffect,useMemo,useState} from 'react';

const STATUS_OPTIONS=['All','Research required','Compliance review','Ready for mail approval','Approved for mail','Responded','Suppressed'];
const emptyReview={representativeStatus:'unverified',mailingAddressStatus:'unverified',dncNational:'not-screened',dncFlorida:'not-screened',responseStatus:'none',contactSource:'',contactVerifiedAt:'',notes:''};

export default function LeadAutomationWorkspace(){
 const [data,setData]=useState(null),[selected,setSelected]=useState(''),[filter,setFilter]=useState('All'),[search,setSearch]=useState(''),[error,setError]=useState(''),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 async function load(){setBusy(true);try{const response=await fetch('/api/lead-automation');const body=await response.json();if(!response.ok)throw Error(body.error);setData(body);setError('');if(selected&&!body.leads.some(lead=>lead.caseId===selected))setSelected('');}catch(cause){setError(cause.message);}finally{setBusy(false);}}
 useEffect(()=>{load();},[]);
 async function save(review){setBusy(true);setError('');setNotice('');try{const response=await fetch('/api/lead-automation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision:data.revision,review})});const body=await response.json();if(!response.ok)throw Error(body.error);setData(body);setNotice(review.approveMail?'Mail review approved. No message or letter was sent.':'Lead review saved. No outreach was sent.');}catch(cause){setError(cause.message);}finally{setBusy(false);}}
 const leads=useMemo(()=>data?.leads.filter(lead=>(filter==='All'||lead.status===filter)&&(`${lead.caseNumber} ${lead.name} ${lead.propertyLabel}`).toLowerCase().includes(search.toLowerCase()))||[],[data,filter,search]);
 const lead=data?.leads.find(item=>item.caseId===selected);
 if(!data)return <section className="lead-auto-loading"><p role={error?'alert':'status'}>{error||'Loading probate automation…'}</p><button onClick={load}>Retry</button></section>;
 const m=data.metrics;
 return <div className="lead-auto">
  <header className="lead-auto-hero"><div><span className="eyebrow">PROBATE ACQUISITION WORKFLOW</span><h1>Evidence first.<br/><span>Every case routed.</span></h1><p>Qualify the imported cases, verify the property and representative, complete compliance screening, and approve mail without activating automated outreach.</p></div><aside><strong>Outbound controls</strong><span>Calls, SMS, email, ringless voicemail, paid enrichment, and automatic mail fulfillment are disabled.</span></aside></header>
  <p className="lead-auto-feedback" role={error?'alert':'status'}>{error||notice}</p>
  <section className="lead-auto-metrics">{[[m.total,'Imported cases'],[m.research,'Research required'],[m.compliance,'Compliance review'],[m.ready,'Ready for mail approval'],[m.approved,'Mail approved'],[m.responded,'Responses recorded'],[m.suppressed,'Suppressed'],[m.highPriority,'Score 60+']].map(([number,label])=><article key={label}><strong>{number}</strong><span>{label}</span></article>)}</section>
  <p className="lead-auto-disclosure">Scores reflect documented research signals only. They do not establish seller motivation, legal authority, property value, or investment performance.</p>
  <div className="lead-auto-grid"><section className="lead-auto-panel"><div className="lead-auto-toolbar"><label>Search<input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Case, estate, or property"/></label><label>Workflow status<select value={filter} onChange={event=>setFilter(event.target.value)}>{STATUS_OPTIONS.map(option=><option key={option}>{option}</option>)}</select></label><button onClick={load} disabled={busy}>Refresh</button></div>
   <div className="lead-auto-queue" aria-label="Probate lead queue">{leads.map(item=><button key={item.caseId} className={selected===item.caseId?'is-selected':''} onClick={()=>setSelected(item.caseId)}><span><b>{item.caseNumber}</b><em>{item.status}</em></span><strong>{item.name}</strong><small>{item.propertyLabel||'No verified property link'} · {item.score}/100 · {item.band}</small></button>)}{!leads.length&&<p>No cases match this view.</p>}</div>
  </section><section className="lead-auto-panel">{lead?<LeadReview lead={lead} busy={busy} save={save}/>:<div className="lead-auto-empty"><span className="eyebrow">SELECT A CASE</span><h2>Work the next evidence gap.</h2><p>The system will show exactly which documented signals contributed to the score and will block mail approval until the required review fields are complete.</p></div>}</section></div>
 </div>;
}

function LeadReview({lead,busy,save}){
 const review={...emptyReview,...lead.review};
 return <><div className="lead-review-head"><div><span className="eyebrow">{lead.status}</span><h2>{lead.caseNumber}</h2><p>{lead.name} · {lead.classification||'Unclassified'}</p></div><div className="lead-score"><strong>{lead.score}</strong><span>/100</span><small>{lead.band}</small></div></div>
  <div className="lead-scorecard">{lead.rules.map(rule=><div key={rule.label} className={rule.met?'met':''}><span>{rule.met?'✓':'—'} {rule.label}</span><b>{rule.met?'+':''}{rule.met?rule.points:0}</b></div>)}</div>
  <p className="lead-property"><strong>Property link:</strong> {lead.propertyLabel||'Not verified. Complete the case-to-parcel research in Lead Desk first.'}</p>
  <form className="lead-review-form" key={lead.caseId+':'+review.updatedAt} onSubmit={event=>{event.preventDefault();save({caseId:lead.caseId,...Object.fromEntries(new FormData(event.currentTarget))});}}>
   <div><label>Estate representative<select name="representativeStatus" defaultValue={review.representativeStatus}><option value="unverified">Unverified</option><option value="researching">Researching</option><option value="verified">Verified with evidence</option></select></label><label>Mailing address<select name="mailingAddressStatus" defaultValue={review.mailingAddressStatus}><option value="unverified">Unverified</option><option value="researching">Researching</option><option value="verified">Verified with evidence</option></select></label></div>
   <div><label>National DNC screen<select name="dncNational" defaultValue={review.dncNational}><option value="not-screened">Not screened</option><option value="clear">Clear on screen date</option><option value="listed">Listed / suppress calls</option></select></label><label>Florida DNC screen<select name="dncFlorida" defaultValue={review.dncFlorida}><option value="not-screened">Not screened</option><option value="clear">Clear on screen date</option><option value="listed">Listed / suppress calls</option></select></label></div>
   <div><label>Contact-source reference<input name="contactSource" defaultValue={review.contactSource} maxLength={500} placeholder="Provider, public record, or source URL"/></label><label>Verification date<input type="date" name="contactVerifiedAt" defaultValue={review.contactVerifiedAt}/></label></div>
   <label>Response classification<select name="responseStatus" defaultValue={review.responseStatus}><option value="none">No response</option><option value="interested">Interested</option><option value="later">Follow up later</option><option value="represented">Represented by professional</option><option value="wrong-person">Wrong person</option><option value="sold">Property sold</option><option value="do-not-contact">Do not contact</option></select></label>
   <label>Research and review notes<textarea name="notes" defaultValue={review.notes} rows={4} maxLength={2000}/></label>
   <div className="lead-review-actions"><button disabled={busy}>Save review</button><button type="button" disabled={busy||Boolean(review.mailApprovedAt)} onClick={()=>save({caseId:lead.caseId,...review,approveMail:true})}>Approve mail review</button>{review.mailApprovedAt&&<button type="button" disabled={busy} onClick={()=>save({caseId:lead.caseId,revokeMail:true})}>Revoke approval</button>}</div>
  </form>
  {review.mailApprovedAt&&<p className="lead-approval">Approved by {review.mailApprovedBy} on {new Date(review.mailApprovedAt).toLocaleString()}. This approval did not send anything.</p>}
 </>;
}
