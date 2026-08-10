# ---------- Build stage ----------
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src


# ---------- Runtime stage ----------
FROM node:24-alpine

WORKDIR /app

# The application does not need npm at runtime.
# Remove npm and its bundled dependency tree from the final image.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "src/server.js"]
