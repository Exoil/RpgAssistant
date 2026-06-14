using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

using Loreweave.Domain.Models;

namespace Loreweave.Domain.Entities.Characters.Commands;

public sealed record UpdateCharacter : BaseValueObject
{
    [SetsRequiredMembers]
    public UpdateCharacter(
        string name)
    {
        Name = name;

        Validate();
    }

    protected override string ModelName => nameof(CreateCharacter);

    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public required string Name { get; init; }
}
