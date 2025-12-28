namespace RpgAssistant.Api.CQRS.Commands;

public record CreateKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId,
    string Description);
