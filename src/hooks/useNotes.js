import React from "react";
import { useState, useEffect } from "react";

export function useNotes() {
  // notes state
  const [notes, setNotes] = useState(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch {
      return [];
    }
  });

  // for showing first note by default
  const [selectedId, setSelectedId] = useState(() => {
    const stored = localStorage.getItem("notes");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.length > 0 ? parsed[0].id : null;
  });

  // for storing notes to localstorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Creating note
  const addNote = () => {
    console.log("clicked");
    const newNote = {
      id: Date.now().toString(),
      title: "",
      content: "",
      isNew: true,
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };

  //getting selected notes
  const selectedNote = notes.find((note) => note.id === selectedId);

  //deleting note
  const deleteNote = (id) => {
    setNotes((prev) => {
      const updatedNotes = prev.filter((note) => note.id !== id);
      if (updatedNotes.length > 0) {
        setSelectedId(updatedNotes[0].id);
      } else {
        setSelectedId(null);
      }
      return updatedNotes;
    });
  };
  //update notes
  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note)),
    );
  };
  return {
    notes,
    selectedId,
    setSelectedId,
    selectedNote,
    addNote,
    deleteNote,
    updateNote, // keep for editor updates
  };
}
