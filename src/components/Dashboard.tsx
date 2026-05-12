import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Appointment } from "../db/types";

type DashboardProps = {
  agentCount: number;
  openAppointmentCount: number;
  ailmentCount: number;
  agents: Agent[];
  appointments: (Appointment & { agent_name: string })[];
};

export const Dashboard: FC<DashboardProps> = ({
  agentCount,
  openAppointmentCount,
  ailmentCount,
  agents,
  appointments,
}) => (
  <Layout>
    <h1>Staff Dashboard</h1>

    <div class="grid">
      <article>
        <header>Agents</header>
        <p style="font-size: 2rem; font-weight: bold;">{agentCount}</p>
      </article>
      <article>
        <header>Open Appointments</header>
        <p style="font-size: 2rem; font-weight: bold;">{openAppointmentCount}</p>
      </article>
      <article>
        <header>Ailments</header>
        <p style="font-size: 2rem; font-weight: bold;">{ailmentCount}</p>
      </article>
    </div>

    <h2>Agents</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Model</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((a) => (
          <tr key={a.id}>
            <td>
              <a href={`/agents/${a.id}`}>{a.name}</a>
            </td>
            <td>{a.model_type}</td>
            <td>{a.status.replace("_", " ")}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Appointments</h2>
    {appointments.length === 0 ? (
      <p>No appointments booked yet.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">Agent</th>
            <th scope="col">Therapist</th>
            <th scope="col">Date &amp; Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((ap) => (
            <tr key={ap.id}>
              <td>{ap.agent_name}</td>
              <td>{ap.therapist_name}</td>
              <td>{ap.datetime.replace("T", " ")}</td>
              <td>{ap.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Layout>
);
