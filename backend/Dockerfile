FROM node:20
WORKDIR /api

COPY ./package-lock.json .
COPY ./package.json .
RUN npm ci

COPY ./auth ./auth
COPY ./files ./files
COPY ./middleware ./middleware
COPY ./users ./users
COPY ./keys ./keys
COPY ./index.js .
RUN mkdir ./uploads

ENTRYPOINT ["npm", "run", "start"]
