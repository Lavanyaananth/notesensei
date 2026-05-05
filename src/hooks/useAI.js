import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const callAI = async (prompt) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    callAI(`Convert the following text into EXACTLY 5 concise bullet points.

Rules:
- Each bullet max 12 words
- No headings
- No paragraphs
- No markdown (*, **, #, etc.)
- No explanations
- Return ONLY a valid JSON array of 5 strings
- If rules are not followed, return []

Example:
["Point one", "Point two", "Point three", "Point four", "Point five"]

Text:
${text}`);

  const bullets = (text) =>
    callAI(`Return ONLY a valid JSON array of strings.

Rules:
- Do NOT include any text before or after JSON
- Do NOT include explanations
- Do NOT include markdown
- Each item must be a clear bullet point
- Keep sentences slightly more detailed than summary (max 18 words)

Example:
["First bullet point", "Second bullet point"]

Convert the following note into bullet points:

${text}`);
  return { summarize, bullets };
}
