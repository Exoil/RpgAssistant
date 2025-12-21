using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Knows.Commands;

public record CreateKnowRelation : BaseValueObject
{
    protected override string ModelName  => nameof(CreateKnowRelation);

    public required Ulid Id { get; init; }

    public required Ulid FromCharacterId { get; init; }

    public required Ulid ToCharacterId { get; init; }

    [StringLength(50, MinimumLength = 0, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public required string Description { get; init; }

    [SetsRequiredMembers]
    public CreateKnowRelation(
        Ulid id,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        string description)
    {
        Id = id;
        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;
        Description = description;

        Validate();
    }
}
