import { verifySession } from '@lib/session';
import { NextResponse } from 'next/server';

function logRequest(method, requestType, pathname, middlewareOutcome) {
    console.log(`[${method}] [${requestType}] ${pathname} -> [${middlewareOutcome}]`);
}

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    const publicPaths = ["/"];
    const authPaths = ["/auth/signup", "/auth/login"]; // Paths where authentication is handled

    let requestType = "UNKNOWN";
    if (publicPaths.includes(pathname)) {
        requestType = "PUBLIC_PATH";
    } else if (authPaths.includes(pathname)) {
        requestType = "AUTH_PATH";
    } else {
        // Assume all other paths are protected by default
        requestType = "PROTECTED_PATH";
    }

    if (publicPaths.includes(pathname)) {
        logRequest(method, requestType, pathname, "ALLOWED");
        return NextResponse.next();
    }

    const { isAuth } = await verifySession();

    // If authenticated and trying to access auth paths, redirect to home
    if (isAuth && authPaths.includes(pathname)) {
        logRequest(method, requestType, pathname, "REDIRECTED_HOME");
        const homeUrl = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
    }

    // If not authenticated and NOT on an auth path, redirect to login
    if (!isAuth && !authPaths.includes(pathname)) {
        logRequest(method, requestType, pathname, "REDIRECTED_LOGIN");
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // For all other cases (e.g., authenticated user accessing protected paths,
    // or unauthenticated user on an auth path), allow the request to proceed.
    logRequest(method, requestType, pathname, "ALLOWED");
    return NextResponse.next();
}

export const config = {
    // Match all paths except for static files (like /_next/static, /favicon.ico)
    // and public files (like /public/images).
    // This regex matches all paths that start with '/' but not '/_next/...' or '/api/...'
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};