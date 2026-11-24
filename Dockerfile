# ==============================================================================
# Multi-Stage Production Dockerfile for Modern React Application
# Node.js builder + Unprivileged Alpine Nginx runner
# ==============================================================================

# Stage 1: Build & Assets Compilation
FROM node:20-alpine AS builder

WORKDIR /app

# Ingest dependencies with layer caching
COPY package.json ./
RUN npm install --ignore-scripts

# Copy application source code
COPY . .

# Compile TypeScript and Vite production bundle
RUN npm run build

# Stage 2: Production Nginx Runner
FROM nginx:1.27-alpine-slim AS runner

# Remove default server definition
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom enterprise Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Run as non-privileged nginx user
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
