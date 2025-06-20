import { PostCard } from "@components/postcard"
import prisma from "@lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
    const { id } = await params;
    let postid = parseInt(id);
    let post = await prisma.posts.findFirst({
        where: {
            id: postid,
        },
    });

    return <PostCard post={post} />
}
