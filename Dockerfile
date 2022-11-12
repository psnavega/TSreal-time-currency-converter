FROM node:16.14.2

ARG PORT_BUILD=3000

WORKDIR /usr/app

COPY . .

RUN yarn install

EXPOSE ${PORT_BUILD}

ENV PORT = ${PORT_BUILD}

CMD [ "yarn", "start"] 