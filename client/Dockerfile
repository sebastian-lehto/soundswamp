# Use Node LTS base image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source
COPY . .

# Generate Prisma client after dependencies are installed
RUN npx prisma generate

# Start server
CMD ["npm", "start"]