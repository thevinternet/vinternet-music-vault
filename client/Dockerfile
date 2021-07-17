# Dockerfile - React Frontend

FROM node:14-alpine

# Extend PATH
ENV PATH=$PATH:/node_modules/.bin

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
