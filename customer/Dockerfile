# FROM node:16-alpine

# WORKDIR /app

# COPY package.json ./

# COPY package-lock.json ./

# RUN npm install

# EXPOSE 4000

# COPY . .
FROM node:latest

RUN mkdir -p /customer

WORKDIR /customer

ADD . /customer

VOLUME ["/customer"]

EXPOSE 4000

CMD npm install && npm run dev