import prisma from "@lib/prisma";
import Link from "next/link";

export default async function Home() {
    let posts = await prisma.posts.findMany();

    return (
        <section className="text-center">
            <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
                <h1 className="">Discover & Share Prompts</h1>
                <p className="text-orange-500 uppercase red_bule_gradient">AI Pompting Tool</p>
            </div>

            <div>
                <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-600">An open source, AI prompt shareing tool.</p>
            </div>
 
            <div className="my-4 flex justify-center gap-5">
                <Link href="/profile" className="filled_blue_btn">My Profile</Link>
                <Link href="/create" className="filled_blue_btn">Create Post</Link>
            </div>

            <div>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/${post.id}`}>
                            {post.prompt + " ------- " + post.name}
                        </Link>
                    </li>
                ))}
            </div>
        </section>
    )
}
