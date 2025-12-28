using MessagePipe;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Commands;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class CreateCharacterCommandHandler : IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public CreateCharacterCommandHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }


    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateCharacterCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var createCharacter = new CreateCharacter(request.Id, request.Name);
            await characterRepository.CreateAsync(createCharacter);
            await transaction.CommitAsync();
        }
        catch(Exception exception)
        {
            await transaction.RollbackAsync();
            return exception;
        }

        return request.Id;
    }
}
