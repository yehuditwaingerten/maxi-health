# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Maxi Health is a vitamin e-commerce shop. Customers browse products, add to cart, and place orders (cash on delivery). The shop owner receives an email notification for every new order and delivers manually. There is also an admin panel to view and update order statuses.

## Commands

```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
npx prisma migrate dev --name <name>   # Create and apply a new migration
npx prisma db seed                     # Seed the database with sample vitamins
npx prisma studio                      # Open Prisma database GUI
```

## Architecture

### Stack
- **Next.js 14 App Router** — pages and API routes live together in `app/`
- **Prisma 7 + SQLite** — database at `prisma/dev.db`, accessed through the `better-sqlite3` driver adapter. The generated client lives in `app/generated/prisma` (gitignored; regenerate with `npx prisma generate`)
- **Zustand** — client-side cart and language state, both persisted to `localStorage`
- **react-hook-form + zod** — form validation (used on both client and server API routes)
- **Nodemailer + Gmail SMTP** — sends owner email on every new order
- **Admin auth** — `HttpOnly` session cookie checked by `middleware.ts` (no auth library)

### Path alias
`@/*` maps to the project root. Use `@/app/...`, `@/lib/...`, `@/store/...` etc.

### Key directories
- `app/` — Next.js App Router: pages and `api/` routes
- `app/api/` — all API routes; admin routes live under `app/api/admin/` and are protected by middleware
- `lib/` — shared utilities: `prisma.ts` (DB client singleton), `email.ts` (order notification), `env.ts` (startup env validation), `translations.ts` (Hebrew/English UI strings)
- `store/` — client-side Zustand stores: `cartStore.ts`, `languageStore.ts`
- `hooks/` — `useT()` returns the translation object for the current language
- `components/` — shared React components, including the `*Content.tsx` client components that render each customer page's translated content
- `prisma/` — schema, migrations, and seed file

### Data flow for a new order
1. Customer submits `CheckoutForm` → `POST /api/orders`
2. API validates body with zod, writes `Order` + `OrderItems` to SQLite, generates reference `MH-XXXXX`
3. `sendOrderNotification()` in `lib/email.ts` emails the owner immediately
4. Customer is redirected to `/order-confirmed?ref=MH-XXXXX`
5. Owner logs in at `/admin`, views the order, updates status via `PATCH /api/admin/orders/[id]`

### Admin authentication
`middleware.ts` intercepts all `/admin/*` and `/api/admin/*` requests (but not `/admin` itself, which is the login page). `POST /api/admin/login` compares the submitted password against `ADMIN_PASSWORD` and, on success, sets an `HttpOnly` `admin_session` cookie whose value is `ADMIN_SESSION_SECRET`. The middleware lets a request through only if the cookie matches that secret; otherwise it redirects to `/admin`.

Order data (customer name, phone, address) must only be served from routes under `app/api/admin/`. There is deliberately no public endpoint for looking up an order by reference.

### Internationalization
The customer-facing site is bilingual: Hebrew (default, RTL) and English. The current language lives in `store/languageStore.ts`; `components/LanguageSync.tsx` sets `<html lang>` and `dir` to match. Customer pages are server components that fetch data and set metadata, then render a `*Content.tsx` client component, which reads strings via `useT()`. When adding UI text, add both `he` and `en` entries to `lib/translations.ts` — never hard-code user-facing strings. Products have an optional `descriptionHe` field alongside `description`. Prices are shown in shekels (`₪`). The admin panel is English-only.

### Environment variables
All required vars are validated at startup by `lib/env.ts` using zod — the app will throw a clear error on boot if any are missing. See `.env.example` for the full list:
- `DATABASE_URL` — SQLite file path (e.g. `file:./prisma/dev.db`)
- `OWNER_EMAIL` — receives order notification emails
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` — Gmail SMTP credentials (requires 2FA + App Password)
- `ADMIN_PASSWORD` — password for the `/admin` panel
- `ADMIN_SESSION_SECRET` — at least 32 characters; used as the admin session cookie value. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `SITE_URL` — public site URL used for the sitemap (defaults to `https://maxi-health.com`)

### Clean code rules
- TypeScript strict mode is enabled — no `any`
- All API routes validate their request bodies with zod before touching the DB
- Shared logic belongs in `lib/` — never duplicate it in route handlers
- Tailwind styles are written mobile-first (`sm:` / `md:` / `lg:` breakpoints for larger screens)
- `next/image` must be used for all product images
