FROM node:24.13.1-bullseye AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY drill5.ts ./
COPY tsconfig.json ./
COPY .env ./

FROM node:24.13.1-bullseye-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/drill5.ts ./
COPY --from=build /usr/src/app/.env ./

EXPOSE 3000

CMD ["npx", "tsx", "drill5.ts"]


# docker build -t drill5-node .
# docker run -p 3000:3000 drill5-node