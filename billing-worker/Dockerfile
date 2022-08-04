FROM node:latest

RUN mkdir -p /billing-worker

WORKDIR /billing-worker

ADD . /billing-worker

VOLUME ["/billing-worker"]

EXPOSE 6000

CMD npm install && npm run dev