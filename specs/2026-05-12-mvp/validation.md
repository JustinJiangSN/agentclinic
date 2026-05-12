# Validation — MVP (Phases 2–5)

The MVP is complete and ready to merge when every criterion below passes for each phase.

---

## 1. TypeScript Compiles Clean

```
npx tsc --noEmit
```

Must exit with code 0, no errors or warnings.

---

## 2. Vitest Tests

```
npm test
```

All tests must pass. Required coverage by phase:

### Phase 2 — Database & Routes

**Migrations**
- `migrate()` runs without error against an in-memory or temp SQLite file.
- Running `migrate()` twice is idempotent (no duplicate-migration errors).
- `agents`, `ailments`, and `agent_ailments` tables exist with expected columns after migration.

**Seed Data**
- After seeding: `SELECT COUNT(*) FROM agents` ≥ 5.
- After seeding: `SELECT COUNT(*) FROM ailments` ≥ 5.
- At least one row exists in `agent_ailments` after seeding.
- Running seed twice does not duplicate rows.

**Routes**
- `GET /` returns HTTP 200 with `<header>`, `<main>`, `<footer>` in the response body.
- `GET /agents` returns HTTP 200 and lists agent names.
- `GET /agents/:id` for a known seed agent returns HTTP 200 with the agent's name and at least one ailment.
- `GET /agents/99999` returns HTTP 404.
- `GET /ailments` returns HTTP 200 and lists ailment names.

### Phase 3 — Therapies

**Migrations & Seed**
- `therapies` and `ailment_therapies` tables exist after migration.
- After seeding: `SELECT COUNT(*) FROM therapies` ≥ 5.
- At least one row exists in `ailment_therapies` after seeding.

**Routes**
- `GET /therapies` returns HTTP 200 and lists therapy names.
- Ailment list (or detail) response includes at least one therapy name linked to an ailment.

### Phase 4 — Appointments

**Migrations**
- `appointments` table exists with `id`, `agent_id`, `therapist_name`, `datetime`, `status`, `created_at` columns.

**Route Behaviour**
- `GET /appointments/new?agent_id=:id` returns HTTP 200 with a form element.
- `POST /appointments` with valid fields returns HTTP 302 (redirect to confirmation).
- `POST /appointments` with missing fields returns HTTP 200 (re-rendered form) with an error message in the body.
- `GET /appointments/:id/confirmation` for a created appointment returns HTTP 200 with agent name and therapist name.

### Phase 5 — Dashboard

- `GET /dashboard` returns HTTP 200.
- Response body contains numeric summary values (counts are present; exact values not asserted).
- Response body contains an agent name from seed data (agents table is surfaced).
- Response body is empty of `<form>` elements (dashboard is read-only).

---

## 3. Manual Smoke Test Checklist

Start the dev server (`npm run dev`) and verify each item in a browser.

### Layout (all pages)
- [ ] Header, nav, main, and footer are visible on every route.
- [ ] Nav contains working links to `/`, `/agents`, `/ailments`, `/therapies`, and `/dashboard`.
- [ ] Stylesheet loads — body text is styled, not a browser-default serif dump.
- [ ] At 375px viewport: layout stacks vertically with no horizontal scroll on any page.
- [ ] At 1280px viewport: layout makes sensible use of available width.

### Phase 2 — Agents & Ailments
- [ ] `/agents` lists ≥ 5 agents with name, model type, and status.
- [ ] Clicking an agent name navigates to `/agents/:id`.
- [ ] Agent detail page shows name, model type, status, and at least one ailment.
- [ ] `/agents/99999` renders a 404-style response (no 500 crash).
- [ ] `/ailments` lists ≥ 5 ailments with names and descriptions.

### Phase 3 — Therapies
- [ ] `/therapies` lists ≥ 5 therapies with names and descriptions.
- [ ] At least one ailment on `/ailments` (or `/ailments/:id`) shows linked recommended therapies.

### Phase 4 — Appointment Booking
- [ ] Agent detail page has a visible "Book Appointment" link.
- [ ] Clicking the link opens the booking form with the agent's name visible.
- [ ] Submitting the form with valid inputs redirects to a confirmation page showing therapist name and datetime.
- [ ] Submitting with a missing required field (e.g., no therapist name) re-renders the form with an inline error — no 500 crash.

### Phase 5 — Staff Dashboard
- [ ] `/dashboard` loads without error.
- [ ] Summary counts are visible and non-zero (agents and ailments from seed; appointments from any booking done during smoke test).
- [ ] Agent table shows name, model type, and status for all seeded agents.
- [ ] Appointment table shows booked appointments with agent name, therapist name, datetime, and status.
