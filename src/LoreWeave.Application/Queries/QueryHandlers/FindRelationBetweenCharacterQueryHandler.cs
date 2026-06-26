using MessagePipe;

using Neo4j.Driver;

using LoreWeave.Application.Models;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Exceptions.Enums;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using Serilog;

namespace LoreWeave.Application.Queries.QueryHandlers;

public class FindRelationBetweenCharacterQueryHandler
    : IAsyncRequestHandler<FindRelationBetweenCharacterQuery, Result<RelationPathPayload, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public FindRelationBetweenCharacterQueryHandler(
        ICharacterRepository characterRepository,
        ILogger logger,
        ITransactionFactory<IAsyncTransaction> transactionFactory)
    {
        _characterRepository = characterRepository;
        _logger = logger;
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<RelationPathPayload, Exception>> InvokeAsync(
        FindRelationBetweenCharacterQuery request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var fromCharacterId = request.FromCharacterId;
            var toCharacterId = request.ToCharacterId;

            var fromCharacterExists = await _characterRepository
                .CharacterExistsAsync(transaction, fromCharacterId);

            var toCharacterExists = await _characterRepository
                .CharacterExistsAsync(transaction, toCharacterId);

            if (!fromCharacterExists.Exists)
            {
                _logger.Error("From character not found: {Id}", request.FromCharacterId);
                return new NotFoundException(Entities.Character);
            }

            if (!toCharacterExists.Exists)
            {
                _logger.Error("To character not found: {Id}", request.ToCharacterId);
                return new NotFoundException(Entities.Character);
            }

            var path = await _characterRepository.FindPathBetweenCharactersAsync(
                transaction,
                fromCharacterId,
                toCharacterId,
                request.MaxHops);

            if (path.Count == 0)
            {
                _logger.Information(
                    "No relation path found between {FromId} and {ToId}",
                    request.FromCharacterId,
                    request.ToCharacterId);

                return new RelationPathPayload([], 0);
            }

            var characterIds = path;

            _logger.Information(
                "Found path with {Hops} hops between {FromId} and {ToId}",
                characterIds.Count - 1,
                request.FromCharacterId,
                request.ToCharacterId);

            return new RelationPathPayload(characterIds, characterIds.Count - 1);
        }
        catch (Exception exception)
        {
            _logger.Error(
                exception,
                "Error finding relation between {FromId} and {ToId}",
                request.FromCharacterId,
                request.ToCharacterId);

            return exception;
        }
    }
}