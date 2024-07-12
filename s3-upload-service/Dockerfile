FROM node:16.17.0-bullseye-slim

WORKDIR /s3-upload-service
COPY package.json .
RUN npm install
COPY . .
CMD npm start