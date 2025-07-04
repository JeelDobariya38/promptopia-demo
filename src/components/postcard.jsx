import { deletePostForm } from "@app/posts/postController";
import Link from "next/link";
import { SubmitButton } from "./submitbutton";

export default function PostCard({ post, details }) {
  post.prompt.replace(/(?:\r\n|\r|\n)/g, "<br />");

  return (
    <div className="w-full h-full overflow-hidden border rounded-lg shadow-md sm:p-4 p-2 bg-slate-950 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <h2 className="text-2xl sm:text-3xl text-sky-600 font-black mb-4 break-words">
        {post.title}
      </h2>

      <div className="text-base sm:text-lg rounded bg-slate-800 text-gray-200 mb-2 p-3 sm:p-4 preserve-lines break-words">
        {post.prompt}
      </div>

      <p className="text-gray-500 text-xs sm:text-sm mb-1 break-words">
        <span className="font-medium">Tags: </span> {post.tags}
      </p>

      {!details && (
        <p className="text-gray-500 text-xs sm:text-sm mb-1 break-words">
          <span className="font-medium">Written By: </span>
          {post.author.username}
        </p>
      )}

      {details && (
        <>
          <p className="text-gray-500 text-[10px] sm:text-xs break-words">
            <span className="font-medium">Created: </span>{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="my-2 flex flex-col flex-row gap-2">
            <Link
              className="blue_btn inline-block w-full sm:w-auto text-center"
              prefetch={false}
              href={`/posts/${post.id}/edit`}
            >
              Edit
            </Link>

            <form action={deletePostForm} className="w-full sm:w-auto">
              <input type="hidden" name="postid" defaultValue={post.id} />
              <SubmitButton value="Delete" className="w-full sm:w-auto" />
            </form>
          </div>
        </>
      )}
    </div>
  );
}
