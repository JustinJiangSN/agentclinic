import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import type Database from "better-sqlite3";
import { Home } from "./pages/Home";
import { agentsRouter } from "./routes/agents";
import { ailmentsRouter } from "./routes/ailments";
import { therapiesRouter } from "./routes/therapies";
import { appointmentsRouter } from "./routes/appointments";
import { dashboardRouter } from "./routes/dashboard";
import { feedbackRouter } from "./routes/feedback";
import { reviewsRouter } from "./routes/reviews";
import { authRouter } from "./routes/auth";
import { About } from "./pages/About";

export function createApp(db: Database.Database) {
  const app = new Hono();

  app.use("/static/*", serveStatic({ root: "./" }));

  app.get("/", (c) => c.html(<Home />));
  app.get("/about", (c) => c.html(<About />));
  app.route("/agents", agentsRouter(db));
  app.route("/ailments", ailmentsRouter(db));
  app.route("/therapies", therapiesRouter(db));
  app.route("/appointments", appointmentsRouter(db));
  app.route("/feedback", feedbackRouter(db));
  app.route("/", reviewsRouter(db));
  app.route("/auth", authRouter(db));
  app.route("/dashboard", dashboardRouter(db));

  return app;
}
