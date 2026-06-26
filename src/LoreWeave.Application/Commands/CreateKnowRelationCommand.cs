namespace LoreWeave.Application.Commands;

public record CreateKnowRelationCommand(
    Guid FromCharacterId,
    Guid ToCharacterId,
    string Description,
    bool IsStrongRelation);
