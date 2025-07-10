import Feed from "@/components/feed";
import NavigationBar from "@/components/navigationbar";
import { getPosts } from "./posts/postController";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let posts = await getPosts(2);

  return (
    <section className="text-center">
      <NavigationBar />
      <Feed posts={posts} />
      <Link
        href="/posts"
        prefetch={false}
        className="my-3 blue_btn inline-block"
      >
        View More
      </Link>
    </section>
  );
}
