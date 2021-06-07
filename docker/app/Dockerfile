FROM node:14.17.0-alpine

WORKDIR /app

COPY ../src/package*.json  ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]