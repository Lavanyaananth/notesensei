import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";
import { useNotes } from "./hooks/useNotes";
import { useSearch } from "./hooks/useSearch";
const App = () => {
  const {
    notes,
    addNote,
    selectedId,
    setSelectedId,
    deleteNote,
    selectedNote,
    updateNote,
  } = useNotes();

  const { filteredNotes, searchQuery, setSearchQuery } = useSearch(notes);

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
