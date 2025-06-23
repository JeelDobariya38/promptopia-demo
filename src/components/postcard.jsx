export default function PostCard({ post }) {
    return (
        <div className="border rounded-lg shadow-md p-4 mb-4 bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
                <h2 className="text-xl font-semibold text-blue-700 hover:text-blue-800 mb-2">
                    {post.prompt}
                </h2>
                <p className="text-gray-700 mb-1">
                    <span className="font-medium">Author: </span> {post.name}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Email: </span> {post.email}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                    <span className="font-medium">Tags: </span> {post.tags}
                </p>
                <p className="text-gray-500 text-xs">
                    <span className="font-medium">Created: </span> {new Date(post.created_at).toLocaleDateString()}
                </p>
        </div>
    );
};
