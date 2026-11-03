import {toNodeHandler} from 'better-auth/node';
import {getAuth,apiError} from '../../../lib/auth.mjs';
export const config={api:{bodyParser:false}};
export default async function handler(req,res){try{return await toNodeHandler(getAuth())(req,res);}catch(e){apiError(res,e);}}
