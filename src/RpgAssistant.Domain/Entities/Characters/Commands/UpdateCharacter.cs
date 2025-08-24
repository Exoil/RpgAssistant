using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Commands;

public record UpdateCharacter : BaseValueObject
{
    protected override string ModelName  => nameof(CreateCharacter);

    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public required string Name { get; init; }

    [SetsRequiredMembers]
    public UpdateCharacter(
        string name)
    {
        Name = name;

        Validate();
    }
}
