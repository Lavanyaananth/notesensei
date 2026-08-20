# NoteSensei

A clean, distraction-free note-taking app with AI-powered assistance — built with React, Vite, and Tailwind CSS.

**Live demo:** [notesensei.vercel.app](https://notesensei.vercel.app/)

## Features

- 📝 Create, edit, and delete notes with a minimal, focused editor
- 🔍 Full-text search across all notes
- 🏷️ Tag-based filtering to organize and find notes quickly
- 🤖 AI assistance powered by Google Gemini — summarize notes and generate bullet points on demand
- 💾 Local-first storage — notes persist in the browser, no account needed
- ⚡ Debounced updates and memoized filtering for a smooth editing experience

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **AI:** Google Gemini (`gemini-2.5-flash`) via `@google/generative-ai`
- **Backend:** Vercel Serverless Functions (`/api`)
- **Storage:** Browser localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- A [Gemini API key](https://aistudio.google.com/apikey)
- [Vercel CLI](https://vercel.com/docs/cli) (needed to run the `/api` functions locally)

### Setup

1. Clone the repo
   ```bash
   git clone https://github.com/Lavanyaananth/notesensei.git
   cd notesensei
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Add your Gemini API key
   ```bash
   echo "GEMINI_API_KEY=your_key_here" > .env
   ```

4. Run the dev server (use Vercel CLI, not plain `vite dev`, so the `/api` routes work locally)
   ```bash
   npm install -g vercel
   vercel dev
   ```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AIPanel/     # AI summarize/bullets UI
│   ├── Button/
│   ├── Editor/       # Note editor
│   ├── Header/
│   └── Sidebar/       # Note list, search, tag filters
├── hooks/
│   ├── useAI.js       # Gemini API calls
│   ├── useNotes.js     # Note CRUD + localStorage
│   ├── useSearch.js
│   └── useTagFilter.js
└── pages/
    └── Dashboard.jsx

api/
└── ai.js              # Vercel serverless function — proxies requests to Gemini
```

## Roadmap

- [ ] Migrate to TypeScript
- [ ] Rate limiting on the `/api/ai` endpoint
- [ ] Markdown support with live preview
- [ ] Export notes (Markdown/PDF)
- [ ] Unit tests for search and tag-filter logic

