FROM node:latest as builder
WORKDIR /app
COPY . . 
RUN npm install && npm run build-only

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY ./nginx.con /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]