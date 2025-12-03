# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=./dist/angular-example-app

# Stage 2: Serve the app with Nginx (or similar server)
FROM nginx:alpine
COPY --from=build /app/dist/angular-example-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
