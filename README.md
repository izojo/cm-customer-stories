# CameraMatics Case Study Explorer

Interactive, filterable case study explorer for CameraMatics fleet safety platform. Challenge-first information architecture designed for both website visitors and sales teams.

## Stack

- **Vite** — instant dev server, sub-2s builds
- **React 18** — single-component app, no routing needed
- **Zero dependencies** beyond React — no Tailwind, no UI library, no state management
- **Vercel** — free hosting with auto-deploy from GitHub

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel (5-minute setup)

### 1. Create a GitHub repo

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on github.com, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cameramatics-case-explorer.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New → Project"**
3. Select your `cameramatics-case-explorer` repo
4. Vercel auto-detects Vite — leave all settings as default
5. Click **Deploy**
6. Live in ~30 seconds at `cameramatics-case-explorer.vercel.app`

### 3. (Optional) Custom domain

In Vercel dashboard → Settings → Domains → add your subdomain, e.g. `stories.cameramatics.com`. Vercel handles SSL automatically.

## Updating after working in Claude

1. Copy the updated `CaseStudyExplorer.jsx` from Claude
2. Replace `src/CaseStudyExplorer.jsx` in your local repo
3. Commit and push:

```bash
git add src/CaseStudyExplorer.jsx
git commit -m "Update case study explorer"
git push
```

4. Vercel auto-deploys in ~10 seconds

## Adding a new case study

Edit the `CASE_STUDIES` array in `src/CaseStudyExplorer.jsx`. Each entry needs:

```js
{
  id: 18,                                    // unique number
  name: "Company Name",
  vertical: "Transport & Logistics",         // must match VERTICALS array
  geo: "UK",                                 // must match GEOS array
  fleetSize: "Mid (50–200)",                 // must match FLEET_SIZES array
  fleetLabel: "120 vehicles",                // freeform display text
  challenges: ["Rising insurance costs"],    // from CHALLENGES array
  outcomes: ["Cost savings"],                // from OUTCOMES array
  headline: "40%",                           // the big number
  headlineSuffix: " accident reduction",     // text after the number
  stats: [{ label: "ROI", value: "6 mo" }], // supporting stats
  quote: "Customer quote here.",
  quotee: "Name, Title",
  summary: "One-paragraph summary of the story."
}
```

Also add the URL to `CASE_STUDY_URLS` and any regulations to `REGULATION_MAP`.

## Project structure

```
├── index.html              ← entry point
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            ← React mount
    └── CaseStudyExplorer.jsx  ← the entire app (single component)
```
