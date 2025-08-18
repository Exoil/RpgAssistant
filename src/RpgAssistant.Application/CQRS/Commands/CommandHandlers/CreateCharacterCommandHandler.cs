using MessagePipe;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Application.CQRS.Commands.CommandHandlers;

public class CreateCharacterCommandHandler : IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public CreateCharacterCommandHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }


    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateCharacterCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var createCharacter = new CreateCharacter(request.Id, request.Name);
            await characterRepository.CreateAsync(createCharacter);
        }
        catch(Exception exception)
        {
            return exception;
        }

        return request.Id;
    }
}
