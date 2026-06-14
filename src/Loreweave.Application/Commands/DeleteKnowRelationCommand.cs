namespace Loreweave.Application.Commands;

public record DeleteKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId);
