FROM node:14.17-alpine3.13

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npx tsc

CMD ["node", "./build/server.js"]