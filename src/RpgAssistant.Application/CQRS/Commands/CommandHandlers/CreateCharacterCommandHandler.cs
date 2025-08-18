using MessagePipe;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Application.CQRS.Commands.CommandHandlers;

public class CreateCharacterCommandHandler : IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>
{
    private readonly CharacterRepository _characterRepository;

    public CreateCharacterCommandHandler(CharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }


    public async ValueTask<Result<Ulid, Exception>> InvokeAsync(
        CreateCharacterCommand request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        try
        {
            var createCharacter = new CreateCharacter(request.Id, request.Name);
            await _characterRepository.CreateAsync(createCharacter);
        }
        catch(Exception exception)
        {
            return exception;
        }

        return request.Id;
    }
}
