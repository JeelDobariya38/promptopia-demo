import Link from 'next/link';
import PostCard from "@components/postcard";

export default function Feed({ posts }) {
    return (
        <div>
            {
                posts ? (
                    posts.map(post => (
                        <Link key={post.id} href={`/posts/${post.id}`} className="block">
                            <PostCard post={post} />
                        </Link>
                    ))
                ): undefined
            }
        </div>
    )
}
