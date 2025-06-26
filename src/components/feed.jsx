import Link from "next/link";
import PostCard from "@components/postcard";

export default function Feed({ posts }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {posts
        ? posts.map((post) => (
            <div key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block sm:w-100 sm:h-100 w-50 h-50"
              >
                <PostCard post={post} />
              </Link>
            </div>
          ))
        : undefined}
    </div>
  );
}
