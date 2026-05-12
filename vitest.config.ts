import { defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: {
    transform: {
      react: { runtime: 'automatic', importSource: 'hono/jsx' },
    },
  },
});
