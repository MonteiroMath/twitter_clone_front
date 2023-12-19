FROM node:18-alpine

WORKDIR /twitter_f

COPY public/ /twitter_f/public
COPY src/ /twitter_f/src
COPY package.json /twitter_f/

RUN npm install

CMD ["npm", "start"]