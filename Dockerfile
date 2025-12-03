FROM nginx:1.23.3
COPY ./dist/angular-example-app/ /usr/share/nginx/html
