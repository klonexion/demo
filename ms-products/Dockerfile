
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli && npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main.js"]
