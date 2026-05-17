# syntax=docker/dockerfile:1.7

# ---------- Stage 1: build ----------
FROM oven/bun:1.2-alpine AS build

WORKDIR /app

# Kopiujemy najpierw manifesty - dzięki temu warstwa z `bun install`
# trafia do cache'u i nie przebudowuje się przy zmianach w src/.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# ---------- Stage 2: runtime ----------
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV API_BACKEND_URL=http://localhost:8080

EXPOSE 80

# Domyślny entrypoint obrazu nginx renderuje pliki z /etc/nginx/templates/
# podstawiając ${ZMIENNE} z env - dlatego nie nadpisujemy CMD.