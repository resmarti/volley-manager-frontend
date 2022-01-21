FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY /dist/volley-manager-frontend /usr/share/nginx/html