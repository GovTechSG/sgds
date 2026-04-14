FROM gdssingapore/airbase:node-24-builder AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm docs:build

FROM gdssingapore/airbase:nginx-1.28

USER app

COPY --from=builder --chown=app:app /app/docs/.vitepress/dist/ /usr/share/nginx/html/
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
