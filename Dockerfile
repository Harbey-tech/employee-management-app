# ---------- Build stage ----------

FROM node:24-alpine AS builder

WORKDIR /app

# Upgrade npm to patched version
RUN npm install -g npm@12.0.2

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src


# ---------- Runtime stage ----------

FROM node:24-alpine

WORKDIR /app

# Remove npm and npx from the final image
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

# Create app user with explicit numeric UID
RUN addgroup -S -g 1001 appgroup && \
    adduser -S -u 1001 -G appgroup appuser

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

USER 1001

EXPOSE 3000

CMD ["node", "src/server.js"]
