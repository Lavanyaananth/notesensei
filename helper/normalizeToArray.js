export const normalizeToArray = (text) => {
  if (!text) return [];

  if (Array.isArray(text)) return text;

  // Try JSON parse first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch {}

  // 👉 1. Extract markdown bullets (* ...)
  const bulletMatches = text.match(/^\s*[\*\-]\s+(.*)/gm);

  if (bulletMatches) {
    return bulletMatches.map((item) =>
      item
        .replace(/^[\*\-]\s+/, "") // remove * or -
        .replace(/\*\*/g, "") // remove bold **
        .trim(),
    );
  }

  // 👉 2. Fallback: split into sentences
  return text
    .split(/\. |\n/)
    .map((s) => s.trim())
    .filter(Boolean);
};
