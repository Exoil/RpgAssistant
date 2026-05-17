# CLAUDE.md — backend tests

Test rules live in the **parent** `backend/CLAUDE.md` (section "Testing") so
they're available across the whole backend scope. This file adds only details
that are specific to the test directory itself.

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
