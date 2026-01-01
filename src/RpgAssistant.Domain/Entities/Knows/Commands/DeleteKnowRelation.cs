using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Knows.Commands;

public sealed record DeleteKnowRelation : BaseValueObject
{
    [SetsRequiredMembers]
    public DeleteKnowRelation(
        Ulid fromCharacterId,
        Ulid toCharacterId)
    {
        if (fromCharacterId == toCharacterId)
        {
            throw new ArgumentException("From and To cannot be the same character id",
                "fromCharacterId, toCharacterId");
        }

        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;

        Validate();
    }

    protected override string ModelName => nameof(DeleteKnowRelation);

    public required Ulid FromCharacterId { get; init; }

    public required Ulid ToCharacterId { get; init; }
}
