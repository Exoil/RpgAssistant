using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class DeleteCharacterCommandHandler : IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>
{
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly ICharacterRepository _characterRepository;

    public DeleteCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteCharacterCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var userId = request.Id.GuidToUlid();
            var exists = await _characterRepository.ExistsAsync(transaction, userId);

            if (!exists.Exists)
            {
                return new NotFoundException(Entities.Character);
            }

            var deleteCharacter = new DeleteCharacter(request.Id.GuidToUlid());
            await _characterRepository.DeleteAsync(transaction, deleteCharacter);
            await transaction.CommitAsync();
        }
        catch (Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return new Result<Exception>();
    }
}
