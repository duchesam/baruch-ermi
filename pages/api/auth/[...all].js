import {toNodeHandler} from 'better-auth/node';
import {getAuth,apiError} from '../../../lib/auth.mjs';
import {handleAuthProxyRequest} from '@neon/auth/server';
import {neonAuthEnabled,neonConfig} from '../../../lib/neon-auth.mjs';
export const config={api:{bodyParser:false}};
export default async function handler(req,res){try{
 res.setHeader('Cache-Control','private, no-store');
 if(!neonAuthEnabled())return await toNodeHandler(getAuth())(req,res);
 const path=req.query.all.join('/');
 // Managed Auth may create an account through verified Google sign-in. It never grants CRM access by itself.
 if(path.startsWith('sign-up'))return res.status(403).json({error:'Public registration is disabled.'});
 const headers=new Headers();for(const [key,value] of Object.entries(req.headers))if(value!==undefined)headers.set(key,Array.isArray(value)?value.join(', '):value);
 const origin=process.env.BETTER_AUTH_URL||'http://localhost:3000';
 const options={method:req.method,headers};
 if(!['GET','HEAD'].includes(req.method)){const chunks=[];let size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>65536)return res.status(413).json({error:'Request is too large.'});chunks.push(Buffer.from(chunk));}options.body=Buffer.concat(chunks);}
 const response=await handleAuthProxyRequest({...neonConfig(),request:new Request(new URL(req.url,origin),options),path});
 for(const [key,value]of response.headers)if(!['set-cookie','content-length','content-encoding'].includes(key))res.setHeader(key,value);
 const cookies=response.headers.getSetCookie();if(cookies.length)res.setHeader('Set-Cookie',cookies);
 res.status(response.status);return res.end(Buffer.from(await response.arrayBuffer()));
 }catch(e){apiError(res,e);}}
