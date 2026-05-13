import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import type Database from "better-sqlite3";

const SALT_LEN = 16;
const KEY_LEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const candidate = scryptSync(password, salt, KEY_LEN);
  return timingSafeEqual(candidate, Buffer.from(hash, "hex"));
}

export function createSession(db: Database.Database, userId: number): string {
  const id = randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (id, user_id) VALUES (?, ?)").run(id, userId);
  return id;
}

export function getUserFromSession(
  db: Database.Database,
  sessionId: string
): { id: number; username: string } | undefined {
  return db
    .prepare(
      `SELECT u.id, u.username FROM users u
       JOIN sessions s ON s.user_id = u.id
       WHERE s.id = ?`
    )
    .get(sessionId) as { id: number; username: string } | undefined;
}

export function deleteSession(db: Database.Database, sessionId: string) {
  db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
}

export const SESSION_COOKIE = "ac_session";

export function requireAuth(db: Database.Database) {
  return async (c: Context, next: Next) => {
    const sessionId = getCookie(c, SESSION_COOKIE);
    if (!sessionId) return c.redirect("/auth/login");
    const user = getUserFromSession(db, sessionId);
    if (!user) return c.redirect("/auth/login");
    c.set("user", user);
    await next();
  };
}
