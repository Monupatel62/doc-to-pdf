FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
ENV NODE_ENV=production
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libreoffice-writer fonts-liberation fonts-dejavu-core ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder --chown=node:node /app ./
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
