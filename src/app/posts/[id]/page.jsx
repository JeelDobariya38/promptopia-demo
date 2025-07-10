import { getPost } from "@/app/posts/postController";
import { redirect } from "next/navigation";
import PostCard from "@/components/postcard";

export const metadata = {
  title: "Posts | Promptopia",
};

export const dynamic = "force-dynamic";

export default async function PostPage({ params }) {
  const { id } = await params;
  let post = await getPost(id);

  if (!post) {
    redirect("/");
  }

  return (
    <div className="w-1/2 min-w-3xs">
      <PostCard post={post} />
    </div>
  );
}
