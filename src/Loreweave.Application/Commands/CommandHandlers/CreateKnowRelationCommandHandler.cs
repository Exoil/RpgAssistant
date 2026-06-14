using MessagePipe;

using Neo4j.Driver;

using Loreweave.Application.Models;
using Loreweave.Domain.Entities.Knows.Commands;
using Loreweave.Domain.Exceptions;
using Loreweave.Domain.Factories;
using Loreweave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace Loreweave.Application.Commands.CommandHandlers;

public class CreateKnowRelationCommandHandler : IAsyncRequestHandler<CreateKnowRelationCommand, Result<Ulid, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public CreateKnowRelationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateKnowRelationCommand request,
        CancellationToken cancellationToken = new())
    {
        var id = Ulid.NewUlid();

        await using var transaction = await _transactionFactory.CreateAsync();

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
                _logger.Error("Create know relation fails for not existing character: {Id}",
                    createKnowRelation.FromCharacterId);
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation
                    .FromCharacterId);
            }

            var toCharacterExists = await _characterRepository.ExistsAsync(
                transaction,
                createKnowRelation.ToCharacterId);

            if (!toCharacterExists.Exists)
            {
                _logger.Error("Create know relation fails for not existing character: {Id}", createKnowRelation.ToCharacterId);
                return UnprocessableContentException.CreateKnowRelationFailsForNotExistingCharacter(createKnowRelation
                    .ToCharacterId);
            }

            await _characterRepository.CreateKnowRelationAsync(
                transaction,
                createKnowRelation);
            await transaction.CommitAsync();
            _logger.Information("Know relation created: {FromCharacterId} knows {ToCharacterId}",
                createKnowRelation.FromCharacterId,
                createKnowRelation.ToCharacterId);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(
                exception,
                "Error creating know relation: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);

            return exception;
        }

        return id;
    }
}
