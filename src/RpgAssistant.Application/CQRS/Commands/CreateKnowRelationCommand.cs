namespace RpgAssistant.Application.CQRS.Commands;

public record CreateKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId,
    string Description);
