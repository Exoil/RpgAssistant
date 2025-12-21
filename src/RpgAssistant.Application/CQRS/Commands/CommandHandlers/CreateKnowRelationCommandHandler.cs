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
        if (request.FromCharacterId == request.ToCharacterId)
        {
            return UnprocessableContentException.CreateKnowRelationFailsWhenIdFormAndToAreSame(request.FromCharacterId);
        }

        await using var transaction =  await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);
        var id = Ulid.NewUlid();

        try
        {
            var fromCharacterExists = await characterRepository.ExistsAsync(request.FromCharacterId);

            if (!fromCharacterExists.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(request.FromCharacterId);
            }

            var toCharacterExits = await characterRepository.ExistsAsync(request.ToCharacterId);
            if (!toCharacterExits.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(request.ToCharacterId);
            }

            var toCharacterExists = await characterRepository.ExistsAsync(request.ToCharacterId);

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
