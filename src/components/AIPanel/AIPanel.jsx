import React, { useState } from "react";

const AIPanel = ({
  summary,
  bullets,
  isLoading,
  handleSummarize,
  handleBullets,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(summary);
  return (
    <>
      {/* FLOATING BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed cursor-pointer bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-800"
        >
          ☀️ AI Assistant
        </button>
      )}

      {/* PANEL */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white border shadow-xl rounded-xl flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-sm font-semibold text-gray-600">
              AI Assistant
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 p-3">
            <button
              onClick={handleSummarize}
              className="flex-1 px-3 py-2 cursor-pointer text-sm bg-black text-white rounded-md"
            >
              {isLoading ? "..." : "Summarize"}
            </button>

            <button
              onClick={handleBullets}
              className="flex-1 px-3 py-2 text-sm bg-gray-200 cursor-pointer rounded-md"
            >
              {isLoading ? "..." : "Bullets"}
            </button>
          </div>

          {/* OUTPUT */}
          <div className="p-3 max-h-60 overflow-y-auto text-sm text-gray-700">
            {isLoading && <p>Generating...</p>}

            {!isLoading && summary && (
              <div className="p-3 w-full bg-white border rounded-lg text-sm text-gray-700">
                {Array.isArray(summary) ? (
                  <ol className="w-full list-decimal pl-4 space-y-2">
                    {summary.slice(0, 5).map((item, i) => (
                      <li className="whitespace-pre-line break-words" key={i}>
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>{summary}</p> // ✅ handles paragraph
                )}
              </div>
            )}

            {!isLoading && bullets && (
              <ul className="list-disc pl-4">
                {bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {!isLoading && !summary && !bullets && (
              <>
                {" "}
                <p className="text-gray-400">
                  Click an action to generate output
                </p>
                <p className="text-gray-400">
                  Note: Using gemini's free API for development purpose. So you
                  may not see response sometimes. Please check network tab or
                  try again later
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIPanel;
