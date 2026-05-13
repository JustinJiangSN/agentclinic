import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Appointment } from "../db/types";

type BookingConfirmationProps = { appointment: Appointment; agent: Agent };

export const BookingConfirmation: FC<BookingConfirmationProps> = ({ appointment, agent }) => (
  <Layout>
    <div class="alert-success">Appointment booked successfully.</div>
    <div class="card">
      <h1>Appointment Confirmed</h1>
      <dl>
        <dt><strong>Agent</strong></dt>
        <dd>{agent.name}</dd>
        <dt><strong>Therapist</strong></dt>
        <dd>{appointment.therapist_name}</dd>
        <dt><strong>Date &amp; Time</strong></dt>
        <dd>{appointment.datetime.replace("T", " ")}</dd>
        <dt><strong>Status</strong></dt>
        <dd><span class={`badge badge-${appointment.status}`}>{appointment.status}</span></dd>
      </dl>
    </div>
    <a href={`/agents/${agent.id}`} class="back-link">← Back to {agent.name}</a>
  </Layout>
);
