# autopilot-refactor Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-02

## Active Technologies
- TypeScript 5, React 19, Next.js 16.1.6 + Ant Design v6, react-hook-form (new), @ant-design/icons, SCSS (sass) (002-html-pages-to-react)
- N/A — local component state only (no persistence) (002-html-pages-to-react)
- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (003-signup-page)
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (003-signup-page)
- TypeScript 5, React 19, Next.js 15+ + Ant Design v6, Zustand, React Hook Form (003-signup-page)
- Supabase Auth (Mocked via useAuthStore) (003-signup-page)
- TypeScript 5+, Next.js 15+, React 19 + Ant Design, `clsx`, CSS Modules (004-refactor-inline-styles)
- TypeScript 5+ + Next.js 15, React 19, Ant Design, Zustand, React Hook Form, Zod. (005-user-profile-page)
- LocalStorage (via Zustand persist middleware) (005-user-profile-page)
- TypeScript / Next.js 15+ / React 19 + `antd`, `zustand`, `react-hook-form`, `zod`, `sass` (006-profile-redesign)
- Mock JSON (in `src/lib/mock-data.ts`) (006-profile-redesign)

- TypeScript + Next.js (App Router), Ant Design (ANTD), Zustand, Recharts (001-convert-html-nextjs)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript: Follow standard conventions

## Recent Changes
- 006-profile-redesign: Added TypeScript / Next.js 15+ / React 19 + `antd`, `zustand`, `react-hook-form`, `zod`, `sass`
- 005-user-profile-page: Added TypeScript 5+ + Next.js 15, React 19, Ant Design, Zustand, React Hook Form, Zod.
- 005-user-profile-page: Added [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
