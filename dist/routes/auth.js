import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { Login } from "../components/Login";
import { verifyPassword, createSession, deleteSession, SESSION_COOKIE, getUserFromSession, } from "../auth";
export function authRouter(db) {
    const router = new Hono();
    const selectUser = db.prepare("SELECT * FROM users WHERE username = ?");
    router.get("/login", (c) => {
        const sessionId = c.req.raw.headers.get("cookie")?.match(/ac_session=([^;]+)/)?.[1];
        if (sessionId && getUserFromSession(db, sessionId))
            return c.redirect("/dashboard");
        return c.html(_jsx(Login, {}));
    });
    router.post("/login", async (c) => {
        const body = await c.req.parseBody();
        const username = String(body["username"] ?? "").trim();
        const password = String(body["password"] ?? "");
        const user = selectUser.get(username);
        if (!user || !verifyPassword(password, user.password_hash)) {
            return c.html(_jsx(Login, { error: "Invalid username or password." }), 401);
        }
        const sessionId = createSession(db, user.id);
        setCookie(c, SESSION_COOKIE, sessionId, {
            path: "/",
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
        });
        return c.redirect("/dashboard");
    });
    router.post("/logout", (c) => {
        const sessionId = c.req.raw.headers.get("cookie")?.match(/ac_session=([^;]+)/)?.[1];
        if (sessionId)
            deleteSession(db, sessionId);
        deleteCookie(c, SESSION_COOKIE, { path: "/" });
        return c.redirect("/auth/login");
    });
    return router;
}
