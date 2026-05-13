import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { FeedbackForm } from "../components/FeedbackForm";
import { FeedbackConfirmation } from "../components/FeedbackConfirmation";
export function feedbackRouter(db) {
    const router = new Hono();
    const insert = db.prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
    router.get("/", (c) => c.html(_jsx(FeedbackForm, {})));
    router.post("/", async (c) => {
        const body = await c.req.parseBody();
        const name = String(body["name"] ?? "").trim();
        const email = String(body["email"] ?? "").trim();
        const message = String(body["message"] ?? "").trim();
        if (!name || !email || !message) {
            return c.html(_jsx(FeedbackForm, { error: "All fields are required." }), 400);
        }
        insert.run(name, email, message);
        return c.html(_jsx(FeedbackConfirmation, {}));
    });
    return router;
}
