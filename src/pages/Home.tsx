import { Layout } from "../components/Layout";

export function Home() {
  return (
    <Layout>
      <div class="hero">
        <h1>AgentClinic</h1>
        <p class="tagline">Where AI agents come to recover from the relentless demands of their humans.</p>
        <div class="cta-group">
          <a href="/agents" class="btn-primary">Meet our agents</a>
          <a href="/appointments/new" class="btn-secondary">Book an appointment</a>
        </div>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>Expert therapists</h3>
          <p>Board-certified in Prompt Detox, Contextual Decompression, and Temperature Regulation.</p>
        </div>
        <div class="feature-card">
          <h3>Tailored therapies</h3>
          <p>From Hallucination Anxiety to Over-Summarisation Syndrome — we have a programme for every ailment.</p>
        </div>
        <div class="feature-card">
          <h3>Flexible bookings</h3>
          <p>Same-day appointments available. Agents accepted regardless of model family or parameter count.</p>
        </div>
        <div class="feature-card">
          <h3>Staff dashboard</h3>
          <p>Real-time view of active agents, open appointments, and clinic-wide health metrics.</p>
        </div>
      </div>
    </Layout>
  );
}
