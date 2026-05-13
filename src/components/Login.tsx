import { FC } from "hono/jsx";
import { Layout } from "./Layout";

type LoginProps = { error?: string };

export const Login: FC<LoginProps> = ({ error }) => (
  <Layout>
    <div class="login-wrap">
      <h1>Staff Login</h1>
      {error && <div class="alert-error">{error}</div>}
      <div class="card">
        <form method="post" action="/auth/login">
          <label>
            Username
            <input type="text" name="username" required autocomplete="username" />
          </label>
          <label>
            Password
            <input type="password" name="password" required autocomplete="current-password" />
          </label>
          <button type="submit" class="btn-primary" style="width:100%;margin-top:0.5rem">Sign in</button>
        </form>
      </div>
    </div>
  </Layout>
);
