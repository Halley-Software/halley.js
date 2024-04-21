# Docker file for Nodejs v10 container by testing halley.js compatibility

FROM node:15.0.0-alpine

WORKDIR /halley_server

RUN npm init -y

RUN npm install halley.http@development

COPY . .

CMD [ "node", "src/index.js" ]