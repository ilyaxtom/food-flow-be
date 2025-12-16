FROM node:22-alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/node_modules \
    && chown -R node:node /usr/src/app

USER node

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]