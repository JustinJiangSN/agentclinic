# Tech Stack

## Guiding principles

- TypeScript end-to-end — one language, no context-switching.
- Minimal infrastructure — SQLite keeps the stack self-contained and easy to run locally or on a single server.
- Modern browser-first — Tailwind CSS for styling; no legacy compatibility burden.
- Clean separation — the backend is a standalone TypeScript server; the frontend consumes it over HTTP.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Backend framework | **Hono** | TypeScript-native server framework; runs on Node.js (and edge runtimes if needed); minimal overhead, excellent DX, built-in routing and middleware |
| Frontend framework | Next.js (App Router) | React + server components for the dashboard UI; fetches data from the Hono API |
| UI | React + Tailwind CSS | Component-level styles; utility-first keeps the dashboard clean and consistent |
| Database | SQLite | File-based, zero infrastructure, sufficient for the expected load |
| ORM | Prisma | Type-safe schema, migrations, and query builder; lives in the Hono server, not the Next.js app |
| Auth | Hono middleware + session cookies | Staff sessions handled server-side; NextAuth replaced by a lightweight Hono auth layer |
| Deployment | Single VPS or local | Hono server and Next.js app run as two processes on the same host |

## Why Hono over the alternatives

- **vs. Express** — Hono is TypeScript-first by design; Express requires extra typing scaffolding and has no native request validation story.
- **vs. NestJS** — NestJS is production-grade but heavyweight and opinionated; Hono is small enough to read in an afternoon.
- **vs. Fastify** — Fastify is excellent; Hono wins on ergonomics, a cleaner middleware API, and future-proofing for edge/serverless if needed.
- **vs. Next.js server actions alone** — keeping business logic in a dedicated Hono server makes it testable, independently deployable, and accessible by any future client.

## What we are not using

- Next.js server actions for mutations — all data mutations go through the Hono API.
- A heavy ORM or query builder beyond Prisma — no raw SQL unless Prisma cannot express it.
- A component library — Tailwind custom components keep the UI bespoke and lightweight.
