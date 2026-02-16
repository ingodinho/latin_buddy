# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

No test framework is configured.

## Architecture

React 19 + Vite SPA for learning Latin grammar. All UI text is in German.

**Routing:** State-based screen switching in `App.jsx` via `useState("menu")`. No react-router. Screens: `menu`, `quiz`, `result`, `reference`, `cases`. Each screen component receives an `onBack` callback to return to menu.

**Screen flow:** MenuScreen → (quiz categories → QuestionCard loop → ResultScreen) | (reference screens)

**Data layer** (`src/data/`): Pure JS exports of grammar data arrays — nouns, verbs, adjectives, sentences, cases. Each word object has a `forms` nested object keyed by grammatical dimensions (case/number for nouns, person/number for verbs, gender/case/number for adjectives). Labels and constants live in `constants.js`.

**Quiz engine** (`src/utils/quizEngine.js`): `generateQuestions(category, count)` builds randomized multiple-choice questions. Distractors are pulled from the same word's other forms. Categories: `declensions`, `conjugations`, `mixed`, `sentences`.

**CSS:** BEM naming, CSS custom properties in `index.css` for theming (colors, radii). Mobile-first (max-width 480px container in `App.css`). Each component has a co-located `.css` file.

## Conventions

- Components are functional with hooks, using `useCallback` for handlers passed as props
- New screens follow the pattern: create component + CSS, add screen string to App.jsx routing, add button in MenuScreen
- Reference/summary screens reuse the `ref__` CSS class prefix from `ReferenceScreen.css`
- German typographic quotes (`„"`) in JS strings must use unicode escapes (`\u201E`, `\u201C`) to avoid breaking the parser
