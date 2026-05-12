# Requirements — Phase 1: Foundation

## Scope

Phase 1 delivers a running skeleton: the monorepo is set up, both services start, a staff member can log in, and the database has seed data. No patient-facing features are built yet.

Everything in this phase is infrastructure. If it is not listed below, it is out of scope for Phase 1.

---

## Decisions

### Monorepo layout

The repository uses a simple two-package monorepo — no build tool required beyond what each framework provides natively.

```
agentclinic/
├── web/              # Next.js app (frontend + SSR)
│   ├── src/
│   └── package.json
├── server/           # Hono API server
│   ├── src/
│   ├── prisma/
│   └── package.json
├── package.json      # Root — workspace definition, dev script via concurrently
├── tsconfig.base.json
└── .nvmrc
```

- `web/` and `server/` are pnpm workspaces.
- A shared `tsconfig.base.json` at the root sets common compiler options; each package extends it.
- The root `package.json` `dev` script starts both services in parallel via `concurrently`.
- There is no shared runtime code between `web/` and `server/` in Phase 1 — type sharing (if needed later) will be introduced in a later phase.

### SQLite file location

- The database file lives at `server/prisma/dev.db`.
- `DATABASE_URL` is set in `server/.env` as `file:./prisma/dev.db` (relative to `server/`).
- `server/.env` and `server/prisma/dev.db` are both gitignored.
- `server/.env.example` is committed, containing `DATABASE_URL="file:./prisma/dev.db"` as the only required variable.

---

## Context

- See [mission.md](../mission.md) for tone — even the seed data should reflect the clinic's voice (agent names, ailment names).
- See [tech-stack.md](../tech-stack.md) for the full stack rationale and the deliberate choice of Hono over Next.js server actions for all backend logic.
- Auth in this phase is intentionally minimal: hardcoded staff credentials in the seed, cookie-based sessions in Hono. Real user management (invites, password reset) is out of scope.
