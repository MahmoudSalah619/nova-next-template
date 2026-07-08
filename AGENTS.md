# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

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

- Feature-specific code → `features/<feature-name>/`
- Reusable UI primitives → `components/ui/`
- Static / dummy data → `data/` (see below)
- Never put business logic in components/

## Static Data (`data/`)

The `data/` folder holds static arrays and objects that are displayed in the UI but do not come from an API — things like feature lists, stats, nav links, pricing tiers, testimonials, FAQs, etc.

**When to use `data/`:**

| Situation | Use `data/`? |
| --- | --- |
| Static list rendered in a section (features, stats, nav links) | ✅ Yes |
| Content that changes per user or comes from an API | ❌ No — fetch it via a `services/` function |
| One-off config used only inside a single component | ❌ No — keep it local |
| Shared across multiple components | ✅ Yes |

**File naming** — one file per domain/page:

```text
data/
├── home.ts        ← sections on the home page (features, stats)
├── navigation.ts  ← nav links shared across layout components
└── pricing.ts     ← pricing tiers, plan features, etc.
```

**Workflow:**

1. Create or open the relevant file in `data/`.
2. Define and export a `const` array/object with a SCREAMING_SNAKE_CASE name.
3. Import it directly into the component — never copy the data inline.

```ts
// data/home.ts
export const FEATURES_DATA = [
  { titleKey: "FEATURE_1_TITLE", descKey: "FEATURE_1_DESC", icon: "Layers" },
] as const;
```

```tsx
// components/sections/home/FeaturesSection/index.tsx
import { FEATURES_DATA } from "@/data/home";

{FEATURES_DATA.map(({ titleKey, descKey, icon }) => (
  <FeatureCard key={titleKey} titleKey={titleKey} descKey={descKey} icon={icon} />
))}
```

> Use translation keys (`titleKey`, `labelKey`, etc.) as values — never hardcode display strings in data files.

## What NOT to do

- Don't install new packages without asking
- Don't modify files in /mnt or /public/generated
- Don't rewrite working code while fixing a bug
- **Never use Tailwind utility classes** — all styling must be done with SCSS modules using the design-system mixins, functions, and variables defined in `styles/`

## Quick Reference

- Main packages: `next@16.2.6`, `react@19.2.4`, `react-dom@19.2.4`, `tailwindcss@4`, `reduxjs/toolkit@2.11.2`
- Styling: SCSS modules for components, global SCSS in `styles/all.scss` — do NOT use Tailwind utility classes
- Data fetching: `fetch`-based client in `lib/api/` (`apiMethods`) + typed `services/`. Works in Server **and** Client Components.
- Forms: React Hook Form
- Routing: App Router (`app/` directory)

## Styling Patterns

- Colors: Use SCSS vars from `styles/_colors.scss` (e.g. `$primary500`, `$neutral200`). Never hardcode hex values.
- CSS variables: Available as `--color-{name}-500` (e.g. `var(--color-primary-500)`)
- Design widths: 1440px desktop / 390px mobile
- SCSS modules per component; global styles only in `styles/all.scss`
- Import all design-system tokens at the top of every SCSS module: `@use "@/styles/all" as *;`

### Functions (`styles/_functions.scss`)

| Function | Usage | Returns |
| --- | --- | --- |
| `strip-unit($n)` | `strip-unit(16px)` | `16` — bare number with no unit |
| `mobile-responsive($px)` | `mobile-responsive(16px)` | `min(vw-val, 16px)` — fluid, capped (320px base) |
| `desktop-responsive($px)` | `desktop-responsive(40px)` | `min(vw-val, 40px)` — fluid, capped (1440px base) |

### Responsive sizing helpers (`styles/_responsive.scss`)

| Function / Mixin | Usage | Effect |
| --- | --- | --- |
| `vw($px)` | `width: vw(200px)` | proportional to 1440px viewport width |
| `vh($px)` | `height: vh(100px)` | proportional to 900px viewport height |
| `resize($px, $max)` | `width: resize(200px, 200px)` | `vw()` value capped at `$max` — **width/height only** |
| `@include font-size($px, $max)` | `@include font-size(24px, 24px)` | fluid `font-size` via `resize()` |
| `@include center` | `@include center` | absolute centering with transform |
| `@include container` | `@include container` | standard page margins (120px → 16px) |
| `@include container2x` | `@include container2x` | wider page margins (140px) |
| `@include container-fluid` | `@include container-fluid` | fluid margins (40px) |

#### Fluid spacing for `padding` / `margin` / `gap`

Do **not** use `resize()` for spacing. Use `min()` or `max()` directly with `vw()`:

```scss
// ✅ — fluid, caps at design value on large screens
padding: min(vw(64px), 64px) min(vw(72px), 72px);
gap: min(vw(24px), 24px);
margin-top: min(vw(40px), 40px);

// ✅ — fluid, enforces a minimum floor on small screens
gap: max(vw(16px), 8px);

// ❌ — resize() is for width/height only
padding: resize(64px, 64px) resize(72px, 72px);
gap: resize(24px, 24px);
```

Choose `min()` when you want a **ceiling** (shrinks on small viewports, capped on large).
Choose `max()` when you want a **floor** (grows on large viewports, never below minimum).

### Mixins (`styles/_mixins.scss`)

#### Breakpoints

```scss
@include mobile { … }              // max-width: 768px
@include tablet { … }              // max-width: 1023px
@include desktop { … }             // min-width: 768px
@include between(480px, 1023px) { … }  // range query
```

#### Typography

```scss
@include ellipsis;        // single-line: white-space nowrap + text-overflow ellipsis
@include truncate(3);     // multi-line clamp to N lines with ellipsis
@include font(16px, 600); // font-size + font-weight shorthand
```

#### Flexbox

```scss
@include flex-center;     // display:flex  align-items:center  justify-content:center
@include flex-between;    // display:flex  align-items:center  justify-content:space-between
@include flex-col;        // display:flex  flex-direction:column
@include flex-row-wrap;   // display:flex  flex-wrap:wrap
```

#### Grid

```scss
@include grid(3, 24px);   // 3 equal columns, 24px gap
@include grid(2, 16px);   // 2 equal columns, 16px gap
```

#### Size

```scss
@include size(48px);          // width: 48px; height: 48px
@include size(200px, 80px);   // width: 200px; height: 80px
```

#### Interaction

```scss
@include transition(opacity transform, 0.2s, ease-out);
@include transition;                        // defaults: all 0.2s ease

@include hover { color: $primary500; }      // :hover only on non-touch devices
```

#### Accessibility and scroll

```scss
@include visually-hidden;   // hidden visually, readable by screen readers
@include scrollbar-hide;    // removes scrollbar UI, element stays scrollable
```

## Available UI Components (`components/ui/`)

- `Button` — all interactive buttons
- `Input` — all text inputs and form fields
- `Text` — all text/typography rendering
- `Icon` — icon rendering
- `Image` — all image elements
- `Modal` — overlay dialogs
- `Spinner` — loading states

Never use raw HTML equivalents (`button`, `input`, `p`, `span`, `img`) when these exist.

## Available Layout Components (`components/layout/`)

These are app-shell components rendered once per layout. Never recreate them inline.

- `Navbar` — sticky top navigation bar with nav links, language switch, and auth actions. Nav links are driven by `data/navigation.ts`.
- `Footer` — site footer with brand, link columns, and copyright bar. Link columns are driven by `data/navigation.ts` (extend as needed).
- `PageWrapper` — wraps every main-route page; applies the standard container padding and vertical gap between sections. Always use this instead of adding `@include container` directly on a page.
- `ToastProvider` — renders the `<ToastContainer>` for react-toastify. Mounted once in `app/[lng]/layout.tsx`; never add it inside a page.

### Firing toasts

Import `toast` from `react-toastify` directly — no wrapper needed:

```ts
import { toast } from "react-toastify";

toast.success(t("LOGIN_SUCCESS"));
toast.error(t("SIGN_IN_FAILED"));
```

## Component Usage Rules

### 1. Button — always use `<Button variant="...">`, never `<button>`

Pick the appropriate variant (e.g. `primary`, `secondary`, `ghost`, `outline`) from the design system. Raw `<button>` elements are forbidden.

```tsx
// ✅
<Button variant="primary" onClick={handleClick}>Submit</Button>

// ❌
<button onClick={handleClick}>Submit</button>
```

### 2. Text — always use `<Text variant="...">`, never `<p>` / `<span>` / `<h*>`

Pick the appropriate variant (e.g. `heading1`, `body`, `caption`, `label`). Raw typography elements are forbidden.

```tsx
// ✅
<Text variant="heading1">Welcome</Text>
<Text variant="body">Some paragraph text</Text>

// ❌
<h1>Welcome</h1>
<p>Some paragraph text</p>
```

### 3. Icon — register SVG first, then use `<Icon name="..." />`

Workflow:

1. Add the SVG file to `public/icons/<icon-name>.svg`
2. Import and register it in `components/ui/Icon/list.tsx`
3. Use it anywhere via the `Icon` component

```tsx
// ✅
<Icon name="globe" color="primary500" size={12} />

// ❌
<img src="/icons/globe.svg" />
<svg>...</svg>
```

### 6. Images — always register in `constants/assets.ts`, never hardcode paths

**Public folder structure:**

```text
public/
├── icons/    ← SVG files only (used by <Icon> and decorative SVGs)
└── images/   ← raster files: .png, .jpg, .webp, etc.
```

**Workflow:**

1. Drop the file into the correct folder (`public/icons/` or `public/images/`).
2. Register it in `constants/assets.ts` under the matching object (`Svgs` or `Images`).
3. Import the constant and pass it as `src` — never hardcode the path string.

```ts
// constants/assets.ts
const Images = {
  heroBanner: "/images/hero-banner.png",
} as const;

const Svgs = {
  logo: "/icons/logo.svg",
} as const;

export { Images, Svgs };
```

```tsx
// ✅ in component
import Image from "next/image";
import { Images, Svgs } from "@/constants/assets";

<Image src={Images.heroBanner} alt="Hero" fill />
<Image src={Svgs.logo} alt="Logo" width={120} height={40} />

// ❌ hardcoded path — forbidden
<Image src="/images/hero-banner.png" alt="Hero" fill />
<img src="/icons/logo.svg" />
```

### 4. Colors — never use hex codes; always reference the design-system color tokens

Use SCSS variables (`$primary500`, `$neutral200`) in `.scss` files, and CSS custom properties (`var(--color-primary-500)`) in inline styles. Pass the token name (e.g. `"primary500"`) as the `color` prop of `Icon`, `Text`, and other components that accept one.

```scss
// ✅
color: $primary500;
background: var(--color-neutral-200);

// ❌
color: #6366f1;
background: #e5e7eb;
```

### 5. Responsive layout — use flexbox, not fixed widths

Build layouts with `display: flex` / `flex-wrap: wrap` so they reflow between 1440 px desktop and 390 px mobile. Avoid hardcoded pixel widths on containers.

```scss
// ✅
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: min(vw(40px), 40px);
}

// ❌
.container {
  width: 1200px;
}
```

## Data Fetching (`lib/api/` + `services/`)

This template uses a plain `fetch` client instead of RTK Query, so **the same code runs in Server and Client Components**. Never call `fetch`/`axios` directly in a component and never hardcode a URL — always go through a `services/` function.

**Layers:**

| Path | Responsibility |
| --- | --- |
| `lib/api/client.ts` | `apiFetch` / `apiMethods` — builds the URL, injects auth + language, parses JSON, throws `ApiError`. |
| `lib/api/session.ts` | Reads/writes the token cookie (server via `next/headers`, client via `document.cookie`). |
| `lib/api/ApiError.ts` | Typed error (`status`, `data`, `isNetworkError`). |
| `services/<domain>/` | Typed endpoint functions + co-located `types.ts` (e.g. `services/auth`). |

> The base URL comes from `NEXT_PUBLIC_API_URL` (see `.env.example`). Requests are sent to `${baseUrl}/${lang}/api/<path>`. The auth token lives in a **cookie** (not `localStorage`) so Server Components can authenticate during SSR.

**Adding an endpoint** — create/extend a file in `services/<domain>/`:

```ts
// services/products/index.ts
import { apiMethods, type ApiFetchOptions } from "@/lib/api";
import type { Product } from "./types";

export function getProducts(options?: ApiFetchOptions) {
  return apiMethods.get<Product[]>("/products", options);
}
```

**Server Component** — call the service directly with `await`; use Next.js cache options:

```tsx
// app/[lng]/(main)/products/page.tsx
import { getProducts } from "@/services/products";

export default async function ProductsPage() {
  const products = await getProducts(); // add { next: { revalidate: 60, tags: ["products"] } } to cache
  return <ProductList items={products} />;
}
```

**Client Component** — call the service directly inside an effect (query) or an event handler (mutation), tracking loading/error with local `useState`:

```tsx
"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import type { Product } from "@/services/products/types";

function ProductList() {
  const [data, setData] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    getProducts({ signal: controller.signal })
      .then((res) => setData(res))
      .catch((err) => {
        if (!controller.signal.aborted) handleErrors(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);
  // …
}
```

Errors thrown by `apiFetch` are `ApiError`; pass them to `handleErrors` to surface a toast.

## State Management

- Global state: Redux slices in `redux/` — use `RootState` and `AppDispatch` from `redux/index.ts`
- Server data: fetch it via a `services/` function (see **Data Fetching** above), not Redux. Redux is for client UI/session state only.
- Selectors: Colocate with their slice, not in components
- Do NOT create local state for data that belongs in Redux

## Shared Hooks (`hooks/`)

- `useAutoCompleteTranslation` — i18n autocomplete helper
- `useGetUserInfo` — access current authenticated user
- `useScreenSize` — responsive breakpoint detection

Check these before creating new hooks with similar purpose.

## Internationalization

- Use `react-i18next` for all user-facing strings. Never hardcode text.
- Translation key namespaces are defined in `types/TranslationKeyEnum.ts`
- Use `useAutoCompleteTranslation` hook for dynamic/autocomplete cases

### Adding new text — required steps

Whenever you add any user-facing string you **must** add the key to **both** locale files:

| File | Language |
| --- | --- |
| `app/i18n/locales/en/common.json` | English |
| `app/i18n/locales/ar/common.json` | Arabic |

**Workflow:**

1. Choose a SCREAMING_SNAKE_CASE key that describes the string (e.g. `SUBMIT_FORM`).
2. Add the English value to `app/i18n/locales/en/common.json`.
3. Add the Arabic translation to `app/i18n/locales/ar/common.json`.
4. Use the key in the component via the translation hook — never pass the raw string.

```json
// app/i18n/locales/en/common.json
{ "SUBMIT_FORM": "Submit" }

// app/i18n/locales/ar/common.json
{ "SUBMIT_FORM": "إرسال" }
```

```tsx
// ✅ in component
const { t } = useTranslation();
<Button variant="primary">{t("SUBMIT_FORM")}</Button>

// ❌ hardcoded — forbidden
<Button variant="primary">Submit</Button>
```

> Missing a key in either locale file is a bug — both files must stay in sync.

## Route Structure

- `app/(auth)/login` — public login page
- `app/(auth)/register` — public register page
- `app/dashboard/` — protected dashboard area
- Route groups `(auth)` have no URL segment impact
- Layouts: `app/layout.tsx` is root; add nested layouts per route group

## TypeScript

- Prefer `interface` for object shapes, `type` for unions/aliases
- Never use `any` — use `unknown` and narrow it
- **Never define types inline inside `.tsx` files** — always extract them into a co-located `types.ts` file

### Component types — always use a co-located `types.ts`

Every component that needs custom types (props, local interfaces, enums) must define them in a `types.ts` file in the **same folder** as the component, then import from `"./types"`. Never write `interface` or `type` declarations inside a `.tsx` file.

```text
components/sections/home/HeroBanner/
├── index.tsx       ← imports from "./types"
├── HeroCta.tsx     ← imports from "./types"
├── types.ts        ← all interfaces/types for this component
└── styles.module.scss
```

```ts
// ✅ types.ts
export interface HeroBannerProps {
  lng: string;
}

export interface HeroCtaProps {
  lng: string;
}
```

```tsx
// ✅ index.tsx
import { HeroBannerProps } from "./types";

export function HeroBanner({ lng }: HeroBannerProps) { … }

// ❌ — never define types inside the tsx file
interface HeroBannerProps { lng: string; }
```

**When NOT to create `types.ts`:** if the component takes no custom props (or only `{ children: ReactNode }`) there is nothing to extract — skip the file.
