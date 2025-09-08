# Use an official node.js runtime as a parent image
FROM node:22-alpine


# Set working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json .

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Expose the port that the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "src/index.js"]