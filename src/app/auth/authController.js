'use server';

import prisma from "@lib/prisma";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";


export async function Signup(formData) {
    let username = formData.get('username');
    let email = formData.get('email');
    let password = formData.get('password');

    // Validation
    let user = await prisma.users.findUnique({
        where: {
            username,
        },
    });

    if (user) {
        return redirect("/auth/signup?message=user-already-exists");
    }

    // Creation
    user = await prisma.users.create({
        data: {
            username,
            email,
            password
        }
    });

    if (user) {
        const cookieStore = await cookies();
        cookieStore.set("user-id", user.id, { secure: true, httpOnly: true, sameSite: "strict" });
    }

    permanentRedirect("/");
}

export async function Login(formData) {
    let username = formData.get('username');
    let password = formData.get('password');

    let user = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email: username,
                },
            ],
        },
    });

    if (user.password == password) {
        const cookieStore = await cookies();
        cookieStore.set("user-id", user.id, { secure: true, httpOnly: true, sameSite: "strict" });
        return permanentRedirect("/");
    }

    return redirect("/auth/login?message=invalid-username-or-password")
}

export async function Logout(formData) {
    const cookieStore = await cookies();
    cookieStore.delete("user-id");
    permanentRedirect("/");
}
