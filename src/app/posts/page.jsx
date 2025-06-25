import Feed from "@components/feed";
import NavigationBar from "@components/navigationbar";
import { getPosts } from "@app/posts/postController";


export const metadata = {
    title: "Posts | Promptopia"
};

export const dynamic = 'force-dynamic';

export default async function Home() {
    let posts = await getPosts();

    return (
        <section className="text-center">
            <NavigationBar />
            <Feed posts={ posts } />
        </section>
    )
}
