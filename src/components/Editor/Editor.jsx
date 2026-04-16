import { useState, useRef, useEffect } from "react";
const Editor = ({ selectedNote, updateNote }) => {
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  if (!selectedNote) {
    return (
      <div className="p-6 flex-1 flex justify-center overflow-y-auto bg-white">
        Click "New Note" to start writing
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSaving(true);
    updateNote(selectedNote.id, { [name]: value, isNew: false });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };
  return (
    <main className="flex-1 flex justify-center overflow-y-auto bg-white">
      <div className="w-full max-w-3xl p-8">
        <div className="flex items-center justify-between mb-4">
          <input
            name="title"
            value={selectedNote?.title || ""}
            placeholder="Untitled Note"
            onChange={(e) =>
              updateNote(selectedNote.id, { title: e.target.value })
            }
            className="w-full text-3xl outline-none capitalize"
          />

          <div className="ml-4 text-sm text-gray-500 whitespace-nowrap">
            {isSaving ? "Saving..." : "Saved ✓"}
          </div>
        </div>
        <textarea
          name="content"
          value={selectedNote.content}
          placeholder="Start writing your note..."
          onChange={handleChange}
          className="w-full capitalize h-[400px] resize-none outline-none text-gray-700"
        />
      </div>
    </main>
  );
};

export default Editor;
