import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {readLeadAutomation,changeLeadAutomation} from '../../lib/lead-automation.mjs';
export const config={api:{bodyParser:{sizeLimit:'24kb'}}};
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{const session=await requireOwner(req);if(req.method==='GET')return res.json(await readLeadAutomation());if(req.method==='POST'){requireOrigin(req);return res.json(await changeLeadAutomation(req.body,session.user.email));}res.setHeader('Allow','GET, POST');return res.status(405).end();}catch(error){apiError(res,error);}}
