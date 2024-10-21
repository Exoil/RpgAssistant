using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class CreateCharacterCommandHandler : IRequestHandler<CreateCharacterCommand, Ulid>
{
    public Task<Ulid> Handle(CreateCharacterCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}