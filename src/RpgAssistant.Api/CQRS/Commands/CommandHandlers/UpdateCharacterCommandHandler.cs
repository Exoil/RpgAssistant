using MessagePipe;

using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Api.CQRS.Commands.CommandHandlers;

public class UpdateCharacterCommandHandler : IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public UpdateCharacterCommandHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<Exception>> InvokeAsync(
        UpdateCharacterCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);
        var idAsUlid = request.Id.GuidToUlid();

        try
        {
            var exists = await characterRepository.ExistsAsync(idAsUlid);

            if (!exists.Exists)
            {
                return new NotFoundException(Entities.Character);
            }

            if (exists.Version != request.Version)
            {
                return new PreconditionException();
            }

            var updateCharacter = new UpdateCharacter(request.Name);

            await characterRepository.UpdateAsync(idAsUlid, updateCharacter);
            await transaction.CommitAsync();
        }
        catch(Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return new Result<Exception>();
    }
}
