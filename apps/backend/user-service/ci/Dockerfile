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



COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile


RUN turbo run build --filter=user-service...


# Phase d'exécution
FROM base AS runner
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store


COPY --from=installer --chown=nestjs:nodejs /app ./


COPY --from=installer /app/packages/protos/generated ./apps/backend/user-service/node_modules/@quentinpiot/protos/generated
COPY --from=installer /app/packages/protos/package.json ./apps/backend/user-service/node_modules/@quentinpiot/protos/package.json
COPY --from=installer /app/packages/dtos/dist ./apps/backend/user-service/node_modules/@quentinpiot/dtos/dist
COPY --from=installer /app/packages/dtos/package.json ./apps/backend/user-service/node_modules/@quentinpiot/dtos/package.json
COPY --from=installer /app/packages/validation/dist ./apps/backend/user-service/node_modules/@quentinpiot/validation/dist
COPY --from=installer /app/packages/validation/package.json ./apps/backend/user-service/node_modules/@quentinpiot/validation/package.json
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

EXPOSE 5000

CMD ["node", "apps/backend/user-service/dist/main.js"]
