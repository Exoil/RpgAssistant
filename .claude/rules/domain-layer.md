---
paths:
  - "src/LoreWeave.Domain/**"
---

# Domain layer rules

These rules apply when editing files under `src/LoreWeave.Domain/`.

- Entities are `sealed class` with `Guid Id { get; private init; }` and a
  `Version` property.
- Constructors take a Domain *command* record (e.g. `CreateCharacter`) — not
  loose parameters.
- Repository interfaces live in `Domain.Repositories`; they always take an
  `IAsyncTransaction` as the **first** argument.
- Domain commands/queries are nested under
  `Domain/Entities/<Entity>/Commands/` and `.../Queries/`.
- The Domain layer references **nothing outside itself** (no Application, no
  Infrastructure, no Api).

## Domain exceptions

- `NotFoundException(Entities.Character)`
- `PreconditionException`
- `UnprocessableContentException`
- `ValueObjectException` — carries validation errors.

These are the exceptions handlers return as `Result` failures, and they map to
HTTP status in the Api layer's `ResultsToHttpResponses`.