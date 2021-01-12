FROM node:12-stretch

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build
CMD npm run server