export const STAGES=['New','Qualified','Underwriting','Offer','Under contract','Closed','Lost'];
export const CHECKS={ownership:'Ownership and seller authority reviewed',title:'Title / lien review recorded',numbers:'Underwriting and financing reviewed',contract:'Executed agreement confirmed',closing:'Closing statement reviewed'};
export const emptyOperations=()=>({version:1,revision:0,opportunities:[],tasks:[],activity:[]});
const fail=m=>{throw Object.assign(new Error(m),{status:400});};
function text(v,max=500,required=false){if(typeof v!=='string'||v.length>max||(required&&!v.trim()))fail('Enter valid text (maximum '+max+' characters).');return v.trim();}
function date(v){if(v==='')return '';if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v+'T12:00:00Z'))||new Date(v+'T12:00:00Z').toISOString().slice(0,10)!==v)fail('Enter a valid calendar date.');return v;}
export function applyOperation(current,command,{id,at,actor,links}){
 if(!command||typeof command!=='object')fail('Invalid operation.');
 const requestId=text(command.requestId,100,true);if(!/^[\w-]+$/.test(requestId))fail('Invalid request identifier.');
 if(current.activity.some(a=>a.requestId===requestId))return current;
 if(current.activity.length>=20000)fail('Export and archive activity before adding more records.');
 const next=structuredClone(current);const p=command.payload||{};let entityId='',summary='';
 if(command.type==='opportunity.create'){
  const linkType=p.linkType;if(!['property','inquiry'].includes(linkType))fail('Choose a property or inquiry.');
  const link=links.find(x=>x.type===linkType&&x.id===p.linkId);if(!link)fail('The linked record no longer exists. Reload the workspace.');
  if(next.opportunities.some(x=>x.linkType===linkType&&x.linkId===p.linkId))fail('This record already has an opportunity.');
  entityId=id;next.opportunities.push({id,linkType,linkId:link.id,title:link.label,source:link.source||'Unattributed',createdAt:at,updatedAt:at,stage:'New',responsible:text(p.responsible||'',100),nextAction:text(p.nextAction||'',500),nextDate:date(p.nextDate||''),firstResponseAt:'',checks:{},checkEvidence:{},amount:null,closedAt:'',lostReason:''});summary='Opportunity created';
 }else if(command.type==='opportunity.update'){
  const o=next.opportunities.find(x=>x.id===p.id);if(!o)fail('Opportunity not found.');entityId=o.id;
  if(p.responsible!==undefined)o.responsible=text(p.responsible,100);
  if(p.nextAction!==undefined)o.nextAction=text(p.nextAction,500);
  if(p.nextDate!==undefined)o.nextDate=date(p.nextDate);
  if(p.check!==undefined){if(!Object.hasOwn(CHECKS,p.check)||typeof p.checked!=='boolean')fail('Invalid diligence check.');const evidence=text(p.evidence||'',1000,p.checked);o.checks[p.check]=p.checked;o.checkEvidence[p.check]={note:evidence,at,actor};}
  if(p.stage!==undefined){if(!STAGES.includes(p.stage))fail('Invalid stage.');const gates=['Under contract','Closed'].includes(p.stage)?['ownership','title','numbers','contract']:[];if(p.stage==='Closed')gates.push('closing');if(gates.some(k=>!o.checks[k]))fail('Complete the required diligence checks with evidence before this stage.');
   if(p.stage==='Lost')o.lostReason=text(p.lostReason||'',500,true);
   if(p.stage==='Closed'){if(typeof p.amount!=='number'||!Number.isFinite(p.amount)||p.amount<=0||p.amount>1e10)fail('Enter the confirmed closing purchase price.');o.amount=p.amount;o.closedAt=at;}else{o.amount=null;o.closedAt='';}
   o.stage=p.stage;
  }
  if(['Under contract','Closed'].includes(o.stage)&&['ownership','title','numbers','contract',...(o.stage==='Closed'?['closing']:[])].some(k=>!o.checks[k]))fail('Move the opportunity to an earlier stage before removing a required check.');
  if(p.responded===true&&!o.firstResponseAt)o.firstResponseAt=at;
  o.updatedAt=at;summary=p.responded?'Manual response recorded':'Opportunity updated';
 }else if(command.type==='task.create'){
  const o=next.opportunities.find(x=>x.id===p.opportunityId);if(!o)fail('Choose an existing opportunity.');entityId=id;
  next.tasks.push({id,opportunityId:o.id,title:text(p.title,300,true),responsible:text(p.responsible||'',100),due:date(p.due||''),status:'Open',createdAt:at,completedAt:''});summary='Task created';
 }else if(command.type==='task.update'){
  const task=next.tasks.find(x=>x.id===p.id);if(!task||!['Open','Done'].includes(p.status))fail('Invalid task update.');entityId=task.id;task.status=p.status;task.completedAt=p.status==='Done'?at:'';summary='Task '+p.status.toLowerCase();
 }else if(command.type==='note.add'){
  if(!next.opportunities.some(x=>x.id===p.id))fail('Opportunity not found.');entityId=p.id;summary=text(p.note,2000,true);
 }else fail('Unknown operation.');
 next.revision=current.revision+1;next.activity.push({id,entityId,requestId,at,actor,type:command.type,summary,changes:structuredClone(p)});return next;
}
export function operationsReport(state,today=new Date().toISOString().slice(0,10)){
 const active=state.opportunities.filter(o=>!['Closed','Lost'].includes(o.stage));
 const bySource={};for(const o of state.opportunities){const s=bySource[o.source]??={source:o.source,total:0,closed:0,lost:0,responded:0};s.total++;s.closed+=o.stage==='Closed'?1:0;s.lost+=o.stage==='Lost'?1:0;s.responded+=o.firstResponseAt?1:0;}
 return {active:active.length,unassigned:active.filter(o=>!o.responsible).length,missingNext:active.filter(o=>!o.nextAction||!o.nextDate).length,overdue:state.tasks.filter(t=>t.status==='Open'&&t.due&&t.due<today).length,dueNext:active.filter(o=>o.nextDate&&o.nextDate<=today).length,unanswered:active.filter(o=>!o.firstResponseAt).length,closedVolume:state.opportunities.filter(o=>o.stage==='Closed').reduce((s,o)=>s+(o.amount||0),0),sources:Object.values(bySource)};
}
export function csvRows(rows){const cell=v=>{let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};return rows.map(row=>row.map(cell).join(',')).join('\r\n');}
