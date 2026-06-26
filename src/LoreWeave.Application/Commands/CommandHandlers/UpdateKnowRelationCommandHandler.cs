using MessagePipe;

using Neo4j.Driver;

using LoreWeave.Application.Models;
using LoreWeave.Domain.Entities.Knows.Commands;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Exceptions.Enums;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace LoreWeave.Application.Commands.CommandHandlers;

public class UpdateKnowRelationCommandHandler : IAsyncRequestHandler<UpdateKnowRelationCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public UpdateKnowRelationCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        UpdateKnowRelationCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var fromCharacterId = request.FromCharacterId;
        var toCharacterId = request.ToCharacterId;

        try
        {
            var updateKnowRelation = new UpdateKnowRelation(
                fromCharacterId,
                toCharacterId,
                request.Description,
                request.IsStrongRelation);

            var exists = await _characterRepository.KnowRelationExistsAsync(
                transaction,
                updateKnowRelation.FromCharacterId,
                updateKnowRelation.ToCharacterId);

            if (!exists.Exists)
            {
                _logger.Error("Update know relation fails for not existing relation: {FromCharacterId} knows {ToCharacterId}",
                    request.FromCharacterId,
                    request.ToCharacterId);
                return new NotFoundException(Entities.KnowRelation);
            }

            if (exists.Version != request.Version)
            {
                _logger.Error("Update know relation fails for optimistic concurrency failure: {FromCharacterId} knows {ToCharacterId}",
                    request.FromCharacterId,
                    request.ToCharacterId);
                return new PreconditionException();
            }

            await _characterRepository.UpdateKnowRelationAsync(transaction, updateKnowRelation);
            await transaction.CommitAsync();
            _logger.Information("Know relation updated: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(exception, "Error updating know relation: {FromCharacterId} knows {ToCharacterId}",
                request.FromCharacterId,
                request.ToCharacterId);
            return exception;
        }

        return new Result<Exception>();
    }
}