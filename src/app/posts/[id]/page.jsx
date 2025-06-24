import { getPost } from "@app/action";
import PostCard from "@components/postcard";

export const metadata = {
    title: "Posts | Promptopia",
    description: "Discover & Share AI Prompts"
};

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
    const { id } = await params;

    let post = await getPost(id);

    return post? <PostCard post={post} /> : <h1>Post with id=({id}) Not Found!!!</h1>;
}
