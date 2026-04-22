import { useMemo } from "react";

export function useTagFilter(notes = [], selectedTag = "all") {
  // filter notes based on selected tag
  const filteredNotes = useMemo(() => {
    if (selectedTag === "all") {
      return notes;
    }
    return notes.filter((note) => note.tags && note.tags.includes(selectedTag));
  }, [notes, selectedTag]);
  //ggetting the unique tags
  const uniqueTags = useMemo(() => {
    return [
      ...new Set(
        notes.flatMap((note) =>
          (note.tags || []).map((tag) => tag.toLowerCase()),
        ),
      ),
    ].sort();
  }, [notes]);
  return { filteredNotes, uniqueTags };
}
