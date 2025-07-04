"use client";

import Feed from "./feed";
import { useState, useEffect } from "react";

// Debounce hook (800ms delay)
function useDebounce(value, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function FeedWithSearch({ initialPosts }) {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) {
      setPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(query) ||
          post.tags.toLowerCase().includes(query)
      );
      setPosts(filtered);
    }
  }, [debouncedSearch, initialPosts]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="w-full mt-8 mb-6">
        <input
          type="text"
          placeholder="Search for prompts or tags..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
        />
      </div>

      <Feed posts={posts} showfull={true} showdetails={false} />
    </div>
  );
}
