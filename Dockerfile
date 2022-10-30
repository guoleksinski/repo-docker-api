# from base image node
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install nodemon --save-dev

CMD ["npm", "start"]