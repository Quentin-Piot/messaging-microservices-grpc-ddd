FROM node:20-alpine AS base

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat curl

WORKDIR /app

RUN npm i -g turbo

COPY . .

RUN turbo prune web --docker

# Phase d'installation
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat curl
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store



COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile


RUN turbo run build --filter=web


# Phase d'exécution
FROM base AS runner
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store


COPY --from=installer /app ./

COPY --from=installer /app/packages/dtos/dist ./apps/backend/api-gateway/node_modules/@quentinpiot/dtos/dist
COPY --from=installer /app/packages/dtos/package.json ./apps/backend/api-gateway/node_modules/@quentinpiot/dtos/package.json


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 react
USER react

EXPOSE 3000

CMD ["pnpm","-C", "apps/web", "start"]
