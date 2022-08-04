
FROM node:latest

RUN mkdir -p /billing

WORKDIR /billing

ADD . /billing

VOLUME ["/billing"]

EXPOSE 7000

CMD npm install && npm run dev