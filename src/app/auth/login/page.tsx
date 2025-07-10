"use client";

import { SubmitButton } from "@/components/submitbutton";
import Link from "next/link";
import { Login } from "@/app/auth/authController";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <section className="md:w-1/2 w-full">
      <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
        <h1 className="text-orange-500 red_bule_gradient py-2">Login</h1>
        <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-400">
          Pleasure to see you back!!
        </p>
      </div>

      <div className="my-5 p-4 rounded-4xl bg-slate-800">
        {message && (
          <div className="mb-2 rounded-lg bg-slate-900 border-4 border-slate-950">
            <p className="text-lg text-center text-rose-700">
              Error: {message}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-3 sm:text-lg text-sm" action={Login}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600"
              required
            />
          </div>

          <SubmitButton value="Login" />
        </form>

        <div>
          <p>
            Don{"'"}t have a account?{" "}
            <Link href="/auth/signup" prefetch={false} className="text-sky-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
