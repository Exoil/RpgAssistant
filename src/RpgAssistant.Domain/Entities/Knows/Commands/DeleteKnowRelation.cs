using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Knows.Commands;

public record DeleteKnowRelation : BaseValueObject
{
    protected override string ModelName  => nameof(DeleteKnowRelation);

    public required Ulid FromCharacterId { get; init; }

    public required Ulid ToCharacterId { get; init; }


    [SetsRequiredMembers]
    public DeleteKnowRelation(
        Ulid fromCharacterId,
        Ulid toCharacterId)
    {
        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;

        Validate();
    }
}
