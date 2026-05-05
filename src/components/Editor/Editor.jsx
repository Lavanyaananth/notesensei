import { useState, useRef, useEffect } from "react";
import { useAI } from "../../hooks/useAI";
import AIPanel from "../AIPanel/AIPanel";
import { normalizeToArray } from "../../../helper/normalizeToArray";
const Editor = ({ selectedNote, updateNote }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef(null);
  const { summarize } = useAI();
  //cleanup
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  // getting tags
  const tags = selectedNote?.tags ?? [];
  if (!selectedNote) {
    return (
      <div className="p-6 flex-1 flex justify-center overflow-y-auto bg-white">
        Click "New Note" to start writing
      </div>
    );
  }
  //title change
  const handleTitleChange = (e) => {
    setIsSaving(true);
    updateNote(selectedNote.id, { title: e.target.value });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };
  // content change
  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setIsSaving(true);
    updateNote(selectedNote.id, { [name]: value, isNew: false });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };
  //tags change on comma separation
  const handleTagsChange = (e) => {
    const value = e.target.value;
    //handling comma split
    if (value.endsWith(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      const existingTags = selectedNote.tags || [];
      const allTags = [...new Set([...existingTags, ...newTags])];
      updateNote(selectedNote.id, { tags: allTags });
      setInput("");
    } else {
      setInput(value);
    }
  };
  // removing tag
  const removeTag = (tagsToRemove) => {
    console.log(tagsToRemove);
    const updatedTags = tags.filter((tag) => tag !== tagsToRemove);
    updateNote(selectedNote.id, { tags: updatedTags });
  };
  // handle enter key action
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const allTags = [...new Set([...tags, input.trim()])];
      updateNote(selectedNote.id, { tags: allTags });
      setInput("");
    }
  };
  // handle summary AI assistant
  const handleSummarize = async () => {
    if (!selectedNote?.content) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: selectedNote.content }),
      });
      const data = await res.json();
      const parsed = data.summary;

      updateNote(selectedNote.id, {
        summary: parsed,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  // handle bullets  AI assistant

  return (
    <main className="flex-1 flex justify-center items-center overflow-y-auto bg-white pt-16">
      <div className="w-full max-w-3xl p-8">
        {/* Title */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <input
            name="title"
            value={selectedNote?.title || ""}
            placeholder="Untitled Note"
            onChange={handleTitleChange}
            className="w-full text-4xl font-semibold flex-1 outline-none capitalize"
          />
          {/* Saving status  */}
          <div className="ml-4 text-sm   text-gray-500 whitespace-nowrap">
            {isSaving ? "Saving..." : "Saved ✓"}
          </div>
        </div>
        {/* Tags */}
        <div className="mb-6 pb-6 border-b border-gray-300">
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
            {" "}
            Add tags{" "}
          </label>
          <input
            value={input}
            type="text"
            onChange={handleTagsChange}
            onKeyDown={handleKeyDown}
            placeholder="Type tags and press Enter, or use commas (e.g., javascript, react, css)"
            className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          />
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.length > 0 ? (
              tags.map((tag, index) => {
                return (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-300 rounded-lg text-sm hover:bg-blue-100 transition"
                  >
                    {tag}
                    <button
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      x
                    </button>
                  </span>
                );
              })
            ) : (
              <p>No tags yet</p>
            )}
          </div>
        </div>

        <textarea
          name="content"
          value={selectedNote.content}
          placeholder="Start writing your note..."
          onChange={handleContentChange}
          className="w-full capitalize h-96 resize-none outline-none text-gray-700"
        />
      </div>
      {/* right panel  */}
      <AIPanel
        summary={selectedNote?.summary}
        isLoading={isLoading}
        handleSummarize={handleSummarize}
      ></AIPanel>
    </main>
  );
};

export default Editor;
