"use client";

import { useState, useEffect } from "react";
import type { PostWithUser } from "@/lib/prisma";

import Feed from "./feed";

/**
 * A custom React hook to debounce a value.
 * This hook delays updating the `debouncedValue` until a certain `delay` has passed
 * without the `value` changing. Useful for search inputs to prevent excessive re-renders or API calls.
 *
 * @param value The value to debounce (e.g., a search input string).
 * @param delay The time in milliseconds to wait before updating the debounced value (default is 800ms).
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number = 800): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the previous timer if the value changes before the delay
    // This ensures only the last value change triggers the update
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect only if 'value' or 'delay' changes

  return debouncedValue;
}

/**
 * Props expected by the FeedWithSearch component.
 * @property initialPosts - An array of posts to display initially and use for searching.
 */
type FeedWithSearchProps = {
  initialPosts: PostWithUser[];
};

/**
 * A component that displays a feed of posts with a search bar.
 * It filters posts based on user input, with a debounce delay for better performance.
 *
 * @param {FeedWithSearchProps} props - The component's properties.
 */
export default function FeedWithSearch({ initialPosts }: FeedWithSearchProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredPosts, setFilteredPosts] =
    useState<PostWithUser[]>(initialPosts);

  // Apply the debounce hook to the searchText,
  // so searches are only processed after the user stops typing for 800ms.
  const debouncedSearchTerm = useDebounce<string>(searchText, 800);

  // Effect to filter posts whenever the debounced search term or initial posts change.
  useEffect(() => {
    const query = debouncedSearchTerm.trim().toLowerCase();

    if (!query) {
      setFilteredPosts(initialPosts);
    } else {
      const newFilteredPosts = initialPosts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(query) ||
          post.tags.toLowerCase().includes(query)
      );
      setFilteredPosts(newFilteredPosts);
    }
  }, [debouncedSearchTerm, initialPosts]);

  /**
   * Handles changes to the search input field.
   * Updates the `searchText` state as the user types.
   * @param event - The change event from the input element.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
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

      {/* Render the Feed component with the filtered posts */}
      <Feed posts={filteredPosts} showfull={true} showdetails={false} />
    </div>
  );
}
