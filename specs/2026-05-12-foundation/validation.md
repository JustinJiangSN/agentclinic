# Validation — Phase 1: Foundation

Phase 1 is complete and ready to merge when all of the following pass with no exceptions.

---

## TypeScript clean build

Run across both packages from the repo root:

```bash
pnpm --filter web tsc --noEmit
pnpm --filter server tsc --noEmit
```

**Pass condition:** zero errors, zero warnings treated as errors. `strict: true` must be enabled in both `tsconfig.json` files — a clean build under loose settings does not count.

If either command exits non-zero, the phase is not done.

---

## Checklist

Before opening the PR, confirm each item manually:

- [ ] `pnpm install` from repo root completes with no peer-dependency warnings that require action
- [ ] `pnpm --filter server prisma migrate dev` runs to completion on a fresh checkout (no existing `dev.db`)
- [ ] `pnpm --filter server prisma db seed` inserts rows and is idempotent on a second run (no duplicate-key errors)
- [ ] `pnpm dev` from root starts both `web` (port 3000) and `server` (port 3001) without errors in the console
- [ ] `GET localhost:3001/health` returns `{"status":"ok"}` with HTTP 200
- [ ] Navigating to `localhost:3000/login`, submitting the seed credentials (`staff@agentclinic.dev` / `changeme`), and landing on `/dashboard` works end-to-end
- [ ] Navigating directly to `localhost:3000/dashboard` without a session redirects to `/login`
- [ ] `server/.env` and `server/prisma/dev.db` are absent from `git status` (confirmed gitignored)
- [ ] `server/.env.example` is present and committed
