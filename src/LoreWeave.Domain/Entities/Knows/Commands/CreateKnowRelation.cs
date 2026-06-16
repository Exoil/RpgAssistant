using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

using LoreWeave.Domain.Models;

namespace LoreWeave.Domain.Entities.Knows.Commands;

public sealed record CreateKnowRelation : BaseValueObject
{
    [SetsRequiredMembers]
    public CreateKnowRelation(
        Ulid id,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        string description,
        bool isStrongRelation)
    {
        if (fromCharacterId == toCharacterId)
        {
            throw new ArgumentException("From and To cannot be the same character id",
                "fromCharacterId, toCharacterId");
        }

        Id = id;
        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;
        Description = description;
        IsStrongRelation = isStrongRelation; 

        Validate();
    }

    protected override string ModelName => nameof(CreateKnowRelation);

    public required Ulid Id { get; init; }

    public required Ulid FromCharacterId { get; init; }

    public required Ulid ToCharacterId { get; init; }

    [StringLength(50, MinimumLength = 0, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public required string Description { get; init; }
    
    public required bool IsStrongRelation { get; init; }
}
