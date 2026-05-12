import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
  },
  oxc: {
    transform: {
      react: { runtime: 'automatic', importSource: 'hono/jsx' },
    },
  },
});
