import Link from "next/link";
import PostCard from "@components/postcard";

export default function Feed({ posts, showfull, showdetails }) {
  if (posts.length === 0 && showdetails) {
    return (
      <div className="my-4 flex justify-center gap-5">
        <Link href="/" prefetch={false} className="filled_blue_btn">
          Back Home
        </Link>
        <Link href="/posts/create" prefetch={false} className="filled_blue_btn">
          Create Post
        </Link>
      </div>
    );
  }

  let sizeClasses = "sm:w-100 sm:h-100 w-50 h-50";

  if (showfull) {
    sizeClasses = "w-full";
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {posts
        ? posts.map((post) => (
            <div key={post.id} className={`block ${sizeClasses}`}>
              {!showdetails ? (
                <Link href={`/posts/${post.id}`} prefetch={false}>
                  <PostCard post={post} details={showdetails} />
                </Link>
              ) : (
                <PostCard post={post} details={showdetails} />
              )}
            </div>
          ))
        : undefined}
    </div>
  );
}
