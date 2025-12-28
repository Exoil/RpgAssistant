using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class DeleteKnowRelationCommandHandler : IAsyncRequestHandler<DeleteKnowRelationCommand, Result<Exception>>
{
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly ICharacterRepository _characterRepository;

    public DeleteKnowRelationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteKnowRelationCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction =  await _transactionFactory.CreateAsync();

        try
        {
            await _characterRepository.DeleteKnowRelationAsync(
                transaction,
                new DeleteKnowRelation(
                    request.FromCharacterId,
                    request.ToCharacterId));
            await transaction.CommitAsync();
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return new Result<Exception>();
    }
}
