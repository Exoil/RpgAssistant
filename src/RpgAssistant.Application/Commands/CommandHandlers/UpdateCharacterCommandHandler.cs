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

public class UpdateCharacterCommandHandler : IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public UpdateCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
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

            if (!exists.Exists) return new NotFoundException(Entities.Character);

            if (exists.Version != request.Version) return new PreconditionException();

            var updateCharacter = new UpdateCharacter(request.Name);

            await _characterRepository.UpdateAsync(transaction, idAsUlid, updateCharacter);
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
