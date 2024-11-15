# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all the source code into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
