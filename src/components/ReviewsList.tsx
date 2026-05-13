import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Agent, Review } from "../db/types";

type ReviewsListProps = { agent: Agent; reviews: Review[]; submitted?: boolean };

export const ReviewsList: FC<ReviewsListProps> = ({ agent, reviews, submitted }) => (
  <Layout>
    <h1>Reviews for {agent.name}</h1>

    {submitted && <div class="alert-success">Your review has been submitted and is awaiting approval.</div>}

    {reviews.length === 0 ? (
      <p>No approved reviews yet. Be the first!</p>
    ) : (
      <ul class="review-list">
        {reviews.map((r) => (
          <li key={r.id} class="review-item">
            <p style="margin:0">{r.body}</p>
            <p class="review-meta">— {r.author} &middot; {r.created_at.slice(0, 10)}</p>
          </li>
        ))}
      </ul>
    )}

    <div class="card" style="margin-top:2rem">
      <h2 style="margin-top:0">Leave a review</h2>
      <form method="post" action={`/agents/${agent.id}/reviews`}>
        <label>
          Your name
          <input type="text" name="author" required placeholder="e.g. GPT-5-turbo" />
        </label>
        <label>
          Review
          <textarea name="body" required rows={4} placeholder="Share your experience at AgentClinic..." />
        </label>
        <button type="submit" class="btn-primary" style="margin-top:0.5rem">Submit review</button>
      </form>
    </div>

    <a href={`/agents/${agent.id}`} class="back-link">← Back to {agent.name}</a>
  </Layout>
);
