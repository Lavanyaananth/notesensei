const Editor = ({ selectedNote, setNotes }) => {
  if (!selectedNote) {
    return (
      <div className="p-6 flex-1 flex justify-center overflow-y-auto bg-white">
        Click "New Note" to start writing
      </div>
    );
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id == selectedNote.id ? { ...note, [name]: [value] } : note,
      ),
    );
  };
  return (
    <main className="flex-1 flex justify-center overflow-y-auto bg-white">
      <div className=" w-full max-w-3xl p-6">
        <input
          name="title"
          value={selectedNote.title}
          placeholder="Untitled Note"
          onChange={handleChange}
          className="w-full text-3xl mb-4 outline-none"
        />
        <textarea
          name="content"
          value={selectedNote.content}
          placeholder="Start writing your note..."
          onChange={handleChange}
          className="w-full h-[400px] resize-none outline-none text-gray-700"
        />
      </div>
    </main>
  );
};

export default Editor;
