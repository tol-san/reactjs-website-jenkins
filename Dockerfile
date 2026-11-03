# ==========================================
# Stage 1: Build stage
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Clean install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build production assets (outputs to /app/dist)
RUN npm run build

# ==========================================
# Stage 2: Production serving stage
# ==========================================
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose web port
EXPOSE 80

# Start server
CMD ["nginx", "-g", "daemon off;"]

