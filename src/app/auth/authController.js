'use server';

import prisma from "@lib/prisma";
import { permanentRedirect } from "next/navigation";


export async function Signup(formData) {
    let username = formData.get('username');
    let email = formData.get('email');
    let password = formData.get('password');
    // sigin logic
    permanentRedirect("/");
}

export async function Login(formData) {
    let username = formData.get('username');
    let password = formData.get('password');
    // login logic
    permanentRedirect("/");
}

export async function Logout(formData) {
    // logout logic
    permanentRedirect("/");
}
