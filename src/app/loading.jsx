import NavigationBar from "@components/navigationbar";
import PostCard from "@components/postcard";

export default function Loading() {
    let dummypost = {
        "title": "Jeel Dobariya",
        "prompt": "Radhe Radhe!!!",
        "tags": "#radhe #krishna",
        "createdAt": "2025-06-22T07:53:24.978Z"
    };

    return (
        <section className="text-center">
            <NavigationBar />
            <PostCard post={dummypost} />
        </section>
    )
}
