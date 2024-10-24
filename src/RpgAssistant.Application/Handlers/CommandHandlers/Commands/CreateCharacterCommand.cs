using MediatR;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record CreateCharacterCommand : CreateCharacter, IRequest<Ulid>
{
    public CreateCharacterCommand(string name, string description) 
        : base(name, description)
    {
    }
}