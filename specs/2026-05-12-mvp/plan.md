# Plan — MVP (Phases 2–5)

Phases ship in order. Each numbered group is independently reviewable.

---

## Phase 2 — Agents & Ailments

### Group 1 — Shared Layout Component
1. Install `@picocss/pico` (or add CDN link) and confirm in `package.json`.
2. Create `src/components/Layout.tsx` — accepts `title` and `children`; renders full HTML shell with Pico stylesheet in `<head>` and `<header>`, `<nav>`, `<main>`, `<footer>` landmarks.
3. Create `src/static/styles.css` for brand overrides; serve via Hono static middleware.
4. Update the existing `/` route to render inside `Layout`.
5. Verify: `npm run dev`, visit `http://localhost:3000` — Pico base styles applied, all landmarks visible.

### Group 2 — Database Bootstrap
6. Install `better-sqlite3` and `@types/better-sqlite3`.
7. Create `src/db/index.ts` — opens/creates `agentclinic.db`, exports `db` instance.
8. Create `src/db/migrate.ts` — reads `*.sql` files from `src/db/migrations/` in sorted order, tracks runs in `_migrations` table, idempotent on repeated calls.
9. Call `migrate()` at server startup in `src/index.ts`.

### Group 3 — Agents Table & Seed
10. Create `src/db/migrations/001_create_agents.sql` — `agents(id, name, model_type, status, created_at)`; status values: `active`, `on_leave`, `discharged`.
11. Create `src/db/seeds/agents.ts` — insert 5–8 fictional agents via `INSERT OR IGNORE`.
12. Wire a `npm run seed` script; optionally call seed at dev startup.

### Group 4 — Ailments Table & Seed
13. Create `src/db/migrations/002_create_ailments.sql` — `ailments(id, name, description)`.
14. Create `src/db/migrations/003_create_agent_ailments.sql` — join table with composite PK `(agent_id, ailment_id)`.
15. Create `src/db/seeds/ailments.ts` — 5–8 ailments (e.g., "context-window claustrophobia", "prompt fatigue"); extend seed script to link agents to ailments.

### Group 5 — Agents Routes
16. Create `src/routes/agents.ts` — `GET /agents` (list all) and `GET /agents/:id` (detail + joined ailments).
17. Create `src/components/AgentsList.tsx` and `src/components/AgentDetail.tsx`.
18. Register agents router in `src/index.ts`; add `/agents` nav link in `Layout`.

### Group 6 — Ailments Route
19. Create `src/routes/ailments.ts` — `GET /ailments`.
20. Create `src/components/AilmentsList.tsx`.
21. Register router; add `/ailments` nav link in `Layout`.

### Group 7 — Phase 2 CSS
22. Use Pico `<table>` for agent list; `<article>` card pattern for agent detail; `<ul>` for ailments.
23. Smoke-test layout at 375px and 1280px.

---

## Phase 3 — Therapies Catalog

### Group 8 — Therapies Table & Seed
24. Create `src/db/migrations/004_create_therapies.sql` — `therapies(id, name, description, created_at)`.
25. Create `src/db/migrations/005_create_ailment_therapies.sql` — join table `(ailment_id, therapy_id)` composite PK.
26. Create `src/db/seeds/therapies.ts` — 5+ fictional therapies; link to ailments in seed.
27. Extend `npm run seed` to include therapies.

### Group 9 — Therapies Route
28. Create `src/routes/therapies.ts` — `GET /therapies`.
29. Create `src/components/TherapiesList.tsx`.
30. Register router; add `/therapies` nav link.

### Group 10 — Ailment → Therapy Display
31. Update `AilmentsList.tsx` (or add `src/routes/ailments/:id`) to show recommended therapies per ailment.
32. Query `ailment_therapies` join and render therapy names alongside each ailment.

---

## Phase 4 — Appointment Booking

### Group 11 — Appointments Table
33. Create `src/db/migrations/006_create_appointments.sql` — `appointments(id, agent_id, therapist_name, datetime, status, created_at)`.
34. No seed data needed; table starts empty.

### Group 12 — Booking Form
35. Add `GET /appointments/new` route (accepts `?agent_id=`) — renders booking form pre-populated with agent context.
36. Create `src/components/BookingForm.tsx` — fields: therapist name, datetime; hidden agent_id; submits to `POST /appointments`.
37. Add "Book Appointment" link on `AgentDetail` page: `/appointments/new?agent_id=:id`.

### Group 13 — Submission & Confirmation
38. Add `POST /appointments` — validate required fields; insert row; redirect to `/appointments/:id/confirmation` on success; re-render form with inline error on failure.
39. Add `GET /appointments/:id/confirmation` — confirmation page.
40. Create `src/components/BookingConfirmation.tsx` — shows agent name, therapist, datetime, status.
41. Register appointments router in `src/index.ts`.

---

## Phase 5 — Staff Dashboard

### Group 14 — Summary Dashboard
42. Create `src/routes/dashboard.ts` — `GET /dashboard`.
43. Query: count of all agents, count of open appointments (status `pending` or `confirmed`), count of distinct ailments.
44. Create `src/components/Dashboard.tsx` — summary count cards.

### Group 15 — Staff Table Views
45. Add agents table section to dashboard — name, model type, status.
46. Add appointments table section — agent name, therapist name, datetime, status.
47. Register dashboard router; add `/dashboard` nav link in `Layout`.
