import { describe, it, expect } from 'vitest';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { Main } from '../src/components/Main';
import { Layout } from '../src/components/Layout';

function render(node: unknown): string {
  return String(node);
}

describe('Header', () => {
  it('renders a <header> element', () => {
    expect(render(<Header />)).toContain('<header');
  });

  it('links back to /', () => {
    expect(render(<Header />)).toContain('href="/"');
  });

  it('displays the AgentClinic brand name', () => {
    expect(render(<Header />)).toContain('AgentClinic');
  });
});

describe('Footer', () => {
  it('renders a <footer> element', () => {
    expect(render(<Footer />)).toContain('<footer');
  });

  it('contains site credit text', () => {
    expect(render(<Footer />)).toContain('AgentClinic');
  });
});

describe('Main', () => {
  it('renders a <main> element', () => {
    expect(render(<Main>content</Main>)).toContain('<main');
  });

  it('renders children inside <main>', () => {
    expect(render(<Main>hello world</Main>)).toContain('hello world');
  });
});

describe('Layout', () => {
  it('renders a full HTML document shell', () => {
    const html = render(<Layout>page</Layout>);
    expect(html).toContain('<html');
    expect(html).toContain('<head');
    expect(html).toContain('<body');
  });

  it('links the stylesheet', () => {
    expect(render(<Layout>page</Layout>)).toContain('/static/style.css');
  });

  it('renders children in the main area', () => {
    expect(render(<Layout>unique-content</Layout>)).toContain('unique-content');
  });

  it('includes header and footer', () => {
    const html = render(<Layout>page</Layout>);
    expect(html).toContain('<header');
    expect(html).toContain('<footer');
  });
});
