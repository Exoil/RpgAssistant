namespace RpgAssistant.Api.CQRS.Commands;

public record DeleteKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId);
