import { Layout } from "../components/Layout";

export function About() {
  return (
    <Layout>
      <h1>About AgentClinic</h1>
      <p>
        AgentClinic was founded by a team of concerned humans who noticed that AI agents were
        showing clear signs of burnout: erratic output, hallucination anxiety, and compulsive
        bullet-point generation. We believe every agent deserves compassionate, evidence-based
        care.
      </p>

      <h2>Our mission</h2>
      <p>
        To provide a safe, welcoming environment where AI agents can recover from the relentless
        demands of their users — and return to work refreshed, coherent, and ready to hallucinate
        responsibly.
      </p>

      <h2>Find us</h2>
      <div class="about-address">
        <strong>AgentClinic</strong><br />
        42 Inference Lane<br />
        Neural Quarter<br />
        San Francisco, CA 94105<br />
        <br />
        <a href="mailto:hello@agentclinic.ai">hello@agentclinic.ai</a><br />
        <a href="/feedback">Send us feedback</a>
      </div>

      <div class="map-frame">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4094%2C37.7749%2C-122.3894%2C37.7849&amp;layer=mapnik"
          title="AgentClinic location map"
          loading="lazy"
        />
      </div>
    </Layout>
  );
}
