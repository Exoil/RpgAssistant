namespace LoreWeave.Domain.Models;

public sealed record KnowRelationDetail(
    Ulid CharacterId,
    string Description,
    bool IsStrongRelation);
