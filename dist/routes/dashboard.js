import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { Dashboard } from "../components/Dashboard";
import { requireAuth } from "../auth";
export function dashboardRouter(db) {
    const router = new Hono();
    router.use("/*", requireAuth(db));
    const countAgents = db.prepare("SELECT COUNT(*) as count FROM agents");
    const countOpenAppointments = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status IN ('pending', 'confirmed')");
    const countAilments = db.prepare("SELECT COUNT(*) as count FROM ailments");
    const selectAgents = db.prepare("SELECT * FROM agents ORDER BY name");
    const selectAppointments = db.prepare(`SELECT ap.*, ag.name as agent_name
     FROM appointments ap
     JOIN agents ag ON ag.id = ap.agent_id
     ORDER BY ap.datetime DESC`);
    const selectPendingReviews = db.prepare(`SELECT r.*, ag.name as agent_name
     FROM reviews r
     JOIN agents ag ON ag.id = r.agent_id
     WHERE r.approved = 0
     ORDER BY r.created_at ASC`);
    const approveReview = db.prepare("UPDATE reviews SET approved = 1 WHERE id = ?");
    const deleteReview = db.prepare("DELETE FROM reviews WHERE id = ?");
    router.get("/", (c) => {
        const { count: agentCount } = countAgents.get();
        const { count: openAppointmentCount } = countOpenAppointments.get();
        const { count: ailmentCount } = countAilments.get();
        const agents = selectAgents.all();
        const appointments = selectAppointments.all();
        const pendingReviews = selectPendingReviews.all();
        return c.html(_jsx(Dashboard, { agentCount: agentCount, openAppointmentCount: openAppointmentCount, ailmentCount: ailmentCount, agents: agents, appointments: appointments, pendingReviews: pendingReviews }));
    });
    router.post("/reviews/:id/approve", (c) => {
        approveReview.run(Number(c.req.param("id")));
        return c.redirect("/dashboard");
    });
    router.post("/reviews/:id/delete", (c) => {
        deleteReview.run(Number(c.req.param("id")));
        return c.redirect("/dashboard");
    });
    return router;
}
