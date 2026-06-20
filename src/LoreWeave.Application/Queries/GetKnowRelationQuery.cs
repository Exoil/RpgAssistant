namespace LoreWeave.Application.Queries;

public record GetKnowRelationQuery(Guid FromCharacterId, Guid ToCharacterId);
