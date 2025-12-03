FROM nginx:1.23.3
COPY ./dist/angular-example/ /usr/share/nginx/html
