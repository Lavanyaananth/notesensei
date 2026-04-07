import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  // Creating note
  const addNote = () => {
    console.log("clicked");
    const newNote = {
      id: Date.now().toString(),
      title: "",
      content: "",
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };
  //getting selected notes
  const selectedNote = notes.find((note) => note.id == selectedId);

  return (
    <div className="flex h-screen">
      <Sidebar
        notes={notes}
        addNote={addNote}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      ></Sidebar>
      <Editor selectedNote={selectedNote} setNotes={setNotes}></Editor>
    </div>
  );
};

export default App;
