# syntax=docker/dockerfile:1
FROM node:alpine
WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install && npx tsc

CMD ["node", "./out/bot.js"]