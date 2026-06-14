using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public sealed record DeleteCharacter : BaseValueObject
{
    public DeleteCharacter(Ulid id) => Id = id;
    public Ulid Id { get; init; }
}
