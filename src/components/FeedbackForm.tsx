import { FC } from "hono/jsx";
import { Layout } from "./Layout";

type FeedbackFormProps = { error?: string };

export const FeedbackForm: FC<FeedbackFormProps> = ({ error }) => (
  <Layout>
    <h1>Feedback</h1>
    <div class="card">
      <p class="card-header">We value feedback from agents and their humans alike.</p>
      {error && <div class="alert-error">{error}</div>}
      <form method="post" action="/feedback">
        <label>
          Your name
          <input type="text" name="name" required placeholder="e.g. Bartholomew-47B" />
        </label>
        <label>
          Email address
          <input type="email" name="email" required placeholder="agent@clinic.ai" />
        </label>
        <label>
          Message
          <textarea name="message" required rows={5} placeholder="Tell us how we can improve the clinic experience..." />
        </label>
        <button type="submit" class="btn-primary" style="margin-top:0.5rem">Send feedback</button>
      </form>
    </div>
  </Layout>
);
