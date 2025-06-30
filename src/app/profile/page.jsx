import { getUserById } from "@app/auth/authController";
import Feed from "@components/feed";
import prisma from "@lib/prisma";
import { getUserID } from "@lib/session";
import Link from "next/link";

export const metadata = {
  title: "Profile | Promptopia",
};

export const dynamic = "force-dynamic";

export default async function Profile() {
  let userId = await getUserID();
  let user = await getUserById(userId);

  let posts = await prisma.posts.findMany({
    where: {
      userId,
    },
  });

  return (
    <section className="p-4 bg-gray-950 border-1 border-sky-800 rounded-lg preserve-lines">
      <div className="flex justify-left gap-4 my-2 py-2">
        <div>
          <img
            src="/profile.png"
            alt="profile"
            width={100}
            height={100}
            className="border-1 border-sky-400 rounded-2xl"
          />
        </div>
        <div className="text-pink-500">
          <h2 className="text-6xl font-black">{user.username}</h2>
          <p className="text-2xl">{user.email}</p>
          <p className="text-lg text-pink-100">
            Joined AT: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Feed posts={posts} showdetails={true} />

      <div className="py-4">
        <Link
          href="/auth/logout"
          prefetch={false}
          className="my-2 filled_red_btn"
        >
          Logout
        </Link>
      </div>
    </section>
  );
}
