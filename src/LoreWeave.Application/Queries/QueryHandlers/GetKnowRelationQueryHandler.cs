using MessagePipe;

using Neo4j.Driver;

using LoreWeave.Application.Models;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Exceptions.Enums;
using LoreWeave.Domain.Extensions;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace LoreWeave.Application.Queries.QueryHandlers;

public class GetKnowRelationQueryHandler
    : IAsyncRequestHandler<GetKnowRelationQuery, Result<KnowRelationPayload, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public GetKnowRelationQueryHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<KnowRelationPayload, Exception>> InvokeAsync(
        GetKnowRelationQuery request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var fromCharacterId = request.FromCharacterId.GuidToUlid();
            var toCharacterId = request.ToCharacterId.GuidToUlid();

            var exists = await _characterRepository.KnowRelationExistsAsync(
                transaction,
                fromCharacterId,
                toCharacterId);

            if (!exists.Exists)
            {
                _logger.Error(
                    "Get know relation fails for not existing relation: {FromCharacterId} knows {ToCharacterId}",
                    request.FromCharacterId,
                    request.ToCharacterId);
                return new NotFoundException(Entities.KnowRelation);
            }

            var knowRelation = await _characterRepository.GetKnowRelationAsync(
                transaction,
                fromCharacterId,
                toCharacterId);

            _logger.Information(
                "Know relation found: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);

            return new KnowRelationPayload(
                knowRelation.FromCharacterId.ToGuid(),
                knowRelation.ToCharacterId.ToGuid(),
                knowRelation.Description,
                knowRelation.IsStrongRelation,
                knowRelation.Version);
        }
        catch (Exception exception)
        {
            _logger.Error(
                exception,
                "Error getting know relation: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);
            return exception;
        }
    }
}
