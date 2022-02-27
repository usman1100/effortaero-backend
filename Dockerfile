FROM node:alpine

ENV PORT=3000
ENV MONGO_DB_URI=mongodb://localhost:27017/effortaero

WORKDIR /app

COPY package*.json .

RUN yarn

COPY . .

RUN yarn run build

CMD [ "node" , "dist/main.js" ]
