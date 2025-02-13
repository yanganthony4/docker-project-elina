# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app
FROM node:18-alpine

WORKDIR /app

# Copy built app from the builder stage
COPY --from=builder /app ./

# Expose frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
