using MessagePipe;

using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Application.CQRS.Commands.CommandHandlers;

public class CreateKnowRelationCommandHandler : IAsyncRequestHandler<CreateKnowRelationCommand, Result<Ulid, Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public CreateKnowRelationCommandHandler(
        TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateKnowRelationCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction =  await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);
        var id = Ulid.NewUlid();

        try
        {
            await characterRepository.CreateKnowRelationAsync(
                new CreateKnowRelation(
                    id,
                    request.FromCharacterId,
                    request.ToCharacterId,
                    request.Description));
        }
        catch(Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return id;
    }
}
