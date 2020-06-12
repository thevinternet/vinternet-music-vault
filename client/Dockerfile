# Dockerfile - React Frontend

FROM node:12-alpine

# Create Client App Directory
RUN mkdir -p /usr/app/client/
WORKDIR /usr/app/client/

# Install Client App Dependencies
COPY package*.json ./
RUN yarn install

# Copy Client App Source Code
COPY . .

# Start App
CMD ["yarn","start"]
