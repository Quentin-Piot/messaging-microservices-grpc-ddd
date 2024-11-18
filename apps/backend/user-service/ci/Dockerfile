# Image de base pour Node.js
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

# Copies spécifiques pour les packages
COPY --from=installer /app/packages/protos/generated ./apps/backend/user-service/node_modules/@quentinpiot/protos/generated
COPY --from=installer /app/packages/protos/package.json ./apps/backend/user-service/node_modules/@quentinpiot/protos/package.json
COPY --from=installer /app/packages/dtos/dist ./apps/backend/user-service/node_modules/@quentinpiot/dtos/dist
COPY --from=installer /app/packages/dtos/package.json ./apps/backend/user-service/node_modules/@quentinpiot/dtos/package.json
COPY --from=installer /app/packages/validation/dist ./apps/backend/user-service/node_modules/@quentinpiot/validation/dist
COPY --from=installer /app/packages/validation/package.json ./apps/backend/user-service/node_modules/@quentinpiot/validation/package.json
COPY --from=installer /app/packages/health/dist ./apps/backend/user-service/node_modules/@quentinpiot/health/dist
COPY --from=installer /app/packages/health/package.json ./apps/backend/user-service/node_modules/@quentinpiot/health/package.json

# Ajout des utilisateurs non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Exposer le port pour le service
EXPOSE 5000

# Commande de démarrage avec migration Prisma avant le démarrage du service
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./apps/backend/user-service/src/infrastructure/persistence/prisma/schema.prisma && node apps/backend/user-service/dist/main.js"]
