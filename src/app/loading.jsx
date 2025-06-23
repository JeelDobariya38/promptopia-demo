import NavigationBar from "@components/navigationbar";
import PostCard from "@components/postcard";

export default function Loading() {
    let dummypost = {
        "name": "Jeel Dobariya",
        "email": "Idk@idonotknow",
        "prompt": "Radhe Radhe!!!",
        "tags": "#radhe #krishna",
        "created_at": "2025-06-22T07:53:24.978Z"
    };

    return (
        <section className="text-center">
            <NavigationBar />
            <PostCard post={dummypost} />
        </section>
    )
}
