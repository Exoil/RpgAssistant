namespace LoreWeave.Application.Commands;

public record DeleteKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId);
