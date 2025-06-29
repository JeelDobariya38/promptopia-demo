import { verifySession } from '@lib/session';
import { NextResponse } from 'next/server';


export async function middleware(request) {
    const { pathname } = request.nextUrl;

    const publicPaths = ['/auth/signup', '/auth/login', "/"];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const { isAuth } = await verifySession();

    if (!isAuth) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // Match all paths except for static files (like /_next/static, /favicon.ico)
    // and public files (like /public/images).
    // This regex matches all paths that start with '/' but not '/_next/...' or '/api/...'
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};