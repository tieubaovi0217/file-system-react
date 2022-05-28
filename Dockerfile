FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx
COPY proxy.conf /etc/nginx/
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build ./
ENTRYPOINT ["nginx", "-g", "daemon off;"]