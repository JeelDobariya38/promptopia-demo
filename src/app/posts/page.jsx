import NavigationBar from "@components/navigationbar";
import { getPosts } from "@app/posts/postController";
import FeedWithSearch from "@components/feedwithsearch";


export const metadata = {
    title: "Posts | Promptopia"
};

export const dynamic = 'force-dynamic';

export default async function Home() {
    let posts = await getPosts();

    return (
        <section className="text-center">
            <NavigationBar />
            <FeedWithSearch initialPosts={ posts } />
        </section>
    )
}
