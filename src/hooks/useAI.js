import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const callAI = async (prompt) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data.summary;
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // 🧠 AI actions
  const summarize = (text) =>
    callAI(`You are a note summarization engine.

TASK:
Summarize the note.

RULES:
- Return ONLY the summary.
- Do NOT address the reader.
- Do NOT give advice.
- Do NOT encourage or motivate.
- Do NOT add opinions.
- Do NOT use phrases like:
  "Sounds like..."
  "Great job..."
  "You should..."
  "Here's a summary..."
- Write in third person.
- Maximum 100 words.
- Use 1-2 short paragraphs.
Text:
${text}`);

  const bullets = (text) =>
    callAI(`Convert the note into EXACTLY 5 bullet points.

Rules:
- Return ONLY a valid JSON array
- Exactly 5 items
- Each item maximum 15 words
- Focus on key actions, decisions, issues, and plans
- No markdown
- No explanations

Example:
[
  "Completed initial notes app UI work",
  "Found bug affecting note summaries",
  "Considering modal-based summary interface",
  "Need to order groceries",
  "Plan to fix bug tomorrow"
]

${text}`);
  return { summarize, bullets };
}
