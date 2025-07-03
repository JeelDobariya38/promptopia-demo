"use client";

import Feed from "./feed";
import { useState, useEffect, useCallback } from "react";
import { getPostsByTags } from "@app/posts/postController";

export default function FeedWithSearch({ initialPosts }) {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const fetchFilteredPosts = useCallback(async (query) => {
    setLoading(true);
    try {
      const searchResult = await getPostsByTags(query);
      setPosts(searchResult);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch when component mounts (or initialPosts change)
  // This ensures that if initialPosts come from the server and are filtered, they are displayed.
  // If you only want to display all posts initially and then filter on button click,
  // you can remove this useEffect. However, keeping it makes sense if initialPosts
  // might already be a result of some server-side pre-filtering.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    fetchFilteredPosts(searchText);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
      <div className="flex w-full mt-8 mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search for prompts or tags..."
          value={searchText}
          onChange={handleSearchChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
        />
        <button
          onClick={handleSearchClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && <Feed posts={posts} showdetails={false} />}
    </div>
  );
}
