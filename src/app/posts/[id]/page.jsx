import { PostCard } from "@components/postcard"
import prisma from "@lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Posts | Promptopia",
    description: "Discover & Share AI Prompts"
};

export default async function Page({ params }) {
    const { id } = await params;

    let post = await prisma.posts.findFirst({
        where: {
            id,
        },
    });

    return <PostCard post={post} />
}
