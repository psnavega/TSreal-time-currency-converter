FROM node:14-alpine

WORKDIR /src

ADD package.json /src 

RUN yarn install 

ADD . /src 

CMD npm dev