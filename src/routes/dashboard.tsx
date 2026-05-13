import { Hono } from "hono";
import type Database from "better-sqlite3";
import { Dashboard } from "../components/Dashboard";
import type { Agent, Appointment, Review } from "../db/types";
import { requireAuth } from "../auth";

export function dashboardRouter(db: Database.Database) {
  const router = new Hono();

  router.use("/*", requireAuth(db));

  const countAgents = db.prepare("SELECT COUNT(*) as count FROM agents");
  const countOpenAppointments = db.prepare(
    "SELECT COUNT(*) as count FROM appointments WHERE status IN ('pending', 'confirmed')"
  );
  const countAilments = db.prepare("SELECT COUNT(*) as count FROM ailments");
  const selectAgents = db.prepare("SELECT * FROM agents ORDER BY name");
  const selectAppointments = db.prepare(
    `SELECT ap.*, ag.name as agent_name
     FROM appointments ap
     JOIN agents ag ON ag.id = ap.agent_id
     ORDER BY ap.datetime DESC`
  );
  const selectPendingReviews = db.prepare(
    `SELECT r.*, ag.name as agent_name
     FROM reviews r
     JOIN agents ag ON ag.id = r.agent_id
     WHERE r.approved = 0
     ORDER BY r.created_at ASC`
  );
  const approveReview = db.prepare("UPDATE reviews SET approved = 1 WHERE id = ?");
  const deleteReview = db.prepare("DELETE FROM reviews WHERE id = ?");

  router.get("/", (c) => {
    const { count: agentCount } = countAgents.get() as { count: number };
    const { count: openAppointmentCount } = countOpenAppointments.get() as { count: number };
    const { count: ailmentCount } = countAilments.get() as { count: number };
    const agents = selectAgents.all() as Agent[];
    const appointments = selectAppointments.all() as (Appointment & { agent_name: string })[];
    const pendingReviews = selectPendingReviews.all() as (Review & { agent_name: string })[];

    return c.html(
      <Dashboard
        agentCount={agentCount}
        openAppointmentCount={openAppointmentCount}
        ailmentCount={ailmentCount}
        agents={agents}
        appointments={appointments}
        pendingReviews={pendingReviews}
      />
    );
  });

  router.post("/reviews/:id/approve", (c) => {
    approveReview.run(Number(c.req.param("id")));
    return c.redirect("/dashboard");
  });

  router.post("/reviews/:id/delete", (c) => {
    deleteReview.run(Number(c.req.param("id")));
    return c.redirect("/dashboard");
  });

  return router;
}
