FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN cp prisma/.env.docker prisma/.env
RUN npx prisma generate

EXPOSE 8080
CMD sh -c "npx prisma migrate deploy && node src/server.js"
