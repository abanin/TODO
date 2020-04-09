FROM node:latest

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY . /usr/src/app/

RUN npm install

ENV TZ Europe/Moscow

EXPOSE 3000

CMD [ "node", "index.js" ]