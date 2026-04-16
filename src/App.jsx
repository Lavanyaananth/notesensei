import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";
import { useNotes } from "./hooks/useNotes";
import { useState, useEffect } from "react";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const {
    notes,
    addNote,
    selectedId,
    setSelectedId,
    deleteNote,
    selectedNote,
    updateNote,
  } = useNotes();
  //debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  //search notes
  const filteredNotes = notes.filter((note) => {
    const query = debouncedQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });
  return (
    <div className="flex h-screen">
      <Sidebar
        notes={filteredNotes}
        addNote={addNote}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        deleteNote={deleteNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Sidebar>
      <Editor selectedNote={selectedNote} updateNote={updateNote}></Editor>
    </div>
  );
};

export default App;
