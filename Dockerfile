# Base image
FROM node:14-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build app
RUN npm run build

# Production stage
FROM nginx:1.17.1-alpine as production-stage

# Copy built app to nginx server
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]