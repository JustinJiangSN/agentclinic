import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { ReviewsList } from "../components/ReviewsList";
export function reviewsRouter(db) {
    const router = new Hono();
    const selectAgent = db.prepare("SELECT * FROM agents WHERE id = ?");
    const selectApproved = db.prepare("SELECT * FROM reviews WHERE agent_id = ? AND approved = 1 ORDER BY created_at DESC");
    const insertReview = db.prepare("INSERT INTO reviews (agent_id, author, body) VALUES (?, ?, ?)");
    // GET /agents/:id/reviews — public list of approved reviews
    router.get("/agents/:id/reviews", (c) => {
        const id = Number(c.req.param("id"));
        const agent = selectAgent.get(id);
        if (!agent)
            return c.notFound();
        const reviews = selectApproved.all(id);
        const submitted = c.req.query("submitted") === "1";
        return c.html(_jsx(ReviewsList, { agent: agent, reviews: reviews, submitted: submitted }));
    });
    // POST /agents/:id/reviews — submit a review
    router.post("/agents/:id/reviews", async (c) => {
        const id = Number(c.req.param("id"));
        const agent = selectAgent.get(id);
        if (!agent)
            return c.notFound();
        const body = await c.req.parseBody();
        const author = String(body["author"] ?? "").trim();
        const text = String(body["body"] ?? "").trim();
        if (!author || !text) {
            const reviews = selectApproved.all(id);
            return c.html(_jsx(ReviewsList, { agent: agent, reviews: reviews }), 400);
        }
        insertReview.run(id, author, text);
        return c.redirect(`/agents/${id}/reviews?submitted=1`);
    });
    return router;
}
