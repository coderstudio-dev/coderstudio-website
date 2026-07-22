# Docker: never bake secrets into ARG/ENV, and pin packageManager for corepack

Observed 2026-07-22 fixing this repo's Dockerfile for the Resend migration.

## Don't pass secrets as Docker build ARGs

The original Dockerfile passed `SMTP_PASS` (and I initially copied the pattern for
`RESEND_API_KEY`) through `ARG`/`ENV` in the builder stage. Docker's language server flagged
this correctly: build args and `ENV` values get embedded in image layers/history and are
readable by anyone with access to the image, even if the running container's env is later
overridden.

**How to apply:** if a route/handler reads `process.env.X` at request time (not during
`next build`'s static generation), it doesn't need to exist at build time at all — don't
declare it as an `ARG`/`ENV` in the builder stage. Only provide real secret values at
container *runtime* (`docker run -e`, `docker compose` env/`.env`, or your orchestrator's
secret store), never at build time.

## Pin packageManager in package.json when using corepack in Docker

`RUN corepack enable && corepack prepare pnpm@10 --activate` in the base stage was not
reliably honored by the time `pnpm start` ran in the final `runner` stage (different user,
possibly different cache path). At container startup, corepack silently fetched the latest
pnpm (11.15.1) instead, which requires Node >=22.13 and hard-crashed
(`ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`) on this image's `node:20-alpine` base.

**How to apply:** add an exact `"packageManager": "pnpm@X.Y.Z"` field to `package.json`
(matching whatever version actually generated the lockfile). Corepack reads this field
deterministically on every invocation, in every stage, regardless of `corepack prepare`
state — it's the actual designed pinning mechanism, not just a nice-to-have. Verify by
actually running the built image (`docker run`), not just building it — `docker build`
succeeding says nothing about whether `CMD` will crash at container startup.
