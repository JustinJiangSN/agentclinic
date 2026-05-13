# Roadmap

Phases are deliberately small — each should be shippable independently. Order is driven by TODO.md priorities and the tech gaps identified in `tech-stack.md`.

---

## Phase 1 — Styling foundation
_Goal: make every existing page look polished before adding more content._

- Add Tailwind CSS to the build
- Apply base layout styles to `Layout.tsx`, `Header.tsx`, `Footer.tsx`
- Style the home page and navigation

## Phase 2 — Style core feature pages
_Goal: complete the visual pass Susan's product features need._

- Style `AgentsList`, `AgentDetail`, `AilmentsList`, `TherapiesList`
- Style `BookingForm` and `BookingConfirmation`
- Style `Dashboard`

## Phase 3 — Feedback form
_Goal: ship the NOW item from TODO.md._

- Add a `feedback` table (migration)
- Build the feedback form route and component
- Show a confirmation page on submit

## Phase 4 — Auth / staff login
_Goal: protect the dashboard before any sensitive data is exposed._

- Add a `users` table (migration) with hashed passwords
- Implement login / logout routes with signed session cookie
- Guard `/dashboard` and any staff-only routes with a middleware check

## Phase 5 — Customer reviews
_Goal: first item from the TODO.md "Next" list._

- Add a `reviews` table linked to agents or therapies
- Public route to browse reviews
- Authenticated route for staff to moderate (approve / remove)

## Phase 6 — About us page
_Goal: second item from the TODO.md "Next" list._

- Static `About` page with clinic address and contact info
- Embed a map (static image or iframe) for the address

## Phase 7 — Deployment pipeline
_Goal: give Mary a reliable, automated delivery path._

- Add `Dockerfile` for the Hono server
- Add GitHub Actions workflow: typecheck → test → build → deploy
- Configure Fly.io app with a persistent volume for `agentclinic.db`
- Document the deploy process in `README.md`

---

## Backlog (post-v1)

- Email / appointment reminder notifications
- Agent self-service portal (API key auth)
- Customer-facing review submission
- Analytics / usage dashboard for clinic administrators
