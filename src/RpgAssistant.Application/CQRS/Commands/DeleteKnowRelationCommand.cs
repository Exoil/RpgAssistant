namespace RpgAssistant.Application.CQRS.Commands;

public record DeleteKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId);
