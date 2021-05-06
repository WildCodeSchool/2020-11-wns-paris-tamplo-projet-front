# PROD Dockerfile
# this is the stage one , also know as the build step
FROM node:14-alpine as stage

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY src src
COPY public public

RUN npm run build

# this is stage two, where the app actually runs
FROM node:14-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --only=production

COPY --from=stage /app/build ./build

RUN npm install -g serve

CMD serve -s build -l ${CLIENT_URI}