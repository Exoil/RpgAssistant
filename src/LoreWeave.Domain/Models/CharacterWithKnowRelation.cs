namespace LoreWeave.Domain.Models;

public sealed record CharacterWithKnowRelation(
    Ulid Id,
    string Name,
    IReadOnlyCollection<KnowRelationDetail> KnowRelations);

public sealed record KnowRelationDetail(
    Ulid CharacterId,
    string Description,
    bool IsStrongRelation);