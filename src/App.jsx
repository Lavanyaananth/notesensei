import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";
import { useNotes } from "./hooks/useNotes";
import { useSearch } from "./hooks/useSearch";
import { useTagFilter } from "./hooks/useTagFilter";
const App = () => {
  const {
    notes,
    addNote,
    setSelectedId,
    deleteNote,
    selectedNote,
    updateNote,
    selectedTag,
    setSelectedTag,
  } = useNotes();

  const { searchedNotes, searchQuery, setSearchQuery } = useSearch(notes);
  console.log(notes);
  const { filteredNotes, uniqueTags } = useTagFilter(
    searchedNotes,
    selectedTag,
  );
  return (
    <div className="flex h-screen">
      <Sidebar
        notes={filteredNotes}
        uniqueTags={uniqueTags}
        addNote={addNote}
        setSelectedId={setSelectedId}
        deleteNote={deleteNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      ></Sidebar>
      <Editor selectedNote={selectedNote} updateNote={updateNote}></Editor>
    </div>
  );
};

export default App;
