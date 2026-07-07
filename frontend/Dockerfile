# syntax=docker/dockerfile:1
#
# Build context is the REPO ROOT, not frontend/ — this Dockerfile also needs
# devops/nginx/conf.d/default.conf, which lives outside frontend/. Build with:
#   docker build -f frontend/Dockerfile .
# (docker-compose.yml and the GitHub Actions workflow are already set up this way.)

# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ .

# Empty in production: Nginx serves the API same-origin at /api/*, so the
# frontend must use relative URLs, not a baked-in localhost address.
ARG VITE_API_URL=
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ---- runtime stage ----
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY devops/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# 127.0.0.1, not localhost: see the note on the nginx healthcheck in
# docker-compose.yml — "localhost" resolves to ::1 here and this server
# only listens on IPv4.
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
