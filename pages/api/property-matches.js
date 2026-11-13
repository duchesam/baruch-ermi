import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {findPropertyMatches,selectPropertyCandidate} from '../../lib/property-matches.mjs';
export const config={api:{bodyParser:{sizeLimit:'12kb'}}};
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{const session=await requireOwner(req);if(req.method==='GET'){const caseId=String(req.query.caseId||'');return res.json(await findPropertyMatches(caseId));}if(req.method==='POST'){requireOrigin(req);return res.json(await selectPropertyCandidate(req.body,session.user.email));}res.setHeader('Allow','GET, POST');return res.status(405).end();}catch(error){apiError(res,error);}}
