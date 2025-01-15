FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD npm run start:${NODE_ENV}

EXPOSE 3000
EXPOSE 5432
