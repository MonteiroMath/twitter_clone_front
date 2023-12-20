FROM node:18-alpine

WORKDIR /twitter_f

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

COPY . .

CMD ["npm", "start"]