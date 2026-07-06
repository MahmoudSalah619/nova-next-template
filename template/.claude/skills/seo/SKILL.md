---
name: seo
description: Implement SEO in this Next.js App Router app — Metadata API (static + generateMetadata), Open Graph/Twitter cards, canonical URLs, sitemap.ts, robots.ts, JSON-LD structured data, and i18n/hreflang. Use when adding or reviewing page metadata, fixing missing/duplicate titles, improving search/social previews, or auditing crawlability.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# SEO (Next.js App Router)

## Overview

Drive SEO through Next.js's built-in **Metadata API**, not `next/head` (which does nothing in App Router — see `nextjs-anti-patterns`). Every indexable route should export `metadata` or `generateMetadata`. Keep metadata in Server Components; a `'use client'` file cannot export it.

## Static Metadata

For routes with fixed content, export a `metadata` object:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your account, billing, and settings.',
};
```

### Root layout: defaults + title template

Set site-wide defaults once in `app/layout.tsx`. Use `metadataBase` so relative OG/canonical URLs resolve to absolute, and a `title.template` so child pages only supply their own segment:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  title: {
    default: 'Acme — Your tagline',
    template: '%s | Acme',          // child `title: 'Dashboard'` → "Dashboard | Acme"
  },
  description: 'Default site description used when a page omits one.',
  openGraph: { type: 'website', siteName: 'Acme', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};
```

## Dynamic Metadata (`generateMetadata`)

For dynamic routes, generate metadata from the same data the page renders. **In Next.js 15/16 `params` and `searchParams` are Promises — await them.** Fetches are deduped/cached, so calling the data source here and in the page is fine.

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};                 // page itself should call notFound()

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}
```

## Open Graph & Twitter Cards

For rich link previews:
- Provide `openGraph.images` at **1200×630** with descriptive `alt`. `metadataBase` makes relative paths absolute.
- `twitter.card: 'summary_large_image'` for a large preview; Twitter falls back to OG fields.
- Consider file-based OG images: `app/**/opengraph-image.tsx` (or `.png`) — Next generates the tag automatically. Use `ImageResponse` from `next/og` for dynamic ones.

## Canonical URLs

Prevent duplicate-content penalties from query strings, trailing slashes, or multiple paths:

```tsx
export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },   // resolved against metadataBase
};
```

Set a canonical on any page reachable by more than one URL (filters, pagination, tracking params).

## Robots & Indexing Control

- Per page: `export const metadata = { robots: { index: false, follow: true } }` to keep a page out of search (e.g. auth, dashboard, thank-you pages).
- Site-wide: add `app/robots.ts`:

```tsx
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
  };
}
```

Note: the `(auth)` route group and `dashboard/` here are private — mark them `noindex` or `disallow` them.

## Sitemap

Add `app/sitemap.ts` (Next serves it at `/sitemap.xml`). Generate dynamic entries from your data:

```tsx
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  const posts = await getAllPosts();

  const staticRoutes = ['', '/pricing', '/blog'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

Only include indexable, public, canonical URLs — never `noindex` or auth-gated routes.

## Structured Data (JSON-LD)

Add schema.org JSON-LD for rich results (articles, products, breadcrumbs, FAQs). Render a `<script type="application/ld+json">` in the Server Component:

```tsx
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* …article markup… */}
    </>
  );
}
```

Keep JSON-LD values consistent with the visible page content, and validate against Google's Rich Results Test.

## i18n & hreflang

This app uses `react-i18next`. For multi-language pages, declare language alternates so search engines serve the right locale:

```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: '/pricing',
    languages: { 'en-US': '/en/pricing', 'ar': '/ar/pricing' },
  },
};
```

Keep translated `title`/`description` localized too — don't ship English metadata on a translated page.

## Foundational SEO (don't forget)

These overlap with `semantic-html` and accessibility:
- One descriptive `<h1>` per page; logical heading outline.
- Semantic landmarks (`main`, `nav`, `article`) — crawlers use them.
- Every `Image` has meaningful `alt` (empty `alt=""` only for decorative).
- Descriptive, stable URL slugs; avoid deep nesting and tracking params in canonical links.
- Fast LCP/CLS — use `next/image`, stream slow data with `<Suspense>`.

## Review Checklist

- [ ] Root layout sets `metadataBase`, a `title.template`, and default description.
- [ ] Every indexable route exports `metadata` or `generateMetadata` (Server Component, not `'use client'`).
- [ ] Dynamic routes await `params`/`searchParams` and derive metadata from page data.
- [ ] `title` + `description` are unique and meaningful per page (no template defaults left in).
- [ ] Open Graph + Twitter set; OG image 1200×630 with `alt`.
- [ ] Canonical URL set on any multi-URL page; no duplicate content.
- [ ] Private routes (`(auth)`, `dashboard/`) are `noindex` / disallowed.
- [ ] `app/sitemap.ts` and `app/robots.ts` exist and list only public, canonical URLs.
- [ ] JSON-LD added where rich results apply and matches visible content.
- [ ] `hreflang`/`languages` + localized metadata for translated pages.
- [ ] No `next/head` usage anywhere.
