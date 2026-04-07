import React from "react";

const Sidebar = ({ notes, addNote, selectedId, setSelectedId }) => {
  return (
    <aside className="w-72 bg-[#f7f6f3] border-r border-[#e9e9e7] p-4 flex flex-col">
      <h1 className="text-xl font-semibold mb-4">NoteSensei</h1>
      <button
        className="bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition mb-4"
        onClick={addNote}
      >
        + Create Note
      </button>
      <input
        type="text"
        placeholder="Search notes ..."
        className="mb-4 p-2 rounded-lg outline-none focus:ring-2 focus-ring-blue-500"
      />{" "}
      <div className="flex-1 overflow-y-auto space-y-2">
        {notes.map((note) => {
          return (
            <div
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {" "}
              {note.title}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
