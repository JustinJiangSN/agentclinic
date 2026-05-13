import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Appointment, Review } from "../db/types";

type DashboardProps = {
  agentCount: number;
  openAppointmentCount: number;
  ailmentCount: number;
  agents: Agent[];
  appointments: (Appointment & { agent_name: string })[];
  pendingReviews: (Review & { agent_name: string })[];
};

export const Dashboard: FC<DashboardProps> = ({
  agentCount,
  openAppointmentCount,
  ailmentCount,
  agents,
  appointments,
  pendingReviews,
}) => (
  <Layout>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <h1 style="margin:0">Staff Dashboard</h1>
      <form method="post" action="/auth/logout" style="margin:0">
        <button type="submit" class="btn-secondary" style="padding:0.4rem 1rem;font-size:0.85rem">Sign out</button>
      </form>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Agents</div>
        <div class="stat-value">{agentCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Open Appointments</div>
        <div class="stat-value">{openAppointmentCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Ailments</div>
        <div class="stat-value">{ailmentCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending Reviews</div>
        <div class="stat-value">{pendingReviews.length}</div>
      </div>
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
            <td><a href={`/agents/${a.id}`}>{a.name}</a></td>
            <td>{a.model_type}</td>
            <td><span class={`badge badge-${a.status}`}>{a.status.replace("_", " ")}</span></td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2 style="margin-top:2rem">Appointments</h2>
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
              <td><span class={`badge badge-${ap.status}`}>{ap.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <h2 style="margin-top:2rem">Pending Reviews</h2>
    {pendingReviews.length === 0 ? (
      <p>No reviews awaiting moderation.</p>
    ) : (
      <ul class="review-list">
        {pendingReviews.map((r) => (
          <li key={r.id} class="review-item">
            <p style="margin:0">{r.body}</p>
            <p class="review-meta">
              — {r.author} &middot; for <a href={`/agents/${r.agent_id}`}>{r.agent_name}</a> &middot; {r.created_at.slice(0, 10)}
            </p>
            <div style="margin-top:0.5rem;display:flex;gap:0.5rem">
              <form method="post" action={`/dashboard/reviews/${r.id}/approve`} style="margin:0">
                <button type="submit" class="btn-primary" style="padding:0.3rem 0.8rem;font-size:0.8rem">Approve</button>
              </form>
              <form method="post" action={`/dashboard/reviews/${r.id}/delete`} style="margin:0">
                <button type="submit" style="padding:0.3rem 0.8rem;font-size:0.8rem;background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;border-radius:var(--radius);cursor:pointer;font-weight:600">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    )}
  </Layout>
);
