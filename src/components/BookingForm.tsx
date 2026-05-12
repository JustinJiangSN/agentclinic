import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent } from "../db/types";

type BookingFormProps = { agent: Agent; error?: string };

export const BookingForm: FC<BookingFormProps> = ({ agent, error }) => (
  <Layout>
    <h1>Book an Appointment</h1>
    <article>
      <header>
        <p>
          Booking for <strong>{agent.name}</strong>
        </p>
      </header>
      {error && (
        <p>
          <strong style="color: var(--pico-del-color, #c62828);">{error}</strong>
        </p>
      )}
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
        <button type="submit">Book appointment</button>
      </form>
    </article>
    <p>
      <a href={`/agents/${agent.id}`}>← Back to {agent.name}</a>
    </p>
  </Layout>
);
