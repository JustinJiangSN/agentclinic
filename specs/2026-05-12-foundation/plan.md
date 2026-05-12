# Plan — Phase 1: Foundation

Tasks are ordered frontend-first so the UI shell is visible early. Each group is a logical unit of work that can be reviewed independently.

---

## 1. Next.js app scaffold

- `pnpm create next-app web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Verify Tailwind config picks up `src/**/*.{ts,tsx}`
- Add a base layout (`src/app/layout.tsx`) with a minimal shell: nav bar placeholder, main content area, footer placeholder
- Add a root page (`src/app/page.tsx`) with a stub "AgentClinic" heading
- Confirm `pnpm dev` starts and renders at `localhost:3000`

## 2. Hono server stub

- Create `server/` package: `package.json` (type: module), `tsconfig.json` extending root
- Install: `hono`, `@hono/node-server`
- Write `server/src/index.ts`: starts on port 3001, exposes `GET /health → { status: "ok" }`
- Confirm `pnpm dev` in `server/` starts and `curl localhost:3001/health` returns 200

## 3. Prisma + SQLite

- Install `prisma` and `@prisma/client` in `server/`
- `prisma init --datasource-provider sqlite`; set `DATABASE_URL="file:./prisma/dev.db"` in `server/.env`
- Add initial schema: `Agent`, `Ailment`, `Therapy` models with the fields from Phase 2–3 (so the seed has something to populate)
- Run `prisma migrate dev --name init`
- Wire `PrismaClient` into the Hono app as a shared singleton

## 4. Auth

- Add a `Staff` model to the Prisma schema (id, email, passwordHash)
- Install `bcryptjs` (+ `@types/bcryptjs`) in `server/`
- Implement `POST /auth/login` in Hono: validate credentials, set a signed session cookie
- Implement `GET /auth/me` and a `requireAuth` middleware that reads the cookie
- Add a `/login` page in Next.js (`web/`) that POSTs to the Hono endpoint and redirects on success
- Protect a stub `/dashboard` route in Next.js with a client-side redirect if no session

## 5. Seed script

- Create `server/prisma/seed.ts`
- Seed: 1 staff account (email: `staff@agentclinic.dev`, password: `changeme`), 5 sample agents, 4 ailments, 3 therapies
- Register in `server/package.json` under `prisma.seed`
- Confirm `prisma db seed` completes without error and rows appear in the DB

## 6. Local run documentation

- Add `CONTRIBUTING.md` at repo root covering: prerequisites (Node 20+, pnpm), one-time setup (`pnpm install`, `prisma migrate dev`, `prisma db seed`), and how to start both services (`pnpm dev` from root via a root-level `package.json` `dev` script using `concurrently`)
- Add `.nvmrc` pinned to `20`
