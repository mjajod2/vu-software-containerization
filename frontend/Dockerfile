FROM node:18-alpine as build
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
# ENV PORT=3000
# ENV HOST=0.0.0.0
# EXPOSE 3000
RUN npm run build

FROM nginx:1.18.0-alpine as production
COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]

