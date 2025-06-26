import { SubmitButton } from '@components/submitbutton';
import Link from 'next/link';
import { Signup } from '@app/auth/authController';


export const metadata = {
    title: "Create Account | Promptopia"
};

export default function SignupPage() {
    return (
        <section className="md:w-1/2 w-full">
            <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
                <h1 className="text-orange-500 red_bule_gradient py-2">Create Account | Sign Up</h1>
                <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-400">It only takes 5 seconds!!</p>
            </div>

            <div className="my-5 p-4 rounded-4xl bg-slate-800">
                <form className="flex flex-col gap-3 sm:text-lg text-sm" action={Signup}>
                    <div>
                        <label htmlFor="username">New Username:</label>
                        <input id="username" name="username" type="text" placeholder="Enter your new username" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <div>
                        <label htmlFor="email">New Email:</label>
                        <input id="email" name="email" type="email" placeholder="Enter your email" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <div>
                        <label htmlFor="password">New Password:</label>
                        <input id="password" name="password" type="password" placeholder="Enter your new password" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <SubmitButton value="Create Account" />
                </form>

                <div>
                    <p>Have a account already? <Link href="/auth/login">Login</Link>.</p>
                </div>
            </div>
        </section>
    )
}
