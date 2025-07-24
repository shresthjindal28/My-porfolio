# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port (Vite default is 5173)
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
