import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent } from "../db/types";

type BookingFormProps = { agent: Agent; error?: string };

export const BookingForm: FC<BookingFormProps> = ({ agent, error }) => (
  <Layout>
    <h1>Book an Appointment</h1>
    <div class="card">
      <p class="card-header">Booking for <strong>{agent.name}</strong></p>
      {error && <div class="alert-error">{error}</div>}
      <form method="post" action="/appointments">
        <input type="hidden" name="agent_id" value={String(agent.id)} />
        <label>
          Therapist name
          <input type="text" name="therapist_name" required placeholder="e.g. Dr. Ada Lovelace" />
        </label>
        <label>
          Appointment date and time
          <input type="datetime-local" name="datetime" required />
        </label>
        <button type="submit" class="btn-primary" style="margin-top:0.5rem">Book appointment</button>
      </form>
    </div>
    <a href={`/agents/${agent.id}`} class="back-link">← Back to {agent.name}</a>
  </Layout>
);
