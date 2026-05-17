# RpgAssistant

A character and relationship manager for tabletop RPGs, backed by a Neo4j graph database.

## Repository layout

```
RpgAssistant/
├── backend/             ASP.NET Core 10 Web API (CQRS, Neo4j)
├── frontend/            Vue 3 + Vite SPA (Bun, TypeScript)
├── gateway/             nginx reverse proxy (single public entrypoint)
├── docker-compose.yaml  full local stack (gateway + api + ui + neo4j)
└── .env.example         template for the .env file consumed by compose
```

## Backend (ASP.NET Core 10)

Clean architecture with CQRS handlers and a Neo4j-backed repository layer.

| Layer | Project | Responsibility |
|-------|---------|----------------|
| API | `RpgAssistant.Api` | HTTP endpoints, DTOs, result-to-HTTP mapping |
| Application | `RpgAssistant.Application` | CQRS handlers, business logic orchestration |
| Domain | `RpgAssistant.Domain` | Entities, repository interfaces, domain exceptions |
| Infrastructure | `RpgAssistant.Infrastructure` | Neo4j repository implementation, transaction factory |

### Requirements

- .NET SDK 10 (pinned via `backend/global.json`)
- Docker (for Neo4j and integration tests via Testcontainers)

### Commands

Run from the `backend/` folder:

```bash
dotnet restore
dotnet build
dotnet run --project src/RpgAssistant.Api/RpgAssistant.Api.csproj

# Tests
dotnet test --filter Category=Unit
dotnet test --filter Category=Integration
```

Integration tests use Testcontainers to spin up Neo4j automatically — no manual DB setup needed.

### Configuration

Neo4j connection parameters use **Steeltoe placeholder resolution** — values like `${Neo4j:ConnectionString}` in `appsettings.json` are substituted at runtime from environment variables. Create a `.env` file at the repo root for local secrets:

```
NEO4J_PASSWORD=SuperP@ssword321
```

## Frontend (Vue 3 + Vite)

### Requirements

- [Bun](https://bun.sh/) (latest)
- Node `^20.19.0 || >=22.12.0` for tooling that shells out to Node

### Recommended IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur).

### Commands

Run from the `frontend/` folder:

```bash
bun install              # install dependencies
bun dev                  # dev server with HMR
bun run build            # type-check + production build
bun lint                 # ESLint
bun run test:run         # Vitest (single run)
```

### Browser devtools

- Chromium: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Running the full stack locally

The compose file wires four services behind a single nginx gateway:

| Service | Image / build context | Exposed to host | Role |
|---------|-----------------------|-----------------|------|
| `gateway` | `nginx:1.27-alpine` (`./gateway`) | `:8080` → `:80` | Public entrypoint. Routes `/v1/*` to the API, everything else to the UI. |
| `api` | `./backend` | internal only | ASP.NET Core API, listens on `:8080` inside `app_net`. |
| `ui` | `./frontend` | internal only | Built Vite SPA served by nginx with a SPA fallback. |
| `neo4j` | `neo4j:latest` | `:17474` (browser), `:17687` (bolt) | Graph database. Data persisted under `$HOME/neo4j/`. |

### First-time setup

```bash
cp .env.example .env        # then edit NEO4J_PASSWORD
docker compose up --build
```

Once everything is up, open <http://localhost:8080> — the UI loads from the gateway and its API calls (`/v1/...`) are proxied to the backend on the internal network. The API itself is **not** published to the host; reach it through the gateway.

Useful URLs:

- App (UI + API): <http://localhost:8080>
- Neo4j Browser: <http://localhost:17474>
- Neo4j Bolt: `bolt://localhost:17687`

### Common commands

```bash
docker compose ps              # see container status
docker compose logs -f api     # tail logs for one service
docker compose down            # stop and remove containers (keeps Neo4j data on host)
docker compose up -d --build   # rebuild after backend/frontend changes
```

## Continuous integration

Each side has its own workflow, triggered only when files in that subfolder change:

- `.github/workflows/backend.yml` — restore → build → unit tests + integration tests. Runs when `backend/**` changes.
- `.github/workflows/frontend.yml` — lint, type-check + build, Vitest. Runs when `frontend/**` changes.
