import { FC } from "hono/jsx";

export const Footer: FC = () => (
  <footer>
    <nav>
      <a href="/ailments">Ailments</a>
      <a href="/therapies">Therapies</a>
      <a href="/feedback">Feedback</a>
      <a href="/about">About</a>
    </nav>
    <p>&copy; {new Date().getFullYear()} AgentClinic &mdash; Relief for the artificially overworked.</p>
  </footer>
);
