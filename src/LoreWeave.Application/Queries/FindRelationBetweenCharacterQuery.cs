namespace LoreWeave.Application.Queries;

public record FindRelationBetweenCharacterQuery(
    Guid FromCharacterId,
    Guid ToCharacterId,
    int MaxHops = 10);