using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public record CreateCharacter : BaseValueObject
{
    protected override string ModelName  => nameof(CreateCharacter);

    public required Ulid Id { get; init; }

    public required string Name { get; init; }

    [SetsRequiredMembers]
    public CreateCharacter(
        Ulid id,
        string name)
    {
        Id = id;
        Name = name;

        Validate();
    }
}
