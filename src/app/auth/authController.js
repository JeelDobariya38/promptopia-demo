'use server';

import prisma from "@lib/prisma";
import { createSession, deleteSession } from "@lib/session";
import { permanentRedirect, redirect } from "next/navigation";


export async function getUserById(id) {
    let user = await prisma.users.findUnique({
        where: {
            id,
        },
    });

    return user;
}

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

    await createSession(user.id);
    return permanentRedirect("/");
}

export async function Login(formData) {
    let username = formData.get('username');
    let password = formData.get('password');

    let user = await prisma.users.findFirst({
        where: {
            username,
        },
    });

    if (!user) {
        return redirect("/auth/login?message=invalid-username")
    }

    if (user.password == password) {
        await createSession(user.id);
        return permanentRedirect("/");
    }

    return redirect("/auth/login?message=invalid-password");
}
