# ---------- Build stage ----------

FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

# ---------- Runtime stage ----------

FROM node:24-alpine

WORKDIR /app

# Create a non-root application user

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Run application as non-root user

USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]
