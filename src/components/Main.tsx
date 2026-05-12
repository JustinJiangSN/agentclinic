import type { FC } from 'hono/jsx';

export const Main: FC = function Main({ children }) {
  return <main class="site-main">{children}</main>;
};
