import 'server-only';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type SessionPayload = JWTPayload & {
    userId: string;
    expiresAt: Date;
  };

export type VerifySessionResult = {
    isAuth: true;
    userId: string;
  } | {
    isAuth: false;
  };


// Ensure SESSION_SECRET is defined in your .env and accessible
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error('SESSION_SECRET environment variable is not set.');
}

const encodedKey = new TextEncoder().encode(secretKey);


async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

async function decrypt(session: string): Promise<SessionPayload | undefined> {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as SessionPayload;
    } catch (error) {
        return undefined;
    }
}

export async function createSession(userId: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function verifySession(): Promise<VerifySessionResult> {
    const cookie = (await cookies()).get('session')?.value;

    if (cookie) {
        const session = await decrypt(cookie);

        if (session && session.userId) {
            return { isAuth: true, userId: session.userId };
        }
    }

    return { isAuth: false };
};

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getUserID(): Promise<string> {
    let session = await verifySession();

    if (session.isAuth) {
        return session.userId;
    }

    redirect("/auth/login");
};
