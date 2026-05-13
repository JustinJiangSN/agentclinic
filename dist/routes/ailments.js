import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { AilmentsList } from "../components/AilmentsList";
export function ailmentsRouter(db) {
    const router = new Hono();
    const selectAll = db.prepare("SELECT * FROM ailments ORDER BY name");
    const selectTherapies = db.prepare(`SELECT t.* FROM therapies t
     JOIN ailment_therapies at ON t.id = at.therapy_id
     WHERE at.ailment_id = ?
     ORDER BY t.name`);
    router.get("/", (c) => {
        const ailments = selectAll.all();
        const ailmentsWithTherapies = ailments.map((a) => ({
            ...a,
            therapies: selectTherapies.all(a.id),
        }));
        return c.html(_jsx(AilmentsList, { ailments: ailmentsWithTherapies }));
    });
    return router;
}
