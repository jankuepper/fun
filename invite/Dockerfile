FROM node:latest as builder
WORKDIR /app
COPY . . 
RUN npm install && npm run build-only

FROM certbot/certbot as cert
WORKDIR /etc/letsencrypt
RUN certbot certonly -d jankuepper.de -n --agree-tos -m jan0000046@gmail.com --standalone

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=cert /etc/letsencrypt/live .
COPY ./nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]