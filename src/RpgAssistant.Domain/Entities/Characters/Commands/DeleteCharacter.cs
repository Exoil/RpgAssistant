using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public record DeleteCharacter : BaseValueObject
{
    public Ulid Id { get; init; }

    public DeleteCharacter(Ulid id)
    {
        Id = id;
    }
}
