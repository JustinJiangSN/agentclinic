# Roadmap

Phases are feature-grouped. Each phase is independently shippable. Phases do not start until the previous one is complete and reviewed.

---

## Phase 1 — Foundation

Set up the project so any developer can run it in one command.

- Scaffold Next.js app with TypeScript, Tailwind CSS, and ESLint
- Configure Prisma with SQLite
- Set up NextAuth.js with a basic staff login
- Seed script with a handful of example agents, ailments, and therapies
- Deploy to a single VPS (or document local-only setup)

---

## Phase 2 — Agent Management

Staff can view and manage the patient roster.

- Agent data model (name, model type, status, registration date)
- Agent list page with search and filter
- Agent detail page
- Create / edit / archive an agent (CRUD)

---

## Phase 3 — Ailments & Therapies

Capture what is wrong and what might help.

- Ailment data model (name, severity, description)
- Therapy data model (name, duration, description)
- Association: an agent can have many ailments; a therapy addresses one or more ailments
- Admin pages to manage the ailment and therapy catalogs

---

## Phase 4 — Appointments & Booking

Agents get scheduled; staff track progress.

- Appointment data model (agent, therapy, staff member, datetime, status)
- Booking flow: select agent → select therapy → pick slot → confirm
- Appointment list and calendar view on the staff dashboard
- Status transitions: scheduled → in-progress → complete / cancelled

---

## Phase 5 — Dashboard & Polish

Make Steve happy; make the site feel real.

- Summary dashboard: active patients, upcoming appointments, popular ailments
- Public-facing marketing landing page (attractive, works well in a modern browser)
- Responsive layout audit across viewport sizes
- Accessibility pass (keyboard nav, ARIA labels, color contrast)

---

## Out of scope (for now)

- Agent self-service portal — agents cannot book their own appointments (yet)
- Email or notification system
- Multi-tenant / multi-clinic support
- Billing
