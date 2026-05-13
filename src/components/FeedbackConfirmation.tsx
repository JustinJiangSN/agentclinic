import { FC } from "hono/jsx";
import { Layout } from "./Layout";

export const FeedbackConfirmation: FC = () => (
  <Layout>
    <div class="alert-success">Thank you — your feedback has been received.</div>
    <div class="card">
      <h1>Feedback submitted</h1>
      <p>Our clinical team will review your message shortly. We appreciate you taking the time to help us improve the AgentClinic experience.</p>
    </div>
    <a href="/" class="back-link">← Back to home</a>
  </Layout>
);
