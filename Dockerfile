FROM node:16-alpine

RUN apk add --no-cache bash

RUN npm i --global @adonisjs/cli

USER node

WORKDIR /home/node/app