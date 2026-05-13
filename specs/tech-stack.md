# Tech Stack

## Current Stack

| Layer | Technology | Notes |
|---|---|---|
| Language | TypeScript 5.x | Strict mode, shared across server and templates |
| Server framework | Hono 4.x | Lightweight, edge-compatible, JSX support built in |
| Templating | Server-side JSX (`.tsx`) | No client-side framework; HTML rendered on the server |
| Database | SQLite via `better-sqlite3` | Single-file DB, synchronous driver, migration files in `src/db/migrations/` |
| Test runner | Vitest 4.x | Fast, TS-native, minimal config |
| Runtime / dev | `tsx` (watch mode) | No compile step in dev; `tsc` for production build |

## Known Gaps

### 1. Styling system
**Problem:** Pages are unstyled; Steve in marketing needs an attractive, browser-modern UI.
**Decision needed:** Tailwind CSS (utility-first, minimal runtime) is the recommended default for a TypeScript/Hono project at this scale. Plain CSS modules are the low-dependency alternative.
**Recommended:** Tailwind CSS — integrates cleanly with server-side JSX and keeps markup self-contained.

### 2. Auth / sessions
**Problem:** The `/dashboard` route is fully public. Clinic staff data must be protected.
**Decision needed:** Cookie-based sessions (no heavy OAuth dependency) using Hono's built-in cookie utilities and a `users` table in SQLite.
**Recommended:** Simple username + bcrypt password auth with a signed session cookie — no external auth service required for v1.

### 3. Deployment / hosting
**Problem:** No Dockerfile, CI pipeline, or hosting target is defined. Mary in engineering needs a reliable delivery path.
**Decision needed:** A minimal `Dockerfile` + a GitHub Actions workflow (build → test → deploy) targeting a Node-compatible host (Fly.io, Railway, or Render are all a good fit for Hono + SQLite).
**Recommended:** Fly.io — persistent volume for the SQLite file, simple `fly deploy`, free tier available.

## Constraints

- All server logic stays in TypeScript; no Python or Go microservices
- SQLite is the database for v1; no migration to Postgres until traffic or concurrency demands it
- No client-side framework (React, Vue, etc.) unless a specific feature cannot be built with server-side rendering
