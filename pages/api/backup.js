import {requireOwner,apiError} from '../../lib/auth.mjs';
import {companyBackup} from '../../lib/company-backup.mjs';
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{await requireOwner(req);if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).end();}const backup=await companyBackup();res.setHeader('Content-Disposition','attachment; filename="baruch-ermi-company-backup.json"');return res.json(backup);}catch(e){apiError(res,e);}}
