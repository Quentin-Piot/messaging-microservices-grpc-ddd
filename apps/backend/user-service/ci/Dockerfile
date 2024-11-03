FROM node:18-alpine AS base

# Phase de construction
FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat curl

WORKDIR /app

RUN npm i -g turbo

COPY . .

RUN turbo prune user-service --docker

# Phase d'installation
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat curl
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store

COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=user-service...

# Phase d'exécution
FROM base AS runner
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store


COPY --from=installer --chown=nestjs:nodejs /app ./

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

EXPOSE 5000

CMD ["node", "apps/backend/user-service/dist/main.js"]
