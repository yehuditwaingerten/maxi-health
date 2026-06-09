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
- **Prisma + SQLite** — database at `prisma/dev.db`
- **Zustand** — client-side cart state, persisted to `localStorage`
- **react-hook-form + zod** — form validation (used on both client and server API routes)
- **Nodemailer + Gmail SMTP** — sends owner email on every new order
- **Admin auth** — `HttpOnly` session cookie checked by `middleware.ts` (no auth library)

### Path alias
`@/*` maps to the project root. Use `@/app/...`, `@/lib/...`, `@/store/...` etc.

### Key directories
- `app/` — Next.js App Router: pages and `api/` routes
- `app/api/` — all API routes; admin routes live under `app/api/admin/` and are protected by middleware
- `lib/` — shared server-side utilities: `prisma.ts` (DB client singleton), `email.ts` (order notification), `env.ts` (startup env validation)
- `store/` — client-side Zustand cart store
- `components/` — shared React components
- `prisma/` — schema, migrations, and seed file

### Data flow for a new order
1. Customer submits `CheckoutForm` → `POST /api/orders`
2. API validates body with zod, writes `Order` + `OrderItems` to SQLite, generates reference `MH-XXXXX`
3. `sendOrderNotification()` in `lib/email.ts` emails the owner immediately
4. Customer is redirected to `/order-confirmed?ref=MH-XXXXX`
5. Owner logs in at `/admin`, views the order, updates status via `PATCH /api/admin/orders/[id]`

### Admin authentication
`middleware.ts` intercepts all `/admin/*` and `/api/admin/*` requests. It reads an `HttpOnly` cookie set by `POST /api/admin/login`. If the cookie is missing or invalid, the request is redirected to `/admin` (login page). The password is compared against `process.env.ADMIN_PASSWORD`.

### Environment variables
All required vars are validated at startup by `lib/env.ts` using zod — the app will throw a clear error on boot if any are missing. See `.env.example` for the full list:
- `DATABASE_URL` — SQLite file path (e.g. `file:./prisma/dev.db`)
- `OWNER_EMAIL` — receives order notification emails
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` — Gmail SMTP credentials (requires 2FA + App Password)
- `ADMIN_PASSWORD` — password for the `/admin` panel

### Clean code rules
- TypeScript strict mode is enabled — no `any`
- All API routes validate their request bodies with zod before touching the DB
- Shared logic belongs in `lib/` — never duplicate it in route handlers
- Tailwind styles are written mobile-first (`sm:` / `md:` / `lg:` breakpoints for larger screens)
- `next/image` must be used for all product images
