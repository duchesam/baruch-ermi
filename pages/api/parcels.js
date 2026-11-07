import {requireOwner,apiError} from '../../lib/auth.mjs';
import {collect,queryParams} from '../../lib/parcel-source.mjs';
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');try{await requireOwner(req);if(req.method!=='GET')return res.status(405).end();const url=new URL(req.url,'https://baruch-ermi.org');try{queryParams(url);}catch(e){e.status=400;throw e;}return res.json(await collect(url));}catch(e){apiError(res,e);}}
