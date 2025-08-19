# Multi-stage build for Node.js API
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/ ./shared/
COPY services/node-api/ ./services/node-api/

# Install dependencies and build
RUN npm ci --workspaces=false --workspace=services/node-api
RUN npm run build --workspace=shared/utils
RUN npm run build --workspace=shared/config
RUN npm run build --workspace=shared/types
RUN npm run build --workspace=services/node-api

# Production image
FROM node:20-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/services/node-api/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/services/node-api/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/shared ./shared

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

USER nodejs

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

CMD ["node", "dist/index.js"]