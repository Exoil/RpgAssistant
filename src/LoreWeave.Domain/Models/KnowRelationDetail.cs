namespace LoreWeave.Domain.Models;

public sealed record KnowRelationDetail(
    Guid CharacterId,
    string Description,
    bool IsStrongRelation);
