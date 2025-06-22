"use client";

import { PostCard } from "@components/postcard";
import { useEffect, useState } from "react";

export default function Feed() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((jsonres) => setPosts(jsonres.data));
    }, []);

    return (
        <div>
            {
                posts ? (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                ): undefined
            }
        </div>
    )
}
