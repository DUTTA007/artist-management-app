FROM node:16.17.0-bullseye-slim

WORKDIR /frontend
COPY package*.json .
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .
CMD ["npm", "start"]
