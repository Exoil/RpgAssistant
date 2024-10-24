using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class CreateCharacterCommandHandler : IRequestHandler<CreateCharacterCommand, Ulid>
{
    private readonly ICharacterRepository _characterRepository;

    public CreateCharacterCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public Task<Ulid> Handle(CreateCharacterCommand request, CancellationToken cancellationToken) 
        => _characterRepository.CreateAsync(request, cancellationToken);
}