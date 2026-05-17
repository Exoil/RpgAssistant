# CLAUDE.md — Backend (RpgAssistant API)

This file applies to **every** file under `backend/`. Nested CLAUDE.md files
add scoped detail but do not override the rules below:

- `backend/src/RpgAssistant.Application/CLAUDE.md` — CQRS handler templates
- `backend/test/CLAUDE.md` — testing implementation specifics

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
- API documentation: when adding a new endpoint, also add its contract (request/response schema) under `Utilities/contract`.
- Before implementing or changing a flow, read the matching sequence schema in `../../schemas/sequences/` and update it when the flow changes.
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
| Component / architecture | `../../schemas/components/` | `*.drawio` |
| Sequence diagrams | `../../schemas/sequences/` | `*.md` (mermaid) |

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

## API layer

### Endpoints

- Static class per resource: `*Endpoints` under `Api/Endpoints/`.
- Public extension `Map*Endpoints(this WebApplication app)` ➜ creates a
  `MapGroup("v1/<resource>")` and delegates to a private `Map*Endpoints(this RouteGroupBuilder)`.
- Always resolve the call through `ResultsToHttpResponses`:
  ```csharp
  await responseResolver.GetResult<TCommand, TPayload>(
      dto.ToCommand(),
      data => Results.Ok(data.ToDto()),
      cancellationToken);
  ```
- Use `Results.Created` for POST, `Results.NoContent` for PUT/DELETE, `Results.Ok` for GET.
- `CancellationToken` is the last parameter and defaults to `default`.

### DTOs

- `record` with positional parameters; annotate every property with `[JsonPropertyName("camelCase")]`.
- Validation via `System.ComponentModel.DataAnnotations` (`[StringLength]`,
  `[Required]`, etc.).
- Each input DTO carries a `ToCommand(...)` (or static mapper) returning the
  matching Application command. Output DTOs are produced by mappers in
  `Api/Dtos/Maps/`.

### Mapping

- All mappers live under `Api/Dtos/Maps/` (or `Application/Models` for
  domain → payload mapping).
- Mappers are `public static class` with `public static` extension methods
  named `To<Target>(this <Source> ...)`.
- No reflection-based mappers; every mapper has a unit test.

### Exception → HTTP

`ResultsToHttpResponses` is the only place that maps exceptions to HTTP
status. Add new mappings there. Current mappings:

| Exception | Status |
|-----------|--------|
| `ValueObjectException` | 400 Bad Request (with validation errors) |
| `ArgumentException` | 400 Bad Request |
| `NotFoundException` | 404 Not Found |
| `PreconditionException` | 412 Precondition Failed |
| `UnprocessableContentException` | 422 Unprocessable Entity |
| anything else | falls through to `ToResult` extension |

## Application layer (CQRS)

For full handler templates see `src/RpgAssistant.Application/CLAUDE.md`.
Summary rules:

- Every operation is a `record Command` or `record Query` + an
  `IAsyncRequestHandler<TRequest, Result<...>>`.
- `LogFilter<TRequest, TResponse>` wraps all handlers automatically.
- Handlers return one of:
  - `Result<TValue, Exception>` — success carries a value.
  - `Result<Exception>` — void-like success.
- Always `await using var transaction = await _transactionFactory.CreateAsync();`
  Commit on success, rollback in `catch`.
- Queries are read-only — no commit/rollback.
- Domain entities never leak from queries — always map to a payload first.
- Register every handler in `IoC/HandlerConfiguration.cs` with
  `.AddAsyncRequestHandler<TYourHandler>()`.

## Domain layer

- Entities are `sealed class` with `Ulid Id { get; private init; }` and a
  `Version` property.
- Constructors take a Domain *command* record (e.g. `CreateCharacter`) — not
  loose parameters.
- Repository interfaces live in `Domain.Repositories`; they always take an
  `IAsyncTransaction` as the **first** argument.
- Domain commands/queries are nested under
  `Domain/Entities/<Entity>/Commands/` and `.../Queries/`.
- Domain exceptions:
  - `NotFoundException(Entities.Character)`
  - `PreconditionException`
  - `UnprocessableContentException`
  - `ValueObjectException` (carries validation errors)

## Infrastructure layer

- Repositories implement Domain interfaces and live in
  `Infrastructure/Repositories/`.
- Cypher queries are `const string` (or `StringBuilder` for dynamic queries),
  always **parameterized** with anonymous-object parameters. Never concatenate
  user input into Cypher.
- IDs are stored as their database string form via `.ToDatabaseId()`.
- Result mapping uses extension methods under `Repositories/Extensions/` (e.g.
  `record.ToCharacter()`).
- `TransactionFactory<IAsyncTransaction>` produces transactions; never resolve
  `IDriver` or sessions directly in repositories.

## Testing

Tests are XUnit + Shouldly + NSubstitute. The test directory tree **mirrors**
the src tree (e.g. `Application/Commands/CommandHandlers/Xxx.cs` →
`Application.Test/Commands/CommandHandlers/XxxTest.cs`).

- Use XUnit (`[Fact]`, `[Theory]`).
- Every test must be categorized with `[Trait(Constants.TraitName, Constants.TestTitle)]`. `Constants.TraitName = "Category"`; `Constants.TestTitle` is `"Unit"` or `"Integration"` (defined per test project). CI filters by this trait.
- Use AAA comments — `// Arrange`, `// Act`, `// Assert`.
- Assert with **Shouldly**; every assertion includes a message: `result.Value.ShouldBe(expected, "why this should match")`.
- Mock with **NSubstitute**: `Substitute.For<IFoo>()`, `.Returns(...)`, `.ThrowsAsync(...)`, `.Received(1)`.
- Name the system under test `_sut`. Test method names follow `Method_WhenCondition_ExpectedBehavior`.
- Cover the happy path **and** at least one not-happy path (exception, validation, concurrency).
- For command handlers, assert both transaction outcome (`CommitAsync` / `RollbackAsync` received counts) and result.
- Integration tests inherit `IntegrationTestBase` (in `RpgAssistant.Api.Integration.Test`). Neo4j is spun up automatically by Testcontainers — no manual DB setup. Use `FakeTimeProvider` for time-dependent assertions.
- Each test project keeps its own `Constants.cs` with `TraitName` and the project-specific `TestTitle`.

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
