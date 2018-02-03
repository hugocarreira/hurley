FROM node:6.9.4-alpine

WORKDIR /app
COPY package.json .
COPY src/ ./src
RUN npm i --production --no-progress

EXPOSE 8000

CMD ["node", "src/app.js"]