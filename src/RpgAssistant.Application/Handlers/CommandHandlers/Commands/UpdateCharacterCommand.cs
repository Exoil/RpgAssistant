using MediatR;
using RpgAssistant.Application.Models;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record UpdateCharacterCommand : UpdateCharacter, IRequest<Result<Exception>>
{
    public UpdateCharacterCommand(Ulid id, string name, string description)
        : base(id, name, description)
    {
    }
}