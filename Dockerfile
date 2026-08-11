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

# Remove npm and its bundled dependency tree from the final image
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

# Create a non-root application user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Run application as non-root user
USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]
