# nova-next-template Development Guidelines

## Stack

- **Framework**: Next.js 16.2.6 — App Router (`app/` directory)
- **Language**: TypeScript 5
- **UI**: React 19 + components from `@/components/ui` (Button, Input, Label, Text, etc.)
- **Styling**: Tailwind v4 (`tw` shortcode) + SCSS Modules per component, global SCSS in `styles/global.scss`
- **State**: Redux Toolkit 2.x — data fetching via RTK Query (`createApi` + `baseQuery`)
- **Forms**: React Hook Form
- **i18n**: react-i18next
- **Testing**: Vitest

## Project Structure

```text
app/              ← Next.js App Router pages and layouts
components/ui/    ← Reusable UI primitives only (no business logic)
features/<name>/  ← Feature-specific components, hooks, and logic
hooks/            ← Shared custom hooks (prefix with `use`)
lib/              ← Utilities, AI adapter, and shared helpers
redux/            ← Store, slices, RTK Query APIs
services/         ← API service definitions
styles/           ← Global SCSS
types/            ← Shared TypeScript types
```

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test` — Vitest

## Code Conventions

- Components: PascalCase, **named exports only**
- Hooks: always prefix with `use`
- Avoid default exports except for Next.js pages/layouts
- Use `cn()` from `lib/utils` for className merging
- Use `@/components/ui` primitives over raw HTML elements (`button`, `input`, `label`, `p`, `span`)
- Never put business logic inside `components/`

## File Placement Rules

- Feature-specific code → `features/<name>/`
- Reusable UI primitives → `components/ui/`
- Shared hooks → `hooks/`
- Business logic → `features/<name>/` or `lib/`

## What NOT to do

- Don't install new packages without asking
- Don't modify files in `/mnt` or `/public/generated`
- Don't rewrite working code while fixing a bug
- Don't use Ant Design, Zustand, or any package not listed in `package.json`

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
