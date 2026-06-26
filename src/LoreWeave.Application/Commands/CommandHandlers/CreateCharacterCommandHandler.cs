using MessagePipe;

using Neo4j.Driver;

using LoreWeave.Application.Models;
using LoreWeave.Domain.Entities.Characters.Commands;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace LoreWeave.Application.Commands.CommandHandlers;

public class CreateCharacterCommandHandler : IAsyncRequestHandler<CreateCharacterCommand, Result<Guid, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public CreateCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }


    public async ValueTask<Result<Guid, Exception>> InvokeAsync(
        CreateCharacterCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var createCharacter = new CreateCharacter(request.Id, request.Name);
            await _characterRepository.CreateAsync(transaction, createCharacter);
            await transaction.CommitAsync();
            _logger.Information("Character created: {Name}", request.Name);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(exception, "Error creating character: {Name}", request.Name);

            return exception;
        }

        return request.Id;
    }
}
