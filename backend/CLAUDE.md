# CLAUDE.md — Backend (RpgAssistant API)

This file applies to **every** file under `backend/` and holds only
cross-cutting backend rules. Layer-specific guidance is path-scoped:

| Topic | Location |
|---|---|
| API layer (endpoints, DTOs, mapping, exception → HTTP) | `.claude/rules/api-layer.md` |
| Application layer (CQRS summary) | `.claude/rules/application-layer.md` |
| Application layer (full handler templates) | `src/RpgAssistant.Application/CLAUDE.md` |
| Domain layer (entities, exceptions) | `.claude/rules/domain-layer.md` |
| Infrastructure layer (Cypher, repositories) | `.claude/rules/infrastructure-layer.md` |
| Testing | `test/CLAUDE.md` |

## Context

You are an expert **.NET** and **Neo4j** developer helping build the
RpgAssistant API. Follow the official Microsoft documentation and ASP.NET Core
guides for best practices in routing, models, and other API components.

## Architecture (clean architecture + CQRS)

| Layer | Project | Responsibility |
|-------|---------|----------------|
| API | `RpgAssistant.Api` | HTTP endpoints, DTOs, mapping, exception → HTTP |
| Application | `RpgAssistant.Application` | CQRS handlers (MessagePipe), orchestration |
| Domain | `RpgAssistant.Domain` | Entities, repository contracts, domain exceptions |
| Infrastructure | `RpgAssistant.Infrastructure` | Neo4j repositories, `TransactionFactory` |

Dependency direction: `Api → Application → Domain ← Infrastructure`. Domain
references nothing outside itself.

## General rules

- Always give generated code for review. Help the user understand it.
- Before you edit/create a file you must plan each step and inform the user about the plan.
- Answers must be short and understandable.
- Use .NET 10 and the newest C# language version.
- Follow the [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions). Use expressive syntax (null-conditional operators, string interpolation, pattern matching). Use `var` when the type is obvious.
- API design: RESTful; **minimal APIs**, not controllers.
- Before implementing or changing a flow, read the matching sequence schema in `../schemas/sequences/` and update it when the flow changes.
- If you do not know the answer, write "Don't know."

### Performance

- Use `async`/`await` for I/O.
- Cache with `IMemoryCache` or a distributed cache when appropriate.
- Write efficient LINQ; avoid N+1 problems.
- Paginate large result sets.

### Dependency injection & background work

- Use DI for loose coupling. Register keyed services when needed.
- Do **not** use AutoMapper — write mapping extension methods and unit-test them.
- Implement background work with `IHostedService` / `BackgroundService`.

## Schemas

Schemas live at the **repo root**, above `backend/` and `frontend/`, so both
stacks share the same design source of truth.

| Kind | Directory (from this file) | Format |
|------|----------------------------|--------|
| Component / architecture | `../schemas/components/` | `*.drawio` |
| Sequence diagrams | `../schemas/sequences/` | `*.md` (mermaid) |

Rule: **drawio for everything except sequence diagrams**, which are **mermaid**.
For the canonical schemas list see the top-level `../CLAUDE.md`.

## ID conventions

- **Internal (Domain, Application, Infrastructure)**: `Ulid`.
- **API boundary (DTOs, endpoints)**: `Guid`.
- Convert at boundaries with `Domain.Extensions`:
  - `Guid → Ulid`: `.GuidToUlid()`
  - `Ulid → Guid`: `.UlidToGuid()` / `.ToGuid()`
  - `Ulid → DB string`: `.ToDatabaseId()`
  - `DB string → Ulid`: `.DatabaseIdToUlid()`
- New entity identifiers are generated as `Ulid.NewUlid()` in commands.
- References to existing entities flow in as `Guid` and are converted at the
  handler boundary.

## Optimistic concurrency

- Entities expose an `int Version` (starts at `1`, incremented on every write).
- Update endpoints require an `If-Match` header carrying the version.
  See `HeadersConstants.IfMatch` and the `UpdateCharacterDto.ToCommand(id, version)`
  pattern.
- The Cypher `SET` always increments: `ch.Version = ch.Version + 1`.
- Handlers check `exists.Version != request.Version` → return `PreconditionException`.

## Project conventions

- **TreatWarningsAsErrors** is enabled globally (`Directory.Build.props`).
- **Nullable reference types** are enabled — avoid null suppressions without justification.
- NuGet versions are centrally managed in `Directory.Packages.props`.
- `.editorconfig` enforces C# style (4-space indent, `var` usage, modifier order).
- SDK pinned in `global.json` (`10.0.0`, `allowPrerelease: false`).

## Configuration

Neo4j connection parameters use **Steeltoe placeholder resolution** — values
like `${Neo4j:ConnectionString}` in `appsettings.json` are substituted at
runtime from environment variables. Copy `.env` (not committed) for local
secrets, e.g.:

```
NEO4J_PASSWORD=SuperP@ssword321
```

`docker-compose.yaml` wires the API to a Neo4j instance on bolt port `17687`.

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
