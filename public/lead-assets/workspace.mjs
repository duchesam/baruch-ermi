export * from './workspace-core.mjs';
import {validateWorkspace} from './workspace-core.mjs';
export function storageSession(){
 const initial=validateWorkspace(window.__BE_WORKSPACE__);let revision=initial.revision,queue=Promise.resolve(),locked=false;
 window.__BE_FLUSH__=()=>queue;
 return {initial,needsMigration:false,save(value){if(locked)throw Error('Cloud save is locked. Download a backup and reload before merging.');const next=validateWorkspace(value);next.savedAt=new Date().toISOString();queue=queue.then(async()=>{if(locked)throw Error('Previous save failed');const res=await fetch('/api/workspace',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({workspace:next,revision})});const data=await res.json();if(!res.ok)throw Error(data.error||'Save failed');revision=data.revision;const status=document.getElementById('storageStatus');if(status)status.textContent='Saved to company workspace · revision '+revision;}).catch(error=>{locked=true;const status=document.getElementById('storageStatus');if(status)status.textContent='NOT SAVED: '+error.message+' Download a backup before reloading.';window.__BE_SAVE_ERROR__=error.message;});return next;}};
}
