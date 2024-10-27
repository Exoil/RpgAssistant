using MediatR;
using RpgAssistant.Application.Models;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record CreateCharacterCommand : CreateCharacter, IRequest<Result<Ulid, Exception>>
{
    public CreateCharacterCommand(string name, string description) 
        : base(name, description)
    {
    }
}