# Multi-stage build for React app
FROM node:20-alpine AS react-builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/ ./shared/
COPY apps/react-app/ ./apps/react-app/

# Install dependencies and build
RUN npm ci --workspaces=false --workspace=apps/react-app
RUN npm run build --workspace=apps/react-app

# Production image
FROM nginx:alpine
COPY --from=react-builder /app/apps/react-app/build /usr/share/nginx/html
COPY infrastructure/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]