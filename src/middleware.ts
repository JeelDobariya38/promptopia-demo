import { verifySession, type VerifySessionResult } from '@/lib/session';
import { NextResponse, NextRequest } from 'next/server';


function logRequest(method: string, requestType: string, pathname: string, middlewareOutcome: string): void {
    if (process.env.LOGGING == "verbose") {
        console.log(`[${method}] [${requestType}] ${pathname} -> [${middlewareOutcome}]`);
    }
}


export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } : { pathname: string } = request.nextUrl;
    const method: string = request.method;

    const publicPaths: string[] = ["/", "/api/session"];
    const authPaths: string[] = ["/auth/signup", "/auth/login"]; // Paths where authentication is handled

    if (publicPaths.includes(pathname)) {
        logRequest(method, "PUBLIC_PATH", pathname, "ALLOWED");
        return NextResponse.next();
    }

    const { isAuth } : VerifySessionResult = await verifySession();

    // If authenticated and trying to access auth paths, redirect to home
    if (isAuth && authPaths.includes(pathname)) {
        logRequest(method, "AUTH_PATH", pathname, "REDIRECTED_HOME");
        const homeUrl: URL = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
    }

    // If not authenticated and NOT on an auth path, redirect to login
    if (!isAuth && !authPaths.includes(pathname)) {
        logRequest(method, "PROTECTED_PATH", pathname, "REDIRECTED_LOGIN");
        const loginUrl: URL = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // For all other cases (e.g., authenticated user accessing protected paths,
    // or unauthenticated user on an auth path), allow the request to proceed.
    logRequest(method, "PROTECTED_PATH", pathname, "ALLOWED");
    return NextResponse.next();
}


export const config = {
    // Match all paths except for static files (like /_next/static, /favicon.ico)
    // and public files (like /public/images).
    // This regex matches all paths that start with '/' but not '/_next/...' or '/api/...'
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
