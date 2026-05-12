import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import app from '../src/app';

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
const tsconfig = JSON.parse(readFileSync(join(process.cwd(), 'tsconfig.json'), 'utf-8'));

describe('Phase 1 — Hello Hono', () => {
  describe('GET /', () => {
    it('returns 200', async () => {
      const res = await app.request('/');
      expect(res.status).toBe(200);
    });

    it('returns HTML containing the AgentClinic heading', async () => {
      const res = await app.request('/');
      const html = await res.text();
      expect(html).toContain('<h1>AgentClinic</h1>');
    });

    it('returns HTML containing a tagline', async () => {
      const res = await app.request('/');
      const html = await res.text();
      expect(html).toMatch(/class="tagline"/);
    });

    it('includes a viewport meta tag', async () => {
      const res = await app.request('/');
      const html = await res.text();
      expect(html).toContain('name="viewport"');
    });
  });

  describe('GET /static/style.css', () => {
    it('returns 200', async () => {
      const res = await app.request('/static/style.css');
      expect(res.status).toBe(200);
    });
  });

  describe('package.json', () => {
    it('hono version is pinned with no ^ or ~ prefix', () => {
      const version: string = pkg.dependencies.hono;
      expect(version).not.toMatch(/^[\^~]/);
    });
  });

  describe('tsconfig.json', () => {
    it('strict mode is enabled', () => {
      expect(tsconfig.compilerOptions.strict).toBe(true);
    });
  });
});
