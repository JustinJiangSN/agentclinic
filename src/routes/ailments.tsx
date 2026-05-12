import { Hono } from "hono";
import type Database from "better-sqlite3";
import { AilmentsList } from "../components/AilmentsList";
import type { Ailment, Therapy } from "../db/types";

export interface AilmentWithTherapies extends Ailment {
  therapies: Therapy[];
}

export function ailmentsRouter(db: Database.Database) {
  const router = new Hono();

  const selectAll = db.prepare("SELECT * FROM ailments ORDER BY name");
  const selectTherapies = db.prepare(
    `SELECT t.* FROM therapies t
     JOIN ailment_therapies at ON t.id = at.therapy_id
     WHERE at.ailment_id = ?
     ORDER BY t.name`
  );

  router.get("/", (c) => {
    const ailments = selectAll.all() as Ailment[];
    const ailmentsWithTherapies: AilmentWithTherapies[] = ailments.map((a) => ({
      ...a,
      therapies: selectTherapies.all(a.id) as Therapy[],
    }));
    return c.html(<AilmentsList ailments={ailmentsWithTherapies} />);
  });

  return router;
}
