FROM node:20
WORKDIR /api

COPY ./package-lock.json .
COPY ./package.json .
RUN npm ci

COPY ./auth ./auth
COPY ./files ./files
COPY ./middleware ./middleware
COPY ./users ./users
COPY ./index.js .
RUN mkdir ./uploads

ENV ORIGIN ""

ENTRYPOINT ["npm", "run", "start"]
