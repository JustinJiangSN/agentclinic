import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Appointment } from "../db/types";

type BookingConfirmationProps = { appointment: Appointment; agent: Agent };

export const BookingConfirmation: FC<BookingConfirmationProps> = ({ appointment, agent }) => (
  <Layout>
    <h1>Appointment Confirmed</h1>
    <article>
      <header>
        <p>Your appointment has been booked.</p>
      </header>
      <dl>
        <dt>Agent</dt>
        <dd>{agent.name}</dd>
        <dt>Therapist</dt>
        <dd>{appointment.therapist_name}</dd>
        <dt>Date &amp; Time</dt>
        <dd>{appointment.datetime.replace("T", " ")}</dd>
        <dt>Status</dt>
        <dd>{appointment.status}</dd>
      </dl>
    </article>
    <p>
      <a href={`/agents/${agent.id}`}>← Back to {agent.name}</a>
    </p>
  </Layout>
);
