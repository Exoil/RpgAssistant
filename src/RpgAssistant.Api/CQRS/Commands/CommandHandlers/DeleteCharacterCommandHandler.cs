using MessagePipe;

using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Api.CQRS.Commands.CommandHandlers;

public class DeleteCharacterCommandHandler : IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public DeleteCharacterCommandHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        DeleteCharacterCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var userId = request.Id.GuidToUlid();
            var exists = await characterRepository.ExistsAsync(userId);

            if (!exists.Exists)
            {
                return new NotFoundException(Entities.Character);
            }

            var deleteCharacter = new DeleteCharacter(request.Id.GuidToUlid());
            await characterRepository.DeleteAsync(deleteCharacter);
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
