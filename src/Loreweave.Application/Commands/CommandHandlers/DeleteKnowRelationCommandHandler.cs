using MessagePipe;

using Neo4j.Driver;

using Loreweave.Application.Models;
using Loreweave.Domain.Entities.Knows.Commands;
using Loreweave.Domain.Factories;
using Loreweave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace Loreweave.Application.Commands.CommandHandlers;

public class DeleteKnowRelationCommandHandler : IAsyncRequestHandler<DeleteKnowRelationCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public DeleteKnowRelationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteKnowRelationCommand request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            await _characterRepository.DeleteKnowRelationAsync(
                transaction,
                new DeleteKnowRelation(
                    request.FromCharacterId,
                    request.ToCharacterId));
            await transaction.CommitAsync();
            _logger.Information(
                "Know relation deleted: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId
            );
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(
                exception,
                "Error deleting know relation: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);
            return exception;
        }

        return new Result<Exception>();
    }
}
