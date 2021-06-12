FROM node:14.17-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm install -g nodemon

CMD ["npm", "run", "dev"]