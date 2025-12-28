using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class CreateKnowRelationCommandHandler : IAsyncRequestHandler<CreateKnowRelationCommand, Result<Ulid, Exception>>
{
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly ICharacterRepository _characterRepository;

    public CreateKnowRelationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
    }

    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateKnowRelationCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        var id = Ulid.NewUlid();

        await using var transaction =  await _transactionFactory.CreateAsync();

        try
        {
            var createKnowRelation = new CreateKnowRelation(
                id,
                request.FromCharacterId,
                request.ToCharacterId,
                request.Description);

            var fromCharacterExists = await _characterRepository.ExistsAsync(
                transaction,
                createKnowRelation.FromCharacterId);

            if (!fromCharacterExists.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation.FromCharacterId);
            }

            var toCharacterExists = await _characterRepository.ExistsAsync(
                transaction,
                createKnowRelation.ToCharacterId);
            if (!toCharacterExists.Exists)
            {
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation.ToCharacterId);
            }

            await _characterRepository.CreateKnowRelationAsync(
                transaction,
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
