using MessagePipe;

using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
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
        var id = Ulid.NewUlid();

        await using var transaction =  await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var createKnowRelation = new CreateKnowRelation(
                id,
                request.FromCharacterId,
                request.ToCharacterId,
                request.Description);

            var fromCharacterExists = await characterRepository.ExistsAsync(createKnowRelation.FromCharacterId);

            if (!fromCharacterExists.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation.FromCharacterId);
            }

            var toCharacterExits = await characterRepository.ExistsAsync(createKnowRelation.ToCharacterId);
            if (!toCharacterExits.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation.ToCharacterId);
            }

            await characterRepository.CreateKnowRelationAsync(
                createKnowRelation);
        }
        catch(Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return id;
    }
}
