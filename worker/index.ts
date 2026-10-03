// The site's Cloudflare Worker. The static pages in dist/ are served straight
// from Cloudflare's edge; only /api/* reaches this code (see wrangler.jsonc).
import { handleWaitlist, type Env as WaitlistEnv } from "./waitlist";

interface Env extends WaitlistEnv {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/waitlist") return handleWaitlist(request, env);
    return env.ASSETS.fetch(request);
  },
};
