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
├── lib/                  # 3rd-party library configurations & wrappers
├── providers/            # React Context providers for global state/wrappers
├── public/               # Publicly accessible static files served at the root
├── services/             # API clients, endpoint definitions, and external data fetching
├── store/                # Global state management (e.g., Zustand, Redux)
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
- **State Management & Data Fetching**: [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
