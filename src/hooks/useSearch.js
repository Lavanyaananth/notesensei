import React from "react";
import { useState, useEffect, useMemo } from "react";
export function useSearch(notes = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  console.log("debouncedQuery:", debouncedQuery);
  //debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  //search notes
  const filteredNotes = useMemo(() => {
    const query = debouncedQuery.toLowerCase();
    return (notes || []).filter((note) => {
      const title = note.title?.toLowerCase() || "";
      const content = note.content?.toLowerCase() || "";
      return title.includes(query) || content.includes(query);
    });
  }, [notes, debouncedQuery]);
  return {
    filteredNotes,
    searchQuery,
    setSearchQuery,
  };
}
