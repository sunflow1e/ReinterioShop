FROM node as vite-app

WORKDIR /app/client/user
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx
COPY --chmod=765 --from=vite-app ./app/client/user/build /usr/share/nginx/html

EXPOSE 5523

ENTRYPOINT ["nginx", "-g", "daemon off;"]