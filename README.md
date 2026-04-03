# CameraMatics Case Study Explorer

Interactive, filterable case study explorer for CameraMatics fleet safety platform. Links to the primary Customer Stories library at https://www.cameramatics.com/resources/category/customer-stories/. Challenge-first information architecture designed for both website visitors and sales teams.

## Stack

- **Vite** — instant dev server, sub-2s builds
- **React 18** — single-component app, no routing needed
- **Zero dependencies** beyond React — no Tailwind, no UI library, no state management
- **Vercel** — free hosting with auto-deploy from GitHub

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
