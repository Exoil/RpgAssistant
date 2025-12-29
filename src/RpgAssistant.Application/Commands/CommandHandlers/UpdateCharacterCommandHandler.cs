using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class UpdateCharacterCommandHandler : IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public UpdateCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        UpdateCharacterCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var idAsUlid = request.Id.GuidToUlid();

        try
        {
            var exists = await _characterRepository.ExistsAsync(transaction, idAsUlid);

            if (!exists.Exists)
            {
                _logger.Error("Update character fails for not existing character: {Id}", request.Id);
                return new NotFoundException(Entities.Character);
            }

            if (exists.Version != request.Version)
            {
                _logger.Error("Update character fails for optimistic concurrency failure: {Id}", request.Id);
                return new PreconditionException();
            }

            var updateCharacter = new UpdateCharacter(request.Name);

            await _characterRepository.UpdateAsync(transaction, idAsUlid, updateCharacter);
            await transaction.CommitAsync();
            _logger.Information("Character updated: {Id}", request.Id);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(exception, "Error updating character: {Id}", request.Id);
            return exception;
        }

        return new Result<Exception>();
    }
}
