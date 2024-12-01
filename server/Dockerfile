FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
RUN npm install
COPY ./ ./
CMD [ "npm", "start" ]
