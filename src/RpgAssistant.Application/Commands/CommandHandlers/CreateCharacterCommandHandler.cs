using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

namespace RpgAssistant.Application.Commands.CommandHandlers;

public class CreateCharacterCommandHandler : IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>
{
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly ICharacterRepository _characterRepository;

    public CreateCharacterCommandHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
    }


    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateCharacterCommand request,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var createCharacter = new CreateCharacter(request.Id, request.Name);
            await _characterRepository.CreateAsync(transaction, createCharacter);
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
