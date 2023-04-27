FROM node:18-bullseye-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_BASE_URL=http://159.89.197.116:8000/_api
ENV VITE_API_BASE_URL=http://159.89.197.116:8000/_api

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

ENTRYPOINT ["npm", "run", "start"]
