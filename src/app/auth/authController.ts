"use server";

import { User } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUserById(id: string): Promise<User | null> {
  let user: User | null = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function Signup(formData: FormData): Promise<void> {
  let username: string | undefined = formData.get("username")?.toString();
  let email: string | undefined = formData.get("email")?.toString();
  let password: string | undefined = formData.get("password")?.toString();

  if (!username || !email || !password) {
    return redirect("/auth/signup?message=Some Fields Are Empty");
  }

  // Validation
  let user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    return redirect("/auth/signup?message=User Already Exists");
  }

  // Creation
  user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  await createSession(user.id);
  return redirect("/");
}

export async function Login(formData: FormData): Promise<void> {
  let username: string | undefined = formData.get("username")?.toString();
  let password: string | undefined = formData.get("password")?.toString();

  if (!username || !password) {
    return redirect("/auth/signup?message=Some Fields Are Empty");
  }

  let user: User | null = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return redirect("/auth/login?message=invalid-username");
  }

  if (user.password == password) {
    await createSession(user.id);
    return redirect("/");
  }

  return redirect("/auth/login?message=invalid-password");
}
