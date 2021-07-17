### DOCKERFILE - PRODUCTION BUILD ONLY ###

#--- Stage 1: Build Client ---#

FROM node:14-alpine as client

# Extend PATH
ENV PATH=$PATH:/node_modules/.bin

# Declare Client App Directory
WORKDIR /usr/app/client/

# Install Client Dependencies
COPY client/package*.json ./
RUN yarn install

# Copy Client App Source Code
COPY client/ ./

RUN yarn build

#--- Stage 2: Build Server ---#

FROM node:14-alpine

# Extend PATH
ENV PATH=$PATH:/node_modules/.bin

# Declare Main App Directory
WORKDIR /usr/src/app/

# Copy Client App Source Code To Main App Directory
COPY --from=client /usr/app/client/build/ ./client/build/

# Declare Server App Directory
WORKDIR /usr/src/app/server/

# Install Server Dependencies
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

#--- Stage 3: Start App ---#

# Start Main App
CMD ["npm", "start"]
