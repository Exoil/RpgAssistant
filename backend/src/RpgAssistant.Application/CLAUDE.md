# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Application Layer Patterns

This layer uses **CQRS via MessagePipe**. Every operation is a Command or Query record dispatched to a dedicated handler. The `LogFilter<TRequest, TResponse>` wraps all handlers automatically — no per-handler logging setup needed.

Sequence diagrams for all existing flows are in `../../../../schemas/sequences/` (i.e. `schemas/sequences/` at the repo root, above `backend/` and `frontend/`).

---

## Result Types

All handlers return one of two readonly structs from `Models/Result.cs`:

| Type | When to use |
|------|-------------|
| `Result<TValue, Exception>` | Operation returns a value on success (e.g. new Id) |
| `Result<Exception>` | Operation returns nothing on success (void-like) |

Implicit conversions are defined — return the value or exception directly, no wrapping needed:
```csharp
return request.Id;          // success
return someException;       // failure
return new Result<Exception>(); // void success
```

---

## Adding a Command

### 1. Create the command record — `Commands/`
```csharp
namespace RpgAssistant.Application.Commands;

public record MyOperationCommand(Guid Id, string SomeField);
```
- Use `Ulid` for new entity identifiers, `Guid` for references to existing entities.
- Use primitive types only — no domain objects in command records.

### 2. Create the handler — `Commands/CommandHandlers/`
```csharp
using MessagePipe;
using Neo4j.Driver;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;
using ILogger = Serilog.ILogger;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class MyOperationCommandHandler : IAsyncRequestHandler<MyOperationCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public MyOperationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        MyOperationCommand request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            // 1. Optional: check existence, return domain exception if not found
            // 2. Build domain command and call repository
            // 3. Commit
            await transaction.CommitAsync();
            _logger.Information("...", request.Id);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(exception, "...", request.Id);
            return exception;
        }

        return new Result<Exception>();
    }
}
```

**Rules:**
- Always `await using var transaction = await _transactionFactory.CreateAsync()` — never pass raw sessions.
- Always `CommitAsync()` on success, `RollbackAsync()` in catch.
- Convert `Guid` → `Ulid` with `.GuidToUlid()` (from `Domain.Extensions`) before passing to the repository.
- Return domain exceptions (`NotFoundException`, `PreconditionException`, `UnprocessableContentException`) directly — they implicitly convert to `Result`.
- If the command creates a new entity and must return its Id, use `Result<Ulid, Exception>` instead of `Result<Exception>`.

### 3. Register the handler — `IoC/HandlerConfiguration.cs`
```csharp
.AddAsyncRequestHandler<MyOperationCommandHandler>()
```

---

## Adding a Query

### 1. Create the query record — `Queries/`
```csharp
namespace RpgAssistant.Application.Queries;

public record MyQuery(Guid Id);
```

### 2. Create a payload model if needed — `Models/`
```csharp
namespace RpgAssistant.Application.Models;

public record MyPayload(Guid Id, string Name);
```

### 3. Create the handler — `Queries/QueryHandlers/`
```csharp
public class MyQueryHandler : IAsyncRequestHandler<MyQuery, Result<MyPayload, Exception>>
{
    // same constructor pattern as commands

    public async ValueTask<Result<MyPayload, Exception>> InvokeAsync(
        MyQuery request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            // 1. Optional: ExistsAsync check → return NotFoundException if missing
            // 2. GetAsync from repository
            // 3. Map domain entity → payload (convert Ulid → Guid with .ToGuid())
            return new MyPayload(...);
        }
        catch (Exception exception)
        {
            _logger.Error(exception, "...", request.Id);
            return exception;
        }
    }
}
```

**Rules:**
- Queries do **not** commit or rollback — they are read-only.
- Always map domain entities to payload models before returning (never leak domain types).
- Convert `Ulid` → `Guid` with `.ToGuid()` in the mapping step.

### 4. Register the handler — `IoC/HandlerConfiguration.cs`
```csharp
.AddAsyncRequestHandler<MyQueryHandler>()
```

---

## Existence Check Pattern

When an operation requires a character to exist:
```csharp
var exists = await _characterRepository.ExistsAsync(transaction, idAsUlid);

if (!exists.Exists)
{
    _logger.Error("...: {Id}", request.Id);
    return new NotFoundException(Entities.Character);
}
```

For optimistic concurrency on updates, also check version:
```csharp
if (exists.Version != request.Version)
{
    _logger.Error("...: {Id}", request.Id);
    return new PreconditionException();
}
```