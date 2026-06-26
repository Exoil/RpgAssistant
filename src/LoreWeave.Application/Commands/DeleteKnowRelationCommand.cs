namespace LoreWeave.Application.Commands;

public record DeleteKnowRelationCommand(
    Guid FromCharacterId,
    Guid ToCharacterId);
