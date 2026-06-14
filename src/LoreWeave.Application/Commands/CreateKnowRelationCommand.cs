namespace LoreWeave.Application.Commands;

public record CreateKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId,
    string Description);
