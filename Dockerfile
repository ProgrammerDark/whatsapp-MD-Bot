FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i puppeteer

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]