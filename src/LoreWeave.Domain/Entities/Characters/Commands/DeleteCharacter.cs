using LoreWeave.Domain.Models;

namespace LoreWeave.Domain.Entities.Characters.Commands;

public sealed record DeleteCharacter : BaseValueObject
{
    public DeleteCharacter(Guid id) => Id = id;
    public Guid Id { get; init; }
}
