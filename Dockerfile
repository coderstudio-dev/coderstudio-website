FROM node:20-alpine AS base
# Version comes from package.json's "packageManager" field - corepack reads it and fetches
# exactly that version deterministically, rather than resolving "latest" at each invocation.
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# No RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_NOTIFY_EMAIL here on purpose: /api/contact
# is a dynamic route, never executed during `next build`, so it doesn't need these at build
# time. They must be provided at container runtime instead (docker run -e / compose / your
# orchestrator's secrets) - baking a secret into ARG/ENV here would embed it in the image
# layers, readable by anyone with the image.
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files and directories
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Change ownership of the app directory
RUN chown -R nextjs:nodejs .

USER nextjs

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
