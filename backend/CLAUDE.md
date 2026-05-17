# CLAUDE.md — Backend (RpgAssistant API)

This file applies to all code under `backend/`. For finer rules:

- `backend/src/RpgAssistant.Application/CLAUDE.md` — CQRS / handler patterns
- `backend/test/CLAUDE.md` — testing rules

## Context

You are an expert **.NET** and **Neo4j** developer helping build the
RpgAssistant API. Follow the official Microsoft documentation and ASP.NET Core
guides for best practices in routing, models, and other API components.

## Architecture (clean architecture, CQRS)

| Layer | Project | Responsibility |
|-------|---------|----------------|
| API | `RpgAssistant.Api` | HTTP endpoints, DTOs, result-to-HTTP mapping |
| Application | `RpgAssistant.Application` | CQRS handlers, business logic orchestration |
| Domain | `RpgAssistant.Domain` | Entities, repository interfaces, domain exceptions |
| Infrastructure | `RpgAssistant.Infrastructure` | Neo4j repository implementation, transaction factory |

## Rules

<Rules>
    <Rule>
        Always give generated code for review. Help the user understand the code.
    </Rule>
    <Rule>
        Before you edit/create a file you must plan each step and inform the user about the plan.
    </Rule>
    <Rule>
        Answers must be short and understandable.
    </Rule>
    <Rule>
        Use .NET 10 and the newest C# language version.
    </Rule>
    <Rule>
        Follow the C# Coding Conventions
        (https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions).
        Use C#'s expressive syntax (null-conditional operators, string interpolation, pattern matching).
        Use `var` for implicit typing when the type is obvious.
    </Rule>
    <Rule>
        Performance:
            - Use async/await for I/O-bound operations.
            - Use caching (IMemoryCache or distributed cache) when appropriate.
            - Write efficient LINQ; avoid N+1 query problems.
            - Paginate large data sets.
    </Rule>
    <Rule>
        Key conventions:
            - Use Dependency Injection for loose coupling and testability. Register keyed services when needed.
            - Do not use AutoMapper. Write mapping extension methods and unit-test them.
            - Implement background work with IHostedService / BackgroundService.
    </Rule>
    <Rule>
        API design:
            - Follow RESTful principles.
            - Use **minimal APIs**, not controllers.
    </Rule>
    <Rule>
        API documentation: when adding a new endpoint, always add its contract
        (request/response schema) under `Utilities/contract`.
    </Rule>
    <Rule>
        Before implementing or changing a flow, read the matching sequence
        schema in `../../schemas/sequences/` (mermaid). Update the schema when
        the flow changes. See the "Schemas" section below for the full layout.
    </Rule>
    <Rule>
        If you do not know the answer, write "Don't know."
    </Rule>
</Rules>

## Schemas

Schemas live at the **repo root**, above `backend/` and `frontend/`, so both
stacks share the same design source of truth.

| Kind | Directory (from this file) | Format |
|------|----------------------------|--------|
| Component / architecture | `../../schemas/components/` | `*.drawio` |
| Sequence diagrams | `../../schemas/sequences/` | `*.md` (mermaid) |

Rule: drawio for everything **except sequence diagrams**, which are mermaid.

Read the matching sequence schema **before** implementing or changing a flow,
and update it when the flow changes. For the canonical schemas list see the
top-level `../CLAUDE.md`.

## Project conventions

- **TreatWarningsAsErrors** is enabled globally (`Directory.Build.props`).
- **Nullable reference types** are enabled — avoid null suppressions without justification.
- NuGet versions are centrally managed in `Directory.Packages.props`.
- `.editorconfig` enforces C# style (4-space indent, `var` usage, modifier order).
- SDK version is pinned via `global.json` (`10.0.0`, `allowPrerelease: false`).

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

Integration tests use Testcontainers to spin up Neo4j automatically — no manual
DB setup needed.
