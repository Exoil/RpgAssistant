# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Restore, build, run
dotnet restore
dotnet build
dotnet run --project src/RpgAssistant.Api/RpgAssistant.Api.csproj

# Tests (CI filters by category)
dotnet test --filter Category=Unit
dotnet test --filter Category=Integration
dotnet test test/RpgAssistant.Api.Test/RpgAssistant.Api.Test.csproj   # single project

# Local dev with Docker (API + Neo4j)
docker-compose up
```

Integration tests use Testcontainers to spin up Neo4j automatically — no manual DB setup needed.

## Architecture

**RpgAssistant** is an ASP.NET Core 10 Web API using clean architecture with CQRS, backed by Neo4j (graph database) for character relationship queries.

### Layer Overview

| Layer | Project | Responsibility |
|-------|---------|----------------|
| API | `RpgAssistant.Api` | HTTP endpoints, DTOs, result-to-HTTP mapping |
| Application | `RpgAssistant.Application` | CQRS handlers, business logic orchestration |
| Domain | `RpgAssistant.Domain` | Entities, repository interfaces, domain exceptions |
| Infrastructure | `RpgAssistant.Infrastructure` | Neo4j repository implementation, transaction factory |

### CQRS with MessagePipe

Commands and queries use **MessagePipe** with the pattern:
```csharp
IAsyncRequestHandler<TRequest, Result<TSuccess, Exception>>
```
- Commands live in `Application/Commands/`, handlers in `Application/Commands/CommandHandlers/`
- Queries live in `Application/Queries/`, handlers in `Application/Queries/QueryHandlers/`
- A global `LogFilter` in `Application/Filters/` wraps all handlers for structured logging
- All handlers are registered in `Application/IoC/HandlerConfiguration.cs`

### Result Pattern

Handlers return `Result<TSuccess, TError>`. Endpoint resolvers in `Api/ResultResolvers/` map these to HTTP responses (including ETag/versioning headers).

### Entity Versioning

Characters use **ETag-based optimistic concurrency**: the `version` field is validated against the `If-Match` header on PUT requests.

### Identifiers

Entities use **ULID** (lexicographically sortable, distributed-friendly). Conversion helpers are in `Domain/Extensions/UlidExtensions.cs`.

### Configuration & Environment

Neo4j connection parameters use **Steeltoe placeholder resolution** — values like `${Neo4j:ConnectionString}` in `appsettings.json` are substituted at runtime from environment variables. Copy `.env` (not committed) for local secrets:
```
NEO4J_PASSWORD=SuperP@ssword321
```

The `docker-compose.yaml` wires the API to a Neo4j instance on bolt port `17687`.

## Project Conventions

- **TreatWarningsAsErrors** is enabled globally (`Directory.Build.props`)
- **Nullable reference types** are enabled — avoid null suppressions without justification
- NuGet versions are centrally managed in `Directory.Packages.props`
- `.editorconfig` enforces C# style (4-space indent, `var` usage, modifier order)
- SDK version is pinned via `global.json` (10.0.0, `allowPrerelease: false`)