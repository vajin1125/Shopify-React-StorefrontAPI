FROM node:16.13.1-alpine as build

ARG APP_ENV
ARG REACT_APP_SHOPIFY_URL
ARG REACT_APP_STORE_FRONT_ACCESS_TOKEN
ARG REACT_APP_GOOGLE_CLIENT_ID

ENV APP_ENV=${APP_ENV}
ENV REACT_APP_SHOPIFY_URL=${REACT_APP_SHOPIFY_URL}
ENV REACT_APP_STORE_FRONT_ACCESS_TOKEN=${REACT_APP_STORE_FRONT_ACCESS_TOKEN}
ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}

WORKDIR /app/front

COPY ./tsconfig.json /app/front/tsconfig.json
COPY ./package.json /app/front/package.json
COPY ./yarn.lock /app/front/yarn.lock
COPY ./.eslintrc.js /app/front/.eslintrc.js
COPY ./.prettierrc /app/front/.prettierrc

RUN yarn

COPY ./public/ /app/front/public/
COPY ./src/ /app/front/src/
COPY ./src/build/conf/.$APP_ENV.env /app/front/.env

RUN yarn build 

## Multi build
FROM nginx:1.18.0-alpine

ARG APP_ENV
ARG REACT_APP_FORMSPREE_ID
ARG REACT_APP_SHOPIFY_URL
ARG REACT_APP_STORE_FRONT_ACCESS_TOKEN
ARG REACT_APP_GOOGLE_CLIENT_ID
ENV APP_ENV=${APP_ENV}
ENV REACT_APP_FORMSPREE_ID=${REACT_APP_FORMSPREE_ID}
ENV REACT_APP_SHOPIFY_URL=${REACT_APP_SHOPIFY_URL}
ENV REACT_APP_STORE_FRONT_ACCESS_TOKEN=${REACT_APP_STORE_FRONT_ACCESS_TOKEN}
ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}

RUN apk update && apk upgrade && apk --no-cache add curl
COPY --from=build /app/front/build/ /var/www/
COPY ./src/build/nginx/nginx.$APP_ENV.conf /etc/nginx/nginx.conf
COPY ./src/build/certificate/$APP_ENV.crt /etc/ssl/$APP_ENV.crt 
COPY ./src/build/certificate/$APP_ENV.key /etc/ssl/$APP_ENV.key
COPY ./src/build/nginx/.$APP_ENV.htpasswd /usr/share/nginx/html/.htpasswd 
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 CMD curl --cacert /etc/ssl/$APP_ENV.crt --fail https://localhost:443 || exit 1   
CMD ["nginx", "-g", "daemon off;"]
