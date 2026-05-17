# CLAUDE.md — backend tests

This file applies to every file under `backend/test/`. General backend rules
(IDs, optimistic concurrency, schemas) come from `../CLAUDE.md`.

## Stack and conventions

Tests are **XUnit + Shouldly + NSubstitute**. The test directory tree
**mirrors** the src tree (e.g. `Application/Commands/CommandHandlers/Xxx.cs` →
`Application.Test/Commands/CommandHandlers/XxxTest.cs`).

- Use XUnit (`[Fact]`, `[Theory]`).
- Every test must be categorized with
  `[Trait(Constants.TraitName, Constants.TestTitle)]`.
  `Constants.TraitName = "Category"`; `Constants.TestTitle` is `"Unit"` or
  `"Integration"` (defined per test project). CI filters by this trait.
- Use AAA comments — `// Arrange`, `// Act`, `// Assert`.
- Assert with **Shouldly**; every assertion includes a message:
  `result.Value.ShouldBe(expected, "why this should match")`.
- Mock with **NSubstitute**: `Substitute.For<IFoo>()`, `.Returns(...)`,
  `.ThrowsAsync(...)`, `.Received(1)`.
- Name the system under test `_sut`. Test method names follow
  `Method_WhenCondition_ExpectedBehavior`.
- Cover the happy path **and** at least one not-happy path (exception,
  validation, concurrency).
- For command handlers, assert both transaction outcome
  (`CommitAsync` / `RollbackAsync` received counts) and result.

## Test projects

| Project | Category trait |
|---------|----------------|
| `RpgAssistant.Api.Test` | `Unit` |
| `RpgAssistant.Application.Test` | `Unit` |
| `RpgAssistant.Domain.Test` | `Unit` |
| `RpgAssistant.Api.Integration.Test` | `Integration` |

Each project owns a `Constants.cs` with `TraitName = "Category"` and a
project-specific `TestTitle` (`"Unit"` or `"Integration"`).

## Integration tests

- Inherit `IntegrationTestBase` (manages `Neo4jContainerRunner`,
  `ApiWebApplicationFactory`, and `HttpClient`).
- Neo4j is started fresh per-class via Testcontainers — no manual setup.
- Use `FakeTimeProvider` (`SetCurrentTime` / `AdvanceTime`) instead of
  `DateTime.UtcNow` directly.
- `Containers/` holds the Testcontainers wrapper(s) — extend that folder when
  adding a new external dependency.

## Directory layout

The test tree mirrors the src tree. When adding a test for
`src/<Project>/<Folder>/<File>.cs`, create the test at
`test/<Project>.Test/<Folder>/<File>Test.cs`.

## Schemas

Read the matching sequence schema before writing a test for a flow:
`../../schemas/sequences/*.md` (mermaid).
