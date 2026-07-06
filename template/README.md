# Nova Next Template

This is a modern, highly scalable [Next.js](https://nextjs.org) enterprise template bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), featuring a comprehensive, organized architecture.

## 📂 Project Structure

This project follows a feature-driven, modular structure to ensure maintainability, scalability, and clean separation of concerns.

```text
nova-next-template/
├── .agent/                   # Gemini AI agent configuration
│   ├── rules/                # Agent rule definitions
│   ├── workflows/            # Automated agent workflows
│   ├── scripts/              # Agent utility scripts
│   └── templates/            # Agent prompt templates
├── .claude/                  # Claude AI assistant configuration
│   └── skills/               # Skill definitions for Claude
├── .specify/                 # Specify design token configuration
│   ├── commands/             # Specify CLI commands
│   ├── memory/               # Cached design tokens
│   ├── scripts/              # Transformation scripts
│   └── templates/            # Output templates
├── api/                      # RTK Query API layer
│   ├── middlewares/           # API middleware (error handling, etc.)
│   ├── services/              # API service definitions (endpoints)
│   ├── types/                 # API request/response TypeScript types
│   ├── Domain.ts              # Base API domain configuration
│   ├── index.ts               # RTK Query API slice setup
│   └── tagTypes.ts            # Cache tag type definitions
├── app/                      # Next.js App Router
│   ├── [lng]/                 # Dynamic locale segment
│   │   ├── (auth)/            # Auth layout group (login, register)
│   │   ├── (main)/            # Main layout group (dashboard, pages)
│   │   ├── [...not-found]/    # Catch-all 404 page
│   │   ├── globals.scss       # Global styles
│   │   └── layout.tsx         # Root locale layout
│   ├── i18n/                  # Internationalization config
│   │   ├── locales/           # Translation files (ar, en)
│   │   ├── client.js          # Client-side i18n setup
│   │   ├── index.js           # Server-side i18n setup
│   │   └── settings.ts        # Language settings
│   └── favicon.ico
├── components/               # Reusable UI components
│   ├── layout/                # Layout components
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── PageWrapper/
│   │   ├── Sidebar/
│   │   └── ToastProvider/
│   ├── sections/              # Page-specific sections
│   │   ├── auth/              # Auth forms (loginForm, registerForm)
│   │   └── home/              # Home sections (HeroBanner, FeaturesSection)
│   ├── shared/                # Shared components
│   │   ├── ConfirmDialog/
│   │   ├── DataTable/
│   │   ├── EmptyState/
│   │   ├── ErrorView/
│   │   └── PageLoader/
│   └── ui/                    # Base design system components
│       ├── Button/
│       ├── Icon/
│       ├── Input/             # Input + variants (DatePicker, Rate, Selection)
│       ├── LangSwitch/
│       ├── Modal/
│       ├── PhoneInput/
│       ├── Spinner/
│       └── Text/
├── constants/                # App-wide constants (Colors.ts, assets.ts)
├── data/                     # Static data & content (home.ts, navigation.ts)
├── hooks/                    # Custom React Hooks
│   ├── useAbortableQuery.ts
│   ├── useAutoCompleteTranslation.ts
│   ├── useGetUserInfo.ts
│   └── useScreenSize.ts
├── lib/                      # 3rd-party library configs & wrappers
│   └── ai/                    # AI integration (Vercel AI SDK)
│       ├── adapter.ts
│       ├── constitution.ts
│       ├── index.ts
│       └── prompts.ts
├── public/                   # Static files served at root
│   ├── icons/                 # SVG icon assets
│   └── images/                # Image assets
├── redux/                    # Redux state management
│   ├── ReduxProvider.tsx      # Store provider wrapper
│   ├── appReducer.ts          # App-level state slice
│   ├── authReducer.ts         # Auth state slice
│   └── index.ts               # Store configuration
├── styles/                   # Global SCSS architecture
│   ├── _colors.scss           # Color tokens & CSS variable mappings
│   ├── _functions.scss        # SCSS utility functions
│   ├── _mixins.scss           # Responsive utilities (VW-based calculations)
│   ├── _responsive.scss       # Breakpoint definitions
│   ├── _typography.scss       # Typography system
│   ├── _variables.scss        # Global SCSS variables
│   └── all.scss               # Central import file
├── types/                    # Global TypeScript definitions
│   ├── common.ts
│   ├── static-files.d.ts
│   └── TranslationKeyEnum.ts
└── utils/                    # Helper functions
    ├── CN.ts                  # Class name utility
    ├── debounce.ts
    ├── handleErrors.ts
    ├── isDev.ts
    ├── loginHandler.ts
    ├── logoutHandler.ts
    ├── showAuthToast.ts
    └── validationSchemas.ts
```

### Key Directories Explained:

- **`app/`**: Contains the Next.js App Router with locale-based dynamic routing (`[lng]`). Strictly used for routing, page layouts, and metadata. Heavy logic is abstracted into `api/`, `components/sections/`, or `hooks/`.
- **`api/`**: Centralized RTK Query API layer with service definitions, types, middlewares, and cache tag management. This is where all backend communication is defined.
- **`components/ui/`**: Houses strictly visual, reusable design system components, each with its own `index.tsx`, `styles.module.scss`, and `types.ts`.
- **`components/sections/`**: Page-specific component compositions grouped by feature (e.g., `auth/loginForm`, `home/HeroBanner`).
- **`redux/`**: Global state management using Redux Toolkit, with separate slices for app-level and auth state.
- **`styles/`**: Centralized SCSS stylesheets that manage global colors, typography, and responsive mixins (like the `vw` calculation logic).
- **`lib/ai/`**: AI integration layer using the Vercel AI SDK with constitution, prompts, and adapter configuration.
- **`.agent/` & `.claude/`**: AI assistant configurations for Gemini and Claude, providing rules, workflows, and skills for AI-assisted development.
- **`utils/` & `hooks/`**: Shared logic that doesn't belong to a specific feature domain but is used application-wide.

---

## 📦 Main Packages & Tech Stack

This template comes pre-configured with industry-standard tools:

- **Core**: [Next.js](https://nextjs.org/) (App Router), React 19, TypeScript
- **Styling**: [Sass](https://sass-lang.com/) (SCSS Modules & Global Styles) with [Tailwind CSS v4](https://tailwindcss.com/) utilities
- **State Management & Data Fetching**: [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Internationalization**: [react-i18next](https://react.i18next.com/) with server & client support
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Utilities**: `clsx`, `tailwind-merge`, `react-toastify`, `lucide-react`

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
