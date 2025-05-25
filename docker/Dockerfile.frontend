# INSTALL
FROM node:22.12-alpine3.20 AS deps

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" env PNPM_VERSION=9.15.3 sh -
RUN mv /root/.local/share/pnpm/pnpm /usr/bin/
# RUN apk add jq

WORKDIR /usr/src/app

COPY tsconfig* .
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY src/ src/
COPY public ./public/

# RUN jq 'del(.scripts.postinstall, .scripts.prepare)' package.json > .package.json && mv .package.json package.json
RUN pnpm install --frozen-lockfile

# BUILD
FROM node:22.12-alpine3.20 AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/bin/pnpm /usr/bin/
COPY --from=deps /usr/src/app/node_modules/ node_modules

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/public ./public

RUN pnpm build
RUN pnpm prune --prod --no-optional

# START
FROM node:22.12-alpine3.20 AS runner

WORKDIR /usr/src/app

COPY . .
COPY --from=deps /usr/bin/pnpm /usr/bin/
COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/package.json ./package.json
COPY ./.npmrc ./

EXPOSE $PORT
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["pnpm", "start"]
