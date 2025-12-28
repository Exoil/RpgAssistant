using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public record CreateCharacter : BaseValueObject
{
    [SetsRequiredMembers]
    public CreateCharacter(
        Ulid id,
        string name)
    {
        Id = id;
        Name = name;

        Validate();
    }

    protected override string ModelName => nameof(CreateCharacter);

    public required Ulid Id { get; init; }

    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public required string Name { get; init; }
}
