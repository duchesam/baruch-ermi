import {betterAuth} from 'better-auth';
import {database,configured} from './db.mjs';
import {neonAuthEnabled,neonOwnerSession} from './neon-auth.mjs';
let auth;
export function getAuth({bootstrap=false}={}){
 if(!configured() || !process.env.BETTER_AUTH_SECRET || !process.env.OWNER_EMAIL)throw Object.assign(new Error('Workspace sign-in is awaiting configuration.'),{status:503});
 if(auth&&!bootstrap)return auth;
 const instance=betterAuth({secret:process.env.BETTER_AUTH_SECRET,baseURL:process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL?'https://'+process.env.VERCEL_URL:'http://localhost:3000'),database:database().auth,emailAndPassword:{enabled:true,disableSignUp:!bootstrap,minPasswordLength:12},rateLimit:{enabled:true,storage:'database',window:60,max:20},session:{expiresIn:60*60*8,updateAge:60*60},advanced:{useSecureCookies:process.env.NODE_ENV==='production' && !process.env.LOCAL_DATABASE_PATH}});
 if(!bootstrap)auth=instance;return instance;
}
export async function requireOwner(req){if(neonAuthEnabled())return neonOwnerSession(req);const session=await getAuth().api.getSession({headers:new Headers(req.headers)});if(!session || session.user.email.toLowerCase()!==process.env.OWNER_EMAIL.toLowerCase())throw Object.assign(new Error('Sign in with your authorized company account.'),{status:401});return session;}
export async function protectPage(ctx){ctx.res.setHeader('Cache-Control','private, no-store');try{await requireOwner(ctx.req);return {props:{}};}catch(e){if(e.status===401)return {redirect:{destination:'/sign-in',permanent:false}};return {redirect:{destination:'/sign-in?setup=required',permanent:false}};}}
export function requireOrigin(req){const origin=req.headers.origin;const host=req.headers.host;if(!origin||!/^https?:\/\//.test(origin)||new URL(origin).host!==host)throw Object.assign(new Error('Request origin is not permitted.'),{status:403});}
export function apiError(res,error){const status=Number(error.status)||((error.code==='42P01'||/no such table/.test(error.message))?503:500);res.status(status).json({error:status<500?error.message:status===503?'Workspace configuration is required. Please contact the company directly.':'The request could not be saved. Please try again.'});}
