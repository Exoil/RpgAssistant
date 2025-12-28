using MessagePipe;
using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Application.CQRS.Commands.CommandHandlers;

public class DeleteKnowRelationCommandHandler : IAsyncRequestHandler<DeleteKnowRelationCommand, Result<Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public DeleteKnowRelationCommandHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteKnowRelationCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction =  await _transactionFactory.CreateAsync();

        var characterRepository = new CharacterRepository(transaction);

        try
        {
            await characterRepository.DeleteKnowRelationAsync(
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
