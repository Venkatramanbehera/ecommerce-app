FROM node:16.17.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN apk update && apk update && \
    apk add --no-cache bash git openssh

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "server"]