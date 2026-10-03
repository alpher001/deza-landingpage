// POST /api/waitlist: saves one sign-up in Cloudflare D1.
//
// Called from worker/index.ts. It needs a D1 database bound as `DB` (see
// wrangler.jsonc). Optional: TURNSTILE_SECRET (with PUBLIC_TURNSTILE_SITE_KEY
// at build time) for the invisible bot check. The tables are created on
// first use.
//
// One row per phone number: signing up again updates the area and choice and
// answers "existing", never an error. Each network address gets 20 tries per
// ten minutes; a hidden field catches simple bots.

export interface Env {
  DB?: D1Database;
  TURNSTILE_SECRET?: string;
}

const ROLES = new Set(["ride", "send", "drive"]);
const LANGS = new Set(["en", "ha"]);
const WINDOW_MS = 10 * 60 * 1000;
// Generous: Nigerian mobile networks put many phones behind one address.
const MAX_TRIES = 20;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

// Nigerian mobile numbers only, stored as +234XXXXXXXXXX.
function normalisePhone(raw: unknown): string | null {
  const d = String(raw ?? "").replace(/[^\d+]/g, "");
  const m = d.match(/^(?:\+?234|0)?([789][01]\d{8})$/);
  return m ? `+234${m[1]}` : null;
}

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f<>]/g, "")
    .trim()
    .slice(0, max);

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function setUp(db: D1Database) {
  await db.batch([
    db.prepare(
      `CREATE TABLE IF NOT EXISTS signups (
        phone TEXT PRIMARY KEY,
        area TEXT,
        role TEXT NOT NULL,
        lang TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        times INTEGER NOT NULL DEFAULT 1
      )`,
    ),
    db.prepare(`CREATE TABLE IF NOT EXISTS tries (who TEXT NOT NULL, at INTEGER NOT NULL)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS tries_who ON tries (who, at)`),
  ]);
}

async function passesTurnstile(secret: string, token: unknown, ip: string) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", String(token));
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const out = (await res.json()) as { success?: boolean };
  return out.success === true;
}

export async function handleWaitlist(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({ status: "method" }, 405);
  // Not switched on yet: the page shows "sign-ups open soon".
  if (!env.DB) return json({ status: "closed" }, 503);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ status: "invalid" }, 400);
  }

  // Hidden field people never see; bots fill it. Pretend it worked.
  if (clean(body.company, 50)) return json({ status: "new" });

  const phone = normalisePhone(body.phone);
  if (!phone) return json({ status: "invalid" }, 400);
  const area = clean(body.area, 60) || null;
  const role = ROLES.has(String(body.role)) ? String(body.role) : "ride";
  const lang = LANGS.has(String(body.lang)) ? String(body.lang) : "en";

  const db = env.DB;
  await setUp(db);

  // A few tries per device per ten minutes. The address is stored only as a
  // one-way hash, and old entries are cleared as we go.
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const who = await sha256(`deza-waitlist:${ip}`);
  const now = Date.now();
  const since = now - WINDOW_MS;
  const recent = await db.prepare(`SELECT COUNT(*) AS n FROM tries WHERE who = ? AND at > ?`).bind(who, since).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_TRIES) return json({ status: "slow-down" }, 429);
  await db.batch([
    db.prepare(`INSERT INTO tries (who, at) VALUES (?, ?)`).bind(who, now),
    db.prepare(`DELETE FROM tries WHERE at < ?`).bind(since),
  ]);

  if (env.TURNSTILE_SECRET && !(await passesTurnstile(env.TURNSTILE_SECRET, body.token, ip))) {
    return json({ status: "check-failed" }, 403);
  }

  const before = await db.prepare(`SELECT 1 AS x FROM signups WHERE phone = ?`).bind(phone).first();
  await db
    .prepare(
      `INSERT INTO signups (phone, area, role, lang) VALUES (?, ?, ?, ?)
       ON CONFLICT (phone) DO UPDATE SET
         area = COALESCE(excluded.area, signups.area),
         role = excluded.role,
         lang = excluded.lang,
         updated_at = datetime('now'),
         times = signups.times + 1`,
    )
    .bind(phone, area, role, lang)
    .run();

  return json({ status: before ? "existing" : "new" });
}
