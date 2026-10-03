// The few Cloudflare types the waitlist function uses, so the repo needs no
// extra packages. Cloudflare provides the real objects at run time.
interface D1Result<T = unknown> {
  results?: T[];
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<D1Result>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
}
type PagesFunction<Env = unknown> = (context: { request: Request; env: Env }) => Response | Promise<Response>;
