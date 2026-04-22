import React from "react";
import { useState, useEffect, useMemo } from "react";
export function useSearch(notes = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  //debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  //search notes
  const searchedNotes = useMemo(() => {
    const query = debouncedQuery.toLowerCase();
    return (notes || []).filter((note) => {
      const title = note.title?.toLowerCase() || "";
      const content = note.content?.toLowerCase() || "";
      return title.includes(query) || content.includes(query);
    });
  }, [notes, debouncedQuery]);
  return {
    searchedNotes,
    searchQuery,
    setSearchQuery,
  };
}
