import { Hono } from "hono";
import type Database from "better-sqlite3";
import { BookingForm } from "../components/BookingForm";
import { BookingConfirmation } from "../components/BookingConfirmation";
import type { Agent, Appointment } from "../db/types";

export function appointmentsRouter(db: Database.Database) {
  const router = new Hono();

  const selectAgent = db.prepare("SELECT * FROM agents WHERE id = ?");
  const insertAppointment = db.prepare(
    "INSERT INTO appointments (agent_id, therapist_name, datetime) VALUES (?, ?, ?)"
  );
  const selectAppointment = db.prepare("SELECT * FROM appointments WHERE id = ?");

  router.get("/new", (c) => {
    const agentId = Number(c.req.query("agent_id"));
    const agent = selectAgent.get(agentId) as Agent | undefined;
    if (!agent) return c.notFound();
    return c.html(<BookingForm agent={agent} />);
  });

  router.post("/", async (c) => {
    const body = await c.req.parseBody();
    const agentId = Number(body["agent_id"]);
    const therapistName = String(body["therapist_name"] ?? "").trim();
    const datetime = String(body["datetime"] ?? "").trim();

    const agent = selectAgent.get(agentId) as Agent | undefined;
    if (!agent) return c.notFound();

    if (!therapistName || !datetime) {
      return c.html(
        <BookingForm agent={agent} error="Therapist name and date/time are required." />,
        400
      );
    }

    const result = insertAppointment.run(agentId, therapistName, datetime);
    const id = result.lastInsertRowid;
    return c.redirect(`/appointments/${id}/confirmation`);
  });

  router.get("/:id/confirmation", (c) => {
    const id = Number(c.req.param("id"));
    const appointment = selectAppointment.get(id) as Appointment | undefined;
    if (!appointment) return c.notFound();
    const agent = selectAgent.get(appointment.agent_id) as Agent;
    return c.html(<BookingConfirmation appointment={appointment} agent={agent} />);
  });

  return router;
}
