import { Hono } from "hono";
import type Database from "better-sqlite3";
import { Dashboard } from "../components/Dashboard";
import type { Agent, Appointment } from "../db/types";

export function dashboardRouter(db: Database.Database) {
  const router = new Hono();

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

  router.get("/", (c) => {
    const { count: agentCount } = countAgents.get() as { count: number };
    const { count: openAppointmentCount } = countOpenAppointments.get() as { count: number };
    const { count: ailmentCount } = countAilments.get() as { count: number };
    const agents = selectAgents.all() as Agent[];
    const appointments = selectAppointments.all() as (Appointment & { agent_name: string })[];

    return c.html(
      <Dashboard
        agentCount={agentCount}
        openAppointmentCount={openAppointmentCount}
        ailmentCount={ailmentCount}
        agents={agents}
        appointments={appointments}
      />
    );
  });

  return router;
}
