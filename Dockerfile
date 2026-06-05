FROM node:24-bookworm-slim AS build

WORKDIR /app

ARG VITE_BACKEND_DOMAIN
ARG VITE_STRIPE_PUBLISHABLE_KEY
ENV VITE_BACKEND_DOMAIN=$VITE_BACKEND_DOMAIN
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/10-runtime-config.sh /docker-entrypoint.d/10-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/10-runtime-config.sh
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
