FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]