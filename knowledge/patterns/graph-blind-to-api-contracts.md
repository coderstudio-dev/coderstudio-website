# graphify can't see client <-> API-route request contracts

Observed twice now in this repo: `graphify path` reports **no path** between
`src/components/contact-form.tsx` and `src/app/api/contact/route.ts`, even
though they're tightly coupled at runtime —

1. `ContactForm()` calls `fetch("/api/contact", ...)` — a string URL, not a
   static import, so the AST extractor never links the two files.
2. The honeypot field added 2026-07-22: `contact-form.tsx` sends a `company`
   field in the POST body, and `route.ts`'s `detectBot()` reads `honeypot`
   from the parsed JSON. The field name must match on both sides, and
   nothing in the graph enforces or even reveals that dependency.

**Why:** graphify's structural extraction only follows `import`/`require`
statements and AST call sites. A Next.js client-to-route-handler contract is
just two files independently agreeing on a URL path and a JSON shape — there
is no static reference for the AST to follow.

**How to apply:** when `/evaluate` or `/plan` touches a Next.js API route
(anything under `src/app/api/`) alongside its calling component, don't trust
`graphify path`/`graphify query` returning "no path" as proof of independence.
Manually re-check the request/response shape on both ends after any change to
either side — field names, added/removed body fields, status codes the client
branches on. This is a systematic blind spot for any client/server pair that
communicates by convention (URL + JSON shape) rather than by import.
