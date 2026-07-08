# Nova Next Template

This is a modern, highly scalable [Next.js](https://nextjs.org) enterprise template bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), featuring a comprehensive, organized architecture.

## 📂 Project Structure

This project follows a feature-driven, modular structure to ensure maintainability, scalability, and clean separation of concerns.

```text
nova-next-template/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication layout group
│   ├── api/              # Backend API routes
│   └── dashboard/        # Dashboard layout group
├── assets/               # Static assets (images, fonts, raw media)
├── components/           # Reusable UI components
│   ├── ui/               # Base design system components (Button, Input, Modal, etc.)
│   └── layout/           # Layout components
│   └── shared/           # Shared components
├── constants/            # Application-wide constants & enums (e.g., COLORS.ts)
├── features/             # Feature-based modules (grouping logic, UI, and state per feature)
├── hooks/                # Custom React Hooks (e.g., useAutoCompleteTranslation.ts)
├── lib/                  # 3rd-party library configs & the fetch API client (lib/api/)
├── providers/            # React Context providers for global state/wrappers
├── public/               # Publicly accessible static files served at the root
├── services/             # Typed endpoint functions (e.g. services/auth/) built on lib/api
├── redux/                # Global client state — store & slices (Redux Toolkit)
├── styles/               # Global SCSS architecture
│   ├── _colors.scss      # Color tokens & CSS variable mappings
│   ├── _fonts.scss       # Global font definitions
│   ├── _mixins.scss      # Responsive utilities (e.g., VW-based calculations)
│   └── all.scss          # Central export file for components
├── types/                # Global TypeScript definitions & interfaces
└── utils/                # Helper functions (e.g., CN.ts, debounce.ts)
```

### Key Directories Explained:

- **`app/`**: Contains the Next.js routing system. It's strictly used for routing, page layouts, and backend API routes. Heavy logic is abstracted away into features or services.
- **`components/ui/`**: Houses our strictly visual, stateless components inspired by ShadCN and tailored to our SCSS/Tailwind design system.
- **`styles/`**: Centralized SCSS stylesheets that manage our global colors, typography, and responsive mixins (like our `vw` calculation logic).
- **`utils/` & `hooks/`**: Shared logic that doesn't belong to a specific feature domain but is used application-wide.

---

## 📦 Main Packages & Tech Stack

This template comes pre-configured with industry-standard tools:

- **Core**: [Next.js](https://nextjs.org/) (App Router), React, TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Sass](https://sass-lang.com/) (SCSS Modules & Global Styles)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (client UI / session state)
- **Data Fetching**: Native `fetch` client (`lib/api/`) + typed `services/` — works in Server **and** Client Components
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Utilities**: `clsx`, `tailwind-merge`

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Environment variables

Copy `.env.example` to `.env.local` and set the backend origin:

```bash
cp .env.example .env.local
```

```dotenv
# Requests are sent to `${NEXT_PUBLIC_API_URL}/${lang}/api/<path>`.
# Leave empty for same-origin relative requests.
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🔌 Data Fetching

Data is fetched with a native `fetch` client (`lib/api/`) rather than RTK Query, so **the same service functions run in both Server and Client Components**. The auth token is stored in a cookie (not `localStorage`) so Server Components can authenticate during SSR.

1. **Define an endpoint** in `services/<domain>/` using `apiMethods`:

   ```ts
   // services/products/index.ts
   import { apiMethods, type ApiFetchOptions } from "@/lib/api";
   import type { Product } from "./types";

   export function getProducts(options?: ApiFetchOptions) {
     return apiMethods.get<Product[]>("/products", options);
   }
   ```

2. **In a Server Component** — call it directly with `await` and opt into caching:

   ```tsx
   const products = await getProducts(); // { next: { revalidate: 60 } } to cache
   ```

3. **In a Client Component** — call it directly inside an effect (query) or an event handler (mutation), tracking state with `useState`:

   ```tsx
   "use client";
   useEffect(() => {
     const controller = new AbortController();
     getProducts({ signal: controller.signal })
       .then(setData)
       .catch(handleErrors);
     return () => controller.abort();
   }, []);
   ```

Failed requests throw a typed `ApiError` (`status`, `data`, `isNetworkError`); pass it to `utils/handleErrors` to surface a toast.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
