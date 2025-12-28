using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public record DeleteCharacter : BaseValueObject
{
    public DeleteCharacter(Ulid id) => Id = id;
    public Ulid Id { get; init; }
}
