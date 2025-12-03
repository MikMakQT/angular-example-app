FROM nginx:1.24-alpine
COPY ./dist/angular-exmaple-app/ /usr/share/nginx/html
