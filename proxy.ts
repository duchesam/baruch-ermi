import {NextResponse, type NextRequest} from 'next/server';
import {createNeonAuth} from '@neon/auth/next/server';

export default async function proxy(request:NextRequest){
 if(!process.env.NEON_AUTH_BASE_URL)return NextResponse.next();
 const secret=process.env.NEON_AUTH_COOKIE_SECRET;
 if(!secret||secret.length<32)return NextResponse.redirect(new URL('/sign-in?setup=required',request.url));
 const auth=createNeonAuth({baseUrl:process.env.NEON_AUTH_BASE_URL,cookies:{secret,sessionDataTtl:1}});
 return auth.middleware({loginUrl:'/sign-in',publicRoutes:['/sign-in']})(request);
}
export const config={matcher:['/sign-in','/portal/:path*','/lead-desk/:path*','/creative-financing/:path*','/operations/:path*']};
