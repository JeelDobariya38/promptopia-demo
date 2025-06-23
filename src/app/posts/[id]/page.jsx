import PostCard from "@components/postcard"
import prisma from "@lib/prisma";

export const metadata = {
    title: "Posts | Promptopia",
    description: "Discover & Share AI Prompts"
};

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
    const { id } = await params;

    let post = await prisma.posts.findFirst({
        where: {
            id,
        },
    });

    return post? <PostCard post={post} /> : <h1>Post with id=({id}) Not Found!!!</h1>;
}
