using MessagePipe;

using Neo4j.Driver;

using Loreweave.Application.Models;
using Loreweave.Domain.Entities.Characters.Commands;
using Loreweave.Domain.Exceptions;
using Loreweave.Domain.Exceptions.Enums;
using Loreweave.Domain.Extensions;
using Loreweave.Domain.Factories;
using Loreweave.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace Loreweave.Application.Commands.CommandHandlers;

public class DeleteCharacterCommandHandler : IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public DeleteCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteCharacterCommand request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var userId = request.Id.GuidToUlid();
            var exists = await _characterRepository.ExistsAsync(transaction, userId);

            if (!exists.Exists)
            {
                _logger.Error("Delete character fails for not existing character: {Id}", request.Id);
                return new NotFoundException(Entities.Character);
            }

            var deleteCharacter = new DeleteCharacter(request.Id.GuidToUlid());
            await _characterRepository.DeleteAsync(transaction, deleteCharacter);
            await transaction.CommitAsync();
            _logger.Information("Character deleted: {Id}", request.Id);
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            _logger.Error(exception, "Error deleting character: {Id}", request.Id);

            return exception;
        }

        return new Result<Exception>();
    }
}
