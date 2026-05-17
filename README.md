# RpgAssistant

A character and relationship manager for tabletop RPGs, backed by a Neo4j graph database.

## Repository layout

```
RpgAssistant/
├── backend/    ASP.NET Core 10 Web API (CQRS, Neo4j)
├── frontend/   Vue 3 + Vite SPA (Bun, TypeScript)
└── docker-compose.yaml   API + Neo4j for local development
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

```bash
docker-compose up
```

Spins up the API on `:8080` and Neo4j (bolt on `:17687`, browser on `:17474`).

## Continuous integration

Each side has its own workflow, triggered only when files in that subfolder change:

- `.github/workflows/backend.yml` — restore → build → unit tests + integration tests. Runs when `backend/**` changes.
- `.github/workflows/frontend.yml` — lint, type-check + build, Vitest. Runs when `frontend/**` changes.
