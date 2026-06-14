# RpgAssistant

A character and relationship manager for tabletop RPGs, backed by a Neo4j graph database.

This repository holds the **backend** and the local docker-compose stack. The
Foundry VTT UI lives in its own repository: **[Loreweave UI](https://github.com/Exoil/Loreweave-plugin)** (folder `LoreweaveUi/`, sibling to this one on local disk).

## Repository layout

```
RpgAssistant/
├── backend/             ASP.NET Core 10 Web API (CQRS, Neo4j)
├── gateway/             nginx API gateway (CORS-allowed for the Foundry origin)
├── docker-compose.yaml  full local stack (gateway + api + neo4j + foundry)
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

## Frontend (Loreweave UI — separate repo)

The Vue 3 + Foundry VTT module that consumes this backend lives at
[Exoil/Loreweave-plugin](https://github.com/Exoil/Loreweave-plugin). Clone it
as a sibling of this repository on disk so the docker-compose bind-mount
below resolves:

```
Projects/
├── RpgAssistantProject/     <- this repo
└── LoreweaveUi/             <- the Loreweave UI module repo
```

See the Loreweave UI README for build/dev commands.

## Running the full stack locally

RpgAssistant is consumed by a **Foundry VTT module**. The compose file wires
three services here; users interact with Foundry on `:30000`, which loads the
Loreweave UI module (built in the sibling repo) and calls the backend through
the gateway:

| Service | Image / build context | Exposed to host | Role |
|---------|-----------------------|-----------------|------|
| `foundry` | `ghcr.io/felddy/foundryvtt:14` | `:30000` | Foundry VTT host. Bind-mounts `../../LoreweaveUi/dist` into `/data/Data/modules/loreweave-ui` so the built module loads live. **This is the only UI.** |
| `gateway` | `nginx:1.27-alpine` (`./gateway`) | `:8080` → `:80` | API-only gateway. Routes `/v1/*` to the API with CORS allowed for `http://localhost:30000`. Everything else returns 404. |
| `api` | `./backend` | internal only | ASP.NET Core API, listens on `:8080` inside `app_net`. |
| `neo4j` | `neo4j:latest` | `:17474` (browser), `:17687` (bolt) | Graph database. Data persisted under `$HOME/neo4j/`. |

### First-time setup

```bash
# 1. Build the Loreweave UI module (in the sibling repo)
cd ../LoreweaveUi
bun install && bun run build:foundry

# 2. Bring the backend stack up
cd -
cp .env.example .env        # then edit NEO4J_PASSWORD
docker compose --profile foundry up --build
```

Once everything is up, open <http://localhost:30000> — Foundry VTT. Inside a world, enable the **Loreweave UI** module; its window calls `/v1/...` on the gateway (`:8080`) and the gateway proxies to the backend over `app_net`. The API itself is **not** published to the host; reach it only through the gateway.

Useful URLs:

- Foundry VTT (the app): <http://localhost:30000>
- API gateway (`/v1/*` only, returns 404 for anything else): <http://localhost:8080/v1/>
- Neo4j Browser: <http://localhost:17474>
- Neo4j Bolt: `bolt://localhost:17687`

### Common commands

```bash
docker compose ps              # see container status
docker compose logs -f api     # tail logs for one service
docker compose down            # stop and remove containers (keeps Neo4j data on host)
docker compose up -d --build   # rebuild after backend changes
```

## Continuous integration

- `.github/workflows/backend.yml` — restore → build → unit tests + integration tests. Runs when `backend/**` changes.

The Loreweave UI module has its own CI in its own repository.
