FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY proxy.conf nginx.conf /etc/nginx/
COPY --from=builder /usr/src/app/build ./
ENTRYPOINT ["nginx", "-g", "daemon off;"]