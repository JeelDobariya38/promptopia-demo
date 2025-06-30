import { verifySession } from "@lib/session";
import Link from "next/link";

export default async function NavigationBar() {
  let { isAuth } = await verifySession();

  return (
    <>
      <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
        <h1>Discover & Share Prompts</h1>
        <p className="text-orange-500 uppercase red_bule_gradient">
          AI Pompting Tool
        </p>
      </div>

      <div>
        <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-400">
          An open source, AI prompt shareing tool.
        </p>
      </div>

      {!isAuth && (
        <div className="my-4 flex justify-center gap-5">
          <Link href="/auth/login" prefetch={false} className="filled_blue_btn">
            Login
          </Link>
          <Link
            href="/auth/signup"
            prefetch={false}
            className="filled_blue_btn"
          >
            Create Account
          </Link>
        </div>
      )}

      {isAuth && (
        <div className="my-4 flex justify-center gap-5">
          <Link href="/profile" prefetch={false} className="filled_blue_btn">
            My Profile
          </Link>
          <Link
            href="/posts/create"
            prefetch={false}
            className="filled_blue_btn"
          >
            Create Post
          </Link>
        </div>
      )}
    </>
  );
}
