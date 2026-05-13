import { Hono } from "hono";
import type Database from "better-sqlite3";
import { FeedbackForm } from "../components/FeedbackForm";
import { FeedbackConfirmation } from "../components/FeedbackConfirmation";

export function feedbackRouter(db: Database.Database) {
  const router = new Hono();

  const insert = db.prepare(
    "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)"
  );

  router.get("/", (c) => c.html(<FeedbackForm />));

  router.post("/", async (c) => {
    const body = await c.req.parseBody();
    const name = String(body["name"] ?? "").trim();
    const email = String(body["email"] ?? "").trim();
    const message = String(body["message"] ?? "").trim();

    if (!name || !email || !message) {
      return c.html(
        <FeedbackForm error="All fields are required." />,
        400
      );
    }

    insert.run(name, email, message);
    return c.html(<FeedbackConfirmation />);
  });

  return router;
}
