import { deletePostForm } from "@app/action";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { SubmitButton } from "./submitbutton";

export default function PostCard({ post, details}) {
    return (
        <div className="w-full h-full overflow-hidden border rounded-lg shadow-md p-4 bg-slate-950 hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <h2 className="text-3xl text-sky-600 font-black mb-4">
                {post.title}
            </h2>
            <div className="text-lg rounded bg-slate-800 text-gray-200 mb-2 p-4">
                <ReactMarkdown>
                    {post.prompt}
                </ReactMarkdown>
            </div>
            <p className="text-gray-500 text-sm mb-1">
                <span className="font-medium">Tags: </span> {post.tags}
            </p>

            {details &&
                <>
                    <p className="text-gray-500 text-xs">
                        <span className="font-medium">Created: </span> {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <div className="my-2 flex gap-2">
                        <Link className="blue_btn inline-block" href={`/posts/${post.id}/edit`}>Edit</Link>

                        <form action={deletePostForm}>
                            <input type="hidden" name="postid" defaultValue={post.id} />
                            <SubmitButton value="Delete" />
                        </form>
                    </div>
                </>
            }
        </div>
    );
};
