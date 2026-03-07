FROM node:24.13.1-bullseye AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY src/ ./src
COPY .env ./

FROM node:24.13.1-bullseye-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/.env ./
EXPOSE 3000
CMD ["npx", "tsx", "src/app.ts"]