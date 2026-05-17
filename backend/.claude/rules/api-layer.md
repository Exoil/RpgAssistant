---
paths:
  - "src/RpgAssistant.Api/**"
---

# API layer rules

These rules apply when editing files under `src/RpgAssistant.Api/`. General
backend conventions (ID handling, optimistic concurrency, schemas) come from
the surrounding `CLAUDE.md`.

## Endpoints

- Static class per resource: `*Endpoints` under `Api/Endpoints/`.
- Public extension `Map*Endpoints(this WebApplication app)` ➜ creates a
  `MapGroup("v1/<resource>")` and delegates to a private
  `Map*Endpoints(this RouteGroupBuilder)`.
- Always resolve the call through `ResultsToHttpResponses`:
  ```csharp
  await responseResolver.GetResult<TCommand, TPayload>(
      dto.ToCommand(),
      data => Results.Ok(data.ToDto()),
      cancellationToken);
  ```
- Use `Results.Created` for POST, `Results.NoContent` for PUT/DELETE,
  `Results.Ok` for GET.
- `CancellationToken` is the last parameter and defaults to `default`.

## DTOs

- `record` with positional parameters; annotate every property with
  `[JsonPropertyName("camelCase")]`.
- Validation via `System.ComponentModel.DataAnnotations` (`[StringLength]`,
  `[Required]`, etc.).
- Each input DTO carries a `ToCommand(...)` (or static mapper) returning the
  matching Application command. Output DTOs are produced by mappers in
  `Api/Dtos/Maps/`.

## Mapping

- All mappers live under `Api/Dtos/Maps/` (or `Application/Models` for
  domain → payload mapping).
- Mappers are `public static class` with `public static` extension methods
  named `To<Target>(this <Source> ...)`.
- No reflection-based mappers; every mapper has a unit test.

## Exception → HTTP

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

## Contract & sequence schemas

- When adding a new endpoint, also add/update its contract under
  `Utilities/contract`.
- Before changing a flow, read the matching sequence schema in
  `../../schemas/sequences/` and update it when the flow changes.
