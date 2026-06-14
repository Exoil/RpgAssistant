using Loreweave.Domain.Models;

namespace Loreweave.Domain.Entities.Characters.Commands;

public sealed record DeleteCharacter : BaseValueObject
{
    public DeleteCharacter(Ulid id) => Id = id;
    public Ulid Id { get; init; }
}
