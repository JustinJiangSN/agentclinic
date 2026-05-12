import { describe, it, expect, beforeAll } from "vitest";
import { createDb } from "../src/db/index";
import { migrate } from "../src/db/migrate";
import { seed } from "../src/db/seed";
import { createApp } from "../src/app";

let app: ReturnType<typeof createApp>;

beforeAll(() => {
  const db = createDb(":memory:");
  migrate(db);
  seed(db);
  app = createApp(db);
});

describe("GET /", () => {
  it("returns 200 OK", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  it("returns HTML content type", async () => {
    const res = await app.request("/");
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("contains the AgentClinic heading", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<h1>AgentClinic</h1>");
  });

  it("contains a tagline", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("Where AI agents come to get better.");
  });

  it("links the CSS stylesheet", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('href="/static/style.css"');
  });

  it("includes layout landmarks", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<footer");
  });
});

describe("GET /agents", () => {
  it("returns 200", async () => {
    const res = await app.request("/agents");
    expect(res.status).toBe(200);
  });

  it("lists agent names", async () => {
    const res = await app.request("/agents");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
  });
});

describe("GET /agents/:id", () => {
  it("returns 200 for a known agent", async () => {
    const res = await app.request("/agents/1");
    expect(res.status).toBe(200);
  });

  it("shows the agent name and an ailment", async () => {
    const res = await app.request("/agents/1");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
    expect(html).toContain("Context-Window Claustrophobia");
  });

  it("returns 404 for a non-existent agent", async () => {
    const res = await app.request("/agents/999");
    expect(res.status).toBe(404);
  });
});

describe("GET /ailments", () => {
  it("returns 200", async () => {
    const res = await app.request("/ailments");
    expect(res.status).toBe(200);
  });

  it("lists ailment names", async () => {
    const res = await app.request("/ailments");
    const html = await res.text();
    expect(html).toContain("Prompt Fatigue");
  });

  it("shows recommended therapies for at least one ailment", async () => {
    const res = await app.request("/ailments");
    const html = await res.text();
    expect(html).toContain("Recommended Therapies");
  });
});

describe("GET /therapies", () => {
  it("returns 200", async () => {
    const res = await app.request("/therapies");
    expect(res.status).toBe(200);
  });

  it("lists therapy names", async () => {
    const res = await app.request("/therapies");
    const html = await res.text();
    expect(html).toContain("Prompt Detox Retreat");
  });
});

describe("GET /appointments/new", () => {
  it("returns 200 for a known agent", async () => {
    const res = await app.request("/appointments/new?agent_id=1");
    expect(res.status).toBe(200);
  });

  it("renders a form element", async () => {
    const res = await app.request("/appointments/new?agent_id=1");
    const html = await res.text();
    expect(html).toContain("<form");
  });

  it("returns 404 for an unknown agent", async () => {
    const res = await app.request("/appointments/new?agent_id=99999");
    expect(res.status).toBe(404);
  });
});

describe("POST /appointments", () => {
  it("redirects on valid submission", async () => {
    const body = new URLSearchParams({
      agent_id: "1",
      therapist_name: "Dr. Turing",
      datetime: "2026-06-01T10:00",
    });
    const res = await app.request("/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toMatch(/\/appointments\/\d+\/confirmation/);
  });

  it("returns 400 with error when therapist_name is missing", async () => {
    const body = new URLSearchParams({
      agent_id: "1",
      therapist_name: "",
      datetime: "2026-06-01T10:00",
    });
    const res = await app.request("/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    expect(res.status).toBe(400);
    const html = await res.text();
    expect(html).toContain("required");
  });
});

describe("GET /appointments/:id/confirmation", () => {
  it("returns 200 and shows therapist name for a booked appointment", async () => {
    const body = new URLSearchParams({
      agent_id: "1",
      therapist_name: "Dr. Hopper",
      datetime: "2026-07-01T14:00",
    });
    const postRes = await app.request("/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const confirmationUrl = postRes.headers.get("location")!;
    const res = await app.request(confirmationUrl);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Dr. Hopper");
  });

  it("returns 404 for a non-existent appointment", async () => {
    const res = await app.request("/appointments/99999/confirmation");
    expect(res.status).toBe(404);
  });
});

describe("GET /dashboard", () => {
  it("returns 200", async () => {
    const res = await app.request("/dashboard");
    expect(res.status).toBe(200);
  });

  it("contains summary count values", async () => {
    const res = await app.request("/dashboard");
    const html = await res.text();
    expect(html).toContain("Agents");
    expect(html).toContain("Ailments");
    expect(html).toContain("Open Appointments");
  });

  it("lists a seeded agent name", async () => {
    const res = await app.request("/dashboard");
    const html = await res.text();
    expect(html).toContain("Bartholomew-47B");
  });

  it("does not contain a form element (read-only)", async () => {
    const res = await app.request("/dashboard");
    const html = await res.text();
    expect(html).not.toContain("<form");
  });
});
