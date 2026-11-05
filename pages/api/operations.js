import {requireOwner,requireOrigin,apiError} from '../../lib/auth.mjs';
import {readOperations,changeOperations,operationLinks} from '../../lib/operations.mjs';
export const config={api:{bodyParser:{sizeLimit:'32kb'}}};
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{const session=await requireOwner(req);if(req.method==='GET'){const [workspace,links]=await Promise.all([readOperations(),operationLinks()]);return res.json({workspace,links});}if(req.method==='POST'){requireOrigin(req);return res.json({workspace:await changeOperations(req.body,session.user.email)});}res.setHeader('Allow','GET, POST');return res.status(405).end();}catch(e){apiError(res,e);}}
