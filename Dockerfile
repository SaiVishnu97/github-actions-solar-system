FROM node:18-alpine3.17

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . .
ARG mongousername
ARG mongopassword
ENV MONGO_URI=uriPlaceholder
ENV MONGO_USERNAME=$mongousername
ENV MONGO_PASSWORD=$mongopassword

EXPOSE 3000

CMD [ "npm", "start" ]