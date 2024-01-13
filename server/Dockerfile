# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:18-alpine as builder

WORKDIR /server
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


# Build the image as production
# So we can minimize the size
FROM node:18-alpine

WORKDIR /server
COPY package.json ./
ENV PORT=${SERVER_PORT}
ENV NODE_ENV=Production
RUN npm install
COPY --from=builder /server/dist ./dist
EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start"]