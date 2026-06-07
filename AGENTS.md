# AGENTS.md

## Project Overview

Next.js 16.2.6 app using App Router, TypeScript, Tailwind v4, Redux Toolkit, React Hook Form, react-i18next, and Sass.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test` — Vitest

## Code Conventions

- Components: PascalCase, named exports only
- Hooks: always prefix with `use`
- Avoid default exports except for Next.js pages/layouts
- Use `cn()` from lib/utils for className merging

## File Placement Rules

- Feature-specific code → features/<name>/
- Reusable UI primitives → components/ui/
- Never put business logic in components/

## What NOT to do

- Don't install new packages without asking
- Don't modify files in /mnt or /public/generated
- Don't rewrite working code while fixing a bug

## Quick Reference

- Main packages: `next@16.2.6`, `react@19.2.4`, `react-dom@19.2.4`, `tailwindcss@4`, `reduxjs/toolkit@2.11.2`
- Styling: Tailwind v4 (use `tw` shortcode), SCSS modules for components, global SCSS in `styles/global.scss`
- Data fetching: RTK Query with `createApi` and `baseQuery`
- Forms: React Hook Form
- Routing: App Router (`app/` directory)

## Styling Patterns

- Colors: Use SCSS vars from `styles/_colors.scss` (e.g. `$primary500`, `$neutral200`). Never hardcode hex values.
- CSS variables: Available as `--color-<name>-500` (e.g. `var(--color-primary-500)`)
- Responsive sizing: Use `@include responsive-prop(property, desktop-px, mobile-px)` or `@include font-vw(24, 16)` from `styles/_mixins.scss`
- Design widths: 1440px desktop / 390px mobile
- SCSS modules per component; global styles only in `styles/all.scss`

## Available UI Components (`components/ui/`)

- `Button` — all interactive buttons
- `Input` — all text inputs and form fields
- `Text` — all text/typography rendering
- `Icon` — icon rendering
- `Image` — all image elements
- `Modal` — overlay dialogs
- `Spinner` — loading states

Never use raw HTML equivalents (`button`, `input`, `p`, `span`, `img`) when these exist.

## State Management

- Global state: Redux slices in `redux/` — use `RootState` and `AppDispatch` from `redux/index.ts`
- API calls: RTK Query via the base API in `app/api/`. Add new endpoints there; never use `fetch` or `axios` directly.
- Selectors: Colocate with their slice, not in components
- Do NOT create local state for data that belongs in Redux

## Shared Hooks (`hooks/`)

- `useAbortableQuery` — RTK Query wrapper with abort support
- `useAutoCompleteTranslation` — i18n autocomplete helper
- `useGetUserInfo` — access current authenticated user
- `useScreenSize` — responsive breakpoint detection

Check these before creating new hooks with similar purpose.

## Internationalization

- Use `react-i18next` for all user-facing strings. Never hardcode text.
- Translation key namespaces are defined in `types/TranslationKeyEnum.ts`
- Use `useAutoCompleteTranslation` hook for dynamic/autocomplete cases

## Route Structure

- `app/(auth)/login` — public login page
- `app/(auth)/register` — public register page
- `app/dashboard/` — protected dashboard area
- Route groups `(auth)` have no URL segment impact
- Layouts: `app/layout.tsx` is root; add nested layouts per route group

## TypeScript

- Shared types go in `types/` — never inline complex types in component files
- Prefer `interface` for object shapes, `type` for unions/aliases
- Never use `any` — use `unknown` and narrow it
