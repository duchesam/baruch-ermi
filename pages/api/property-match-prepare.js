import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {prepareHighConfidenceResearch} from '../../lib/property-match-prepare.mjs';
export const config={api:{bodyParser:{sizeLimit:'8kb'}}};
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{const session=await requireOwner(req);if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).end();}requireOrigin(req);return res.json(await prepareHighConfidenceResearch(req.body,session.user.email));}catch(error){apiError(res,error);}}
