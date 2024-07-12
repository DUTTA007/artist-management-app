FROM node:16.17.0-bullseye-slim

WORKDIR /backend/dist
COPY package.json .
RUN npm install
COPY . .
CMD npm start
