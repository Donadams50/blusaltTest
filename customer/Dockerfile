FROM node:latest

RUN mkdir -p /customer

WORKDIR /customer

ADD . /customer

VOLUME ["/customer"]

EXPOSE 4000

CMD npm install && npm run dev