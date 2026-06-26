# LoreWeave

LoreWeave is a backend API for building and exploring interconnected story
worlds — characters, relationships, and the lore that ties them together —
backed by a graph database.

> ⚠️ **Work in progress.** This is a hobby project under active development.

## License & usage

LoreWeave is **free to use for non-commercial purposes**, released under the
[PolyForm Noncommercial License 1.0.0](./LICENSE).

You **may**: use, run, modify, and share it for personal, educational, research,
and other non-commercial purposes.

You **may not**: sell it, or use it (or anything based on it) for commercial
purposes.

All rights are reserved by the author. A commercial/paid offering may be made
available in the future — for commercial licensing inquiries, please get in
touch (see [Contact](#contact)).

## Tech stack

- **.NET 10** / C# (latest language version)
- **Neo4j** graph database (Community edition)
- **Minimal APIs** (no controllers)
- Clean architecture + **CQRS** (MessagePipe)

## Architecture

Dependency direction: `Api → Application → Domain ← Infrastructure`

| Layer | Project | Responsibility |
|-------|---------|----------------|
| API | `LoreWeave.Api` | HTTP endpoints, DTOs, mapping, exception → HTTP |
| Application | `LoreWeave.Application` | CQRS handlers, orchestration |
| Domain | `LoreWeave.Domain` | Entities, repository contracts, domain exceptions |
| Infrastructure | `LoreWeave.Infrastructure` | Neo4j repositories, transactions |

## Getting started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/) (pinned in `global.json`)
- A running **Neo4j** instance (or use the bundled `docker-compose.yaml`)

### Configuration

Neo4j connection settings are resolved from environment variables. Copy/create
a local `.env` (not committed) with your secrets:

```
NEO4J_PASSWORD=SuperP@ssword321
```

`docker-compose.yaml` wires the API to a Neo4j instance on bolt port `17687`.

### Build & run

```bash
dotnet restore
dotnet build
dotnet run --project src/LoreWeave.Api/LoreWeave.Api.csproj
```

### Tests

```bash
dotnet test --filter Category=Unit
dotnet test --filter Category=Integration
```

## Contact

For questions or commercial licensing: **jakubtederko@proton.me**