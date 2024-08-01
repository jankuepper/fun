FROM node:latest as builder
WORKDIR /app
COPY . . 
RUN npm install && npm run build-only

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY /etc/letsencrypt/live /etc/letsencrypt/live
COPY /etc/nginx /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]