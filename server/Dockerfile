#  Dockerfile - Node Express Backend

FROM node:14-alpine

# Extend PATH
ENV PATH=$PATH:/node_modules/.bin

# Create Server App Directory
RUN mkdir -p /usr/app/server/
WORKDIR /usr/app/server/

# Install Server App Dependencies
COPY package*.json ./
RUN npm install

# Copy Server App Source Code
COPY . .

# Start App
CMD ["npm","run","development"]
