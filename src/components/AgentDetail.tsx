import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Ailment } from "../db/types";

type AgentDetailProps = { agent: Agent; ailments: Ailment[] };

export const AgentDetail: FC<AgentDetailProps> = ({ agent, ailments }) => (
  <Layout>
    <div class="card">
      <h1>{agent.name}</h1>
      <p><strong>Model:</strong> {agent.model_type}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span class={`badge badge-${agent.status}`}>{agent.status.replace("_", " ")}</span>
      </p>
      {ailments.length > 0 && (
        <>
          <h2>Presenting Complaints</h2>
          <ul>
            {ailments.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong> — {a.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>

    <a href={`/appointments/new?agent_id=${agent.id}`} class="btn-primary">
      Book appointment
    </a>
    {"  "}
    <a href={`/agents/${agent.id}/reviews`} class="btn-secondary" style="margin-left:0.5rem">
      Reviews
    </a>

    <br />
    <a href="/agents" class="back-link">← Back to agents</a>
  </Layout>
);
