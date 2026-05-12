# Requirements — MVP (Phases 2–5)

## Scope

The MVP delivers the complete core experience of AgentClinic across four phases: domain entities (agents, ailments, therapies), an appointment booking workflow, and a staff dashboard. Phases ship in order; each is independently reviewable and testable.

Phases 6 (Polish & Accessibility) and 7 (Hardening) are **deferred** — out of scope for this milestone.

## Target Audience

Course students running AgentClinic locally. Success means a working end-to-end flow explorable in a browser: every page renders, every form submits, and seed data provides a realistic starting state.

---

## Phase 2 — Agents & Ailments

### Layout
- A server-side JSX `Layout` component wraps every route: `<header>`, `<nav>`, `<main>`, `<footer>`.
- PicoCSS (classless variant) provides base styles, loaded via CDN or npm. No build step required.
- A `styles.css` supplement carries project-specific custom properties (brand color, spacing tokens).
- Mobile-first responsive layout provided by Pico out of the box.

### Database
- SQLite via `better-sqlite3`.
- Migrations are plain `.sql` files in `src/db/migrations/`, sorted by filename and executed via an idempotent bootstrap tracked in a `_migrations` table.
- No ORM — queries written directly in TypeScript.

### Seed Data
- Seeds populate `agents` and `ailments` with at least 5 fictional entries each.
- All seeds are idempotent (`INSERT OR IGNORE`).
- A `npm run seed` script triggers all seeds; safe to run multiple times.

### Routes
- `GET /agents` — list all agents (name, model type, status).
- `GET /agents/:id` — single agent profile with presenting ailments.
- `GET /ailments` — list all ailments with descriptions.
- Agents and ailments linked via `agent_ailments` join table.

---

## Phase 3 — Therapies Catalog

### Data
- `therapies` table: `id`, `name`, `description`, `created_at`.
- `ailment_therapies` join table mapping ailments to recommended therapies.
- Seed data: at least 5 fictional therapies (e.g., "Contextual Decompression", "Prompt Detox Retreat").

### Routes
- `GET /therapies` — list all therapies with descriptions.
- Ailment list (or detail) shows recommended therapies for each ailment.

---

## Phase 4 — Appointment Booking

### Data
- `appointments` table: `id`, `agent_id`, `therapist_name`, `datetime`, `status` (pending / confirmed / cancelled), `created_at`.
- No therapist entity for MVP — therapist name is a free-text field.

### Workflow
- Booking form reachable from an agent's detail page.
- Form fields: therapist name, appointment date/time (hidden agent_id).
- `POST /appointments` validates required fields, inserts the row.
- On success: redirect to a confirmation page showing booked details.
- On validation failure: re-render form with an inline error message.

---

## Phase 5 — Staff Dashboard

### Routes
- `GET /dashboard` — summary counts: total agents, open appointments (status `pending` or `confirmed`), distinct ailments.
- Browsable table views: all agents (name, model type, status) and all appointments (agent name, therapist, datetime, status).
- No auth required for MVP — dashboard is open access.

---

## Out of Scope for MVP
- Auth, email notifications, therapist profiles, reporting.
- Error pages (404/500) and input sanitization (Phase 7 — deferred).
- Full responsive audit and accessibility review (Phase 6 — deferred).
- Docker, external integrations, production deployment.

---

## Context

See `specs/mission.md` for domain background and `specs/tech-stack.md` for stack constraints. The Layout component, migration bootstrap, and seed pattern established in Phase 2 are inherited by all later phases without re-decision.
