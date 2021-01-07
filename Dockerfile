FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY src src
COPY public public

CMD npm run start