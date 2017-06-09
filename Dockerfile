FROM alpine:3.5

RUN echo "ipv6" >> /etc/modules

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.5/community" >> /etc/apk/repositories; \
    echo "http://dl-cdn.alpinelinux.org/alpine/v3.5/main" >> /etc/apk/repositories;

RUN apk update
RUN apk add nginx
RUN adduser -D -u 1000 -g 'www' www
RUN chown -R www:www /var/lib/nginx
RUN mkdir /www
RUN chown -R www:www /www
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
RUN mkdir -p /www/build

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /www/index.html
COPY basic.css /www/basic.css
COPY build/index.bundle.js /www/build/index.bundle.js

CMD rc-service nginx start