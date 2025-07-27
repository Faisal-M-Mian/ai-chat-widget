# Use Node.js 20 LTS
FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (this is where the previous builds failed)
RUN npm run build

# Create a simple health check script
RUN echo '#!/bin/sh\ncurl -f http://localhost:${PORT:-5000}/health || exit 1' > /health.sh && chmod +x /health.sh

# Expose port
EXPOSE 5000

# Add health check that actually works
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD /health.sh

# Start the application
CMD ["npm", "start"]