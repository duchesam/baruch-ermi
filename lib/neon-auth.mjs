import {createAuthServer,extractNeonAuthCookies} from '@neon/auth/server';

export function neonAuthEnabled(){return Boolean(process.env.NEON_AUTH_BASE_URL);}
export function neonConfig(){
 const baseUrl=process.env.NEON_AUTH_BASE_URL, cookieSecret=process.env.NEON_AUTH_COOKIE_SECRET;
 if(!baseUrl||!cookieSecret||cookieSecret.length<32)throw Object.assign(new Error('Neon sign-in is awaiting configuration.'),{status:503});
 return {baseUrl,cookieSecret,sessionDataTtl:1};
}
export function authorizeNeonOwner(session){
 if(!process.env.OWNER_EMAIL)throw Object.assign(new Error('Owner access is awaiting configuration.'),{status:503});
 if(!session?.user?.emailVerified||session.user.email.toLowerCase()!==process.env.OWNER_EMAIL.toLowerCase())throw Object.assign(new Error('Sign in with your verified authorized company account.'),{status:401});
 return session;
}
export async function neonOwnerSession(req){
 const config=neonConfig();
 const headers=new Headers(req.headers);
 if(!extractNeonAuthCookies(headers))return authorizeNeonOwner(null);
 const server=createAuthServer({...config,context:()=>({
  getCookies:()=>extractNeonAuthCookies(headers),
  setCookie:()=>{},
  getHeader:name=>headers.get(name),
  getOrigin:()=>headers.get('origin')||process.env.BETTER_AUTH_URL||'',
  getFramework:()=> 'nextjs-pages',
 })});
 const {data,error}=await server.getSession();
 if(error)throw Object.assign(new Error('Neon sign-in is temporarily unavailable.'),{status:503});
 return authorizeNeonOwner(data);
}
