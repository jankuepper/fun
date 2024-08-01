FROM node:latest as builder
WORKDIR /app
COPY . . 
RUN npm install && npm run build-only

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY certs jankuepper.de/
COPY ssl-dhparams.pem ssl-dhparams.pem
COPY options-ssl-nginx.conf options-ssl-nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]