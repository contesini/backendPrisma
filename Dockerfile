FROM node:8-stretch-slim

COPY . ./

RUN yarn

EXPOSE 4000
